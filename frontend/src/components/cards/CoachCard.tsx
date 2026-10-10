"use client";

import Link from "next/link";
import type { CoachProfile } from "@/data/profiles/coachesData";
import TiltCard from "./TiltCard";

interface CoachCardProps {
  coach: CoachProfile;
}

export default function CoachCard({ coach }: CoachCardProps) {
  return (
    <Link href={`/coaches/${coach.slug}`} className="block rounded-3xl [perspective:900px]">
      <TiltCard className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#2A2330] to-[#201A23] text-[#F7F7FF] shadow-[var(--shadow-elevated)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/coaches/${coach.slug}.webp`}
            alt={coach.name}
            loading="lazy"
            onError={(e) => (e.currentTarget.style.display = "none")}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <span aria-hidden className="absolute inset-0 flex items-center justify-center text-8xl opacity-40">
            {coach.emoji}
          </span>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#201A23] to-transparent" />
          <div className="absolute inset-x-4 bottom-3">
            <h3 className="text-2xl font-extrabold leading-tight">{coach.name}</h3>
            <p className="text-sm text-[#F7F7FF]/70">
              {coach.country} {coach.club}
            </p>
          </div>
        </div>
        <p className="border-t border-white/10 bg-black/20 px-4 py-3 text-sm text-[#74C69D]">
          {coach.philosophy}
        </p>
      </TiltCard>
    </Link>
  );
}
