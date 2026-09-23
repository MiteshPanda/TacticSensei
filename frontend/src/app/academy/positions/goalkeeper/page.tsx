import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "Goalkeeper | Football Academy | TacticSensei",
  description:
    "Learn everything about the goalkeeper position — shot-stopping, commanding the penalty area, modern distribution, and the sweeper-keeper revolution. Famous GKs: Neuer, Buffon, Alisson.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which goalkeeper is most associated with revolutionising the 'sweeper-keeper' role at the highest level?",
    options: ["Gianluigi Buffon", "Manuel Neuer", "Peter Schmeichel", "Iker Casillas"],
    correctIndex: 1,
    explanation:
      "Manuel Neuer of Bayern Munich and Germany is widely credited with perfecting the sweeper-keeper role — regularly coming far off his line to intercept passes and act as an extra outfield player.",
  },
  {
    question: "What is the primary job of a goalkeeper?",
    options: [
      "Scoring goals from set pieces",
      "Organising the midfield press",
      "Preventing the opposition from scoring",
      "Distributing the ball into wide areas only",
    ],
    correctIndex: 2,
    explanation:
      "A goalkeeper's primary responsibility is to stop the ball from crossing the goal line — whether through shot-stopping, catching crosses, or commanding the penalty area.",
  },
  {
    question: "What does it mean for a goalkeeper to 'command their area'?",
    options: [
      "Playing the offside trap aggressively",
      "Coming off their line to claim crosses and set pieces with authority",
      "Shouting at defenders to press higher",
      "Taking short goal kicks to start attacks",
    ],
    correctIndex: 1,
    explanation:
      "Commanding the area means the goalkeeper takes charge of their penalty box — claiming crosses, punching when necessary, and providing organisational leadership to the defensive unit.",
  },
  {
    question: "Which of these is NOT typically considered a core goalkeeper skill?",
    options: ["Aerial ability", "Reflexes", "Long-range shooting", "Positioning"],
    correctIndex: 2,
    explanation:
      "While modern goalkeepers do need good footwork and distribution, long-range shooting is not a core GK skill. Reflexes, positioning, aerial ability, and distribution are the fundamental requirements.",
  },
  {
    question: "Alisson Becker is known for which additional quality that distinguishes modern goalkeepers?",
    options: [
      "Rarely leaving his goal line",
      "Exceptional long and short passing to start attacks",
      "Heading goals from corners",
      "Playing entirely without a back four",
    ],
    correctIndex: 1,
    explanation:
      "Alisson Becker of Liverpool and Brazil is celebrated not just for his shot-stopping but for his outstanding distribution — both with precise short passes to feet and raking long balls to launch counter-attacks.",
  },
];

