import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "How a Football Match Works | Football Academy | TacticSensei",
  description:
    "Learn the structure of a football match — the two halves, kick-off rules, goal kicks, throw-ins, corner kicks, injury time, and extra time. Perfect for beginners.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "How long is a standard football match (excluding stoppage time)?",
    options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"],
    correctIndex: 1,
    explanation:
      "A standard football match consists of two 45-minute halves, totalling 90 minutes. Additional time (stoppage/injury time) is added by the referee on top of this.",
  },
  {
    question: "How long is the half-time break in professional football?",
    options: ["5 minutes", "10 minutes", "15 minutes", "20 minutes"],
    correctIndex: 2,
    explanation:
      "The half-time interval is a maximum of 15 minutes. Players use this time to rest, receive tactical instructions, and recover.",
  },
  {
    question: "Who takes the kick-off at the start of the second half?",
    options: [
      "The team that kicked off in the first half",
      "The team that conceded the last goal",
      "The team that did NOT kick off in the first half",
      "The home team always kicks off",
    ],
    correctIndex: 2,
    explanation:
      "The team that did not take the kick-off at the start of the match takes it at the beginning of the second half. After a goal is scored, the team that conceded always restarts with a kick-off.",
  },
  {
    question: "When is a corner kick awarded?",
    options: [
      "When the ball goes out over the side line",
      "When a defending player last touches the ball before it crosses their own goal line",
      "When a goalkeeper catches the ball outside the box",
      "When a player is offside near the corner flag",
    ],
    correctIndex: 1,
    explanation:
      "A corner kick is awarded when the ball wholly crosses the goal line (not between the posts) and was last touched by a defending player. The attacking team then takes the kick from the nearest corner arc.",
  },
  {
    question:
      "In the 2022 World Cup Final, how long did Argentina vs France last before Argentina won?",
    options: [
      "90 minutes (full time)",
      "After extra time (120 minutes) + penalty shootout",
      "After 30 minutes of extra time only",
      "The match was abandoned after 90 minutes",
    ],
    correctIndex: 1,
    explanation:
      "The 2022 World Cup Final between Argentina and France ended 3-3 after extra time. Argentina won 4-2 on penalty kicks — one of the greatest finals ever played, spanning the full 120 minutes plus penalties.",
  },
];

export default function HowAMatchWorksPage() {
  return (
    <LessonLayout
      moduleSlug="rules"
      lessonSlug="how-a-match-works"
      title="How a Football Match Works"
      description="Understand the structure of a match — from kick-off to the final whistle."
      readingTime={4}
      difficulty="beginner"
      emoji="⚽"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          A football match is 90 minutes long, split into two halves of 45
          minutes each. Two teams of 11 players try to score more goals than the
          other. The team with the most goals at the final whistle wins.
        </p>
      </div>

      <h2>Beginner Explanation</h2>
      <p>
        Football has a beautifully simple structure that makes it easy to follow
        once you know the basics. Let&apos;s walk through a match from start to
        finish.
      </p>

      <h3>The Coin Toss</h3>
      <p>
        Before the match begins, the two team captains meet the referee at the
        centre circle. The referee flips a coin — the winner gets to choose
        which goal their team attacks in the first half, or they can choose to
        take the kick-off. The team not choosing gets the other option.
      </p>

      <h3>Kick-Off</h3>
      <p>
        The match starts with a <strong>kick-off</strong> from the centre spot.
        All players must be in their own half when the ball is first played.
        After a goal is scored, the team that conceded always restarts with a
        kick-off. The ball must move forward on a kick-off (it can be played
        backward immediately after, but the first touch must go forward or
        sideways).
      </p>

      <h3>The Two Halves</h3>
      <p>
        Each half lasts 45 minutes. Teams switch ends at half-time so neither
        team has an unfair advantage from wind, slope, or sun direction for the
        entire match. The half-time break is up to 15 minutes, giving players
        time to rest and coaches to deliver tactical instructions.
      </p>

      <h3>Restarts: How Play Resumes</h3>
      <ul>
        <li>
          <strong>Throw-in:</strong> When the ball fully crosses a sideline, the
          team that did <em>not</em> touch it last restarts play with a
          two-handed throw from behind the head. Both feet must stay on or
          behind the touchline.
        </li>
        <li>
          <strong>Goal kick:</strong> When an attacking player last touches the
          ball before it crosses the goal line (not between the posts), the
          defending team restarts from anywhere inside the penalty area.
        </li>
        <li>
          <strong>Corner kick:</strong> When a <em>defending</em> player last
          touches the ball before it crosses their own goal line, the attacking
          team restarts from the corner arc nearest to where it went out.
        </li>
        <li>
          <strong>Drop ball:</strong> Used to restart play after a temporary
          stoppage (e.g., a player needed medical attention) — the referee drops
          the ball and play resumes.
        </li>
      </ul>

      <h2>Real Match Example</h2>
      <p>
        The <strong>2022 FIFA World Cup Final</strong> between Argentina 🇦🇷 and
        France 🇫🇷 is the perfect illustration of how a match can evolve through
        its structure.
      </p>
      <p>
        At half-time, Argentina led 2-0 and everything seemed over. But France
        mounted a stunning comeback in the second half, scoring twice in two
        minutes through Kylian Mbappé to level at 2-2 in the 80th minute.
        After 90 minutes: 2-2.
      </p>
      <p>
        The match went to <strong>extra time</strong> — two additional
        15-minute periods (making it 120 minutes total). Lionel Messi scored in
        extra time to make it 3-2, but Mbappé completed his hat-trick to make
        it 3-3. Still level after 120 minutes, it went to a{" "}
        <strong>penalty shootout</strong>, which Argentina won 4-2 — a final
        for the ages.
      </p>

      {/* Key Fact callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
          ⚡ Key Fact
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          Injury time (also called stoppage time) is added at the end of each
          half to compensate for time lost to substitutions, injuries, VAR
          checks, and goal celebrations. It&apos;s decided by the 4th official
          and displayed on a board at the side of the pitch. In modern football,
          5-10 minutes has become common at major tournaments.
        </p>
      </div>

      <h2>Advanced Breakdown</h2>
      <p>
        Understanding match time helps you follow the game more intelligently.
      </p>

      <h3>Extra Time vs. Injury Time</h3>
      <p>
        These two terms confuse many beginners. <strong>Injury time</strong>{" "}
        (stoppage time) is added after 45 and 90 minutes, and every match has
        it. <strong>Extra time</strong> only happens in knockout competitions
        when the match is tied after 90 minutes — it&apos;s an additional 30
        minutes (2 × 15) to find a winner.
      </p>

      <h3>The "Golden Goal" Rule (Historical)</h3>
      <p>
        From 1993 to 2004, FIFA experimented with the "golden goal" — the first
        goal scored in extra time would immediately end the match. It was
        scrapped because teams played ultra-defensively in extra time, afraid to
        concede. Today, both periods of extra time are always played in full
        before a shootout.
      </p>

      <h3>Substitutions</h3>
      <p>
        In modern professional football, teams are allowed{" "}
        <strong>5 substitutions</strong> per match (increased from 3 in 2020).
        Substitutions can only happen during a break in play and must be
        confirmed with the 4th official. A substituted player cannot return to
        the field.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="How a Football Match Works" />
    </LessonLayout>
  );
}

