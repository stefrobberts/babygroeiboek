-- Babygroeiboek.nl — Supabase Storage
-- Private buckets for baby photos and avatars. Objects are stored under a
-- "{family_id}/..." prefix so RLS can scope access per family. No bucket is
-- ever public — files are served through signed URLs.

insert into storage.buckets (id, name, public)
values
  ('baby-photos', 'baby-photos', false),
  ('avatars', 'avatars', false)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- baby-photos — path convention: "{family_id}/{baby_id}/{filename}"
-- ---------------------------------------------------------------------------
create policy "baby_photos_select_family" on storage.objects
  for select using (
    bucket_id = 'baby-photos'
    and public.is_family_member((storage.foldername(name))[1]::uuid)
  );

create policy "baby_photos_insert_family" on storage.objects
  for insert with check (
    bucket_id = 'baby-photos'
    and public.is_family_member((storage.foldername(name))[1]::uuid)
  );

create policy "baby_photos_update_family" on storage.objects
  for update using (
    bucket_id = 'baby-photos'
    and public.is_family_member((storage.foldername(name))[1]::uuid)
  );

create policy "baby_photos_delete_family" on storage.objects
  for delete using (
    bucket_id = 'baby-photos'
    and public.is_family_member((storage.foldername(name))[1]::uuid)
  );

-- ---------------------------------------------------------------------------
-- avatars — path convention: "{profile_id}/{filename}", owner-only
-- ---------------------------------------------------------------------------
create policy "avatars_select_own" on storage.objects
  for select using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_update_own" on storage.objects
  for update using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_delete_own" on storage.objects
  for delete using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
