import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "The Number 8 — Box-to-Box Midfielder | Football Academy | TacticSensei",
  description:
    "Learn about the box-to-box midfielder — the No.8 who covers every blade of grass attacking and defending. Famous examples: Steven Gerrard, Frank Lampard, Bryan Robson.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "What does 'box-to-box' mean when describing a midfielder?",
    options: [
      "The midfielder who plays in a square box formation in central midfield",
      "A midfielder who covers the entire pitch — from their own penalty box to the opposition's — in both attacking and defensive phases",
      "A midfielder who specialises in corner kicks and set pieces delivered from the box",
      "A midfielder who only plays in the central channel between the two penalty areas",
    ],
    correctIndex: 1,
    explanation:
      "A box-to-box midfielder covers the full length of the pitch — making defensive tackles and interceptions near their own penalty area, then arriving late into the opposition box to shoot or create. It demands extraordinary stamina and versatility.",
  },
  {
    question: "Steven Gerrard's most famous quality as a box-to-box midfielder was:",
    options: [
      "His positional discipline and ability to stay compact in the defensive structure",
      "His explosive long-range shooting, leadership under pressure, and ability to inspire come-backs",
      "His tiki-taka short passing and ability to recycle possession at high tempo",
      "His goal-scoring from set piece delivery — particularly corners",
    ],
    correctIndex: 1,
    explanation:
      "Gerrard was renowned for his thunderous long-range shooting, his physical energy across the entire pitch, and his leadership in high-pressure moments — particularly his role in Liverpool's legendary 2005 Champions League comeback from 3-0 down against AC Milan.",
  },
  {
    question: "Frank Lampard holds which remarkable scoring record for a central midfielder?",
    options: [
      "Most assists in a single Premier League season by a midfielder",
      "Fastest goal by a midfielder in Champions League history",
      "Most Premier League goals ever scored by a central midfielder — 177 goals",
      "Most consecutive matches scored in from midfield",
    ],
    correctIndex: 2,
    explanation:
      "Frank Lampard scored 177 Premier League goals — a phenomenal tally for a central midfielder. This record underlines how the box-to-box role demands not just physical coverage but genuine goal threat, particularly from late runs into the box.",
  },
  {
    question: "How does the No.8 box-to-box midfielder differ from the No.6 holding midfielder?",
    options: [
      "The No.8 plays exclusively in attack while the No.6 plays exclusively in defence",
      "The No.8 covers the full pitch and contributes significantly in attack, while the No.6 stays deep to screen the defence",
      "The No.8 is typically the captain while the No.6 organises set pieces",
      "The No.8 presses higher than the No.6, who presses from a deeper starting position",
    ],
    correctIndex: 1,
    explanation:
      "The key difference is freedom and range. The No.6 maintains defensive discipline — staying in front of the defence. The No.8 is free to join attacks, make runs into the box, and contribute offensively, while also covering significant defensive ground.",
  },
  {
    question: "Bryan Robson is significant in the history of the No.8 role because:",
    options: [
      "He was the first midfielder to win a European Golden Boot",
      "He pioneered the sweeper-keeper role while playing midfield",
      "He was one of the earliest complete box-to-box midfielders in the modern era, combining physical dominance with scoring and creating for Manchester United and England",
      "He invented the gegenpressing style decades before Klopp popularised it",
    ],
    correctIndex: 2,
    explanation:
      "Bryan Robson — 'Captain Marvel' — was a defining box-to-box midfielder of the 1980s. His combination of tackling, heading, goalscoring, leadership, and physical intensity made him a template that midfielders like Gerrard and Lampard were later measured against.",
  },
];

