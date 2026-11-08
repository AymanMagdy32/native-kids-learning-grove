# Native Kid Academy request pipeline

## What is implemented

- `/trial`: validates input, saves a trial request before showing a saved confirmation, then offers a WhatsApp link. Sending WhatsApp is optional once a request is saved; a saved request is not a confirmed appointment.
- `/staff`: approved Supabase Auth users can search/filter paginated requests, assign a staff member, set follow-up/trial dates, edit internal notes, and move requests through New → Contacted → Trial scheduled → Attended → Enrolled / Lost.
- Audit events record creation and changed pipeline fields with timestamps and authenticated staff IDs.
- Public users cannot read requests, create staff memberships, or change pipeline data. All approved staff share access to this academy's requests.
- The same submission ID/payload is reused for a retry on the current page. Database checks prevent duplicate insertion. A changed payload gets a new ID; a page reload may create a separate request. Multiple children/requests from one family are allowed, up to three new requests per phone per hour.
- Concurrent staff edits use a revision check rather than overwriting a colleague's change.
- Staff sessions use a SameSite Strict, HttpOnly, production Secure cookie, capped at one hour. Staff log in again after expiry. Passwords and tokens are not stored in browser localStorage.

## Activate in the existing academy Supabase project

Do not use another project's database or put service-role keys in the app.

1. Review and apply `supabase/migrations/202611080001_academy_requests.sql` in the intended project's SQL Editor (or `supabase db push` after linking that project). This creates new `academy_*` objects and does not modify existing academy tables. Run once. If those names already exist, stop and inspect them rather than dropping tables.
2. Create or select each staff account in Supabase Authentication → Users. Provision passwords securely; do not commit or send passwords in chat. Do not allow public staff registration. Existing non-staff Auth users gain no access.
3. As the database administrator, add approved users to `academy_staff`. Replace the example UUID and name with a real approved account:

   ```sql
   insert into public.academy_staff(user_id, display_name)
   values ('REPLACE-WITH-EXISTING-AUTH-USER-UUID', 'اسم عضو الفريق');
   ```

4. Set **server runtime** environment variables in the hosting project:
   - `ACADEMY_DATABASE_URL`: the selected academy project URL.
   - `ACADEMY_DATABASE_KEY`: that project's anon/publishable API key. No service-role key is needed.
     These names avoid Lovable’s reserved `SUPABASE_` prefix. Legacy `SUPABASE_URL` + `SUPABASE_ANON_KEY` remain supported as a pair when neither academy setting is present. Do not prefix them with `VITE_`. Do not commit actual values. For local development use an ignored `.env.local`; production needs its own runtime settings.
5. Deploy/rebuild the application with these settings. Allow the selected Supabase domain in this execution environment if testing here.
6. Visit `/staff` and sign in with an approved account. The route is intentionally absent from the public navigation and marked noindex; authentication and RLS enforce access.
7. Submit a clearly marked test trial request. Confirm it appears once, survives refresh, and can be assigned and moved through the stages. Test a non-staff account and anonymous REST reads: neither may see leads or history. Remove the test data as administrator afterward if desired.

## Safe behavior during setup

With no database environment variables, the existing WhatsApp request flow remains available and says the parent must send the message. `/staff` explains that setup is pending. There is no fake saved confirmation or in-memory production database.

With variables present but the database unreachable or migration missing, saving fails visibly and preserves the form. The page does not claim success. The floating WhatsApp link remains an alternative.

## Operations and limits

- Administer staff membership in Supabase. Removing membership blocks subsequent reads and updates even before the login cookie expires.
- No email/WhatsApp notifications or reminders are sent automatically. Follow-up dates are visible in the dashboard; staff need to check it.
- No payments or ad analytics are included. “Enrolled” is a staff-managed sales stage, not proof of payment.
- Dates are stored as UTC timestamps. Dashboard summaries use Africa/Cairo; date inputs use the staff device timezone, labeled in the UI.
- Per-phone rate limiting and a honeypot are basic abuse protection, not a replacement for deployment-level rate limiting/CAPTCHA. Add that before high-volume advertising.
- Repeated requests with new IDs are not automatically merged, since families can have multiple children.
- Login uses Supabase Auth's password endpoint/rate limits. Password reset/provisioning is currently administered through Supabase; there is no public account-management UI.
- Live database activation and real end-to-end verification require the intended project, migration access, and configured hosting environment.

## Verification

- `npm test`: validation, staff access boundary, failure/retry/double-submit behavior, and WhatsApp-only fallback.
- `npx tsc --noEmit` and `npm run build`.
- SQL integration check against disposable PostgreSQL in WASM (never touches a real project): install `@electric-sql/pglite` temporarily with `npm install --no-save --package-lock=false @electric-sql/pglite`, then run `node scripts/test-request-database.mjs`. Alternatively set `PGLITE_MODULE` to an existing local installation. It creates a fresh in-memory database and tests the actual migration, RLS, role authorization, idempotency, rate limit, audit trail, and concurrent-edit rejection.
