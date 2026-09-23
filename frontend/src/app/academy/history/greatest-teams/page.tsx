import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "Greatest Teams Ever | Football Academy | TacticSensei",
  description:
    "The legendary clubs and national teams that defined eras — from Cruyff's Ajax to Guardiola's Barcelona, and everything in between.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which national team became the first to defeat England on home soil at Wembley, winning 6–3 in 1953?",
    options: ["Brazil", "West Germany", "Hungary", "France"],
    correctIndex: 2,
  },
  {
    question: "Ajax's legendary Total Football era produced how many consecutive European Cups?",
    options: ["Two", "Three", "Four", "Five"],
    correctIndex: 1,
  },
  {
    question: "Which coach is credited with implementing Total Football at Ajax in the early 1970s?",
    options: ["Johan Cruyff", "Rinus Michels", "Arrigo Sacchi", "Ernst Happel"],
    correctIndex: 1,
  },
  {
    question: "Barcelona's dominant 2008–2012 era under Guardiola won approximately how many trophies in four years?",
    options: ["8", "10", "14", "18"],
    correctIndex: 2,
  },
  {
    question: "Who was the all-time leading World Cup scorer, a record Klose set during the 2014 Germany World Cup campaign?",
    options: ["Ronaldo (Brazilian)", "Pelé", "Gerd Müller", "Miroslav Klose"],
    correctIndex: 3,
  },
];

