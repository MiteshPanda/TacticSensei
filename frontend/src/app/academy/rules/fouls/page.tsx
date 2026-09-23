import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "Fouls & Free Kicks | Football Academy | TacticSensei",
  description:
    "Learn what counts as a foul in football — dangerous tackles, handballs, pushing, direct vs indirect free kicks, and the advantage rule. Clear beginner guide.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which of the following results in a DIRECT free kick?",
    options: [
      "A goalkeeper picking up the ball from a deliberate back-pass",
      "A dangerous tackle where a player trips an opponent",
      "A player impeding an opponent without contact",
      "Dissent toward the referee",
    ],
    correctIndex: 1,
    explanation:
      "A dangerous tackle that trips an opponent is a direct free kick offense. Direct free kicks are awarded for physical offenses like kicking, tripping, pushing, charging, striking, holding, or spitting at an opponent, plus deliberate handball.",
  },
  {
    question: "What is the 'advantage rule' in football?",
    options: [
      "The home team gets an extra substitution",
      "The referee lets play continue despite a foul if stopping it would benefit the fouling team",
      "The team with more players always wins a foul decision",
      "Goals scored in extra time count double",
    ],
    correctIndex: 1,
    explanation:
      "The advantage rule allows the referee to wave play on after a foul if the fouled team retains possession and is in a better position than if play stopped. The referee signals by extending both arms forward and shouting 'play on' or 'advantage'. The referee can still caution or send off the offending player at the next stoppage.",
  },
  {
    question: "A player handles the ball accidentally. What happens?",
    options: [
      "Always a direct free kick",
      "Always a penalty if inside the box",
      "It depends — accidental handball is not always an offence",
      "An indirect free kick",
    ],
    correctIndex: 2,
    explanation:
      "Handball is only an offence if the player deliberately handles the ball, or if the ball hits an arm or hand that is in an 'unnatural position' making the body bigger. Pure accidental handball (like a ball deflecting onto a player's arm from close range) is generally not penalised, though handball laws are complex and frequently debated.",
  },
  {
    question: "An indirect free kick is awarded. What must happen for a goal to count?",
    options: [
      "The ball must go directly into the net",
      "The ball must be touched by at least one other player before entering the goal",
      "The kicker must take a run-up of at least 5 metres",
      "The goalkeeper must have moved off the goal line",
    ],
    correctIndex: 1,
    explanation:
      "For a goal to be scored directly from an indirect free kick, the ball must first touch another player (teammate or opponent). If it goes straight into the net without a touch, it is not a goal — the restart is a goal kick for the opposition.",
  },
  {
    question: "Where is a direct free kick taken from if a foul occurs inside the penalty area?",
    options: [
      "From the edge of the penalty area",
      "From the centre circle",
      "It becomes a penalty kick from the penalty spot",
      "From the nearest corner flag",
    ],
    correctIndex: 2,
    explanation:
      "If a player commits a direct free kick offense inside their own penalty area, the attacking team is awarded a penalty kick — taken from the penalty spot (11 metres from goal). This is one of football's most dramatic moments.",
  },
];

