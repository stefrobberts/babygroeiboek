-- Babygroeiboek.nl — Row Level Security
-- Every table is scoped to the family the authenticated user belongs to.
-- Helper functions are SECURITY DEFINER so they can read family_members /
-- babies without triggering recursive RLS checks on those tables.

-- ---------------------------------------------------------------------------
-- Helper functions
-- ---------------------------------------------------------------------------
create or replace function public.is_family_member(target_family_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.family_members fm
    where fm.family_id = target_family_id
      and fm.profile_id = auth.uid()
  );
$$;

create or replace function public.family_id_for_baby(target_baby_id uuid)
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select b.family_id
  from public.babies b
  where b.id = target_baby_id;
$$;

-- ---------------------------------------------------------------------------
-- Enable RLS everywhere
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.families enable row level security;
alter table public.family_members enable row level security;
alter table public.babies enable row level security;
alter table public.feeds enable row level security;
alter table public.sleep_sessions enable row level security;
alter table public.diapers enable row level security;
alter table public.growth enable row level security;
alter table public.milestones enable row level security;
alter table public.photos enable row level security;
alter table public.visitors enable row level security;
alter table public.notes enable row level security;
alter table public.hard_moments enable row level security;
alter table public.photo_reminders enable row level security;
alter table public.timeline enable row level security;
alter table public.ai_insights enable row level security;
alter table public.yearbooks enable row level security;
alter table public.notifications enable row level security;

-- ---------------------------------------------------------------------------
-- profiles — a user may only see and edit their own profile
-- ---------------------------------------------------------------------------
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());

create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- ---------------------------------------------------------------------------
-- families
-- ---------------------------------------------------------------------------
create policy "families_select_member" on public.families
  for select using (public.is_family_member(id));

create policy "families_insert_authenticated" on public.families
  for insert with check (created_by = auth.uid());

create policy "families_update_member" on public.families
  for update using (public.is_family_member(id))
  with check (public.is_family_member(id));

create policy "families_delete_creator" on public.families
  for delete using (created_by = auth.uid());

-- ---------------------------------------------------------------------------
-- family_members
-- ---------------------------------------------------------------------------
create policy "family_members_select_member" on public.family_members
  for select using (public.is_family_member(family_id));

create policy "family_members_insert_member_or_creator" on public.family_members
  for insert with check (
    public.is_family_member(family_id)
    or exists (
      select 1 from public.families f
      where f.id = family_id and f.created_by = auth.uid()
    )
  );

create policy "family_members_update_member" on public.family_members
  for update using (public.is_family_member(family_id))
  with check (public.is_family_member(family_id));

create policy "family_members_delete_member" on public.family_members
  for delete using (public.is_family_member(family_id));

-- ---------------------------------------------------------------------------
-- babies
-- ---------------------------------------------------------------------------
create policy "babies_select_family" on public.babies
  for select using (public.is_family_member(family_id));

create policy "babies_insert_family" on public.babies
  for insert with check (public.is_family_member(family_id));

create policy "babies_update_family" on public.babies
  for update using (public.is_family_member(family_id))
  with check (public.is_family_member(family_id));

create policy "babies_delete_family" on public.babies
  for delete using (public.is_family_member(family_id));

-- ---------------------------------------------------------------------------
-- Generic per-baby tables: feeds, sleep_sessions, diapers, growth,
-- milestones, photos, visitors, notes, hard_moments, photo_reminders,
-- timeline, ai_insights, yearbooks — all scoped through family_id_for_baby().
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'feeds', 'sleep_sessions', 'diapers', 'growth', 'milestones', 'photos',
    'visitors', 'notes', 'hard_moments', 'photo_reminders', 'timeline',
    'ai_insights', 'yearbooks'
  ]
  loop
    execute format(
      'create policy "%1$s_select_family" on public.%1$s
         for select using (public.is_family_member(public.family_id_for_baby(baby_id)));',
      t
    );
    execute format(
      'create policy "%1$s_insert_family" on public.%1$s
         for insert with check (public.is_family_member(public.family_id_for_baby(baby_id)));',
      t
    );
    execute format(
      'create policy "%1$s_update_family" on public.%1$s
         for update using (public.is_family_member(public.family_id_for_baby(baby_id)))
         with check (public.is_family_member(public.family_id_for_baby(baby_id)));',
      t
    );
    execute format(
      'create policy "%1$s_delete_family" on public.%1$s
         for delete using (public.is_family_member(public.family_id_for_baby(baby_id)));',
      t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- notifications — only the owning profile can read or update their own
-- notifications. Rows are created by trusted server-side code (service role
-- bypasses RLS), never directly by the client.
-- ---------------------------------------------------------------------------
create policy "notifications_select_own" on public.notifications
  for select using (profile_id = auth.uid());

create policy "notifications_update_own" on public.notifications
  for update using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

create policy "notifications_delete_own" on public.notifications
  for delete using (profile_id = auth.uid());
