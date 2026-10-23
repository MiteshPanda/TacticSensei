import type { ReactNode } from "react";
import type { Season } from "@/lib/predictor/leagueSeason";
import type { Club, ClubMap } from "@/lib/predictor/types";
import ClubBadge from "./ClubBadge";
import { panel } from "./ui";
import { ZONE_COLORS } from "./zones";

function ClubChip({ club, extra }: { club: Club; extra?: string }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <ClubBadge club={club} size={24} decorative />
      <span className="font-medium">{club.name}</span>
      {extra && <span className="text-foreground-muted tabular-nums">{extra}</span>}
    </li>
  );
}

function Group({ title, color, children }: { title: string; color: string; children: ReactNode }) {
  return (
    <div className="border-l-4 pl-3" style={{ borderColor: color }}>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-foreground-muted">{title}</p>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

function Stat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl bg-background-secondary px-4 py-3">
      <dt className="text-xs uppercase tracking-wider text-foreground-muted">{label}</dt>
      <dd className="mt-1 text-sm font-semibold">{children}</dd>
    </div>
  );
}

export default function SeasonSummaryCard({ season, clubs }: { season: Season; clubs: ClubMap }) {
  const s = season.summary;
  const champion = clubs[s.championId];
  const runnerUp = clubs[season.table[1].clubId];
  const win = s.biggestWin;
  const winHome = clubs[win.homeId];
  const winAway = clubs[win.awayId];

  return (
    <section className={`${panel} overflow-hidden`} aria-label="End-of-season summary">
      <div className="flex flex-col items-center gap-4 bg-gradient-to-br from-success/10 via-accent/5 to-warning/10 p-6 text-center sm:flex-row sm:text-left">
        <ClubBadge club={champion} size={64} decorative />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Champion</p>
          <p className="text-2xl font-black">{champion.name}</p>
          <p className="text-sm text-foreground-muted">
            {s.championPts} pts ·{" "}
            {s.margin === 0 ? `level on points with ${runnerUp.name}` : `${s.margin} clear of ${runnerUp.name}`}
          </p>
          <p className="mt-1 text-sm font-semibold text-accent">
            {s.decidedOnFinalDay ? "Title decided on the final day" : `Title clinched on matchday ${s.clinchedMatchday}`}
          </p>
        </div>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {s.europe.map((g) => (
          <Group key={g.kind} title={g.label} color={ZONE_COLORS[g.kind]}>
            {g.clubIds.map((id) => (
              <ClubChip key={id} club={clubs[id]} />
            ))}
          </Group>
        ))}
        {s.playoff && (
          <Group title="Relegation play-off" color={ZONE_COLORS.relegationPlayoff}>
            <ClubChip club={clubs[s.playoff.clubId]} extra={`${s.playoff.pts} pts`} />
          </Group>
        )}
        <Group title="Relegated" color={ZONE_COLORS.relegated}>
          {s.relegated.map((r) => (
            <ClubChip key={r.clubId} club={clubs[r.clubId]} extra={`${r.pts} pts`} />
          ))}
        </Group>
      </div>

      <dl className="grid gap-3 border-t border-border-light p-6 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Most goals">
          {clubs[s.mostGoals.clubId].name} · {s.mostGoals.goals}
        </Stat>
        <Stat label="Best defence">
          {clubs[s.bestDefence.clubId].name} · {s.bestDefence.conceded} conceded
        </Stat>
        <Stat label="Biggest win">
          {winHome.shortName} {win.homeGoals}–{win.awayGoals} {winAway.shortName} · MD {win.matchday}
        </Stat>
        <Stat label="Longest winning run">
          {clubs[s.longestWinStreak.clubId].name} · {s.longestWinStreak.length} games
        </Stat>
      </dl>
    </section>
  );
}
