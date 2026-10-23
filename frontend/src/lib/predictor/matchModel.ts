import { poisson, type Rng } from "./rng";
import type { Score } from "./types";

export const MATCH_MODEL = {
  baseGoals: 1.35,
  ratingFactor: 0.035,
  homeAdvantage: 1.12,
  extraTimeFactor: 1 / 3,
  penaltyMaxNudge: 0.05,
  penaltyNudgePerPoint: 0.005,
  penaltyConversion: 0.75,
} as const;

export interface MatchOptions {
  neutral?: boolean;
  extraTime?: boolean;
}

export function expectedGoals(
  homeRating: number,
  awayRating: number,
  { neutral = false, extraTime = false }: MatchOptions = {}
): [number, number] {
  const { baseGoals, ratingFactor, homeAdvantage, extraTimeFactor } = MATCH_MODEL;
  const adv = neutral ? 1 : homeAdvantage;
  const scale = extraTime ? extraTimeFactor : 1;
  const diff = homeRating - awayRating;
  return [
    baseGoals * Math.exp(ratingFactor * diff) * adv * scale,
    (baseGoals * Math.exp(-ratingFactor * diff) * scale) / adv,
  ];
}

export function playMatch(
  rng: Rng,
  homeRating: number,
  awayRating: number,
  options: MatchOptions = {}
): Score {
  const [lh, la] = expectedGoals(homeRating, awayRating, options);
  return { homeGoals: poisson(rng, lh), awayGoals: poisson(rng, la) };
}

export function penaltyWinProbability(ratingA: number, ratingB: number): number {
  const { penaltyMaxNudge, penaltyNudgePerPoint } = MATCH_MODEL;
  const nudge = Math.min(penaltyMaxNudge, penaltyNudgePerPoint * Math.abs(ratingA - ratingB));
  if (ratingA === ratingB) return 0.5;
  return ratingA > ratingB ? 0.5 + nudge : 0.5 - nudge;
}

// Returns [scoreA, scoreB]; A wins with the rating-nudged probability.
export function playShootout(rng: Rng, ratingA: number, ratingB: number): [number, number] {
  const aWins = rng() < penaltyWinProbability(ratingA, ratingB);
  const p = MATCH_MODEL.penaltyConversion;
  let x = 0;
  let y = 0;
  for (let round = 0; round < 5; round++) {
    const left = 4 - round;
    if (rng() < p) x++;
    if (x > y + left + 1 || y > x + left) break;
    if (rng() < p) y++;
    if (x > y + left || y > x + left) break;
  }
  while (x === y) {
    const sx = rng() < p;
    const sy = rng() < p;
    x += sx ? 1 : 0;
    y += sy ? 1 : 0;
  }
  const hi = Math.max(x, y);
  const lo = Math.min(x, y);
  return aWins ? [hi, lo] : [lo, hi];
}
