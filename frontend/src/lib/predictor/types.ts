export interface Club {
  id: string;
  name: string;
  shortName: string;
  country: string;
  rating: number;
  colors: [primary: string, secondary: string];
}

export type ClubMap = Record<string, Club>;

export interface Score {
  homeGoals: number;
  awayGoals: number;
}

export interface MatchResult extends Score {
  id: string;
  matchday: number;
  homeId: string;
  awayId: string;
}

export type FormResult = "W" | "D" | "L";

export interface TableRow {
  clubId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  awayGoals: number;
  awayWins: number;
  form: FormResult[];
}

export type TieBreaker =
  | "gd"
  | "gf"
  | "h2hPts"
  | "h2hGd"
  | "h2hAwayGoals"
  | "awayGoals"
  | "wins"
  | "awayWins";

export type ZoneKind =
  | "champion"
  | "ucl"
  | "uel"
  | "uecl"
  | "relegationPlayoff"
  | "relegated"
  | "r16"
  | "knockoutPlayoff"
  | "eliminated";

export interface Zone {
  kind: ZoneKind;
  label: string;
  from: number;
  to: number;
}
