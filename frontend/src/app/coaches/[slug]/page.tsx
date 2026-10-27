import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { coachesData } from "@/data/profiles/coachesData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return coachesData.map((coach) => ({
    slug: coach.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const coach = coachesData.find((c) => c.slug === slug);
  if (!coach) {
    return {
      title: "Coach Not Found",
    };
  }
  return {
    title: `${coach.name} - Football Coach Profile`,
    description: coach.bio,
  };
}

export default async function CoachDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const coach = coachesData.find((c) => c.slug === slug);

  if (!coach) {
    notFound();
  }

  // Face crop for the hero circle, if one has been added for this coach.
  const avatarSrc = `/coaches/avatars/${coach.slug}.webp`;
  const hasAvatar = existsSync(join(process.cwd(), "public", avatarSrc));

  return (
    <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back navigation */}
        <div className="mb-8 animate-fade-in">
          <Link
            href="/coaches"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted hover:text-accent transition-colors"
          >
            ← Back to Football Coaches
          </Link>
        </div>

        {/* Hero Section */}
        <div className="card mb-8 animate-slide-in-right stagger-1">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-center sm:justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-light text-5xl ring-2 ring-accent/40 animate-float">
                {hasAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarSrc} alt={coach.name} className="h-full w-full object-cover" />
                ) : (
                  coach.emoji
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{coach.name}</h1>
                  <span className="text-2xl" title={coach.countryName}>{coach.country}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                    📋 {coach.philosophy}
                  </span>
                  <span className="text-sm text-foreground-muted">Main/Recent Club: {coach.club}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details (Bio, Style, Timeline) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Card */}
            <div className="card animate-slide-in-right stagger-2">
              <h2 className="text-2xl font-bold mb-4">Biography</h2>
              <p className="text-foreground-secondary leading-relaxed">{coach.bio}</p>
            </div>

            {/* Tactical Style Card */}
            <div className="card animate-slide-in-right stagger-3">
              <h2 className="text-2xl font-bold mb-4">Tactical Philosophy</h2>
              <p className="text-foreground-secondary leading-relaxed">{coach.style}</p>
            </div>

            {/* Career Timeline */}
            <div className="card animate-slide-in-right stagger-4">
              <h2 className="text-2xl font-bold mb-6">Managerial Journey</h2>
              <div className="relative border-l border-border-light ml-3 space-y-8">
                {coach.timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    {/* Bullet */}
                    <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-accent border-2 border-background"></div>
                    <span className="inline-block text-xs font-bold text-accent bg-accent-light px-2 py-0.5 rounded-full mb-1">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Stats, Clubs, Trophies) */}
          <div className="space-y-8">
            {/* Stats Card */}
            <div className="card animate-slide-in-right stagger-2">
              <h2 className="text-xl font-bold mb-4">Managerial Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                {coach.stats.map((stat, idx) => (
                  <div key={idx} className="glass-card rounded-lg p-3 text-center border border-border-light">
                    <span className="block text-2xl font-bold text-accent">{stat.value}</span>
                    <span className="text-xs text-foreground-muted uppercase font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clubs Managed Card */}
            <div className="card animate-slide-in-right stagger-3">
              <h2 className="text-xl font-bold mb-4">Clubs Managed</h2>
              <div className="divide-y divide-border-light">
                {coach.clubsManaged.map((club, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center first:pt-0 last:pb-0">
                    <span className="text-sm font-semibold text-foreground-secondary">{club.name}</span>
                    <span className="text-xs text-foreground-muted">{club.years}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trophies Card */}
            <div className="card animate-slide-in-right stagger-4">
              <h2 className="text-xl font-bold mb-4">Trophies &amp; Honours</h2>
              <div className="space-y-3">
                {coach.trophies.map((trophy, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-background-secondary border border-border-light">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🏆</span>
                      <span className="text-sm font-medium text-foreground-secondary">{trophy.title}</span>
                    </div>
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent text-white text-xs font-bold">
                      {trophy.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
