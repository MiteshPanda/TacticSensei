"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useId, useState } from "react";
import type { ClubMap, MatchResult } from "@/lib/predictor/types";
import ResultsList from "./ResultsList";
import { panel, SectionHeading } from "./ui";

export default function ResultsBrowser({ matchdays, clubs }: { matchdays: MatchResult[][]; clubs: ClubMap }) {
  const [index, setIndex] = useState(0);
  const selectId = useId();
  const last = matchdays.length - 1;
  const nav =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:bg-accent-light disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-transparent";

  return (
    <section className={`${panel} p-4 sm:p-6`} aria-labelledby={`${selectId}-h`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <SectionHeading id={`${selectId}-h`}>Results</SectionHeading>
        <div className="flex items-center gap-2">
          <button type="button" className={nav} onClick={() => setIndex((i) => i - 1)} disabled={index === 0} aria-label="Previous matchday">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <label htmlFor={selectId} className="sr-only">Matchday</label>
          <select
            id={selectId}
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
            className="rounded-full border border-border bg-background-card px-4 py-1.5 text-sm font-semibold focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-ring!"
          >
            {matchdays.map((_, i) => (
              <option key={i} value={i}>Matchday {i + 1}</option>
            ))}
          </select>
          <button type="button" className={nav} onClick={() => setIndex((i) => i + 1)} disabled={index === last} aria-label="Next matchday">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <ResultsList matches={matchdays[index]} clubs={clubs} />
    </section>
  );
}
