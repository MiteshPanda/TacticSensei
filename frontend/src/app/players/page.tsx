import type { Metadata } from "next";
import { playersData } from "@/data/profiles/playersData";
import PlayerCard from "@/components/cards/PlayerCard";
import SwipeDeck from "@/components/ui/SwipeDeck";

export const metadata: Metadata = {
  title: "Player Encyclopedia",
  description:
    "Discover legendary and modern football players — their stories, stats, playing styles, and career highlights.",
};

export default function Page() {
  return (
    <section className="bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Swipe through the legends.</h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground-muted">Drag, swipe or use the arrow keys. Tap a card to read the full story.</p>
      </div>
      <div className="mt-6">
        <SwipeDeck label="Players">
          {playersData.map((item) => (
            <PlayerCard key={item.slug} player={item} />
          ))}
        </SwipeDeck>
      </div>
    </section>
  );
}
