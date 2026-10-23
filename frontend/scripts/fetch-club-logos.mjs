// Manual step: downloads club crests from football-data.org into public/clubs/.
// Usage: npm run logos:fetch [-- --force]
// Needs FOOTBALL_DATA_API_KEY in frontend/.env.local. The key is only sent to api.football-data.org.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Club id -> football-data.org team id, for clubs the name matching gets wrong or misses.
const overrides = {
  "racing-santander": 5335,
  "psv-eindhoven": 674,
  "aek-athens": 1899,
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logoDir = join(root, "public", "clubs");
const clubsFile = join(root, "src", "data", "predictor", "clubs.ts");
const mappingFile = join(root, "src", "data", "predictor", "footballDataTeamIds.ts");
const envFile = join(root, ".env.local");

const API = "https://api.football-data.org/v4";
const COMPETITIONS = ["PL", "PD", "SA", "BL1", "CL"];
const DOMESTIC = { ENG: "PL", ESP: "PD", ITA: "SA", GER: "BL1" };
const EXTS = [".png", ".svg", ".webp", ".jpg", ".jpeg"];
const WAIT_MS = 7000;
const force = process.argv.includes("--force");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readKey() {
  if (existsSync(envFile)) {
    for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*FOOTBALL_DATA_API_KEY\s*=\s*(.*)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, "").trim();
    }
  }
  return process.env.FOOTBALL_DATA_API_KEY?.trim() ?? "";
}

function readClubs() {
  const src = readFileSync(clubsFile, "utf8");
  const re = /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*shortName:\s*"([^"]+)",\s*country:\s*"([^"]+)"/g;
  return [...src.matchAll(re)].map(([, id, name, shortName, country]) => ({ id, name, shortName, country }));
}

function readSavedMapping() {
  if (!existsSync(mappingFile)) return {};
  const src = readFileSync(mappingFile, "utf8");
  return Object.fromEntries([...src.matchAll(/"([^"]+)":\s*(\d+)/g)].map(([, id, n]) => [id, Number(n)]));
}

const STOP = new Set([
  "fc", "cf", "ac", "sc", "afc", "ssc", "sk", "fk", "cfc", "acf", "as", "ss", "us", "sv", "rc", "rcd",
  "ud", "sd", "ca", "bc", "kv", "calcio", "de", "futbol", "1", "1899", "1846", "1848", "1904", "1907", "1909", "1913",
]);

function normalise(s = "") {
  return s
    .replace(/[øØ]/g, "o").replace(/[æÆ]/g, "ae").replace(/ß/g, "ss").replace(/ı/g, "i").replace(/[łŁ]/g, "l")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((w) => w && !STOP.has(w))
    .join(" ");
}

function dice(a, b) {
  const x = a.replace(/ /g, "");
  const y = b.replace(/ /g, "");
  if (x === y) return 1;
  if (x.length < 2 || y.length < 2) return 0;
  const grams = new Map();
  for (let i = 0; i < x.length - 1; i++) grams.set(x.slice(i, i + 2), (grams.get(x.slice(i, i + 2)) ?? 0) + 1);
  let hits = 0;
  for (let i = 0; i < y.length - 1; i++) {
    const g = y.slice(i, i + 2);
    const c = grams.get(g) ?? 0;
    if (c > 0) {
      hits++;
      grams.set(g, c - 1);
    }
  }
  return (2 * hits) / (x.length + y.length - 2);
}

function score(club, team) {
  const n = normalise(club.name);
  const s = Math.max(dice(n, normalise(team.name)), dice(n, normalise(team.shortName)));
  return Math.min(1, s + (team.tla && team.tla === club.shortName ? 0.1 : 0));
}

async function getTeams(code, key) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(`${API}/competitions/${code}/teams`, { headers: { "X-Auth-Token": key } });
    if (res.status === 429 && attempt === 0) {
      const wait = Number(res.headers.get("x-requestcounter-reset")) || 60;
      console.warn(`  ${code}: rate limited, retrying in ${wait}s`);
      await sleep(wait * 1000);
      continue;
    }
    if (!res.ok) throw new Error(`${code}: HTTP ${res.status}`);
    const json = await res.json();
    return json.teams ?? [];
  }
  throw new Error(`${code}: still rate limited`);
}

function existingLogo(id) {
  return EXTS.find((ext) => existsSync(join(logoDir, `${id}${ext}`)));
}

