begin;

create table public.academy_staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (length(display_name) between 1 and 100)
);
create function public.academy_is_staff() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.academy_staff where user_id = auth.uid());
$$;
revoke all on function public.academy_is_staff() from public;
grant execute on function public.academy_is_staff() to authenticated;

create table public.academy_requests (
  id uuid primary key,
  parent_name text not null check(length(parent_name) between 2 and 100),
  phone text not null check(phone ~ '^\+?[0-9]{8,15}$'),
  child_age integer not null check(child_age between 4 and 15),
  current_level text check(length(current_level) <= 80),
  preferred_contact text not null check(preferred_contact in ('whatsapp','phone')),
  note text check(length(note) <= 600),
  consent boolean not null check(consent),
  consent_version text not null default 'trial-contact-v1',
  status text not null default 'new' check(status in ('new','contacted','trial_scheduled','attended','enrolled','lost')),
  assigned_to uuid references public.academy_staff(user_id) on delete set null,
  follow_up_at timestamptz,
  trial_at timestamptz,
  staff_note text not null default '' check(length(staff_note) <= 2000),
  revision integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check(status <> 'trial_scheduled' or trial_at is not null)
);
create index academy_requests_status_created on public.academy_requests(status,created_at desc,id desc);
create index academy_requests_created on public.academy_requests(created_at desc,id desc);
create index academy_requests_phone_created on public.academy_requests(phone,created_at desc);
create index academy_requests_follow_up on public.academy_requests(follow_up_at) where status not in ('enrolled','lost');

create table public.academy_request_events (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.academy_requests(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  changes jsonb not null
);
create index academy_request_events_request on public.academy_request_events(request_id,created_at desc);

alter table public.academy_staff enable row level security;
alter table public.academy_requests enable row level security;
alter table public.academy_request_events enable row level security;
revoke all on public.academy_staff,public.academy_requests,public.academy_request_events from anon,authenticated;
grant select on public.academy_staff,public.academy_requests,public.academy_request_events to authenticated;
create policy staff_read_staff on public.academy_staff for select to authenticated using(public.academy_is_staff());
create policy staff_read_requests on public.academy_requests for select to authenticated using(public.academy_is_staff());
create policy staff_read_events on public.academy_request_events for select to authenticated using(public.academy_is_staff());

-- Public callers can only submit. They cannot read requests, alter pipeline fields,
-- create staff memberships, or return the parent data from an idempotent retry.
create function public.academy_submit_request(p_id uuid,p_request jsonb) returns uuid
language plpgsql security definer set search_path = '' as $$
declare v_phone text; v_existing public.academy_requests; v_payload jsonb;
begin
  if p_id is null or jsonb_typeof(p_request) <> 'object' then raise exception 'Invalid request'; end if;
  v_phone := p_request->>'phone';
  perform pg_advisory_xact_lock(hashtextextended(coalesce(v_phone,''),0));
  select * into v_existing from public.academy_requests where id=p_id;
  if found then
    if v_existing.parent_name is distinct from p_request->>'parent_name'
       or v_existing.phone is distinct from v_phone
       or v_existing.child_age is distinct from (p_request->>'child_age')::integer
       or v_existing.current_level is distinct from nullif(p_request->>'current_level','')
       or v_existing.preferred_contact is distinct from p_request->>'preferred_contact'
       or v_existing.note is distinct from nullif(p_request->>'note','')
       or (p_request->>'consent')::boolean is distinct from true
    then raise exception 'Request ID already used'; end if;
    return p_id;
  end if;
  if (select count(*) from public.academy_requests where phone=v_phone and created_at > now()-interval '1 hour') >= 3 then
    raise exception 'Too many requests';
  end if;
  insert into public.academy_requests(id,parent_name,phone,child_age,current_level,preferred_contact,note,consent)
    values(p_id,p_request->>'parent_name',v_phone,(p_request->>'child_age')::integer,nullif(p_request->>'current_level',''),p_request->>'preferred_contact',nullif(p_request->>'note',''),(p_request->>'consent')::boolean);
  insert into public.academy_request_events(request_id,changes) values(p_id,'{"status":{"from":null,"to":"new"}}');
  return p_id;
end;
$$;
revoke all on function public.academy_submit_request(uuid,jsonb) from public;
grant execute on function public.academy_submit_request(uuid,jsonb) to anon,authenticated;

create function public.academy_update_request(p_id uuid,p_revision integer,p_changes jsonb) returns public.academy_requests
language plpgsql security definer set search_path = '' as $$
declare v_before public.academy_requests; v_after public.academy_requests; v_changes jsonb := '{}'; v_key text;
begin
  if not public.academy_is_staff() then raise insufficient_privilege; end if;
  select * into v_before from public.academy_requests where id=p_id for update;
  if not found then raise exception 'Request not found'; end if;
  if v_before.revision <> p_revision then raise exception 'Request changed. Refresh before saving.'; end if;
  update public.academy_requests set
    status=p_changes->>'status',
    assigned_to=(p_changes->>'assigned_to')::uuid,
    follow_up_at=(p_changes->>'follow_up_at')::timestamptz,
    trial_at=(p_changes->>'trial_at')::timestamptz,
    staff_note=p_changes->>'staff_note',
    revision=revision+1,updated_at=now()
  where id=p_id returning * into v_after;
  foreach v_key in array array['status','assigned_to','follow_up_at','trial_at','staff_note'] loop
    if to_jsonb(v_before)->v_key is distinct from to_jsonb(v_after)->v_key then
      v_changes := v_changes || jsonb_build_object(v_key,jsonb_build_object('from',to_jsonb(v_before)->v_key,'to',to_jsonb(v_after)->v_key));
    end if;
  end loop;
  if v_changes <> '{}'::jsonb then
    insert into public.academy_request_events(request_id,actor_id,changes) values(p_id,auth.uid(),v_changes);
  end if;
  return v_after;
end;
$$;
revoke all on function public.academy_update_request(uuid,integer,jsonb) from public;
grant execute on function public.academy_update_request(uuid,integer,jsonb) to authenticated;

commit;
