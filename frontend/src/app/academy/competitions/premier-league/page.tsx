import type { Metadata } from "next";
import LessonLayout from "@/components/academy/LessonLayout";
import LessonQuiz, { QuizQuestion } from "@/components/academy/LessonQuiz";

export const metadata: Metadata = {
  title: "The Premier League | Football Academy | TacticSensei",
  description:
    "The world's most watched domestic football league — its 1992 founding, format, the Invincibles, the Big Six, and the records that define it.",
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "In what year was the Premier League founded, when top clubs broke away from the Football League?",
    options: ["1985", "1990", "1992", "1995"],
    correctIndex: 2,
  },
  {
    question: "Which club holds the record for the most Premier League title wins?",
    options: ["Arsenal", "Liverpool", "Chelsea", "Manchester United"],
    correctIndex: 3,
  },
  {
    question: "Arsenal's 'Invincibles' went an entire 38-game Premier League season unbeaten. Which season was this?",
    options: ["2001–02", "2002–03", "2003–04", "2004–05"],
    correctIndex: 2,
  },
  {
    question: "How many clubs are relegated from the Premier League at the end of each season?",
    options: ["1", "2", "3", "4"],
    correctIndex: 2,
  },
  {
    question: "To how many countries is the Premier League broadcast, making it the most watched domestic league worldwide?",
    options: ["100", "150", "175", "189"],
    correctIndex: 3,
  },
];