export default function Number8Page() {
  return (
    <LessonLayout
      moduleSlug="positions"
      lessonSlug="number-8"
      title="The Number 8"
      description="The box-to-box midfielder — covering every blade of grass, contributing to attack and defence with equal intensity."
      readingTime={5}
      difficulty="intermediate"
      emoji="8️⃣"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          The No.8 is the <strong>all-action, complete midfielder</strong> — covering the entire pitch
          from penalty area to penalty area, contributing in both attack and defence with equal intensity.
          They combine the defensive discipline of a No.6 with the attacking ambition of a No.10, making
          them one of football&apos;s most physically demanding and versatile roles.
        </p>
      </div>

      <h2>What Does the No.8 Do?</h2>
      <p>
        The term &quot;box-to-box&quot; describes the range of the midfielder&apos;s work perfectly:
        in one moment they might be making a last-ditch sliding tackle to prevent a goal near their own
        penalty area; sixty seconds later they&apos;re arriving into the opposition box to meet a cross.
        The No.8 must be everywhere at once.
      </p>
      <p>
        Unlike the No.6, who has a specific defensive brief and stays disciplined in front of the
        defence, the No.8 is given freedom to roam. Unlike the No.10, who focuses primarily on
        creation and avoids defensive duties, the No.8 must genuinely contribute at both ends of
        the pitch. The trade-off is that they cover enormous distances — elite box-to-box midfielders
        typically run 12-13 km per match.
      </p>

      {/* Key Skills */}
      <div className="not-prose my-6 rounded-xl border border-blue-400/30 bg-blue-50/50 p-5 dark:bg-blue-900/10">
        <p className="mb-3 text-sm font-bold text-blue-700 dark:text-blue-400">8️⃣ Key Skills Required</p>
        <ul className="space-y-1">
          <li className="text-sm text-foreground-muted">• <strong>Stamina</strong> — Running 12-13 km per match across the entire pitch</li>
          <li className="text-sm text-foreground-muted">• <strong>Shooting</strong> — Arriving late in the box to score, plus long-range efforts</li>
          <li className="text-sm text-foreground-muted">• <strong>Tackling</strong> — Defensive ability to win the ball back in multiple areas of the pitch</li>
          <li className="text-sm text-foreground-muted">• <strong>Passing</strong> — Both short combination and longer switching passes to change the point of attack</li>
          <li className="text-sm text-foreground-muted">• <strong>Timing of runs</strong> — Knowing when to make a late run into the box without getting caught offside</li>
          <li className="text-sm text-foreground-muted">• <strong>Leadership</strong> — Often a team leader who sets the intensity and pace of the game</li>
        </ul>
      </div>

      <h2>The No.8 vs The No.6 vs The No.10</h2>
      <p>
        These three midfield roles form the traditional midfield triangle and it&apos;s important to
        understand how they differ:
      </p>

      {/* Comparison callout */}
      <div className="not-prose my-6 rounded-xl border border-purple-400/30 bg-purple-50/50 p-5 dark:bg-purple-900/10">
        <p className="mb-3 text-sm font-bold text-purple-700 dark:text-purple-400">⚖️ Positional Comparison</p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-base">6️⃣</span>
            <div>
              <p className="text-sm font-semibold text-foreground">No.6 (Holding Midfielder)</p>
              <p className="text-xs text-foreground-muted">Sits deep, protects defence, keeps it simple. Rarely ventures forward.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-base">8️⃣</span>
            <div>
              <p className="text-sm font-semibold text-foreground">No.8 (Box-to-Box Midfielder)</p>
              <p className="text-xs text-foreground-muted">Covers the full pitch. Defends AND attacks. Physical powerhouse. Scores goals.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-base">🔟</span>
            <div>
              <p className="text-sm font-semibold text-foreground">No.10 (Attacking Midfielder)</p>
              <p className="text-xs text-foreground-muted">Creative, technical. Operates between midfield and attack. Creates chances. Less defensive work.</p>
            </div>
          </div>
        </div>
      </div>

      <h2>Famous Examples</h2>

      <h3>Steven Gerrard — Captain Marvel II</h3>
      <p>
        Steven Gerrard may be the archetypal box-to-box midfielder. Technically excellent, physically
        powerful, a thunderous long-range shooter, and a leader who could drag a team through
        impossible situations. His performance in the 2005 Champions League final — Liverpool 3-3 AC
        Milan after being 3-0 down at half-time — is the most dramatic individual performance in
        a major final in living memory. His combination of defensive intensity, goalscoring, and
        emotional leadership define everything a No.8 can be. He spent his entire club career at
        Liverpool, reaching 186 goals — extraordinary for a midfielder.
      </p>

      <h3>Frank Lampard — The Goal Machine in Midfield</h3>
      <p>
        If Gerrard was the emotional engine, Lampard was the metronomic scorer. Playing for Chelsea
        under José Mourinho and Carlo Ancelotti, Lampard became the highest-scoring central midfielder
        in Premier League history — 177 league goals — a record that seems almost impossible for the
        position. His timing of runs into the box, his technique in front of goal, and his
        extraordinary consistency made him a central figure in Chelsea&apos;s most successful decade.
        He won back-to-back Premier League titles in 2004-05 and 2005-06, and was named UEFA Club
        Footballer of the Year in 2005.
      </p>

      <h3>Bryan Robson — The Template</h3>
      <p>
        Captain of Manchester United and England through the 1980s, Robson was nicknamed &quot;Captain
        Marvel&quot; for a reason. He was the complete footballer — powerful, technical, a goalscorer,
        a leader, and someone who made everything around him better. His career was hampered by serious
        injuries (his shoulder alone required 22 operations) but his impact when fit was so immense
        that he is credited as the template on which subsequent generations of English box-to-box
        midfielders were built. Gerrard and Lampard both cited Robson as an influence.
      </p>

      <h2>Common Misconceptions</h2>
      <ul>
        <li>
          <strong>&quot;Box-to-box midfielders are just really fit players who run a lot.&quot;</strong> —
          Stamina is essential, but without tactical intelligence, technical quality, and goal-scoring
          ability, you just have a player who runs a lot but contributes little. The best No.8s are
          technically elite.
        </li>
        <li>
          <strong>&quot;The role is declining in modern football.&quot;</strong> — Modern midfield
          structures often feature a 6 and two 8s, or various hybrid positions. The physical and
          technical demands of the box-to-box midfielder are as relevant as ever — they just might
          be described differently (as &quot;interior midfielders&quot; in positional play systems).
        </li>
        <li>
          <strong>&quot;Gerrard and Lampard were essentially the same player.&quot;</strong> — A common
          oversimplification from the debate about which should play for England. Gerrard was more
          explosive and physical; Lampard was more prolific and precise. Together, ironically, they
          might have been the greatest midfield partnership England never used properly.
        </li>
      </ul>

      <h2>Advanced Understanding</h2>
      <p>
        In modern positional play systems, the box-to-box role has evolved into the concept of{" "}
        <strong>interior midfielders</strong>. In a 4-3-3, the two non-holding midfielders are often
        asked to cut inside from wide starting positions — arriving into the box on late runs from
        deep, rather than attacking down the flanks. This creates numerical overloads in the penalty
        area while maintaining defensive balance.
      </p>
      <p>
        <strong>Press-resistance</strong> is another advanced quality now demanded of No.8s. When
        receiving the ball under pressure, the elite box-to-box midfielder must control quickly,
        turn, and find a forward pass — rather than playing backwards or losing possession. This
        requires exceptional first touch and spatial awareness.
      </p>
      <p>
        Finally, the No.8 must master <strong>diagonal runs</strong>: instead of running straight
        toward the opposition goal, the best box-to-box midfielders arrive into the box from angles —
        cutting across defenders, arriving at the far post, exploiting the space between the central
        defender and the full-back. This is what makes Lampard-style late runs so hard to defend.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="The Number 8" />
    </LessonLayout>
  );
}

