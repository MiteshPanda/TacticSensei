import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "FIFA World Cup | Football Academy | TacticSensei",
  description:
    "Everything you need to know about the FIFA World Cup — format, history, records, prize money, and why it is the biggest sporting event on Earth.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "How many teams currently compete in the FIFA World Cup finals tournament?",
    options: ["24", "28", "32", "48"],
    correctIndex: 2,
  },
  {
    question: "Approximately how many people watched the 2018 FIFA World Cup Final?",
    options: ["500 million", "1 billion", "2 billion", "3.5 billion"],
    correctIndex: 3,
  },
  {
    question: "Who is the all-time leading scorer in World Cup history with 16 goals?",
    options: ["Ronaldo (Brazil)", "Gerd Müller", "Miroslav Klose", "Just Fontaine"],
    correctIndex: 2,
  },
  {
    question: "In which year will the World Cup expand to 48 teams for the first time?",
    options: ["2022", "2024", "2026", "2030"],
    correctIndex: 2,
  },
  {
    question: "Which player is unique in having touched the FIFA World Cup Trophy twice as a captain — once in the 2014 Final and once as a 2022 winner?",
    options: ["Ronaldo", "Neymar", "Lionel Messi", "Luka Modrić"],
    correctIndex: 2,
  },
];

export default function WorldCupPage() {
  return (
    <LessonLayout
      moduleSlug="competitions"
      lessonSlug="world-cup"
      title="FIFA World Cup"
      description="The most watched sporting event on the planet — how it works and why it matters."
      readingTime={5}
      difficulty="beginner"
      emoji="🌍"
    >
      {/* Opening hook */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="text-lg font-bold text-accent mb-2">The Event That Unites the Planet</h2>
        <p className="text-foreground">
          No sporting event on Earth compares to the FIFA World Cup. An estimated 3.5 billion 
          people — nearly half the global population — watched the 2018 Final between France and 
          Croatia. For one month every four years, the entire planet has a shared conversation,
          a shared drama, and a shared passion. It is more than sport. It is humanity's festival.
        </p>
      </div>

      <h2>The Format — How It Works</h2>
      <p>
        The World Cup currently features <strong>32 teams</strong> from across the globe (expanding
        to 48 teams in 2026). These 32 teams are divided into 8 groups of 4. In the group stage,
        every team plays the other three teams in their group. The top two teams from each group
        advance to the knockout rounds — Round of 16, Quarter-Finals, Semi-Finals, and the Final.
        There is also a Third-Place playoff for the two losing semi-finalists.
      </p>
      <p>
        Knockout football is brutal in its simplicity: lose and you go home. This creates an
        intensity that domestic leagues — where teams have 38 games to recover from bad days —
        simply cannot replicate. One missed penalty can end a country's entire tournament. The
        psychological pressure is unparalleled.
      </p>

      {/* Format callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">📋 World Cup Format at a Glance</p>
        <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
          <li>• <strong>32 teams</strong> qualify from six confederations (UEFA, CONMEBOL, CONCACAF, CAF, AFC, OFC)</li>
          <li>• <strong>Group Stage:</strong> 8 groups of 4 — top 2 advance</li>
          <li>• <strong>Knockout rounds:</strong> Round of 16, QF, SF, Final</li>
          <li>• <strong>Duration:</strong> 64 matches over ~30 days</li>
          <li>• <strong>2026:</strong> Expands to 48 teams in USA, Canada, and Mexico</li>
        </ul>
      </div>

      <h2>The Road to the World Cup — Qualification</h2>
      <p>
        Qualifying for the World Cup is itself a two-year epic journey. Each of FIFA's six
        confederations runs its own qualification competition:
      </p>
      <ul>
        <li><strong>UEFA (Europe):</strong> Gets 13 spots. Teams play home-and-away group matches, then playoffs.</li>
        <li><strong>CONMEBOL (South America):</strong> Gets 4.5 spots. All 10 teams play each other in a single 18-game league — the most gruelling qualification.</li>
        <li><strong>CONCACAF (North/Central America/Caribbean):</strong> Gets 3.5 spots.</li>
        <li><strong>CAF (Africa):</strong> Gets 5 spots for 54 nations.</li>
        <li><strong>AFC (Asia):</strong> Gets 4.5 spots.</li>
        <li><strong>OFC (Oceania):</strong> Gets 0.5 spots via intercontinental playoff.</li>
      </ul>
      <p>
        The host nation qualifies automatically. The remaining 31 (or 47 from 2026) spots are
        distributed through qualification. Many excellent nations — Italy in 2022, USA in 2018
        — have suffered the humiliation of not qualifying at all.
      </p>

      <h2>The Trophy</h2>
      <p>
        The current FIFA World Cup Trophy was created in 1974 after Brazil permanently kept the
        original Jules Rimet Trophy. Made of 18-carat solid gold with a malachite base, it weighs
        6.175 kilograms and stands 36.8 centimetres tall. The design, by Italian sculptor Silvio
        Gazzaniga, depicts two human figures holding up the Earth triumphantly.
      </p>
      <p>
        FIFA rules are strict: only a limited number of people are permitted to touch the original
        trophy, including FIFA officials, past winners, and heads of state. Winning captains may
        lift it during the victory ceremony. All other contact is with gold-plated replicas.
        Lionel Messi is unique in history — he touched the trophy as a losing finalist captain
        in 2014 and then lifted it as a champion in 2022. He is the only person to have touched
        the actual trophy twice in a final capacity.
      </p>

      <h2>Prize Money and Scale</h2>
      <p>
        The 2022 World Cup in Qatar distributed <strong>$440 million</strong> in prize money to
        participating associations. The champion, Argentina, received $42 million. Even teams
        eliminated in the group stage received $9 million — a figure that surpasses the entire
        annual revenue of many smaller football associations.
      </p>
      <p>
        The 2026 World Cup in the United States, Canada, and Mexico will be the largest in history:
        48 teams, 16 host cities (11 in the USA, 3 in Mexico, 2 in Canada), and an anticipated
        5 million tickets sold. It will be the first World Cup across three countries simultaneously.
      </p>

      {/* Records callout */}
      <div className="not-prose my-6 rounded-xl border border-blue-400/30 bg-blue-50/50 p-5 dark:bg-blue-900/10">
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">📊 All-Time World Cup Records</p>
        <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
          <li>• <strong>Top scorer:</strong> Miroslav Klose (Germany) — 16 goals across 4 World Cups</li>
          <li>• <strong>Most titles:</strong> Brazil — 5 World Cup victories</li>
          <li>• <strong>Most appearances:</strong> Brazil — appeared in every single World Cup (22 editions)</li>
          <li>• <strong>Biggest victory:</strong> Hungary 10–1 El Salvador (1982)</li>
          <li>• <strong>Best goalkeeper:</strong> Lev Yashin (USSR) — widely considered the greatest of all time</li>
          <li>• <strong>Most goals in one tournament:</strong> Just Fontaine — 13 goals for France in 1958</li>
        </ul>
      </div>

      <h2>Why It Matters Beyond Football</h2>
      <p>
        The World Cup operates on a level that transcends sport. Host nations experience enormous
        economic and cultural impacts. The 2010 World Cup in South Africa — the first ever held
        on African soil — was a moment of continental pride that no league match could replicate.
        When Senegal qualified for the knockout rounds for the first time in 2002, the country
        declared a public holiday.
      </p>
      <p>
        The World Cup also creates footballers' legacies. Winning it elevates careers to legendary
        status. Pelé won it three times. Cruyff never won it — and that absence colours how his
        story is told. Messi's career narrative was considered incomplete until 2022. No trophy
        in sport carries greater career-defining weight.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="FIFA World Cup" />
    </LessonLayout>
  );
}

