-- HomeStake Capital investor portal MVP schema
-- Designed for a Reg D 506(c) portal with accredited investor onboarding.
-- Placeholder payment and signature steps remain non-live until attorney review.

create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
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

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references profiles(id) on delete cascade,
  title text,
  permissions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists crm_notes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  admin_user_id uuid references admin_users(id) on delete set null,
  note text not null,
  note_type text not null default 'general',
  created_at timestamptz not null default now()
);

create index if not exists idx_accreditation_records_profile_id on accreditation_records(profile_id);
create index if not exists idx_investment_commitments_profile_id on investment_commitments(profile_id);
create index if not exists idx_crm_notes_profile_id on crm_notes(profile_id);
