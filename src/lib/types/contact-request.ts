export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  isAnswered: boolean | null;
  created_at: string;
}
