import type { ClubMap } from "@/lib/predictor/types";
import { ROUND_LABELS, type RoundId, type RoundResults } from "@/lib/predictor/uclKnockouts";
import ClubBadge from "./ClubBadge";
import { tieScoreText } from "./KnockoutTie";

const COLUMNS: RoundId[] = ["r16", "qf", "sf", "final"];

export default function Bracket({ rounds, clubs }: { rounds: RoundResults; clubs: ClubMap }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="grid min-w-[44rem] grid-cols-4 gap-4">
        {COLUMNS.map((round) => (
          <div key={round} className="flex flex-col">
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-foreground-muted">
              {ROUND_LABELS[round]}
            </p>
            <ol className="flex flex-1 flex-col justify-around gap-3">
              {(rounds[round] ?? []).map((tie) => (
                <li key={tie.id} className="rounded-xl border border-border-light bg-background-card p-2 text-xs">
                  {[tie.highId, tie.lowId].map((id) => (
                    <div
                      key={id}
                      className={`flex items-center gap-2 py-0.5 ${id === tie.winnerId ? "font-bold text-foreground" : "text-foreground-muted"}`}
                    >
                      <ClubBadge club={clubs[id]} size={24} decorative />
                      <span className="truncate">{clubs[id].name}</span>
                      {id === tie.winnerId && <span className="sr-only">(advanced)</span>}
                    </div>
                  ))}
                  <p className="mt-1 text-[10px] text-foreground-muted">{tieScoreText(tie)}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
