import type { Metadata } from "next";
import ChampionsLeaguePredictor from "@/components/predictor/ChampionsLeaguePredictor";

export const metadata: Metadata = {
  title: "Champions League Predictor",
  description: "Simulate the 2026/27 Champions League: league-phase draw, 36-club table and two-legged knockouts.",
};

export default function ChampionsLeaguePage() {
  return <ChampionsLeaguePredictor />;
}
