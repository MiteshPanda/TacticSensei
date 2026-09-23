import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "How Tactics Evolved | Football Academy | TacticSensei",
  description:
    "From the 2-3-5 Pyramid to Tiki-Taka and Gegenpressing — how football's tactical ideas evolved over 120 years and continue to shape the modern game.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "What was the original dominant formation in early 20th century football, featuring many attackers?",
    options: ["4-4-2", "WM formation", "The Pyramid (2-3-5)", "Catenaccio"],
    correctIndex: 2,
  },
  {
    question: "Which Arsenal manager developed the WM formation in the 1920s following the offside law change?",
    options: ["Don Howe", "Herbert Chapman", "Bertie Mee", "George Graham"],
    correctIndex: 1,
  },
  {
    question: "The term 'Catenaccio' — an extreme defensive system prominent in Italian football — roughly translates to what?",
    options: ["The Chain", "The Wall", "The Lock", "The Shield"],
    correctIndex: 2,
  },
  {
    question: "Total Football was developed by which Dutch coach, and implemented at Ajax in the early 1970s?",
    options: ["Johan Cruyff", "Louis van Gaal", "Rinus Michels", "Dick Advocaat"],
    correctIndex: 2,
  },
  {
    question: "Which coaching philosophy, associated with Jürgen Klopp, emphasises immediately pressing opponents after losing the ball?",
    options: ["Tiki-Taka", "Positional Play", "Gegenpressing", "Catenaccio"],
    correctIndex: 2,
  },
];