export default function GoalkeeperPage() {
  return (
    <LessonLayout
      moduleSlug="positions"
      lessonSlug="goalkeeper"
      title="Goalkeeper"
      description="The last line of defence — shot-stopping, commanding the area, and the sweeper-keeper revolution."
      readingTime={5}
      difficulty="beginner"
      emoji="🧤"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          The goalkeeper is the only player allowed to use their hands inside the penalty area. Their primary job is
          simple: <strong>stop the ball going in the net</strong>. But the modern goalkeeper is so much more — a
          sweeper, a passer, and the organiser of the entire defensive unit.
        </p>
      </div>

      <h2>What Does a Goalkeeper Do?</h2>
      <p>
        At the most basic level, the goalkeeper stands between the posts and tries to keep the ball out of the net.
        But zoom in and you&apos;ll find one of football&apos;s most demanding roles. A goalkeeper must read the
        game a split second faster than everyone else — anticipating shots, tracking crosses, and organising the
        defenders in front of them like a general directing troops.
      </p>
      <p>
        Modern goalkeepers are expected to be comfortable with the ball at their feet. Short goal kicks, playing
        out from the back under pressure, and initiating attacks with precise long passes are now standard
        requirements at the top level. The days of the goalkeeper who simply catches and kicks are long gone.
      </p>

      {/* Key Skills */}
      <div className="not-prose my-6 rounded-xl border border-blue-400/30 bg-blue-50/50 p-5 dark:bg-blue-900/10">
        <p className="mb-3 text-sm font-bold text-blue-700 dark:text-blue-400">🧤 Key Skills Required</p>
        <ul className="space-y-1">
          <li className="text-sm text-foreground-muted">• <strong>Reflexes</strong> — Reacting to shots from close range in fractions of a second</li>
          <li className="text-sm text-foreground-muted">• <strong>Positioning</strong> — Cutting down angles so shots have less net to aim at</li>
          <li className="text-sm text-foreground-muted">• <strong>Aerial ability</strong> — Commanding crosses with safe hands or decisive punches</li>
          <li className="text-sm text-foreground-muted">• <strong>Distribution</strong> — Accurate passing (short and long) to restart attacks</li>
          <li className="text-sm text-foreground-muted">• <strong>Communication</strong> — Organising defenders, calling for the ball, alerting to danger</li>
          <li className="text-sm text-foreground-muted">• <strong>Concentration</strong> — Staying alert for 90 minutes when you might only touch the ball 5 times</li>
        </ul>
      </div>

      <h2>The Sweeper-Keeper: A Revolution in Goalkeeping</h2>
      <p>
        The <strong>sweeper-keeper</strong> is a goalkeeper who actively plays outside their penalty area to
        intercept through balls and act as a spare outfield defender. This style demands supreme confidence
        on the ball and excellent reading of the game. When it works, it gives a team an extra man in possession.
        When it goes wrong, the goal is empty.
      </p>
      <p>
        The sweeper-keeper concept isn&apos;t entirely new — Bert Trautmann at Manchester City in the 1950s was
        ahead of his time — but it was <strong>Manuel Neuer</strong> who brought it into the modern era and made
        it a global phenomenon.
      </p>

      {/* Fact callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="mb-2 text-sm font-bold text-amber-700 dark:text-amber-400">📖 Did You Know?</p>
        <p className="text-sm text-foreground-muted">
          In the 2014 World Cup, Manuel Neuer was awarded the Golden Glove (best goalkeeper) but many argued he
          deserved the Golden Ball (best player). He made 27 ball recoveries outside his penalty area — more than
          most outfield players.
        </p>
      </div>

      <h2>Famous Examples</h2>

      <h3>Manuel Neuer — The Sweeper-Keeper Perfected</h3>
      <p>
        The Bayern Munich and Germany legend redefined what a goalkeeper can be. Neuer doesn&apos;t just
        guard the line — he roams his entire defensive third, acting as a sweeper to neutralise through balls
        before they become chances. His footwork is technically comparable to outfield players, his long
        distribution is radar-accurate, and his reflexes are still elite. He won the Ballon d&apos;Or&apos;s
        Yashin Trophy for best goalkeeper three times and is considered the greatest goalkeeper of his
        generation by many experts.
      </p>

      <h3>Gianluigi Buffon — The Traditional Maestro</h3>
      <p>
        Italy&apos;s Buffon represents the <em>classic</em> style taken to its absolute peak. Extraordinary
        reflexes, commanding presence, perfect positioning — Buffon rarely left his area unnecessarily, but
        what he did inside it was peerless. He won Serie A nine times with Juventus, reached the 2006 World
        Cup final (winning it), and kept playing at the top level into his 40s. His longevity alone speaks to
        the mental discipline goalkeeping demands.
      </p>

      <h3>Alisson Becker — The Complete Modern Goalkeeper</h3>
      <p>
        Liverpool&apos;s Brazilian goalkeeper combines the best of both worlds. His shot-stopping statistics are
        consistently among the best in the Premier League, yet his distribution helped transform Liverpool from a
        team that played direct into one of Europe&apos;s most fluid attacking sides. His 94th-minute header
        against West Brom in 2021 — a goal scored by a goalkeeper — showed that the modern GK truly has no limits.
      </p>

      <h2>Common Misconceptions</h2>
      <ul>
        <li>
          <strong>&quot;Goalkeepers just stand there.&quot;</strong> — In reality, goalkeeping is exhausting
          mentally. Staying focused when you touch the ball only six times in 90 minutes requires extraordinary
          concentration.
        </li>
        <li>
          <strong>&quot;A good outfield player could easily play goalkeeper.&quot;</strong> — Goalkeeping is a
          completely different skill set. The angles, the reaction times, handling technique, and dive
          mechanics take years of specialist training to develop.
        </li>
        <li>
          <strong>&quot;Bigger goalkeepers are always better.&quot;</strong> — Height helps for aerial
          dominance, but shorter, more agile keepers can compensate with quicker reflexes and better
          lateral movement. Jorge Campos stood at just 5&apos;6&quot; and was a Mexican legend.
        </li>
      </ul>

      <h2>Advanced Understanding</h2>
      <p>
        At the elite level, goalkeepers study <strong>penalty anticipation</strong> — analysing an opponent&apos;s
        run-up, body shape, and historical tendency to predict which side they&apos;ll shoot. Teams now employ
        specialist goalkeeper coaches and video analysts dedicated entirely to this.
      </p>
      <p>
        <strong>Set-piece organisation</strong> is another elite skill. Before a corner, a goalkeeper must
        assign specific marking responsibilities to each defender — man-to-man or zonal — and then decide
        whether to catch, punch, or stay on their line based on the delivery. All of this happens in seconds
        under enormous physical pressure.
      </p>
      <p>
        Finally, the <strong>psychological aspect</strong> of goalkeeping is unmatched in football. A striker
        who misses a chance is quickly forgotten; a goalkeeper who makes an error often costs the team a
        goal directly. Managing that pressure, staying focused after a mistake, and remaining decisive under
        stress are what truly separate good goalkeepers from great ones.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="Goalkeeper" />
    </LessonLayout>
  );
}

