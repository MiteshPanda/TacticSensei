import type { ClubMap, MatchResult } from "@/lib/predictor/types";
import ClubBadge from "./ClubBadge";

interface ResultsListProps {
  matches: MatchResult[];
  clubs: ClubMap;
  /** Optional per-match note, e.g. a round name. */
  note?: (m: MatchResult) => string | undefined;
}

export default function ResultsList({ matches, clubs, note }: ResultsListProps) {
  return (
    <ul className="divide-y divide-border-light">
      {matches.map((m) => {
        const home = clubs[m.homeId];
        const away = clubs[m.awayId];
        const extra = note?.(m);
        return (
          <li key={m.id} className="py-2.5">
            {extra && <p className="mb-1 text-center text-[11px] uppercase tracking-wider text-foreground-muted">{extra}</p>}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
              <span className="flex min-w-0 items-center justify-end gap-2 text-right text-sm font-medium">
                <span className="truncate sm:hidden">{home.shortName}</span>
                <span className="hidden truncate sm:inline">{home.name}</span>
                <ClubBadge club={home} size={40} decorative />
              </span>
              <span
                className="min-w-[3.5rem] rounded-lg bg-background-secondary px-2 py-1 text-center text-base font-bold tabular-nums"
                aria-label={`${home.name} ${m.homeGoals}, ${away.name} ${m.awayGoals}`}
              >
                {m.homeGoals}–{m.awayGoals}
              </span>
              <span className="flex min-w-0 items-center gap-2 text-sm font-medium">
                <ClubBadge club={away} size={40} decorative />
                <span className="truncate sm:hidden">{away.shortName}</span>
                <span className="hidden truncate sm:inline">{away.name}</span>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
