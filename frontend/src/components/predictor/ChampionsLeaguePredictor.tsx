"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { clubs } from "@/data/predictor/clubs";
import { championsLeague as competition } from "@/data/predictor/competitions";
import {
  playGroupStage,
  playRound,
  simulateTournament,
  summariseTournament,
  type UclGroupStage,
} from "@/lib/predictor/championsLeague";
import { mulberry32, type Rng } from "@/lib/predictor/rng";
import { clubFixtures } from "@/lib/predictor/uclDraw";
import {
  pairingsFor,
  ROUND_LABELS,
  ROUND_ORDER,
  type KnockoutTie as Tie,
  type RoundResults,
} from "@/lib/predictor/uclKnockouts";
import Bracket from "./Bracket";
import ClubBadge from "./ClubBadge";
import KnockoutTie, { tieScoreText } from "./KnockoutTie";
import LeagueTable from "./LeagueTable";
import PredictorHeader from "./PredictorHeader";
import ResultsList from "./ResultsList";
import RevealOverlay from "./RevealOverlay";
import { newSeed } from "./seed";
import StepProgress from "./StepProgress";
import { CrestNotice, panel, SectionHeading, SeedNote } from "./ui";

type Mode = "full" | "rounds";

const STEPS = [
  { key: "draw", label: "Draw" },
  { key: "league", label: "League phase" },
  ...ROUND_ORDER.map((r) => ({ key: r, label: r === "playoff" ? "Play-off" : ROUND_LABELS[r] })),
  { key: "champion", label: "Champion" },
];
const FIRST_KO = 2;
const CHAMPION = STEPS.length - 1;
const REVEAL_MS = 1600;

interface RunState {
  seed: number;
  mode: Mode;
  stage: UclGroupStage;
  rounds: RoundResults;
}

const sortedClubIds = [...competition.clubIds].sort((a, b) => clubs[a].name.localeCompare(clubs[b].name));

function ClubSelect({ value, onChange, label }: { value: string; onChange: (id: string) => void; label: string }) {
  const id = useId();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label htmlFor={id} className="text-sm text-foreground-muted">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border border-border bg-background-card px-4 py-1.5 text-sm font-semibold focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-ring!"
      >
        {sortedClubIds.map((cid) => (
          <option key={cid} value={cid}>{clubs[cid].name}</option>
        ))}
      </select>
    </div>
  );
}

export default function ChampionsLeaguePredictor() {
  const reduceMotion = useReducedMotion();
  const [run, setRun] = useState<RunState | null>(null);
  const [view, setView] = useState(0);
  const [reachable, setReachable] = useState(0);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [focusClub, setFocusClub] = useState(sortedClubIds[0]);
  const [revealing, setRevealing] = useState(false);
  const rng = useRef<Rng | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const goTo = (index: number) => {
    setView(index);
    requestAnimationFrame(() => contentRef.current?.focus({ preventScroll: true }));
  };

  const start = (mode: Mode) => {
    const seed = newSeed();
    const r = mulberry32(seed);
    rng.current = r;
    setPicks({});
    if (mode === "full") {
      const t = simulateTournament(r, competition, clubs);
      const show = () => {
        setRun({ seed, mode, stage: t, rounds: t.rounds });
        setReachable(CHAMPION);
        setRevealing(false);
        goTo(CHAMPION);
      };
      if (reduceMotion) return show();
      setRevealing(true);
      timer.current = setTimeout(show, REVEAL_MS);
    } else {
      setRun({ seed, mode, stage: playGroupStage(r, competition, clubs), rounds: {} });
      setReachable(FIRST_KO);
      goTo(0);
    }
  };

  const confirmRound = (index: number) => {
    if (!run || !rng.current) return;
    const round = ROUND_ORDER[index - FIRST_KO];
    const ties = playRound(rng.current, round, run.stage, run.rounds, clubs, picks);
    setRun({ ...run, rounds: { ...run.rounds, [round]: ties } });
    setPicks({});
    setReachable(index + 1);
  };

  const summary = useMemo(
    () => (run?.rounds.final ? summariseTournament({ ...run.stage, rounds: run.rounds }) : null),
    [run]
  );

  return (
    <section className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <PredictorHeader name={competition.name} format={competition.format} season={competition.season} icon="⭐" />

        {revealing && (
          <RevealOverlay
            title="Simulating the Champions League…"
            steps={["Drawing the league phase…", "Playing 144 league-phase matches…", "Playing the knockouts…", "Crowning a champion…"]}
            durationMs={REVEAL_MS}
          />
        )}

        {!run ? (
          <ModePicker onPick={start} disabled={revealing} />
        ) : (
          <>
            <StepProgress steps={STEPS} current={view} reachable={reachable} onSelect={goTo} />
            <div ref={contentRef} tabIndex={-1} className="outline-none animate-fade-in-up" key={view}>
              {view === 0 && (
                <DrawScreen stage={run.stage} focusClub={focusClub} setFocusClub={setFocusClub} />
              )}
              {view === 1 && (
                <LeaguePhaseScreen stage={run.stage} focusClub={focusClub} setFocusClub={setFocusClub} />
              )}
              {view >= FIRST_KO && view < CHAMPION && (
                <RoundScreen
                  index={view}
                  run={run}
                  picks={picks}
                  onPick={(tieId, winnerId) => setPicks((p) => ({ ...p, [tieId]: winnerId }))}
                  onConfirm={() => confirmRound(view)}
                />
              )}
              {view === CHAMPION && summary && <ChampionScreen summary={summary} rounds={run.rounds} />}

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {view < CHAMPION && view < reachable && (
                  <button type="button" className="btn-primary" onClick={() => goTo(view + 1)}>
                    Next: {STEPS[view + 1].label} →
                  </button>
                )}
                {view === CHAMPION && (
                  <button type="button" className="btn-primary" onClick={() => start(run.mode)} disabled={revealing}>
                    ⚡ Simulate again
                  </button>
                )}
                <button type="button" className="btn-secondary" onClick={() => setRun(null)}>
                  Change mode
                </button>
              </div>
            </div>
            <SeedNote seed={run.seed} />
          </>
        )}

        <CrestNotice />
      </div>
    </section>
  );
}

