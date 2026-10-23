"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { teamsData } from "@/data/profiles/teamsData";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Team {
  id: string;
  name: string;
  flag: string;
  strength: number; // used for AI mode display only
}

interface GroupMatch {
  id: string;
  homeId: string;
  awayId: string;
  result: "home" | "away" | "draw" | null;
}

interface GroupStanding {
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  pts: number;
}

interface KnockoutMatch {
  id: string;
  label: string;
  homeId: string | null;
  awayId: string | null;
  winnerId: string | null;
}

type Step = "setup" | "groups" | "semis" | "final" | "champion";

const flagCodes: Record<string, string> = {
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

// ─── Static data ─────────────────────────────────────────────────────────────

const BASE_TEAMS: Team[] = [
  ...teamsData.map((t, i) => {
    const abbrevMap: Record<string, string> = {
      argentina: "ARG",
      brazil: "BRA",
      france: "FRA",
      germany: "GER",
      spain: "ESP",
      portugal: "POR",
    };
    return {
      id: t.slug,
      name: t.name,
      flag: abbrevMap[t.slug] || t.flag,
      strength: [95, 93, 96, 87, 92, 99][i] ?? 80,
    };
  }),
  { id: "england", name: "England", flag: "ENG", strength: 88 },
  { id: "netherlands", name: "Netherlands", flag: "NED", strength: 86 },
  { id: "italy", name: "Italy", flag: "ITA", strength: 84 },
  { id: "croatia", name: "Croatia", flag: "CRO", strength: 82 },
  { id: "morocco", name: "Morocco", flag: "MOR", strength: 80 },
  { id: "japan", name: "Japan", flag: "JPN", strength: 78 },
  { id: "usa", name: "USA", flag: "USA", strength: 77 },
  { id: "senegal", name: "Senegal", flag: "SEN", strength: 79 },
];

const TOTAL_TEAMS_NEEDED = 8;

// generate group-stage fixtures (round-robin within group)
function generateGroupMatches(group: string[], prefix: string): GroupMatch[] {
  const matches: GroupMatch[] = [];
  let idx = 0;
  for (let i = 0; i < group.length - 1; i++) {
    for (let j = i + 1; j < group.length; j++) {
      matches.push({
        id: `${prefix}-${idx++}`,
        homeId: group[i],
        awayId: group[j],
        result: null,
      });
    }
  }
  return matches;
}

function calcStandings(
  teamIds: string[],
  matches: GroupMatch[]
): GroupStanding[] {
  const map: Record<string, GroupStanding> = {};
  teamIds.forEach((id) => {
    map[id] = { teamId: id, played: 0, wins: 0, draws: 0, losses: 0, pts: 0 };
  });
  matches.forEach((m) => {
    if (!m.result) return;
    map[m.homeId].played++;
    map[m.awayId].played++;
    if (m.result === "home") {
      map[m.homeId].wins++;
      map[m.homeId].pts += 3;
      map[m.awayId].losses++;
    } else if (m.result === "away") {
      map[m.awayId].wins++;
      map[m.awayId].pts += 3;
      map[m.homeId].losses++;
    } else {
      map[m.homeId].draws++;
      map[m.homeId].pts++;
      map[m.awayId].draws++;
      map[m.awayId].pts++;
    }
  });
  return Object.values(map).sort((a, b) => b.pts - a.pts || b.wins - a.wins);
}

// Simulate a single match result, weighted by team strength
function simulateMatch(homeId: string, awayId: string): "home" | "away" | "draw" {
  const home = BASE_TEAMS.find((t) => t.id === homeId);
  const away = BASE_TEAMS.find((t) => t.id === awayId);
  const hs = home?.strength ?? 80;
  const as_ = away?.strength ?? 80;
  const total = hs + as_ + 10; // 10 = draw weight
  const roll = Math.random() * total;
  if (roll < hs) return "home";
  if (roll < hs + as_) return "away";
  return "draw";
}

// Simulate a knockout match (no draws) – higher strength wins more often
function simulateKnockout(homeId: string, awayId: string): string {
  const home = BASE_TEAMS.find((t) => t.id === homeId);
  const away = BASE_TEAMS.find((t) => t.id === awayId);
  const hs = home?.strength ?? 80;
  const as_ = away?.strength ?? 80;
  return Math.random() * (hs + as_) < hs ? homeId : awayId;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PredictorPage() {
  // Step
  const [step, setStep] = useState<Step>("setup");

  // Mode: manual or auto
  const [mode, setMode] = useState<"manual" | "auto" | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showRoadToGlory, setShowRoadToGlory] = useState(false);

  // Setup: chosen teams
  const [chosen, setChosen] = useState<string[]>([]);

  // Groups (after setup)
  const [groupA, setGroupA] = useState<string[]>([]);
  const [groupB, setGroupB] = useState<string[]>([]);
  const [matchesA, setMatchesA] = useState<GroupMatch[]>([]);
  const [matchesB, setMatchesB] = useState<GroupMatch[]>([]);

  // Knockout
  const [semis, setSemis] = useState<KnockoutMatch[]>([]);
  const [final, setFinal] = useState<KnockoutMatch | null>(null);
  const [champion, setChampion] = useState<string | null>(null);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const teamById = useCallback(
    (id: string | null): Team | undefined =>
      id ? BASE_TEAMS.find((t) => t.id === id) : undefined,
    []
  );

  const toggleTeam = (id: string) => {
    setChosen((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < TOTAL_TEAMS_NEEDED
          ? [...prev, id]
          : prev
    );
  };

  const startTournament = () => {
    if (chosen.length !== TOTAL_TEAMS_NEEDED) return;
    const half = TOTAL_TEAMS_NEEDED / 2;
    const ga = chosen.slice(0, half);
    const gb = chosen.slice(half);
    setGroupA(ga);
    setGroupB(gb);
    setMatchesA(generateGroupMatches(ga, "A"));
    setMatchesB(generateGroupMatches(gb, "B"));
    setStep("groups");
  };

  const setGroupResult = (
    group: "A" | "B",
    matchId: string,
    result: "home" | "away" | "draw"
  ) => {
    const setter = group === "A" ? setMatchesA : setMatchesB;
    setter((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, result } : m))
    );
  };

  const groupADone = matchesA.every((m) => m.result !== null);
  const groupBDone = matchesB.every((m) => m.result !== null);
  const allGroupsDone = groupADone && groupBDone;

  const advanceToSemis = () => {
    const standA = calcStandings(groupA, matchesA);
    const standB = calcStandings(groupB, matchesB);
    const a1 = standA[0].teamId;
    const a2 = standA[1].teamId;
    const b1 = standB[0].teamId;
    const b2 = standB[1].teamId;

    setSemis([
      { id: "sf1", label: "Semi-Final 1", homeId: a1, awayId: b2, winnerId: null },
      { id: "sf2", label: "Semi-Final 2", homeId: b1, awayId: a2, winnerId: null },
    ]);
    setFinal({ id: "final", label: "🏆 Final", homeId: null, awayId: null, winnerId: null });
    setStep("semis");
  };

  const pickSemiWinner = (matchId: string, winnerId: string) => {
    setSemis((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, winnerId } : m))
    );
  };

  const semisDone = semis.length === 2 && semis.every((s) => s.winnerId !== null);

  const advanceToFinal = () => {
    const [sf1, sf2] = semis;
    setFinal({
      id: "final",
      label: "🏆 Final",
      homeId: sf1.winnerId,
      awayId: sf2.winnerId,
      winnerId: null,
    });
    setStep("final");
  };

  const pickFinalWinner = (winnerId: string) => {
    setFinal((prev) => prev && { ...prev, winnerId });
    setChampion(winnerId);
    setStep("champion");
  };

  const reset = () => {
    setStep("setup");
    setMode(null);
    setIsSimulating(false);
    setShowRoadToGlory(false);
    setChosen([]);
    setGroupA([]);
    setGroupB([]);
    setMatchesA([]);
    setMatchesB([]);
    setSemis([]);
    setFinal(null);
    setChampion(null);
  };

  // ── Auto Simulation ──────────────────────────────────────────────────────

  const runAutoSimulation = () => {
    setIsSimulating(true);

    // Step 1: Pick 8 random teams (shuffle + slice)
    const shuffled = [...BASE_TEAMS].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, TOTAL_TEAMS_NEEDED).map((t) => t.id);
    const half = TOTAL_TEAMS_NEEDED / 2;
    const ga = picked.slice(0, half);
    const gb = picked.slice(half);

    // Step 2: Simulate all group matches
    const simMatchesA = generateGroupMatches(ga, "A").map((m) => ({
      ...m,
      result: simulateMatch(m.homeId, m.awayId),
    }));
    const simMatchesB = generateGroupMatches(gb, "B").map((m) => ({
      ...m,
      result: simulateMatch(m.homeId, m.awayId),
    }));

    // Step 3: Determine qualifiers
    const standA = calcStandings(ga, simMatchesA as GroupMatch[]);
    const standB = calcStandings(gb, simMatchesB as GroupMatch[]);
    const a1 = standA[0].teamId;
    const a2 = standA[1].teamId;
    const b1 = standB[0].teamId;
    const b2 = standB[1].teamId;

    // Step 4: Simulate semis
    const sf1Winner = simulateKnockout(a1, b2);
    const sf2Winner = simulateKnockout(b1, a2);

    // Step 5: Simulate final
    const finalWinner = simulateKnockout(sf1Winner, sf2Winner);

    // Reveal after a brief dramatic delay
    setTimeout(() => {
      setChosen(picked);
      setGroupA(ga);
      setGroupB(gb);
      setMatchesA(simMatchesA as GroupMatch[]);
      setMatchesB(simMatchesB as GroupMatch[]);
      setSemis([
        { id: "sf1", label: "Semi-Final 1", homeId: a1, awayId: b2, winnerId: sf1Winner },
        { id: "sf2", label: "Semi-Final 2", homeId: b1, awayId: a2, winnerId: sf2Winner },
      ]);
      setFinal({
        id: "final",
        label: "🏆 Final",
        homeId: sf1Winner,
        awayId: sf2Winner,
        winnerId: finalWinner,
      });
      setChampion(finalWinner);
      setIsSimulating(false);
      setStep("champion");
    }, 2800);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const STEPS: { key: Step; label: string }[] = [
    { key: "setup", label: "Setup" },
    { key: "groups", label: "Groups" },
    { key: "semis", label: "Semi-Finals" },
    { key: "final", label: "Final" },
    { key: "champion", label: "Champion" },
  ];
  const stepIdx = STEPS.findIndex((s) => s.key === step);

  return (
    <section className="bg-background px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/predictor"
          className="mb-6 inline-block text-sm text-foreground-muted hover:text-foreground transition-colors"
        >
          ← All predictors
        </Link>
        {/* ── Header ── */}
        <div className="text-center mb-10 animate-fade-in-up">
          <span className="text-6xl mb-4 block">🏆</span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-2">
            World Cup{" "}
            <span className="bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
              Predictor
            </span>
          </h1>
          <p className="text-foreground-muted text-lg">
            Pick your teams, play the groups, and crown your champion.
          </p>
        </div>

        {/* ── Step Progress Bar ── */}
        <div className="flex items-center justify-center mb-12 gap-0">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${i < stepIdx
                  ? "bg-accent text-white scale-110"
                  : i === stepIdx
                    ? "bg-success text-white ring-4 ring-success/30 scale-125"
                    : "bg-border text-foreground-muted"
                  }`}
              >
                {i < stepIdx ? "✓" : i + 1}
              </div>
              <span
                className={`hidden sm:block ml-2 text-sm font-medium transition-colors duration-200 ${i === stepIdx ? "text-foreground" : "text-foreground-muted"
                  }`}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-8 sm:w-16 h-0.5 mx-2 transition-colors duration-300 ${i < stepIdx ? "bg-accent" : "bg-border"
                    }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Simulating Overlay ── */}
        {isSimulating && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm animate-fade-in">
            <div className="text-center">
              <div className="text-7xl mb-6 animate-float">🏆</div>
              <h2 className="text-2xl font-bold mb-3">Simulating Tournament…</h2>
              <p className="text-foreground-muted mb-8">Picking teams, playing groups, semis &amp; final…</p>
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-success animate-float"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 1: Setup ── */}
        {step === "setup" && (
          <div className="animate-fade-in-up space-y-6">

            {/* Mode selector */}
            {mode === null && (
              <div>
                <h2 className="text-2xl font-bold mb-1 text-center">Choose Your Mode</h2>
                <p className="text-foreground-muted text-sm mb-6 text-center">
                  Pick your teams and play manually, or let the simulator run the whole tournament instantly.
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Manual */}
                  <button
                    onClick={() => setMode("manual")}
                    className="card group cursor-pointer flex flex-col items-center gap-4 p-8 hover:border-accent transition-all duration-200 hover:scale-[1.02]"
                  >
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-200">✏️</span>
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-1">Manual Predictor</h3>
                      <p className="text-foreground-muted text-sm leading-relaxed">
                        Pick your 8 teams, play every group match, advance teams through the bracket, and crown your champion.
                      </p>
                    </div>
                    <span className="btn-secondary text-sm px-6 py-2 mt-2 pointer-events-none">
                      Select Teams →
                    </span>
                  </button>

                  {/* Auto */}
                  <button
                    onClick={() => { setMode("auto"); runAutoSimulation(); }}
                    className="card group cursor-pointer flex flex-col items-center gap-4 p-8 hover:border-info transition-all duration-200 hover:scale-[1.02] bg-gradient-to-br from-info/5 to-accent/5"
                  >
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-200">⚡</span>
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-1">Auto Simulator</h3>
                      <p className="text-foreground-muted text-sm leading-relaxed">
                        Let the engine pick random teams and simulate every match using team strength ratings to predict a winner instantly.
                      </p>
                    </div>
                    <span className="text-sm font-semibold px-6 py-2 mt-2 rounded-full bg-info/20 text-info border border-info/30 pointer-events-none">
                      ⚡ Simulate Now
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Manual team grid */}
            {mode === "manual" && (
              <div className="card p-6 mb-6">
                <h2 className="text-2xl font-bold mb-1">
                  Select 8 Teams
                </h2>
                <p className="text-foreground-muted text-sm mb-6">
                  Choose exactly 8 teams to compete. The first 4 you select go into{" "}
                  <span className="text-accent font-semibold">Group A</span>, the
                  next 4 into{" "}
                  <span className="text-info font-semibold">Group B</span>.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {BASE_TEAMS.map((team) => {
                    const idx = chosen.indexOf(team.id);
                    const selected = idx !== -1;
                    const group = selected
                      ? idx < 4
                        ? "A"
                        : "B"
                      : null;
                    const code = flagCodes[team.id] || "un";
                    const flagUrl = `https://flagcdn.com/w640/${code}.png`;
                    return (
                      <button
                        key={team.id}
                        onClick={() => toggleTeam(team.id)}
                        className={`relative flex flex-col items-center justify-center gap-1 p-5 rounded-2xl border-2 font-semibold transition-all duration-200 cursor-pointer select-none overflow-hidden h-28 ${selected
                          ? "border-accent bg-accent/15 scale-105 shadow-lg"
                          : "border-border bg-background-card hover:border-accent/50 hover:bg-accent/5"
                          } ${!selected && chosen.length >= TOTAL_TEAMS_NEEDED
                            ? "opacity-100 cursor-not-allowed"
                            : ""
                          }`}
                      >
                        {/* Background Flag Image */}
                        <div className="absolute inset-0 z-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={flagUrl}
                            alt={`${team.name} Flag`}
                            className="w-full h-full object-cover opacity-100"
                          />
                          {/* Gradient Overlay for text readability */}
                          <div className="absolute inset-0 bg-gradient-to-br from-background-card/10 via-background-card/75 to-background-card" />
                        </div>

                        {group && (
                          <span
                            className={`absolute top-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded-full z-10 ${group === "A"
                              ? "bg-accent text-white"
                              : "bg-info text-white"
                              }`}
                          >
                            {group}
                          </span>
                        )}

                        <div className="relative z-10 flex flex-col items-center justify-center">
                          <span className="text-3xl font-black tracking-wider text-foreground">
                            {team.flag}
                          </span>
                          <span className="text-xs text-foreground-muted font-semibold text-center mt-1">
                            {team.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-foreground-muted">
                    {chosen.length}/{TOTAL_TEAMS_NEEDED} teams selected
                  </p>
                  <button
                    onClick={startTournament}
                    disabled={chosen.length !== TOTAL_TEAMS_NEEDED}
                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Start Tournament →
                  </button>
                </div>
              </div>
            )} {/* end manual */}

            {/* Back to mode selector */}
            {mode === "manual" && (
              <div className="text-center">
                <button
                  onClick={() => { setMode(null); setChosen([]); }}
                  className="text-sm text-foreground-muted hover:text-foreground underline transition-colors"
                >
                  ← Back to mode selection
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: Groups ── */}
        {step === "groups" && (
          <div className="animate-fade-in-up space-y-8">
            {(["A", "B"] as const).map((grpKey) => {
              const grp = grpKey === "A" ? groupA : groupB;
              const matches = grpKey === "A" ? matchesA : matchesB;
              const standings = calcStandings(grp, matches);

              return (
                <div key={grpKey} className="card p-6">
                  <h2
                    className={`text-xl font-bold mb-5 flex items-center gap-2 ${grpKey === "A" ? "text-accent" : "text-info"
                      }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold ${grpKey === "A" ? "bg-accent" : "bg-info"
                        }`}
                    >
                      {grpKey}
                    </span>
                    Group {grpKey}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Fixtures */}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground-muted mb-3 uppercase tracking-wider">
                        Fixtures
                      </h3>
                      <div className="space-y-3">
                        {matches.map((m) => {
                          const home = teamById(m.homeId)!;
                          const away = teamById(m.awayId)!;
                          return (
                            <div
                              key={m.id}
                              className="rounded-xl border border-border-light bg-background-secondary p-3"
                            >
                              <div className="flex items-center gap-2">
                                {/* Home team */}
                                <button
                                  onClick={() =>
                                    setGroupResult(grpKey, m.id, "home")
                                  }
                                  className={`flex-1 flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-150 ${m.result === "home"
                                    ? "bg-success/20 ring-2 ring-success"
                                    : "hover:bg-accent/10"
                                    }`}
                                >
                                  <span className="text-xl">{home.flag}</span>
                                  <span className="text-sm font-semibold truncate">
                                    {home.name}
                                  </span>
                                </button>

                                {/* Draw */}
                                <button
                                  onClick={() =>
                                    setGroupResult(grpKey, m.id, "draw")
                                  }
                                  className={`text-xs font-bold px-2 py-1 rounded-lg border transition-all duration-150 ${m.result === "draw"
                                    ? "bg-warning/20 border-warning text-warning"
                                    : "border-border text-foreground-muted hover:border-warning hover:text-warning"
                                    }`}
                                >
                                  D
                                </button>

                                {/* Away team */}
                                <button
                                  onClick={() =>
                                    setGroupResult(grpKey, m.id, "away")
                                  }
                                  className={`flex-1 flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-150 flex-row-reverse ${m.result === "away"
                                    ? "bg-success/20 ring-2 ring-success"
                                    : "hover:bg-accent/10"
                                    }`}
                                >
                                  <span className="text-xl">{away.flag}</span>
                                  <span className="text-sm font-semibold truncate text-right">
                                    {away.name}
                                  </span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Standings */}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground-muted mb-3 uppercase tracking-wider">
                        Standings
                      </h3>
                      <div className="rounded-xl overflow-hidden border border-border-light">
                        <table className="w-full text-sm">
                          <thead className="bg-background-secondary text-foreground-muted">
                            <tr>
                              <th className="text-left px-3 py-2 font-semibold">
                                Team
                              </th>
                              <th className="px-2 py-2 font-semibold">P</th>
                              <th className="px-2 py-2 font-semibold">W</th>
                              <th className="px-2 py-2 font-semibold">D</th>
                              <th className="px-2 py-2 font-semibold">L</th>
                              <th className="px-2 py-2 font-semibold text-accent">
                                Pts
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {standings.map((s, i) => {
                              const team = teamById(s.teamId)!;
                              const isQualified = i < 2;
                              return (
                                <tr
                                  key={s.teamId}
                                  className={`border-t border-border-light transition-colors ${isQualified
                                    ? "bg-success/5"
                                    : "bg-background-card"
                                    }`}
                                >
                                  <td className="px-3 py-2 flex items-center gap-2">
                                    {isQualified && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
                                    )}
                                    <span>{team.flag}</span>
                                    <span className="font-medium">
                                      {team.name}
                                    </span>
                                  </td>
                                  <td className="text-center px-2 py-2 text-foreground-muted">
                                    {s.played}
                                  </td>
                                  <td className="text-center px-2 py-2 text-foreground-muted">
                                    {s.wins}
                                  </td>
                                  <td className="text-center px-2 py-2 text-foreground-muted">
                                    {s.draws}
                                  </td>
                                  <td className="text-center px-2 py-2 text-foreground-muted">
                                    {s.losses}
                                  </td>
                                  <td className="text-center px-2 py-2 font-bold text-accent">
                                    {s.pts}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-foreground-muted mt-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
                        Top 2 advance to semi-finals
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {allGroupsDone && (
              <div className="flex justify-center">
                <button
                  onClick={advanceToSemis}
                  className="btn-primary text-lg px-8 py-4 animate-pulse-glow"
                >
                  Advance to Semi-Finals →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 3: Semi-Finals ── */}
        {step === "semis" && (
          <div className="animate-fade-in-up">
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-2">Semi-Finals</h2>
              <p className="text-foreground-muted text-sm mb-8">
                Click the winning team in each match to advance them to the
                Final.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {semis.map((match) => {
                  const home = teamById(match.homeId);
                  const away = teamById(match.awayId);
                  return (
                    <div
                      key={match.id}
                      className="rounded-2xl border border-border bg-background-secondary p-5"
                    >
                      <p className="text-xs font-bold text-foreground-muted uppercase tracking-widest mb-4">
                        {match.label}
                      </p>
                      <div className="flex flex-col gap-3">
                        {[
                          { team: home, side: match.homeId! },
                          { team: away, side: match.awayId! },
                        ].map(({ team, side }) => {
                          if (!team) return null;
                          const code = flagCodes[team.id] || "un";
                          const flagUrl = `https://flagcdn.com/w640/${code}.png`;
                          return (
                            <button
                              key={side}
                              onClick={() => pickSemiWinner(match.id, side)}
                              disabled={!!match.winnerId}
                              className={`relative overflow-hidden flex items-center gap-4 rounded-xl p-4 border-2 transition-all duration-200 ${match.winnerId === side
                                ? "border-success bg-success/20 scale-105 shadow-lg"
                                : match.winnerId && match.winnerId !== side
                                  ? "border-border opacity-40"
                                  : "border-border hover:border-accent bg-background-card hover:bg-accent/5 cursor-pointer"
                                }`}
                            >
                              {/* Background Flag Image */}
                              <div className="absolute inset-0 z-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={flagUrl}
                                  alt={`${team.name} Flag`}
                                  className="w-full h-full object-cover opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-background-card/20 via-background-card/75 to-background-card" />
                              </div>

                              <div className="relative z-10 flex items-center gap-4 w-full">
                                <span className="text-3xl font-black tracking-wider text-foreground">
                                  {team.flag}
                                </span>
                                <div className="text-left">
                                  <p className="font-bold text-lg">{team.name}</p>
                                  {match.winnerId === side && (
                                    <p className="text-success text-sm font-semibold">
                                      ✓ Advances to Final
                                    </p>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {semisDone && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={advanceToFinal}
                    className="btn-primary text-lg px-8 py-4 animate-pulse-glow"
                  >
                    Go to The Final →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 4: Final ── */}
        {step === "final" && final && (
          <div className="animate-fade-in-up">
            <div className="card p-8 text-center">
              <p className="text-xs font-bold text-warning uppercase tracking-widest mb-2">
                World Cup Final
              </p>
              <h2 className="text-3xl font-bold mb-1">
                🏆 The Grand Final
              </h2>
              <p className="text-foreground-muted mb-10">
                One match. One champion. Who wins the World Cup?
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {[final.homeId, final.awayId].map((id) => {
                  const team = teamById(id ?? null);
                  if (!team) return null;
                  const code = flagCodes[team.id] || "un";
                  const flagUrl = `https://flagcdn.com/w640/${code}.png`;
                  return (
                    <button
                      key={team.id}
                      onClick={() => pickFinalWinner(team.id)}
                      className="relative overflow-hidden flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-border bg-background-secondary p-8 w-full sm:w-56 hover:border-accent hover:bg-accent/5 hover:scale-105 transition-all duration-200 cursor-pointer group"
                    >
                      {/* Background Flag Image */}
                      <div className="absolute inset-0 z-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={flagUrl}
                          alt={`${team.name} Flag`}
                          className="w-full h-full object-cover opacity-100 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background-card/10 via-background-card/75 to-background-card" />
                      </div>

                      <div className="relative z-10 flex flex-col items-center">
                        <span className="text-5xl font-black tracking-wider text-foreground mb-2 group-hover:scale-110 transition-transform duration-200">
                          {team.flag}
                        </span>
                        <span className="text-xl font-bold">{team.name}</span>
                        <span className="text-xs text-foreground-muted font-medium mt-1">
                          Tap to crown champion
                        </span>
                      </div>
                    </button>
                  );
                })}

                <div className="text-4xl font-black text-foreground-muted">
                  VS
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 5: Champion ── */}
        {step === "champion" && champion && (
          <div className="animate-scale-in text-center">
            <div className="relative overflow-hidden card p-10 bg-gradient-to-br from-success/5 via-accent/5 to-success/10 border-2 border-success">
              {/* Background Flag Image */}
              {(() => {
                const code = flagCodes[champion] || "un";
                const flagUrl = `https://flagcdn.com/w640/${code}.png`;
                return (
                  <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={flagUrl}
                      alt="Champion Flag"
                      className="w-full h-full object-cover opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-background-card/20 via-background-card/85 to-background-card" />
                  </div>
                );
              })()}

              <div className="relative z-10">
                {/* Trophy */}
                <div className="text-8xl mb-4 animate-float inline-block">🏆</div>

                {/* Champion team */}
                <div className="my-6">
                  <span className="text-7xl block mb-3 animate-float" style={{ animationDelay: "0.2s" }}>
                    {teamById(champion)?.flag}
                  </span>
                  <h2 className="text-4xl font-black mb-2">
                    {teamById(champion)?.name}
                  </h2>
                  <p className="text-xl text-foreground-muted font-semibold">
                    🎉 Your World Cup Champions! 🎉
                  </p>
                </div>

                {/* Confetti dots */}
                <div className="flex justify-center gap-1 my-4 flex-wrap">
                  {["🥇", "⭐", "🎊", "🎉", "🌟", "🏅", "🎆", "🎇"].map((e, i) => (
                    <span key={i} className="text-2xl animate-float" style={{ animationDelay: `${i * 0.1}s` }}>
                      {e}
                    </span>
                  ))}
                </div>

                {/* Road to Glory – expandable full tournament recap */}
                <div className="mt-8 text-left max-w-2xl mx-auto">
                  <button
                    onClick={() => setShowRoadToGlory((v) => !v)}
                    className="w-full flex items-center justify-between bg-background-secondary rounded-2xl px-5 py-4 hover:bg-border/30 transition-colors duration-200"
                  >
                    <span className="font-bold text-sm uppercase tracking-wider text-foreground-muted">🗺️ Road to Glory</span>
                    <span className="text-foreground-muted text-lg">{showRoadToGlory ? "▲" : "▼"}</span>
                  </button>

                  {showRoadToGlory && (
                    <div className="mt-3 space-y-4 animate-fade-in-up">

                      {/* Groups */}
                      {(["A", "B"] as const).map((grpKey) => {
                        const grp = grpKey === "A" ? groupA : groupB;
                        const matches = grpKey === "A" ? matchesA : matchesB;
                        const standings = calcStandings(grp, matches);
                        return (
                          <div key={grpKey} className="bg-background-secondary rounded-2xl p-5">
                            <h4 className={`font-bold text-sm uppercase tracking-wider mb-3 ${grpKey === "A" ? "text-accent" : "text-info"
                              }`}>
                              Group {grpKey}
                            </h4>

                            {/* Teams in group */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {grp.map((id) => {
                                const t = teamById(id);
                                return (
                                  <span key={id} className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-background-card border border-border-light">
                                    {t?.flag} {t?.name}
                                  </span>
                                );
                              })}
                            </div>

                            {/* Fixtures */}
                            <div className="space-y-1 mb-4">
                              {matches.map((m) => {
                                const home = teamById(m.homeId);
                                const away = teamById(m.awayId);
                                const resultLabel =
                                  m.result === "home" ? `${home?.name} wins` :
                                    m.result === "away" ? `${away?.name} wins` : "Draw";
                                const resultColor =
                                  m.result === "home" ? "text-success" :
                                    m.result === "away" ? "text-success" : "text-warning";
                                return (
                                  <div key={m.id} className="flex items-center justify-between text-xs rounded-lg bg-background-card px-3 py-2">
                                    <span className="text-foreground-muted">
                                      {home?.flag} {home?.name} vs {away?.flag} {away?.name}
                                    </span>
                                    <span className={`font-semibold ${resultColor}`}>{resultLabel}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Standings mini-table */}
                            <div className="rounded-xl overflow-hidden border border-border-light">
                              <table className="w-full text-xs">
                                <thead className="bg-background-card text-foreground-muted">
                                  <tr>
                                    <th className="text-left px-3 py-1.5 font-semibold">Team</th>
                                    <th className="px-2 py-1.5 font-semibold">P</th>
                                    <th className="px-2 py-1.5 font-semibold">W</th>
                                    <th className="px-2 py-1.5 font-semibold">D</th>
                                    <th className="px-2 py-1.5 font-semibold">L</th>
                                    <th className="px-2 py-1.5 font-semibold text-accent">Pts</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {standings.map((s, i) => {
                                    const t = teamById(s.teamId);
                                    const qualified = i < 2;
                                    const isChamp = s.teamId === champion;
                                    return (
                                      <tr key={s.teamId} className={`border-t border-border-light ${isChamp ? "bg-success/10" : qualified ? "bg-success/5" : "bg-background-secondary"
                                        }`}>
                                        <td className="px-3 py-1.5 flex items-center gap-1.5">
                                          {isChamp && <span className="text-warning">🏆</span>}
                                          {!isChamp && qualified && <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />}
                                          {t?.flag} {t?.name}
                                        </td>
                                        <td className="text-center px-2 py-1.5 text-foreground-muted">{s.played}</td>
                                        <td className="text-center px-2 py-1.5 text-foreground-muted">{s.wins}</td>
                                        <td className="text-center px-2 py-1.5 text-foreground-muted">{s.draws}</td>
                                        <td className="text-center px-2 py-1.5 text-foreground-muted">{s.losses}</td>
                                        <td className="text-center px-2 py-1.5 font-bold text-accent">{s.pts}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })}

                      {/* Semi-Finals */}
                      <div className="bg-background-secondary rounded-2xl p-5">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-foreground-muted mb-3">Semi-Finals</h4>
                        <div className="space-y-2">
                          {semis.map((m) => {
                            const home = teamById(m.homeId);
                            const away = teamById(m.awayId);
                            const winner = teamById(m.winnerId);
                            return (
                              <div key={m.id} className="flex items-center justify-between bg-background-card rounded-xl px-4 py-3 text-sm">
                                <div className="flex items-center gap-2 text-foreground-muted">
                                  <span>{home?.flag} {home?.name}</span>
                                  <span className="text-xs font-bold">vs</span>
                                  <span>{away?.flag} {away?.name}</span>
                                </div>
                                <span className="font-bold text-success flex items-center gap-1">
                                  ✓ {winner?.flag} {winner?.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Final */}
                      {final && (
                        <div className="bg-background-secondary rounded-2xl p-5 border border-warning/30">
                          <h4 className="font-bold text-sm uppercase tracking-wider text-warning mb-3">🏆 Final</h4>
                          <div className="flex items-center justify-between bg-background-card rounded-xl px-4 py-3 text-sm">
                            <div className="flex items-center gap-2 text-foreground-muted">
                              <span>{teamById(final.homeId)?.flag} {teamById(final.homeId)?.name}</span>
                              <span className="text-xs font-bold">vs</span>
                              <span>{teamById(final.awayId)?.flag} {teamById(final.awayId)?.name}</span>
                            </div>
                            <span className="font-bold text-warning flex items-center gap-1">
                              🏆 {teamById(champion)?.flag} {teamById(champion)?.name}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                  {mode === "auto" && (
                    <button
                      onClick={() => { reset(); setTimeout(() => { setMode("auto"); runAutoSimulation(); }, 50); }}
                      className="btn-secondary text-base px-8 py-3"
                    >
                      ⚡ Simulate Again
                    </button>
                  )}
                  <button
                    onClick={reset}
                    className="btn-primary text-base px-8 py-3"
                  >
                    🔄 Start a New Prediction
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
