"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL ?? "https://learnfootball-backend.onrender.com/api/v1";

interface Stats {
  users?: number;
  lessons?: number;
  players?: number;
  teams?: number;
  coaches?: number;
  glossary?: number;
  quizzes?: number;
}

const SECTIONS = [
  { key: "glossary", label: "Glossary", emoji: "📖", description: "Terms & definitions" },
  { key: "players", label: "Players", emoji: "👤", description: "Player profiles" },
  { key: "teams", label: "Teams", emoji: "🏟️", description: "National teams" },
  { key: "coaches", label: "Coaches", emoji: "🧑‍🏫", description: "Manager profiles" },
  { key: "lessons", label: "Lessons", emoji: "📚", description: "Academy content" },
  { key: "quizzes", label: "Quizzes", emoji: "🧩", description: "Quiz questions" },
  { key: "users", label: "Users", emoji: "👥", description: "User accounts" },
];

export default function AdminPage() {
  const router = useRouter();
  const { user, session, loading } = useAuth();
  const [stats, setStats] = useState<Stats>({});
  const [statsLoading, setStatsLoading] = useState(false);

  const role: string = (user?.app_metadata?.role as string) ?? "user";
  const isAdmin = role === "admin" || role === "super_admin";

  // Redirect non-admins
  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
    if (!loading && user && !isAdmin) router.replace("/");
  }, [loading, user, isAdmin, router]);

  // Fetch live stats
  useEffect(() => {
    if (!session?.access_token || !isAdmin) return;
    setStatsLoading(true);
    fetch(`${API}/admin/stats`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setStats(data); })
      .finally(() => setStatsLoading(false));
  }, [session, isAdmin]);

  if (loading || !user || !isAdmin) {
    return (
      <section className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-foreground-muted animate-float text-4xl">⚙️</div>
      </section>
    );
  }

  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">⚙️</span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Admin{" "}
                <span className="bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="mt-1 text-foreground-muted">
                Signed in as <span className="font-semibold text-foreground">{user.email}</span>{" "}
                <span className="inline-flex items-center rounded-full bg-accent-light px-2 py-0.5 text-[11px] font-bold text-accent uppercase">
                  {role}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-in-up stagger-1">
          {[
            { label: "Total Users", key: "users" },
            { label: "Lessons", key: "lessons" },
            { label: "Glossary Terms", key: "glossary" },
            { label: "Players", key: "players" },
          ].map((s) => (
            <div key={s.label} className="card px-4 py-5 text-center">
              {statsLoading ? (
                <div className="h-8 w-16 mx-auto rounded bg-border animate-pulse mb-2" />
              ) : (
                <p className="text-2xl font-bold text-accent">
                  {stats[s.key as keyof Stats] ?? "—"}
                </p>
              )}
              <p className="mt-1 text-xs text-foreground-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <h2 className="mb-6 text-xl font-bold animate-fade-in-up stagger-2">
          Content Management
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up stagger-3">
          {SECTIONS.map((section) => {
            const count = stats[section.key as keyof Stats];
            return (
              <Link
                key={section.key}
                href={`/admin/${section.key}`}
                className="card group cursor-pointer hover:border-accent/50 hover:scale-[1.02] transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-2xl transition-transform duration-300 group-hover:scale-110">
                      {section.emoji}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{section.label}</h3>
                      <p className="text-sm text-foreground-muted">
                        {statsLoading ? "Loading…" : count !== undefined ? `${count} entries` : section.description}
                      </p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-foreground-muted transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
