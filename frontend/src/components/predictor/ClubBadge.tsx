"use client";

import Image from "next/image";
import { useState } from "react";
import { clubLogos } from "@/data/predictor/clubLogos.generated";
import type { Club } from "@/lib/predictor/types";
import { readableText } from "./contrast";

export type BadgeSize = 24 | 40 | 64 | 128;

interface ClubBadgeProps {
  club: Club;
  size?: BadgeSize;
  /** True when the club name is printed right next to the badge. */
  decorative?: boolean;
}

export default function ClubBadge({ club, size = 24, decorative = false }: ClubBadgeProps) {
  const src = clubLogos[club.id];
  const [failed, setFailed] = useState(false);
  const alt = decorative ? "" : `${club.name} logo`;
  const box = { width: size, height: size };

  if (src && !failed) {
    const pad = Math.max(2, Math.round(size * 0.1));
    const inner = size - pad * 2;
    return (
      <span
        className="inline-flex shrink-0 items-center justify-center bg-white ring-1 ring-black/10"
        style={{ ...box, padding: pad, borderRadius: Math.round(size * 0.22) }}
      >
        <Image
          src={src}
          alt={alt}
          width={inner}
          height={inner}
          unoptimized={src.endsWith(".svg")}
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  const [primary, secondary] = club.colors;
  return (
    <span
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative || undefined}
      className="inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold leading-none tracking-tight ring-1 ring-black/15"
      style={{
        ...box,
        background: primary,
        color: readableText(primary, secondary),
        fontSize: Math.max(7, Math.round(size * 0.3)),
      }}
    >
      {club.shortName}
    </span>
  );
}
