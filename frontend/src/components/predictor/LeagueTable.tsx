import type { ClubMap, FormResult, TableRow, Zone } from "@/lib/predictor/types";
import ClubBadge from "./ClubBadge";
import { panel } from "./ui";
import { rangeLabel, ZONE_COLORS, zonesAt } from "./zones";

interface LeagueTableProps {
  rows: TableRow[];
  clubs: ClubMap;
  zones: Zone[];
  caption: string;
  showForm?: boolean;
  footnote?: string;
}

const FORM_STYLE: Record<FormResult, string> = {
  W: "bg-success/20 text-success",
  D: "bg-border text-foreground-muted",
  L: "bg-error/15 text-error",
};

const FORM_WORD: Record<FormResult, string> = { W: "Win", D: "Draw", L: "Loss" };

export default function LeagueTable({ rows, clubs, zones, caption, showForm = true, footnote }: LeagueTableProps) {
  const num = "px-2 py-2 text-center tabular-nums";
  return (
    <div>
      <div className={`${panel} overflow-x-auto`}>
        <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="text-xs uppercase tracking-wider text-foreground-muted">
            <tr>
              <th scope="col" className="sticky left-0 z-10 w-10 bg-background-card px-2 py-3 text-center">Pos</th>
              <th scope="col" className="sticky left-10 z-10 bg-background-card px-2 py-3 text-left">Club</th>
              <th scope="col" className={num} title="Played">P</th>
              <th scope="col" className={num} title="Won">W</th>
              <th scope="col" className={num} title="Drawn">D</th>
              <th scope="col" className={num} title="Lost">L</th>
              <th scope="col" className={num} title="Goals for">GF</th>
              <th scope="col" className={num} title="Goals against">GA</th>
              <th scope="col" className={num} title="Goal difference">GD</th>
              <th scope="col" className={`${num} text-accent`} title="Points">Pts</th>
              {showForm && <th scope="col" className="hidden md:table-cell px-3 py-3 text-left">Form</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const pos = i + 1;
              const club = clubs[r.clubId];
              const rowZones = zonesAt(zones, pos);
              const label = [`${pos}. ${club.name}`, ...rowZones.map((z) => z.label)].join(", ");
              const color = rowZones[0] ? ZONE_COLORS[rowZones[0].kind] : "transparent";
              const cell = "border-t border-border-light";
              return (
                <tr key={r.clubId} aria-label={label} title={label} className="hover:bg-background-secondary/60">
                  <td
                    className={`${cell} sticky left-0 z-10 w-10 bg-background-card px-2 py-2 text-center font-semibold tabular-nums`}
                    style={{ boxShadow: `inset 4px 0 0 ${color}` }}
                  >
                    {pos}
                  </td>
                  <th scope="row" className={`${cell} sticky left-10 z-10 bg-background-card px-2 py-2 text-left font-medium`}>
                    <span className="flex items-center gap-2">
                      <ClubBadge club={club} size={24} decorative />
                      <span className="max-w-[8.5rem] truncate sm:max-w-none">{club.name}</span>
                    </span>
                  </th>
                  <td className={`${cell} ${num} text-foreground-muted`}>{r.played}</td>
                  <td className={`${cell} ${num} text-foreground-muted`}>{r.won}</td>
                  <td className={`${cell} ${num} text-foreground-muted`}>{r.drawn}</td>
                  <td className={`${cell} ${num} text-foreground-muted`}>{r.lost}</td>
                  <td className={`${cell} ${num} text-foreground-muted`}>{r.gf}</td>
                  <td className={`${cell} ${num} text-foreground-muted`}>{r.ga}</td>
                  <td className={`${cell} ${num} text-foreground-muted`}>{r.gd > 0 ? `+${r.gd}` : r.gd}</td>
                  <td className={`${cell} ${num} font-bold text-accent`}>{r.pts}</td>
                  {showForm && (
                    <td className={`${cell} hidden md:table-cell px-3 py-2`}>
                      <span className="flex gap-1" aria-label={`Last ${r.form.length}: ${r.form.map((f) => FORM_WORD[f]).join(", ")}`}>
                        {r.form.map((f, k) => (
                          <span key={k} aria-hidden className={`inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${FORM_STYLE[f]}`}>
                            {f}
                          </span>
                        ))}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-foreground-muted" aria-label="Table legend">
        {zones.map((z) => (
          <li key={z.kind} className="flex items-center gap-2">
            <span aria-hidden className="h-4 w-1 rounded-sm" style={{ background: ZONE_COLORS[z.kind] }} />
            <span>
              <span className="font-semibold text-foreground">{rangeLabel(z)}</span> {z.label}
            </span>
          </li>
        ))}
      </ul>
      {footnote && <p className="mt-2 text-xs text-foreground-muted">{footnote}</p>}
    </div>
  );
}
