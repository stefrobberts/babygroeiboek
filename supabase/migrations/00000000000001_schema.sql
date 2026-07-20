-- Babygroeiboek.nl — initial schema
-- Creates every core table, foreign key, index and updated_at trigger.
-- Row Level Security policies live in 00000000000002_rls.sql.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles — one row per authenticated user, mirrors auth.users
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Automatically create a profile row whenever a user signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- families — a household that shares one or more babies
-- ---------------------------------------------------------------------------
create table public.families (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Ons gezin',
  created_by uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_families_updated_at
  before update on public.families
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- family_members — links profiles to families with a role
-- ---------------------------------------------------------------------------
create table public.family_members (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  role text not null default 'parent'
    check (role in ('mother', 'father', 'parent', 'grandmother', 'grandfather', 'caregiver', 'other')),
  created_at timestamptz not null default now(),
  unique (family_id, profile_id)
);

create index family_members_family_id_idx on public.family_members (family_id);
create index family_members_profile_id_idx on public.family_members (profile_id);

-- ---------------------------------------------------------------------------
-- babies
-- ---------------------------------------------------------------------------
create table public.babies (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families (id) on delete cascade,
  first_name text not null,
  nickname text,
  sex text check (sex in ('girl', 'boy', 'unknown')),
  birth_date date not null,
  birth_time time,
  birth_weight_grams integer,
  birth_length_cm numeric(4, 1),
  birth_head_circumference_cm numeric(4, 1),
  hospital text,
  midwife text,
  blood_type text,
  allergies text,
  medication text,
  general_practitioner text,
  health_insurance text,
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index babies_family_id_idx on public.babies (family_id);

create trigger set_babies_updated_at
  before update on public.babies
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- feeds
-- ---------------------------------------------------------------------------
create table public.feeds (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  type text not null check (type in ('breast', 'bottle', 'solid')),
  side text check (side in ('left', 'right', 'both')),
  amount_ml integer,
  duration_minutes integer,
  intensity text check (intensity in ('short', 'normal', 'long')),
  started_at timestamptz not null default now(),
  note text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index feeds_baby_id_started_at_idx on public.feeds (baby_id, started_at desc);

create trigger set_feeds_updated_at
  before update on public.feeds
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- sleep_sessions
-- ---------------------------------------------------------------------------
create table public.sleep_sessions (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  started_at timestamptz not null,
  ended_at timestamptz,
  note text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sleep_sessions_ended_after_started check (ended_at is null or ended_at > started_at)
);

create index sleep_sessions_baby_id_started_at_idx on public.sleep_sessions (baby_id, started_at desc);

create trigger set_sleep_sessions_updated_at
  before update on public.sleep_sessions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- diapers
-- ---------------------------------------------------------------------------
create table public.diapers (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  type text not null check (type in ('wee', 'poop', 'both')),
  occurred_at timestamptz not null default now(),
  note text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index diapers_baby_id_occurred_at_idx on public.diapers (baby_id, occurred_at desc);

create trigger set_diapers_updated_at
  before update on public.diapers
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- growth
-- ---------------------------------------------------------------------------
create table public.growth (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  measured_at date not null default current_date,
  weight_grams integer,
  height_cm numeric(4, 1),
  head_circumference_cm numeric(4, 1),
  note text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index growth_baby_id_measured_at_idx on public.growth (baby_id, measured_at desc);

create trigger set_growth_updated_at
  before update on public.growth
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- milestones
-- ---------------------------------------------------------------------------
create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  title text not null,
  age_range text not null
    check (age_range in ('0-1m', '2-3m', '4-6m', '6-9m', '9-12m')),
  achieved_at date,
  photo_url text,
  note text,
  is_favorite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index milestones_baby_id_idx on public.milestones (baby_id);

create trigger set_milestones_updated_at
  before update on public.milestones
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- photos
-- ---------------------------------------------------------------------------
create table public.photos (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  storage_path text not null,
  taken_at date not null default current_date,
  caption text,
  is_favorite boolean not null default false,
  milestone_id uuid references public.milestones (id) on delete set null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index photos_baby_id_taken_at_idx on public.photos (baby_id, taken_at desc);

-- ---------------------------------------------------------------------------
-- visitors — kraambezoek
-- ---------------------------------------------------------------------------
create table public.visitors (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  name text not null,
  relation text,
  visited_at date not null default current_date,
  photo_url text,
  gift text,
  note text,
  memory text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index visitors_baby_id_visited_at_idx on public.visitors (baby_id, visited_at desc);

-- ---------------------------------------------------------------------------
-- notes
-- ---------------------------------------------------------------------------
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  title text,
  body text not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index notes_baby_id_idx on public.notes (baby_id);

create trigger set_notes_updated_at
  before update on public.notes
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- hard_moments — pittige momenten
-- ---------------------------------------------------------------------------
create table public.hard_moments (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  category text not null check (
    category in (
      'crying', 'cramps', 'spitting_up', 'bad_night', 'teething',
      'fever', 'vaccination', 'restlessness', 'cold', 'other'
    )
  ),
  occurred_at timestamptz not null default now(),
  note text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index hard_moments_baby_id_occurred_at_idx on public.hard_moments (baby_id, occurred_at desc);

-- ---------------------------------------------------------------------------
-- photo_reminders — automatische fotoherinneringen per leeftijd
-- ---------------------------------------------------------------------------
create table public.photo_reminders (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  milestone_key text not null check (
    milestone_key in (
      '1_day', '1_week', '2_weeks', '1_month', '2_months', '3_months',
      '4_months', '5_months', '6_months', '9_months', '12_months',
      '18_months', '2_years'
    )
  ),
  due_date date not null,
  completed_at timestamptz,
  photo_id uuid references public.photos (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (baby_id, milestone_key)
);

create index photo_reminders_baby_id_due_date_idx on public.photo_reminders (baby_id, due_date);

-- ---------------------------------------------------------------------------
-- timeline — denormalized feed of every event for the diary view
-- ---------------------------------------------------------------------------
create table public.timeline (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  type text not null check (
    type in (
      'birth', 'feed', 'sleep', 'diaper', 'photo', 'milestone',
      'visitor', 'growth', 'note', 'hard_moment'
    )
  ),
  title text not null,
  description text,
  occurred_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  source_table text,
  source_id uuid,
  created_at timestamptz not null default now()
);

create index timeline_baby_id_occurred_at_idx on public.timeline (baby_id, occurred_at desc);
create index timeline_source_idx on public.timeline (source_table, source_id);

-- ---------------------------------------------------------------------------
-- ai_insights
-- ---------------------------------------------------------------------------
create table public.ai_insights (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  type text not null check (
    type in (
      'weekly_summary', 'monthly_report', 'sleep_advice',
      'feeding_pattern', 'growth_explainer', 'tip', 'yearbook_story'
    )
  ),
  title text not null,
  content text not null,
  period_start date,
  period_end date,
  created_at timestamptz not null default now()
);

create index ai_insights_baby_id_created_at_idx on public.ai_insights (baby_id, created_at desc);

-- ---------------------------------------------------------------------------
-- yearbooks
-- ---------------------------------------------------------------------------
create table public.yearbooks (
  id uuid primary key default gen_random_uuid(),
  baby_id uuid not null references public.babies (id) on delete cascade,
  year integer not null,
  title text,
  cover_photo_url text,
  content jsonb not null default '{}'::jsonb,
  generated_at timestamptz,
  created_at timestamptz not null default now(),
  unique (baby_id, year)
);

create index yearbooks_baby_id_idx on public.yearbooks (baby_id);

-- ---------------------------------------------------------------------------
-- notifications
-- ---------------------------------------------------------------------------
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  family_id uuid not null references public.families (id) on delete cascade,
  type text not null check (
    type in (
      'photo_reminder', 'feeding_reminder', 'nap_reminder',
      'new_milestone', 'weekly_summary', 'system'
    )
  ),
  title text not null,
  body text,
  link text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index notifications_profile_id_is_read_idx on public.notifications (profile_id, is_read);
