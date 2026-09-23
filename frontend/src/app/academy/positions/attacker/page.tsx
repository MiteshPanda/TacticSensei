import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "Attacker | Football Academy | TacticSensei",
  description:
    "Learn about football attackers — centre forwards, wingers, and second strikers. Famous examples: Ronaldo (R9), Thierry Henry, and Harry Kane. Goal-scoring techniques explained.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the primary job of a centre forward (CF)?",
    options: [
      "To track back and help the midfield win possession",
      "To score goals and hold up play for teammates",
      "To deliver crosses from wide positions",
      "To play in behind the defence as a sweeper",
    ],
    correctIndex: 1,
    explanation:
      "A centre forward's primary job is to score goals. They also 'hold up play' — receiving the ball with their back to goal and bringing teammates into the game — and make runs to stretch the opposition defence.",
  },
  {
    question: "Which famous Brazilian striker is known for his unique running style, thunderous long-range shots, and goals at the 1998 World Cup?",
    options: ["Ronaldo Nazário (R9)", "Rivaldo", "Romário", "Kaká"],
    correctIndex: 0,
    explanation:
      "Ronaldo Nazário — known as R9 or simply 'The Phenomenon' — is one of the greatest centre forwards ever. His explosive pace, incredible dribbling, and clinical finishing made him dominant throughout the 1990s and early 2000s.",
  },
  {
    question: "Thierry Henry is notable for being what unusual type of attacker at Arsenal?",
    options: [
      "A pure penalty-box striker with no pace",
      "A converted left-back who became a striker",
      "A winger turned centre-forward who combined pace, technique, and composure to devastating effect",
      "A deep-lying forward who spent most of the match in midfield",
    ],
    correctIndex: 2,
    explanation:
      "Thierry Henry began as a winger but Arsène Wenger converted him into a left-channel striker at Arsenal. His ability to run at pace from wide areas, cut inside, and finish with either foot made him Arsenal's greatest ever player.",
  },
  {
    question: "What does a 'winger' primarily do in a modern football team?",
    options: [
      "Defend the wide areas when the opposition has the ball",
      "Attack down the flank, deliver crosses or cut inside to shoot",
      "Play as an extra central defender in a back five",
      "Win aerial duels from set pieces in the opposition box",
    ],
    correctIndex: 1,
    explanation:
      "Wingers operate on the flanks of the attacking line. They use their pace and dribbling to beat defenders wide, then either cross into the box or cut inside to shoot — depending on whether they're a natural or inverted winger.",
  },
  {
    question: "Harry Kane is known for which quality that separates him from most pure goalscorers?",
    options: [
      "His extraordinary pace and ability to beat defenders with speed",
      "His unique combination of elite goalscoring AND exceptional creative ability — assists, through balls, and hold-up play",
      "His heading ability on aerial deliveries into the box",
      "His pressing intensity that wins the ball high up the pitch",
    ],
    correctIndex: 1,
    explanation:
      "Harry Kane is unusual among elite strikers: he's both a prolific goalscorer AND a creator. He regularly drops deep to receive, plays incisive through balls, and ranks among the Premier League's top assist providers — a rare all-round striker.",
  },
];

