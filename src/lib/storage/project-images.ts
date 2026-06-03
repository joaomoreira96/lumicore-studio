import { createAdminClient } from "@/lib/supabase/admin";

export const PROJECT_IMAGES_BUCKET = "project-images";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function uploadProjectImage(
  file: File,
  projectId: string
): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Formato inválido. Use JPEG, PNG, WebP ou GIF.");
  }

  if (file.size > MAX_BYTES) {
    throw new Error("A imagem deve ter no máximo 5 MB.");
  }

  const supabase = createAdminClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ["jpeg", "jpg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const path = `${projectId}/${Date.now()}.${safeExt === "jpeg" ? "jpg" : safeExt}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(PROJECT_IMAGES_BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
