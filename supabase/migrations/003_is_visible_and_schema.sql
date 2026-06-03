-- Align schema with production: isVisible, short/long descriptions, featured

-- Projects
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS short_description text,
  ADD COLUMN IF NOT EXISTS long_description text,
  ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS "isVisible" boolean DEFAULT false;

-- Migrate legacy description columns if they exist
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'description'
  ) THEN
    UPDATE projects
    SET short_description = COALESCE(short_description, description)
    WHERE short_description IS NULL;
  END IF;
END $$;

ALTER TABLE projects
  ALTER COLUMN short_description SET NOT NULL;

-- FAQs
ALTER TABLE faqs
  ADD COLUMN IF NOT EXISTS "isVisible" boolean DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects (status);
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects (sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_sort ON faqs (sort_order);

-- Public read: only visible items (optional hardening)
DROP POLICY IF EXISTS "Public read projects" ON projects;
CREATE POLICY "Public read visible projects" ON projects
  FOR SELECT USING ("isVisible" = true);

DROP POLICY IF EXISTS "Public read faqs" ON faqs;
CREATE POLICY "Public read visible faqs" ON faqs
  FOR SELECT USING ("isVisible" = true);
