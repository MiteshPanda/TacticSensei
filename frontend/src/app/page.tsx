import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, MessageSquare, Send, Award, Users, Trophy, BookOpen } from "lucide-react";

const features = [
  {
    icon: "📚",
    title: "Football Academy",
    description:
      "Structured lessons on rules, positions, formations, and tactics. Start from zero and become an expert.",
    href: "/academy",
    gradient: "from-emerald-500/10 to-green-500/10",
    glow: "green-glow",
  },
  {
    icon: "👤",
    title: "Player Encyclopedia",
    description:
      "Discover 100+ players with biographies, career timelines, achievements, and playing styles.",
    href: "/players",
    gradient: "from-blue-500/10 to-cyan-500/10",
    glow: "purple-glow",
  },
  {
    icon: "🏟️",
    title: "Team Profiles",
    description:
      "Explore 20 national teams — their history, legends, rivalries, and tactical identity.",
    href: "/teams",
    gradient: "from-amber-500/10 to-orange-500/10",
    glow: "green-glow",
  },
  {
    icon: "🤖",
    title: "AI Football Tutor",
    description:
      "Ask any football question and get beginner-friendly explanations powered by AI.",
    href: "/tutor",
    gradient: "from-violet-500/10 to-purple-500/10",
    glow: "purple-glow",
  },
  {
    icon: "🏆",
    title: "World Cup Predictor",
    description:
      "Build your tournament bracket, simulate outcomes, and compare predictions with the community.",
    href: "/predictor",
    gradient: "from-yellow-500/10 to-amber-500/10",
    glow: "green-glow",
  },
  {
    icon: "📖",
    title: "Football Glossary",
    description:
      "100+ terms explained simply — from False 9 to Gegenpressing, Regista to Tiki-Taka.",
    href: "/glossary",
    gradient: "from-rose-500/10 to-pink-500/10",
    glow: "purple-glow",
  },
];

const popularTopics = [
  { label: "What is Offside?", href: "/academy/rules" },
  { label: "False 9 Explained", href: "/glossary" },
  { label: "Gegenpressing", href: "/glossary" },
  { label: "4-3-3 Formation", href: "/academy/formations" },
  { label: "Lionel Messi", href: "/players" },
  { label: "Pep Guardiola", href: "/coaches" },
];

