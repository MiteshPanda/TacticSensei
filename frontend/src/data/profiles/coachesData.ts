export interface ManagedClub {
  name: string;
  years: string;
}

export interface CoachStats {
  label: string;
  value: string;
}

export interface CoachTimeline {
  year: string;
  title: string;
  description: string;
}

export interface CoachTrophy {
  title: string;
  count: number;
}

export interface CoachProfile {
  name: string;
  slug: string;
  philosophy: string;
  club: string;
  emoji: string;
  country: string;
  countryName: string;
  bio: string;
  style: string;
  clubsManaged: ManagedClub[];
  stats: CoachStats[];
  timeline: CoachTimeline[];
  trophies: CoachTrophy[];
}

export const coachesData: CoachProfile[] = [
  {
    name: "Pep Guardiola",
    slug: "pep-guardiola",
    philosophy: "Positional Play",
    club: "Manchester City",
    emoji: "🧠",
    country: "🇪🇸",
    countryName: "Spain",
    bio: "Famous for his obsessive tactical perfectionism and high-possession style, Guardiola revolutionized modern football at Barcelona, Bayern Munich, and Manchester City.",
    style: "Guardiola is the leading advocate of 'Juego de Posición' (Positional Play). His teams utilize short passes, extreme high press, building out from the goalkeeper, and using inverted fullbacks or defenders stepping into midfield to create central overloads.",
    clubsManaged: [
      { name: "Barcelona B", years: "2007-2008" },
      { name: "Barcelona", years: "2008-2012" },
      { name: "Bayern Munich", years: "2013-2016" },
      { name: "Manchester City", years: "2016-2026" }
    ],
    stats: [
      { label: "Win %", value: "71.6%" },
      { label: "Matches", value: "1000+" },
      { label: "UCL Titles", value: "3" },
      { label: "League Titles", value: "12" }
    ],
    timeline: [
      { year: "2008", title: "Barcelona Appointment", description: "Promoted to first-team manager, shifting the squad towards a possession-heavy style." },
      { year: "2009", title: "Historic Sextuple", description: "Won all six available club trophies in his debut season, a football first." },
      { year: "2013", title: "Bayern Munich Project", description: "Brought his possession style to Germany, winning three Bundesliga titles in a row." },
      { year: "2017", title: "Centurions Season", description: "Led Manchester City to a record-breaking 100 points in the Premier League." },
      { year: "2023", title: "Treble Victory", description: "Won the Champions League, Premier League, and FA Cup in a historic campaign." },
      { year: "2026", title: "Manchester City Farewell", description: "Left City after a decade and 20 trophies, signing off with a domestic cup double." }
    ],
    trophies: [
      { title: "UEFA Champions League", count: 3 },
      { title: "Premier League", count: 6 },
      { title: "La Liga", count: 3 },
      { title: "Bundesliga", count: 3 }
    ]
  },
  {
    name: "José Mourinho",
    slug: "jose-mourinho",
    philosophy: "Pragmatic Defense & Transitions",
    club: "Real Madrid",
    emoji: "🛡️",
    country: "🇵🇹",
    countryName: "Portugal",
    bio: "One of the most successful and controversial managers in history, 'The Special One' is famous for his defensive masterclasses, tactical discipline, and winning titles in four different leagues.",
    style: "Mourinho focuses on absolute defensive organization, compact low blocks, and lethal fast transition attacks. He prioritizes structural safety, letting the opponent have the ball while closing all spaces, then exploiting turnovers.",
    clubsManaged: [
      { name: "Porto", years: "2002-2004" },
      { name: "Chelsea", years: "2004-2007, 2013-2015" },
      { name: "Inter Milan", years: "2008-2010" },
      { name: "Real Madrid", years: "2010-2013, 2026-Present" },
      { name: "Manchester United", years: "2016-2018" },
      { name: "Tottenham Hotspur", years: "2019-2021" },
      { name: "Roma", years: "2021-2024" },
      { name: "Fenerbahçe", years: "2024-2025" },
      { name: "Benfica", years: "2025-2026" }
    ],
    stats: [
      { label: "Win %", value: "62.0%" },
      { label: "Matches", value: "1250+" },
      { label: "UCL Titles", value: "2" },
      { label: "Major Cups", value: "26" }
    ],
    timeline: [
      { year: "2004", title: "Porto UCL Miracle", description: "Led underdog Porto to win the UEFA Champions League, earning international acclaim." },
      { year: "2005", title: "Chelsea Premier League Title", description: "Won the Premier League in his first season, conceding a record-low 15 goals." },
      { year: "2010", title: "Inter Milan Treble", description: "Won Serie A, Coppa Italia, and UCL, defeating Bayern Munich in the final." },
      { year: "2012", title: "Real Madrid La Liga Title", description: "Broke the La Liga points (100) and goals (121) records to defeat Guardiola's Barca." },
      { year: "2022", title: "Roma Conference League Win", description: "Became the first manager to win all three current UEFA club competitions." },
      { year: "2026", title: "Real Madrid Return", description: "Returned to the Bernabéu for a second spell, 13 years after his first." }
    ],
    trophies: [
      { title: "UEFA Champions League", count: 2 },
      { title: "Premier League", count: 3 },
      { title: "Serie A", count: 2 },
      { title: "La Liga", count: 1 }
    ]
  },
  {
    name: "Jürgen Klopp",
    slug: "jurgen-klopp",
    philosophy: "Gegenpressing / Heavy Metal Football",
    club: "Liverpool",
    emoji: "⚡",
    country: "🇩🇪",
    countryName: "Germany",
    bio: "Known for his charismatic leadership and explosive, fast-tempo football, Klopp resurrected Borussia Dortmund and Liverpool, guiding them to domestic and European glory.",
    style: "Klopp operates under the 'Heavy Metal Football' style, utilizing high-intensity Gegenpressing (counter-pressing). His teams immediately press the ball upon losing possession, looking to create quick vertical attack transitions.",
    clubsManaged: [
      { name: "Mainz 05", years: "2001-2008" },
      { name: "Borussia Dortmund", years: "2008-2015" },
      { name: "Liverpool", years: "2015-2024" }
    ],
    stats: [
      { label: "Win %", value: "54%" },
      { label: "Matches", value: "1080" },
      { label: "UCL Titles", value: "1" },
      { label: "League Titles", value: "3" }
    ],
    timeline: [
      { year: "2004", title: "Mainz Bundesliga Promotion", description: "Guided Mainz to the Bundesliga for the first time in their history." },
      { year: "2011", title: "Dortmund Bundesliga Champion", description: "Won the Bundesliga title with an energetic, young squad, repeating in 2012." },
      { year: "2019", title: "Champions League Winner", description: "Won Liverpool's sixth European Cup, defeating Tottenham in the Madrid final." },
      { year: "2020", title: "Premier League Champion", description: "Led Liverpool to their first league title in 30 years with 99 points." },
      { year: "2024", title: "Liverpool Farewell", description: "Concluded his legendary tenure at Anfield, winning the EFL Cup in his final season." }
    ],
    trophies: [
      { title: "UEFA Champions League", count: 1 },
      { title: "Premier League", count: 1 },
      { title: "Bundesliga", count: 2 },
      { title: "FA Cup", count: 1 }
    ]
  },
  {
    name: "Arsène Wenger",
    slug: "arsene-wenger",
    philosophy: "Fluid Possession & Attacking Freedom",
    club: "Arsenal",
    emoji: "👔",
    country: "🇫🇷",
    countryName: "France",
    bio: "Nicknamed 'Le Professeur', Wenger spent 22 years at Arsenal, introducing innovative training methods, nutrition, and scouting to English football.",
    style: "Wenger advocated for fluid, free-flowing, attacking football with creative players rotating positions. He trusted in technical mastery, intelligent off-the-ball movements, and fast combination passes.",
    clubsManaged: [
      { name: "Nancy", years: "1984-1987" },
      { name: "Monaco", years: "1987-1994" },
      { name: "Nagoya Grampus", years: "1995-1996" },
      { name: "Arsenal", years: "1996-2018" }
    ],
    stats: [
      { label: "Win %", value: "57.2%" },
      { label: "Matches", value: "1700+" },
      { label: "Invincible Leagues", value: "1" },
      { label: "FA Cups", value: "7" }
    ],
    timeline: [
      { year: "1988", title: "Monaco Ligue 1 Champion", description: "Won the French league title in his debut season with Monaco." },
      { year: "1996", title: "Arsenal Appointment", description: "Joined Arsenal as a relatively unknown French manager, quickly transforming the club." },
      { year: "1998", title: "First Premier League Double", description: "Won the Premier League and FA Cup double in his first full season." },
      { year: "2004", title: "The Invincibles", description: "Achieved the legendary unbeaten Premier League season (26 wins, 12 draws)." },
      { year: "2018", title: "Arsenal Retirement", description: "Concluded his historic 22-year reign at Arsenal as their most successful manager." }
    ],
    trophies: [
      { title: "Premier League", count: 3 },
      { title: "FA Cup", count: 7 },
      { title: "Ligue 1", count: 1 },
      { title: "Coupe de France", count: 1 }
    ]
  },
  {
    name: "Diego Simeone",
    slug: "diego-simeone",
    philosophy: "Cholismo / Intense Defensive Block",
    club: "Atletico Madrid",
    emoji: "🦁",
    country: "🇦🇷",
    countryName: "Argentina",
    bio: "Famous for his intense touchline energy, Diego 'El Cholo' Simeone broke the Barcelona-Real Madrid duopoly in Spain, transforming Atletico Madrid into a defensive juggernaut.",
    style: "Simeone's philosophy ('Cholismo') relies on a compact, disciplined 4-4-2 low/mid block, extreme aggression, defensive solidarity, and vertical counter-attacks. He treats tactical discipline and team unity as paramount.",
    clubsManaged: [
      { name: "Racing Club", years: "2006, 2011" },
      { name: "Estudiantes", years: "2006-2007" },
      { name: "River Plate", years: "2007-2008" },
      { name: "San Lorenzo", years: "2009-2010" },
      { name: "Atletico Madrid", years: "2011-Present" }
    ],
    stats: [
      { label: "Win %", value: "58.8%" },
      { label: "Matches", value: "1000+" },
      { label: "Europa Leagues", value: "2" },
      { label: "La Liga Titles", value: "2" }
    ],
    timeline: [
      { year: "2011", title: "Atletico Madrid Appointment", description: "Took over a struggling Atletico team, immediately instilling defensive discipline." },
      { year: "2012", title: "Europa League Success", description: "Won the UEFA Europa League in his first half-season, defeating Athletic Bilbao." },
      { year: "2014", title: "La Liga Champions", description: "Broke the Real-Barca duopoly, winning the league and reaching the UCL Final." },
      { year: "2018", title: "Second Europa League", description: "Won his second Europa League title with a 3-0 victory over Marseille." },
      { year: "2021", title: "Second La Liga Triumph", description: "Won his second La Liga title, adapting the team into a flexible defensive system." }
    ],
    trophies: [
      { title: "La Liga", count: 2 },
      { title: "UEFA Europa League", count: 2 },
      { title: "Copa del Rey", count: 1 },
      { title: "UEFA Super Cup", count: 2 }
    ]
  },
  {
    name: "Luiz Felipe Scolari",
    slug: "luiz-felipe-scolari",
    philosophy: "Familia Scolari / Pragmatic Attacking",
    club: "Palmeiras / Brazil",
    emoji: "🇧🇷",
    country: "🇧🇷",
    countryName: "Brazil",
    bio: "Nicknamed 'Big Phil', Scolari is a legendary Brazilian manager who led Brazil to their fifth World Cup title in 2002 and managed teams across Europe, South America, and Asia.",
    style: "Scolari emphasizes the 'Familia Scolari' (family bond) to build team spirit. Tactically, he blends solid defensive screens (typically defensive midfielders) with immense individual attacking freedom for creative stars.",
    clubsManaged: [
      { name: "Gremio", years: "1987, 1993-1996" },
      { name: "Palmeiras", years: "1997-2000, 2010-2012" },
      { name: "Brazil National Team", years: "2001-2002, 2012-2014" },
      { name: "Portugal National Team", years: "2003-2008" },
      { name: "Chelsea", years: "2008-2009" }
    ],
    stats: [
      { label: "World Cups", value: "1" },
      { label: "Copa Lib", value: "2" },
      { label: "Matches", value: "1200+" },
      { label: "Win %", value: "56.4%" }
    ],
    timeline: [
      { year: "1995", title: "Copa Libertadores Winner", description: "Won the South American championship with Gremio, repeating in 1999 with Palmeiras." },
      { year: "2002", title: "World Cup Glory", description: "Led Brazil's iconic team to win all 7 matches in South Korea/Japan, claiming their 5th World Cup." },
      { year: "2004", title: "Euro 2004 Runner-up", description: "Managed Portugal to the final of Euro 2004, losing narrowly to Greece." },
      { year: "2006", title: "World Cup 4th Place", description: "Led Portugal to their best World Cup finish in 40 years, reaching the semi-finals." },
      { year: "2013", title: "Confederations Cup Win", description: "Returned to Brazil, defeating Spain 3-0 in the final." }
    ],
    trophies: [
      { title: "FIFA World Cup", count: 1 },
      { title: "Copa Libertadores", count: 2 },
      { title: "Brazilian Serie A", count: 2 },
      { title: "Copa do Brasil", count: 4 }
    ]
  }
];
