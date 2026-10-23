import type { Rng } from "./rng";
import type { FormResult, MatchResult, TableRow, TieBreaker } from "./types";

export type Lots = Record<string, number>;

export function drawLots(rng: Rng, clubIds: readonly string[]): Lots {
  return Object.fromEntries(clubIds.map((id) => [id, rng()]));
}

export function emptyRow(clubId: string): TableRow {
  return {
    clubId, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0,
    awayGoals: 0, awayWins: 0, form: [],
  };
}

function applyResult(row: TableRow, scored: number, conceded: number, away: boolean) {
  row.played++;
  row.gf += scored;
  row.ga += conceded;
  row.gd = row.gf - row.ga;
  if (away) row.awayGoals += scored;
  let r: FormResult;
  if (scored > conceded) {
    row.won++;
    row.pts += 3;
    if (away) row.awayWins++;
    r = "W";
  } else if (scored === conceded) {
    row.drawn++;
    row.pts += 1;
    r = "D";
  } else {
    row.lost++;
    r = "L";
  }
  row.form = [...row.form, r].slice(-5);
}

export function buildRows(clubIds: readonly string[], results: readonly MatchResult[]): TableRow[] {
  const map = new Map(clubIds.map((id) => [id, emptyRow(id)]));
  const ordered = [...results].sort((a, b) => a.matchday - b.matchday);
  for (const m of ordered) {
    const home = map.get(m.homeId);
    const away = map.get(m.awayId);
    if (!home || !away) continue;
    applyResult(home, m.homeGoals, m.awayGoals, false);
    applyResult(away, m.awayGoals, m.homeGoals, true);
  }
  return [...map.values()];
}

type Criterion = TieBreaker | "pts";

const isH2h = (c: Criterion) => c === "h2hPts" || c === "h2hGd" || c === "h2hAwayGoals";

function miniTable(set: Set<string>, results: readonly MatchResult[]): Map<string, TableRow> {
  const sub = results.filter((m) => set.has(m.homeId) && set.has(m.awayId));
  return new Map(buildRows([...set], sub).map((r) => [r.clubId, r]));
}

function values(
  c: Criterion,
  group: TableRow[],
  results: readonly MatchResult[],
  h2hSet: Set<string> | undefined
): Map<string, number> {
  const out = new Map<string, number>();
  const mini = isH2h(c) && h2hSet ? miniTable(h2hSet, results) : undefined;
  for (const row of group) {
    const m = mini?.get(row.clubId);
    const v =
      c === "pts" ? row.pts
      : c === "gd" ? row.gd
      : c === "gf" ? row.gf
      : c === "awayGoals" ? row.awayGoals
      : c === "wins" ? row.won
      : c === "awayWins" ? row.awayWins
      : c === "h2hPts" ? m?.pts ?? 0
      : c === "h2hGd" ? m?.gd ?? 0
      : m?.awayGoals ?? 0;
    out.set(row.clubId, v);
  }
  return out;
}

function rank(
  group: TableRow[],
  criteria: Criterion[],
  results: readonly MatchResult[],
  lots: Lots,
  h2hSet?: Set<string>
): TableRow[] {
  if (group.length <= 1) return group;
  if (criteria.length === 0) {
    return [...group].sort((a, b) => (lots[a.clubId] ?? 0) - (lots[b.clubId] ?? 0));
  }
  const [c, ...rest] = criteria;
  // The head-to-head set is fixed at the first h2h criterion and reused for later h2h criteria.
  const set = isH2h(c) && !h2hSet ? new Set(group.map((r) => r.clubId)) : h2hSet;
  const v = values(c, group, results, set);
  const buckets = new Map<number, TableRow[]>();
  for (const row of group) {
    const key = v.get(row.clubId)!;
    buckets.set(key, [...(buckets.get(key) ?? []), row]);
  }
  return [...buckets.keys()]
    .sort((a, b) => b - a)
    .flatMap((k) => rank(buckets.get(k)!, rest, results, lots, set));
}

export function sortTable(
  rows: readonly TableRow[],
  results: readonly MatchResult[],
  tieBreakers: readonly TieBreaker[],
  lots: Lots
): TableRow[] {
  return rank([...rows], ["pts", ...tieBreakers], results, lots);
}

export function buildTable(
  clubIds: readonly string[],
  results: readonly MatchResult[],
  tieBreakers: readonly TieBreaker[],
  lots: Lots
): TableRow[] {
  return sortTable(buildRows(clubIds, results), results, tieBreakers, lots);
}
