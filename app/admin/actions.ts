"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";

const ALLOWED_STATUSES = new Set([
  "new",
  "demo_sent",
  "feedback_received",
  "interested",
  "converted",
  "archived",
]);

export async function updateWaitlistEntry(formData: FormData) {
  const id = formData.get("id");
  const status = formData.get("status");
  const adminNotes = formData.get("adminNotes");

  if (typeof id !== "string" || typeof status !== "string") {
    throw new Error("Invalid request.");
  }

  if (!ALLOWED_STATUSES.has(status)) {
    throw new Error("Invalid status.");
  }

  const { supabaseAdmin } = await requireAdmin();

  const { error } = await supabaseAdmin
    .from("waitlist")
    .update({
      status,
      admin_notes:
        typeof adminNotes === "string" && adminNotes.trim().length > 0
          ? adminNotes.trim()
          : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to update waitlist entry:", error);
    throw new Error("Could not update entry.");
  }

  revalidatePath("/admin");
}