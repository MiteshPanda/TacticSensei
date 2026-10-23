import { shuffle, type Rng } from "./rng";

export interface Fixture {
  matchday: number;
  homeId: string;
  awayId: string;
}

// Circle method: club 0 stays fixed, the rest rotate. The second half mirrors the first.
export function doubleRoundRobin(rng: Rng, clubIds: readonly string[]): Fixture[][] {
  const n = clubIds.length;
  if (n % 2 !== 0) throw new Error("doubleRoundRobin needs an even number of clubs");
  const order = shuffle(rng, clubIds);
  const firstHalf: Fixture[][] = [];
  let ring = order.slice(1);

  for (let round = 0; round < n - 1; round++) {
    const line = [order[0], ...ring];
    const matches: Fixture[] = [];
    for (let i = 0; i < n / 2; i++) {
      const a = line[i];
      const b = line[n - 1 - i];
      const aHome = i === 0 ? round % 2 === 0 : i % 2 === 1;
      matches.push({ matchday: round + 1, homeId: aHome ? a : b, awayId: aHome ? b : a });
    }
    firstHalf.push(matches);
    ring = [ring[ring.length - 1], ...ring.slice(0, -1)];
  }

  const secondHalf = firstHalf.map((matches, r) =>
    matches.map((m) => ({ matchday: n + r, homeId: m.awayId, awayId: m.homeId }))
  );
  return [...firstHalf, ...secondHalf];
}
