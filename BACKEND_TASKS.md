# HomeStake Capital Website — Backend Wiring Task List

## Prerequisites
- Create a Supabase project (or use existing one)
- Get SUPABASE_URL and SUPABASE_ANON_KEY
- Run supabase/schema.sql in the Supabase SQL editor

## Task 1: Supabase Setup
- [ ] Install @supabase/supabase-js and @supabase/ssr
- [ ] Create lib/supabase/client.js (browser client)
- [ ] Create lib/supabase/server.js (server client for SSR/API routes)
- [ ] Update .env.local with real Supabase credentials (use placeholder values for now, mark where real ones go)
- [ ] Verify Supabase connection works

## Task 2: Auth System
- [ ] Replace lib/portal-auth.js local-storage auth with real Supabase auth
- [ ] Implement signup with email/password via supabase.auth.signUp()
- [ ] Implement login via supabase.auth.signInWithPassword()
- [ ] Implement logout via supabase.auth.signOut()
- [ ] Implement email verification flow
- [ ] Add auth middleware/protection to all /portal routes
- [ ] Redirect unauthenticated users to /portal/login
- [ ] Redirect authenticated users away from /portal/login and /portal/signup
- [ ] Create auth callback route for email verification

## Task 3: Investor Profile
- [ ] On signup, create a row in profiles table
- [ ] Build profile settings page that reads/writes to profiles table
- [ ] Show investor name/email in portal shell header

## Task 4: Onboarding Flow
- [ ] Wire Step 1 (account creation) to profiles table
- [ ] Wire Step 2 (accreditation questionnaire) to accreditation_records table
- [ ] Wire Step 3 (document upload) — use Supabase Storage for file uploads
- [ ] Wire Step 4 (document review/acceptance) — track acceptance in investment_commitments
- [ ] Wire Step 5 (investment amount) — write to investment_commitments table
- [ ] Keep Step 6 (e-sign) as placeholder with clear "coming soon" message
- [ ] Keep Step 7 (payment) as placeholder with wire instructions display
- [ ] Track onboarding_step in profiles table so users can resume where they left off
- [ ] Show progress indicator based on real DB state

## Task 5: Investor Dashboard
- [ ] Dashboard reads from real profiles + accreditation_records + investment_commitments
- [ ] Show real investment summary
- [ ] Show real status tracker (onboarding step, verification status, investment status)
- [ ] Show real document library from documents table

## Task 6: Admin Panel
- [ ] Protect admin routes — only profiles with role='admin' can access
- [ ] List all registered investors from profiles table
- [ ] Show accreditation status per investor from accreditation_records
- [ ] Show investment commitments from investment_commitments table
- [ ] Allow admin to update accreditation verification_status
- [ ] Allow admin to upload documents to documents table + Supabase Storage
- [ ] Basic investor count / commitment total stats

## Task 7: Document Management
- [ ] Seed the documents table with PPM, subscription agreement, Form D, risk disclosures
- [ ] Serve document viewer pages from real DB records
- [ ] Track which investors have viewed/accepted which documents

## Task 8: API Routes
- [ ] POST /api/portal/signup — create profile on signup
- [ ] POST /api/portal/onboarding — update onboarding step
- [ ] POST /api/portal/accreditation — submit accreditation questionnaire
- [ ] POST /api/portal/commitment — submit investment commitment
- [ ] GET /api/portal/profile — get current investor profile
- [ ] GET /api/portal/admin/investors — list all investors (admin only)
- [ ] PATCH /api/portal/admin/accreditation — update verification status (admin only)

## Task 9: Row Level Security
- [ ] Enable RLS on all tables
- [ ] Investors can only read/write their own profiles, accreditation_records, investment_commitments
- [ ] Admins can read all rows
- [ ] Documents table is readable by all authenticated users

## Task 10: Testing & Verification
- [ ] npm run build passes
- [ ] Signup creates a real user + profile
- [ ] Login works and session persists
- [ ] Onboarding steps save to DB
- [ ] Dashboard shows real data
- [ ] Admin panel shows real investor list
- [ ] Logout works
- [ ] Unauthenticated access is blocked

## Notes
- Keep all payment/e-sign as placeholder
- Include "DRAFT — NOT A LIVE OFFERING" disclaimers on all portal pages
- Do not remove any existing public pages
- Keep the premium brand styling consistent
