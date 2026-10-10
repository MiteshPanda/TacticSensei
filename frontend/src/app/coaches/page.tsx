import type { Metadata } from "next";
import { coachesData } from "@/data/profiles/coachesData";
import CoachCard from "@/components/cards/CoachCard";
import SwipeDeck from "@/components/ui/SwipeDeck";

export const metadata: Metadata = {
  title: "Football Coaches",
  description:
    "Learn about legendary and modern football managers — their philosophies, achievements, and tactical innovations.",
};

export default function Page() {
  return (
    <section className="bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Meet the minds behind the tactics.</h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground-muted">Swipe through the managers and the ideas that changed the game.</p>
      </div>
      <div className="mt-6">
        <SwipeDeck label="Coaches">
          {coachesData.map((item) => (
            <CoachCard key={item.slug} coach={item} />
          ))}
        </SwipeDeck>
      </div>
    </section>
  );
}
