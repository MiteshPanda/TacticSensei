import type { ReactNode } from "react";

/** Card surface without the hover lift of `.card`, for large tables and result panels. */
export const panel =
  "rounded-[var(--radius-card)] border border-border-light bg-background-card shadow-[var(--shadow-card)]";

export function SectionHeading({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-xl! font-bold leading-tight! mb-4">
      {children}
    </h2>
  );
}

export function SeedNote({ seed }: { seed: number }) {
  return <p className="mt-6 text-center text-xs text-foreground-muted">Seed {seed}</p>;
}

export function CrestNotice() {
  return (
    <p className="mt-10 text-center text-xs text-foreground-muted">
      Club crests are trademarks of their respective clubs.
    </p>
  );
}

export function Score({ home, away }: { home: number; away: number }) {
  return (
    <span className="tabular-nums font-bold">
      {home}–{away}
    </span>
  );
}