export default function AttackerPage() {
  return (
    <LessonLayout
      moduleSlug="positions"
      lessonSlug="attacker"
      title="Attacker"
      description="Centre forwards, wingers, and second strikers — the goal-scorers and chance-creators who win matches."
      readingTime={5}
      difficulty="beginner"
      emoji="⚡"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          Attackers are the players closest to the opposition goal. Their primary job is{" "}
          <strong>scoring goals and creating chances</strong>. While all outfield players contribute to
          a team&apos;s attack, forwards are expected to be the ones who convert pressure into points.
          Football is ultimately a game of goals — and attackers are the finishers.
        </p>
      </div>

      <h2>What Does an Attacker Do?</h2>
      <p>
        Attackers operate in the opposition half and are constantly making runs, seeking space, and
        looking for the final pass that leads to a shot on goal. But modern attackers have complex
        additional demands: pressing the opposition&apos;s defenders to win the ball high up the pitch,
        dropping deep to link up with midfielders, and creating as well as finishing.
      </p>
      <p>
        There are three main types of attacker: the <strong>centre forward</strong>, the{" "}
        <strong>winger</strong>, and the <strong>second striker</strong>. Each has a distinct role, but
        the best attacking units combine all three in fluid, unpredictable ways.
      </p>

      {/* Key Skills */}
      <div className="not-prose my-6 rounded-xl border border-blue-400/30 bg-blue-50/50 p-5 dark:bg-blue-900/10">
        <p className="mb-3 text-sm font-bold text-blue-700 dark:text-blue-400">⚡ Key Skills Required</p>
        <ul className="space-y-1">
          <li className="text-sm text-foreground-muted">• <strong>Finishing</strong> — Converting chances with composure and accuracy under pressure</li>
          <li className="text-sm text-foreground-muted">• <strong>Movement</strong> — Making intelligent runs to get in behind defences or find space</li>
          <li className="text-sm text-foreground-muted">• <strong>Hold-up play</strong> — Receiving with back to goal, shielding, and laying off to teammates</li>
          <li className="text-sm text-foreground-muted">• <strong>Pace</strong> — Exploiting space behind a high defensive line with acceleration</li>
          <li className="text-sm text-foreground-muted">• <strong>Dribbling</strong> — Especially for wingers who must beat full-backs in wide areas</li>
          <li className="text-sm text-foreground-muted">• <strong>Heading</strong> — Converting crosses from set pieces and open play</li>
        </ul>
      </div>

      <h2>The Centre Forward: The Fox in the Box</h2>
      <p>
        The centre forward (CF) is the focal point of the attack. There are two broad types: the
        <strong> target man</strong> — big, strong, excellent in the air, holds up play — and the
        <strong> mobile striker</strong> — quick, makes intelligent runs behind the defence, converts
        half-chances. The best centre forwards combine elements of both.
      </p>
      <p>
        <strong>Penalty area intelligence</strong> is the defining quality of a great striker. Knowing
        where to be before the ball arrives, anticipating rebounds, and having the composure to finish
        under pressure separates elite goalscorers from merely good ones.
      </p>

      <h2>Wingers: Speed on the Flanks</h2>
      <p>
        Wingers operate on the left and right flanks of the attacking line. A <strong>natural winger</strong>{" "}
        (e.g., a right-footed player on the right wing) will typically get to the byline and cross into
        the box. An <strong>inverted winger</strong> (e.g., a right-footed player on the left wing) will
        cut inside onto their stronger foot to shoot.
      </p>
      <p>
        Inverted wingers have become hugely popular in modern football — Arjen Robben (right foot, left
        wing) and Franck Ribéry (left foot, right wing) at Bayern Munich were perhaps the most iconic
        pairing, their diagonal runs becoming entirely predictable yet still impossible to stop.
      </p>

      <h2>Second Striker / Shadow Striker</h2>
      <p>
        The second striker plays slightly behind the centre forward, often in the space between the
        opposition&apos;s midfield and defensive lines. They link play, make late runs into the box,
        and are often a team&apos;s second-highest scorer. This role is less common in modern football
        (which tends to use a lone striker), but players like Wayne Rooney and Francesco Totti were
        masters of it.
      </p>

      {/* Goal techniques callout */}
      <div className="not-prose my-6 rounded-xl border border-purple-400/30 bg-purple-50/50 p-5 dark:bg-purple-900/10">
        <p className="mb-3 text-sm font-bold text-purple-700 dark:text-purple-400">🎯 Goal-Scoring Techniques</p>
        <ul className="space-y-1">
          <li className="text-sm text-foreground-muted">• <strong>Driven finish</strong> — Low, powerful shot placed into the corner</li>
          <li className="text-sm text-foreground-muted">• <strong>Chip</strong> — Lofted shot over an advancing goalkeeper</li>
          <li className="text-sm text-foreground-muted">• <strong>Header</strong> — Directing a cross or cross-field ball into the net with the head</li>
          <li className="text-sm text-foreground-muted">• <strong>Volley</strong> — Striking the ball out of the air before it bounces</li>
          <li className="text-sm text-foreground-muted">• <strong>Tap-in</strong> — Getting on the end of a cross or rebound at close range (requires perfect movement)</li>
          <li className="text-sm text-foreground-muted">• <strong>Penalty</strong> — One-on-one against the goalkeeper from 12 yards; pure nerve</li>
        </ul>
      </div>

      <h2>Famous Examples</h2>

      <h3>Ronaldo Nazário (R9) — The Phenomenon</h3>
      <p>
        The Brazilian Ronaldo — nicknamed &quot;R9&quot; to distinguish him from Cristiano Ronaldo — is
        many people&apos;s choice as the greatest centre forward who ever lived. His combination of
        explosive pace, extraordinary dribbling, and lethal finishing was unlike anything seen before
        or since. Watch his two goals in the 1998 World Cup quarter-final against Chile, or his
        performance in the 2002 final against Germany (two goals, including one audacious chip attempt),
        and you understand why Diego Maradona called him &quot;the complete player.&quot; A knee injury
        that nearly ended his career at 21 makes his subsequent success all the more remarkable.
      </p>

      <h3>Thierry Henry — The Winger Who Became a Legend</h3>
      <p>
        Thierry Henry spent his early career as a winger at Juventus — and not a particularly successful
        one. Arsène Wenger brought him to Arsenal and played him as a left-channel striker, and the
        result was one of football&apos;s greatest transformations. Henry became Arsenal&apos;s
        all-time top scorer, won two Premier League titles, and was central to the Invincibles side of
        2003-04. His blend of pace, technique, intelligent movement, and composure in front of goal
        made him one of the best of his era. His assist for Pires in that famous 2005 penalty attempt
        shows even his moments of failure were iconic.
      </p>

      <h3>Harry Kane — The Complete Modern Striker</h3>
      <p>
        Harry Kane may be the most complete all-round striker of the modern era. His goalscoring record
        speaks for itself — the Premier League&apos;s all-time leading scorer — but what makes him
        exceptional is everything else. Kane drops deep to receive and play through balls that any
        midfielder would be proud of. He&apos;s among the Premier League&apos;s leading assisters.
        He can score with either foot, in the air, from range, and under intense pressure. He
        won the Premier League Golden Boot three times. His move to Bayern Munich in 2023 showed he
        could dominate outside England too.
      </p>

      <h2>Common Misconceptions</h2>
      <ul>
        <li>
          <strong>&quot;Strikers don&apos;t need to defend.&quot;</strong> — Modern pressing football
          requires forwards to work hard out of possession. Strikers like Firmino, Benzema, and Lewandowski
          all contribute enormous amounts of defensive work, pressing defenders and winning the ball back
          high up the pitch.
        </li>
        <li>
          <strong>&quot;The best striker is the one who scores the most goals.&quot;</strong> — Karim
          Benzema won the Ballon d&apos;Or after years of being underrated, partly because his
          involvement in goals was greater than his raw goal total suggested. Creation, hold-up play,
          and intelligent movement all matter enormously.
        </li>
        <li>
          <strong>&quot;Wingers just run fast down the line.&quot;</strong> — Modern wingers need excellent
          technical ability, decision-making, and tactical awareness. Simply being fast is not enough.
        </li>
      </ul>

      <h2>Advanced Understanding</h2>
      <p>
        <strong>Movement patterns</strong> are what separate good strikers from elite ones. An elite
        striker makes <em>runs to make space</em> — drawing defenders away so teammates can exploit the
        gap — not just runs to receive the ball themselves. Centre forward Karim Benzema was a master
        of this: his diagonal runs and drifting wide created space for Vinicius Júnior&apos;s direct
        running at Real Madrid.
      </p>
      <p>
        <strong>Pressing coordination</strong> is another advanced concept. Top attacking units don&apos;t
        press randomly — they press as a coordinated unit, forcing the ball carrier into a specific
        direction determined by their manager&apos;s defensive scheme. Jürgen Klopp&apos;s Liverpool
        forwards were among the best at this organised high press.
      </p>
      <p>
        Finally, <strong>zone 14</strong> — the central area just outside the penalty box — is where the
        most dangerous chances originate. Attacking midfielders and second strikers who can control this
        zone and deliver or shoot from it are extraordinarily valuable in the modern game.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="Attacker" />
    </LessonLayout>
  );
}

