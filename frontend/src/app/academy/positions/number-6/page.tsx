import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "The Number 6 — Defensive Midfielder | Football Academy | TacticSensei",
  description:
    "Deep dive into the No.6 — the defensive midfielder who anchors every great team. The Makélélé role explained. Famous examples: Claude Makélélé, Sergio Busquets, Casemiro, N'Golo Kanté.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "Why is the defensive midfield position often called the 'Makélélé role'?",
    options: [
      "Because Makélélé invented the position from scratch in the 1990s",
      "Because Claude Makélélé performed the role so effectively at Real Madrid and Chelsea that his departure exposed exactly how vital it was",
      "Because Makélélé scored the most goals from a defensive midfield position",
      "Because 'makélélé' is a French football term for intercepting passes",
    ],
    correctIndex: 1,
    explanation:
      "When Makélélé left Real Madrid in 2003, the team struggled despite buying Beckham and Zidane. Zidane himself said 'Why put another layer of gold paint on the Bentley when you are losing the engine?' — exposing how irreplaceable Makélélé's unseen work had been.",
  },
  {
    question: "What is the primary defensive function of a No.6 (holding midfielder)?",
    options: [
      "Delivering long passes into the opposition penalty area",
      "Sitting in front of the back four to intercept attacks and protect the defence",
      "Pressing the opposition goalkeeper when they have the ball",
      "Tracking opposition wingers across the full width of the pitch",
    ],
    correctIndex: 1,
    explanation:
      "The No.6's core function is to sit in front of the defensive line, intercepting attacks before they reach the back four. This 'screening' role provides the platform from which more attacking players can function freely.",
  },
  {
    question: "Sergio Busquets played as the No.6 in which historically dominant club side?",
    options: [
      "Real Madrid under José Mourinho",
      "Barcelona under Pep Guardiola",
      "Bayern Munich under Jupp Heynckes",
      "Chelsea under Carlo Ancelotti",
    ],
    correctIndex: 1,
    explanation:
      "Sergio Busquets was the linchpin of Pep Guardiola's Barcelona, arguably the most dominant club side ever. Guardiola famously said: 'Watch the game, then watch Busquets' — his positional brilliance made everything around him work.",
  },
  {
    question: "Which quality makes Casemiro different from a 'pure' Makélélé-style holding midfielder?",
    options: [
      "Casemiro plays much higher up the pitch and acts as a second striker",
      "Casemiro combines elite defensive work with significant goal-scoring from midfield — particularly from headers and long range",
      "Casemiro exclusively plays short passes and never takes risks in possession",
      "Casemiro presses the opposition's goalkeeper as a primary role",
    ],
    correctIndex: 1,
    explanation:
      "While Casemiro is an elite destroyer and ball-winner, he's also a genuine goal threat — scoring headers from set pieces, long-range drives, and late runs into the box. This makes him more complete than a pure holding midfielder.",
  },
  {
    question: "Why does N'Golo Kanté sometimes challenge the 'pure No.6' label?",
    options: [
      "Because he prefers to play as a centre-back",
      "Because he has too much attacking ambition and often drifts far forward",
      "Because his box-to-box energy, interceptions across large areas, and dynamic press mean he defies strict positional categories",
      "Because he primarily delivers set pieces from wide positions",
    ],
    correctIndex: 2,
    explanation:
      "Kanté has been described as a No.6 and a No.8 by different managers. His unique quality is covering vast amounts of ground — intercepting, pressing, and supporting play across the whole midfield — making him too dynamic for a single label.",
  },
];

