-- Lumicore Studio initial schema

CREATE TYPE project_status AS ENUM ('completed', 'in_development', 'archived');

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_pt TEXT,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  description_pt TEXT,
  status project_status NOT NULL DEFAULT 'in_development',
  image_url TEXT,
  project_url TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  question_pt TEXT,
  answer TEXT NOT NULL,
  answer_pt TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role = 'admin'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  visitors INTEGER NOT NULL DEFAULT 0,
  visits INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_device_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  device_type TEXT NOT NULL,
  visitors INTEGER NOT NULL DEFAULT 0,
  UNIQUE (date, device_type)
);

CREATE TABLE IF NOT EXISTS daily_city_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  country TEXT,
  city TEXT,
  visitors INTEGER NOT NULL DEFAULT 0,
  UNIQUE (date, country, city)
);

CREATE TABLE IF NOT EXISTS visitor_sessions (
  visitor_id TEXT NOT NULL,
  date DATE NOT NULL,
  PRIMARY KEY (visitor_id, date)
);

CREATE INDEX idx_projects_sort_order ON projects (sort_order ASC);
CREATE INDEX idx_faqs_sort_order ON faqs (sort_order ASC);
CREATE INDEX idx_daily_device_stats_date ON daily_device_stats (date);
CREATE INDEX idx_daily_city_stats_date ON daily_city_stats (date);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER daily_stats_updated_at
  BEFORE UPDATE ON daily_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_device_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_city_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read faqs" ON faqs
  FOR SELECT USING (true);

CREATE POLICY "Admins manage projects" ON projects
  FOR ALL USING (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins manage faqs" ON faqs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins read app_users" ON app_users
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Admins read daily_stats" ON daily_stats
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins read daily_device_stats" ON daily_device_stats
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins read daily_city_stats" ON daily_city_stats
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  );

INSERT INTO projects (title, title_pt, slug, description, description_pt, status, technologies, sort_order, project_url) VALUES
  (
    'Business Website',
    'Website Empresarial',
    'business-website',
    'Business website with custom administration dashboard.',
    'Website empresarial com painel de administração personalizado.',
    'completed',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    1,
    NULL
  ),
  (
    'Future Games Hub',
    'Future Games Hub',
    'future-games-hub',
    'Interactive multiplayer mini-games platform inspired by modern browser gaming experiences.',
    'Plataforma interativa de mini-jogos multijogador inspirada em experiências modernas de jogos no browser.',
    'in_development',
    ARRAY['Next.js', 'React', 'TypeScript', 'Supabase'],
    2,
    NULL
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO faqs (question, question_pt, answer, answer_pt, sort_order) VALUES
  (
    'How much does a project cost?',
    'Quanto custa um projeto?',
    'Every project is unique. After an initial consultation, a custom proposal will be prepared.',
    'Cada projeto é único. Após uma consulta inicial, será preparada uma proposta personalizada.',
    1
  ),
  (
    'How long does a project take?',
    'Quanto tempo demora um projeto?',
    'Project timelines depend on scope and complexity.',
    'Os prazos dependem do âmbito e complexidade do projeto.',
    2
  ),
  (
    'Do you provide maintenance?',
    'Oferecem manutenção?',
    'Yes. Ongoing maintenance and support services are available.',
    'Sim. Serviços de manutenção e suporte contínuos estão disponíveis.',
    3
  ),
  (
    'Can you build custom software?',
    'Constroem software personalizado?',
    'Yes. Lumicore Studio develops custom software tailored to business requirements.',
    'Sim. A Lumicore Studio desenvolve software personalizado adaptado às necessidades do negócio.',
    4
  );
