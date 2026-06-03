-- Fix app_users RLS: allow authenticated users to read their own row.
-- The previous policy was circular (required already being in app_users to read app_users).

DROP POLICY IF EXISTS "Admins read app_users" ON app_users;

CREATE POLICY "Users read own app_user row" ON app_users
  FOR SELECT
  USING (id = auth.uid());

-- Ensure admin project/faq policies also apply on INSERT/UPDATE (WITH CHECK)
DROP POLICY IF EXISTS "Admins manage projects" ON projects;
CREATE POLICY "Admins manage projects" ON projects
  FOR ALL
  USING (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins manage faqs" ON faqs;
CREATE POLICY "Admins manage faqs" ON faqs
  FOR ALL
  USING (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM app_users WHERE id = auth.uid() AND role = 'admin')
  );
