import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "Free Kicks Explained | Football Academy | TacticSensei",
  description:
    "Learn the difference between direct and indirect free kicks in football, how the defensive wall works, set-piece tactics, and famous free kicks like Roberto Carlos's banana kick.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the minimum distance a defensive wall must stand from the ball at a free kick?",
    options: ["5 metres", "7.32 metres", "9.15 metres (10 yards)", "11 metres"],
    correctIndex: 2,
    explanation:
      "Defending players must stand at least 9.15 metres (10 yards) from the ball until it is kicked. The referee marks this distance, and encroaching into the wall before the kick is punishable with a yellow card. This is why referees pace out the distance and sometimes use vanishing spray.",
  },
  {
    question: "Can a goal be scored directly from an indirect free kick?",
    options: [
      "Yes, if it goes in with enough power",
      "No — the ball must touch another player before a goal can count",
      "Yes, but only if the kick is taken within 20 metres of goal",
      "Only if the goalkeeper touches it first",
    ],
    correctIndex: 1,
    explanation:
      "A goal cannot be scored directly from an indirect free kick. The ball must be touched by at least one other player (from either team) before crossing the goal line. If it goes directly in, the restart is a goal kick.",
  },
  {
    question: "Who scored the legendary 'banana kick' free kick against France in 1997?",
    options: [
      "David Beckham",
      "Ronaldinho",
      "Roberto Carlos",
      "Juninho Pernambucano",
    ],
    correctIndex: 2,
    explanation:
      "Brazilian left-back Roberto Carlos scored one of football's most famous free kicks in June 1997 against France in the Tournoi de France. He hit the ball with the outside of his left foot from around 35 metres, causing it to swerve dramatically right before curling back into the top corner — defying physics and leaving goalkeeper Fabien Barthez stunned.",
  },
  {
    question: "Why is 'vanishing spray' used at free kicks?",
    options: [
      "To mark the goal area",
      "To mark the required 9.15m distance for the defensive wall and the ball's position",
      "To help the goalkeeper see the ball",
      "It is used by physiotherapists for injuries",
    ],
    correctIndex: 1,
    explanation:
      "Vanishing spray (or referee spray) is a white aerosol foam used by referees to mark the ball's position and the 9.15-metre line for the defensive wall. The foam disappears in about 60-90 seconds. It was introduced in professional football around 2013-2014 and is now widely used to prevent defenders from encroaching.",
  },
  {
    question: "A goalkeeper picks up the ball from a deliberate back-pass played with a teammate's foot. What is the result?",
    options: [
      "A direct free kick where the goalkeeper picked it up",
      "A penalty kick",
      "An indirect free kick where the goalkeeper picked up the ball",
      "A goal kick for the opposing team",
    ],
    correctIndex: 2,
    explanation:
      "The back-pass rule states that a goalkeeper cannot handle the ball with their hands if it was deliberately kicked to them by a teammate. The punishment is an indirect free kick from where the goalkeeper handled it — inside the goal area if necessary. This rule was introduced in 1992 to stop time-wasting.",
  },
];

