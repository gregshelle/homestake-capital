-- HomeStake Capital investor portal MVP schema
-- Designed for a Reg D 506(c) portal with accredited investor onboarding.
-- Placeholder payment and signature steps remain non-live until attorney review.

create extension if not exists pgcrypto;

-- Profiles table (extends Supabase auth.users)
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  role text not null default 'investor' check (role in ('investor', 'admin')),
  full_name text,
  email text unique not null,
  phone text,
  entity_name text,
  entity_type text,
  onboarding_step text default 'account_created',
  email_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Accreditation records
create table if not exists accreditation_records (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  qualification_path text not null,
  income_qualified boolean not null default false,
  net_worth_qualified boolean not null default false,
  certification_qualified boolean not null default false,
  verification_method text,
  verification_status text not null default 'pending' check (verification_status in ('pending', 'requested', 'verified', 'rejected')),
  reviewer_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Investment commitments
create table if not exists investment_commitments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  offering_name text not null default 'HomeStake Capital Holdings I, LP',
  investment_amount numeric(14,2) not null,
  commitment_status text not null default 'soft_circled' check (commitment_status in ('soft_circled', 'documents_review', 'approved', 'funding_pending', 'funded')),
  payment_status text not null default 'placeholder_not_live',
  signature_status text not null default 'placeholder_not_live',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Documents library
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  document_type text not null,
  audience text not null default 'investor',
  version text,
  file_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Admin users (extends profiles)
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references profiles(id) on delete cascade,
  title text,
  permissions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- CRM notes
create table if not exists crm_notes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  admin_user_id uuid references admin_users(id) on delete set null,
  note text not null,
  note_type text not null default 'general',
  created_at timestamptz not null default now()
);

-- Indexes for performance
create index if not exists idx_accreditation_records_profile_id on accreditation_records(profile_id);
create index if not exists idx_investment_commitments_profile_id on investment_commitments(profile_id);
create index if not exists idx_crm_notes_profile_id on crm_notes(profile_id);
create index if not exists idx_profiles_auth_user_id on profiles(auth_user_id);
create index if not exists idx_profiles_email on profiles(email);

-- ===========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===========================================

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table accreditation_records enable row level security;
alter table investment_commitments enable row level security;
alter table documents enable row level security;
alter table admin_users enable row level security;
alter table crm_notes enable row level security;

-- Helper function to check if current user is admin
create or replace function is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from profiles
    where auth_user_id = auth.uid()
    and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Helper function to get current user's profile id
create or replace function get_current_profile_id()
returns uuid as $$
begin
  return (
    select id from profiles
    where auth_user_id = auth.uid()
    limit 1
  );
end;
$$ language plpgsql security definer;

-- PROFILES POLICIES
-- Users can read their own profile
create policy "Users can read own profile"
  on profiles for select
  using (auth_user_id = auth.uid() or is_admin());

-- Users can update their own profile
create policy "Users can update own profile"
  on profiles for update
  using (auth_user_id = auth.uid())
  with check (auth_user_id = auth.uid());

-- Users can insert their own profile (on signup)
create policy "Users can insert own profile"
  on profiles for insert
  with check (auth_user_id = auth.uid());

-- ACCREDITATION RECORDS POLICIES
-- Users can read their own accreditation records
create policy "Users can read own accreditation"
  on accreditation_records for select
  using (profile_id = get_current_profile_id() or is_admin());

-- Users can insert their own accreditation records
create policy "Users can insert own accreditation"
  on accreditation_records for insert
  with check (profile_id = get_current_profile_id());

-- Users can update their own accreditation records
create policy "Users can update own accreditation"
  on accreditation_records for update
  using (profile_id = get_current_profile_id())
  with check (profile_id = get_current_profile_id());

-- Admins can update any accreditation (for verification)
create policy "Admins can update any accreditation"
  on accreditation_records for update
  using (is_admin());

-- INVESTMENT COMMITMENTS POLICIES
-- Users can read their own commitments
create policy "Users can read own commitments"
  on investment_commitments for select
  using (profile_id = get_current_profile_id() or is_admin());

