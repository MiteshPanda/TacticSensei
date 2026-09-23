import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "Yellow & Red Cards | Football Academy | TacticSensei",
  description:
    "Learn how yellow and red cards work in football — what offences earn each card, the two-yellow rule, straight reds, accumulation bans, and the most famous red cards in history.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "What happens when a player receives two yellow cards in the same match?",
    options: [
      "They get a warning and stay on the pitch",
      "They receive a red card and must leave the pitch",
      "Their team plays with 10 men for 5 minutes",
      "The opposing team gets a penalty kick",
    ],
    correctIndex: 1,
    explanation:
      "Two yellow cards in the same match automatically result in a red card. The player is immediately sent off and their team must play the rest of the match with 10 players. The yellow card 'accumulates' to a red — so the player is shown the yellow card first, then the red card.",
  },
  {
    question: "Which of the following is NOT a straight red card offence?",
    options: [
      "Violent conduct (punching an opponent)",
      "Spitting at an opponent",
      "Deliberate simulation (diving)",
      "Denying a clear goal-scoring opportunity with a foul",
    ],
    correctIndex: 2,
    explanation:
      "Simulation (diving) earns a yellow card for unsporting behaviour, not a red card. Straight red card offences include violent conduct, serious foul play, spitting, biting, deliberate handball denying a goal, offensive language, and a second yellow card.",
  },
  {
    question: "Zinedine Zidane's infamous headbutt in the 2006 World Cup Final was against which player?",
    options: [
      "Fabio Cannavaro",
      "Marco Materazzi",
      "Gianluigi Buffon",
      "Francesco Totti",
    ],
    correctIndex: 1,
    explanation:
      "In the 2006 World Cup Final between France and Italy, Zinedine Zidane headbutted Italian defender Marco Materazzi in the chest. Materazzi had allegedly provoked Zidane with an insult about his family. Zidane received a straight red card in his final professional match — one of football's most dramatic moments.",
  },
  {
    question: "In the Premier League, how many yellow cards must a player accumulate before receiving a one-match suspension?",
    options: [
      "3 yellow cards",
      "5 yellow cards",
      "7 yellow cards",
      "10 yellow cards",
    ],
    correctIndex: 1,
    explanation:
      "In the Premier League, players receive an automatic one-match ban after accumulating 5 yellow cards in the first 19 league games. The threshold then rises to 10 yellows after 32 games. Other competitions have their own thresholds.",
  },
  {
    question: "If a player is sent off in the first minute of a match, how many players does their team have for the rest of the game?",
    options: ["10 players", "9 players", "11 players (substitute allowed)", "10 players but they can add one back after 30 minutes"],
    correctIndex: 0,
    explanation:
      "Once a player is sent off, their team plays with 10 players for the remainder of the match with no ability to replace them. Substitutes can only replace players who are on the pitch — you cannot 'use' a substitute to offset a red card.",
  },
];

