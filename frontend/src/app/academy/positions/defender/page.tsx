import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "Defender | Football Academy | TacticSensei",
  description:
    "Learn all about football defenders — centre-backs, full-backs, and wing-backs. Understand their roles, key skills, and famous players like Virgil van Dijk, Sergio Ramos, and Trent Alexander-Arnold.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which type of defender is primarily responsible for winning aerial duels and blocking central attacks?",
    options: ["Wing-back", "Full-back", "Centre-back", "Sweeper"],
    correctIndex: 2,
    explanation:
      "Centre-backs (CBs) operate in the heart of the defence. Their main jobs are winning headers, blocking shots, making tackles, and organising the defensive line — especially in central areas.",
  },
  {
    question: "Trent Alexander-Arnold is famous for being what type of defender?",
    options: [
      "A traditional defensive centre-back",
      "A highly attacking right-back known for creativity and assists",
      "A wing-back in a five-defender system",
      "A sweeper who plays behind the defensive line",
    ],
    correctIndex: 1,
    explanation:
      "Trent Alexander-Arnold plays as Liverpool's right-back but is renowned for his exceptional attacking output — particularly his crossing, passing range, and assist records, which are more typical of a midfielder.",
  },
  {
    question: "In a 3-4-3 or 3-5-2 formation, what is the name for the wide defenders who act like both defenders AND wingers?",
    options: ["Full-backs", "Wing-backs", "Liberos", "Sweepers"],
    correctIndex: 1,
    explanation:
      "Wing-backs appear in systems with three centre-backs. They cover the entire flank — defending wide like full-backs when the team doesn't have the ball, and attacking like wingers when they do.",
  },
  {
    question: "Virgil van Dijk is widely regarded as elite because of which combination of qualities?",
    options: [
      "Pace, dribbling, and long-range shooting",
      "Physicality, aerial dominance, leadership, and composure on the ball",
      "Set-piece delivery and crossing ability",
      "Pressing intensity and high defensive line organisation",
    ],
    correctIndex: 1,
    explanation:
      "Van Dijk is considered one of the best centre-backs ever due to his aerial dominance, physical strength, composure in possession, and ability to organise and command the defensive unit with authority.",
  },
  {
    question: "What is the main tactical risk when full-backs push forward to support attacks?",
    options: [
      "The goalkeeper has more shots to face",
      "The team can be exposed by counter-attacks in wide areas behind them",
      "The centre-backs become overworked in aerial duels",
      "The midfield loses its shape and becomes too narrow",
    ],
    correctIndex: 1,
    explanation:
      "When full-backs overlap to attack, they leave space in behind them. Quick opposition forwards or wingers can exploit this with fast counter-attacks, which is why defensive midfielders often cover these channels.",
  },
];

