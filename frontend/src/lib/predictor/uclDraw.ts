import { randInt, shuffle, type Rng } from "./rng";
import type { ClubMap } from "./types";

export const POT_COUNT = 4;
export const POT_SIZE = 9;
export const MAX_PER_COUNTRY = 2;

export interface DrawMatch {
  homeId: string;
  awayId: string;
}

export interface UclDraw {
  pots: string[][];
  matches: DrawMatch[];
}

export interface ClubDrawFixture {
  pot: number;
  homeVs: string;
  awayAt: string;
}

export function makePots(clubIds: readonly string[], clubs: ClubMap): string[][] {
  const sorted = [...clubIds].sort(
    (a, b) => clubs[b].rating - clubs[a].rating || clubs[a].name.localeCompare(clubs[b].name)
  );
  return Array.from({ length: POT_COUNT }, (_, i) => sorted.slice(i * POT_SIZE, (i + 1) * POT_SIZE));
}

const STEP_BUDGET = 400;
const MAX_ATTEMPTS = 2000;

// Variables: for every club X and pot q, the club from q that X hosts.
// The club from q that X visits is then the one in q that hosts X.
// Randomised MRV backtracking with a small step budget and restarts (cuts the heavy tail).
export function drawLeaguePhase(rng: Rng, clubIds: readonly string[], clubs: ClubMap): UclDraw {
  const pots = makePots(clubIds, clubs);
  const ids = pots.flat();
  const n = ids.length;
  const potOf = ids.map((_, i) => Math.floor(i / POT_SIZE));
  const countryNames = [...new Set(ids.map((id) => clubs[id].country))];
  const countryOf = ids.map((id) => countryNames.indexOf(clubs[id].country));
  const nc = countryNames.length;
  const potMembers = pots.map((_, q) => Array.from({ length: POT_SIZE }, (_, k) => q * POT_SIZE + k));
  const nVars = n * POT_COUNT;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const host = new Int16Array(nVars).fill(-1);
    const blockUsed = new Uint8Array(POT_COUNT * POT_COUNT * n);
    const opp = new Uint8Array(n * n);
    const cc = new Uint8Array(n * nc);
    const order = shuffle(rng, Array.from({ length: nVars }, (_, v) => v));
    let steps = 0;

    const ok = (x: number, q: number, y: number) =>
      y !== x &&
      countryOf[y] !== countryOf[x] &&
      !blockUsed[(potOf[x] * POT_COUNT + q) * n + y] &&
      !opp[x * n + y] &&
      cc[x * nc + countryOf[y]] < MAX_PER_COUNTRY &&
      cc[y * nc + countryOf[x]] < MAX_PER_COUNTRY;

    const set = (x: number, q: number, y: number, on: boolean) => {
      const d = on ? 1 : -1;
      host[x * POT_COUNT + q] = on ? y : -1;
      blockUsed[(potOf[x] * POT_COUNT + q) * n + y] = on ? 1 : 0;
      opp[x * n + y] = opp[y * n + x] = on ? 1 : 0;
      cc[x * nc + countryOf[y]] += d;
      cc[y * nc + countryOf[x]] += d;
    };

    const search = (): boolean | null => {
      if (++steps > STEP_BUDGET) return null;
      let bestVar = -1;
      let bestCount = POT_SIZE + 1;
      for (const v of order) {
        if (host[v] !== -1) continue;
        const x = (v / POT_COUNT) | 0;
        const q = v % POT_COUNT;
        let count = 0;
        for (const y of potMembers[q]) if (ok(x, q, y)) count++;
        if (count < bestCount) {
          bestCount = count;
          bestVar = v;
          if (count <= 1) break;
        }
      }
      if (bestVar === -1) return true;
      if (bestCount === 0) return false;
      const x = (bestVar / POT_COUNT) | 0;
      const q = bestVar % POT_COUNT;
      const options = potMembers[q].filter((y) => ok(x, q, y));
      const start = randInt(rng, options.length);
      for (let i = 0; i < options.length; i++) {
        const y = options[(start + i) % options.length];
        set(x, q, y, true);
        const r = search();
        if (r !== false) return r;
        set(x, q, y, false);
      }
      return false;
    };

    if (search() !== true) continue;
    const matches: DrawMatch[] = [];
    for (let v = 0; v < nVars; v++) {
      matches.push({ homeId: ids[(v / POT_COUNT) | 0], awayId: ids[host[v]] });
    }
    return { pots, matches };
  }
  throw new Error(`League-phase draw failed after ${MAX_ATTEMPTS} attempts`);
}

export function clubFixtures(draw: UclDraw, clubId: string): ClubDrawFixture[] {
  return draw.pots.map((pot, p) => ({
    pot: p,
    homeVs: draw.matches.find((m) => m.homeId === clubId && pot.includes(m.awayId))?.awayId ?? "",
    awayAt: draw.matches.find((m) => m.awayId === clubId && pot.includes(m.homeId))?.homeId ?? "",
  }));
}

// Returns a list of violations; an empty list means the draw is valid.
export function validateDraw(draw: UclDraw, clubs: ClubMap): string[] {
  const errors: string[] = [];
  const all = draw.pots.flat();
  if (draw.pots.length !== POT_COUNT || draw.pots.some((p) => p.length !== POT_SIZE)) {
    errors.push("pots must be 4 x 9");
  }
  if (new Set(all).size !== all.length) errors.push("a club appears in more than one pot");
  if (draw.matches.length !== (all.length * 8) / 2) {
    errors.push(`expected ${(all.length * 8) / 2} matches, got ${draw.matches.length}`);
  }
  const potOf = new Map<string, number>();
  draw.pots.forEach((pot, p) => pot.forEach((id) => potOf.set(id, p)));

  for (const id of all) {
    const home = draw.matches.filter((m) => m.homeId === id).map((m) => m.awayId);
    const away = draw.matches.filter((m) => m.awayId === id).map((m) => m.homeId);
    const opponents = [...home, ...away];
    if (home.length !== 4 || away.length !== 4) errors.push(`${id}: ${home.length} home / ${away.length} away`);
    if (new Set(opponents).size !== opponents.length) errors.push(`${id}: repeated opponent`);
    if (opponents.includes(id)) errors.push(`${id}: plays itself`);
    for (let p = 0; p < POT_COUNT; p++) {
      const h = home.filter((o) => potOf.get(o) === p).length;
      const a = away.filter((o) => potOf.get(o) === p).length;
      if (h !== 1 || a !== 1) errors.push(`${id}: pot ${p + 1} has ${h} home / ${a} away`);
    }
    const counts = new Map<string, number>();
    for (const o of opponents) {
      if (!clubs[o]) {
        errors.push(`${id}: unknown opponent ${o}`);
        continue;
      }
      if (clubs[o].country === clubs[id].country) errors.push(`${id}: same-country opponent ${o}`);
      counts.set(clubs[o].country, (counts.get(clubs[o].country) ?? 0) + 1);
    }
    for (const [c, n] of counts) {
      if (n > MAX_PER_COUNTRY) errors.push(`${id}: ${n} opponents from ${c}`);
    }
  }
  return errors;
}
