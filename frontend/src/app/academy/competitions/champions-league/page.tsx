import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "UEFA Champions League | Football Academy | TacticSensei",
  description:
    "Europe's premier club competition — from the 1955 European Cup to the modern Champions League, its greatest nights, records, and unforgettable finals.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which club has won the UEFA Champions League (and its predecessor) the most times?",
    options: ["AC Milan", "Barcelona", "Bayern Munich", "Real Madrid"],
    correctIndex: 3,
  },
  {
    question: "The 2005 Champions League Final in Istanbul saw Liverpool come back from 3–0 down against which club?",
    options: ["Juventus", "AC Milan", "Real Madrid", "Barcelona"],
    correctIndex: 1,
  },
  {
    question: "Who is the all-time leading scorer in UEFA Champions League history?",
    options: ["Lionel Messi", "Raúl", "Robert Lewandowski", "Cristiano Ronaldo"],
    correctIndex: 3,
  },
  {
    question: "What significant format change was introduced to the Champions League for the 2024/25 season?",
    options: ["Reduced to 24 teams", "New 36-team league phase replacing the group stage", "Addition of 3 extra rounds", "Home-and-away final"],
    correctIndex: 1,
  },
  {
    question: "Which English club completed a domestic and European treble in the 2022/23 season, winning the Champions League, Premier League, and FA Cup?",
    options: ["Liverpool", "Chelsea", "Arsenal", "Manchester City"],
    correctIndex: 3,
  },
];

export default function ChampionsLeaguePage() {
  return (
    <LessonLayout
      moduleSlug="competitions"
      lessonSlug="champions-league"
      title="UEFA Champions League"
      description="Europe's elite club competition — the greatest nights in football."
      readingTime={5}
      difficulty="beginner"
      emoji="⭐"
    >
      {/* Opening hook */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="text-lg font-bold text-accent mb-2">The Anthem That Raises Hairs</h2>
        <p className="text-foreground">
          The moment that Handel-inspired orchestral anthem plays in a packed stadium, something
          electric happens. The UEFA Champions League anthem — three magnificent chords swelling
          into a choir — signals that this is different. This is the biggest club football on
          the planet. The best teams, the best players, the highest stakes.
        </p>
      </div>

      <h2>Origins — The European Cup (1955)</h2>
      <p>
        The competition began in 1955 as the European Cup, conceived by L'Équipe journalist
        Gabriel Hanot. Real Madrid won the first five editions — from 1956 to 1960 — a run of
        dominance so extraordinary it may never be matched. The competition was initially
        invitation-only, then moved to champion-only participation (hence "Champions League"),
        and was rebranded the UEFA Champions League in 1992 when its modern format, with group
        stages and commercial expansion, was established.
      </p>
      <p>
        The 1992 rebrand transformed the competition from an elite-but-niche tournament into
        a global commercial and sporting phenomenon. Sky TV money, improved broadcasting, and
        the Bosman ruling (which allowed players to move more freely between clubs) combined
        to create the superstar-filled spectacle we know today.
      </p>

      <h2>The Format</h2>
      <p>
        For most of its history the Champions League featured a group stage (six matches) followed
        by two-legged knockout rounds (Round of 16, Quarter-Finals, Semi-Finals) and a single-leg
        Final. From the <strong>2024/25 season</strong>, UEFA introduced a major format change:
      </p>
      <ul>
        <li><strong>36 teams</strong> (up from 32) enter a new "league phase"</li>
        <li>Each team plays <strong>8 matches</strong> against 8 different opponents (rather than 6 in the group stage)</li>
        <li>The top 8 advance directly to the Round of 16; teams finishing 9th–24th enter a playoff round</li>
        <li>The bottom 12 are eliminated from European competition entirely</li>
      </ul>

      <h2>The Champions</h2>
      <p>
        Real Madrid's dominance is unparalleled. With <strong>15 European Cup/Champions League titles</strong>,
        they are in a category of their own. AC Milan (7 titles), Liverpool and Bayern Munich
        (6 each), and Barcelona (5) form the next tier of elite clubs. For context, only a handful
        of clubs have ever won it even once — the trophy is rarer than it appears.
      </p>

      {/* Winners callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">🏆 Most UCL Titles</p>
        <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
          <li>• <strong>Real Madrid:</strong> 15 titles (1956, 1957, 1958, 1959, 1960, 1966, 1998, 2000, 2002, 2014, 2016, 2017, 2018, 2022, 2024)</li>
          <li>• <strong>AC Milan:</strong> 7 titles</li>
          <li>• <strong>Liverpool:</strong> 6 titles</li>
          <li>• <strong>Bayern Munich:</strong> 6 titles</li>
          <li>• <strong>Barcelona:</strong> 5 titles</li>
        </ul>
      </div>

      <h2>The Anthem</h2>
      <p>
        Few pieces of music are as instantly recognisable in sport as the UEFA Champions League
        anthem. Written by composer Tony Britten in 1992 and based on George Frideric Handel's
        "Zadok the Priest" (1727), it features a choir singing in English, French, and German.
        The lyrics are simply: "They're the champions — die Meister, les Grandes Équipes, the
        Champions." Simple. Majestic. Goosebump-inducing every single time it plays in a 
        stadium with 90,000 people.
      </p>

      <h2>The Records — Cristiano Ronaldo's Dominance</h2>
      <p>
        Cristiano Ronaldo holds the all-time Champions League goalscoring record with <strong>140 goals</strong>
        — a figure so far ahead of any other player that it may stand for decades. He has won
        the competition five times across Manchester United, Real Madrid, and Juventus. His
        impact on the competition's modern era is without parallel.
      </p>
      <p>
        Lionel Messi is second with 129 goals. Robert Lewandowski (100 goals) is the only other
        player to reach a century. Raúl, who held the record before Ronaldo, scored 71. The gap
        between eras illustrates how the modern game has been defined by two extraordinary players.
      </p>

      <h2>Unforgettable Finals</h2>
      <p>
        <strong>Istanbul 2005 — The Miracle of Istanbul:</strong> Liverpool faced AC Milan in
        a final that seemed over at half-time: 3–0 down after a Maldini goal after 52 seconds
        and two Crespo strikes. In one of sport's greatest comebacks, Liverpool scored three
        goals in six second-half minutes through Gerrard, Smicer, and Alonso. They won on
        penalties. It is the defining Champions League night.
      </p>
      <p>
        <strong>Madrid 2014 — La Décima:</strong> Real Madrid's obsessive pursuit of a tenth 
        European Cup ended when Ramos headed in the 93rd minute to force extra time against
        Atlético Madrid. Real Madrid then scored three more to win 4–1. Twelve years of waiting.
        Delivered in Madrid's own stadium.
      </p>
      <p>
        <strong>Lisbon 2020 — Bayern's Pandemic Trophy:</strong> In a tournament played as a
        mini-tournament in a single city (Lisbon) due to COVID-19, Bayern Munich dismantled 
        every opponent, beating Barcelona 8–2 in the quarter-final — one of the most shocking 
        results in the competition's history — before winning the final.
      </p>

      <h2>Man City's Treble — 2022/23</h2>
      <p>
        Manchester City, under Pep Guardiola, had reached the Champions League Final in 2021
        and lost. Two years later, they returned and beat Inter Milan 1–0 in Istanbul to complete
        an extraordinary domestic and European treble — Premier League, FA Cup, and Champions
        League. It was City's first ever European Cup, ending a decades-long wait and completing
        Guardiola's collection of all major trophies as a manager.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="UEFA Champions League" />
    </LessonLayout>
  );
}

