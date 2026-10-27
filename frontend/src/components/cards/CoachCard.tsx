"use client";

import Link from "next/link";
import type { CoachProfile } from "@/data/profiles/coachesData";
import TiltCard from "./TiltCard";

interface CoachCardProps {
  coach: CoachProfile;
}

/**
 * Manager card. Drop a portrait at /public/coaches/<slug>.webp to replace
 * the emoji fallback.
 */
export default function CoachCard({ coach }: CoachCardProps) {
  const headline = coach.stats.slice(0, 4);

  return (
    <Link href={`/coaches/${coach.slug}`} className="block rounded-3xl [perspective:900px]">
      <TiltCard className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#2A2330] to-[#201A23] text-[#F7F7FF] shadow-[var(--shadow-elevated)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <span aria-hidden className="absolute inset-0 flex items-center justify-center text-8xl opacity-40">
            {coach.emoji}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/coaches/${coach.slug}.webp`}
            alt={coach.name}
            loading="lazy"
            onError={(e) => (e.currentTarget.style.display = "none")}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#201A23] to-transparent" />
          <div className="absolute inset-x-4 bottom-3">
            <h3 className="text-2xl font-extrabold leading-tight">{coach.name}</h3>
            <p className="text-sm text-[#F7F7FF]/70">
              {coach.country} {coach.club}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-[#74C69D]">{coach.philosophy}</p>
          </div>
        </div>
        <dl className="grid grid-cols-4 divide-x divide-white/10 border-t border-white/10 bg-black/20">
          {headline.map((s) => (
            <div key={s.label} className="px-1 py-3 text-center">
              <dd className="text-base font-bold tabular-nums">{s.value}</dd>
              <dt className="truncate text-[11px] text-[#F7F7FF]/60">{s.label}</dt>
            </div>
          ))}
        </dl>
      </TiltCard>
    </Link>
  );
}
