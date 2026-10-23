import { describe, expect, it } from "vitest";
import { clubs } from "@/data/predictor/clubs";
import { championsLeague } from "@/data/predictor/competitions";
import { simulateTournament, summariseTournament } from "../championsLeague";
import { mulberry32 } from "../rng";
import { drawLeaguePhase, makePots, validateDraw } from "../uclDraw";
import {
  drawKnockouts,
  pairingsFor,
  pickTie,
  playTie,
  ROUND_ORDER,
  type Pairing,
  type RoundResults,
} from "../uclKnockouts";

describe("league-phase draw", () => {
  it("puts the 36 clubs into 4 pots of 9 by rating, ties alphabetical", () => {
    const pots = makePots(championsLeague.clubIds, clubs);
    expect(pots.map((p) => p.length)).toEqual([9, 9, 9, 9]);
    expect(pots[0].slice(0, 2)).toEqual(["bayern-munich", "paris-saint-germain"]);
    expect(pots[0][8]).toBe("atletico-madrid");
    expect(pots[1][0]).toBe("napoli");
  });

  it("passes validateDraw for 200 seeds, each in under 200 ms", () => {
    const times: number[] = [];
    for (let seed = 1; seed <= 200; seed++) {
      const t0 = performance.now();
      const draw = drawLeaguePhase(mulberry32(seed), championsLeague.clubIds, clubs);
      times.push(performance.now() - t0);
      expect(validateDraw(draw, clubs), `seed ${seed}`).toEqual([]);
    }
    expect(Math.max(...times)).toBeLessThan(200);
  });

  it("validateDraw catches a broken draw", () => {
    const draw = drawLeaguePhase(mulberry32(5), championsLeague.clubIds, clubs);
    const broken = { ...draw, matches: draw.matches.slice(1) };
    expect(validateDraw(broken, clubs).length).toBeGreaterThan(0);
  });
});

const standings = Array.from({ length: 36 }, (_, i) => `c${i + 1}`);
const fakeClubs = Object.fromEntries(
  standings.map((id, i) => [id, { id, name: id, shortName: "XXX", country: "AAA", rating: 90 - i, colors: ["#000", "#fff"] as [string, string] }])
);
const pos = (id: string) => Number(id.slice(1));

describe("knockout ties", () => {
  it("always produce exactly one winner, via aggregate, extra time or penalties", () => {
    const rng = mulberry32(11);
    let pens = 0;
    let aet = 0;
    for (let i = 0; i < 3000; i++) {
      const round = i % 5 === 0 ? "final" : "r16";
      const p: Pairing = { id: "t", round, highId: "c1", lowId: "c2", seed: 1 };
      const tie = playTie(rng, p, fakeClubs);
      expect([tie.highId, tie.lowId]).toContain(tie.winnerId);
      expect(tie.legs).toHaveLength(round === "final" ? 1 : 2);
      const { high, low } = tie.aggregate!;
      if (tie.penalties) {
        pens++;
        expect(high).toBe(low);
        expect(tie.legs.at(-1)!.extraTime).toBe(true);
        expect(tie.penalties.high).not.toBe(tie.penalties.low);
        expect(tie.winnerId).toBe(tie.penalties.high > tie.penalties.low ? "c1" : "c2");
      } else {
        expect(high).not.toBe(low);
        expect(tie.winnerId).toBe(high > low ? "c1" : "c2");
      }
      if (tie.legs.at(-1)!.extraTime) aet++;
    }
    expect(pens).toBeGreaterThan(0);
    expect(aet).toBeGreaterThan(pens);
  });

  it("has the second-leg host as the better-placed club", () => {
    const tie = playTie(mulberry32(3), { id: "t", round: "qf", highId: "c1", lowId: "c8", seed: 1 }, fakeClubs);
    expect(tie.legs[0].homeId).toBe("c8");
    expect(tie.legs[1].homeId).toBe("c1");
  });
});

describe("bracket pairings", () => {
  const highWins = (pairings: Pairing[]) => pairings.map((p) => pickTie(p, p.highId));

  it.each([1, 2, 3, 4, 5, 6, 7, 8])("follows the positions for seed %i", (seed) => {
    const draw = drawKnockouts(mulberry32(seed), standings);
    const po = pairingsFor("playoff", draw, {});
    const groups: [number, number, number, number][] = [[9, 10, 23, 24], [11, 12, 21, 22], [13, 14, 19, 20], [15, 16, 17, 18]];
    for (const [h1, h2, l1, l2] of groups) {
      const lows = [h1, h2].map((h) => pos(po.find((p) => p.highId === `c${h}`)!.lowId)).sort();
      expect(lows).toEqual([l1, l2]);
    }

    const rounds: RoundResults = { playoff: highWins(po) };
    const r16 = pairingsFor("r16", draw, rounds);
    const links: Record<number, number[]> = { 1: [15, 16], 2: [15, 16], 3: [13, 14], 4: [13, 14], 5: [11, 12], 6: [11, 12], 7: [9, 10], 8: [9, 10] };
    for (const p of r16) {
      expect(p.highId).toBe(`c${p.seed}`);
      expect(links[p.seed!]).toContain(pos(p.lowId));
    }
    expect(new Set(r16.map((p) => p.lowId)).size).toBe(8);

    rounds.r16 = highWins(r16);
    const qf = pairingsFor("qf", draw, rounds);
    expect(qf.map((p) => [pos(p.highId), pos(p.lowId)])).toEqual([[1, 8], [4, 5], [2, 7], [3, 6]]);
    rounds.qf = highWins(qf);
    const sf = pairingsFor("sf", draw, rounds);
    expect(sf.map((p) => [pos(p.highId), pos(p.lowId)])).toEqual([[1, 4], [2, 3]]);
    rounds.sf = highWins(sf);
    const final = pairingsFor("final", draw, rounds);
    expect([pos(final[0].highId), pos(final[0].lowId)]).toEqual([1, 2]);
  });

  it("lets a club that knocks out a seed take over that seed's position", () => {
    const draw = drawKnockouts(mulberry32(1), standings);
    const rounds: RoundResults = { playoff: pairingsFor("playoff", draw, {}).map((p) => pickTie(p, p.highId)) };
    const r16 = pairingsFor("r16", draw, rounds);
    rounds.r16 = r16.map((p) => pickTie(p, p.seed === 1 ? p.lowId : p.highId));
    const giantKiller = r16.find((p) => p.seed === 1)!.lowId;
    const qf1 = pairingsFor("qf", draw, rounds).find((p) => p.id === "qf-1")!;
    expect(qf1.highId).toBe(giantKiller);
    expect(qf1.lowId).toBe("c8");
  });
});

describe("full tournament", () => {
  it("produces a champion and a coherent summary", () => {
    const t = simulateTournament(mulberry32(2027), championsLeague, clubs);
    expect(t.table).toHaveLength(36);
    expect(t.results).toHaveLength(144);
    for (const r of ROUND_ORDER) expect(t.rounds[r]!.length).toBe({ playoff: 8, r16: 8, qf: 4, sf: 2, final: 1 }[r]);
    const s = summariseTournament(t);
    expect(s.championId).toBe(t.rounds.final![0].winnerId);
    expect(s.road.at(-1)!.id).toBe("final");
    expect(s.road.every((tie) => tie.winnerId === s.championId)).toBe(true);
    expect(s.leaguePhaseWinnerId).toBe(t.table[0].clubId);
  });

  it("is deterministic per seed", () => {
    expect(simulateTournament(mulberry32(8), championsLeague, clubs)).toEqual(
      simulateTournament(mulberry32(8), championsLeague, clubs)
    );
  });
});
