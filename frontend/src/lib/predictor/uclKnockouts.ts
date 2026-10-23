import { playMatch, playShootout } from "./matchModel";
import type { Rng } from "./rng";
import type { ClubMap, Score } from "./types";

export type RoundId = "playoff" | "r16" | "qf" | "sf" | "final";

export const ROUND_ORDER: RoundId[] = ["playoff", "r16", "qf", "sf", "final"];

export const ROUND_LABELS: Record<RoundId, string> = {
  playoff: "Knockout play-off",
  r16: "Round of 16",
  qf: "Quarter-finals",
  sf: "Semi-finals",
  final: "Final",
};

export interface Pairing {
  id: string;
  round: RoundId;
  /** Better-placed club: hosts the second leg. In the final, listed first. */
  highId: string;
  lowId: string;
  seed: number | null;
}

export interface Leg extends Score {
  homeId: string;
  awayId: string;
  /** Score includes extra-time goals when true. */
  extraTime: boolean;
}

export interface KnockoutTie extends Pairing {
  legs: Leg[];
  aggregate: { high: number; low: number } | null;
  penalties: { high: number; low: number } | null;
  winnerId: string;
  picked: boolean;
}

export interface KnockoutDraw {
  standings: string[];
  playoff: Pairing[];
  /** Each R16 seed (1-8) meets the winner of this play-off tie. */
  r16Slots: { seed: number; playoffTieId: string }[];
}

const PLAYOFF_GROUPS: [number, number, number, number][] = [
  [9, 10, 23, 24],
  [11, 12, 21, 22],
  [13, 14, 19, 20],
  [15, 16, 17, 18],
];

const R16_LINKS: [number, number, number, number][] = [
  [1, 2, 15, 16],
  [3, 4, 13, 14],
  [5, 6, 11, 12],
  [7, 8, 9, 10],
];

export const R16_BRACKET_ORDER = [1, 8, 4, 5, 2, 7, 3, 6];
const QF_PAIRS: [number, number][] = [[1, 8], [4, 5], [2, 7], [3, 6]];
const SF_PAIRS: [number, number][] = [[1, 4], [2, 3]];

export function drawKnockouts(rng: Rng, standings: readonly string[]): KnockoutDraw {
  const at = (pos: number) => standings[pos - 1];
  const playoff: Pairing[] = [];
  for (const [h1, h2, l1, l2] of PLAYOFF_GROUPS) {
    const swap = rng() < 0.5;
    playoff.push({ id: `po-${h1}`, round: "playoff", highId: at(h1), lowId: at(swap ? l2 : l1), seed: null });
    playoff.push({ id: `po-${h2}`, round: "playoff", highId: at(h2), lowId: at(swap ? l1 : l2), seed: null });
  }
  const r16Slots: KnockoutDraw["r16Slots"] = [];
  for (const [s1, s2, p1, p2] of R16_LINKS) {
    const swap = rng() < 0.5;
    r16Slots.push({ seed: s1, playoffTieId: `po-${swap ? p2 : p1}` });
    r16Slots.push({ seed: s2, playoffTieId: `po-${swap ? p1 : p2}` });
  }
  return { standings: [...standings], playoff, r16Slots };
}

export type RoundResults = Partial<Record<RoundId, KnockoutTie[]>>;

function winnerOf(rounds: RoundResults, round: RoundId, id: string): string {
  const tie = rounds[round]?.find((t) => t.id === id);
  if (!tie) throw new Error(`Tie ${id} has not been played`);
  return tie.winnerId;
}

export function pairingsFor(round: RoundId, draw: KnockoutDraw, rounds: RoundResults): Pairing[] {
  switch (round) {
    case "playoff":
      return draw.playoff;
    case "r16":
      return R16_BRACKET_ORDER.map((seed) => {
        const slot = draw.r16Slots.find((s) => s.seed === seed)!;
        return {
          id: `r16-${seed}`,
          round,
          highId: draw.standings[seed - 1],
          lowId: winnerOf(rounds, "playoff", slot.playoffTieId),
          seed,
        };
      });
    case "qf":
      return QF_PAIRS.map(([a, b]) => ({
        id: `qf-${a}`,
        round,
        highId: winnerOf(rounds, "r16", `r16-${a}`),
        lowId: winnerOf(rounds, "r16", `r16-${b}`),
        seed: a,
      }));
    case "sf":
      return SF_PAIRS.map(([a, b], i) => ({
        id: `sf-${i + 1}`,
        round,
        highId: winnerOf(rounds, "qf", `qf-${a}`),
        lowId: winnerOf(rounds, "qf", `qf-${b}`),
        seed: i + 1,
      }));
    case "final":
      return [
        {
          id: "final",
          round,
          highId: winnerOf(rounds, "sf", "sf-1"),
          lowId: winnerOf(rounds, "sf", "sf-2"),
          seed: 1,
        },
      ];
  }
}

export function playTie(rng: Rng, pairing: Pairing, clubs: ClubMap): KnockoutTie {
  const hi = clubs[pairing.highId].rating;
  const lo = clubs[pairing.lowId].rating;
  const legs: Leg[] = [];
  let high: number;
  let low: number;

  if (pairing.round === "final") {
    const s = playMatch(rng, hi, lo, { neutral: true });
    legs.push({ homeId: pairing.highId, awayId: pairing.lowId, ...s, extraTime: false });
    high = s.homeGoals;
    low = s.awayGoals;
  } else {
    const first = playMatch(rng, lo, hi);
    const second = playMatch(rng, hi, lo);
    legs.push({ homeId: pairing.lowId, awayId: pairing.highId, ...first, extraTime: false });
    legs.push({ homeId: pairing.highId, awayId: pairing.lowId, ...second, extraTime: false });
    high = first.awayGoals + second.homeGoals;
    low = first.homeGoals + second.awayGoals;
  }

  let penalties: KnockoutTie["penalties"] = null;
  if (high === low) {
    const et = playMatch(rng, hi, lo, { extraTime: true, neutral: pairing.round === "final" });
    const last = legs[legs.length - 1];
    last.homeGoals += et.homeGoals;
    last.awayGoals += et.awayGoals;
    last.extraTime = true;
    high += et.homeGoals;
    low += et.awayGoals;
    if (high === low) {
      const [ph, pl] = playShootout(rng, hi, lo);
      penalties = { high: ph, low: pl };
    }
  }

  const highWins = penalties ? penalties.high > penalties.low : high > low;
  return {
    ...pairing,
    legs,
    aggregate: { high, low },
    penalties,
    winnerId: highWins ? pairing.highId : pairing.lowId,
    picked: false,
  };
}

export function pickTie(pairing: Pairing, winnerId: string): KnockoutTie {
  if (winnerId !== pairing.highId && winnerId !== pairing.lowId) {
    throw new Error(`${winnerId} is not in tie ${pairing.id}`);
  }
  return { ...pairing, legs: [], aggregate: null, penalties: null, winnerId, picked: true };
}
