import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "The False 9 | Football Academy | TacticSensei",
  description:
    "Understand the False 9 — the striker who drops deep to create confusion and space. History from Hungary 1953 to Messi at Barcelona 2009-2012. Why Guardiola's Barca used it.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the core tactical idea behind the False 9 position?",
    options: [
      "A striker who stays very high and wide, stretching the opposition defence sideways",
      "A striker who drops into deep areas to receive the ball, creating a dilemma for opposition centre-backs: follow them and leave space, or hold and let them play freely",
      "A left-back who plays as a striker in a system with no wingers",
      "A midfielder who pretends to be a striker during set pieces to confuse the opposition",
    ],
    correctIndex: 1,
    explanation:
      "The False 9 drops deep from the striker position, creating a tactical dilemma for centre-backs. If they follow, space opens up behind them for wingers to run through. If they don't follow, the False 9 has time and space to create. Either way, the defensive structure is disrupted.",
  },
  {
    question: "Which match in 1953 is considered the earliest high-profile example of the False 9 concept?",
    options: [
      "Brazil 4-2 Sweden, 1958 World Cup Final",
      "Hungary 6-3 England at Wembley, where Nándor Hidegkuti dropped deep and the English defence had no answer",
      "Real Madrid 7-3 Eintracht Frankfurt, 1960 European Cup Final",
      "West Germany 3-2 Hungary, 1954 World Cup Final",
    ],
    correctIndex: 1,
    explanation:
      "Hungary's legendary 6-3 victory over England at Wembley in 1953 — England's first home defeat to continental opposition — is the founding moment of the False 9. Nándor Hidegkuti played as a deep-lying centre-forward, completely baffling England's defenders who had never seen the concept before.",
  },
  {
    question: "When Pep Guardiola deployed Messi as a False 9 at Barcelona from 2009, what was the key tactical reason?",
    options: [
      "Messi was recovering from injury and needed a less physically demanding position",
      "Barcelona had no natural striker so Messi was used as a backup option",
      "By removing a traditional striker, Barcelona could play more midfielders — maintaining numerical superiority in the middle while Messi's dropping created space for Iniesta and Pedro to run through",
      "The False 9 was used specifically against Real Madrid in El Clásico as a one-off tactical surprise",
    ],
    correctIndex: 2,
    explanation:
      "Guardiola's genius was recognising that Messi's natural tendency to drift deep was an asset, not a flaw. By removing the traditional striker, Barcelona could flood midfield with technical players (Xavi, Iniesta, Busquets) while Messi's dropping motion created the space that wingers like Pedro and later Villa could exploit.",
  },
  {
    question: "What dilemma does the False 9 create for opposition centre-backs?",
    options: [
      "Whether to press the goalkeeper when he has the ball or drop into a deep defensive block",
      "Whether to man-mark the full-backs or focus on the central channel",
      "Whether to follow the False 9 deep — leaving space behind — or hold their line and let the striker operate freely in midfield",
      "Whether to play a high line or a deep defensive line when dealing with pace",
    ],
    correctIndex: 2,
    explanation:
      "This is the False 9's fundamental disruption. Centre-backs are trained to mark the striker. When the striker drops deep, they have two bad options: follow and leave a gaping hole behind, or stay and allow the 'striker' to operate unchallenged in midfield. There is no good answer.",
  },
  {
    question: "Which team benefited most from wingers running into the space created by Messi's False 9 role?",
    options: [
      "Argentina national team, 2010 World Cup",
      "Paris Saint-Germain, 2021-22 Champions League",
      "Barcelona under Guardiola, 2009-2012 — particularly Pedro and later David Villa who made runs into the space Messi vacated",
      "Inter Miami, MLS 2023",
    ],
    correctIndex: 2,
    explanation:
      "The system worked because Messi dropping deep pulled centre-backs forward, leaving the space behind for Pedro (and later David Villa) to run into at pace. The False 9 is only effective when there are mobile, intelligent players who can exploit the space it creates.",
  },
];

