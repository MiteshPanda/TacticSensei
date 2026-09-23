import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "The Number 10 — Classic Playmaker | Football Academy | TacticSensei",
  description:
    "Explore the iconic No.10 — the trequartista, playmaker, and creative genius between midfield and attack. Famous examples: Maradona, Zidane, Ronaldinho, Messi. Is the No.10 dying out?",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "Where does the No.10 typically operate on the pitch?",
    options: [
      "Deep in midfield, just in front of the centre-backs",
      "On the right wing, looking to cut inside",
      "In the 'hole' between the opposition's midfield and defensive lines",
      "As the furthest forward player, leading the attack from up front",
    ],
    correctIndex: 2,
    explanation:
      "The No.10 operates 'in the hole' — the creative space between the opposition's midfield and defensive lines. From here they receive the ball facing forward, with time to pick passes, dribble, or shoot.",
  },
  {
    question: "Diego Maradona's most famous contribution to the No.10 legacy came at which tournament?",
    options: [
      "1994 World Cup, USA",
      "1986 World Cup, Mexico — with his 'Hand of God' and 'Goal of the Century' against England",
      "1978 World Cup, Argentina — where he scored the winning penalty",
      "Euro 1984 with club football for Barcelona",
    ],
    correctIndex: 1,
    explanation:
      "The 1986 World Cup in Mexico is where Maradona&apos;s legend was cemented. In one quarter-final against England, he scored two of football's most discussed goals: the controversial 'Hand of God' and the 'Goal of the Century' — a 60-metre dribble past five England players.",
  },
  {
    question: "What is a 'trequartista' in Italian football terminology?",
    options: [
      "A three-man midfield system used in Serie A",
      "A player who plays behind the striker in the space between midfield and attack — the three-quarter position",
      "A three-touch passing drill used in Italian academies",
      "A defensive system using three quarter-backs to cover wide areas",
    ],
    correctIndex: 1,
    explanation:
      "'Trequartista' literally means 'three-quarter' in Italian — referring to the position three-quarters of the way up the pitch. It describes a classic creative No.10 who plays between the lines with freedom to roam and create.",
  },
  {
    question: "Ronaldinho's greatest quality as a No.10 was considered to be:",
    options: [
      "His defensive work rate and ability to press the opposition back four",
      "His physical strength and aerial dominance in the penalty area",
      "His extraordinary ability to combine flamboyant dribbling, joy of play, and devastating effectiveness",
      "His long-range shooting accuracy from outside the box",
    ],
    correctIndex: 2,
    explanation:
      "Ronaldinho was unique in combining genuine technical magic — elasticos, no-look passes, audacious flicks — with devastating match-winning effectiveness. He made football look joyful while also being utterly ruthless. His peak at Barcelona (2004-2006) is considered some of the most entertaining football ever played.",
  },
  {
    question: "Why do some tactical experts argue the traditional No.10 is 'dying out' in modern football?",
    options: [
      "Because No.10s are too expensive and clubs prefer cheaper wide players",
      "Because modern high-pressing systems leave no space for a player to receive between the lines, and teams need more defensive output from midfielders",
      "Because the offside rule has changed to prevent classic No.10 through balls",
      "Because centre-backs have become so fast they can now mark No.10s out of the game completely",
    ],
    correctIndex: 1,
    explanation:
      "Modern gegenpressing and high-block defensive systems close down the space between midfield and defence where No.10s love to operate. Teams also demand more defensive work from all midfielders, reducing the freedom that classic playmakers relied upon. However, some argue the role has simply evolved rather than disappeared.",
  },
];

