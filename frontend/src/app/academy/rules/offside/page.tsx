import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "The Offside Rule Explained | Football Academy | TacticSensei",
  description:
    "Understand the offside rule in football — what it means, when it applies, active involvement, VAR offside decisions, and famous offside controversies. Beginner-friendly guide.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question:
      "A player is in an offside position. When are they NOT penalised?",
    options: [
      "If they are standing still",
      "If they are in their own half",
      "If they are not actively involved in play",
      "If the goalkeeper is off the line",
    ],
    correctIndex: 2,
    explanation:
      "Being in an offside position is not automatically an offense. A player is only penalised if they are actively involved in play — meaning they play or touch the ball, interfere with an opponent, or gain an advantage from being in that position.",
  },
  {
    question:
      "Which body part is used to determine if a player is in an offside position?",
    options: [
      "Their feet only",
      "Any part of the body except the arms and hands",
      "Their entire body including arms",
      "Their head only",
    ],
    correctIndex: 1,
    explanation:
      "Any part of the body that can legally play the ball (excluding arms and hands) is used to judge offside. This is why VAR can show millimetre-level differences — a shoulder or armpit can be offside even if the feet are level.",
  },
  {
    question:
      "The moment that determines if a player is offside is when:",
    options: [
      "The player receives the ball",
      "The ball crosses the goal line",
      "The ball is played or touched by a teammate",
      "The referee blows the whistle",
    ],
    correctIndex: 2,
    explanation:
      "Offside is judged at the exact moment the ball is played (kicked or headed) by a teammate — NOT when the player receives it. A player can run from an onside position after the ball is played and still be fine.",
  },
  {
    question: "How many outfield opponents must an attacker be level with or closer to their own goal line to be onside?",
    options: [
      "At least one (the goalkeeper)",
      "At least two (usually the goalkeeper + one defender)",
      "Three",
      "They just need to be in their own half",
    ],
    correctIndex: 1,
    explanation:
      "A player is onside if they are level with or behind at least two opponents (including the goalkeeper) at the moment the ball is played. In practice, this is usually the goalkeeper plus the last outfield defender.",
  },
  {
    question: "In which situation is it IMPOSSIBLE to be offside?",
    options: [
      "During a corner kick",
      "During a goal kick",
      "During a throw-in",
      "All of the above",
    ],
    correctIndex: 3,
    explanation:
      "A player cannot be offside directly from a goal kick, throw-in, or corner kick. These are set-piece exceptions written into the Laws of the Game (Law 11). After the ball is played from these restarts, normal offside rules apply.",
  },
];

export default function OffsidePage() {
  return (
    <LessonLayout
      moduleSlug="rules"
      lessonSlug="offside"
      title="The Offside Rule"
      description="Football's most debated rule — explained clearly, once and for all."
      readingTime={5}
      difficulty="beginner"
      emoji="🚩"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          You are offside if you are closer to the opponent&apos;s goal line
          than both the ball AND the second-to-last defender (usually the last
          outfield defender) at the exact moment a teammate plays the ball to
          you. Being offside is only an offence if you then get involved in
          play.
        </p>
      </div>

      <h2>Beginner Explanation</h2>
      <p>
        The offside rule exists to stop attackers from simply standing next to
        the goalkeeper and waiting for the ball to be lobbed over. It forces
        teams to build attacks through skill and movement, making the game far
        more interesting.
      </p>

      <h3>The Two-Defender Rule</h3>
      <p>
        At the moment your teammate kicks or heads the ball toward you, you must
        have at least <strong>two opponents</strong> between you and the goal
        line (or be level with them). In practice, the goalkeeper counts as one,
        so you typically just need to be level with or behind the last outfield
        defender.
      </p>

      <h3>Timing is Everything</h3>
      <p>
        The key moment is <em>when the ball is played</em>, not when you
        receive it. You could start your run from an onside position, sprint
        past the defenders, and receive the ball while clearly ahead of
        everyone — and it would still be perfectly legal, because you were
        onside when your teammate kicked it.
      </p>

      <h3>Active Involvement</h3>
      <p>
        Simply being in an offside position is not automatically penalised.
        Under the Laws of the Game (Law 11), you are only penalised if you are
        &quot;actively involved&quot; — which means:
      </p>
      <ul>
        <li>You play or touch the ball</li>
        <li>
          You interfere with an opponent (e.g., blocking their view of the
          ball)
        </li>
        <li>
          You gain an advantage from your position (e.g., a rebound comes to
          you from the crossbar)
        </li>
      </ul>

      <h3>When Offside Cannot Happen</h3>
      <p>
        You cannot be called offside directly from a <strong>goal kick</strong>,{" "}
        <strong>corner kick</strong>, or <strong>throw-in</strong>. These are
        the three exceptions written into the Laws. After one of these restarts,
        normal offside rules apply for any subsequent play.
      </p>

      <h2>Real Match Example</h2>
      <p>
        One of football&apos;s most notorious offside controversies came in the{" "}
        <strong>2005 Champions League semi-final</strong> between Liverpool and
        Juventus. Luis García scored what became known as the &quot;Ghost
        Goal&quot; — the ball barely crossed the line, and Juventus players were
        furious about an offside call that was waved off. Liverpool won and went
        on to famously beat AC Milan in Istanbul.
      </p>
      <p>
        More recently, VAR technology has allowed officials to draw virtual
        lines across freeze-frames of the exact moment the ball is played,
        leading to goals being disallowed by fractions of a centimetre — like
        when <strong>Ivan Toney</strong> had a goal ruled out by a millimetre in
        the Premier League, with the line drawn through his armpit.
      </p>

      {/* Key Fact callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
          ⚡ Key Fact
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          The offside rule was introduced in 1863 with the founding of the
          Football Association. Originally, you had to have three opponents
          between you and the goal. It was changed to two in 1925, which
          immediately led to an explosion in goals scored — from around 2.5 to
          over 3.5 goals per game on average.
        </p>
      </div>

      <h2>Advanced Breakdown</h2>
      <p>
        Modern football has refined how offside is judged, especially with the
        introduction of VAR (Video Assistant Referee).
      </p>

      <h3>Semi-Automated Offside (SAOT)</h3>
      <p>
        At the 2022 World Cup, FIFA introduced{" "}
        <strong>Semi-Automated Offside Technology</strong> (SAOT). Using
        multiple cameras and player tracking data (up to 29 data points per
        player body), the system can automatically freeze the moment the ball is
        played and generate a 3D render showing the exact offside line — usually
        within 25 seconds. This dramatically reduced the time fans spent waiting
        for VAR decisions.
      </p>

      <h3>The Armpit Controversy</h3>
      <p>
        The law states offside is judged on &quot;any part of the body that can
        play the ball&quot; — and this includes the shoulder and armpit but
        excludes the arm. This led to bizarre situations where a player&apos;s
        armpit was millimetres ahead of a defender&apos;s shoulder, disallowing
        a perfectly good-looking goal. Many fans and pundits argued this makes
        the law too literal, defeating its original spirit of preventing obvious
        cheating.
      </p>

      <h3>Offside Trap</h3>
      <p>
        Defenders use the &quot;offside trap&quot; deliberately — they step
        forward together at the moment the ball is played, catching attackers in
        an offside position. Arsenal&apos;s back four under George Graham in the
        1990s became famous for executing it perfectly. The risk? If the timing
        is even slightly off, the attacker is through on goal with only the
        goalkeeper to beat.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="The Offside Rule" />
    </LessonLayout>
  );
}