export default function CardsPage() {
  return (
    <LessonLayout
      moduleSlug="rules"
      lessonSlug="cards"
      title="Yellow & Red Cards"
      description="From cautions to dismissals — understand what cards mean and when they're given."
      readingTime={4}
      difficulty="beginner"
      emoji="🟨"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          A <strong>yellow card</strong> is a formal warning. Get two in one
          match and you&apos;re automatically sent off. A{" "}
          <strong>red card</strong> means immediate dismissal — your team plays
          with 10 players for the rest of the match. Cards are used to manage
          player behaviour and keep the game safe.
        </p>
      </div>

      <h2>Beginner Explanation</h2>
      <p>
        Football referees have three tools to discipline players: the spoken
        warning, the yellow card, and the red card. Cards were actually
        introduced after a communication breakdown — at the 1966 World Cup,
        referee Ken Aston couldn&apos;t make himself understood to players who
        didn&apos;t speak English. He invented the card system, inspired by
        traffic lights, which became official in 1970.
      </p>

      <h3>The Yellow Card (Caution)</h3>
      <p>
        A yellow card is an official caution. Referees show it for:
      </p>
      <ul>
        <li>Unsporting behaviour (diving, simulation, time-wasting)</li>
        <li>Persistent infringement of the Laws (repeated fouls)</li>
        <li>Dissent — arguing aggressively with the referee</li>
        <li>Delaying the restart of play</li>
        <li>Failure to respect the required distance at a free kick or corner</li>
        <li>Entering or leaving the field without the referee&apos;s permission</li>
      </ul>
      <p>
        Two yellow cards in the same match = <strong>automatic red card</strong>.
        The referee shows the second yellow, then the red — it&apos;s a two-step
        process.
      </p>

      <h3>The Red Card (Dismissal)</h3>
      <p>
        A straight red card means immediate dismissal for:
      </p>
      <ul>
        <li>
          <strong>Serious foul play</strong> — a reckless tackle endangering
          the opponent (e.g., two-footed lunge with excessive force)
        </li>
        <li>
          <strong>Violent conduct</strong> — punching, elbowing, kicking an
          opponent off the ball
        </li>
        <li>
          <strong>Spitting or biting</strong> at anyone
        </li>
        <li>
          <strong>Denying an obvious goal-scoring opportunity</strong> (DOGSO)
          with a deliberate handball or foul
        </li>
        <li>
          <strong>Offensive, insulting, or abusive language/gestures</strong>
        </li>
        <li>
          <strong>A second yellow card</strong> in the same match
        </li>
      </ul>

      <h3>After the Red Card</h3>
      <p>
        The sent-off player must leave the technical area entirely. Their team
        cannot replace them — the remaining 10 players must finish the match.
        If a goalkeeper is sent off and all three substitutes have been used,
        an outfield player must go in goal.
      </p>

      <h2>Real Match Example</h2>
      <p>
        The most famous red card in football history came in the{" "}
        <strong>2006 FIFA World Cup Final</strong> between France and Italy.
        In extra time, with the score at 1-1, French legend{" "}
        <strong>Zinedine Zidane</strong> — playing his final professional match
        — headbutted Italian defender <strong>Marco Materazzi</strong> in the
        chest after a verbal altercation. The referee consulted with the fourth
        official (who had seen the incident on a monitor) and showed Zidane a
        straight red card.
      </p>
      <p>
        Zidane walked off the pitch past the World Cup trophy, without looking
        at it. Italy won on penalties. It remains one of the most shocking
        endings to any player&apos;s career — but also a reminder that even
        the greatest players are subject to the laws of the game.
      </p>

      {/* Key Fact callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
          ⚡ Key Fact
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          The fastest red card in professional football history was shown after
          just 2 seconds — David Pratt for Chippenham Town in 2008, after he
          kicked an opponent immediately after the kick-off. In the Premier
          League, the quickest red was Keith Gillespie in 2007 (12 seconds) for
          violent conduct just after coming on as a substitute.
        </p>
      </div>

      <h2>Advanced Breakdown</h2>

      <h3>Card Accumulation & Suspension Thresholds</h3>
      <p>
        Yellow cards don&apos;t just matter within a single match — they
        accumulate over the course of a competition. In the{" "}
        <strong>Premier League</strong>:
      </p>
      <ul>
        <li>5 yellow cards before Gameweek 19 = 1-match ban</li>
        <li>10 yellow cards before Gameweek 32 = 2-match ban</li>
        <li>15 yellow cards = 3-match ban</li>
      </ul>
      <p>
        Yellow cards are typically reset at certain points in the season. In
        major tournaments (Champions League, World Cup), yellow card tallies
        reset after the group stage, so a player with one yellow doesn&apos;t
        carry it into the knockout rounds.
      </p>

      <h3>The &quot;Clever Yellow&quot; Strategy</h3>
      <p>
        Some coaches and players deliberately &quot;take&quot; a yellow card to
        reset their tally before a suspension threshold resets. For example, a
        player on 4 yellow cards before the threshold resets might foul
        deliberately in a low-stakes match to receive their 5th yellow (and a
        1-match ban), clearing their slate before a major game. Controversial
        but legal.
      </p>

      <h3>VAR and Cards</h3>
      <p>
        VAR can review incidents where the referee missed violent conduct or
        showed the wrong player a card. It can upgrade a yellow to a red but
        cannot downgrade a red to a yellow in real-time. Referees can also use
        the pitchside monitor (on-field review) to reassess card decisions
        themselves.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="Yellow & Red Cards" />
    </LessonLayout>
  );
}

