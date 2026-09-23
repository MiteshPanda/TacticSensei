import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "How VAR Works | Football Academy | TacticSensei",
  description:
    "Understand VAR (Video Assistant Referee) in football — the 4 reviewable situations, on-field review process, semi-automated offside technology, and why VAR remains controversial.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "VAR can only be used to review how many specific categories of decisions?",
    options: ["2 categories", "4 categories", "6 categories", "Any decision the referee makes"],
    correctIndex: 1,
    explanation:
      "VAR is restricted to reviewing only 4 categories of 'match-changing' decisions: (1) goals and offences leading up to them, (2) penalty decisions, (3) direct red cards, and (4) cases of mistaken identity when issuing a card. It cannot be used for yellow cards (except mistaken identity) or other routine decisions.",
  },
  {
    question: "What does OFR stand for in VAR terminology?",
    options: [
      "Official Football Review",
      "On-Field Review",
      "Offside Frame Recording",
      "Overruled Foul Ruling",
    ],
    correctIndex: 1,
    explanation:
      "OFR stands for On-Field Review — the process where the referee is advised by the VAR to visit the pitchside monitor to review footage themselves and make a final decision. During an OFR, the referee looks at the footage personally before deciding whether to change their original call.",
  },
  {
    question: "When VAR reviews a goal for offside, what principle guides the decision?",
    options: [
      "The subjective view of the VAR official",
      "Only a 'clear and obvious error' results in overturning the on-field decision",
      "The benefit of the doubt goes to the attacking team",
      "Any part of the body ahead of the last defender triggers offside",
    ],
    correctIndex: 2,
    explanation:
      "For most VAR checks, only 'clear and obvious errors' by the on-field referee are overturned. However, for offside specifically, it is a factual and objective check — if any part of the attacker's body (that can play the ball) is ahead of the last defender at the moment the ball is played, it is offside regardless of how small the margin. There is no 'benefit of the doubt' in offside decisions.",
  },
  {
    question: "Which competition was the first to officially use VAR in a major final?",
    options: [
      "2016 UEFA Champions League Final",
      "2018 FIFA World Cup (Russia)",
      "2017 Confederations Cup",
      "2019 Copa America",
    ],
    correctIndex: 1,
    explanation:
      "The 2018 FIFA World Cup in Russia was the first World Cup to officially use VAR in all matches. While the technology had been tested in other competitions before (including the 2016 Club World Cup), the 2018 World Cup was its biggest global debut. VAR awarded several crucial penalties and disallowed goals throughout the tournament.",
  },
  {
    question: "Why is VAR often criticised despite being technologically advanced?",
    options: [
      "It makes matches too short",
      "It is too expensive for most clubs",
      "Long delays, inconsistent application, and the subjective nature of some decisions",
      "It was invented by a rival football association",
    ],
    correctIndex: 2,
    explanation:
      "VAR receives widespread criticism for: lengthy delays that kill the atmosphere in stadiums, inconsistency in what constitutes 'clear and obvious' errors, the marginal armpit-offside decisions that upset fans, and a perceived disconnect between the technical correctness of a decision and the spirit of the game. Many fans feel VAR has removed the spontaneity of celebrating goals.",
  },
];

