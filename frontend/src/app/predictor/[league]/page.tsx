import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LeaguePredictor from "@/components/predictor/LeaguePredictor";
import { getLeague, leagues } from "@/data/predictor/competitions";

export const dynamicParams = false;

export function generateStaticParams() {
  return leagues.map((l) => ({ league: l.id }));
}

type Props = { params: Promise<{ league: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const league = getLeague((await params).league);
  return league
    ? { title: `${league.name} Predictor`, description: `Simulate the ${league.season} ${league.name} season.` }
    : {};
}

export default async function LeaguePredictorPage({ params }: Props) {
  const league = getLeague((await params).league);
  if (!league) notFound();
  return <LeaguePredictor competitionId={league.id} />;
}
