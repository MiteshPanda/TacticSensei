interface Step {
  key: string;
  label: string;
}

interface StepProgressProps {
  steps: Step[];
  current: number;
  /** Highest step index the user may jump back to. */
  reachable?: number;
  onSelect?: (index: number) => void;
}

export default function StepProgress({ steps, current, reachable = -1, onSelect }: StepProgressProps) {
  return (
    <nav aria-label="Progress" className="mb-10">
      <ol className="flex items-center justify-center">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          const clickable = !!onSelect && i <= reachable && !active;
          const circle = `flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold transition-all duration-300 ${
            done
              ? "bg-accent text-white"
              : active
                ? "bg-success text-white ring-4 ring-success/30 scale-110"
                : "bg-border text-foreground-muted"
          }`;
          return (
            <li key={s.key} className="flex items-center">
              {clickable ? (
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  className={`${circle} cursor-pointer hover:ring-2 hover:ring-accent/40`}
                  aria-label={`Go to ${s.label}`}
                >
                  {done ? "✓" : i + 1}
                </button>
              ) : (
                <span className={circle} aria-current={active ? "step" : undefined} aria-label={s.label}>
                  {done ? "✓" : i + 1}
                </span>
              )}
              <span
                className={`hidden xl:block ml-2 text-sm font-medium ${active ? "text-foreground" : "text-foreground-muted"}`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className={`w-2 mx-1 sm:w-6 sm:mx-2 h-0.5 transition-colors duration-300 ${done ? "bg-accent" : "bg-border"}`}
                />
              )}
            </li>
          );
        })}
      </ol>
      <p className="xl:hidden mt-3 text-center text-sm font-semibold text-foreground">{steps[current]?.label}</p>
    </nav>
  );
}