export default function VARPage() {
  return (
    <LessonLayout
      moduleSlug="rules"
      lessonSlug="var"
      title="How VAR Works"
      description="Football's most talked-about technology — Video Assistant Referee demystified."
      readingTime={5}
      difficulty="intermediate"
      emoji="📹"
    >
      {/* Simple Definition */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="mb-2 text-lg font-bold text-accent">In Simple Terms</h2>
        <p className="text-foreground">
          VAR (Video Assistant Referee) is a team of officials in a dedicated
          video operations room who watch live match footage and alert the
          on-field referee to clear errors in four specific types of decisions:
          goals, penalties, red cards, and mistaken identity. The final decision
          always remains with the on-field referee.
        </p>
      </div>

      <h2>Beginner Explanation</h2>
      <p>
        Before VAR, referees had to make split-second decisions on fast,
        physical plays — and sometimes they got them badly wrong. A player would
        be offside by a metre and score a crucial goal; a clear penalty in the
        box would be missed; or a red card would be shown to the wrong player.
        VAR was introduced to catch these &quot;clear and obvious errors&quot;
        using video technology.
      </p>
      <p>
        But VAR is deliberately limited — it cannot review every single decision
        a referee makes. Only four categories of decisions are covered.
      </p>

      <h3>The 4 VAR Review Categories</h3>
      <ul>
        <li>
          <strong>1. Goals:</strong> Any goal can be checked for offside,
          handball by the scoring team, fouls in the build-up, or goalkeeper
          encroachment on penalties.
        </li>
        <li>
          <strong>2. Penalty Decisions:</strong> VAR can review whether a
          penalty should or should not have been awarded — checking for fouls
          inside the box, handball, or simulation (diving).
        </li>
        <li>
          <strong>3. Direct Red Cards:</strong> VAR can review incidents of
          violent conduct, serious foul play, or whether a challenge was
          actually a red card offence. Note: yellow cards are generally NOT
          reviewed.
        </li>
        <li>
          <strong>4. Mistaken Identity:</strong> If a referee cautions or sends
          off the wrong player (e.g., after a brawl), VAR can identify who
          actually committed the offence.
        </li>
      </ul>

      <h3>How a VAR Check Works</h3>
      <p>
        The VAR team (typically 3-4 officials) sits in a dedicated{" "}
        <strong>Video Operations Centre (VOC)</strong> — in England,
        it&apos;s at Stockley Park in London. They watch every match live
        with access to up to 33 camera angles, including ultra-slow-motion and
        dedicated offside cameras. When they spot a potential error, they alert
        the on-field referee via headset.
      </p>
      <p>
        Most checks happen silently and quickly. For a clear error, the VAR
        directly advises the referee to change their decision (&quot;VAR
        check&quot;). For more complex situations, the VAR recommends the
        referee conduct an <strong>On-Field Review (OFR)</strong> — walking to
        the pitchside monitor to watch the footage themselves.
      </p>

      <h2>Real Match Example</h2>
      <p>
        One of the most dramatic VAR moments came in the{" "}
        <strong>2019 Champions League quarter-final</strong> between Manchester
        City and Tottenham Hotspur. Raheem Sterling scored what appeared to be a
        last-minute winner for City, sending the Etihad Stadium into pandemonium
        — only for VAR to rule it out for an offside by Sergio Agüero in the
        build-up. Tottenham went through on away goals in a stunning reversal
        of fortune. The goal had stood for about three minutes before being
        overturned.
      </p>
      <p>
        The 2022 World Cup used FIFA&apos;s{" "}
        <strong>Semi-Automated Offside Technology (SAOT)</strong>, generating
        3D skeletal tracking of players to produce offside decisions within
        approximately 25 seconds — a massive improvement over the
        multi-minute delays seen in the Premier League.
      </p>

      {/* Key Fact callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
          ⚡ Key Fact
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          VAR was first used in a competitive match on 12 August 2016 in a
          Bundesliga match between Bayer Leverkusen and Werder Bremen (a trial).
          The 2018 World Cup was its first global implementation. Since then,
          VAR has corrected approximately 90% of the clear errors it was
          designed to catch — but it has also introduced new controversies,
          particularly around marginal offside decisions.
        </p>
      </div>

      <h2>Advanced Breakdown</h2>

      <h3>The &quot;Clear and Obvious Error&quot; Standard</h3>
      <p>
        For most VAR categories (penalties, red cards), only a &quot;clear and
        obvious error&quot; triggers a review. This is a deliberately high bar —
        if the on-field referee could reasonably have seen it that way, VAR
        does not intervene. The problem is that &quot;clear and obvious&quot; is
        inherently subjective, leading to inconsistent application across
        different competitions and officials.
      </p>

      <h3>Offside: The Exception to the Rule</h3>
      <p>
        Offside is different from other VAR checks. It is a{" "}
        <strong>factual decision</strong> — either the player is offside or
        they&apos;re not. There is no &quot;clear and obvious&quot; threshold.
        This means a 1-millimetre offside is treated identically to a 1-metre
        offside, leading to the deeply controversial armpit/shoulder marginal
        calls that have frustrated fans worldwide. Many feel the law needs
        amendment — introducing a margin of tolerance (e.g., 5cm) — though
        IFAB (the governing body of the Laws) has resisted this.
      </p>

      <h3>The Controversy: VAR and Match Atmosphere</h3>
      <p>
        Beyond the technicalities, VAR&apos;s biggest cultural impact has been
        on the <em>experience</em> of watching football. Fans can no longer
        immediately celebrate goals — there is an awkward pause while cameras
        check for offside or fouls, lasting anywhere from 30 seconds to several
        minutes. This delay, critics argue, kills the emotional spontaneity that
        makes football special. A survey by Nielsen Sports found that 60% of
        football fans in the UK were dissatisfied with how VAR had been
        implemented, even if they supported the concept in principle.
      </p>

      <h3>The Future: Automated Decisions?</h3>
      <p>
        FIFA is moving toward <strong>fully automated offside decisions</strong>{" "}
        using AI and player tracking cameras — removing the need for a VAR
        official to manually freeze frames and draw lines. The goal is to make
        offside decisions instantaneous and indisputable, eliminating the
        agonising delays while maintaining accuracy. The technology was tested
        at the 2022 World Cup and is being rolled out progressively across top
        leagues.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="How VAR Works" />
    </LessonLayout>
  );
}

