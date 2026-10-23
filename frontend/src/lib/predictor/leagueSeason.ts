import type { ClubCompetition } from "@/data/predictor/competitions";
import { doubleRoundRobin } from "./fixtures";
import { buildTable, drawLots } from "./leagueTable";
import { playMatch } from "./matchModel";
import type { Rng } from "./rng";
import type { ClubMap, MatchResult, TableRow, Zone, ZoneKind } from "./types";

export interface ZoneGroup {
  kind: ZoneKind;
  label: string;
  clubIds: string[];
}

export interface SeasonSummary {
  championId: string;
  championPts: number;
  margin: number;
  clinchedMatchday: number | null;
  decidedOnFinalDay: boolean;
  europe: ZoneGroup[];
  relegated: { clubId: string; pts: number }[];
  playoff: { clubId: string; pts: number } | null;
  mostGoals: { clubId: string; goals: number };
  bestDefence: { clubId: string; conceded: number };
  biggestWin: MatchResult;
  longestWinStreak: { clubId: string; length: number };
}

export interface Season {
  competitionId: string;
  matchdays: MatchResult[][];
  table: TableRow[];
  summary: SeasonSummary;
}

export function simulateSeason(rng: Rng, competition: ClubCompetition, clubs: ClubMap): Season {
  const fixtures = doubleRoundRobin(rng, competition.clubIds);
  const lots = drawLots(rng, competition.clubIds);
  const matchdays = fixtures.map((day) =>
    day.map((f, i): MatchResult => ({
      id: `md${f.matchday}-${i}`,
      matchday: f.matchday,
      homeId: f.homeId,
      awayId: f.awayId,
      ...playMatch(rng, clubs[f.homeId].rating, clubs[f.awayId].rating),
    }))
  );
  const results = matchdays.flat();
  const table = buildTable(competition.clubIds, results, competition.tieBreakers, lots);
  return {
    competitionId: competition.id,
    matchdays,
    table,
    summary: summarise(table, matchdays, competition.zones),
  };
}

export function clubsInZone(table: readonly TableRow[], zone: Zone): string[] {
  return table.slice(zone.from - 1, zone.to).map((r) => r.clubId);
}

// First matchday after which no other club can reach the leader's points.
export function titleClinchedMatchday(matchdays: readonly MatchResult[][]): number | null {
  const pts = new Map<string, number>();
  const played = new Map<string, number>();
  const total = matchdays.length;
  for (const m of matchdays[0] ?? []) {
    pts.set(m.homeId, 0);
    pts.set(m.awayId, 0);
    played.set(m.homeId, 0);
    played.set(m.awayId, 0);
  }
  for (let k = 0; k < total; k++) {
    for (const m of matchdays[k]) {
      const h = m.homeGoals > m.awayGoals ? 3 : m.homeGoals === m.awayGoals ? 1 : 0;
      const a = m.awayGoals > m.homeGoals ? 3 : m.homeGoals === m.awayGoals ? 1 : 0;
      pts.set(m.homeId, (pts.get(m.homeId) ?? 0) + h);
      pts.set(m.awayId, (pts.get(m.awayId) ?? 0) + a);
      played.set(m.homeId, (played.get(m.homeId) ?? 0) + 1);
      played.set(m.awayId, (played.get(m.awayId) ?? 0) + 1);
    }
    const entries = [...pts.entries()].sort((x, y) => y[1] - x[1]);
    const [leaderId, leaderPts] = entries[0];
    const clinched = entries.every(
      ([id, p]) => id === leaderId || p + 3 * (total - (played.get(id) ?? 0)) < leaderPts
    );
    if (clinched) return k + 1;
  }
  return null;
}

function summarise(table: TableRow[], matchdays: MatchResult[][], zones: Zone[]): SeasonSummary {
  const champion = table[0];
  const clinchedMatchday = titleClinchedMatchday(matchdays);
  const zoneOf = (kind: ZoneKind) => zones.filter((z) => z.kind === kind);
  const europe = (["ucl", "uel", "uecl"] as const).flatMap((kind) =>
    zoneOf(kind).map((z) => ({ kind, label: z.label, clubIds: clubsInZone(table, z) }))
  );
  const withPts = (ids: string[]) =>
    ids.map((id) => ({ clubId: id, pts: table.find((r) => r.clubId === id)!.pts }));
  const relegated = zoneOf("relegated").flatMap((z) => withPts(clubsInZone(table, z)));
  const playoffZone = zoneOf("relegationPlayoff")[0];
  const playoff = playoffZone ? withPts(clubsInZone(table, playoffZone))[0] : null;

  const most = table.reduce((best, r) => (r.gf > best.gf ? r : best), table[0]);
  const defence = table.reduce((best, r) => (r.ga < best.ga ? r : best), table[0]);

  const results = matchdays.flat();
  const biggestWin = results.reduce((best, m) => {
    const margin = Math.abs(m.homeGoals - m.awayGoals);
    const bestMargin = Math.abs(best.homeGoals - best.awayGoals);
    if (margin !== bestMargin) return margin > bestMargin ? m : best;
    return Math.max(m.homeGoals, m.awayGoals) > Math.max(best.homeGoals, best.awayGoals) ? m : best;
  }, results[0]);

  const streak = longestWinStreak(table.map((r) => r.clubId), matchdays);

  return {
    championId: champion.clubId,
    championPts: champion.pts,
    margin: champion.pts - (table[1]?.pts ?? 0),
    clinchedMatchday,
    decidedOnFinalDay: clinchedMatchday === null || clinchedMatchday === matchdays.length,
    europe,
    relegated,
    playoff,
    mostGoals: { clubId: most.clubId, goals: most.gf },
    bestDefence: { clubId: defence.clubId, conceded: defence.ga },
    biggestWin,
    longestWinStreak: streak,
  };
}

function longestWinStreak(clubIdsInOrder: string[], matchdays: MatchResult[][]) {
  const current = new Map<string, number>();
  const best = new Map<string, number>();
  for (const day of matchdays) {
    for (const m of day) {
      for (const [id, won] of [
        [m.homeId, m.homeGoals > m.awayGoals],
        [m.awayId, m.awayGoals > m.homeGoals],
      ] as const) {
        const c = won ? (current.get(id) ?? 0) + 1 : 0;
        current.set(id, c);
        best.set(id, Math.max(best.get(id) ?? 0, c));
      }
    }
  }
  let clubId = clubIdsInOrder[0];
  for (const id of clubIdsInOrder) if ((best.get(id) ?? 0) > (best.get(clubId) ?? 0)) clubId = id;
  return { clubId, length: best.get(clubId) ?? 0 };
}
