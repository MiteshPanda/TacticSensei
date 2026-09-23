import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "La Liga | Football Academy | TacticSensei",
  description:
    "Spain's top division — the home of Real Madrid and Barcelona, El Clásico, La Masia academy, and Messi's records. Everything about La Liga explained.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "In what year was La Liga (Spain's top division) founded?",
    options: ["1919", "1924", "1929", "1935"],
    correctIndex: 2,
  },
  {
    question: "Which club holds the record for the most La Liga title wins?",
    options: ["Barcelona", "Atlético Madrid", "Valencia", "Real Madrid"],
    correctIndex: 3,
  },
  {
    question: "What is the name of Barcelona's famous youth academy that produced Messi, Xavi, and Iniesta?",
    options: ["La Cantera", "La Masia", "El Vivero", "La Fábrica"],
    correctIndex: 1,
  },
  {
    question: "What is the name of the fiercely contested fixture between Real Madrid and Barcelona?",
    options: ["El Derby", "El Clásico", "La Batalla", "El Gran Partido"],
    correctIndex: 1,
  },
  {
    question: "How many goals did Lionel Messi score for Barcelona in all competitions across his career at the club?",
    options: ["389", "432", "474", "512"],
    correctIndex: 2,
  },
];

export default function LaLigaPage() {
  return (
    <LessonLayout
      moduleSlug="competitions"
      lessonSlug="la-liga"
      title="La Liga"
      description="Spain's top division — the home of Barcelona and Real Madrid."
      readingTime={5}
      difficulty="beginner"
      emoji="🇪🇸"
    >
      {/* Opening hook */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="text-lg font-bold text-accent mb-2">Where the Greatest Players Come to Define Greatness</h2>
        <p className="text-foreground">
          La Liga has been home to Alfredo Di Stéfano, Johan Cruyff, Diego Maradona, Ronaldo,
          Zinedine Zidane, Ronaldinho, Cristiano Ronaldo, and Lionel Messi — a roll call of the
          greatest players in football history. For decades, Spain's top division has attracted
          the world's best to showcase their art on its pitches.
        </p>
      </div>

      <h2>The History of La Liga</h2>
      <p>
        La Liga — officially the Liga Nacional de Fútbol Profesional — was founded in <strong>1929</strong>,
        making it one of Europe's oldest top-flight leagues. The first champion was Barcelona.
        The league ran with interruptions during the Spanish Civil War (1936–39) but resumed and
        grew into one of the world's elite competitions.
      </p>
      <p>
        For most of its history, La Liga has been defined by the rivalry between two clubs who
        operate on a different financial and sporting scale to the rest of the division. Real
        Madrid and Barcelona have collectively won approximately 62 of the 92 La Liga titles
        played. This concentration of power is La Liga's defining characteristic — and its most
        frequent criticism.
      </p>

      <h2>The Format</h2>
      <p>
        Like the Premier League, La Liga features <strong>20 clubs</strong> competing in a
        home-and-away league across 38 matchdays from August to May. Three points for a win,
        one for a draw. The top 4 qualify for the Champions League, teams in positions 5–7
        may enter the Europa League or Conference League, and the bottom 3 are relegated to
        the second division (Segunda División).
      </p>

      {/* Title statistics */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">🏆 La Liga Title Record</p>
        <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
          <li>• <strong>Real Madrid:</strong> 36 titles — the most in La Liga history</li>
          <li>• <strong>Barcelona:</strong> 27 titles — including Guardiola's dominant 2008–12 era</li>
          <li>• <strong>Atlético Madrid:</strong> 11 titles — including 2013–14 and 2020–21 under Diego Simeone</li>
          <li>• <strong>Athletic Bilbao:</strong> 8 titles (all before 1984) — remarkable for their policy of only fielding Basque players</li>
          <li>• <strong>Valencia, Sevilla, Real Sociedad:</strong> Occasional champions who break the duopoly</li>
        </ul>
      </div>

      <h2>El Clásico — The World's Biggest Club Match</h2>
      <p>
        When Real Madrid and Barcelona play each other — home or away — it is El Clásico.
        Regardless of league position, form, or the time of year, El Clásico is the most
        watched club fixture in the world, routinely drawing 650 million viewers globally.
        It is not merely a football match — it carries the weight of Spain's complex regional
        politics, particularly the Catalan independence movement's association with Barcelona.
      </p>
      <p>
        Great El Clásico moments include: Di Stéfano's multiple masterclasses for Real in the
        1950s, Ronaldinho's stunning performance in the Bernabéu in 2005 (where Real Madrid fans
        gave him a standing ovation — almost unheard of), and Messi's hat-trick at the Bernabéu
        in 2014, celebrated with shirt-in-the-air theatrics. The fixture never disappoints.
      </p>

      <h2>La Masia — Barcelona's Production Line of Genius</h2>
      <p>
        No youth academy in football history has produced talent at the scale and quality of
        Barcelona's La Masia. Established in 1979 in an old farmhouse adjacent to Camp Nou,
        La Masia has developed some of the greatest players ever to play the game:
      </p>
      <ul>
        <li><strong>Lionel Messi</strong> — joined aged 13 from Argentina, became the greatest of all time</li>
        <li><strong>Xavi Hernández</strong> — the template for a modern controlling midfielder</li>
        <li><strong>Andrés Iniesta</strong> — scored Spain's 2010 World Cup winning goal</li>
        <li><strong>Sergio Busquets</strong> — the most underrated elite midfielder of his generation</li>
        <li><strong>Carles Puyol, Gerard Piqué, Cesc Fàbregas, Pedro</strong> — all La Masia graduates</li>
      </ul>
      <p>
        In 2010, Barcelona created history when La Masia graduates Messi, Xavi, and Iniesta
        finished first, second, and third in the Ballon d'Or — football's individual award for
        the world's best player. Three players from one youth academy occupying the top three
        places. It has never happened before or since.
      </p>

      {/* Messi record callout */}
      <div className="not-prose my-6 rounded-xl border border-blue-400/30 bg-blue-50/50 p-5 dark:bg-blue-900/10">
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">🐐 Messi at Barcelona — The Numbers</p>
        <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
          <li>• <strong>474 goals</strong> in all competitions — La Liga's all-time top scorer</li>
          <li>• <strong>268 assists</strong> at Barcelona across 17 seasons</li>
          <li>• <strong>7 Ballons d'Or</strong> — 6 of which came while at Barcelona</li>
          <li>• <strong>91 goals in 2012</strong> — a single calendar year record (all competitions)</li>
          <li>• <strong>10 La Liga titles</strong> with Barcelona</li>
          <li>• <strong>4 Champions Leagues</strong> with Barcelona</li>
        </ul>
      </div>

      <h2>La Liga's Style and Identity</h2>
      <p>
        La Liga is traditionally associated with technical, intelligent football. The Spanish
        philosophy — rooted in control, passing combinations, and positional awareness — was
        exported globally during the 2008–2012 golden era when the Spanish national team,
        built almost entirely on Barcelona and Real Madrid players, won three consecutive major
        tournaments (Euro 2008, World Cup 2010, Euro 2012).
      </p>
      <p>
        The league has also produced tactical innovations: Real Madrid's "Galácticos" era
        under Florentino Pérez and Zinedine Zidane demonstrated how to build star-studded teams;
        Diego Simeone's Atlético Madrid showed that organised, intense defensive football can
        compete with far richer rivals. La Liga contains multitudes.
      </p>

      <h2>Other Major European Leagues</h2>
      <p>
        While the Premier League and La Liga attract the most global attention, Europe has
        other elite competitions worth knowing:
      </p>
      <ul>
        <li><strong>Bundesliga (Germany):</strong> Founded 1963. Dominated by Bayern Munich (33 titles), but known for affordable tickets, high attendances, and the development of tactical ideas like Gegenpressing.</li>
        <li><strong>Serie A (Italy):</strong> The historically elite Italian division, home to Juventus (36 titles), AC Milan, and Inter Milan. Famous for tactical sophistication and defensive excellence.</li>
        <li><strong>Ligue 1 (France):</strong> Home to Paris Saint-Germain and famous for developing world-class talent. France's system has produced Mbappé, Benzema, Henry, Zidane, and dozens of the world's greatest players.</li>
      </ul>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="La Liga" />
    </LessonLayout>
  );
}