export default function False9Page() {
  return (
    <LessonLayout
      moduleSlug="positions"
      lessonSlug="false-9"
      title="The False 9"
      description="A striker who drops deep to create rather than stay high — one of football's most tactically fascinating inventions."
      readingTime={5}
      difficulty="intermediate"
      emoji="🔀"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          A False 9 is a <strong>striker who drops deep into midfield</strong> instead of staying high
          near the opposition&apos;s goal. This confuses centre-backs who are trained to mark the
          striker — do they follow them into midfield (leaving space behind)? Or stay back (letting
          the striker play freely)? Either way, the defence is in trouble. It&apos;s a simple idea
          with profound tactical consequences.
        </p>
      </div>

      <h2>What Does the False 9 Do?</h2>
      <p>
        In a traditional system, the striker stays high — pinning centre-backs deep and providing a
        target for long balls and crosses. The False 9 does the opposite: they{" "}
        <strong>drop away from the centre-backs</strong>, pulling them out of position and creating
        space in behind. This space is then exploited by the wingers, who make runs beyond where
        the centre-backs used to be.
      </p>
      <p>
        The term &quot;False 9&quot; refers to the shirt number: the No.9 is traditionally worn
        by the centre forward. A False 9 wears that shirt but doesn&apos;t play like a traditional
        9 — hence &quot;false.&quot;
      </p>

      {/* The dilemma callout */}
      <div className="not-prose my-6 rounded-xl border border-orange-400/30 bg-orange-50/50 p-5 dark:bg-orange-900/10">
        <p className="mb-3 text-sm font-bold text-orange-700 dark:text-orange-400">🎯 The Centre-Back&apos;s Dilemma</p>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="shrink-0 font-bold text-orange-600 dark:text-orange-400">Option A:</span>
            <p className="text-sm text-foreground-muted">
              <strong>Follow the False 9 deep</strong> → creates a huge gap in the defensive line that
              wingers can run through at pace.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="shrink-0 font-bold text-orange-600 dark:text-orange-400">Option B:</span>
            <p className="text-sm text-foreground-muted">
              <strong>Stay back and hold the line</strong> → lets the False 9 operate freely in midfield
              with time and space to pick passes and create chances.
            </p>
          </div>
          <p className="mt-2 text-sm font-medium text-foreground-muted">
            Either way, the defence is compromised. That&apos;s the genius of the False 9.
          </p>
        </div>
      </div>

      <h2>History: Where the False 9 Began</h2>

      <h3>Hungary 1953 — The Founding Moment</h3>
      <p>
        The concept is older than most people realise. On <strong>25 November 1953</strong>, the
        &quot;Magical Magyars&quot; — the Hungarian national team coached by Gusztáv Sebes — came
        to Wembley and destroyed England 6-3. It was England&apos;s first home defeat to continental
        opposition, and it shocked the football world.
      </p>
      <p>
        The tactical key was <strong>Nándor Hidegkuti</strong>, who wore the No.9 shirt but
        dropped so deep into midfield that England&apos;s centre-backs had no idea who to mark.
        England&apos;s defenders stayed back, expecting a striker to arrive — and Hidegkuti
        kept scoring from deep positions instead. He scored a hat-trick, and England were
        completely lost. The post-match reports described the English players as &quot;chasing
        shadows.&quot;
      </p>

      {/* Historical fact */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="mb-2 text-sm font-bold text-amber-700 dark:text-amber-400">📖 Historical Note</p>
        <p className="text-sm text-foreground-muted">
          Hungary&apos;s &quot;Golden Team&quot; of the early 1950s was 32 matches unbeaten when
          they played England. They went on to reach the 1954 World Cup final (which they lost to West
          Germany in one of sport&apos;s greatest upsets). The False 9, then called the
          &quot;deep-lying centre-forward,&quot; was central to their entire tactical system.
        </p>
      </div>

      <h2>Messi and Guardiola: The Modern Definition</h2>
      <p>
        While Hidegkuti invented the concept, it was <strong>Lionel Messi at Barcelona</strong>{" "}
        between 2009 and 2012 who made it the most talked-about tactic in football. Pep
        Guardiola, who had inherited a team with Messi, Xavi, Iniesta, and Busquets but no
        dominant No.9 (Samuel Eto&apos;o had just been sold to bring Zlatan Ibrahimović, who
        himself was then moved on), noticed something: when Messi dropped deep, defenders
        couldn&apos;t handle it.
      </p>

      <h3>Why Guardiola&apos;s Barcelona Used It</h3>
      <p>
        Guardiola&apos;s insight was profound. By removing a traditional striker entirely, he
        could play an extra midfielder — giving Barcelona even more control of the ball in
        central areas. The system required three things to work: Messi&apos;s unique ability
        to create from deep; Xavi and Iniesta&apos;s ability to play rapidly in tight spaces
        with numerical superiority; and wingers — initially Pedro and later David Villa —
        with the intelligence and pace to run into the space Messi vacated.
      </p>
      <p>
        The results were historically unprecedented. Barcelona won the treble in 2009, La
        Liga in 2010 and 2011, and the Champions League in 2011. Their 5-0 destruction of
        Real Madrid in November 2010 — Messi&apos;s False 9 performance — is considered the
        greatest individual team performance of the modern era.
      </p>

      {/* Tactical breakdown */}
      <div className="not-prose my-6 rounded-xl border border-blue-400/30 bg-blue-50/50 p-5 dark:bg-blue-900/10">
        <p className="mb-3 text-sm font-bold text-blue-700 dark:text-blue-400">⚙️ How the False 9 System Works (Barca 2009-2012)</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="shrink-0 text-blue-500">1.</span>
            <p className="text-sm text-foreground-muted">Messi drops deep to receive between the lines — centre-backs face their dilemma</p>
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 text-blue-500">2.</span>
            <p className="text-sm text-foreground-muted">If CB follows, Pedro / Villa sprint into the space left behind the defensive line</p>
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 text-blue-500">3.</span>
            <p className="text-sm text-foreground-muted">If CB stays, Messi has time to dribble, shoot, or play the through ball himself</p>
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 text-blue-500">4.</span>
            <p className="text-sm text-foreground-muted">Xavi and Iniesta provide the ball quickly to Messi as soon as he&apos;s free — the system depends on rapid recycling</p>
          </li>
        </ul>
      </div>

      <h2>Famous Examples Beyond Messi</h2>
      <p>
        Other managers have used the False 9 in different contexts:
      </p>
      <ul>
        <li>
          <strong>Roberto Firmino at Liverpool</strong> — Klopp used Firmino as a modern False 9
          who dropped deep, linked play, and created space for Salah and Mané. Firmino&apos;s
          assist numbers exceeded his goal numbers — unusual for a striker.
        </li>
        <li>
          <strong>Cesc Fàbregas for Spain</strong> — At the 2012 Euro, Vicente del Bosque played
          Fàbregas — a midfielder — as the False 9. Spain won without a traditional striker,
          a bold tactical choice that worked spectacularly.
        </li>
        <li>
          <strong>Marco van Basten at Ajax</strong> — Even earlier than Hidegkuti, van Basten
          sometimes used similar principles; and later, at the 1988 Euros, he and Gullit created
          false striker movements that confused defenders.
        </li>
      </ul>

      <h2>Common Misconceptions</h2>
      <ul>
        <li>
          <strong>&quot;Any striker can play False 9.&quot;</strong> — The False 9 requires
          exceptional technical quality (dribbling and passing in tight spaces), vision (seeing
          when to drop and when to run), and tactical intelligence. It&apos;s one of the most
          demanding roles in football.
        </li>
        <li>
          <strong>&quot;The False 9 doesn&apos;t score goals.&quot;</strong> — Messi was the
          Champions League&apos;s top scorer as a False 9. The role isn&apos;t about <em>not</em>{" "}
          scoring — it&apos;s about having the freedom to create AND score, from deeper positions.
        </li>
        <li>
          <strong>&quot;Every team should play a False 9.&quot;</strong> — The system requires a
          very specific type of player to make it work. Without a Messi-type talent, teams have
          tried and failed. It also requires the surrounding cast (fast wingers, technical midfielders)
          to be right.
        </li>
      </ul>

      <h2>Advanced Understanding</h2>
      <p>
        The <strong>third-man run</strong> is essential to the False 9 system. When the False 9
        drops to receive, they attract defenders. A teammate — usually a winger — makes a run
        into the space created. The False 9 lays the ball off to the midfielder, who plays the
        through ball to the running winger. The False 9 has barely touched the ball but has
        created the goal with their movement alone.
      </p>
      <p>
        <strong>Counter-pressing</strong> must accompany the False 9 system. Because the False 9
        operates in midfield, when possession is lost, the team can be exposed centrally. Guardiola&apos;s
        solution was immediate, coordinated pressing the moment the ball was lost — preventing
        the opposition from exploiting the space the False 9 had left.
      </p>
      <p>
        The False 9 has also influenced the evolution of <strong>centre-back play</strong>.
        Because modern teams frequently play without a traditional striker, centre-backs must now
        be comfortable stepping into midfield to follow deep runners — requiring technical quality
        on the ball that traditional centre-backs didn&apos;t need. The False 9 literally changed
        how defenders are trained.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="The False 9" />
    </LessonLayout>
  );
}

