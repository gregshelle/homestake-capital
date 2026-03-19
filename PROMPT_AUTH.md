You are running a Ralph BUILDING loop. PRODUCE CODE, not plans.

Project: Next.js 15 website in this directory.
Read BACKEND_TASKS.md first for full context.

YOUR SCOPE: Tasks 1, 2, 3, and 9 only (Supabase setup, auth, profiles, RLS).

Do:
1. Install @supabase/supabase-js and @supabase/ssr
2. Create lib/supabase/client.js and lib/supabase/server.js
3. Update .env.example with all required Supabase vars
4. Replace lib/portal-auth.js with real Supabase auth (signup, login, logout, session check)
5. Add auth protection to all /portal routes
6. On signup, create a profiles row
7. Wire profile settings page to read/write profiles table
8. Create auth callback route
9. Add RLS policies SQL to supabase/schema.sql
10. Run npm run build and verify it passes

Keep existing pages and styling intact. Do not touch public pages.
STATUS: COMPLETE when done.
