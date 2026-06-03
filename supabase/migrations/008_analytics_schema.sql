-- Analytics tables (unique visit per day + device breakdown)

CREATE TABLE IF NOT EXISTS daily_stats (
  day date NOT NULL PRIMARY KEY,
  total_visits integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS daily_device_stats (
  day date NOT NULL,
  device text NOT NULL,
  visits integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (day, device)
);

CREATE INDEX IF NOT EXISTS idx_daily_device_stats_day ON daily_device_stats (day);

DROP TRIGGER IF EXISTS daily_stats_updated_at ON daily_stats;
CREATE TRIGGER daily_stats_updated_at
  BEFORE UPDATE ON daily_stats
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_device_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins read daily_stats" ON daily_stats;
CREATE POLICY "Admins read daily_stats" ON daily_stats
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins read daily_device_stats" ON daily_device_stats;
CREATE POLICY "Admins read daily_device_stats" ON daily_device_stats
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  );
