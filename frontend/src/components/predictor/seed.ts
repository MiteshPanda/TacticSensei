export function newSeed(): number {
  return (crypto.getRandomValues(new Uint32Array(1))[0] % 99999) + 1;
}
