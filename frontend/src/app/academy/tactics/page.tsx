import type { Metadata } from "next";
import Link from "next/link";
import { getModule } from "@/data/academy/curriculum";

export const metadata: Metadata = {
  title: "Tactical Concepts | Football Academy | TacticSensei",
  description:
    "Master football tactics, systems, and philosophies. 106 structured lessons covering attacking setups, defensive blocks, pressing traps, buildup configurations, and positional player roles.",
};

const categories = [
  {
    key: "attacking",
    title: "Attacking Tactics",
    description: "Learn how teams create space, build combinations, and break down defensive lines.",
    count: 21,
    color: "from-red-500/20 to-rose-500/10 border-red-400/30",
    badgeColor: "bg-red-400/20 text-red-600 dark:text-red-400",
  },
  {
    key: "defensive",
    title: "Defensive Tactics",
    description: "Understand defensive positioning, low blocks, marking systems, and space denial.",
    count: 14,
    color: "from-blue-500/20 to-sky-500/10 border-blue-400/30",
    badgeColor: "bg-blue-400/20 text-blue-600 dark:text-blue-400",
  },
  {
    key: "pressing",
    title: "Pressing Systems",
    description: "Discover counter-pressing, pressing traps, zonal presses, and triggers.",
    count: 9,
    color: "from-amber-500/20 to-yellow-500/10 border-amber-400/30",
    badgeColor: "bg-amber-400/20 text-amber-600 dark:text-amber-400",
  },
  {
    key: "buildup",
    title: "Build-Up Play",
    description: "Master goalkeeper buildup, single/double pivots, box midfields, and playing from the back.",
    count: 10,
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-400/30",
    badgeColor: "bg-emerald-400/20 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "modern",
    title: "Modern Tactical Concepts",
    description: "Explore advanced space concepts like inverted fullbacks, mezzalas, registas, and space-seeking roles.",
    count: 17,
    color: "from-purple-500/20 to-violet-500/10 border-purple-400/30",
    badgeColor: "bg-purple-400/20 text-purple-600 dark:text-purple-400",
  },
  {
    key: "philosophies",
    title: "Tactical Philosophies",
    description: "Deconstruct the historical ideologies of Cruyff, Guardiola, Klopp, Sacchi, and Mourinho.",
    count: 8,
    color: "from-pink-500/20 to-fuchsia-500/10 border-pink-400/30",
    badgeColor: "bg-pink-400/20 text-pink-600 dark:text-pink-400",
  },
  {
    key: "roles",
    title: "Tactical Player Roles",
    description: "Understand the deep, specialized duties of registas, sweepers, complete forwards, and raumdeuters.",
    count: 27,
    color: "from-indigo-500/20 to-indigo-500/10 border-indigo-400/30",
    badgeColor: "bg-indigo-400/20 text-indigo-600 dark:text-indigo-400",
  },
];

export default function TacticsModulePage() {
  const module = getModule("tactics");

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
            <span className="text-foreground">Tactics</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-3xl ring-1 ring-accent/20">
              🧠
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Tactical Concepts & Systems
              </h1>
              <p className="mt-2 max-w-2xl text-base text-foreground-muted">
                Ditch the simple explanations. Deep dive into 106 structured lessons exploring attacking patterns, defensive setups, pressing systems, build-up play, modern roles, and historical philosophies.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-medium text-accent ring-1 ring-accent/20">
                  📚 106 Lessons
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background-card px-3 py-1 font-medium text-foreground-muted ring-1 ring-border">
                  ⏱ ~550 min total
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background-card px-3 py-1 font-medium text-foreground-muted ring-1 ring-border">
                  🎯 Beginner → Advanced Nerd
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content category sections */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {categories.map((category) => {
          const categoryLessons = module.lessons.filter((l) => l.category === category.key);

          return (
            <section key={category.key} className="space-y-6">
              <div className="border-b border-border pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                  <p className="mt-1 text-sm text-foreground-muted">{category.description}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ring-white/10 ${category.badgeColor}`}>
                  {category.count} lessons
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categoryLessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/academy/tactics/${lesson.slug}`}
                    className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${category.color}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/10 text-xl backdrop-blur-sm">
                        {lesson.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm text-foreground group-hover:text-accent transition-colors truncate">
                          {lesson.title}
                        </h3>
                        <p className="text-[11px] text-foreground-muted line-clamp-2 mt-0.5">{lesson.description}</p>
                      </div>
                      <div className="shrink-0 text-foreground-muted/30 transition-transform group-hover:translate-x-0.5 group-hover:text-accent text-sm">
                        →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

