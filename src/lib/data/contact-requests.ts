import { createAdminClient } from "@/lib/supabase/admin";

export async function getUnansweredContactCount(): Promise<number> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("contact_requests")
    .select("id", { count: "exact", head: true })
    .or("isAnswered.is.null,isAnswered.eq.false");

  if (error) {
    console.error("Failed to count contact requests:", error.message);
    return 0;
  }

  return count ?? 0;
}

export async function getAllContactRequests() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch contact requests:", error.message);
    return [];
  }

  return data ?? [];
}
