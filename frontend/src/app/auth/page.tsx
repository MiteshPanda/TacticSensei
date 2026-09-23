"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type AuthMode = "signin" | "signup";

export default function AuthPage() {
  const router = useRouter();
  const { user, loading, signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace("/profile");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) setError(error);
        else router.push("/profile");
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          setError(error);
        } else {
          setSuccess("Account created! Check your email to confirm, then sign in.");
          setMode("signin");
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-foreground-muted animate-float text-4xl">⚽</div>
      </section>
    );
  }

  return (
    <section className="bg-background min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl block mb-4">🏆</span>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {mode === "signin" ? "Welcome Back" : "Join TacticSensei"}
          </h1>
          <p className="text-foreground-muted">
            {mode === "signin"
              ? "Sign in to access your profile and favorites."
              : "Create an account to save your favourites and track progress."}
          </p>
        </div>

        <div className="card p-8">
          {/* Error / Success banners */}
          {error && (
            <div className="mb-4 rounded-xl bg-error/10 border border-error/30 px-4 py-3 text-sm text-error font-medium">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-xl bg-success/10 border border-success/30 px-4 py-3 text-sm text-success font-medium">
              ✅ {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground-muted" htmlFor="displayName">
                  Display Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  placeholder="Your name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background-secondary px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground-muted" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background-secondary px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground-muted" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-background-secondary px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Please wait…"
                : mode === "signin"
                ? "Sign In →"
                : "Create Account →"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background-card px-3 text-xs text-foreground-muted">or continue with</span>
            </div>
          </div>

          {/* Google OAuth */}
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-border bg-background-secondary px-4 py-2.5 text-sm font-medium transition-all hover:border-accent/50 hover:bg-accent/5"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Toggle mode */}
          <p className="mt-6 text-center text-sm text-foreground-muted">
            {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); }}
              className="font-semibold text-accent hover:underline"
            >
              {mode === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