export default function DefenderPage() {
  return (
    <LessonLayout
      moduleSlug="positions"
      lessonSlug="defender"
      title="Defender"
      description="Centre-backs, full-backs, and wing-backs — the defensive backbone of every football team."
      readingTime={5}
      difficulty="beginner"
      emoji="🛡️"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          Defenders protect their team&apos;s goal. They stand between the opposition and the goalkeeper,
          winning the ball back, clearing danger, and organising the defensive structure. But in modern
          football, defenders must also <strong>build from the back</strong> — contributing to attacks with
          their passing and movement.
        </p>
      </div>

      <h2>What Does a Defender Do?</h2>
      <p>
        Defence is far more complex than simply &quot;kicking the ball away.&quot; A defensive unit must work
        as a coordinated system — holding a line, pressing together, tracking runners, covering for
        each other, and communicating constantly. The best defensive teams aren&apos;t just physical — they
        are intelligent and disciplined.
      </p>
      <p>
        There are three main types of defenders in modern football: <strong>centre-backs</strong>,{" "}
        <strong>full-backs</strong>, and <strong>wing-backs</strong>. Each has distinct responsibilities,
        though the boundaries between them are increasingly blurred.
      </p>

      {/* Key Skills */}
      <div className="not-prose my-6 rounded-xl border border-blue-400/30 bg-blue-50/50 p-5 dark:bg-blue-900/10">
        <p className="mb-3 text-sm font-bold text-blue-700 dark:text-blue-400">🛡️ Key Skills Required</p>
        <ul className="space-y-1">
          <li className="text-sm text-foreground-muted">• <strong>Tackling</strong> — Winning the ball cleanly in one-on-one duels</li>
          <li className="text-sm text-foreground-muted">• <strong>Aerial ability</strong> — Winning headers from crosses and set pieces</li>
          <li className="text-sm text-foreground-muted">• <strong>Positioning</strong> — Reading the game to intercept passes before they reach attackers</li>
          <li className="text-sm text-foreground-muted">• <strong>Communication</strong> — Organising teammates, calling the offside trap, alerting to runners</li>
          <li className="text-sm text-foreground-muted">• <strong>Composure on the ball</strong> — Passing accurately under pressure when playing out from the back</li>
          <li className="text-sm text-foreground-muted">• <strong>Pace</strong> — Especially for full-backs who must recover after attacking</li>
        </ul>
      </div>

      <h2>Centre-Backs: The Heart of the Defence</h2>
      <p>
        Centre-backs (CBs) play in the middle of the defensive line and are the last line of outfield defence
        before the goalkeeper. They are typically the strongest and most dominant defenders in the air —
        winning headers from corners, free kicks, and crosses is a central part of their job.
      </p>
      <p>
        Great centre-backs also need to <strong>read the game</strong>. Anticipating where a dangerous pass
        is going before it&apos;s played — and stepping to intercept — is far better than reacting after the
        fact. Leadership is crucial too: the CB is often the player organising the defensive shape, calling
        the offside line, and shouting instructions to teammates.
      </p>

      <h2>Full-Backs: The Modern Hybrid</h2>
      <p>
        Full-backs (right-back and left-back) traditionally played wide on the defensive line and mostly
        tracked opposition wingers. But modern football has completely transformed this role. Today&apos;s
        full-backs are expected to be a genuine attacking threat — overlapping into advanced positions,
        delivering crosses, and even cutting inside to shoot.
      </p>
      <p>
        This attacking role brings enormous risk: when a full-back pushes forward and the team loses
        possession, there&apos;s a huge gap behind them. This is why modern teams work hard on defensive
        compactness and midfield cover to protect the space a forward full-back leaves.
      </p>

      <h2>Wing-Backs: Defenders Who Are Really Midfielders</h2>
      <p>
        In systems that use <strong>three centre-backs</strong> (such as a 3-4-3 or 3-5-2), the wide players
        are called wing-backs. Because three CBs provide extra central cover, the wing-backs are free to be
        more adventurous — covering the entire flank from byline to byline. They are essentially full-backs
        who have been given permission to act like wingers.
      </p>

      {/* Tactical callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="mb-2 text-sm font-bold text-amber-700 dark:text-amber-400">🧠 Tactical Note</p>
        <p className="text-sm text-foreground-muted">
          Antonio Conte&apos;s teams at Chelsea, Inter Milan, and Spurs used a 3-4-3 / 3-5-2 system where
          wing-backs like Marcos Alonso, Achraf Hakimi, and Ivan Perišić were among the team&apos;s most
          important attacking players — yet they had clear defensive duties too.
        </p>
      </div>

      <h2>Famous Examples</h2>

      <h3>Virgil van Dijk — The Complete Centre-Back</h3>
      <p>
        The Liverpool and Netherlands captain is widely considered the best centre-back of his era.
        Standing at 6&apos;4&quot;, van Dijk is physically imposing — he wins headers with ease and
        his strength makes him almost impossible to knock off the ball in one-on-one situations. But what
        makes him truly exceptional is his composure: he&apos;s never rushed, always reads danger early,
        and his passing from the back is clean and precise. Liverpool went from conceding freely to being
        one of Europe&apos;s tightest defences the season after he arrived, which is perhaps the best
        testament to his impact.
      </p>

      <h3>Sergio Ramos — The Warrior Leader</h3>
      <p>
        Spain and Real Madrid&apos;s legendary captain represents a different archetype — the
        <em>aggressive, warrior</em> centre-back. Ramos was never afraid of confrontation, held the
        defensive line ruthlessly, and delivered crucial goals at critical moments (his Champions League
        final header in 2014 being the most famous). He accumulated red cards and disciplinary points but
        his competitive intensity drove Real Madrid to four Champions League titles.
      </p>

      <h3>Trent Alexander-Arnold — The Attacking Full-Back Redefined</h3>
      <p>
        Trent Alexander-Arnold has arguably done more than any other player to redefine what a right-back
        can be. His crossing and passing range are elite — he regularly completes passes that midfielders
        would be proud of. He holds the Premier League record for most assists by a defender in a single
        season. Some managers have experimented with playing him as a midfielder rather than a full-back
        to maximise his creative output — a position switch that would have been unthinkable a decade ago.
      </p>

      <h2>Common Misconceptions</h2>
      <ul>
        <li>
          <strong>&quot;Defenders just kick the ball clear.&quot;</strong> — Modern defending is about
          positioning, interceptions, and composure on the ball. Randomly clearing is often a sign of
          poor defending, not good defending.
        </li>
        <li>
          <strong>&quot;Full-backs don&apos;t need to be technical.&quot;</strong> — The opposite is true
          today. Full-backs like Trent Alexander-Arnold and João Cancelo have some of the best passing
          ranges in the game.
        </li>
        <li>
          <strong>&quot;Big and strong is all that matters for centre-backs.&quot;</strong> — Intelligence
          and positioning are just as important. Reading the game well means you rarely need to be the
          fastest or strongest player on the pitch.
        </li>
      </ul>

      <h2>Advanced Understanding</h2>
      <p>
        Modern defensive tactics revolve around <strong>the defensive line</strong> — a horizontal line
        across the pitch where defenders position themselves. Playing a <em>high defensive line</em> compresses
        space and suffocates the opposition&apos;s attack, but it risks being caught by quick through balls.
        Playing a <em>low defensive line</em> is more defensively secure but gives the opponent more space
        to play in front.
      </p>
      <p>
        <strong>Zonal marking vs man-marking</strong> is another key concept. Zonal marking means each
        defender covers a zone of the pitch rather than a specific player. Man-marking means following a
        specific opponent wherever they go. Most modern teams use a hybrid — zonal in open play but more
        man-oriented during set pieces.
      </p>
      <p>
        Elite defenders also study <strong>pressing triggers</strong> — specific moments (a heavy touch, a
        back pass) when the whole defensive unit engages to win the ball high up the pitch. This is
        coordination at its finest, requiring every defender to react simultaneously.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="Defender" />
    </LessonLayout>
  );
}

