import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { teamsData } from "@/data/profiles/teamsData";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { teamFlagUrl } from "@/lib/flags";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teamsData.map((team) => ({
    slug: team.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = teamsData.find((t) => t.slug === slug);
  if (!team) {
    return {
      title: "Team Not Found",
    };
  }
  return {
    title: `${team.name} National Team Profile`,
    description: team.bio,
  };
}

export default async function TeamDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsData.find((t) => t.slug === slug);

  if (!team) {
    notFound();
  }

  return (
    <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back navigation */}
        <div className="mb-8 animate-fade-in">
          <Link
            href="/teams"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted hover:text-accent transition-colors"
          >
            ← Back to Team Profiles
          </Link>
        </div>

        {/* Hero Section */}
        <div className="card relative overflow-hidden mb-8 animate-slide-in-right stagger-1 p-6">
          {/* Background Flag Image */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={teamFlagUrl(team.slug)}
              alt={`${team.name} Flag`}
              className="w-full h-full object-cover opacity-40 transition-transform duration-500 hover:scale-105"
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-background-card/60 via-background-card/90 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-center sm:justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full overflow-hidden border-2 border-border-light bg-accent-light transition-transform duration-300 hover:scale-110">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={teamFlagUrl(team.slug, 320)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{team.name}</h1>
                  <FavoriteButton itemType="team" itemId={team.slug} itemName={team.name} size="sm" />
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                    🏆 {team.titles}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent">
                    🛡️ {team.style}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Details (Bio, Tactics, Squad) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Card */}
            <div className="card animate-slide-in-right stagger-2">
              <h2 className="text-2xl font-bold mb-4">History &amp; Legacy</h2>
              <p className="text-foreground-secondary leading-relaxed">{team.bio}</p>
            </div>

            {/* Tactical Identity Card */}
            <div className="card animate-slide-in-right stagger-3">
              <h2 className="text-2xl font-bold mb-4">Tactical Identity</h2>
              <p className="text-foreground-secondary leading-relaxed">{team.tacticalIdentity}</p>
            </div>

            {/* Squad & Key Players Card */}
            <div className="card animate-slide-in-right stagger-3">
              <h2 className="text-2xl font-bold mb-4">Featured Squad &amp; Legends</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {team.squad.map((player, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-background-secondary border border-border-light">
                    <div>
                      <div className="font-semibold text-sm">{player.name}</div>
                      <div className="text-xs text-foreground-muted">{player.position}</div>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-3xs font-semibold uppercase ${player.role === 'Legendary'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                        : player.role === 'Star'
                          ? 'bg-accent-light text-accent dark:bg-accent/20 dark:text-accent-light'
                          : 'bg-info-light text-info dark:bg-info/20 dark:text-info-light'
                      }`}>
                      {player.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Stats & Trophies) */}
          <div className="space-y-8">
            {/* Stats Card */}
            <div className="card animate-slide-in-right stagger-2">
              <h2 className="text-xl font-bold mb-4">Team Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                {team.stats.map((stat, idx) => (
                  <div key={idx} className="glass-card rounded-lg p-3 text-center border border-border-light">
                    <span className="block text-2xl font-bold text-accent">{stat.value}</span>
                    <span className="text-xs text-foreground-muted uppercase font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trophies Card */}
            <div className="card animate-slide-in-right stagger-3">
              <h2 className="text-xl font-bold mb-4">Honours Board</h2>
              <div className="space-y-3">
                {team.trophies.map((trophy, idx) => (
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

        {/* Side-by-side Roster & Milestones (Full Width) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current World Cup Squad Card */}
          <div className="card animate-slide-in-right stagger-3">
            <h2 className="text-2xl font-bold mb-4">Current World Cup Squad</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border-light text-left text-sm">
                <thead>
                  <tr className="text-foreground-muted">
                    <th className="pb-3 pt-2 font-semibold w-16">No.</th>
                    <th className="pb-3 pt-2 font-semibold">Player</th>
                    <th className="pb-3 pt-2 font-semibold">Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light text-foreground-secondary">
                  {team.worldCupSquad.map((player) => (
                    <tr key={player.number} className="hover:bg-background-secondary/50 transition-colors">
                      <td className="py-3 font-mono font-bold text-accent text-base">
                        {player.number}
                      </td>
                      <td className="py-3 font-medium text-foreground">
                        {player.name}
                      </td>
                      <td className="py-3 text-xs text-foreground-muted">
                        {player.position}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Timeline */}
          <div className="card animate-slide-in-right stagger-4">
            <h2 className="text-2xl font-bold mb-6">Historical Milestones</h2>
            <div className="relative border-l border-border-light ml-3 space-y-8">
              {team.timeline.map((item, idx) => (
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
      </div>
    </section>
  );
}
