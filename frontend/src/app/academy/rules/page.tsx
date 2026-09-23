import type { Metadata } from "next";
import Link from "next/link";
import { curriculum, getModule } from "@/data/academy/curriculum";

export const metadata: Metadata = {
  title: "Rules of Football | Football Academy | TacticSensei",
  description:
    "Learn the official rules of football — from the offside rule to VAR decisions. Beginner-friendly lessons covering match structure, fouls, cards, free kicks, penalties, and more.",
};

const difficultyColors: Record<string, string> = {
  beginner:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  intermediate:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  advanced:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function RulesModulePage() {
  const module = getModule("rules");

  if (!module) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-foreground-muted">Module not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-green-900/60 via-background to-background py-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4">
          <span className="mb-4 inline-block text-6xl">{module.icon}</span>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {module.title}
          </h1>
          <p className="mx-auto mb-6 max-w-xl text-lg text-foreground-muted">
            {module.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground-muted">
            <span className="flex items-center gap-1.5">
              <span className="text-accent">📚</span>
              {module.lessons.length} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent">⏱</span>
              ~{module.lessons.reduce((acc, l) => acc + (l.readingTime ?? 4), 0)} min total
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent">🎯</span>
              Beginner friendly
            </span>
          </div>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="mx-auto max-w-5xl px-4 pt-12">
        <h2 className="mb-6 text-2xl font-bold text-foreground">All Lessons</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {module.lessons.map((lesson, index) => (
            <Link
              key={lesson.slug}
              href={`/academy/rules/${lesson.slug}`}
              className="glass-card group flex flex-col gap-3 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
            >
              {/* Number + Emoji */}
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-3xl">{lesson.emoji}</span>
              </div>

              {/* Title & description */}
              <div className="flex-1">
                <h3 className="mb-1 font-bold text-foreground group-hover:text-accent transition-colors">
                  {lesson.title}
                </h3>
                {lesson.description && (
                  <p className="text-sm text-foreground-muted line-clamp-2">
                    {lesson.description}
                  </p>
                )}
              </div>

              {/* Footer meta */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground-muted">
                  ⏱ {lesson.readingTime ?? 4} min read
                </span>
                {lesson.difficulty && (
                  <span
                    className={`rounded-full px-2 py-0.5 font-medium capitalize ${
                      difficultyColors[lesson.difficulty] ??
                      difficultyColors.beginner
                    }`}
                  >
                    {lesson.difficulty}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
          <h3 className="mb-2 text-xl font-bold text-foreground">
            Ready to master the rules?
          </h3>
          <p className="mb-5 text-foreground-muted">
            Start with Lesson 1 and work your way through — each lesson builds
            on the last.
          </p>
          <Link
            href="/academy/rules/how-a-match-works"
            className="btn-primary inline-block"
          >
            Start Learning →
          </Link>
        </div>
      </section>
    </main>
  );
}

