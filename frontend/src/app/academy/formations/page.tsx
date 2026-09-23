import type { Metadata } from "next";
import Link from "next/link";
import { getModule } from "@/data/academy/curriculum";

export const metadata: Metadata = {
  title: "Formations Module | Football Academy | TacticSensei",
  description:
    "Discover the most popular football formations — from classic 4-4-2 to modern Pep Guardiola's 3-2-4-1 buildup shape. 15 lessons covering flat, diamond, 3-back, and 5-back systems.",
};

const formationCategories = [
  {
    title: "4-Back Formations",
    description: "The most common defensive structures in modern football, balancing four defenders with midfield and attacking support.",
    formations: ["4-4-2", "4-3-3", "4-3-2-1", "4-3-1-2", "4-2-3-1", "4-2-1-3", "4-1-4-1", "4-1-2-3"],
    color: "from-violet-500/20 to-purple-500/10 border-violet-400/30",
    badgeColor: "bg-violet-400/20 text-violet-600 dark:text-violet-400",
  },
  {
    title: "3-Back Formations",
    description: "More aggressive and fluid systems that prioritize central overloads and flying wing-backs on the flanks.",
    formations: ["3-4-3", "3-2-4-1", "3-2-3-2", "3-1-4-2"],
    color: "from-blue-500/20 to-cyan-500/10 border-blue-400/30",
    badgeColor: "bg-blue-400/20 text-blue-600 dark:text-blue-400",
  },
  {
    title: "5-Back Formations",
    description: "Defensively secure blocks that absorb opponent pressure and hit on high-speed counter-attacks.",
    formations: ["5-3-2", "5-2-2-1", "5-2-1-2"],
    color: "from-emerald-500/20 to-green-500/10 border-green-400/30",
    badgeColor: "bg-green-400/20 text-green-600 dark:text-green-400",
  },
];

export default function FormationsModulePage() {
  const module = getModule("formations");

  if (!module) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-foreground-muted">Module not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-background to-background-card pb-12 pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-2 text-sm text-foreground-muted">
            <Link href="/academy" className="hover:text-accent transition-colors">Academy</Link>
            <span>/</span>
            <span className="text-foreground">Formations</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-3xl ring-1 ring-accent/20">
              📐
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Football Formations
              </h1>
              <p className="mt-2 max-w-2xl text-base text-foreground-muted">
                Explore how 11 players are organized into tactical shapes on the pitch. Learn the pros, cons, and movements of 15 classic and modern formations.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-medium text-accent ring-1 ring-accent/20">
                  📚 15 Lessons
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background-card px-3 py-1 font-medium text-foreground-muted ring-1 ring-border">
                  ⏱ ~80 min total
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background-card px-3 py-1 font-medium text-foreground-muted ring-1 ring-border">
                  🎯 Intermediate → Advanced
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories sections */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {formationCategories.map((category) => {
          const categoryLessons = module.lessons.filter((l) => category.formations.includes(l.slug));

          return (
            <section key={category.title} className="space-y-6">
              <div className="border-b border-border pb-4">
                <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                <p className="mt-1 text-sm text-foreground-muted">{category.description}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryLessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/academy/formations/${lesson.slug}`}
                    className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${category.color}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/10 text-2xl backdrop-blur-sm">
                        {lesson.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="font-bold text-foreground group-hover:text-accent transition-colors truncate">
                            {lesson.title.replace("The ", "").replace(" Formation", "")}
                          </h3>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${category.badgeColor}`}>
                            {lesson.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2">{lesson.description}</p>
                      </div>
                      <div className="shrink-0 text-foreground-muted/40 transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
                        →
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-3 text-[10px] text-foreground-muted">
                      <span>⏱ {lesson.readingTime} min read</span>
                      <span>•</span>
                      <span>🎯 5-question quiz</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Call To Action */}
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
          <p className="text-2xl font-bold text-foreground">Not sure where to begin?</p>
          <p className="mt-2 text-foreground-muted">Start with the classic 4-4-2, the foundation of modern football tactics, and work your way up.</p>
          <Link
            href="/academy/formations/4-4-2"
            className="btn-primary mt-5 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
          >
            ⬜ Learn the 4-4-2 Formation →
          </Link>
        </div>
      </div>
    </div>
  );
}

