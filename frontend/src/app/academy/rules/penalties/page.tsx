import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "Penalty Kicks Explained | Football Academy | TacticSensei",
  description:
    "Learn when penalty kicks are awarded, how they work, what happens in a penalty shootout, and the psychology behind taking and saving penalties. Includes England's famous penalty curse.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "How far is the penalty spot from the goal line?",
    options: ["7.32 metres", "9.15 metres", "11 metres", "16.5 metres"],
    correctIndex: 2,
    explanation:
      "The penalty spot is 11 metres (approximately 12 yards) from the goal line. This was established in 1891, chosen to give attackers a significant advantage while still requiring precision. The goalkeeper starts on the goal line until the ball is kicked.",
  },
  {
    question: "During a penalty kick, when can the goalkeeper move?",
    options: [
      "They cannot move until after the ball is kicked",
      "They can move sideways before the kick as long as they stay on the goal line",
      "They can charge forward as soon as the kicker begins their run-up",
      "They can move anywhere within the penalty area",
    ],
    correctIndex: 1,
    explanation:
      "The goalkeeper must remain on the goal line between the posts and face the kicker until the ball is kicked. They can move sideways along the goal line before the kick but cannot advance off the line. If they come off the line early and the kick is missed, the kick is usually retaken.",
  },
  {
    question: "In a penalty shootout, how many kicks does each team take to start?",
    options: ["3 kicks each", "5 kicks each", "10 kicks each", "Until one team misses"],
    correctIndex: 1,
    explanation:
      "Each team takes 5 penalty kicks in the initial round of a shootout. Different players must take each kick. If still level after 5 each, the shootout goes to sudden death — teams alternate kicks until one scores and the other misses.",
  },
  {
    question: "England won their first penalty shootout at a major tournament in which year?",
    options: ["1990", "1998", "2018 (Russia World Cup)", "2021 (Euro 2020)"],
    correctIndex: 2,
    explanation:
      "England won their first ever World Cup penalty shootout in 2018 against Colombia at the Russia World Cup. Before that, England had lost six consecutive major tournament shootouts — the most famous being the 1990 World Cup semi-final vs Germany, where Chris Waddle blazed his penalty over the bar.",
  },
  {
    question: "What is a 'Panenka penalty'?",
    options: [
      "A penalty taken by running up and then stopping",
      "A technique where the ball is chipped softly down the middle as the goalkeeper dives",
      "A penalty taken from a standing position with no run-up",
      "When two players alternate in taking the kick",
    ],
    correctIndex: 1,
    explanation:
      "The Panenka is named after Czech midfielder Antonín Panenka, who invented and debuted the technique in the Euro 1976 final against West Germany. Instead of hitting the ball hard to a corner, he gently chipped it down the centre as Sepp Maier dived to his right. It is one of football's greatest moments of audacity — and the most psychologically daring penalty technique.",
  },
];