export default function TacticalEvolutionPage() {
  return (
    <LessonLayout
      moduleSlug="history"
      lessonSlug="tactical-evolution"
      title="How Tactics Evolved"
      description="From WM formation to Total Football to Gegenpressing — how ideas changed the game."
      readingTime={8}
      difficulty="intermediate"
      emoji="🔄"
    >
      {/* Opening hook */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="text-lg font-bold text-accent mb-2">Every Era Builds on the Previous One</h2>
        <p className="text-foreground">
          Football tactics are not invented in isolation — they are responses. Catenaccio emerged
          to stop the rampant attackers. Total Football emerged to confuse fixed defensive systems.
          Gegenpressing emerged to exploit the disorganisation created by possession-based systems.
          Understanding tactical history is understanding a 120-year conversation between coaches.
        </p>
      </div>

      <h2>1900s–1920s: The Pyramid (2-3-5)</h2>
      <p>
        The earliest organised football used a formation now called "The Pyramid" — two defenders,
        three midfielders, and five forwards. In modern notation: 2-3-5. By today's standards,
        this would be suicidal — leaving two defenders to deal with constant counter-attacks.
        But in early football, the offside rule required three opponents between an attacker and
        the goal. This made it very difficult to get caught offside, so attacking freely was safe.
      </p>
      <p>
        The result was high-scoring, chaotic football. The concept of "defending" as a primary
        role barely existed. Wing-forwards operated along the touchline and crossed for centre-forwards
        who occupied central positions. Games of 5–4 and 6–3 were common.
      </p>

      {/* Timeline callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">📅 Tactical Timeline</p>
        <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
          <li>• <strong>1900s–1920s:</strong> The Pyramid (2-3-5) — attack-heavy, goalscoring era</li>
          <li>• <strong>1925:</strong> Offside law change triggers defensive thinking</li>
          <li>• <strong>1930s:</strong> Herbert Chapman's WM formation at Arsenal</li>
          <li>• <strong>1950s:</strong> Hungarian innovation — flexible, fluid positions</li>
          <li>• <strong>1960s:</strong> Catenaccio dominates Italian football (Grande Inter)</li>
          <li>• <strong>1970s:</strong> Total Football — Ajax and Netherlands revolutionise the game</li>
          <li>• <strong>1980s:</strong> Sacchi's pressing and zonal marking at AC Milan</li>
          <li>• <strong>2000s:</strong> Tiki-Taka emerges at Barcelona</li>
          <li>• <strong>2010s:</strong> Gegenpressing (Klopp) and Positional Play (Guardiola) dominate</li>
          <li>• <strong>2020s:</strong> High defensive lines, hybrid formations, data analytics</li>
        </ul>
      </div>

      <h2>1925: The Offside Law Changes Everything</h2>
      <p>
        In 1925, the Football Association changed the offside rule: instead of requiring three
        opponents between an attacker and goal, now only two were needed (including the goalkeeper).
        This seemingly small change had enormous consequences. Suddenly it was much easier to
        play attacking forwards onside, and goals flooded in across English football.
      </p>
      <p>
        Clubs scrambled to find a defensive solution. The answer came from Herbert Chapman at
        Arsenal: pull one of the three midfielders back to play as a third central defender,
        creating a new shape. When drawn on a tactical board, it looked like a "W" for the
        attackers and an "M" for the defence — thus, the WM formation was born.
      </p>

      <h2>The WM Formation — Herbert Chapman's Revolution</h2>
      <p>
        Herbert Chapman is one of football's great tactical innovators. At Arsenal in the late
        1920s and early 1930s (and before that at Huddersfield Town), he built teams around the
        WM — a 3-2-2-3 in modern parlance — and dominated English football. Arsenal won the
        First Division five times between 1931 and 1938.
      </p>
      <p>
        Chapman's innovations went beyond formation: he introduced numbered shirts, floodlights,
        a clock at Highbury, and team meetings to study opponents. He was arguably the first
        "modern" football manager. The WM formation became so widespread that it remained
        football's dominant system for the next two decades.
      </p>

      <h2>1950s: Hungary's Spatial Revolution</h2>
      <p>
        Gusztáv Sebes's Hungary did not invent a new formation so much as break the rigid positional
        rules that everyone else followed. Their nominal centre-forward, Nándor Hidegkuti, dropped
        deep to receive the ball in midfield — creating space for the two inside forwards, Puskás
        and Kocsis, to run into.
      </p>
      <p>
        England's defenders in the famous 6–3 Wembley defeat had no idea whether to follow
        Hidegkuti into midfield (leaving central defensive space exposed) or stay and let him
        receive the ball freely. This was the birth of the deep-lying forward concept — an idea
        that would eventually evolve into the "false nine" used by Messi at Barcelona 50 years later.
      </p>

      <h2>1960s: Catenaccio — Defence as an Art Form</h2>
      <p>
        Italy's response to the free-scoring 1950s was Catenaccio — literally "door bolt" or "lock"
        in Italian. The system placed an extra sweeper (libero) behind the defensive line to cover
        any mistake. The result was an almost impenetrable defensive structure.
      </p>
      <p>
        The master was Helenio Herrera at Inter Milan — his "Grande Inter" won three Serie A
        titles and two European Cups in the 1960s by grinding out 1–0 victories with suffocating
        defensive organisation and rapid counter-attacks. Critics called it boring. Supporters
        called it brilliant. The debate about defensive versus attacking football began here and
        has never ended.
      </p>

      <h2>1970s: Total Football — Every Player Everywhere</h2>
      <p>
        Rinus Michels at Ajax, and later the Netherlands national team, invented the most radical
        idea in football history: what if positions were merely starting points rather than fixed
        roles? In "Total Football," every outfield player could and should occupy any position on
        the pitch. When a left-back advanced, a midfielder dropped to cover. When a striker
        dropped deep, an overlapping midfielder ran into the space.
      </p>
      <p>
        The system demanded exceptional technical quality and spatial awareness from all players —
        and Ajax had them in abundance. Johan Cruyff was the living embodiment: he could play
        anywhere and frequently did. The 1974 Netherlands — who lost the World Cup Final despite
        being the best team — played Cruyff's brilliant, expressive Total Football and lost only
        to a German team that were willing to be less beautiful but more efficient.
      </p>

      <h2>1980s: Sacchi's Pressing System</h2>
      <p>
        Arrigo Sacchi had never played professional football. Yet he persuaded AC Milan's president
        Silvio Berlusconi to hire him, then proceeded to produce arguably the greatest club team
        of all time. Sacchi's innovation was organised, high-tempo pressing combined with zonal
        marking — his defensive line pushed high, compressing space, and the whole team pressed
        together as a unit when they lost the ball.
      </p>
      <p>
        This was the forerunner of modern pressing systems. Sacchi demanded that his defenders
        stay 25 metres from their own goal even when defending — revolutionary and terrifying for
        players trained in catenaccio traditions. His Milan won back-to-back European Cups in
        1989–90 and transformed how coaches thought about defensive organization.
      </p>

      <h2>2000s: Tiki-Taka Emerges</h2>
      <p>
        When Pep Guardiola took over Barcelona in 2008, he built on the philosophy that had been
        developed at La Masia for decades — pass, move, pass, move. But he added intensity and
        pressing after losing possession, turning it into a complete system. Tiki-Taka meant
        controlling the ball so thoroughly that opponents rarely had it, and when they did,
        Barcelona immediately won it back.
      </p>
      <p>
        With Xavi and Iniesta controlling the tempo, and Messi as the unpredictable genius who
        could end a sequence of 40 passes with a dribble and shot, Barcelona dominated European
        football from 2008 to 2012 and won the 2010 World Cup with a Spain side built on the
        same principles.
      </p>

      <h2>2010s: Gegenpressing and the Positional War</h2>
      <p>
        Jürgen Klopp's response to Tiki-Taka was characteristically German: attack it. Gegenpressing
        (counter-pressing) says: the best moment to win the ball back is in the 5 seconds
        immediately after you lose it, because the opponent hasn't yet organised themselves. Press
        immediately, aggressively, with the entire team. If it works, you win the ball in a
        dangerous area. If it doesn't, track back.
      </p>
      <p>
        Klopp's Borussia Dortmund (2011 Bundesliga champions) and later Liverpool (2020 Premier
        League champions) proved Gegenpressing at the highest level. Meanwhile, Guardiola
        developed "Positional Play" at Bayern Munich and Manchester City — a more patient,
        space-oriented system that sought to create numerical superiority in key zones.
        The tactical conversation between Guardiola and Klopp became football's defining debate
        of the 2010s.
      </p>

      <h2>2020s: The Age of Hybrids</h2>
      <p>
        Modern football has become increasingly difficult to categorise into single formations.
        Teams shift between 4-3-3 and 4-2-3-1 in possession and out of possession. Wing-backs
        tuck inside to create midfield triangles. Forwards press from the front while defenders
        push a high defensive line. Data analytics now inform every decision — expected goals,
        pressing intensity metrics, and spatial analysis that would have been science fiction
        to Herbert Chapman.
      </p>
      <p>
        The game has never been more tactically sophisticated — or more interesting to analyse.
        And the conversation continues: every new great manager adds a new idea to the ongoing
        dialogue that started with two defenders and five forwards on a muddy Victorian pitch.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="How Tactics Evolved" />
    </LessonLayout>
  );
}

