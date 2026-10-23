import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hubCards } from "@/data/predictor/competitions";

export const metadata: Metadata = {
  title: "Predictor",
  description: "Simulate the Champions League, Europe's big four leagues and the World Cup.",
};

const ICONS: Record<string, string> = {
  "champions-league": "⭐",
  "premier-league": "🦁",
  "la-liga": "☀️",
  "serie-a": "🛡️",
  bundesliga: "🦅",
  "world-cup": "🌍",
};

export default function PredictorHubPage() {
  return (
    <section className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center animate-fade-in-up">
          <span className="mb-4 block text-6xl" aria-hidden>🏆</span>
          <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">Predictor</span>
          </h1>
          <p className="text-lg text-foreground-muted">
            Simulate the Champions League, Europe&apos;s big four leagues and the World Cup.
          </p>
        </header>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hubCards.map((c, i) => (
            <li key={c.id} className={`animate-fade-in-up stagger-${i + 1}`}>
              <Link href={c.href} className="card group flex h-full flex-col gap-3 p-6">
                <span className="text-4xl transition-transform duration-200 group-hover:scale-110" aria-hidden>
                  {ICONS[c.id]}
                </span>
                <span className="text-xl font-bold">{c.name}</span>
                <span className="text-sm text-foreground-muted">{c.format}</span>
                <span className="mt-auto flex items-center justify-between pt-2 text-xs font-semibold">
                  <span className="text-foreground-muted">{c.season ?? ""}</span>
                  <span className="inline-flex items-center gap-1 text-accent">
                    Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
