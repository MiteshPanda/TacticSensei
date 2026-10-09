import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Zap } from "lucide-react";
import { curriculum, totalLessons } from "@/data/academy/curriculum";

export const metadata: Metadata = {
  title: "Football Academy | TacticSensei",
  description:
    "Learn football from scratch with structured lessons on rules, positions, formations, tactics, and history. From beginner to tactical expert.",
};

const learningPath = [
  { step: 1, module: "rules", label: "Start with the Rules", tip: "Understand offside, fouls, cards, and how a match works." },
  { step: 2, module: "positions", label: "Learn the Positions", tip: "Know what every player does on the pitch." },
  { step: 3, module: "formations", label: "Understand Formations", tip: "See how 11 players are organized into tactical shapes." },
  { step: 4, module: "tactics", label: "Grasp Tactical Concepts", tip: "Learn Gegenpressing, Tiki-Taka, and how coaches think." },
  { step: 5, module: "history", label: "Explore Football History", tip: "Discover the legends and eras that shaped the game." },
  { step: 6, module: "competitions", label: "Know the Competitions", tip: "From the World Cup to the Premier League." },
];

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-background-secondary/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 dark:bg-background-secondary/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-light/50 px-4 py-2 text-sm font-semibold text-accent dark:bg-accent-light/10">
            <BookOpen className="h-4 w-4" />
            {totalLessons} lessons across {curriculum.length} modules
          </div>
          <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Football <span className="text-accent">Academy</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            A complete structured curriculum — from your very first question about football to advanced tactical understanding. Take it at your own pace.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/academy/rules/how-a-match-works" className="btn-primary px-8 py-3.5">
              Start from the Beginning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/sensei" className="btn-secondary px-8 py-3.5">
              🤖 Ask the AI Sensei
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended Learning Path */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Recommended Learning Path</h2>
            <p className="mt-3 text-foreground-muted">Follow this sequence for the best learning experience</p>
          </div>
          <div className="space-y-4">
            {learningPath.map(({ step, module, label, tip }) => {
              const mod = curriculum.find((m) => m.slug === module)!;
              return (
                <Link
                  key={step}
                  href={`/academy/${module}`}
                  className="group glass-card flex items-center gap-5 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-foreground-inverse text-lg font-bold">
                    {step}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground group-hover:text-accent">{label}</p>
                    <p className="mt-0.5 text-sm text-foreground-muted">{tip}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-foreground-muted">
                    <span>{mod.lessons.length} lessons</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-accent" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Modules Grid */}
      <section className="bg-background-secondary/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 dark:bg-background-secondary/10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">All Modules</h2>
            <p className="mt-3 text-foreground-muted">Jump into any module that interests you</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {curriculum.map((mod) => (
              <Link
                key={mod.slug}
                href={`/academy/${mod.slug}`}
                className={`glass-card group relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-accent/40`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-40 transition-opacity group-hover:opacity-70`} />

                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-background-card text-3xl shadow-sm">
                    {mod.icon}
                  </div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-full bg-background-card/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground-muted">
                      Level {mod.level}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{mod.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-foreground-muted">{mod.description}</p>

                  {/* Lesson list preview */}
                  <ul className="mb-4 space-y-1">
                    {mod.lessons.slice(0, 3).map((lesson) => (
                      <li key={lesson.slug} className="flex items-center gap-2 text-xs text-foreground-muted">
                        <CheckCircle2 className="h-3 w-3 shrink-0 text-accent" />
                        {lesson.title}
                      </li>
                    ))}
                    {mod.lessons.length > 3 && (
                      <li className="text-xs text-accent font-medium pl-5">+{mod.lessons.length - 3} more lessons</li>
                    )}
                  </ul>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Start Module
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border-light bg-background-card p-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { value: String(totalLessons), label: "Total Lessons" },
                { value: String(curriculum.length), label: "Modules" },
                { value: "5", label: "Quiz per Lesson" },
                { value: "Free", label: "Always" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-bold text-accent">{value}</p>
                  <p className="mt-1 text-sm text-foreground-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

