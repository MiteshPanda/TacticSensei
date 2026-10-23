import type { ClubCompetition } from "@/data/predictor/competitions";
import { buildTable, drawLots } from "./leagueTable";
import { playMatch } from "./matchModel";
import type { Rng } from "./rng";
import type { ClubMap, MatchResult, TableRow } from "./types";
import { drawLeaguePhase, type UclDraw } from "./uclDraw";
import {
  drawKnockouts,
  pairingsFor,
  pickTie,
  playTie,
  ROUND_LABELS,
  ROUND_ORDER,
  type KnockoutDraw,
  type KnockoutTie,
  type RoundId,
  type RoundResults,
} from "./uclKnockouts";

export interface UclGroupStage {
  draw: UclDraw;
  results: MatchResult[];
  table: TableRow[];
  knockoutDraw: KnockoutDraw;
}

export interface UclTournament extends UclGroupStage {
  rounds: RoundResults;
}

export function playGroupStage(rng: Rng, competition: ClubCompetition, clubs: ClubMap): UclGroupStage {
  const draw = drawLeaguePhase(rng, competition.clubIds, clubs);
  const lots = drawLots(rng, competition.clubIds);
  const results = draw.matches.map((m, i): MatchResult => ({
    id: `lp-${i}`,
    matchday: 0,
    homeId: m.homeId,
    awayId: m.awayId,
    ...playMatch(rng, clubs[m.homeId].rating, clubs[m.awayId].rating),
  }));
  const table = buildTable(competition.clubIds, results, competition.tieBreakers, lots);
  const knockoutDraw = drawKnockouts(rng, table.map((r) => r.clubId));
  return { draw, results, table, knockoutDraw };
}

/** Plays every tie in a round; ties listed in `picks` use the user's chosen winner. */
export function playRound(
  rng: Rng,
  round: RoundId,
  stage: UclGroupStage,
  rounds: RoundResults,
  clubs: ClubMap,
  picks: Record<string, string> = {}
): KnockoutTie[] {
  return pairingsFor(round, stage.knockoutDraw, rounds).map((p) =>
    picks[p.id] ? pickTie(p, picks[p.id]) : playTie(rng, p, clubs)
  );
}

export function simulateTournament(rng: Rng, competition: ClubCompetition, clubs: ClubMap): UclTournament {
  const stage = playGroupStage(rng, competition, clubs);
  const rounds: RoundResults = {};
  for (const round of ROUND_ORDER) rounds[round] = playRound(rng, round, stage, rounds, clubs);
  return { ...stage, rounds };
}

export interface ScoredMatch extends MatchResult {
  label: string;
}

export interface TournamentSummary {
  championId: string;
  runnerUpId: string;
  final: KnockoutTie;
  leaguePhaseWinnerId: string;
  road: KnockoutTie[];
  biggestWin: ScoredMatch | null;
  topScorer: { clubId: string; goals: number };
}

export function allMatches(t: UclTournament): ScoredMatch[] {
  const out: ScoredMatch[] = t.results.map((m) => ({ ...m, label: "League phase" }));
  for (const round of ROUND_ORDER) {
    for (const tie of t.rounds[round] ?? []) {
      tie.legs.forEach((leg, i) =>
        out.push({
          id: `${tie.id}-${i}`,
          matchday: 0,
          homeId: leg.homeId,
          awayId: leg.awayId,
          homeGoals: leg.homeGoals,
          awayGoals: leg.awayGoals,
          label: tie.legs.length > 1 ? `${ROUND_LABELS[round]}, leg ${i + 1}` : ROUND_LABELS[round],
        })
      );
    }
  }
  return out;
}

export function summariseTournament(t: UclTournament): TournamentSummary {
  const final = t.rounds.final![0];
  const championId = final.winnerId;
  const runnerUpId = final.winnerId === final.highId ? final.lowId : final.highId;
  const road = ROUND_ORDER.flatMap((r) =>
    (t.rounds[r] ?? []).filter((tie) => tie.highId === championId || tie.lowId === championId)
  );
  const matches = allMatches(t);
  let biggestWin: ScoredMatch | null = null;
  const goals = new Map<string, number>();
  for (const m of matches) {
    const margin = Math.abs(m.homeGoals - m.awayGoals);
    const best = biggestWin ? Math.abs(biggestWin.homeGoals - biggestWin.awayGoals) : 0;
    if (margin > best) biggestWin = m;
    goals.set(m.homeId, (goals.get(m.homeId) ?? 0) + m.homeGoals);
    goals.set(m.awayId, (goals.get(m.awayId) ?? 0) + m.awayGoals);
  }
  let topId = t.table[0].clubId;
  for (const row of t.table) if ((goals.get(row.clubId) ?? 0) > (goals.get(topId) ?? 0)) topId = row.clubId;
  return {
    championId,
    runnerUpId,
    final,
    leaguePhaseWinnerId: t.table[0].clubId,
    road,
    biggestWin,
    topScorer: { clubId: topId, goals: goals.get(topId) ?? 0 },
  };
}
