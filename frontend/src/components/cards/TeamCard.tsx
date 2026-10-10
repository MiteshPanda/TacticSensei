import Link from "next/link";
import type { TeamProfile } from "@/data/profiles/teamsData";
import TiltCard from "./TiltCard";

const FLAG_CODES: Record<string, string> = {
  argentina: "ar",
  brazil: "br",
  france: "fr",
  germany: "de",
  spain: "es",
  portugal: "pt",
  england: "gb-eng",
  netherlands: "nl",
  italy: "it",
  croatia: "hr",
  morocco: "ma",
  japan: "jp",
  usa: "us",
  senegal: "sn",
};

interface TeamCardProps {
  team: TeamProfile;
}

export default function TeamCard({ team }: TeamCardProps) {
  const code = FLAG_CODES[team.slug] ?? "un";
  const stars = team.squad.slice(0, 3);

  return (
    <Link href={`/teams/${team.slug}`} className="block rounded-3xl [perspective:900px]">
      <TiltCard className="overflow-hidden rounded-3xl border border-white/10 bg-[#021a13] text-[#FFF8F0] shadow-[var(--shadow-elevated)]">
        <div className="relative h-44">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://flagcdn.com/w640/${code}.png`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021a13] via-[#021a13]/40 to-transparent" />
          <h3 className="absolute bottom-3 left-4 text-3xl font-extrabold">{team.name}</h3>
        </div>
        <div className="space-y-3 p-4">
          <p className="text-sm text-[#D8F3DC]">{team.titles}</p>
          <p className="text-sm text-[#FFF8F0]/70">{team.style}</p>
          <ul className="flex flex-wrap gap-2 pt-1">
            {stars.map((p) => (
              <li key={p.name} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                {p.name}
              </li>
            ))}
          </ul>
        </div>
      </TiltCard>
    </Link>
  );
}