async function main() {
  const key = readKey();
  if (!key) {
    console.error("FOOTBALL_DATA_API_KEY is not set. Add it to frontend/.env.local and run again.");
    process.exit(1);
  }

  const clubs = readClubs();
  const saved = readSavedMapping();
  const teamsByComp = {};
  const teamsById = new Map();

  for (const [i, code] of COMPETITIONS.entries()) {
    if (i > 0) await sleep(WAIT_MS);
    try {
      teamsByComp[code] = await getTeams(code, key);
      for (const t of teamsByComp[code]) teamsById.set(t.id, t);
      console.log(`Fetched ${code}: ${teamsByComp[code].length} teams`);
    } catch (err) {
      teamsByComp[code] = [];
      console.error(`Failed to fetch ${err instanceof Error ? err.message : err}`);
    }
  }

  const mapping = {};
  const taken = new Map();
  const unmatched = [];

  for (const club of clubs) {
    const fixed = overrides[club.id] ?? saved[club.id];
    if (fixed && teamsById.has(fixed)) {
      mapping[club.id] = fixed;
      taken.set(fixed, club.id);
      continue;
    }
    const pool = [...(teamsByComp[DOMESTIC[club.country]] ?? []), ...(teamsByComp.CL ?? [])];
    const unique = [...new Map(pool.map((t) => [t.id, t])).values()];
    const ranked = unique.map((t) => ({ t, s: score(club, t) })).sort((a, b) => b.s - a.s);
    const [best, second] = ranked;
    const confident = best && (best.s === 1 || (best.s >= 0.75 && best.s - (second?.s ?? 0) >= 0.1));
    if (confident && !taken.has(best.t.id)) {
      mapping[club.id] = best.t.id;
      taken.set(best.t.id, club.id);
    } else {
      const candidates = (ranked.length ? ranked : [...teamsById.values()].map((t) => ({ t, s: score(club, t) })).sort((a, b) => b.s - a.s))
        .slice(0, 3)
        .map(({ t, s }) => `${t.name} (id ${t.id}, ${s.toFixed(2)})`);
      unmatched.push({ club, candidates });
    }
  }

  const sorted = Object.entries(mapping).sort(([a], [b]) => a.localeCompare(b));
  writeFileSync(
    mappingFile,
    "// Generated by scripts/fetch-club-logos.mjs: club id -> football-data.org team id.\n" +
      "export const footballDataTeamIds: Record<string, number> = {\n" +
      sorted.map(([id, n]) => `  "${id}": ${n},`).join("\n") +
      "\n};\n"
  );

  mkdirSync(logoDir, { recursive: true });
  const downloaded = [];
  const skipped = [];
  const failed = [];
  for (const [id, teamId] of sorted) {
    const existing = existingLogo(id);
    if (existing && !force) {
      skipped.push(id);
      continue;
    }
    const crest = teamsById.get(teamId)?.crest;
    if (!crest) {
      failed.push(`${id} (no crest URL)`);
      continue;
    }
    try {
      const url = new URL(crest);
      const rawExt = extname(url.pathname).toLowerCase();
      const ext = EXTS.includes(rawExt) ? rawExt : ".png";
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      writeFileSync(join(logoDir, `${id}${ext}`), Buffer.from(await res.arrayBuffer()));
      downloaded.push(id);
    } catch (err) {
      failed.push(`${id} (${err instanceof Error ? err.message : err})`);
    }
  }

  console.log("\nMatches (club id -> football-data team)");
  for (const [id, teamId] of sorted) console.log(`  ${id} -> ${teamsById.get(teamId)?.name ?? "?"} (${teamId})`);

  console.log("\nSummary");
  console.log(`  Downloaded: ${downloaded.length}${downloaded.length ? ` - ${downloaded.join(", ")}` : ""}`);
  console.log(`  Skipped (already present): ${skipped.length}${skipped.length ? ` - ${skipped.join(", ")}` : ""}`);
  console.log(`  Failed: ${failed.length}${failed.length ? ` - ${failed.join("; ")}` : ""}`);
  console.log(`  Unmatched: ${unmatched.length}`);
  for (const { club, candidates } of unmatched) {
    console.log(`    ${club.id} (${club.name}): closest ${candidates.join(" | ") || "none"}`);
  }
  if (unmatched.length) console.log("  Add unmatched clubs to `overrides` at the top of this script.");

  await import("./build-logo-manifest.mjs");
  if (unmatched.length) process.exit(1);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