export default function Number10Page() {
  return (
    <LessonLayout
      moduleSlug="positions"
      lessonSlug="number-10"
      title="The Number 10"
      description="The classic playmaker — creative vision, through balls, and magic in the space between midfield and attack."
      readingTime={5}
      difficulty="intermediate"
      emoji="🔟"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          The No.10 is the <strong>creative genius</strong> of the football team — the player who
          operates in the space between the opposition&apos;s midfield and defensive lines, finding
          passes that others don&apos;t see, dribbling past defenders in tight spaces, and producing
          the moments of magic that change matches. Maradona wore it, Zidane wore it, Messi wore it.
          The number 10 shirt is football&apos;s most romantic.
        </p>
      </div>

      <h2>What Does the No.10 Do?</h2>
      <p>
        The No.10 — also called the <em>trequartista</em> (Italian for &quot;three-quarter&quot;),
        <em>attacking midfielder</em>, <em>shadow striker</em>, or simply the <em>playmaker</em> —
        operates in the most dangerous zone of the pitch: the space between the opposition&apos;s
        midfield and defensive lines. This is where defences are most vulnerable, because players
        there can turn and face goal, and where a single good pass or dribble can create a
        clear-cut chance.
      </p>
      <p>
        Unlike the No.6 or No.8, the No.10 is given maximum creative freedom. They are expected
        to be the team&apos;s primary chance-creator — delivering the through ball, the perfectly
        weighted cutback, the moment of individual brilliance. In exchange, they are typically
        exempted from the heavy defensive work required of other midfielders.
      </p>

      {/* Key Skills */}
      <div className="not-prose my-6 rounded-xl border border-blue-400/30 bg-blue-50/50 p-5 dark:bg-blue-900/10">
        <p className="mb-3 text-sm font-bold text-blue-700 dark:text-blue-400">🔟 Key Skills Required</p>
        <ul className="space-y-1">
          <li className="text-sm text-foreground-muted">• <strong>Vision</strong> — Seeing passes that others can&apos;t; understanding where teammates will be before the ball arrives</li>
          <li className="text-sm text-foreground-muted">• <strong>Through balls</strong> — Timing and weight of passes that split the defence and release forwards</li>
          <li className="text-sm text-foreground-muted">• <strong>Dribbling</strong> — Escaping pressure in tight spaces using technique and quick feet</li>
          <li className="text-sm text-foreground-muted">• <strong>First touch</strong> — Controlling the ball instantly under pressure to create a split second of time</li>
          <li className="text-sm text-foreground-muted">• <strong>Shooting</strong> — A genuine goal threat from in and around the penalty area</li>
          <li className="text-sm text-foreground-muted">• <strong>Movement</strong> — Drifting into pockets of space, making themselves available between the lines</li>
        </ul>
      </div>

      <h2>The Space Between the Lines</h2>
      <p>
        Understanding <strong>the space between the lines</strong> is the key to understanding
        the No.10. When a team defends, they typically have a midfield line and a defensive line.
        Between these two lines, there is a zone — sometimes tight, sometimes wide — that is
        extremely dangerous if a player can receive the ball there facing forward.
      </p>
      <p>
        The No.10&apos;s entire game is built around occupying this space. The moment they receive
        the ball between the lines, the opposition&apos;s entire defensive structure is in danger —
        the centre-backs can&apos;t step out without leaving space in behind, and the midfielders
        must drop back, disrupting the defensive shape.
      </p>

      {/* Famous quote */}
      <div className="not-prose my-6 rounded-xl border border-pink-400/30 bg-pink-50/50 p-5 dark:bg-pink-900/10">
        <p className="mb-2 text-sm font-bold text-pink-700 dark:text-pink-400">💬 Johan Cruyff on the Playmaker</p>
        <p className="text-sm text-foreground-muted italic">
          &quot;Quality without results is pointless. Results without quality is boring.&quot;
          — Cruyff&apos;s philosophy of creative, intelligent football that the No.10 embodies perfectly:
          not just winning, but winning <em>beautifully</em>.
        </p>
      </div>

      <h2>Famous Examples</h2>

      <h3>Diego Maradona — The Greatest of All Time?</h3>
      <p>
        Maradona is the defining No.10 in football history. Argentinian, fiery, and possessed of a
        left foot that seemed to operate on a different plane from everyone else&apos;s, he led
        Argentina to the 1986 World Cup title almost entirely through individual brilliance. His
        performance across that tournament — particularly the quarter-final against England where he
        scored both the &quot;Hand of God&quot; and the &quot;Goal of the Century&quot; in the same
        match — is arguably the greatest individual World Cup performance ever. He then won the
        Scudetto with Napoli, transforming a modest Italian club into a dominant force through
        sheer force of genius. The debate between Maradona and Messi for GOAT status is football&apos;s
        greatest ongoing argument, and it is rooted entirely in the No.10 position.
      </p>

      <h3>Zinedine Zidane — Elegance Made Dangerous</h3>
      <p>
        Where Maradona was raw power and passion, Zidane was pure elegance. The Frenchman moved
        with a balletic grace that masked devastating effectiveness. His technique was peerless —
        the Zidane turn (a 360-degree spin using the sole of the foot) named after him, his
        roulette, his first touch. He won the 1998 World Cup with France, scored a left-footed
        volley in the 2002 Champions League final that is widely considered the greatest goal in
        the competition&apos;s history, and won three Champions Leagues as Real Madrid&apos;s
        manager — showing that tactical genius followed his playing genius.
      </p>

      <h3>Ronaldinho — Football as Joy</h3>
      <p>
        Ronaldinho was the rare footballer who made spectators at all levels grin before he even
        touched the ball. His elastico (a fake to the outside, cut back inside in one motion), his
        no-look passes, his audacious chip goals — everything he did carried a sense of play
        and fun that masked how ruthlessly effective he was. His peak at Barcelona from 2004-2006
        produced two La Liga titles and a Champions League, and he won back-to-back Ballon d&apos;Or
        awards. He is also one of the very few players to receive a standing ovation at the
        Bernabéu — Real Madrid&apos;s hostile home ground — after a performance where he ran their
        defence ragged.
      </p>

      <h3>Lionel Messi — The Evolution of the Position</h3>
      <p>
        Messi began as a right winger before gradually drifting into a hybrid No.10 / False 9
        role under Pep Guardiola. But even as a more traditional No.10 later in his career —
        at PSG and then Inter Miami — his vision, his first touch in tight spaces, and his
        ability to produce decisive moments remained unmatched. Messi is the only player to
        win eight Ballon d&apos;Or awards, and his 2022 World Cup victory with Argentina is
        widely seen as the completion of football&apos;s greatest career.
      </p>

      <h2>Is the No.10 Dying Out?</h2>
      <p>
        This is one of football&apos;s most debated tactical questions. In the modern era of
        high-pressing, physically intense football, the space that the classic No.10 relied
        upon has been compressed. Teams like Klopp&apos;s Liverpool and Guardiola&apos;s City
        rarely use a true No.10 — preferring instead to have all midfielders contribute
        defensively, and creating chance-creation through collective movement rather than
        individual genius.
      </p>
      <p>
        However, the counter-argument is that the role has evolved rather than disappeared.
        Players like Kevin De Bruyne operate similarly to a No.10 but from deeper positions.
        Jude Bellingham at Real Madrid plays something between a No.8 and a No.10. The
        <em>function</em> — creating the chance that leads to the goal — remains as vital as
        ever; only the label and exact positioning have changed.
      </p>

      <h2>Common Misconceptions</h2>
      <ul>
        <li>
          <strong>&quot;The No.10 just does fancy tricks.&quot;</strong> — Dribbling and skill
          moves are tools, not ends. The great No.10s used their technique to create real
          danger and real goals. Ronaldinho&apos;s elastico always had a purpose.
        </li>
        <li>
          <strong>&quot;No.10s don&apos;t need to defend.&quot;</strong> — Even classic No.10s
          pressed at key moments. Modern football has increased these expectations. A No.10
          who genuinely contributes nothing out of possession is a luxury most teams can&apos;t
          afford today.
        </li>
        <li>
          <strong>&quot;Any creative player can play No.10.&quot;</strong> — The role requires
          a specific combination of vision, technique, movement between lines, and composure
          under pressure. Technical skill alone is not sufficient — footballing intelligence
          is equally important.
        </li>
      </ul>

      <h2>Advanced Understanding</h2>
      <p>
        <strong>Third-man combinations</strong> are the No.10&apos;s signature tactical weapon.
        Player A passes to the No.10, who immediately lays it off to Player B, and then Player A
        has made a run into the space created. The No.10&apos;s involvement lasts one touch, but
        their movement draws a defender out of position and creates the passing lane. This is
        &quot;playing through the ten.&quot;
      </p>
      <p>
        <strong>Overloading the half-spaces</strong> — the zones between the opposition&apos;s wide
        defender and their central defenders — is a modern evolution of the No.10&apos;s role.
        Elite playmakers seek these spaces rather than the very central channel, because they are
        harder to defend without breaking defensive shape.
      </p>
      <p>
        Finally, understanding <strong>pressure after loss of possession</strong> is now essential
        for No.10s. The moment they lose the ball, the opposition can counter-attack through the
        very space the No.10 was just occupying. Elite teams have their No.10 press immediately
        to prevent this transition — a far cry from the classic trequartista who would simply
        walk back into position.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="The Number 10" />
    </LessonLayout>
  );
}

