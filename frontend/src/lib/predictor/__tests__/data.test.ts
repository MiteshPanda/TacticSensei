import { describe, expect, it } from "vitest";
import { clubList, clubs } from "@/data/predictor/clubs";
import { clubCompetitions } from "@/data/predictor/competitions";

const EXPECTED_IDS = `
arsenal manchester-city liverpool chelsea newcastle-united aston-villa manchester-united tottenham-hotspur
brighton-hove-albion bournemouth crystal-palace brentford nottingham-forest everton fulham leeds-united
sunderland ipswich-town coventry-city hull-city
barcelona real-madrid atletico-madrid athletic-club villarreal real-betis real-sociedad celta-vigo sevilla
osasuna rayo-vallecano valencia espanyol getafe alaves elche levante deportivo-la-coruna malaga racing-santander
inter napoli ac-milan juventus atalanta roma como bologna lazio fiorentina torino udinese genoa sassuolo
cagliari parma lecce monza venezia frosinone
bayern-munich borussia-dortmund bayer-leverkusen rb-leipzig vfb-stuttgart eintracht-frankfurt sc-freiburg
tsg-hoffenheim mainz-05 werder-bremen borussia-monchengladbach fc-augsburg union-berlin fc-koln hamburger-sv
schalke-04 sv-elversberg sc-paderborn
paris-saint-germain fc-porto sporting-cp galatasaray lille psv-eindhoven fenerbahce rc-lens club-brugge
feyenoord bodo-glimt shakhtar-donetsk slavia-praha aek-athens lask viking-fk slovan-bratislava sabah-fk
`.trim().split(/\s+/);

describe("club data", () => {
  it("contains exactly the 96 listed club ids", () => {
    expect(EXPECTED_IDS).toHaveLength(96);
    expect(clubList.map((c) => c.id).sort()).toEqual([...EXPECTED_IDS].sort());
  });

  it("has well-formed, unique records", () => {
    const shorts = clubList.map((c) => c.shortName);
    expect(new Set(shorts).size).toBe(shorts.length);
    for (const c of clubList) {
      expect(c.shortName).toMatch(/^[A-Z]{3}$/);
      expect(c.country).toMatch(/^[A-Z]{3}$/);
      expect(c.colors.every((col) => /^#[0-9A-F]{6}$/i.test(col))).toBe(true);
      expect(c.rating).toBeGreaterThan(0);
    }
  });

  it("references only known clubs in every competition", () => {
    for (const comp of clubCompetitions) {
      for (const id of comp.clubIds) expect(clubs[id], `${comp.id}: ${id}`).toBeDefined();
      expect(new Set(comp.clubIds).size).toBe(comp.clubIds.length);
    }
    expect(clubCompetitions.map((c) => c.clubIds.length)).toEqual([36, 20, 20, 20, 18]);
  });
});
