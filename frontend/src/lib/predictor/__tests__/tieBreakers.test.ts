import { describe, expect, it } from "vitest";
import { bundesliga, championsLeague, laLiga, premierLeague, serieA } from "@/data/predictor/competitions";
import { buildTable, type Lots } from "../leagueTable";
import type { MatchResult, TieBreaker } from "../types";

let n = 0;
const m = (homeId: string, awayId: string, homeGoals: number, awayGoals: number): MatchResult => ({
  id: `t${n++}`, matchday: n, homeId, awayId, homeGoals, awayGoals,
});

const order = (ids: string[], results: MatchResult[], tb: TieBreaker[], lots: Lots = {}) =>
  buildTable(ids, results, tb, lots).map((r) => r.clubId);

describe("head-to-head versus goal difference", () => {
  // A beat B, but B has the better goal difference. Both on 3 pts.
  const results = [m("A", "B", 1, 0), m("B", "X", 5, 0), m("X", "Y", 0, 0)];
  const ids = ["A", "B", "X", "Y"];

  it("Premier League and Bundesliga rank by goal difference first", () => {
    expect(order(ids, results, premierLeague.tieBreakers)).toEqual(["B", "A", "Y", "X"]);
    expect(order(ids, results, bundesliga.tieBreakers)).toEqual(["B", "A", "Y", "X"]);
  });

  it("LaLiga and Serie A rank by head-to-head first", () => {
    expect(order(ids, results, laLiga.tieBreakers)).toEqual(["A", "B", "Y", "X"]);
    expect(order(ids, results, serieA.tieBreakers)).toEqual(["A", "B", "Y", "X"]);
  });
});

describe("Premier League", () => {
  it("falls back to head-to-head when points, GD and goals scored are level", () => {
    // A and B: 3 pts, GF 3, GA 3. A won the meeting. Y is on 3 pts with a better GD.
    const results = [m("A", "B", 2, 1), m("A", "Y", 1, 2), m("B", "X", 2, 1)];
    expect(order(["A", "B", "X", "Y"], results, premierLeague.tieBreakers)).toEqual(["Y", "A", "B", "X"]);
  });

  it("separates clubs level on GD by goals scored", () => {
    const results = [m("A", "X", 3, 1), m("B", "Y", 2, 0)];
    expect(order(["A", "B", "X", "Y"], results, premierLeague.tieBreakers).slice(0, 2)).toEqual(["A", "B"]);
  });

  it("draws lots when everything is level", () => {
    const results = [m("A", "B", 1, 1), m("B", "A", 1, 1)];
    expect(order(["A", "B"], results, premierLeague.tieBreakers, { A: 0.9, B: 0.1 })).toEqual(["B", "A"]);
    expect(order(["A", "B"], results, premierLeague.tieBreakers, { A: 0.1, B: 0.9 })).toEqual(["A", "B"]);
  });
});

describe("LaLiga / Serie A three-way tie", () => {
  // A-B 1-0, B-C 3-0, C-A 2-0 and a draw each with X: A, B, C all on 4 pts.
  // H2H GD: A -1, B +2, C -1. A and C then split on overall GD (equal), then goals scored (C 3, A 1).
  const results = [
    m("A", "B", 1, 0), m("B", "C", 3, 0), m("C", "A", 2, 0),
    m("A", "X", 0, 0), m("B", "X", 0, 0), m("C", "X", 1, 1),
  ];
  const ids = ["A", "B", "C", "X"];

  it.each([laLiga, serieA])("$name orders the mini-league correctly", (comp) => {
    expect(order(ids, results, comp.tieBreakers)).toEqual(["B", "C", "A", "X"]);
  });

  it("uses only matches between the tied clubs for head-to-head", () => {
    // Matches against X and Z must not count towards head-to-head GD.
    const extra = [...results.slice(0, 3), m("A", "X", 1, 1), m("B", "X", 1, 1), m("C", "X", 1, 1), m("X", "Z", 0, 5)];
    const table = buildTable([...ids, "Z"], extra, laLiga.tieBreakers, {});
    expect(table.slice(0, 3).map((r) => r.clubId)).toEqual(["B", "C", "A"]);
  });
});

describe("Bundesliga", () => {
  it("uses head-to-head away goals after head-to-head points", () => {
    const results = [m("A", "B", 1, 1), m("B", "A", 2, 2)];
    expect(order(["A", "B"], results, bundesliga.tieBreakers)).toEqual(["A", "B"]);
    // The Premier League has no away-goals rule, so lots decide.
    expect(order(["A", "B"], results, premierLeague.tieBreakers, { A: 0.9, B: 0.1 })).toEqual(["B", "A"]);
  });

  it("uses overall away goals when the clubs never met", () => {
    const results = [m("X", "A", 1, 2), m("B", "Y", 2, 1)];
    expect(order(["A", "B", "X", "Y"], results, bundesliga.tieBreakers).slice(0, 2)).toEqual(["A", "B"]);
    expect(order(["A", "B", "X", "Y"], results, premierLeague.tieBreakers, { A: 0.9, B: 0.1 }).slice(0, 2)).toEqual(["B", "A"]);
  });
});

describe("Champions League league phase", () => {
  it("uses wins after points, GD, goals and away goals", () => {
    // A: W 2-0 (home), L 0-2 (away) | B: three home draws 1-1, 1-1, 0-0.
    const results = [
      m("A", "X", 2, 0), m("Y", "A", 2, 0),
      m("B", "X", 1, 1), m("B", "Y", 1, 1), m("B", "Z", 0, 0),
    ];
    const table = buildTable(["A", "B", "X", "Y", "Z"], results, championsLeague.tieBreakers, {});
    const a = table.find((r) => r.clubId === "A")!;
    const b = table.find((r) => r.clubId === "B")!;
    expect([a.pts, a.gd, a.gf, a.awayGoals]).toEqual([b.pts, b.gd, b.gf, b.awayGoals]);
    expect(table.findIndex((r) => r.clubId === "A")).toBeLessThan(table.findIndex((r) => r.clubId === "B"));
  });
});
