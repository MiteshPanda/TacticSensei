import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "Origins of Football | Football Academy | TacticSensei",
  description:
    "How football was born in Victorian England, codified in 1863, and spread across the entire world to become the most popular sport on the planet.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "In what year was the Football Association (FA) founded, officially codifying the rules of football?",
    options: ["1848", "1857", "1863", "1872"],
    correctIndex: 2,
  },
  {
    question: "Which is considered the world's oldest football club, still in existence today?",
    options: ["Arsenal FC", "Sheffield FC", "Notts County", "Cambridge United"],
    correctIndex: 1,
  },
  {
    question: "What was the result of the very first international football match in 1872?",
    options: ["England 1–0 Scotland", "Scotland 0–0 England", "England 3–0 Scotland", "Scotland 2–1 England"],
    correctIndex: 1,
  },
  {
    question: "What was the name of the first written set of football rules, established at Cambridge University in 1848?",
    options: ["The London Rules", "The Sheffield Rules", "The Cambridge Rules", "The FA Charter"],
    correctIndex: 2,
  },
  {
    question: "In what year was FIFA (Fédération Internationale de Football Association) founded?",
    options: ["1888", "1896", "1904", "1912"],
    correctIndex: 2,
  },
];

export default function OriginsPage() {
  return (
    <LessonLayout
      moduleSlug="history"
      lessonSlug="origins"
      title="Origins of Football"
      description="How the beautiful game was born in England and spread around the world."
      readingTime={5}
      difficulty="beginner"
      emoji="🌍"
    >
      {/* Opening hook */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="text-lg font-bold text-accent mb-2">From Mob Sport to Global Religion</h2>
        <p className="text-foreground">
          Before football had rules, goals, or referees, it was chaos — entire medieval villages
          chasing an inflated pig's bladder through streets and fields, with no time limit and
          virtually no restrictions on violence. From that wild beginning, one tiny island nation
          would create the most beloved game in human history.
        </p>
      </div>

      <h2>Medieval Folk Football</h2>
      <p>
        Long before the Victorian era gave us organised sport, football already existed in a raw,
        unrecognisable form. Medieval folk football was played across England from at least the
        12th century. Towns would play against each other using a ball made from an inflated
        animal bladder, with hundreds of players on each side and goals sometimes miles apart.
        Shrove Tuesday was a particularly popular day for these contests — and injuries were
        common enough that the sport was banned by multiple English kings, including Edward II
        in 1314.
      </p>
      <p>
        These games had almost no rules. The "pitch" was the town itself. Games could last all day.
        Despite repeated royal bans, the people never stopped playing. Football was deeply embedded
        in English culture long before anyone tried to tame it.
      </p>

      {/* Timeline callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">📅 Key Timeline</p>
        <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
          <li>• <strong>1314:</strong> King Edward II bans football in London</li>
          <li>• <strong>1848:</strong> Cambridge Rules — first written football rules</li>
          <li>• <strong>1857:</strong> Sheffield FC founded — oldest surviving football club</li>
          <li>• <strong>1863:</strong> Football Association (FA) founded in London — modern football is born</li>
          <li>• <strong>1872:</strong> First international match — Scotland 0–0 England in Glasgow</li>
          <li>• <strong>1888:</strong> Football League founded — first professional league</li>
          <li>• <strong>1904:</strong> FIFA founded in Paris with 7 founding nations</li>
          <li>• <strong>1930:</strong> First FIFA World Cup held in Uruguay</li>
        </ul>
      </div>

      <h2>The Cambridge Rules (1848)</h2>
      <p>
        The turning point came not in a smoky pub or a Parliament chamber, but in a tree. In 1848,
        students at Cambridge University spent several hours under the shade of a large tree on
        Parker's Piece, negotiating a common set of rules that clubs with different traditions
        could agree upon. The Cambridge Rules prohibited hacking (kicking opponents) and handling
        the ball — two innovations that separated what would become football from what would become
        rugby.
      </p>
      <p>
        These rules weren't perfect, but they were a start. They proved that people from different
        schools could agree on a framework, which planted the seed for what came next.
      </p>

      <h2>Sheffield FC and the World's Oldest Club (1857)</h2>
      <p>
        In 1857, two former pupils of Sheffield Collegiate School — Nathaniel Creswick and William
        Prest — formed Sheffield FC. It is officially recognised by FIFA and the Football Association
        as the world's oldest football club. Sheffield played by their own rules (the Sheffield
        Rules) which were slightly different from Cambridge, but the club helped establish the idea
        that football was a game for organised clubs, not just ad hoc village contests.
      </p>

      <h2>1863: Football is Born</h2>
      <p>
        The pivotal moment arrived on 26 October 1863 at the Freemasons' Tavern in London. 
        Representatives from eleven London clubs gathered to form the Football Association — the
        world's first governing body for football. Over the following weeks, they thrashed out
        the Laws of the Game. The crucial debate: should "hacking" (kicking opponents' shins)
        be allowed? Those who said yes walked out and went on to form rugby. Those who said no
        created football as we know it.
      </p>
      <p>
        The FA's first rulebook was 13 laws long. Today's Laws of the Game are still rooted in
        those 1863 foundations — a remarkable piece of sporting continuity.
      </p>

      <h2>Why England? The Industrial Revolution's Role</h2>
      <p>
        Football's codification in England wasn't an accident. The Industrial Revolution created
        a new urban working class with set work hours, railways to travel to away games, and
        public schools where elite pupils needed organised recreation. Public schools like Eton,
        Harrow, and Rugby each had their own football variants — and when pupils left for
        university or the workforce, they wanted to keep playing. The pressure to agree on
        shared rules became irresistible.
      </p>

      <h2>How Football Conquered the World</h2>
      <p>
        The spread of football is one of history's great cultural stories. Britain's position as
        the world's greatest trading and colonial power in the late 19th century meant British
        sailors, merchants, railway workers, and soldiers carried football to every continent.
      </p>
      <ul>
        <li><strong>South America:</strong> British workers building railways and ports in Argentina and Brazil introduced football in the 1880s. Within decades, Buenos Aires had dozens of clubs.</li>
        <li><strong>Europe:</strong> British expatriates formed the first clubs in Spain, Italy, and Germany — many of today's great clubs have founding stories involving Englishmen.</li>
        <li><strong>Africa and Asia:</strong> Colonial relationships spread the game further, particularly through schools and military barracks.</li>
      </ul>
      <p>
        By 1904, football was global enough that FIFA was founded in Paris with seven founding
        members: France, Belgium, Denmark, Netherlands, Spain, Sweden, and Switzerland. England
        initially refused to join — a typical piece of British sporting arrogance — but eventually
        became a member in 1905.
      </p>

      {/* FIFA callout */}
      <div className="not-prose my-6 rounded-xl border border-blue-400/30 bg-blue-50/50 p-5 dark:bg-blue-900/10">
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">🌍 A Truly Global Game</p>
        <p className="mt-2 text-sm text-foreground-muted">
          Today, FIFA has <strong>211 member associations</strong> — more than the United Nations has 
          member states (193). Football is played in every country on earth, by an estimated 
          <strong> 265 million players</strong>. The game born in English public schools now belongs to the world.
        </p>
      </div>

      <h2>The First International Match (1872)</h2>
      <p>
        On 30 November 1872, Scotland and England played the first officially recognised
        international football match at Hamilton Crescent in Glasgow. The result was 0–0. 
        Around 4,000 spectators watched. It was a small, cold, goalless game — but it was the
        spark that ignited international football. Every World Cup final, every EURO clash, every
        Copa América showdown traces its lineage back to that muddy Glasgow afternoon.
      </p>
      <p>
        England and Scotland would play each other annually from that point, making the
        England–Scotland fixture the world's oldest international football rivalry — one that 
        continues today.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="Origins of Football" />
    </LessonLayout>
  );
}

