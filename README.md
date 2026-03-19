# HomeStake Capital MVP Website + Investor Portal

Deployable Next.js 15 marketing site for HomeStake Capital, now extended with a premium investor portal MVP for a **Reg D 506(c)** fundraising workflow.

## What is included

### Public website
- Homepage
- About
- How It Works
- For Investors
- For Business Owners
- Sell Your Business alias route
- Waitlist page and embedded forms
- FAQ
- Contact
- Portfolio placeholder
- Privacy / Terms / Cookies / Disclosures
- XML sitemap and robots support

### Investor portal (`/portal`)
- Investor login page
- Investor signup page
- Email verification step page
- Protected dashboard routes (client-side MVP gate)
- Investor dashboard with:
  - investment summary
  - document library
  - application / accreditation / investment status tracker
- Investor onboarding flow covering:
  1. account creation
  2. accreditation questionnaire
  3. verification document upload placeholder
  4. offering document review
  5. investment amount selection
  6. e-sign placeholder
  7. payment / wire placeholder
- Document room with pages for:
  - PPM
  - subscription agreement
  - Form D summary
  - company updates
- Portal legal pages for:
  - risk disclosures
  - portal terms of service
  - privacy policy for investor data
- Account settings page

### Admin workspace (`/portal/admin`)
- Registered investor CRM view
- Accreditation status visibility
- Commitment tracking
- Document management placeholders
- Basic database/schema overview in UI

### Database schema
- `supabase/schema.sql` includes starter tables for:
  - `profiles`
  - `accreditation_records`
  - `investment_commitments`
  - `documents`
  - `admin_users`
  - `crm_notes`

## Important MVP disclaimers
- This is **not a live offering**.
- This is **not a funding portal**.
- Payment and signature functionality are **placeholder only**.
- Final offering documents, data handling, accreditation verification workflow, and signature/payment integrations should be reviewed by securities counsel before launch.

## Run locally
```bash
cd HomeStake-Capital/website-build
npm install
npm run dev
```
Then open `http://localhost:3000`

## Optional Supabase setup
A lightweight Supabase-ready path is included so the project can be wired into real auth later without breaking local builds now.

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Current behavior
- If env vars are missing, the portal still works in local demo mode.
- Signup/login flows remain usable for MVP demos via local storage.
- The app is intentionally build-safe without external services.

## Production build
```bash
cd HomeStake-Capital/website-build
npm install
npm run build
npm run start
```

## Suggested next steps before real deployment
1. Connect Supabase Auth properly with server-side session validation.
2. Add secure file storage for accreditation documents.
3. Replace placeholder PDF/download links with attorney-approved documents.
4. Connect a real e-sign provider such as DocuSign.
5. Add final wire/payment workflow only after legal approval.
6. Add role-based admin protection and audit logs.
7. Replace `https://example.com` in `lib/site.js`, `app/robots.js`, and `app/sitemap.js` with the production domain.

## Notes
- Existing public pages were left intact and the portal was added under `/portal`.
- Styling is aligned to the existing HomeStake brand palette and layout system.
- The portal is designed to feel real and navigable while clearly labeling non-live features.
