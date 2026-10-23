"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { clubs } from "@/data/predictor/clubs";
import { getLeague } from "@/data/predictor/competitions";
import { simulateSeason, type Season } from "@/lib/predictor/leagueSeason";
import { mulberry32 } from "@/lib/predictor/rng";
import LeagueTable from "./LeagueTable";
import PredictorHeader from "./PredictorHeader";
import ResultsBrowser from "./ResultsBrowser";
import RevealOverlay from "./RevealOverlay";
import SeasonSummaryCard from "./SeasonSummaryCard";
import { newSeed } from "./seed";
import { CrestNotice, panel, SeedNote } from "./ui";

const REVEAL_MS = 2000;

export default function LeaguePredictor({ competitionId }: { competitionId: string }) {
  const competition = getLeague(competitionId)!;
  const reduceMotion = useReducedMotion();
  const [result, setResult] = useState<{ seed: number; season: Season } | null>(null);
  const [revealing, setRevealing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const simulate = () => {
    const seed = newSeed();
    const season = simulateSeason(mulberry32(seed), competition, clubs);
    const show = () => {
      setResult({ seed, season });
      setRevealing(false);
      requestAnimationFrame(() => resultsRef.current?.focus());
    };
    if (reduceMotion) return show();
    setRevealing(true);
    timer.current = setTimeout(show, REVEAL_MS);
  };

  const matchdays = competition.clubIds.length * 2 - 2;
  const revealSteps = Array.from({ length: matchdays }, (_, i) => `Matchday ${i + 1} of ${matchdays}`);

  return (
    <section className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <PredictorHeader name={competition.name} format={competition.format} season={competition.season} icon="⚽" />

        {revealing && <RevealOverlay title={`Simulating the ${competition.name}…`} steps={revealSteps} durationMs={REVEAL_MS} />}

        {!result ? (
          <div className={`${panel} mx-auto max-w-xl p-8 text-center animate-fade-in-up`}>
            <p className="mb-6 text-foreground-muted">
              Every club starts on zero. {matchdays} matchdays are played out from the club ratings, and the table,
              title race, European places and relegation are decided for you.
            </p>
            <button type="button" onClick={simulate} disabled={revealing} className="btn-primary px-8 py-4 text-lg disabled:opacity-50">
              Simulate season
            </button>
          </div>
        ) : (
          <div ref={resultsRef} tabIndex={-1} className="space-y-8 outline-none animate-fade-in-up" aria-label="Season results">
            <div className="flex justify-center">
              <button type="button" onClick={simulate} disabled={revealing} className="btn-secondary disabled:opacity-50">
                ⚡ Simulate again
              </button>
            </div>
            <SeasonSummaryCard season={result.season} clubs={clubs} />
            <LeagueTable
              rows={result.season.table}
              clubs={clubs}
              zones={competition.zones}
              caption={`${competition.name} ${competition.season} final table`}
              footnote="European places simplified; domestic cup winners not modelled."
            />
            <ResultsBrowser key={result.seed} matchdays={result.season.matchdays} clubs={clubs} />
            <SeedNote seed={result.seed} />
          </div>
        )}

        <CrestNotice />
      </div>
    </section>
  );
}