export default function FreeKicksPage() {
  return (
    <LessonLayout
      moduleSlug="rules"
      lessonSlug="free-kicks"
      title="Free Kicks"
      description="Direct, indirect, the wall, and the art of the set piece — all explained."
      readingTime={4}
      difficulty="beginner"
      emoji="🎯"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          A free kick is a way to restart play after a foul. The team that was
          fouled places the ball at the spot of the foul and kicks it with all
          opponents at least 9.15 metres away. A{" "}
          <strong>direct free kick</strong> can score straight away; an{" "}
          <strong>indirect free kick</strong> must touch another player first.
        </p>
      </div>

      <h2>Beginner Explanation</h2>
      <p>
        Free kicks are one of the most exciting moments in football. A
        well-executed free kick near the penalty area can unlock the tightest
        defences, and some of football&apos;s most iconic moments have come
        from them. But before you can appreciate them, you need to understand
        the two types.
      </p>

      <h3>Direct Free Kicks</h3>
      <p>
        A <strong>direct free kick</strong> is awarded for physical offences
        against another player (tackles, pushes, handballs, etc.). The ball can
        be struck directly at goal — if it goes in without touching another
        player, it still counts as a goal. Direct free kicks near the penalty
        area are the most dangerous attacking situations outside of penalties.
      </p>

      <h3>Indirect Free Kicks</h3>
      <p>
        An <strong>indirect free kick</strong> is awarded for technical
        violations — like a goalkeeper handling a back-pass, dangerous play
        without contact, or a goalkeeper holding the ball too long. The
        kicker{" "}
        <em>cannot</em> score directly; the ball must touch at least one other
        player first. The referee signals an indirect free kick by raising an
        arm straight up until the ball is kicked.
      </p>
      <p>
        If an indirect free kick is awarded inside the penalty area (e.g., for a
        back-pass), the defending team can organise a wall <em>on their own
        goal line</em> between the posts — making it extremely difficult to
        score.
      </p>

      <h3>The Defensive Wall</h3>
      <p>
        When a free kick is awarded near goal, defending teams form a{" "}
        <strong>wall</strong> — a line of players standing shoulder-to-shoulder
        to block part of the goal. The wall must stand at least{" "}
        <strong>9.15 metres</strong> (10 yards) from the ball. Referees use
        vanishing spray — a white foam that disappears in about 60 seconds — to
        mark both the ball position and the wall line, preventing defenders from
        creeping forward.
      </p>
      <p>
        The kicker then has to decide: shoot over the wall, curl around it,
        or play a short free kick to create a different angle.
      </p>

      <h2>Real Match Example</h2>
      <p>
        Few free kicks in football history compare to{" "}
        <strong>Roberto Carlos&apos;s banana kick</strong> for Brazil against
        France in June 1997 at the Tournoi de France. Standing about 35 metres
        from goal, the Brazilian left-back struck the ball with the outside of
        his left foot. The ball appeared to be going well wide of the post — so
        wide that a ball boy by the corner flag began to flinch. Then, defying
        all physics, it curved dramatically back into the top right corner of
        the net.
      </p>
      <p>
        Scientists later studied the kick and found that Roberto Carlos generated
        so much topspin and sidespin simultaneously that the Magnus effect (the
        same phenomenon that makes a spinning ball curve) caused the extreme
        late swing. French goalkeeper Fabien Barthez simply watched it go in —
        he had no chance. The kick remains the most studied free kick in
        sports science.
      </p>

      {/* Key Fact callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
          ⚡ Key Fact
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          Juninho Pernambucano is widely regarded as the greatest free-kick
          specialist in football history. Playing for Lyon in Ligue 1, he scored
          an astonishing 44 direct free-kick goals — a record in the competition.
          His secret? A knuckleball technique — striking the ball with little or
          no spin — which caused it to move unpredictably in the air, making it
          nearly impossible for goalkeepers to judge.
        </p>
      </div>

      <h2>Advanced Breakdown</h2>

      <h3>Set Piece Tactics</h3>
      <p>
        Modern football teams invest enormous resources into{" "}
        <strong>set-piece coaching</strong>. Free kicks from wide positions
        (flanks) are used to deliver crosses into the penalty area, where
        tall players make attacking runs. Coaches design specific runs and
        blocks to free up players for headers or shots. At the highest level,
        set pieces account for roughly <strong>25-30% of all goals</strong>.
      </p>

      <h3>The &quot;Dummy&quot; Run</h3>
      <p>
        A common free-kick routine involves one player running over the ball
        (a dummy) to deceive the wall and goalkeeper, while a second player
        strikes it. The wall naturally reacts to the dummy&apos;s run, creating
        a fraction of a second gap. Ronaldo&apos;s free-kick record (145+
        career free-kick goals) is partly thanks to perfecting the knuckleball
        delivery alongside coordinated dummy runs.
      </p>

      <h3>The Quick Free Kick</h3>
      <p>
        Not every free kick becomes a set piece production. The referee&apos;s
        whistle is not required to restart — as long as the ball is stationary
        at the correct spot, a player can take the kick immediately. Teams
        increasingly use &quot;quick free kicks&quot; to catch the opposition
        disorganised before the wall can be set up — a tactic championed by{" "}
        Pep Guardiola&apos;s teams.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="Free Kicks" />
    </LessonLayout>
  );
}

