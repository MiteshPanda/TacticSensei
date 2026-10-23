import { describe, expect, it } from "vitest";
import { doubleRoundRobin } from "../fixtures";
import { mulberry32 } from "../rng";

const ids = (n: number) => Array.from({ length: n }, (_, i) => `c${i}`);

describe.each([20, 18])("double round-robin with %i clubs", (n) => {
  const clubs = ids(n);
  const days = doubleRoundRobin(mulberry32(7), clubs);
  const all = days.flat();

  it(`has ${2 * (n - 1)} matchdays of ${n / 2} matches`, () => {
    expect(days).toHaveLength(2 * (n - 1));
    for (const [i, day] of days.entries()) {
      expect(day).toHaveLength(n / 2);
      expect(day.every((m) => m.matchday === i + 1)).toBe(true);
    }
  });

  it("never lists a club twice on one matchday", () => {
    for (const day of days) {
      const seen = day.flatMap((m) => [m.homeId, m.awayId]);
      expect(new Set(seen).size).toBe(n);
    }
  });

  it("gives every club 2(N-1) matches, N-1 at home", () => {
    for (const c of clubs) {
      expect(all.filter((m) => m.homeId === c || m.awayId === c)).toHaveLength(2 * (n - 1));
      expect(all.filter((m) => m.homeId === c)).toHaveLength(n - 1);
    }
  });

  it("meets every opponent once at home and once away", () => {
    for (const a of clubs) {
      for (const b of clubs) {
        if (a === b) continue;
        expect(all.filter((m) => m.homeId === a && m.awayId === b)).toHaveLength(1);
      }
    }
  });

  it("mirrors the first half in the second", () => {
    for (let r = 0; r < n - 1; r++) {
      const mirrored = days[r + n - 1].map((m) => `${m.awayId}-${m.homeId}`).sort();
      expect(mirrored).toEqual(days[r].map((m) => `${m.homeId}-${m.awayId}`).sort());
    }
  });
});
