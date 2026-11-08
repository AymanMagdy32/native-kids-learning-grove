begin;

create or replace function public.academy_delete_request(p_id uuid, p_revision integer)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare v_revision integer;
begin
  if not public.academy_is_staff() then raise insufficient_privilege; end if;
  select revision into v_revision from public.academy_requests where id = p_id for update;
  -- A repeated deletion after a lost response is safe.
  if not found then return p_id; end if;
  if p_revision is null or v_revision <> p_revision then
    raise exception 'Request changed. Refresh before deleting.';
  end if;
  -- Related history is removed by the existing ON DELETE CASCADE constraint.
  delete from public.academy_requests where id = p_id;
  return p_id;
end;
$$;
revoke all on function public.academy_delete_request(uuid, integer) from public;
grant execute on function public.academy_delete_request(uuid, integer) to authenticated;

commit;
