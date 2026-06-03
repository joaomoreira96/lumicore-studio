-- Projects bilingual columns (PT + EN)

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS title_pt text,
  ADD COLUMN IF NOT EXISTS title_en text,
  ADD COLUMN IF NOT EXISTS short_description_pt text,
  ADD COLUMN IF NOT EXISTS short_description_en text,
  ADD COLUMN IF NOT EXISTS long_description_pt text,
  ADD COLUMN IF NOT EXISTS long_description_en text;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'title'
  ) THEN
    UPDATE projects SET
      title_en = COALESCE(title_en, title),
      title_pt = COALESCE(title_pt, title),
      short_description_en = COALESCE(short_description_en, short_description),
      short_description_pt = COALESCE(short_description_pt, short_description),
      long_description_en = COALESCE(long_description_en, long_description),
      long_description_pt = COALESCE(long_description_pt, long_description)
    WHERE title_en IS NULL OR title_pt IS NULL;

    ALTER TABLE projects DROP COLUMN IF EXISTS title;
    ALTER TABLE projects DROP COLUMN IF EXISTS short_description;
    ALTER TABLE projects DROP COLUMN IF EXISTS long_description;
  END IF;
END $$;

ALTER TABLE projects
  ALTER COLUMN title_pt SET NOT NULL,
  ALTER COLUMN title_en SET NOT NULL,
  ALTER COLUMN short_description_pt SET NOT NULL,
  ALTER COLUMN short_description_en SET NOT NULL;