export default function HomePage() {
  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section
        id="hero"
        className="relative overflow-hidden bg-background px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8"
      >
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/3 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-light/50 px-4 py-2 text-sm font-medium text-accent dark:bg-accent-light/10 animate-fade-in">
            <span className="text-base animate-bounce">⚽</span>
            Football education for everyone
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up">
            Master Football{" "}
            <span className="bg-gradient-to-r from-accent via-success to-accent bg-clip-text text-transparent">
              Tactics From Zero
            </span>{" "}
            to Confident Fan
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg md:text-xl animate-fade-in-up stagger-2">
            The easiest and most engaging way for someone with no football
            background to understand rules, positions, tactics, players, and
            tournaments — step by step.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up stagger-3">
            <Link
              href="/academy"
              id="cta-start-learning"
              className="btn-primary w-full px-8 py-4 text-base sm:w-auto animate-pulse-glow"
            >
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tutor"
              id="cta-ask-tutor"
              className="btn-secondary w-full px-8 py-4 text-base sm:w-auto hover:green-glow"
            >
              <span className="text-lg">🤖</span>
              Ask the AI Tutor
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mx-auto mt-16 max-w-4xl px-4 animate-fade-in-up stagger-4">
            <div className="rounded-2xl border border-border-light bg-background-secondary/40 p-6 backdrop-blur-sm dark:bg-background-card/40">
              <div className="grid grid-cols-2 gap-y-8 divide-y divide-border-light/10 divide-x divide-border-light/10 sm:grid-cols-4 sm:divide-y-0">
                {[
                  { value: "50+", label: "Lessons", icon: <BookOpen className="h-5 w-5 text-accent" /> },
                  { value: "100+", label: "Players", icon: <Users className="h-5 w-5 text-accent" /> },
                  { value: "20", label: "Teams", icon: <Trophy className="h-5 w-5 text-accent" /> },
                  { value: "100+", label: "Glossary Terms", icon: <Award className="h-5 w-5 text-accent" /> },
                ].map((stat, idx) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col items-center gap-2 ${idx > 0 && idx % 2 === 0 ? "border-t border-border-light/10 pt-4 sm:border-t-0 sm:pt-0" : ""}`}
                  >
                    <div className="flex items-center gap-1.5">
                      {stat.icon}
                      <span className="text-2xl font-bold text-accent sm:text-3xl">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FEATURES GRID ====== */}
      <section
        id="features"
        className="bg-background-secondary/50 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 dark:bg-background-secondary/10"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Academy Ecosystem</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to <span className="text-accent">Understand Football</span>
            </h2>
            <p className="mt-4 text-base text-foreground-muted sm:text-lg">
              From basic rules to advanced tactics — TacticSensei covers it all
              in one platform.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Link
                key={feature.title}
                href={feature.href}
                id={`feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
                className={`glass-card group relative overflow-hidden rounded-2xl p-6 hover:translate-y-[-4px] hover:border-accent/40 hover:${feature.glow} stagger-${index + 1}`}
              >
                {/* Decorative background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-40 transition-opacity group-hover:opacity-60`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background-card text-3xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  {/* Title */}
                  <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
                  {/* Description */}
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {feature.description}
                  </p>
                  {/* Arrow */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Explore Ecosystem
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== POPULAR TOPICS ====== */}
      <section
        id="popular-topics"
        className="bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Popular Questions Beginners Ask
          </h2>
          <p className="mb-10 text-base text-foreground-muted sm:text-lg">
            Start with what interests you most. Every topic is explained for
            beginners first.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {popularTopics.map((topic) => (
              <Link
                key={topic.label}
                href={topic.href}
                className="rounded-full border border-border bg-background-card px-5 py-2.5 text-sm font-medium transition-all duration-[var(--duration-fast)] hover:border-accent hover:bg-accent-light hover:text-accent hover:shadow-[var(--shadow-card)] dark:hover:bg-accent-light/10"
              >
                {topic.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== AI TUTOR SECTION (STITCH-INSPIRED RESPONSIVE REDESIGN) ====== */}
      <section
        id="ai-tutor-highlight"
        className="relative overflow-hidden bg-background-secondary/30 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 dark:bg-background-secondary/5"
      >
        {/* Glow Effects */}
        <div className="absolute -left-10 -top-10 -z-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 -z-10 h-72 w-72 rounded-full bg-success/5 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            {/* Left Info Column */}
            <div className="w-full text-center lg:w-1/2 lg:text-left">
              <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-accent">
                <Sparkles className="h-4 w-4" /> Next-Gen Learning
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Expert Knowledge. <br className="hidden sm:inline" /> On Demand.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-foreground-muted sm:text-lg">
                Struggling to understand the Offside rule? Curious about the historical
                significance of the &quot;Total Football&quot; system? Our AI Tutor is trained
                on football rules, histories, and coaching manuals to answer all your queries.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  "Natural language tactical analysis",
                  "Historical match and player database access",
                  "Adaptive summaries based on your understanding level",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-foreground justify-center lg:justify-start">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href="/tutor"
                  className="btn-primary px-8 py-4 text-base shadow-lg green-glow inline-flex"
                >
                  Try the AI Tutor
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Chat Mockup Column */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                {/* Glow outlines */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/20 to-success/20 blur opacity-75" />

                <div className="relative rounded-2xl border border-border-light bg-background-card p-5 shadow-2xl dark:border-border/60">
                  {/* Chat Header */}
                  <div className="flex items-center gap-3 border-b border-border-light/10 pb-4 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-light text-2xl dark:bg-accent-light/10">
                      🤖
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">TacticSensei AI</h4>
                      <div className="flex items-center gap-1 text-xs text-accent">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                        </span>
                        Online & Active
                      </div>
                    </div>
                  </div>

                  {/* Chat Bubbles */}
                  <div className="space-y-4 py-2">
                    {/* Bot Message */}
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-light text-xs dark:bg-accent-light/10">
                        🤖
                      </div>
                      <div className="rounded-2xl rounded-tl-none bg-background-secondary p-3.5 text-xs leading-relaxed text-foreground-secondary dark:bg-background-secondary/40">
                        Hello! I&apos;m your AI Football Tutor. Ask me any football question, like rules, tactical setups, or player roles!
                      </div>
                    </div>

                    {/* User Message */}
                    <div className="flex items-start justify-end gap-2.5">
                      <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-accent text-foreground-inverse p-3.5 text-xs font-medium dark:bg-accent/80">
                        Can you explain the &quot;Low Block&quot; defensive system?
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-light text-xs dark:bg-accent-light/10">
                        🤖
                      </div>
                      <div className="flex-1 rounded-2xl rounded-tl-none bg-background-secondary p-3.5 text-xs leading-relaxed text-foreground-secondary dark:bg-background-secondary/40">
                        A &quot;Low Block&quot; is a defensive strategy where a team defends very deep in their own half, prioritizing central compactness. The goal is to deny space behind the defense...
                        <div className="mt-2.5">
                          <Link href="/tutor" className="inline-flex items-center gap-1 rounded bg-background-card px-2.5 py-1 text-[10px] font-semibold text-accent shadow-sm border border-border-light hover:bg-background-secondary transition-colors">
                            Read full explanation <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input Field */}
                  <div className="mt-4 flex items-center gap-2 border-t border-border-light/10 pt-4">
                    <input
                      type="text"
                      disabled
                      placeholder="Type your question..."
                      className="flex-1 rounded-xl bg-background-secondary/50 px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-accent dark:bg-background-secondary/20"
                    />
                    <button disabled className="rounded-xl bg-accent p-2.5 text-foreground-inverse opacity-80 dark:bg-accent/80">
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== LEVELS SECTION ====== */}
      <section
        id="content-levels"
        className="bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Content for <span className="text-accent">Every Level</span>
            </h2>
            <p className="mt-4 text-base text-foreground-muted sm:text-lg">
              Whether you&apos;re watching your first match or dissecting
              tactical formations — there&apos;s something for you.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                level: "Beginner",
                emoji: "🌱",
                color: "from-green-500/10 to-emerald-500/10",
                border: "border-green-500/20",
                topics: [
                  "What is football?",
                  "Basic rules",
                  "Positions overview",
                  "Match structure",
                ],
              },
              {
                level: "Intermediate",
                emoji: "⚡",
                color: "from-blue-500/10 to-indigo-500/10",
                border: "border-blue-500/20",
                topics: [
                  "Formations explained",
                  "Tactical roles",
                  "Player comparisons",
                  "Team identities",
                ],
              },
              {
                level: "Tactical Nerd",
                emoji: "🧠",
                color: "from-purple-500/10 to-violet-500/10",
                border: "border-purple-500/20",
                topics: [
                  "Gegenpressing deep dive",
                  "Expected Goals (xG)",
                  "Positional play",
                  "Coaching philosophies",
                ],
              },
            ].map((tier) => (
              <div
                key={tier.level}
                className={`card bg-gradient-to-br ${tier.color} ${tier.border} p-6`}
              >
                <span className="mb-3 inline-block text-4xl">{tier.emoji}</span>
                <h3 className="mb-4 text-xl font-bold">{tier.level}</h3>
                <ul className="space-y-3">
                  {tier.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2.5 text-sm text-foreground-muted"
                    >
                      <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FINAL CTA ====== */}
      <section
        id="final-cta"
        className="bg-background-secondary/50 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 dark:bg-background-secondary/10"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Start Your Football Journey?
          </h2>
          <p className="mt-4 text-base text-foreground-muted sm:text-lg">
            Join thousands of beginners who went from knowing nothing about
            football to understanding the beautiful game.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/academy"
              id="cta-bottom-start"
              className="btn-primary w-full px-8 py-4 text-base sm:w-auto"
            >
              Begin Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/players"
              id="cta-bottom-explore"
              className="btn-secondary w-full px-8 py-4 text-base sm:w-auto"
            >
              Explore Players
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
