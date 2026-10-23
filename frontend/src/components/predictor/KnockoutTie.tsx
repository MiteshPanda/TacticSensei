import { Check } from "lucide-react";
import type { ClubMap } from "@/lib/predictor/types";
import { ROUND_LABELS, type KnockoutTie as Tie, type Pairing } from "@/lib/predictor/uclKnockouts";
import ClubBadge from "./ClubBadge";

/** "3–2 agg (a.e.t.)" or "1–1 (4–3 pens)" from the given club's point of view. */
export function tieScoreText(tie: Tie, forId: string = tie.winnerId): string {
  if (tie.picked || !tie.aggregate) return "Your pick";
  const mine = forId === tie.highId;
  const a = mine ? tie.aggregate.high : tie.aggregate.low;
  const b = mine ? tie.aggregate.low : tie.aggregate.high;
  const parts = [`${a}–${b}${tie.legs.length > 1 ? " agg" : ""}`];
  if (tie.legs.at(-1)?.extraTime) parts.push("(a.e.t.)");
  if (tie.penalties) {
    const p = mine ? [tie.penalties.high, tie.penalties.low] : [tie.penalties.low, tie.penalties.high];
    parts.push(`(${p[0]}–${p[1]} pens)`);
  }
  return parts.join(" ");
}

interface KnockoutTieProps {
  pairing: Pairing;
  clubs: ClubMap;
  tie?: Tie;
  /** Pending pick before the round is confirmed. */
  pick?: string;
  onPick?: (winnerId: string) => void;
}

export default function KnockoutTie({ pairing, clubs, tie, pick, onPick }: KnockoutTieProps) {
  const high = clubs[pairing.highId];
  const low = clubs[pairing.lowId];
  const winnerId = tie?.winnerId ?? pick;
  const isPick = tie ? tie.picked : !!pick;
  const pickable = !tie && !!onPick;
  const round = ROUND_LABELS[pairing.round];

  const aggFor = (id: string) =>
    tie?.aggregate ? (id === pairing.highId ? tie.aggregate.high : tie.aggregate.low) : null;

  return (
    <article
      aria-label={`${high.name} v ${low.name}, ${round}`}
      className="rounded-2xl border border-border bg-background-secondary p-4"
    >
      <p className="mb-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-foreground-muted">
        <span>{pairing.seed ? `${round} · Seed ${pairing.seed}` : round}</span>
        {isPick && <span className="rounded-full bg-info/15 px-2 py-0.5 text-info normal-case tracking-normal">Your pick</span>}
      </p>
      <div className="flex flex-col gap-2">
        {[high, low].map((club) => {
          const won = winnerId === club.id;
          const lost = !!winnerId && !won;
          const content = (
            <>
              <ClubBadge club={club} size={40} decorative />
              <span className="min-w-0 flex-1 truncate text-left font-semibold">{club.name}</span>
              {won && (
                <>
                  <Check className="h-4 w-4 shrink-0 text-success" aria-hidden />
                  <span className="sr-only">advances</span>
                </>
              )}
              {aggFor(club.id) !== null && (
                <span className="w-6 shrink-0 text-right text-lg font-bold tabular-nums">{aggFor(club.id)}</span>
              )}
            </>
          );
          const base = `flex w-full items-center gap-3 rounded-xl border-2 px-3 py-2 transition-all duration-150 ${
            won ? "border-success bg-success/15" : lost ? "border-transparent opacity-50" : "border-transparent bg-background-card"
          }`;
          return pickable ? (
            <button
              key={club.id}
              type="button"
              onClick={() => onPick!(club.id)}
              aria-pressed={won}
              aria-label={`Pick ${club.name} to win the tie`}
              className={`${base} cursor-pointer hover:border-accent ${lost ? "hover:opacity-80" : ""}`}
            >
              {content}
            </button>
          ) : (
            <div key={club.id} className={base}>
              {content}
            </div>
          );
        })}
      </div>
      {tie && !tie.picked && (
        <p className="mt-3 text-xs text-foreground-muted">
          {tie.legs.map((leg, i) => (
            <span key={i} className="mr-3 inline-block">
              {tie.legs.length > 1 ? `${i === 0 ? "1st" : "2nd"} leg: ` : "Neutral venue: "}
              {clubs[leg.homeId].shortName} {leg.homeGoals}–{leg.awayGoals} {clubs[leg.awayId].shortName}
              {leg.extraTime ? " (a.e.t.)" : ""}
            </span>
          ))}
          {tie.penalties && (
            <span className="inline-block font-semibold text-foreground">
              {clubs[tie.winnerId].shortName} win {Math.max(tie.penalties.high, tie.penalties.low)}–
              {Math.min(tie.penalties.high, tie.penalties.low)} on pens
            </span>
          )}
        </p>
      )}
    </article>
  );
}
