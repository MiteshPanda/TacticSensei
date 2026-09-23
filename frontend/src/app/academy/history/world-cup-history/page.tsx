import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "World Cup History | Football Academy | TacticSensei",
  description:
    "The FIFA World Cup's incredible story — from Uruguay 1930 to Qatar 2022 — featuring the greatest moments, champions, and controversies in tournament history.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which country hosted AND won the first ever FIFA World Cup in 1930?",
    options: ["Brazil", "Argentina", "Uruguay", "Italy"],
    correctIndex: 2,
  },
  {
    question: "Which country has won the most FIFA World Cups, with 5 titles?",
    options: ["Germany", "Argentina", "Italy", "Brazil"],
    correctIndex: 3,
  },
  {
    question: "Maradona's infamous 'Hand of God' goal was scored against which opponent in 1986?",
    options: ["Brazil", "England", "West Germany", "Italy"],
    correctIndex: 1,
  },
  {
    question: "What was the score of Germany's historic victory over Brazil in the 2014 World Cup semi-final?",
    options: ["5–1", "7–0", "7–1", "6–0"],
    correctIndex: 2,
  },
  {
    question: "Brazil won the Jules Rimet Trophy outright after how many World Cup victories?",
    options: ["2", "3", "4", "5"],
    correctIndex: 1,
  },
];

