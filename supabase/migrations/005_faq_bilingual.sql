-- FAQ bilingual columns (PT + EN)

ALTER TABLE faqs
  ADD COLUMN IF NOT EXISTS question_pt text,
  ADD COLUMN IF NOT EXISTS answer_pt text,
  ADD COLUMN IF NOT EXISTS question_en text,
  ADD COLUMN IF NOT EXISTS answer_en text;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'faqs' AND column_name = 'question'
  ) THEN
    UPDATE faqs SET
      question_en = COALESCE(question_en, question),
      answer_en = COALESCE(answer_en, answer),
      question_pt = COALESCE(question_pt, question),
      answer_pt = COALESCE(answer_pt, answer)
    WHERE question_en IS NULL OR answer_en IS NULL OR question_pt IS NULL OR answer_pt IS NULL;

    ALTER TABLE faqs DROP COLUMN IF EXISTS question;
    ALTER TABLE faqs DROP COLUMN IF EXISTS answer;
  END IF;
END $$;

ALTER TABLE faqs
  ALTER COLUMN question_pt SET NOT NULL,
  ALTER COLUMN answer_pt SET NOT NULL,
  ALTER COLUMN question_en SET NOT NULL,
  ALTER COLUMN answer_en SET NOT NULL;
