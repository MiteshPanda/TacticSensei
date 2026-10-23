import { describe, expect, it } from "vitest";
import { clubs } from "@/data/predictor/clubs";
import { bundesliga, premierLeague } from "@/data/predictor/competitions";
import { simulateSeason, titleClinchedMatchday } from "../leagueSeason";
import { mulberry32 } from "../rng";
import type { MatchResult } from "../types";

describe("determinism", () => {
  it("gives an identical season for the same seed", () => {
    const a = simulateSeason(mulberry32(48213), premierLeague, clubs);
    const b = simulateSeason(mulberry32(48213), premierLeague, clubs);
    expect(a).toEqual(b);
  });

  it("gives different results for different seeds", () => {
    const a = simulateSeason(mulberry32(1), premierLeague, clubs);
    const b = simulateSeason(mulberry32(2), premierLeague, clubs);
    expect(a.matchdays.flat().map((m) => `${m.homeGoals}-${m.awayGoals}`)).not.toEqual(
      b.matchdays.flat().map((m) => `${m.homeGoals}-${m.awayGoals}`)
    );
  });
});

describe("season summary", () => {
  it("is consistent with the final table", () => {
    const s = simulateSeason(mulberry32(99), bundesliga, clubs);
    expect(s.table).toHaveLength(18);
    expect(s.matchdays).toHaveLength(34);
    expect(s.summary.championId).toBe(s.table[0].clubId);
    expect(s.summary.margin).toBe(s.table[0].pts - s.table[1].pts);
    expect(s.summary.relegated.map((r) => r.clubId)).toEqual([s.table[16].clubId, s.table[17].clubId]);
    expect(s.summary.playoff?.clubId).toBe(s.table[15].clubId);
    expect(s.table.every((r) => r.played === 34)).toBe(true);
  });

  it("finds the clinching matchday", () => {
    // Two clubs, four matchdays: A wins the first three. After MD3 B has 0 pts and 1 game left.
    const md = (d: number, hg: number, ag: number): MatchResult[] => [
      { id: `${d}`, matchday: d, homeId: d % 2 ? "A" : "B", awayId: d % 2 ? "B" : "A", homeGoals: hg, awayGoals: ag },
    ];
    const days = [md(1, 1, 0), md(2, 0, 1), md(3, 1, 0), md(4, 0, 0)];
    // After MD2: A 6, B 0, B can still reach 6 -> not clinched. After MD3: A 9, B max 3.
    expect(titleClinchedMatchday(days)).toBe(3);
  });
});
