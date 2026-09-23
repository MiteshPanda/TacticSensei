import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, BarChart2 } from "lucide-react";
import { getModule } from "@/data/academy/curriculum";

export const metadata: Metadata = {
  title: "Competitions | Football Academy | TacticSensei",
  description:
    "Understand the major football tournaments and leagues — from the FIFA World Cup to the UEFA Champions League, Premier League, and La Liga.",
};

const difficultyColors: Record<string, string> = {
  beginner: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20",
  intermediate: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20",
  advanced: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-900/20",
};

export default function CompetitionsModulePage() {
  const mod = getModule("competitions");
  if (!mod) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-background-secondary/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 dark:bg-background-secondary/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-yellow-500/8 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-amber-500/8 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/academy"
            className="mb-6 inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-accent transition-colors"
          >
            ← Back to Academy
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background-card text-4xl shadow-md">
              {mod.icon}
            </div>
            <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
              Level {mod.level}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Major <span className="text-accent">Competitions</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            Football has two worlds that coexist beautifully — domestic leagues, where clubs battle 
            week in, week out for 38 games, and international tournaments, where nations and elite 
            clubs collide for glory. Understanding each competition's structure, history, and stakes 
            makes you a truly informed football fan.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-foreground-muted">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-accent" />
              {mod.lessons.length} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" />
              ~20 min total reading
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart2 className="h-4 w-4 text-accent" />
              All Beginner level
            </span>
          </div>
        </div>
      </section>

      {/* Domestic vs International */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-blue-400/20 bg-blue-50/50 p-5 dark:bg-blue-900/10">
              <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">🏟️ Domestic Leagues</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Season-long competitions where clubs in the same country compete. The Premier League,
                La Liga, Bundesliga, and Serie A are the most prestigious. They run August–May with
                promotion and relegation at stake.
              </p>
            </div>
            <div className="rounded-2xl border border-purple-400/20 bg-purple-50/50 p-5 dark:bg-purple-900/10">
              <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">🌍 International Tournaments</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                The World Cup (nations) and UEFA Champions League (clubs) are the pinnacle. These
                knockout-style tournaments create the most dramatic moments — single elimination
                raises the stakes to maximum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold">Lessons in This Module</h2>
          <div className="space-y-4">
            {mod.lessons.map((lesson, idx) => (
              <Link
                key={lesson.slug}
                href={`/academy/competitions/${lesson.slug}`}
                className="group glass-card flex items-center gap-5 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background-card text-2xl shadow-sm">
                  {lesson.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                      Lesson {idx + 1}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${difficultyColors[lesson.difficulty]}`}
                    >
                      {lesson.difficulty}
                    </span>
                  </div>
                  <p className="font-bold text-foreground group-hover:text-accent transition-colors">
                    {lesson.title}
                  </p>
                  <p className="mt-0.5 text-sm text-foreground-muted line-clamp-1">
                    {lesson.description}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-xs text-foreground-muted">
                  <span className="hidden sm:block">{lesson.readingTime} min</span>
                  <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

