-- Create tables for public website forms (waitlist, contact, seller inquiries)
-- These are separate from the investor portal tables and do NOT require authentication.

-- Waitlist signups
create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  first_name text default '',
  email text unique not null,
  country text default '',
  interest text default '',
  created_at timestamptz not null default now()
);

create index if not exists idx_waitlist_email on waitlist(email);
create index if not exists idx_waitlist_created_at on waitlist(created_at desc);

-- Contact form submissions
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  inquiry_type text default '',
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_contact_submissions_email on contact_submissions(email);
create index if not exists idx_contact_submissions_created_at on contact_submissions(created_at desc);

-- Seller / business owner inquiries
create table if not exists seller_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text default '',
  business_name text not null,
  business_type text default '',
  revenue text default '',
  message text default '',
  created_at timestamptz not null default now()
);

create index if not exists idx_seller_inquiries_email on seller_inquiries(email);
create index if not exists idx_seller_inquiries_created_at on seller_inquiries(created_at desc);

-- RLS: These tables are only accessed via the service role key in API routes,
-- so we enable RLS but only allow service_role (which bypasses RLS) and admin reads.

alter table waitlist enable row level security;
alter table contact_submissions enable row level security;
alter table seller_inquiries enable row level security;

-- Allow admins to read all rows (service_role bypasses RLS for inserts from API routes)
create policy "Admins can read waitlist"
  on waitlist for select
  using (is_admin());

create policy "Admins can read contact submissions"
  on contact_submissions for select
  using (is_admin());

create policy "Admins can read seller inquiries"
  on seller_inquiries for select
  using (is_admin());