export default function WorldCupHistoryPage() {
  return (
    <LessonLayout
      moduleSlug="history"
      lessonSlug="world-cup-history"
      title="World Cup History"
      description="The greatest tournament on Earth — its origins, winners, and iconic moments."
      readingTime={7}
      difficulty="beginner"
      emoji="🏆"
    >
      {/* Opening hook */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="text-lg font-bold text-accent mb-2">The Tournament That Stops the World</h2>
        <p className="text-foreground">
          Every four years, the planet holds its breath. The FIFA World Cup is the most watched
          sporting event in human history — 3.5 billion people tuned in for the 2018 Final alone.
          Wars have paused for it. Economies slow during it. It is the only sporting event that
          can genuinely claim to unite all of humanity, for one month, in a single shared experience.
        </p>
      </div>

      <h2>The Birth of the World Cup (1930)</h2>
      <p>
        The World Cup's origins lie in a simple frustration: Olympic football was dominated by
        amateurs, and FIFA wanted a competition for professional players. French FIFA president
        Jules Rimet championed the idea, and in 1930, Uruguay — celebrating its centenary of
        independence and already the reigning Olympic champions — became the first host nation.
      </p>
      <p>
        Thirteen teams made the journey to Montevideo, with most Europeans reluctant to travel
        the two-week boat voyage. Four European teams attended: France, Belgium, Romania, and
        Yugoslavia. Uruguay beat Argentina 4–2 in the final in front of 68,000 passionate fans
        at the newly built Estadio Centenario. A new sporting tradition was born.
      </p>

      {/* Champions timeline */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">🏆 All-Time World Cup Champions</p>
        <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
          <li>• <strong>Brazil:</strong> 1958, 1962, 1970, 1994, 2002 — <em>5 titles</em></li>
          <li>• <strong>Germany/West Germany:</strong> 1954, 1974, 1990, 2014 — <em>4 titles</em></li>
          <li>• <strong>Italy:</strong> 1934, 1938, 1982, 2006 — <em>4 titles</em></li>
          <li>• <strong>Argentina:</strong> 1978, 1986, 2022 — <em>3 titles</em></li>
          <li>• <strong>France:</strong> 1998, 2018 — <em>2 titles</em></li>
          <li>• <strong>Uruguay:</strong> 1930, 1950 — <em>2 titles</em></li>
          <li>• <strong>England, Spain:</strong> 1 title each</li>
        </ul>
      </div>

      <h2>The Two Trophies</h2>
      <p>
        The original World Cup trophy was called the Jules Rimet Trophy, named after FIFA's visionary
        president. It was a gold-plated statue of Nike (the goddess of victory). Brazil won it
        in 1958, 1962, and 1970 — and as the rules allowed a team that won three times to keep
        the trophy permanently, Brazil took it home to Rio forever. Tragically, it was stolen
        from the Brazilian Football Confederation's offices in 1983 and was never recovered.
      </p>
      <p>
        For the 1974 tournament, a new trophy was commissioned — the FIFA World Cup Trophy we
        know today. Made of 18-carat gold with a malachite base, weighing 6.1 kilograms and
        standing 36.8 centimetres tall, it depicts two human figures holding up the Earth. Only
        FIFA members and World Cup winners are permitted to touch the original. Everyone else
        gets a replica.
      </p>

      <h2>Most Successful Nations</h2>
      <p>
        Brazil's dominance is unmatched. They are the only nation to have appeared in every
        single World Cup (22 tournaments as of 2022), and their 1970 side is widely considered
        the greatest international team ever assembled. Germany's efficiency — clinical, organised,
        relentless — has delivered four titles across different eras. Italy's tactical mastery
        gave them four titles in four different decades spanning 1934 to 2006.
      </p>
      <p>
        Argentina's story is deeply human. Maradona carried them to glory in 1986 on sheer 
        individual brilliance. Then, 36 agonising years later in Qatar 2022, Lionel Messi — 
        arguably the greatest player ever — finally completed his story with the trophy he had
        always been destined to hold.
      </p>

      <h2>Iconic Moments That Defined the Tournament</h2>

      <h2>Maradona's Hand of God (1986)</h2>
      <p>
        In the quarter-final against England, Diego Maradona scored two goals within four minutes
        that encapsulated everything great and controversial about the game. The first: he punched
        the ball into the net with his left hand, and the referee didn't see it. "It was a little
        of the hand of God, a little of the head of Maradona," he said afterwards with a mischievous
        grin. Four minutes later, he picked up the ball in his own half and dribbled past five
        England players to score what FIFA voted the Goal of the Century. In a single game, one
        man produced the most controversial goal and the greatest goal in World Cup history.
      </p>

      <h2>Zidane's Headbutt (2006)</h2>
      <p>
        The 2006 Final between France and Italy was decided in extra time — not by a goal, but by
        an extraordinary act of madness. With 10 minutes left, Zinedine Zidane — the best player
        of his generation, playing his last ever professional match — headbutted Italian defender
        Marco Materazzi in the chest in response to a verbal provocation. He was sent off. France
        lost the penalty shootout. Zidane's glittering career ended with him walking past the
        trophy he would never touch.
      </p>

      <h2>Germany 7–1 Brazil (2014)</h2>
      <p>
        The Mineirão stadium in Belo Horizonte hosted what many consider the most shocking result
        in football history. Brazil, the hosts, without their injured star Neymar, collapsed
        spectacularly against Germany in the semi-final. Germany scored five goals in eighteen
        first-half minutes. The Brazilian crowd fell silent in disbelief. Final score: 7–1.
        In Brazil. Against Brazil. The match is now known in Brazil simply as "the Mineirazo" —
        a disaster so devastating it has its own name.
      </p>

      {/* Key fact callout */}
      <div className="not-prose my-6 rounded-xl border border-rose-400/30 bg-rose-50/50 p-5 dark:bg-rose-900/10">
        <p className="text-sm font-semibold text-rose-700 dark:text-rose-400">🤯 Did You Know?</p>
        <p className="mt-2 text-sm text-foreground-muted">
          In the 2014 semi-final, Germany scored five goals in the 18-minute window from the 
          23rd to the 29th minute alone. Brazil's goalkeeper Júlio César conceded 7 goals on 
          home soil. The match is statistically the biggest defeat of a host nation in World 
          Cup semi-final history.
        </p>
      </div>

      <h2>Argentina Ends the Wait — Qatar 2022</h2>
      <p>
        Few moments in sporting history carry as much emotional weight as Argentina's 2022 triumph.
        Led by Lionel Messi at age 35, in what everyone knew would be his last World Cup, 
        Argentina beat France in a final for the ages. Trailing 3–2 in extra time, France equalised
        to force penalties. Argentina prevailed 4–2 on spot kicks. When Messi lifted the trophy,
        grown men wept across South America. It was his moment. It was football's moment.
      </p>

      <h2>The Greatest World Cups</h2>
      <p>
        Debate about the greatest World Cup is intense among historians. The <strong>1970 tournament</strong>
        in Mexico features most frequently — Pelé's Brazil played arguably the most beautiful football
        ever seen at a World Cup, with a team including Jairzinho, Rivelino, and Carlos Alberto.
        The <strong>1986 tournament</strong> in Mexico was Maradona's personal masterpiece. He seemed to
        drag Argentina to the title through force of individual will, with a broken bone in his foot
        and an entire opposing team's attention focused on stopping him.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="World Cup History" />
    </LessonLayout>
  );
}

