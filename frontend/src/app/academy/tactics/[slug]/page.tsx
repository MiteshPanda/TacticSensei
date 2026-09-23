import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sparkles, ShieldCheck } from "lucide-react";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz from "@/components/academy/LessonQuiz";
import { tacticsData } from "@/data/academy/tactics";
import { curriculum } from "@/data/academy/curriculum";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(tacticsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = tacticsData[slug];
  if (!data) return {};

  return {
    title: `${data.title} | Football Academy | TacticSensei`,
    description: data.description,
  };
}

const difficultyWeights = {
  beginner: 4,
  intermediate: 5,
  advanced: 6,
};

export default async function TacticDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = tacticsData[slug];

  if (!data) {
    notFound();
  }

  const curriculumModule = curriculum.find((m) => m.slug === "tactics");
  const curriculumLesson = curriculumModule?.lessons.find((l) => l.slug === data.slug);
  const emoji = data.emoji || curriculumLesson?.emoji || "🧠";

  const firstQuestionExplanation = data.quizQuestions[0]?.explanation ?? "";
  const readingTime = data.quizQuestions.length > 0 
    ? (difficultyWeights[firstQuestionExplanation.length > 100 ? "advanced" : "intermediate"] || 5) 
    : 5;

  return (
    <LessonLayout
      moduleSlug="tactics"
      lessonSlug={data.slug}
      title={data.title}
      description={data.description}
      readingTime={readingTime}
      difficulty={firstQuestionExplanation.length > 120 ? "advanced" : "intermediate"}
      emoji={emoji}
    >
      {/* Simple terms callout */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10 animate-fade-in">
        <h2 className="mb-2 text-lg font-bold text-accent flex items-center gap-1.5">
          <Sparkles className="h-5 w-5 text-accent animate-pulse" />
          In Simple Terms
        </h2>
        <p className="text-foreground leading-relaxed">{data.introduction}</p>
      </div>

      {/* Key tactical elements */}
      <div className="not-prose mb-8 rounded-2xl border border-border-light bg-background-card p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground-muted mb-4 flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-accent" /> Key Pillars of Success
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {data.keyElements.map((el) => (
            <span key={el} className="rounded-xl bg-background-secondary border border-border-light px-3.5 py-1.5 text-xs font-semibold text-foreground-secondary">
              🔑 {el}
            </span>
          ))}
        </div>
      </div>

      {/* Main content sections */}
      <div className="space-y-6 mb-8">
        {data.sections.map((section, idx) => (
          <div key={idx} className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>{section.heading}</h2>
            <p className="leading-relaxed text-foreground-secondary">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Image Reference block */}
      <div className="not-prose my-8 rounded-xl border border-border-light bg-background-card/40 p-4 text-xs font-mono text-foreground-muted truncate">
        Asset Reference URL: {data.image}
      </div>

      {/* Lesson Quiz */}
      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={data.quizQuestions} lessonTitle={data.title} />
    </LessonLayout>
  );
}
