"use client";

import Link from "next/link";
import type { PlayerProfile } from "@/data/profiles/playersData";
import TiltCard from "./TiltCard";

interface PlayerCardProps {
  player: PlayerProfile;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

/**
 * Collectible-style player card. Drop a portrait at
 * /public/players/<slug>.webp to replace the monogram fallback.
 */
export default function PlayerCard({ player }: PlayerCardProps) {
  const headline = player.stats.slice(0, 4);

  return (
    <Link href={`/players/${player.slug}`} className="block rounded-3xl [perspective:900px]">
      <TiltCard className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0b5a3f] via-[#053225] to-[#021a13] text-[#FFF8F0] shadow-[var(--shadow-elevated)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <span
            aria-hidden
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 select-none text-[9rem] font-black leading-none tracking-tighter text-white/10"
          >
            {initials(player.name)}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/players/${player.slug}.webp`}
            alt={player.name}
            loading="lazy"
            onError={(e) => (e.currentTarget.style.display = "none")}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#021a13] to-transparent" />
          <div className="absolute left-4 top-4 text-3xl leading-none" aria-label={player.countryName}>
            {player.country}
          </div>
          <div className="absolute inset-x-4 bottom-3">
            <h3 className="text-2xl font-extrabold leading-tight">{player.name}</h3>
            <p className="text-sm text-[#D8F3DC]/80">{player.position}</p>
          </div>
        </div>
        <dl className="grid grid-cols-4 divide-x divide-white/10 border-t border-white/10 bg-black/20">
          {headline.map((s) => (
            <div key={s.label} className="px-1 py-3 text-center">
              <dd className="text-base font-bold tabular-nums">{s.value}</dd>
              <dt className="truncate text-[11px] text-[#D8F3DC]/70">{s.label}</dt>
            </div>
          ))}
        </dl>
      </TiltCard>
    </Link>
  );
}
