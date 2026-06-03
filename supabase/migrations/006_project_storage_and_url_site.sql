-- Project site URL + image storage bucket

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS url_site text;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public read project images" ON storage.objects;
CREATE POLICY "Public read project images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'project-images');
