import type { Zone, ZoneKind } from "@/lib/predictor/types";

export const ZONE_COLORS: Record<ZoneKind, string> = {
  champion: "var(--warning)",
  ucl: "var(--info)",
  uel: "#F97316",
  uecl: "var(--success)",
  relegationPlayoff: "#A78BFA",
  relegated: "var(--error)",
  r16: "var(--success)",
  knockoutPlayoff: "var(--info)",
  eliminated: "var(--foreground-muted)",
};

export function zonesAt(zones: readonly Zone[], position: number): Zone[] {
  return zones.filter((z) => position >= z.from && position <= z.to);
}

export function rangeLabel(z: Zone): string {
  return z.from === z.to ? `${z.from}` : `${z.from}–${z.to}`;
}