function ModePicker({ onPick, disabled }: { onPick: (m: Mode) => void; disabled: boolean }) {
  return (
    <div className="animate-fade-in-up">
      <h2 className="mb-1 text-center text-2xl! font-bold">Choose your mode</h2>
      <p className="mb-6 text-center text-sm text-foreground-muted">
        The real 2026/27 format: a 36-club league phase, then two-legged knockouts and a one-off final.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onPick("full")}
          className="card group flex cursor-pointer flex-col items-center gap-4 bg-gradient-to-br from-info/5 to-accent/5 p-8 text-center"
        >
          <span className="text-5xl transition-transform duration-200 group-hover:scale-110" aria-hidden>⚡</span>
          <span className="text-xl font-bold">Simulate full tournament</span>
          <span className="text-sm leading-relaxed text-foreground-muted">
            Draw, league phase, every knockout round and the final, in one click.
          </span>
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onPick("rounds")}
          className="card group flex cursor-pointer flex-col items-center gap-4 p-8 text-center"
        >
          <span className="text-5xl transition-transform duration-200 group-hover:scale-110" aria-hidden>✏️</span>
          <span className="text-xl font-bold">Round by round</span>
          <span className="text-sm leading-relaxed text-foreground-muted">
            The draw and league phase play out automatically. Then pick each tie&apos;s winner yourself, or simulate the round.
          </span>
        </button>
      </div>
    </div>
  );
}

interface FocusProps {
  stage: UclGroupStage;
  focusClub: string;
  setFocusClub: (id: string) => void;
}

