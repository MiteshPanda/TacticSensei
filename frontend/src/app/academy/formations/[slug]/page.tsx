import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, X, ShieldAlert } from "lucide-react";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz from "@/components/academy/LessonQuiz";
import FormationDiagram from "@/components/academy/FormationDiagram";
import { formationsData } from "@/data/academy/formationsData";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(formationsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = formationsData[slug];
  if (!data) return {};

  return {
    title: `${data.title} | Football Academy | TacticSensei`,
    description: data.description,
  };
}

export default async function FormationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = formationsData[slug];

  if (!data) {
    notFound();
  }

  return (
    <LessonLayout
      moduleSlug="formations"
      lessonSlug={data.slug}
      title={data.title}
      description={data.description}
      readingTime={5}
      difficulty="intermediate"
      emoji={data.slug.startsWith("3") ? "📐" : data.slug.startsWith("5") ? "🧱" : "🔷"}
    >
      <div className="grid gap-6 lg:grid-cols-3 not-prose mb-8">
        {/* SVG Pitch Visualizer */}
        <div className="lg:col-span-2">
          <FormationDiagram formation={data.slug} />
        </div>

        {/* Static Image Reference Fallback */}
        <div className="rounded-2xl border border-border-light bg-background-card p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-foreground mb-1">Visual Reference</h4>
            <p className="text-xs text-foreground-muted mb-4">Static diagram file path asset reference.</p>
            <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden border border-border-light bg-black/5 flex items-center justify-center text-3xl">
              ⚽
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-foreground-muted truncate max-w-[90%]">
                {data.image}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border-light text-[11px] text-foreground-muted flex items-start gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
            <span>Interactive SVG pitch shown on the left. Image assets resolve from `public{data.image}`.</span>
          </div>
        </div>
      </div>

      {/* Simple explanation */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground leading-relaxed">{data.introduction}</p>
      </div>

      {/* Pros & Cons */}
      <div className="grid gap-6 sm:grid-cols-2 not-prose mb-8">
        <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 dark:bg-green-950/10">
          <h3 className="mb-4 text-base font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
            <Check className="h-5 w-5" /> Advantages
          </h3>
          <ul className="space-y-2.5">
            {data.pros.map((pro, i) => (
              <li key={i} className="text-sm text-foreground-secondary flex items-start gap-2">
                <span className="text-green-500 font-bold shrink-0 mt-0.5">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 dark:bg-red-950/10">
          <h3 className="mb-4 text-base font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
            <X className="h-5 w-5" /> Disadvantages
          </h3>
          <ul className="space-y-2.5">
            {data.cons.map((con, i) => (
              <li key={i} className="text-sm text-foreground-secondary flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed sections */}
      <div className="space-y-6 mb-8">
        {data.sections.map((section, idx) => (
          <div key={idx}>
            <h2>{section.heading}</h2>
            <p className="leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Historical Context */}
      <div>
        <h2>Historical Context</h2>
        <p className="leading-relaxed">{data.historicalContext}</p>
      </div>

      {/* Key Attributes callout */}
      <div className="not-prose my-8 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
          ⚡ Key Success Factors
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.keyAttributes.map((attr) => (
            <span key={attr} className="rounded-md bg-background px-2.5 py-1 text-xs font-medium text-foreground-muted border border-border-light">
              {attr}
            </span>
          ))}
        </div>
      </div>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={data.quizQuestions} lessonTitle={data.title} />
    </LessonLayout>
  );
}
