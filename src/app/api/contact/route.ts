import { NextResponse } from "next/server";
import { z } from "zod";
import { getSiteSettings } from "@/lib/data/site-settings";
import { getContactEmail } from "@/lib/site-settings";
import { createAdminClient } from "@/lib/supabase/admin";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Invalid email address").max(200),
  company: z
    .string()
    .trim()
    .max(200)
    .optional()
    .nullable()
    .transform((v) => v || null),
  message: z.string().trim().min(5, "Message must be at least 5 characters").max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? "Invalid input. Check all fields.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { name, email, company, message } = parsed.data;

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("SUPABASE_SERVICE_ROLE_KEY is missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createAdminClient();

    const { error: insertError } = await supabase.from("contact_requests").insert({
      name,
      email,
      company,
      message,
    });

    if (insertError) {
      console.error("contact_requests insert failed:", insertError.message);
      return NextResponse.json(
        { error: "Could not save your message. Please try again." },
        { status: 500 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const siteEmail = getContactEmail(await getSiteSettings());
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Lumicore Studio <onboarding@resend.dev>",
            to: [siteEmail],
            reply_to: email,
            subject: `New contact from ${name}`,
            text: [
              `Name: ${name}`,
              `Email: ${email}`,
              company ? `Company: ${company}` : null,
              "",
              message,
            ]
              .filter(Boolean)
              .join("\n"),
          }),
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
