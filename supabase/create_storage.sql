-- Create a new bucket for PDP previews
insert into storage.buckets (id, name, public)
values ('pdp-previews', 'pdp-previews', true)
on conflict (id) do nothing;

-- Set up public access policies
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'pdp-previews' );

create policy "Admin Uploads"
on storage.objects for insert
with check ( bucket_id = 'pdp-previews' );

create policy "Admin Deletes"
on storage.objects for delete
using ( bucket_id = 'pdp-previews' );