export default function PremierLeaguePage() {
  return (
    <LessonLayout
      moduleSlug="competitions"
      lessonSlug="premier-league"
      title="The Premier League"
      description="The world's most-watched domestic league — history, format, and rivalries."
      readingTime={5}
      difficulty="beginner"
      emoji="🏴"
    >
      {/* Opening hook */}
      <div className="not-prose mb-8 rounded-2xl border border-accent/20 bg-accent-light/30 p-6 dark:bg-accent-light/10">
        <h2 className="text-lg font-bold text-accent mb-2">The League That Changed Football's Economics</h2>
        <p className="text-foreground">
          In 1992, English football was in crisis — crumbling stadiums, hooliganism, and falling
          attendances. Then 22 top-flight clubs did something radical: they broke away from the
          Football League, signed a television deal with BSkyB, and created the Premier League.
          Thirty years later, it is the most-watched sports league on the planet, generating over
          £10 billion annually.
        </p>
      </div>

      <h2>The 1992 Revolution</h2>
      <p>
        The Football League had governed English football since 1888. By the early 1990s,
        top clubs believed they could generate far more revenue independently — particularly
        from television rights. On 20 February 1992, the First Division clubs resigned from the
        Football League en masse and formed the Premier League under the auspices of the Football
        Association.
      </p>
      <p>
        The crucial moment was BSkyB's deal: £304 million over five years to broadcast Premier
        League matches exclusively. Sky transformed football coverage — multiple cameras, dedicated
        analysis, Monday Night Football — and the combination of improved presentation and star
        players attracted a global audience. The first Premier League season kicked off on 
        15 August 1992. Sheffield United beat Manchester United 2–1 in the opening day's most
        notable result.
      </p>

      <h2>How the League Works</h2>
      <p>
        The Premier League features <strong>20 clubs</strong> who each play 38 matches — home
        and away against every other team — across a season running from August to May.
        Three points for a win, one for a draw, none for a loss. The team with the most points
        at the end wins the title.
      </p>
      <ul>
        <li><strong>Top 4 teams:</strong> Qualify for the UEFA Champions League</li>
        <li><strong>5th place:</strong> UEFA Europa League qualification (sometimes 6th too)</li>
        <li><strong>Bottom 3 teams:</strong> Relegated to the Championship (second tier)</li>
        <li><strong>Top 3 from Championship:</strong> Promoted to replace relegated clubs</li>
      </ul>
      <p>
        This promotion-relegation system — in which even the smallest clubs can theoretically
        reach the top flight — is one of English football's defining features and one that American
        sports leagues lack entirely.
      </p>

      {/* Title winners callout */}
      <div className="not-prose my-6 rounded-xl border border-amber-400/30 bg-amber-50/50 p-5 dark:bg-amber-900/10">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">🏆 Premier League Title Winners</p>
        <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
          <li>• <strong>Manchester United:</strong> 13 titles (under Sir Alex Ferguson's extraordinary reign)</li>
          <li>• <strong>Manchester City:</strong> 9 titles (including 6 in the Guardiola era)</li>
          <li>• <strong>Chelsea:</strong> 5 titles</li>
          <li>• <strong>Arsenal:</strong> 3 titles (including the Invincibles season)</li>
          <li>• <strong>Liverpool:</strong> 1 title (2019–20, ending a 30-year league drought)</li>
          <li>• <strong>Leicester City:</strong> 1 title (2015–16, the greatest sporting upset in decades)</li>
          <li>• <strong>Blackburn Rovers:</strong> 1 title (1994–95)</li>
        </ul>
      </div>

      <h2>The Invincibles — Arsenal 2003–04</h2>
      <p>
        Arsène Wenger's Arsenal did something no one had done in English top-flight football
        since Preston North End in 1888–89 — they went the entire 38-game Premier League season
        without losing. Not once. 26 wins, 12 draws, 0 defeats. The "Invincibles."
      </p>
      <p>
        The team was led by Patrick Vieira's combative midfield authority, Robert Pires's
        elegant left-foot creativity, and Thierry Henry's devastating goalscoring (30 goals,
        9 assists in all competitions). They played attacking, technical football that was ahead
        of its time in England. At their peak, they were arguably the best team in the world.
        Their unbeaten record stood for 49 games across two seasons before being ended by
        Manchester United in October 2004.
      </p>

      <h2>The Global Phenomenon</h2>
      <p>
        The Premier League is broadcast in <strong>189 countries</strong> — more than any other
        sports league. Matches are watched live in the middle of the night across Asia, the Americas,
        and Africa. The combination of world-class players, intense rivalries, atmospheric grounds,
        and — crucially — relative competitive unpredictability (compared to leagues dominated
        by one or two clubs) makes it uniquely compelling.
      </p>
      <p>
        The international television rights alone are worth billions of pounds. For 2022–25,
        overseas rights sold for approximately £5.1 billion across 190+ territories. The Premier
        League's global commercial operation funds transfer fees that dwarf most European leagues.
      </p>

      <h2>The Big Six</h2>
      <p>
        Six clubs — <strong>Arsenal, Chelsea, Liverpool, Manchester City, Manchester United,
        and Tottenham Hotspur</strong> — are collectively known as the "Big Six" due to their
        consistent top-six finishes, global fanbases, and commercial power. They occupy the
        largest stadiums, attract the biggest sponsors, and historically dominate European places.
      </p>
      <p>
        The Premier League's greatest fear, however, is that the gap between these six and the
        remaining fourteen becomes too large. Leicester City's 5,000/1 title win in 2016 —
        under Claudio Ranieri, with a team assembled for a fraction of the Big Six's spending —
        was the league's greatest reminder that in football, anything is possible.
      </p>

      {/* Key facts callout */}
      <div className="not-prose my-6 rounded-xl border border-rose-400/30 bg-rose-50/50 p-5 dark:bg-rose-900/10">
        <p className="text-sm font-semibold text-rose-700 dark:text-rose-400">📊 Premier League Records</p>
        <ul className="mt-2 space-y-1 text-sm text-foreground-muted">
          <li>• <strong>All-time top scorer:</strong> Alan Shearer — 260 goals</li>
          <li>• <strong>Most appearances:</strong> Gareth Barry — 653 games</li>
          <li>• <strong>Most titles:</strong> Manchester United — 13</li>
          <li>• <strong>Most goals in a season:</strong> Mohamed Salah — 32 goals (2017–18)</li>
          <li>• <strong>Domestic record transfer:</strong> Declan Rice — £105m to Arsenal (2023)</li>
          <li>• <strong>Biggest win:</strong> Leicester City 9–0 Southampton (2019)</li>
        </ul>
      </div>

      <h2>Why It's Different</h2>
      <p>
        What makes the Premier League unique is a combination of pace, physicality, and
        unpredictability that other leagues don't replicate. Spanish football is more technical,
        German football more tactically sophisticated, but no league has the same week-to-week
        intensity. Any team can beat any other on any given Saturday. An 80,000-seat Old Trafford
        can fall to a promoted club playing on their best day.
      </p>
      <p>
        This volatility — the genuine possibility of shock results every weekend — is what keeps
        fans around the world watching at 3am, refreshing live score apps, unable to look away.
      </p>

      <h2>Test Your Knowledge</h2>
      <LessonQuiz questions={quizQuestions} lessonTitle="The Premier League" />
    </LessonLayout>
  );
}

