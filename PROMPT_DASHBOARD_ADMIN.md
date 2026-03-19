You are running a Ralph BUILDING loop. PRODUCE CODE, not plans.

Project: Next.js 15 website in this directory.
Read BACKEND_TASKS.md first for full context.

YOUR SCOPE: Tasks 5, 6, and 8 only (investor dashboard, admin panel, API routes).

Assume Supabase client exists at lib/supabase/client.js and lib/supabase/server.js.
Assume all tables exist per supabase/schema.sql.

Do:
1. Wire investor dashboard to read real data from profiles + accreditation_records + investment_commitments
2. Show real investment summary, status tracker, document library
3. Protect admin routes — only role='admin' profiles
4. Admin: list all investors from profiles
5. Admin: show accreditation status per investor
6. Admin: show investment commitments
7. Admin: allow updating accreditation verification_status
8. Admin: upload/manage documents via Supabase Storage
9. Admin: show stats (investor count, total commitments)
10. Create all API routes listed in BACKEND_TASKS.md Task 8
11. Run npm run build and verify it passes

Keep existing pages and styling intact.
STATUS: COMPLETE when done.
