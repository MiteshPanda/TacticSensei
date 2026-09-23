import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "Midfielder | Football Academy | TacticSensei",
  description:
    "Learn about the midfield engine room — defensive midfielders, central midfielders, and attacking midfielders. Famous examples: Xavi, Iniesta, Kanté, De Bruyne.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "Why is midfield often referred to as the 'engine room' of a football team?",
    options: [
      "Because midfielders run the furthest distance in a match",
      "Because midfield controls the transition between defence and attack and dictates the game's tempo",
      "Because midfielders score the most goals",
      "Because the midfield is physically the largest zone on the pitch",
    ],
    correctIndex: 1,
    explanation:
      "Midfield is where games are won and lost. Midfielders control the tempo, win possession, distribute the ball, and connect the defensive and attacking phases — making them central to everything a team does.",
  },
  {
    question: "Which midfielder is most famous for revolutionising the defensive midfield role — known as 'the water carrier' by Zidane?",
    options: ["Xavi Hernández", "N'Golo Kanté", "Claude Makélélé", "Patrick Vieira"],
    correctIndex: 2,
    explanation:
      "Claude Makélélé, who played for Real Madrid and Chelsea, became so important that his role was named after him: the 'Makélélé role'. Zinedine Zidane called him 'the water carrier' — the one who does the unglamorous work that makes everyone else shine.",
  },
  {
    question: "Kevin De Bruyne is considered an elite midfielder primarily because of which quality?",
    options: [
      "His defensive work rate and ball-winning ability",
      "His vision, passing range, and ability to create chances from deep positions",
      "His physicality and winning aerial duels",
      "His dribbling past multiple opponents",
    ],
    correctIndex: 1,
    explanation:
      "Kevin De Bruyne is a world-class central/attacking midfielder renowned for his extraordinary vision and passing — both short combination play and precise long-range balls that cut defences open.",
  },
  {
    question: "What does a 'holding midfielder' primarily do?",
    options: [
      "Hold the ball and dribble past defenders",
      "Sit in front of the defence to break up attacks and screen the back four",
      "Hold their position wide on the flank",
      "Hold set-piece routines and deliver corners",
    ],
    correctIndex: 1,
    explanation:
      "A holding midfielder (also called a defensive midfielder or number 6) sits deep in front of the defence, intercepting passes, winning duels, and shielding the back four from attack.",
  },
  {
    question: "Xavi Hernández and Andrés Iniesta were the heartbeat of which legendary team that dominated international football?",
    options: [
      "France, 1998 World Cup winners",
      "Brazil, 2002 World Cup winners",
      "Spain national team, winning Euro 2008, World Cup 2010, and Euro 2012",
      "Germany, 2014 World Cup winners",
    ],
    correctIndex: 2,
    explanation:
      "Xavi and Iniesta were the midfield engine of the Spanish national team that achieved an unprecedented treble: Euro 2008, World Cup 2010, and Euro 2012. Their tiki-taka passing game (also deployed at Barcelona) changed football.",
  },
];

