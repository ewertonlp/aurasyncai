import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { updateWaitlistEntry } from "./actions";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "demo_sent", label: "Demo sent" },
  { value: "feedback_received", label: "Feedback received" },
  { value: "interested", label: "Interested" },
  { value: "converted", label: "Converted" },
  { value: "archived", label: "Archived" },
];

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  demo_sent: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  feedback_received:
    "bg-violet-500/15 text-violet-300 border-violet-500/30",
  interested: "bg-lime-500/15 text-lime-300 border-lime-500/30",
  converted: "bg-green-500/15 text-green-300 border-green-500/30",
  archived: "bg-gray-500/15 text-gray-300 border-gray-500/30",
};

export default async function AdminPage() {
  const { supabaseAdmin, user } = await requireAdmin();

  const { data: entries, error } = await supabaseAdmin
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load waitlist:", error);
  }

  const total = entries?.length ?? 0;
  const pending = entries?.filter((entry) => entry.status === "new").length ?? 0;
  const converted =
    entries?.filter((entry) => entry.status === "converted").length ?? 0;

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">AuraSyncAI Admin</h1>
            <p className="text-sm text-gray-400">
              Signed in as {user.email}
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-white/25 hover:text-white"
          >
            Back to site
          </Link>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Total leads</p>
            <p className="mt-1 text-3xl font-bold">{total}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Pending demos</p>
            <p className="mt-1 text-3xl font-bold">{pending}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Converted</p>
            <p className="mt-1 text-3xl font-bold">{converted}</p>
          </div>
        </section>

        {error && (
          <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            Could not load the waitlist.
          </p>
        )}

        {!entries?.length ? (
          <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">
            No waitlist entries yet.
          </p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-[240px]">
                    <p className="font-semibold">{entry.email}</p>

                    <p className="mt-1 text-sm text-gray-400">
                      {entry.product_category ?? "No category"} ·{" "}
                      {new Date(entry.created_at).toLocaleString()}
                    </p>

                    {entry.instagram && (
                      <a
                        href={
                          entry.instagram.startsWith("http")
                            ? entry.instagram
                            : `https://${entry.instagram.replace(/^@/, "")}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-block text-sm text-accent-lime hover:underline"
                      >
                        {entry.instagram}
                      </a>
                    )}

                    {entry.product_photo_url && (
                      <a
                        href={entry.product_photo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block rounded-lg bg-black/40 px-3 py-1 text-xs text-gray-300 hover:text-white"
                      >
                        Open product photo
                      </a>
                    )}
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      STATUS_STYLES[entry.status] ?? STATUS_STYLES.new
                    }`}
                  >
                    {entry.status.replace("_", " ")}
                  </span>
                </div>

                {entry.product_photo_url && (
                  <div className="mt-4">
                    <Image
                      src={entry.product_photo_url}
                      alt={`Product photo from ${entry.email}`}
                      width={180}
                      height={180}
                      unoptimized
                      className="h-44 w-44 rounded-xl border border-white/10 object-cover"
                    />
                  </div>
                )}

                <form
                  action={updateWaitlistEntry}
                  className="mt-4 grid gap-3 sm:grid-cols-[180px_1fr_auto]"
                >
                  <input type="hidden" name="id" value={entry.id} />

                  <select
                    name="status"
                    defaultValue={entry.status}
                    className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <input
                    name="adminNotes"
                    defaultValue={entry.admin_notes ?? ""}
                    placeholder="Internal notes..."
                    className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white placeholder-gray-500"
                  />

                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
                  >
                    Save
                  </button>
                </form>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}