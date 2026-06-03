-- Site settings (singleton row) — footer text, email, social links

CREATE TABLE IF NOT EXISTS site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  email text,
  linkedin text,
  github text,
  facebook text,
  instagram text,
  footer_text_pt text NOT NULL DEFAULT 'Software • Web • Experiências Interativas',
  footer_text_en text NOT NULL DEFAULT 'Software • Web • Interactive Experiences',
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_single_row CHECK (id = 1)
);

INSERT INTO site_settings (
  id,
  email,
  linkedin,
  github,
  facebook,
  instagram,
  footer_text_pt,
  footer_text_en
)
VALUES (
  1,
  'hello@lumicore.studio',
  'https://linkedin.com/company/lumicore-studio',
  'https://github.com/lumicore-studio',
  NULL,
  NULL,
  'Software • Web • Experiências Interativas',
  'Software • Web • Interactive Experiences'
)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read site_settings" ON site_settings;
CREATE POLICY "Public read site_settings" ON site_settings
  FOR SELECT USING (true);