function DrawScreen({ stage, focusClub, setFocusClub }: FocusProps) {
  const fixtures = clubFixtures(stage.draw, focusClub);
  return (
    <div className="space-y-8">
      <section className={`${panel} p-4 sm:p-6`}>
        <SectionHeading>Pots</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stage.draw.pots.map((pot, p) => (
            <div key={p}>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-foreground-muted">Pot {p + 1}</p>
              <ul className="space-y-1.5">
                {pot.map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => setFocusClub(id)}
                      aria-pressed={id === focusClub}
                      className={`flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left text-sm transition-colors ${
                        id === focusClub ? "bg-accent/15 font-semibold" : "hover:bg-background-secondary"
                      }`}
                    >
                      <ClubBadge club={clubs[id]} size={24} decorative />
                      <span className="truncate">{clubs[id].name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={`${panel} p-4 sm:p-6`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <SectionHeading>League-phase opponents</SectionHeading>
          <ClubSelect value={focusClub} onChange={setFocusClub} label="Club" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fixtures.map((f) => (
            <div key={f.pot} className="rounded-xl bg-background-secondary p-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-foreground-muted">Pot {f.pot + 1}</p>
              {[
                { label: "Home v", id: f.homeVs },
                { label: "Away at", id: f.awayAt },
              ].map(({ label, id }) => (
                <div key={label} className="flex items-center gap-3 py-1">
                  <span className="w-16 shrink-0 text-xs text-foreground-muted">{label}</span>
                  <ClubBadge club={clubs[id]} size={40} decorative />
                  <span className="truncate text-sm font-semibold">{clubs[id].name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function LeaguePhaseScreen({ stage, focusClub, setFocusClub }: FocusProps) {
  const results = stage.results.filter((m) => m.homeId === focusClub || m.awayId === focusClub);
  return (
    <div className="space-y-8">
      <LeagueTable
        rows={stage.table}
        clubs={clubs}
        zones={competition.zones}
        showForm={false}
        caption="Champions League 2026/27 league-phase table"
      />
      <section className={`${panel} p-4 sm:p-6`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <SectionHeading>Club results</SectionHeading>
          <ClubSelect value={focusClub} onChange={setFocusClub} label="Club" />
        </div>
        <ResultsList matches={results} clubs={clubs} />
      </section>
    </div>
  );
}

interface RoundScreenProps {
  index: number;
  run: RunState;
  picks: Record<string, string>;
  onPick: (tieId: string, winnerId: string) => void;
  onConfirm: () => void;
}

function RoundScreen({ index, run, picks, onPick, onConfirm }: RoundScreenProps) {
  const round = ROUND_ORDER[index - FIRST_KO];
  const played = run.rounds[round];
  const pairings = played ?? pairingsFor(round, run.stage.knockoutDraw, run.rounds);
  const allPicked = pairings.every((p) => picks[p.id]);
  return (
    <section className={`${panel} p-4 sm:p-6`}>
      <SectionHeading>{ROUND_LABELS[round]}</SectionHeading>
      {!played && (
        <p className="-mt-2 mb-5 text-sm text-foreground-muted">
          Click a club to pick it to win the tie, or simulate the round. Ties you don&apos;t pick are simulated.
        </p>
      )}
      <div className={`grid gap-4 ${round === "final" ? "mx-auto max-w-md" : "md:grid-cols-2"}`}>
        {pairings.map((p) => (
          <KnockoutTie
            key={p.id}
            pairing={p}
            clubs={clubs}
            tie={played?.find((t) => t.id === p.id)}
            pick={picks[p.id]}
            onPick={played ? undefined : (w) => onPick(p.id, w)}
          />
        ))}
      </div>
      {!played && (
        <div className="mt-6 flex justify-center">
          <button type="button" className="btn-primary" onClick={onConfirm}>
            {allPicked ? "Confirm picks" : "Simulate round"}
          </button>
        </div>
      )}
    </section>
  );
}

function ChampionScreen({ summary, rounds }: { summary: ReturnType<typeof summariseTournament>; rounds: RoundResults }) {
  const champion = clubs[summary.championId];
  const finalTie: Tie = summary.final;
  const finalText = finalTie.picked
    ? "Your pick"
    : `${clubs[summary.championId].shortName} ${tieScoreText(finalTie)} ${clubs[summary.runnerUpId].shortName}`;
  const big = summary.biggestWin;
  const stats = [
    { label: "Runner-up", value: clubs[summary.runnerUpId].name },
    { label: "Final", value: finalText },
    { label: "League-phase winner", value: clubs[summary.leaguePhaseWinnerId].name },
    {
      label: "Biggest win",
      value: big ? `${clubs[big.homeId].shortName} ${big.homeGoals}–${big.awayGoals} ${clubs[big.awayId].shortName} · ${big.label}` : "—",
    },
    { label: "Top-scoring club", value: `${clubs[summary.topScorer.clubId].name} · ${summary.topScorer.goals} goals` },
  ];

  return (
    <div className="space-y-8">
      <section className={`${panel} relative overflow-hidden border-2 border-success p-8 text-center`}>
        <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-accent/5 to-warning/10" aria-hidden />
        <div className="relative">
          <div className="mb-4 flex justify-center">
            <ClubBadge club={champion} size={128} decorative />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Champions League winners {competition.season}</p>
          <p className="mt-1 text-4xl font-black">{champion.name}</p>
          <dl className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-background-card/80 px-4 py-3">
                <dt className="text-xs uppercase tracking-wider text-foreground-muted">{s.label}</dt>
                <dd className="mt-1 text-sm font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`${panel} p-4 sm:p-6`}>
        <SectionHeading>Road to the final</SectionHeading>
        <ol className="divide-y divide-border-light">
          {summary.road.map((tie) => {
            const oppId = tie.highId === summary.championId ? tie.lowId : tie.highId;
            return (
              <li key={tie.id} className="flex flex-wrap items-center gap-3 py-2.5 text-sm">
                <span className="w-32 shrink-0 text-xs font-bold uppercase tracking-wider text-foreground-muted">
                  {ROUND_LABELS[tie.round]}
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="text-foreground-muted">v</span>
                  <ClubBadge club={clubs[oppId]} size={24} decorative />
                  <span className="truncate font-medium">{clubs[oppId].name}</span>
                </span>
                <span className="font-semibold tabular-nums">{tieScoreText(tie, summary.championId)}</span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className={`${panel} p-4 sm:p-6`}>
        <SectionHeading>Bracket</SectionHeading>
        <Bracket rounds={rounds} clubs={clubs} />
      </section>
    </div>
  );
}
