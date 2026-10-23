import Link from "next/link";

interface PredictorHeaderProps {
  name: string;
  format: string;
  season: string;
  icon: string;
}

export default function PredictorHeader({ name, format, season, icon }: PredictorHeaderProps) {
  return (
    <>
      <Link
        href="/predictor"
        className="mb-6 inline-block text-sm text-foreground-muted transition-colors hover:text-foreground"
      >
        ← All predictors
      </Link>
      <header className="mb-10 text-center animate-fade-in-up">
        <span className="mb-4 block text-6xl" aria-hidden>{icon}</span>
        <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
          {name}{" "}
          <span className="bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">Predictor</span>
        </h1>
        <p className="text-lg text-foreground-muted">
          {format} · Season {season}
        </p>
      </header>
    </>
  );
}
