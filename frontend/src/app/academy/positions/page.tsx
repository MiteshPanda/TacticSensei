import type { Metadata } from "next";
import Link from "next/link";
import { getModule } from "@/data/academy/curriculum";

export const metadata: Metadata = {
  title: "Positions Module | Football Academy | TacticSensei",
  description:
    "Learn every football position from goalkeeper to false 9. Understand what each role does, the skills required, and famous players who mastered them.",
};

const lessons = [
  {
    slug: "goalkeeper",
    emoji: "🧤",
    title: "Goalkeeper",
    description: "The last line of defence — shot-stopping, commanding the area, and modern distribution.",
    difficulty: "Beginner",
    color: "from-yellow-500/20 to-amber-500/10 border-yellow-400/30",
    badgeColor: "bg-yellow-400/20 text-yellow-600 dark:text-yellow-400",
  },
  {
    slug: "defender",
    emoji: "🛡️",
    title: "Defender",
    description: "Centre-backs, full-backs, and wing-backs — the defensive spine of every team.",
    difficulty: "Beginner",
    color: "from-blue-500/20 to-sky-500/10 border-blue-400/30",
    badgeColor: "bg-blue-400/20 text-blue-600 dark:text-blue-400",
  },
  {
    slug: "midfielder",
    emoji: "⚙️",
    title: "Midfielder",
    description: "The engine room — winning the ball, keeping possession, and linking defence to attack.",
    difficulty: "Beginner",
    color: "from-green-500/20 to-emerald-500/10 border-green-400/30",
    badgeColor: "bg-green-400/20 text-green-600 dark:text-green-400",
  },
  {
    slug: "attacker",
    emoji: "⚡",
    title: "Attacker",
    description: "Centre forwards, wingers, and second strikers — the goal-scorers and chance-creators.",
    difficulty: "Beginner",
    color: "from-red-500/20 to-rose-500/10 border-red-400/30",
    badgeColor: "bg-red-400/20 text-red-600 dark:text-red-400",
  },
  {
    slug: "number-6",
    emoji: "6️⃣",
    title: "The Number 6",
    description: "The defensive midfielder — the anchor who sits in front of the defence and breaks up play.",
    difficulty: "Intermediate",
    color: "from-purple-500/20 to-violet-500/10 border-purple-400/30",
    badgeColor: "bg-purple-400/20 text-purple-600 dark:text-purple-400",
  },
  {
    slug: "number-8",
    emoji: "8️⃣",
    title: "The Number 8",
    description: "The box-to-box midfielder — covering every blade of grass, attacking and defending.",
    difficulty: "Intermediate",
    color: "from-indigo-500/20 to-blue-500/10 border-indigo-400/30",
    badgeColor: "bg-indigo-400/20 text-indigo-600 dark:text-indigo-400",
  },
  {
    slug: "number-10",
    emoji: "🔟",
    title: "The Number 10",
    description: "The classic playmaker — creative vision, through balls, and magic between the lines.",
    difficulty: "Intermediate",
    color: "from-pink-500/20 to-fuchsia-500/10 border-pink-400/30",
    badgeColor: "bg-pink-400/20 text-pink-600 dark:text-pink-400",
  },
  {
    slug: "false-9",
    emoji: "🔀",
    title: "The False 9",
    description: "A striker who drops deep to create — one of the most tactically fascinating roles in football.",
    difficulty: "Intermediate",
    color: "from-orange-500/20 to-amber-500/10 border-orange-400/30",
    badgeColor: "bg-orange-400/20 text-orange-600 dark:text-orange-400",
  },
];

const pitchZones = [
  {
    zone: "Attack Zone",
    positions: ["Centre Forward (CF)", "Second Striker", "Wingers (LW / RW)", "False 9"],
    color: "bg-red-500/20 border-red-400/40",
    textColor: "text-red-600 dark:text-red-400",
  },
  {
    zone: "Midfield Zone",
    positions: ["No.10 (Trequartista)", "No.8 (Box-to-Box)", "No.6 (Holding Mid)", "Wide Midfielders"],
    color: "bg-green-500/20 border-green-400/40",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    zone: "Defence Zone",
    positions: ["Right Back (RB)", "Centre Backs (CB × 2)", "Left Back (LB)", "Wing Backs"],
    color: "bg-blue-500/20 border-blue-400/40",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    zone: "GK Zone",
    positions: ["Goalkeeper (GK)"],
    color: "bg-yellow-500/20 border-yellow-400/40",
    textColor: "text-yellow-600 dark:text-yellow-400",
  },
];

