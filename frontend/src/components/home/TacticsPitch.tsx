"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Point = readonly [number, number];

interface Formation {
  name: string;
  blurb: string;
  /** GK first, then outfield. Coordinates are % of pitch width/height, own goal at the bottom. */
  points: readonly Point[];
}

const FORMATIONS: readonly Formation[] = [
  {
    name: "4-3-3",
    blurb: "Width from the wingers, a single pivot in midfield. Barcelona and Liverpool built dynasties on it.",
    points: [[50, 92], [14, 74], [38, 78], [62, 78], [86, 74], [50, 58], [30, 50], [70, 50], [16, 22], [50, 16], [84, 22]],
  },
  {
    name: "4-4-2",
    blurb: "Two flat banks of four. Simple, compact, and the shape most beginners first learn.",
    points: [[50, 92], [14, 74], [38, 78], [62, 78], [86, 74], [14, 48], [38, 52], [62, 52], [86, 48], [38, 20], [62, 20]],
  },
  {
    name: "3-5-2",
    blurb: "Three centre-backs free the wing-backs to hug the touchline and overload midfield.",
    points: [[50, 92], [28, 78], [50, 80], [72, 78], [8, 52], [30, 54], [50, 46], [70, 54], [92, 52], [38, 20], [62, 20]],
  },
];

const ROLES = ["GK", "RB", "CB", "CB", "LB", "CM", "CM", "CM", "RW", "ST", "LW"];

export default function TacticsPitch() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const formation = FORMATIONS[active];

  return (
    <div className="w-full max-w-md">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/15 bg-[#0b5a3f] shadow-[var(--shadow-elevated)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.05) 0 12.5%, transparent 12.5% 25%)",
        }}
      >
        {/* pitch markings */}
        <svg aria-hidden viewBox="0 0 300 400" className="absolute inset-0 h-full w-full text-white/40">
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="10" y="10" width="280" height="380" />
            <line x1="10" y1="200" x2="290" y2="200" />
            <circle cx="150" cy="200" r="36" />
            <rect x="75" y="10" width="150" height="62" />
            <rect x="75" y="328" width="150" height="62" />
            <rect x="115" y="10" width="70" height="24" />
            <rect x="115" y="366" width="70" height="24" />
          </g>
        </svg>

        {formation.points.map(([x, y], i) => (
          <motion.button
            key={i}
            type="button"
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
            animate={{ left: `${x}%`, top: `${y}%` }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 18, delay: i * 0.015 }}
            whileDrag={{ scale: 1.2 }}
            aria-label={`${ROLES[i]} — drag to move`}
            className="absolute -ml-5 -mt-5 flex h-10 w-10 cursor-grab touch-none items-center justify-center rounded-full border-2 border-[#FFF8F0] bg-[#053225] text-[11px] font-bold text-[#FFF8F0] shadow-lg active:cursor-grabbing"
          >
            {ROLES[i]}
          </motion.button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2" role="tablist" aria-label="Formation">
        {FORMATIONS.map((f, i) => (
          <button
            key={f.name}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              i === active
                ? "bg-foreground text-foreground-inverse"
                : "border border-border text-foreground-muted hover:border-accent"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{formation.blurb}</p>
    </div>
  );
}
