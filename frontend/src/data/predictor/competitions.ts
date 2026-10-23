import type { TieBreaker, Zone } from "@/lib/predictor/types";

export const SEASON = "2026/27";

export interface ClubCompetition {
  id: string;
  kind: "league" | "ucl";
  name: string;
  season: string;
  format: string;
  clubIds: string[];
  zones: Zone[];
  tieBreakers: TieBreaker[];
}

const bigLeagueZones: Zone[] = [
  { kind: "champion", label: "Champion", from: 1, to: 1 },
  { kind: "ucl", label: "Champions League", from: 1, to: 4 },
  { kind: "uel", label: "Europa League", from: 5, to: 5 },
  { kind: "uecl", label: "Conference League", from: 6, to: 6 },
  { kind: "relegated", label: "Relegated", from: 18, to: 20 },
];

const bundesligaZones: Zone[] = [
  { kind: "champion", label: "Champion", from: 1, to: 1 },
  { kind: "ucl", label: "Champions League", from: 1, to: 4 },
  { kind: "uel", label: "Europa League", from: 5, to: 5 },
  { kind: "uecl", label: "Conference League", from: 6, to: 6 },
  { kind: "relegationPlayoff", label: "Relegation play-off", from: 16, to: 16 },
  { kind: "relegated", label: "Relegated", from: 17, to: 18 },
];

export const premierLeague: ClubCompetition = {
  id: "premier-league",
  kind: "league",
  name: "Premier League",
  season: SEASON,
  format: "38 matchdays · 20 clubs",
  clubIds: [
    "arsenal", "manchester-city", "liverpool", "chelsea", "newcastle-united", "aston-villa",
    "manchester-united", "tottenham-hotspur", "brighton-hove-albion", "bournemouth", "crystal-palace",
    "brentford", "nottingham-forest", "everton", "fulham", "leeds-united", "sunderland", "ipswich-town",
    "coventry-city", "hull-city",
  ],
  zones: bigLeagueZones,
  tieBreakers: ["gd", "gf", "h2hPts"],
};

export const laLiga: ClubCompetition = {
  id: "la-liga",
  kind: "league",
  name: "LaLiga",
  season: SEASON,
  format: "38 matchdays · 20 clubs",
  clubIds: [
    "barcelona", "real-madrid", "atletico-madrid", "athletic-club", "villarreal", "real-betis",
    "real-sociedad", "celta-vigo", "sevilla", "osasuna", "rayo-vallecano", "valencia", "espanyol",
    "getafe", "alaves", "elche", "levante", "deportivo-la-coruna", "malaga", "racing-santander",
  ],
  zones: bigLeagueZones,
  tieBreakers: ["h2hPts", "h2hGd", "gd", "gf"],
};

export const serieA: ClubCompetition = {
  id: "serie-a",
  kind: "league",
  name: "Serie A",
  season: SEASON,
  format: "38 matchdays · 20 clubs",
  clubIds: [
    "inter", "napoli", "ac-milan", "juventus", "atalanta", "roma", "como", "bologna", "lazio",
    "fiorentina", "torino", "udinese", "genoa", "sassuolo", "cagliari", "parma", "lecce", "monza",
    "venezia", "frosinone",
  ],
  zones: bigLeagueZones,
  tieBreakers: ["h2hPts", "h2hGd", "gd", "gf"],
};

export const bundesliga: ClubCompetition = {
  id: "bundesliga",
  kind: "league",
  name: "Bundesliga",
  season: SEASON,
  format: "34 matchdays · 18 clubs",
  clubIds: [
    "bayern-munich", "borussia-dortmund", "bayer-leverkusen", "rb-leipzig", "vfb-stuttgart",
    "eintracht-frankfurt", "sc-freiburg", "tsg-hoffenheim", "mainz-05", "werder-bremen",
    "borussia-monchengladbach", "fc-augsburg", "union-berlin", "fc-koln", "hamburger-sv", "schalke-04",
    "sv-elversberg", "sc-paderborn",
  ],
  zones: bundesligaZones,
  tieBreakers: ["gd", "gf", "h2hPts", "h2hAwayGoals", "awayGoals"],
};

export const championsLeague: ClubCompetition = {
  id: "champions-league",
  kind: "ucl",
  name: "Champions League",
  season: SEASON,
  format: "36 clubs · league phase + knockouts",
  clubIds: [
    "paris-saint-germain", "bayern-munich", "arsenal", "manchester-city", "barcelona", "real-madrid",
    "liverpool", "inter", "atletico-madrid", "napoli", "borussia-dortmund", "rb-leipzig", "roma",
    "aston-villa", "manchester-united", "vfb-stuttgart", "como", "fc-porto", "sporting-cp", "villarreal",
    "real-betis", "galatasaray", "lille", "psv-eindhoven", "fenerbahce", "rc-lens", "club-brugge",
    "feyenoord", "bodo-glimt", "shakhtar-donetsk", "slavia-praha", "aek-athens", "lask", "viking-fk",
    "slovan-bratislava", "sabah-fk",
  ],
  zones: [
    { kind: "r16", label: "Round of 16", from: 1, to: 8 },
    { kind: "knockoutPlayoff", label: "Knockout play-off", from: 9, to: 24 },
    { kind: "eliminated", label: "Eliminated", from: 25, to: 36 },
  ],
  tieBreakers: ["gd", "gf", "awayGoals", "wins", "awayWins"],
};

export const leagues: ClubCompetition[] = [premierLeague, laLiga, serieA, bundesliga];

export const clubCompetitions: ClubCompetition[] = [championsLeague, ...leagues];

export function getLeague(id: string): ClubCompetition | undefined {
  return leagues.find((l) => l.id === id);
}

export interface HubCard {
  id: string;
  href: string;
  name: string;
  format: string;
  season?: string;
}

export const hubCards: HubCard[] = [
  ...clubCompetitions.map((c) => ({
    id: c.id,
    href: `/predictor/${c.id}`,
    name: c.name,
    format: c.format,
    season: c.season,
  })),
  { id: "world-cup", href: "/predictor/world-cup", name: "World Cup", format: "Classic 8-team bracket" },
];