export default function PenaltiesPage() {
  return (
    <LessonLayout
      moduleSlug="rules"
      lessonSlug="penalties"
      title="Penalty Kicks"
      description="The most dramatic moment in football — when a penalty is given and how shootouts work."
      readingTime={5}
      difficulty="beginner"
      emoji="🥅"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          A penalty kick is awarded when a player commits a direct free kick
          offence inside their own penalty area. The attacking team places the
          ball on the penalty spot (11 metres from goal) and takes a one-on-one
          shot against just the goalkeeper — one of the most thrilling moments
          in all of sport.
        </p>
      </div>

      <h2>Beginner Explanation</h2>
      <p>
        The penalty kick is football&apos;s ultimate individual moment. In a
        sport that is deeply team-oriented, everything suddenly narrows to one
        player, one goalkeeper, and one shot at goal. The pressure is
        immense — and the margin between glory and heartbreak is razor-thin.
      </p>

      <h3>When is a Penalty Awarded?</h3>
      <p>
        A penalty is awarded when a player commits any of the direct free kick
        offences <em>inside their own penalty area</em>. This includes:
      </p>
      <ul>
        <li>A defender tripping, pushing, or pulling an attacker in the box</li>
        <li>
          A player deliberately handling the ball inside the box (even the
          goalkeeper outside the six-yard box)
        </li>
        <li>
          A goalkeeper (or field player) fouling an attacker as they go for
          goal
        </li>
      </ul>
      <p>
        The location matters — the exact same foul one metre outside the box
        gets only a free kick. One metre inside? Penalty. This is why attackers
        and defenders battle so fiercely at the edge of the area.
      </p>

      <h3>Taking the Penalty</h3>
      <p>
        The nominated kicker places the ball on the penalty spot. All other
        players (including the goalkeeper&apos;s teammates) must be outside the
        penalty area and the penalty arc until the ball is kicked. The
        goalkeeper must stand on the goal line between the posts. On the
        referee&apos;s whistle, the kicker takes their shot. If the goalkeeper
        saves it or the ball hits the post and stays in play, any outfield player
        can challenge for the rebound.
      </p>

      <h2>Real Match Example</h2>
      <p>
        No nation in football has a more painful relationship with penalties
        than <strong>England</strong>. Between 1990 and 2016, England lost six
        consecutive penalty shootouts at major tournaments — an extraordinary
        record of heartbreak. The roll call of misses became legendary: Chris
        Waddle over the bar vs. Germany in 1990, Gareth Southgate&apos;s
        saved penalty vs. Germany in Euro 1996 (he later became England manager
        and led them to their first shootout win in 2018), David Batty vs.
        Argentina in 1998, and more.
      </p>
      <p>
        In <strong>2018 in Russia</strong>, England finally broke the curse,
        beating Colombia on penalties in the Round of 16, with Jordan Pickford
        saving from Carlos Bacca and Eric Dier converting the winning kick —
        sending an entire nation into delirious relief.
      </p>

      {/* Key Fact callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
          ⚡ Key Fact
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          Statistically, penalty kicks are scored about 75-80% of the time in
          competitive matches. Goalkeepers correctly guess the direction in about
          30% of kicks — but even when they guess right, the ball is often hit
          too well to save. The highest-pressure scenario? Penalty shootout
          sudden death in a World Cup final — which Argentina experienced in
          2022 against France.
        </p>
      </div>

      <h2>Advanced Breakdown</h2>

      <h3>The Psychology of Penalties</h3>
      <p>
        Research by sports psychologists has shown that{" "}
        <strong>where a kicker looks</strong> before taking a penalty is
        crucial. Experienced goalkeepers study opponents&apos; body language —
        specifically the plant foot angle and the kicker&apos;s eyes — to
        predict direction. Elite penalty takers like{" "}
        <strong>Cristiano Ronaldo</strong> deliberately delay their run-up,
        staring down the goalkeeper in a psychological battle. Ronaldo&apos;s
        famous stuttering run-up forces goalkeepers to commit early.
      </p>

      <h3>The Panenka Chip</h3>
      <p>
        Czech midfielder <strong>Antonín Panenka</strong> invented a legendary
        technique in the Euro 1976 final: instead of blasting to a corner, he
        gently chipped the ball softly down the middle, knowing the goalkeeper
        (West Germany&apos;s Sepp Maier) would dive. The audacity was stunning —
        it worked perfectly, and the technique carries his name. The ultimate
        show of nerve. Famous modern Panenkas include Zidane at the 2006 World
        Cup, Andrea Pirlo at Euro 2012, and Mohamed Salah in the 2023 Champions
        League.
      </p>

      <h3>Penalty Shootout Order Strategy</h3>
      <p>
        Research suggests that going <strong>first in a shootout</strong> gives
        a statistical advantage — the pressure is greater when you&apos;re
        trailing. Teams now carefully select their shooting order, placing their
        best penalty takers in positions 1 and 5 (the highest-pressure kicks).
        Some coaches, like Pep Guardiola, practice penalties extensively in
        training and even simulate crowd noise and pressure scenarios.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="Penalty Kicks" />
    </LessonLayout>
  );
}

