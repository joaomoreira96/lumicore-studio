"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

const ERROR_MESSAGES: Record<string, string> = {
  auth: "Invalid email or password.",
  unauthorized:
    "This account is not registered as admin. Ask an administrator to add your user to app_users.",
  error: "Could not verify admin access. Please try again.",
};

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const verifyRes = await fetch("/api/admin/verify");
    const verifyData = (await verifyRes.json()) as {
      ok: boolean;
      reason?: string;
    };

    if (!verifyData.ok) {
      await supabase.auth.signOut();
      setError(
        ERROR_MESSAGES[verifyData.reason ?? ""] ??
          "Sign in failed. Please try again."
      );
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-lumi-bg px-6">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-lumi-bg-secondary p-8">
        <Link
          href="/"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-lumi-muted transition-colors hover:bg-white/5 hover:text-lumi-text"
          aria-label="Close and return to website"
        >
          <X className="size-5" />
        </Link>

        <h1 className="font-heading text-2xl font-bold pr-8">Admin Login</h1>
        <p className="mt-2 text-sm text-lumi-muted">
          Sign in with your admin credentials.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-lumi-muted">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-white/10 bg-lumi-bg"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm text-lumi-muted">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-white/10 bg-lumi-bg"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-lumi-blue hover:bg-lumi-blue/90"
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
