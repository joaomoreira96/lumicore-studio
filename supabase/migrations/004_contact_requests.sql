-- contact_requests admin access

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins read contact_requests" ON contact_requests;
CREATE POLICY "Admins read contact_requests" ON contact_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins update contact_requests" ON contact_requests;
CREATE POLICY "Admins update contact_requests" ON contact_requests
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE INDEX IF NOT EXISTS idx_contact_requests_created
  ON contact_requests (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_requests_unanswered
  ON contact_requests (isAnswered)
  WHERE "isAnswered" IS NOT TRUE;
