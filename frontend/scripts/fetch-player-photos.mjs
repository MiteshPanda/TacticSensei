// Manual step: downloads player portraits from Wikipedia/Wikimedia Commons into public/players/.
// Usage: npm run players:fetch [-- --force]
// Writes <slug>.webp per player plus credits.json (author + licence, needed for CC BY-SA attribution).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Slug -> Wikipedia article title, where the player's name isn't the article title.
const overrides = {
  pele: "Pelé",
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "players");
const playersFile = join(root, "src", "data", "profiles", "playersData.ts");
const creditsFile = join(outDir, "credits.json");

const API = "https://en.wikipedia.org/w/api.php";
const UA = "TacticSensei/1.0 (player portrait fetch script)";
const WAIT_MS = 3000;
const force = process.argv.includes("--force");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const stripTags = (s = "") => s.replace(/<[^>]+>/g, "").trim();

function readPlayers() {
  const src = readFileSync(playersFile, "utf8");
  return [...src.matchAll(/name:\s*"([^"]+)",\s*slug:\s*"([^"]+)"/g)].map(([, name, slug]) => ({ name, slug }));
}

async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: "json", formatversion: "2", origin: "*", ...params })}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function leadImage(title) {
  const data = await api({ action: "query", prop: "pageimages", piprop: "name", redirects: "1", titles: title });
  const file = data.query?.pages?.[0]?.pageimage;
  if (!file) return null;
  const info = await api({
    action: "query",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "800",
    titles: `File:${file}`,
  });
  const ii = info.query?.pages?.[0]?.imageinfo?.[0];
  if (!ii) return null;
  const meta = ii.extmetadata ?? {};
  return {
    url: ii.thumburl ?? ii.url,
    source: ii.descriptionurl,
    author: stripTags(meta.Artist?.value),
    license: stripTags(meta.LicenseShortName?.value),
  };
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const credits = existsSync(creditsFile) ? JSON.parse(readFileSync(creditsFile, "utf8")) : {};

  for (const { name, slug } of readPlayers()) {
    const target = join(outDir, `${slug}.webp`);
    if (existsSync(target) && !force) {
      console.log(`skip  ${slug} (exists)`);
      continue;
    }
    try {
      const img = await leadImage(overrides[slug] ?? name);
      if (!img) {
        console.warn(`miss  ${slug}: no lead image on Wikipedia`);
        continue;
      }
      const res = await fetch(img.url, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`image ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 82 }).toFile(target);
      credits[slug] = { source: img.source, author: img.author, license: img.license };
      console.log(`ok    ${slug} (${img.license || "unknown licence"})`);
    } catch (err) {
      console.warn(`fail  ${slug}: ${err.message}`);
    }
    await sleep(WAIT_MS);
  }

  writeFileSync(creditsFile, `${JSON.stringify(credits, null, 2)}\n`);
}

main();