export default function PositionsModulePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-background to-background-card pb-12 pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-2 text-sm text-foreground-muted">
            <Link href="/academy" className="hover:text-accent transition-colors">Academy</Link>
            <span>/</span>
            <span className="text-foreground">Positions</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-3xl ring-1 ring-accent/20">
              📍
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Football Positions
              </h1>
              <p className="mt-2 max-w-2xl text-base text-foreground-muted">
                Understand every role on the pitch — from the goalkeeper sweeping behind the defence to the false 9
                dropping deep to confuse centre-backs. 8 lessons covering the full spectrum.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-medium text-accent ring-1 ring-accent/20">
                  📚 8 Lessons
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background-card px-3 py-1 font-medium text-foreground-muted ring-1 ring-border">
                  ⏱ ~40 min total
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background-card px-3 py-1 font-medium text-foreground-muted ring-1 ring-border">
                  🎯 Beginner → Intermediate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Pitch Diagram */}
        <div className="mb-14">
          <h2 className="mb-2 text-xl font-bold text-foreground">The Pitch at a Glance</h2>
          <p className="mb-6 text-sm text-foreground-muted">
            A football pitch is divided into four main zones. Each zone has its own set of positions with distinct
            responsibilities.
          </p>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-background-card p-1 shadow-lg">
            {/* Pitch visual */}
            <div
              className="relative rounded-xl"
              style={{
                background: "linear-gradient(180deg, #15803d 0%, #16a34a 30%, #15803d 50%, #16a34a 70%, #15803d 100%)",
                minHeight: 380,
              }}
            >
              {/* Pitch markings */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Centre circle */}
                <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30" />
                <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50" />
                {/* Half way line */}
                <div className="absolute top-1/2 left-4 right-4 h-px -translate-y-1/2 bg-white/30" />
                {/* Penalty areas */}
                <div className="absolute top-4 left-1/2 h-16 w-40 -translate-x-1/2 rounded-b-lg border-2 border-t-0 border-white/30" />
                <div className="absolute bottom-4 left-1/2 h-16 w-40 -translate-x-1/2 rounded-t-lg border-2 border-b-0 border-white/30" />
              </div>

              {/* Zone overlays — stacked top to bottom (attack → GK from viewer's perspective) */}
              <div className="relative z-10 flex h-full flex-col" style={{ minHeight: 380 }}>
                {pitchZones.map((zone, i) => (
                  <div
                    key={zone.zone}
                    className={`flex flex-1 flex-col items-center justify-center border-b border-white/10 p-3 last:border-b-0 ${zone.color}`}
                    style={{ minHeight: i === 3 ? 70 : 95 }}
                  >
                    <p className={`mb-2 text-xs font-bold uppercase tracking-widest ${zone.textColor}`}>
                      {zone.zone}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {zone.positions.map((pos) => (
                        <span
                          key={pos}
                          className="rounded-full bg-black/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                        >
                          {pos}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Zone legend */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {pitchZones.map((zone) => (
              <div key={zone.zone} className={`rounded-xl border p-3 ${zone.color}`}>
                <p className={`text-xs font-bold ${zone.textColor}`}>{zone.zone}</p>
                <p className="mt-0.5 text-xs text-foreground-muted">{zone.positions.length} position{zone.positions.length > 1 ? "s" : ""}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Cards */}
        <div>
          <h2 className="mb-2 text-xl font-bold text-foreground">All Lessons</h2>
          <p className="mb-6 text-sm text-foreground-muted">
            Start from the basics or jump straight to the tactical deep-dives. Each lesson includes a 5-question quiz.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson.slug}
                href={`/academy/positions/${lesson.slug}`}
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${lesson.color}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/10 text-2xl backdrop-blur-sm">
                    {lesson.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                        {lesson.title}
                      </h3>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${lesson.badgeColor}`}>
                        {lesson.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-foreground-muted leading-relaxed">{lesson.description}</p>
                  </div>
                  <div className="shrink-0 text-foreground-muted/40 transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
                    →
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-3 text-xs text-foreground-muted">
                  <span>⏱ 5 min read</span>
                  <span>•</span>
                  <span>🎯 5-question quiz</span>
                  <span>•</span>
                  <span className="ml-auto font-medium text-accent">Lesson {index + 1} of 8 →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
          <p className="text-2xl font-bold text-foreground">Ready to master football positions?</p>
          <p className="mt-2 text-foreground-muted">Start with the Goalkeeper lesson and work your way up to tactical concepts like the False 9.</p>
          <Link
            href="/academy/positions/goalkeeper"
            className="btn-primary mt-5 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
          >
            🧤 Start with Goalkeeper →
          </Link>
        </div>
      </div>
    </div>
  );
}