export default function GreatestTeamsPage() {
  return (
    <LessonLayout
      moduleSlug="history"
      lessonSlug="greatest-teams"
      title="Greatest Teams Ever"
      description="The legendary sides that defined eras — from Cruyff's Ajax to Guardiola's Barca."
      readingTime={7}
      difficulty="intermediate"
      emoji="👑"
    >
      {/* Opening hook */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="text-lg font-bold text-accent mb-2">When a Team Becomes a Movement</h2>
        <p className="text-foreground">
          Some football teams don't just win — they change how the game is understood. They
          introduce ideas, aesthetics, and levels of performance that shift what everyone else
          believes is possible. These are the teams that not only dominated their eras but left
          fingerprints on the game that can still be felt today.
        </p>
      </div>

      <h2>Hungary 1953 — The Magical Magyars</h2>
      <p>
        On 25 November 1953, 100,000 fans packed Wembley Stadium to watch England — the inventors
        of football, who had never lost at home to a non-British side — face Hungary. What 
        followed was the most significant result in the history of the game. Hungary won 6–3,
        and it wasn't as close as the scoreline suggests.
      </p>
      <p>
        England expected a conventional match. Instead, Ferenc Puskás, Sándor Kocsis, and Nándor
        Hidegkuti played fluid, positional football unlike anything ever seen. Hidegkuti, nominally
        a centre-forward, dropped so deep that England's defenders didn't know who to mark.
        Puskás scored twice and nutmegged England's captain Billy Wright with contemptuous ease.
        When Puskás rolled the ball back to beat Wright, a photograph captured it — and it became
        the defining image of tactical obsolescence.
      </p>
      <p>
        Hungary were unbeaten for 32 matches across four years. They were Olympic champions in 1952.
        The only blemish: a 3–2 World Cup Final defeat to West Germany in 1954 — arguably the
        greatest upset in World Cup history — despite having hammered the same Germany team 8–3
        in the group stage. Tragedy struck in 1956 when revolution forced their star players to 
        flee Hungary. The team was never reassembled.
      </p>

      <h2>Brazil 1970 — Football's Masterpiece</h2>
      <p>
        Pelé, Jairzinho, Rivelino, Tostão, Gérson, Carlos Alberto Torres — the starting XI reads
        like a roll call of gods. Brazil's 1970 World Cup campaign in Mexico is widely regarded as
        the finest ever produced by any national team. They scored 19 goals in 6 games and
        conceded just 7 — but the numbers don't capture the beauty.
      </p>
      <p>
        Carlos Alberto's goal against Italy in the final — Pelé's perfectly weighted pass across
        the box, met by the thundering right foot of the captain — is frequently voted the
        greatest goal in World Cup history. Their football was joy incarnate: improvised,
        daring, and utterly devastating. They won the Jules Rimet Trophy permanently, for having
        won it three times.
      </p>

      {/* Team stats callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">⚽ Brazil 1970 — By the Numbers</p>
        <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
          <li>• <strong>19 goals scored</strong> in 6 matches (avg. 3.17 per game)</li>
          <li>• <strong>Jairzinho</strong> scored in every single game — the only player to do so in a single World Cup</li>
          <li>• <strong>Pelé</strong> — the only man to win three World Cups as a player</li>
          <li>• Voted the <strong>greatest World Cup team ever</strong> in multiple polls</li>
        </ul>
      </div>

      <h2>Ajax 1971–73 — Total Football Perfected</h2>
      <p>
        Ajax Amsterdam won three consecutive European Cups between 1971 and 1973 under coach
        Rinus Michels and then Stefan Kovacs, with Johan Cruyff as the supreme orchestrator on
        the pitch. Their philosophy — "Total Football" — was revolutionary: every outfield player
        should be capable of playing every position. When a player moved out of position, a teammate
        seamlessly filled the space.
      </p>
      <p>
        Cruyff was the conductor. Neeskens was the engine. Haan, Krol, Rep, and Swart were
        interchangeable chess pieces in a fluid system. Opponents could not mark Ajax players
        because their positions were constantly shifting. Ajax's Total Football influenced
        every progressive coaching philosophy that followed — from the Dutch national team
        of 1974 to Guardiola's Barcelona to Klopp's Liverpool.
      </p>

      <h2>AC Milan 1988–90 — The Invincible Rossoneri</h2>
      <p>
        Arrigo Sacchi's Milan squad contained three of the best players in the world —
        the Dutch trio of Ruud Gullit, Marco van Basten, and Frank Rijkaard — and built around
        them one of the most technically disciplined defensive units ever assembled, led by
        the imperious Franco Baresi and Paolo Maldini.
      </p>
      <p>
        Milan won back-to-back European Cups in 1989 and 1990, and went the entire 1991–92
        Serie A season without losing a league match (58 consecutive games unbeaten). Van Basten
        won three Ballons d'Or. His chip against the Soviet Union in the Euro 1988 final — a
        volley from an impossible angle — is considered one of the greatest goals ever scored.
        Sacchi's pressing system and zonal marking were decades ahead of their time.
      </p>

      <h2>Brazil 2002 — Ronaldo's Redemption</h2>
      <p>
        The 2002 World Cup belongs to one man's comeback story. Four years earlier in 1998,
        Ronaldo suffered a mysterious seizure the night before the World Cup Final, played anyway,
        and was a shadow of himself as Brazil lost to France. The circumstances were never fully
        explained. In 2002, he returned — older, recovered from two devastating knee injuries
        — and scored 8 goals including two in the final against Germany.
      </p>
      <p>
        Ronaldo, Ronaldinho, and Rivaldo gave Brazil three of the world's best five players.
        Ronaldinho's cheeky lobbed free kick against England, sending goalkeeper David Seaman
        scrambling backwards in disbelief, was the moment of the tournament. Brazil were the
        last South American team to win a World Cup on non-South American soil.
      </p>

      <h2>Barcelona 2008–2012 — Tiki-Taka at Its Peak</h2>
      <p>
        Pep Guardiola took over as Barcelona manager in 2008 and built something that football
        had never seen before. In four seasons, they won 14 major trophies including two Champions
        Leagues, four La Ligas, and two Copa del Reys. The spine of the team — Víctor Valdés,
        Carles Puyol, Gerard Piqué, Sergio Busquets, Xavi Hernández, Andrés Iniesta, and Lionel Messi
        — was almost entirely homegrown from La Masia, Barcelona's famous youth academy.
      </p>
      <p>
        The style was called Tiki-Taka: relentless short passing, control of possession, and
        suffocating opponents through movement rather than direct pressing. Xavi averaged over
        100 passes per game. Messi, nominally a false nine, had 91 goals in all competitions
        in 2012 alone. The 5–0 demolition of Real Madrid in 2010 — at the Bernabéu — remains
        one of the most dominant performances in El Clásico history.
      </p>

      {/* Trophy callout */}
      <div className="not-prose my-6 rounded-xl border border-violet-400/30 bg-violet-50/50 p-5 dark:bg-violet-900/10">
        <p className="text-sm font-semibold text-violet-700 dark:text-violet-400">🏆 Barcelona 2008–2012 Honours</p>
        <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
          <li>• <strong>2009:</strong> Historic Sextuple — La Liga, Copa del Rey, Champions League, Supercopa, UEFA Super Cup, Club World Cup</li>
          <li>• <strong>2011:</strong> Second Champions League — beat Manchester United 3–1 in Wembley Final</li>
          <li>• <strong>14 trophies</strong> in 4 seasons under Guardiola</li>
        </ul>
      </div>

      <h2>Germany 2014 — The Perfect Machine</h2>
      <p>
        Germany's 2014 World Cup victory was the culmination of a decade-long national rebuilding
        project. After their humiliating group-stage exit at Euro 2000, Germany restructured youth
        football from the ground up — investing in academies, technical coaching, and a new
        passing philosophy. The results arrived in Brazil.
      </p>
      <p>
        Manuel Neuer reinvented the goalkeeper position with his sweeper-keeper style, playing
        like a libero 30 yards from goal. Thomas Müller's spatial intelligence made him
        unmarkable. Miroslav Klose scored his 16th World Cup goal to become the tournament's
        all-time top scorer, surpassing Brazil's Ronaldo. Toni Kroos controlled games with
        metronomic precision. The 7–1 semi-final obliteration of Brazil on home soil remains
        one of football's most shocking nights.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="Greatest Teams Ever" />
    </LessonLayout>
  );
}

