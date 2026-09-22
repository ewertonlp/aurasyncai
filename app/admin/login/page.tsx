"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { toast, Toaster } from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (!data.user) {
        toast.error("Login failed. Please try again.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Unexpected login error:", error);
      toast.error("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-container w-full space-y-6">
      <Toaster position="bottom-center" />

      <h2 className="text-center text-2xl font-bold text-white">
        Login to PromoteWithAI
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-gray-300"
            htmlFor="email"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2 text-white focus:border-transparent focus:ring-2 focus:ring-blue-400"
            placeholder="you@domain.com"
            required
          />
        </div>

        <div>
          <label
            className="mb-1 block text-sm font-medium text-gray-300"
            htmlFor="password"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2 text-white focus:border-transparent focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full btn-accent-blue ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loading ? "Logging in..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/register"
            className="text-blue-400 hover:text-blue-300"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
