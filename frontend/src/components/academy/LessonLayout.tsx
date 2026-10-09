"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, BookOpen, Clock, Zap, MessageCircle, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { curriculum, type Module, type Lesson } from "@/data/academy/curriculum";

interface LessonLayoutProps {
  moduleSlug: string;
  lessonSlug: string;
  children: React.ReactNode;
  title: string;
  description: string;
  readingTime: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  emoji: string;
}

const difficultyConfig = {
  beginner: { label: "Beginner", color: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30" },
  intermediate: { label: "Intermediate", color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30" },
  advanced: { label: "Advanced", color: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30" },
};

export default function LessonLayout({
  moduleSlug,
  lessonSlug,
  children,
  title,
  description,
  readingTime,
  difficulty,
  emoji,
}: LessonLayoutProps) {
  const pathname = usePathname();
  const mod = curriculum.find((m) => m.slug === moduleSlug);
  const lessonIndex = mod?.lessons.findIndex((l) => l.slug === lessonSlug) ?? -1;
  const prevLesson = lessonIndex > 0 ? mod!.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < (mod?.lessons.length ?? 0) - 1 ? mod!.lessons[lessonIndex + 1] : null;
  const diff = difficultyConfig[difficulty];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Header */}
      <div className="border-b border-border-light bg-background-secondary/40 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs text-foreground-muted sm:text-sm">
          <Link href="/" className="hover:text-accent">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/academy" className="hover:text-accent">Academy</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/academy/${moduleSlug}`} className="hover:text-accent capitalize">{mod?.title}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium truncate max-w-[150px] sm:max-w-none">{title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-64">
            {/* Module Nav */}
            <div className="rounded-2xl border border-border-light bg-background-card p-4">
              <Link
                href={`/academy/${moduleSlug}`}
                className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground hover:text-accent"
              >
                <GraduationCap className="h-4 w-4 text-accent" />
                {mod?.title}
              </Link>
              <nav className="space-y-0.5">
                {mod?.lessons.map((lesson, i) => {
                  const isActive = lesson.slug === lessonSlug;
                  return (
                    <Link
                      key={lesson.slug}
                      href={`/academy/${moduleSlug}/${lesson.slug}`}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-all ${
                        isActive
                          ? "bg-accent text-foreground-inverse font-semibold"
                          : "text-foreground-muted hover:bg-background-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="text-base">{lesson.emoji}</span>
                      <span className="flex-1 leading-tight">{lesson.title}</span>
                      {isActive && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Ask AI Sensei */}
            <Link
              href={`/sensei?q=${encodeURIComponent(`Explain ${title}`)}`}
              className="mt-4 flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent-light/50 p-4 transition-all hover:border-accent hover:bg-accent-light dark:bg-accent-light/10"
            >
              <span className="text-2xl">🤖</span>
              <div>
                <p className="text-sm font-semibold text-foreground">Still confused?</p>
                <p className="text-xs text-foreground-muted">Ask the AI Sensei</p>
              </div>
              <ChevronRight className="ml-auto h-4 w-4 text-accent" />
            </Link>

            {/* All Modules Link */}
            <Link
              href="/academy"
              className="mt-4 flex items-center gap-2 rounded-xl border border-border-light bg-background-card px-4 py-3 text-sm text-foreground-muted transition-all hover:text-accent"
            >
              <BookOpen className="h-4 w-4" />
              All Modules
            </Link>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            {/* Lesson Header */}
            <div className="mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${diff.color}`}>
                  {diff.label}
                </span>
                <div className="flex items-center gap-1 text-xs text-foreground-muted">
                  <Clock className="h-3.5 w-3.5" />
                  {readingTime} min read
                </div>
              </div>

              <div className="mb-3 inline-block text-5xl">{emoji}</div>
              <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
              <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">{description}</p>
            </div>

            {/* Lesson Body */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {children}
            </div>

            {/* Prev / Next Navigation */}
            <div className="mt-12 grid grid-cols-1 gap-4 border-t border-border-light pt-8 sm:grid-cols-2">
              {prevLesson ? (
                <Link
                  href={`/academy/${moduleSlug}/${prevLesson.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border-light bg-background-card p-4 transition-all hover:border-accent"
                >
                  <ChevronLeft className="h-5 w-5 shrink-0 text-foreground-muted group-hover:text-accent" />
                  <div>
                    <p className="text-xs text-foreground-muted">Previous</p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-accent">{prevLesson.title}</p>
                  </div>
                </Link>
              ) : <div />}

              {nextLesson ? (
                <Link
                  href={`/academy/${moduleSlug}/${nextLesson.slug}`}
                  className="group flex items-center justify-end gap-3 rounded-xl border border-border-light bg-background-card p-4 transition-all hover:border-accent sm:col-start-2"
                >
                  <div className="text-right">
                    <p className="text-xs text-foreground-muted">Next Lesson</p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-accent">{nextLesson.title}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-foreground-muted group-hover:text-accent" />
                </Link>
              ) : (
                <Link
                  href={`/academy/${moduleSlug}`}
                  className="group flex items-center justify-end gap-3 rounded-xl border border-accent/30 bg-accent-light/50 p-4 transition-all hover:border-accent dark:bg-accent-light/10 sm:col-start-2"
                >
                  <div className="text-right">
                    <p className="text-xs text-foreground-muted">You finished this module!</p>
                    <p className="text-sm font-semibold text-accent">Back to {mod?.title}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-accent" />
                </Link>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