-- Users can insert their own commitments
create policy "Users can insert own commitments"
  on investment_commitments for insert
  with check (profile_id = get_current_profile_id());

-- Users can update their own commitments
-- (but not if already funded - protect finalized records)
create policy "Users can update own commitments"
  on investment_commitments for update
  using (
    profile_id = get_current_profile_id()
    and commitment_status != 'funded'
  );

-- Admins can update any commitment
-- (but protect finalized records from non-admin changes)
create policy "Admins can update any commitment"
  on investment_commitments for update
  using (is_admin());

-- DOCUMENTS POLICIES
-- All authenticated users can read published documents
-- Admins can read all documents
create policy "Authenticated users can read published documents"
  on documents for select
  using (
    (is_published = true and auth.uid() is not null)
    or is_admin()
  );

-- Only admins can insert documents
create policy "Only admins can insert documents"
  on documents for insert
  with check (is_admin());

-- Only admins can update documents
create policy "Only admins can update documents"
  on documents for update
  using (is_admin());

-- Only admins can delete documents
create policy "Only admins can delete documents"
  on documents for delete
  using (is_admin());

-- ADMIN USERS POLICIES
-- Only admins can read admin_users table
create policy "Only admins can read admin users"
  on admin_users for select
  using (is_admin());

create policy "Only admins can insert admin users"
  on admin_users for insert
  with check (is_admin());

create policy "Only admins can update admin users"
  on admin_users for update
  using (is_admin());

create policy "Only admins can delete admin users"
  on admin_users for delete
  using (is_admin());

-- DOCUMENT VIEWS (track which investors have viewed/accepted documents)
create table if not exists document_views (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  document_id uuid not null references documents(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  accepted boolean not null default false,
  accepted_at timestamptz,
  unique(profile_id, document_id)
);

create index if not exists idx_document_views_profile_id on document_views(profile_id);
create index if not exists idx_document_views_document_id on document_views(document_id);

-- Enable RLS on document_views
alter table document_views enable row level security;

-- Users can read their own document views
create policy "Users can read own document views"
  on document_views for select
  using (profile_id = get_current_profile_id() or is_admin());

-- Users can insert their own document views
create policy "Users can insert own document views"
  on document_views for insert
  with check (profile_id = get_current_profile_id());

-- Users can update their own document views (for acceptance)
create policy "Users can update own document views"
  on document_views for update
  using (profile_id = get_current_profile_id())
  with check (profile_id = get_current_profile_id());

-- Admins can read all document views
create policy "Admins can read all document views"
  on document_views for select
  using (is_admin());

-- CRM NOTES POLICIES
-- Admins can read all notes, users cannot read notes
-- (CRM notes are internal admin-only)
create policy "Only admins can read crm notes"
  on crm_notes for select
  using (is_admin());

create policy "Only admins can insert crm notes"
  on crm_notes for insert
  with check (is_admin());

create policy "Only admins can update crm notes"
  on crm_notes for update
  using (is_admin());

create policy "Only admins can delete crm notes"
  on crm_notes for delete
  using (is_admin());

-- ===========================================
-- TRIGGERS
-- ===========================================

-- Update updated_at timestamp automatically
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at_column();

create trigger update_accreditation_records_updated_at
  before update on accreditation_records
  for each row execute function update_updated_at_column();

create trigger update_investment_commitments_updated_at
  before update on investment_commitments
  for each row execute function update_updated_at_column();

create trigger update_documents_updated_at
  before update on documents
  for each row execute function update_updated_at_column();

-- ===========================================
-- SEED DATA
-- ===========================================

-- Seed initial documents (PPM, Subscription Agreement, Form D, Risk Disclosures)
insert into documents (slug, title, document_type, audience, version, is_published) values
  ('ppm', 'Private Placement Memorandum', 'PPM', 'investor', '0.1', true),
  ('subscription-agreement', 'Subscription Agreement', 'Agreement', 'investor', '0.1', true),
  ('form-d', 'Form D Filing Summary', 'Regulatory', 'investor', '0.1', true),
  ('risk-disclosures', 'Risk Disclosures', 'Legal', 'public', '0.1', true)
on conflict (slug) do nothing;