export default function MidfielderPage() {
  return (
    <LessonLayout
      moduleSlug="positions"
      lessonSlug="midfielder"
      title="Midfielder"
      description="The engine room of football — winning the ball, keeping possession, and linking defence to attack."
      readingTime={5}
      difficulty="beginner"
      emoji="⚙️"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          Midfielders operate in the central zone between defence and attack. Their job is to{" "}
          <strong>win the ball, keep it, and use it intelligently</strong>. They are the link between
          defending and scoring — and in most formations, there are more midfielders on the pitch than
          players from any other group.
        </p>
      </div>

      <h2>What Does a Midfielder Do?</h2>
      <p>
        If defenders protect and attackers score, then midfielders do <em>everything in between</em>. A
        midfielder might need to sprint back to make a last-ditch tackle, then immediately play a precise
        through ball to release a forward, then overlap into the box to shoot — all within 60 seconds.
        The midfield is where the game is decided: whichever team controls midfield usually controls
        the match.
      </p>
      <p>
        There are several types of midfielders, each with different responsibilities. This lesson gives
        you an overview. We cover the specialist roles (the No.6, No.8, and No.10) in separate, deeper
        lessons.
      </p>

      {/* Key Skills */}
      <div className="not-prose my-6 rounded-xl border border-blue-400/30 bg-blue-50/50 p-5 dark:bg-blue-900/10">
        <p className="mb-3 text-sm font-bold text-blue-700 dark:text-blue-400">⚙️ Key Skills Required</p>
        <ul className="space-y-1">
          <li className="text-sm text-foreground-muted">• <strong>Passing</strong> — Short, incisive passes to keep possession; long balls to switch play</li>
          <li className="text-sm text-foreground-muted">• <strong>Vision</strong> — Seeing options before receiving the ball; anticipating where teammates will run</li>
          <li className="text-sm text-foreground-muted">• <strong>Stamina</strong> — Box-to-box midfielders cover 11–13 km per match</li>
          <li className="text-sm text-foreground-muted">• <strong>Ball-winning</strong> — Tackling, intercepting, and pressuring opponents effectively</li>
          <li className="text-sm text-foreground-muted">• <strong>Technique</strong> — First touch under pressure, turning in tight spaces</li>
          <li className="text-sm text-foreground-muted">• <strong>Positioning</strong> — Finding pockets of space between defensive and midfield lines</li>
        </ul>
      </div>

      <h2>The Three Types of Midfielders</h2>

      <h3>1. Defensive Midfielder (DM / No.6)</h3>
      <p>
        Sits deepest in midfield, in front of the defence. Primary job is <strong>winning the ball
        back</strong> and preventing the opposition from playing through the middle. Often called the
        &quot;holding midfielder,&quot; &quot;anchor man,&quot; or simply &quot;the 6.&quot; We explore
        this role in full detail in the <strong>Number 6</strong> lesson.
      </p>

      <h3>2. Central Midfielder (CM / No.8)</h3>
      <p>
        The all-rounder of the midfield. Central midfielders can go forward to support attacks and
        track back to help defensively. They cover huge distances each match, combining physical
        endurance with technical quality. We explore this in the <strong>Number 8</strong> lesson.
      </p>

      <h3>3. Attacking Midfielder (AM / No.10)</h3>
      <p>
        Operates between midfield and attack. Their job is to <strong>create chances</strong> — with
        through balls, dribbles, and clever movement that breaks defensive lines. Often the most
        technically gifted player on the team. The <strong>Number 10</strong> lesson covers this iconic role.
      </p>

      {/* Formation callout */}
      <div className="not-prose my-6 rounded-xl border border-green-400/30 bg-green-50/50 p-5 dark:bg-green-900/10">
        <p className="mb-2 text-sm font-bold text-green-700 dark:text-green-400">📐 Formation Note</p>
        <p className="text-sm text-foreground-muted">
          A 4-3-3 uses one DM and two CMs. A 4-2-3-1 uses two DMs and one AM. A 4-4-2 uses four midfielders
          in a flat line. The number and type of midfielders is the primary way managers shape how a team
          plays — which is why understanding midfield roles is central to understanding tactics.
        </p>
      </div>

      <h2>Famous Examples</h2>

      <h3>Xavi Hernández — The Metronome</h3>
      <p>
        Xavi is widely considered one of the greatest midfielders of all time. Playing for Barcelona and
        Spain, he was the heartbeat of the <strong>tiki-taka</strong> era — a style of football built on
        rapid short passing and relentless possession. Xavi could receive the ball in any situation, control
        it instantly, and deliver it accurately under enormous pressure. He rarely wasted possession — not
        because he played safe, but because his technical mastery and positioning made the simple pass
        always available.
      </p>

      <h3>Andrés Iniesta — The Ghost in the Machine</h3>
      <p>
        Iniesta was Xavi&apos;s partner at Barcelona and Spain, and where Xavi was the metronome, Iniesta
        was the dribbler — the player who could ghost past opponents in tight spaces and manufacture chances
        from nothing. He scored the winning goal in the 2010 World Cup final, one of the most iconic moments
        in tournament history. His late runs into the box from deep midfield made him uniquely dangerous.
      </p>

      <h3>N&apos;Golo Kanté — The Anomaly</h3>
      <p>
        Kanté&apos;s rise from Caen&apos;s second division to back-to-back Premier League titles and a
        World Cup winner is football&apos;s greatest underdog story. He doesn&apos;t score many goals or
        produce spectacular moments — instead, he is simply <em>everywhere</em>. His ability to intercept
        passes, win tackles, and quickly recycle possession makes him one of the most influential players
        of the last decade. Leicester City won their miracle title in 2015-16 largely because Kanté won
        the ball back more times than most teams&apos; entire midfields combined.
      </p>

      <h3>Kevin De Bruyne — The Modern Creative Engine</h3>
      <p>
        Playing in a deeper role than a classic No.10 but with all the creativity of one, De Bruyne has
        redefined what a central midfielder can offer. His passing range is extraordinary — both precise
        short combinations and arrowing long balls into the channels. He&apos;s broken the Premier League
        assist record and led Manchester City to multiple titles under Pep Guardiola, despite often being
        asked to play a less glamorous central role than his talent might suggest.
      </p>

      <h2>Common Misconceptions</h2>
      <ul>
        <li>
          <strong>&quot;Midfielders don&apos;t score enough goals.&quot;</strong> — Frank Lampard scored
          over 177 Premier League goals from midfield. Goals from deep are one of football&apos;s most
          valuable weapons.
        </li>
        <li>
          <strong>&quot;A midfielder just passes the ball around.&quot;</strong> — Midfielders are
          involved in virtually every tactical action: pressing, covering, dribbling, shooting, setting
          the tempo. They are the most multi-dimensional position.
        </li>
        <li>
          <strong>&quot;All midfielders do the same thing.&quot;</strong> — The spectrum from a
          Claude Makélélé-style destroyer to a Zinedine Zidane-style creator is enormous, even though
          both play &quot;in midfield.&quot;
        </li>
      </ul>

      <h2>Advanced Understanding</h2>
      <p>
        Modern football has increasingly moved toward <strong>midfield compactness</strong> — using two or
        three midfielders who stay very close together, creating a dense block in the middle of the pitch
        that is hard to play through. Teams like Atletico Madrid under Diego Simeone are masters of this.
      </p>
      <p>
        Alternatively, teams like Manchester City under Guardiola use <strong>positional play</strong> —
        midfielders constantly seeking space between lines, drawing opponents out of position and creating
        passing angles. It requires enormous positional intelligence from every midfielder.
      </p>
      <p>
        <strong>Transitions</strong> are where modern midfielders are tested most: the few seconds
        immediately after a team wins or loses possession. The best midfielders press instantly when the
        ball is lost, and find the right pass immediately when it&apos;s won. This TRANSITION phase is
        where matches are most often decided.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="Midfielder" />
    </LessonLayout>
  );
}

