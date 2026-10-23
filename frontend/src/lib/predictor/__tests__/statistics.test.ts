import { describe, expect, it } from "vitest";
import { clubs } from "@/data/predictor/clubs";
import { premierLeague } from "@/data/predictor/competitions";
import { simulateSeason } from "../leagueSeason";
import { mulberry32 } from "../rng";

describe("statistical sanity over 500 Premier League seasons", () => {
  const SEASONS = 500;
  let goals = 0;
  let matches = 0;
  let homeWins = 0;
  let championPts = 0;
  let eighteenthPts = 0;
  for (let seed = 1; seed <= SEASONS; seed++) {
    const s = simulateSeason(mulberry32(seed), premierLeague, clubs);
    for (const m of s.matchdays.flat()) {
      goals += m.homeGoals + m.awayGoals;
      matches++;
      if (m.homeGoals > m.awayGoals) homeWins++;
    }
    championPts += s.table[0].pts;
    eighteenthPts += s.table[17].pts;
  }

  it("averages 2.6-3.1 goals per game", () => {
    expect(goals / matches).toBeGreaterThanOrEqual(2.6);
    expect(goals / matches).toBeLessThanOrEqual(3.1);
  });

  it("has a home-win rate of 0.40-0.50", () => {
    expect(homeWins / matches).toBeGreaterThanOrEqual(0.4);
    expect(homeWins / matches).toBeLessThanOrEqual(0.5);
  });

  it("averages 82-95 points for the champion", () => {
    expect(championPts / SEASONS).toBeGreaterThanOrEqual(82);
    expect(championPts / SEASONS).toBeLessThanOrEqual(95);
  });

  it("averages 26-38 points for 18th place", () => {
    expect(eighteenthPts / SEASONS).toBeGreaterThanOrEqual(26);
    expect(eighteenthPts / SEASONS).toBeLessThanOrEqual(38);
  });
});
