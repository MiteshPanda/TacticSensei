import type { Metadata } from "next";
import { teamsData } from "@/data/profiles/teamsData";
import TeamCard from "@/components/cards/TeamCard";
import SwipeDeck from "@/components/ui/SwipeDeck";

export const metadata: Metadata = {
  title: "Team Profiles",
  description:
    "Explore national football teams — their history, legendary players, tactical identity, and tournament records.",
};

export default function Page() {
  return (
    <section className="bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Pick a national team.</h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground-muted">Swipe across the squads and see what makes each side play the way it does.</p>
      </div>
      <div className="mt-6">
        <SwipeDeck label="Teams">
          {teamsData.map((item) => (
            <TeamCard key={item.slug} team={item} />
          ))}
        </SwipeDeck>
      </div>
    </section>
  );
}
