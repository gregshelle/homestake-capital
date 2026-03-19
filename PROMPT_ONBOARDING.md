You are running a Ralph BUILDING loop. PRODUCE CODE, not plans.

Project: Next.js 15 website in this directory.
Read BACKEND_TASKS.md first for full context.

YOUR SCOPE: Tasks 4 and 7 only (onboarding flow wiring + document management).

Assume Supabase client exists at lib/supabase/client.js and lib/supabase/server.js.
Assume profiles, accreditation_records, investment_commitments, documents tables exist per supabase/schema.sql.

Do:
1. Wire onboarding Step 1 (account) to profiles table
2. Wire Step 2 (accreditation questionnaire) to accreditation_records
3. Wire Step 3 (document upload) — use Supabase Storage bucket
4. Wire Step 4 (document review/acceptance) — track in investment_commitments
5. Wire Step 5 (investment amount) to investment_commitments
6. Keep Steps 6-7 as placeholder
7. Track onboarding_step in profiles so users can resume
8. Seed documents table with initial offering docs (PPM, sub agreement, Form D, risk disclosures)
9. Wire document viewer pages to read from documents table
10. Track document views/acceptances per investor
11. Run npm run build and verify it passes

Keep existing pages and styling intact.
STATUS: COMPLETE when done.