export default function FoulsPage() {
  return (
    <LessonLayout
      moduleSlug="rules"
      lessonSlug="fouls"
      title="Fouls & Misconduct"
      description="What counts as a foul, when free kicks are given, and how the advantage rule works."
      readingTime={4}
      difficulty="beginner"
      emoji="🚨"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          A foul is any illegal action against another player — like a reckless
          tackle, pushing, or deliberately handling the ball. When a foul
          happens, the game stops and the other team gets a free kick (or a
          penalty if it happens inside the box).
        </p>
      </div>

      <h2>Beginner Explanation</h2>
      <p>
        Football is a physical sport, and players inevitably bump into each
        other. The Laws of the Game distinguish between normal physical contact
        and illegal actions — the latter are called <strong>fouls</strong>.
        Understanding what constitutes a foul helps you appreciate referee
        decisions and the flow of the game.
      </p>

      <h3>Direct Free Kick Offences</h3>
      <p>
        These are the most serious physical offences. Committing any of the
        following gives the opposing team a{" "}
        <strong>direct free kick</strong> (they can shoot directly at goal):
      </p>
      <ul>
        <li>
          <strong>Kicking or attempting to kick</strong> an opponent
        </li>
        <li>
          <strong>Tripping or attempting to trip</strong> an opponent (sliding
          tackle that misses the ball)
        </li>
        <li>
          <strong>Jumping at</strong> an opponent in a dangerous manner
        </li>
        <li>
          <strong>Charging</strong> an opponent (shoulder charge not playing
          the ball)
        </li>
        <li>
          <strong>Striking or attempting to strike</strong> an opponent
        </li>
        <li>
          <strong>Pushing</strong> an opponent
        </li>
        <li>
          <strong>Holding</strong> an opponent (grabbing a shirt, arm, or leg)
        </li>
        <li>
          <strong>Spitting at</strong> an opponent (automatic red card)
        </li>
        <li>
          <strong>Biting</strong> an opponent (automatic red card)
        </li>
        <li>
          <strong>Deliberate handball</strong> (touching the ball with arm or
          hand intentionally)
        </li>
      </ul>

      <h3>Indirect Free Kick Offences</h3>
      <p>
        These offences give the opposing team an indirect free kick — the ball
        must touch another player before a goal can be scored:
      </p>
      <ul>
        <li>
          Goalkeeper picking up a deliberate <strong>back-pass</strong> with
          their hands
        </li>
        <li>
          Goalkeeper holding the ball for <strong>more than 6 seconds</strong>
        </li>
        <li>
          <strong>Impeding an opponent&apos;s progress</strong> without contact
          (blocking their path without playing the ball)
        </li>
        <li>Playing in a <strong>dangerous manner</strong> (e.g., high kick near a player&apos;s face)</li>
      </ul>

      <h2>Real Match Example</h2>
      <p>
        During the <strong>2010 World Cup</strong>, Uruguay&apos;s Luis Suárez
        became infamous for a deliberate handball on the goal line in the dying
        seconds of the quarter-final against Ghana. It was a clear, intentional
        handball — he used his hand like a goalkeeper to stop a certain goal.
        The referee immediately showed Suárez a red card (automatic for
        deliberate handball denying a goal-scoring opportunity) and awarded
        Ghana a penalty. Asamoah Gyan struck the penalty off the crossbar, and
        Uruguay went on to win on penalties — a hugely controversial moment that
        illustrated how a foul can change football history.
      </p>

      {/* Key Fact callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
          ⚡ Key Fact
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          The &quot;professional foul&quot; — deliberately fouling a player to
          prevent an obvious goal-scoring opportunity — carries an automatic red
          card. This rule was introduced in 1990 after the infamous tackle by
          Argentina&apos;s Roberto Sensini on Roger Milla in the World Cup,
          before the law had been properly codified.
        </p>
      </div>

      <h2>Advanced Breakdown</h2>

      <h3>The Advantage Rule</h3>
      <p>
        One of the most nuanced referee decisions is applying the{" "}
        <strong>advantage</strong>. If a foul occurs but the fouled team retains
        the ball in a good position, the referee can wave play on by extending
        both arms forward — signalling that stopping for a free kick would
        actually benefit the fouling team. If the advantage doesn&apos;t
        materialise within a few seconds, the referee can bring play back for
        the original free kick. Critically, the referee can still caution or
        send off the player who fouled at the next stoppage.
      </p>

      <h3>Reckless vs Excessive Force</h3>
      <p>
        Referees assess tackles on a spectrum. A <strong>careless</strong> foul
        (no yellow card) is simply illegal but not deliberate. A{" "}
        <strong>reckless</strong> foul (yellow card) shows disregard for the
        opponent&apos;s safety. A foul using{" "}
        <strong>excessive force or brutality</strong> (red card) endangers the
        opponent&apos;s safety and is punished most severely.
      </p>

      <h3>Handball — Football's Most Complex Rule</h3>
      <p>
        Handball has become increasingly controversial since 2019. Under current
        laws, handball is an offence if the hand or arm is in an &quot;unnatural
        position&quot; that makes the body bigger — even if the player
        didn&apos;t intend it. However, a handball that immediately leads to a
        goal by the same player is always an offence. UEFA and FIFA continue to
        refine this law after widespread criticism.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="Fouls & Misconduct" />
    </LessonLayout>
  );
}

