import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { PGlite } = require(process.env.PGLITE_MODULE || "@electric-sql/pglite");
import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const db = new PGlite();
await db.exec(
  `create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key); create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$; grant usage on schema public,auth to anon,authenticated; grant execute on function auth.uid() to anon,authenticated;`,
);
await db.exec(
  await readFile(
    new URL("../supabase/migrations/202611080001_academy_requests.sql", import.meta.url),
    "utf8",
  ),
);
const id = "11111111-1111-4111-8111-111111111111",
  staff = "22222222-2222-4222-8222-222222222222",
  outsider = "33333333-3333-4333-8333-333333333333";
await db.query("insert into auth.users(id) values($1),($2)", [staff, outsider]);
await db.query("insert into public.academy_staff values($1,$2)", [staff, "Test staff"]);
const data = {
  parent_name: "Test Parent",
  phone: "+201000000001",
  child_age: 7,
  preferred_contact: "phone",
  consent: true,
};
await db.exec("set role anon");
await db.query("select public.academy_submit_request($1,$2)", [id, data]);
await db.query("select public.academy_submit_request($1,$2)", [id, data]);
await assert.rejects(() => db.query("select * from public.academy_requests"));
await assert.rejects(() => db.query("select * from public.academy_request_events"));
await assert.rejects(() =>
  db.query("select public.academy_submit_request($1,$2)", [
    id,
    { ...data, parent_name: "Changed" },
  ]),
);
await assert.rejects(() =>
  db.query("select public.academy_submit_request($1,$2)", [
    crypto.randomUUID(),
    { ...data, consent: false },
  ]),
);
await assert.rejects(() =>
  db.query("select public.academy_submit_request($1,$2)", [
    crypto.randomUUID(),
    { ...data, child_age: 3 },
  ]),
);
await db.exec(`reset role; set role authenticated; set request.jwt.claim.sub='${outsider}'`);
assert.equal((await db.query("select * from public.academy_requests")).rows.length, 0);
assert.equal((await db.query("select * from public.academy_staff")).rows.length, 0);
await assert.rejects(() =>
  db.query("select public.academy_update_request($1,1,$2)", [id, { status: "enrolled" }]),
);
await assert.rejects(() =>
  db.query("insert into public.academy_staff values($1,$2)", [outsider, "Unapproved"]),
);
await db.exec(`set request.jwt.claim.sub='${staff}'`);
assert.equal((await db.query("select * from public.academy_requests")).rows.length, 1);
const update = {
  status: "contacted",
  assigned_to: staff,
  follow_up_at: "2026-11-09T10:00:00Z",
  trial_at: null,
  staff_note: "Called parent",
};
await db.query("select public.academy_update_request($1,1,$2)", [id, update]);
await assert.rejects(() =>
  db.query("select public.academy_update_request($1,1,$2)", [id, { ...update, status: "lost" }]),
);
await assert.rejects(() =>
  db.query("select public.academy_update_request($1,2,$2)", [
    id,
    { ...update, status: "trial_scheduled" },
  ]),
);
assert.equal((await db.query("select * from public.academy_request_events")).rows.length, 2);
assert.equal((await db.query("select revision from public.academy_requests")).rows[0].revision, 2);
await assert.rejects(() => db.query("update public.academy_requests set status='enrolled'"));
await db.exec("reset role; set role anon");
for (let i = 0; i < 2; i++)
  await db.query("select public.academy_submit_request($1,$2)", [crypto.randomUUID(), data]);
await assert.rejects(() =>
  db.query("select public.academy_submit_request($1,$2)", [crypto.randomUUID(), data]),
);
console.log(
  "PASS: SQL migration, anonymous isolation, non-staff isolation, staff authorization, validation, idempotency, conflict protection, schedule validation, audit trail, per-phone rate limit.",
);
await db.close();