export default function Number6Page() {
  return (
    <LessonLayout
      moduleSlug="positions"
      lessonSlug="number-6"
      title="The Number 6"
      description="The defensive midfielder — the invisible engine who sits in front of the defence and makes great teams function."
      readingTime={5}
      difficulty="intermediate"
      emoji="6️⃣"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          The No.6 — also called the defensive midfielder, holding midfielder, or anchor man — is the
          player who sits in front of the back four and acts as a shield. Their job is to{" "}
          <strong>break up attacks before they become dangerous</strong>, win the ball back, and
          distribute it to teammates who can then build from a secure foundation. They rarely appear in
          highlight reels, but the best teams cannot function without them.
        </p>
      </div>

      <h2>What Does the No.6 Do?</h2>
      <p>
        The holding midfielder fills the space between midfield and defence — a zone that, if left
        unguarded, is one of football&apos;s most dangerous. Opposition number 10s love to operate in
        this area, receiving the ball and turning to attack. The No.6&apos;s job is to eliminate that
        space and deny the opposition time to play.
      </p>
      <p>
        In possession, the No.6 is rarely spectacular. They typically take the simple pass, recycle
        possession, and allow more creative players to take risks further forward. But this simplicity
        is deceptive — receiving under pressure, turning quickly, and always finding the right option
        requires exceptional technical quality and football intelligence.
      </p>

      {/* Key Skills */}
      <div className="not-prose my-6 rounded-xl border border-blue-400/30 bg-blue-50/50 p-5 dark:bg-blue-900/10">
        <p className="mb-3 text-sm font-bold text-blue-700 dark:text-blue-400">6️⃣ Key Skills Required</p>
        <ul className="space-y-1">
          <li className="text-sm text-foreground-muted">• <strong>Interceptions</strong> — Reading the game to cut out passes before they reach the target</li>
          <li className="text-sm text-foreground-muted">• <strong>Tackling</strong> — Winning the ball cleanly in duels without conceding fouls in dangerous areas</li>
          <li className="text-sm text-foreground-muted">• <strong>Positioning</strong> — Staying in the right zone to plug gaps in the defensive structure</li>
          <li className="text-sm text-foreground-muted">• <strong>Composure</strong> — Receiving under pressure and playing simple, accurate passes</li>
          <li className="text-sm text-foreground-muted">• <strong>Discipline</strong> — Resisting the urge to join attacks and maintaining their defensive shape</li>
          <li className="text-sm text-foreground-muted">• <strong>Physicality</strong> — Strength in duels and stamina to cover enormous distances defensively</li>
        </ul>
      </div>

      <h2>The Makélélé Role — Football&apos;s Most Misunderstood Job</h2>
      <p>
        The &quot;Makélélé role&quot; is named after <strong>Claude Makélélé</strong>, the French
        midfielder who played for Real Madrid and Chelsea in the late 1990s and 2000s. Makélélé was
        not especially fast, didn&apos;t score many goals, and rarely made headlines. But he was
        doing something that very few people could do as well: providing absolute defensive security
        that allowed Zidane, Ronaldo, Figo, and Raúl to attack without thinking about what they
        were leaving behind.
      </p>

      {/* The famous quote callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="mb-2 text-sm font-bold text-amber-700 dark:text-amber-400">💬 Zinedine Zidane on Makélélé</p>
        <p className="text-sm text-foreground-muted italic">
          &quot;Why put another layer of gold paint on the Bentley when you are losing the engine?&quot;
          — Zidane&apos;s response when Real Madrid sold Makélélé and bought Beckham in 2003. Real Madrid
          promptly went five years without a La Liga title.
        </p>
      </div>

      <p>
        When Makélélé left Real Madrid, the team initially thought they had more than replaced him with
        flashier, more expensive attackers. They hadn&apos;t. The space he had so quietly protected
        was now exposed, and opponents exploited it remorselessly. At Chelsea, under José Mourinho,
        Makélélé was the bedrock of back-to-back Premier League titles, doing his vital but invisible
        work until retirement.
      </p>

      <h2>Famous Examples</h2>

      <h3>Claude Makélélé — The Original</h3>
      <p>
        Makélélé was the prototype of the modern holding midfielder. Compact, intelligent, relentlessly
        consistent, and utterly selfless in his role. He understood that his contribution was measured
        not in goals or assists but in attacks prevented — passes cut out before they reached dangerous
        attackers. His career is a case study in how an &quot;unglamorous&quot; position can be the
        most important on the pitch.
      </p>

      <h3>Sergio Busquets — The Intellectual</h3>
      <p>
        If Makélélé was the template, Busquets is the evolution. Playing for Pep Guardiola&apos;s
        Barcelona — arguably the greatest club team ever assembled — Busquets was the pivot point
        of the entire tiki-taka system. His positioning was so precise that he seemed to teleport into
        the right space before the ball arrived. His passing was always available, always accurate,
        always moving the team forward. Guardiola said simply: &quot;Watch the game. Then watch
        Busquets.&quot; He won everything at club level and the World Cup with Spain.
      </p>

      <h3>Casemiro — The Destroyer</h3>
      <p>
        The Brazilian played at Real Madrid during their period of four Champions League titles in
        five years, and his defensive work was central to that success. Where Busquets operated with
        almost surgical finesse, Casemiro was more physical — his aerial ability, aggression in duels,
        and power in challenges made him one of football&apos;s most formidable ball-winners. He also
        contributed goals, particularly from set pieces. His move to Manchester United in 2022 briefly
        transformed their midfield before injuries and team decline set in.
      </p>

      <h3>N&apos;Golo Kanté — The Anomaly</h3>
      <p>
        Kanté deserves mention here too, though he straddles the line between No.6 and No.8.
        His extraordinary ability to cover ground means he can provide the defensive security of a
        holding midfielder while also participating in the press further up the pitch. Two Premier
        League titles in successive seasons with two different clubs — Leicester and Chelsea — is
        football&apos;s ultimate testament to one player&apos;s individual impact.
      </p>

      <h2>Common Misconceptions</h2>
      <ul>
        <li>
          <strong>&quot;The No.6 is boring — they just play safe passes.&quot;</strong> — The
          deceptive simplicity of a holding midfielder disguises enormous technical demand. Receiving
          the ball under full-press pressure and playing it accurately to a teammate in a tight space
          is genuinely difficult. Busquets made it look easy; that is the art.
        </li>
        <li>
          <strong>&quot;Any tough tackler can play holding mid.&quot;</strong> — Positioning and
          reading the game are far more important than physical aggression. Makélélé was not the
          most physical player — he was exceptionally intelligent about where to be and when.
        </li>
        <li>
          <strong>&quot;The role has been replaced in modern football.&quot;</strong> — Quite the
          opposite. As high-pressing tactics have become standard, teams need a player who can win
          the ball back quickly in central areas. The role is more important than ever.
        </li>
      </ul>

      <h2>Advanced Understanding</h2>
      <p>
        In modern football, holding midfielders are often asked to perform <strong>press triggers</strong>
        — when the opposition plays the ball backward or sideways, the No.6 initiates the team&apos;s
        press by engaging the ball carrier, which is the signal for everyone to press simultaneously.
      </p>
      <p>
        The <strong>pivot</strong> role in positional play (as used by Guardiola&apos;s teams) requires
        the No.6 to drop between the centre-backs during build-up — effectively creating a back three
        and allowing the full-backs to push forward. This sophisticated movement pattern requires
        the No.6 to be excellent on the ball under pressure, not just a defensive ball-winner.
      </p>
      <p>
        Finally, elite holding midfielders have a <strong>switch</strong>: they know when to be
        aggressive and press, and when to hold their position and invite the opponent toward them.
        This decision-making — knowing when <em>not</em> to engage — is the difference between a
        competent No.6 and a world-class one.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="The Number 6" />
    </LessonLayout>
  );
}

