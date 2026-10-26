export interface PlayerStats {
  label: string;
  value: string;
}

export interface PlayerTimeline {
  year: string;
  title: string;
  description: string;
}

export interface PlayerTrophy {
  title: string;
  count: number;
}

export interface PlayerProfile {
  name: string;
  slug: string;
  position: string;
  country: string;
  countryName: string;
  bio: string;
  style: string;
  stats: PlayerStats[];
  timeline: PlayerTimeline[];
  trophies: PlayerTrophy[];
}

export const playersData: PlayerProfile[] = [
  {
    name: "Cristiano Ronaldo",
    slug: "cristiano-ronaldo",
    position: "Forward",
    country: "🇵🇹",
    countryName: "Portugal",
    bio: "An absolute powerhouse of modern football, Ronaldo has won 5 Ballon d'Or awards and holds the records for most goals scored in the Champions League, European Championship, and international football.",
    style: "Ronaldo transitioned from a tricky, lightning-fast winger to a physically dominant, elite goalscoring striker. He combines explosive athleticism, aerial ability, and lethal finishing with both feet.",
    stats: [
      { label: "Goals", value: "980+" },
      { label: "Assists", value: "290+" },
      { label: "Ballon d'Or", value: "5" },
      { label: "App", value: "1340+" }
    ],
    timeline: [
      { year: "2003", title: "Manchester United Transfer", description: "Joined Manchester United from Sporting CP, inheriting the iconic #7 shirt." },
      { year: "2008", title: "First Champions League & Ballon d'Or", description: "Scored in the UCL Final victory and claimed his first Ballon d'Or." },
      { year: "2009", title: "Real Madrid Move", description: "Joined Real Madrid for a world-record fee, going on to score 450 goals in 438 matches." },
      { year: "2016", title: "Euro 2016 Glory", description: "Captained Portugal to their first-ever major international trophy in France." },
      { year: "2023", title: "International Goals Record", description: "Solidified his place as the top international goalscorer of all time." }
    ],
    trophies: [
      { title: "UEFA European Championship", count: 1 },
      { title: "UEFA Champions League", count: 5 },
      { title: "Premier League", count: 3 },
      { title: "La Liga", count: 2 }
    ]
  },
  {
    name: "Lionel Messi",
    slug: "lionel-messi",
    position: "Forward / Playmaker",
    country: "🇦🇷",
    countryName: "Argentina",
    bio: "Widely regarded as one of the greatest football players of all time, Messi spent the majority of his professional career at Barcelona, winning a record 8 Ballon d'Or awards and leading Argentina to World Cup glory in 2022.",
    style: "Known for his low center of gravity, extraordinary close control dribbling, vision, and prolific finishing. Messi operates as a winger, false 9, or central playmaker, using his acceleration and passing range to dictate play and unlock defenses.",
    stats: [
      { label: "Goals", value: "930+" },
      { label: "Assists", value: "400+" },
      { label: "Ballon d'Or", value: "8" },
      { label: "App", value: "1170+" }
    ],
    timeline: [
      { year: "2004", title: "Barcelona Debut", description: "Made his official first-team debut for FC Barcelona at age 17." },
      { year: "2009", title: "Sextuple & First Ballon d'Or", description: "Won all six club competitions in a calendar year with Barca, claiming his first Ballon d'Or." },
      { year: "2012", title: "91-Goal Record", description: "Broke the calendar year goalscoring record, netting 91 goals in all competitions." },
      { year: "2021", title: "Copa América Champion", description: "Led Argentina to their first major international title in 28 years." },
      { year: "2022", title: "World Cup Victory", description: "Won the FIFA World Cup in Qatar, claiming the tournament's Golden Ball award." }
    ],
    trophies: [
      { title: "FIFA World Cup", count: 1 },
      { title: "Copa América", count: 2 },
      { title: "UEFA Champions League", count: 4 },
      { title: "La Liga", count: 10 }
    ]
  },
  {
    name: "Kylian Mbappé",
    slug: "kylian-mbappe",
    position: "Forward / Winger",
    country: "🇫🇷",
    countryName: "France",
    bio: "One of the most exciting talents of his generation, Mbappé burst onto the scene as a teenager and won the FIFA World Cup in 2018, scoring in the final at age 19. At the 2026 World Cup he became the tournament's all-time top scorer with 22 goals.",
    style: "Possesses devastating pace, quick dribbling, and lethal composure in 1v1 situations. Mbappé thrives on exploiting high defensive lines, cutting inside from the left wing to curl shots into the far corner.",
    stats: [
      { label: "Goals", value: "450+" },
      { label: "Assists", value: "170+" },
      { label: "World Cup Goals", value: "22" },
      { label: "App", value: "580+" }
    ],
    timeline: [
      { year: "2016", title: "Monaco Breakthrough", description: "Helped Monaco win the Ligue 1 title and reach the Champions League semi-finals." },
      { year: "2017", title: "Paris Saint-Germain Transfer", description: "Joined PSG in a historic deal, becoming the club's all-time record goalscorer." },
      { year: "2018", title: "World Cup Triumph", description: "Won the World Cup with France, claiming the Best Young Player award." },
      { year: "2022", title: "World Cup Final Hat-Trick", description: "Scored a historic hat-trick in the World Cup Final, winning the Golden Boot." },
      { year: "2024", title: "Real Madrid Signing", description: "Completed his highly-anticipated transfer to Real Madrid." },
      { year: "2026", title: "World Cup Scoring Record", description: "Won a second straight Golden Boot with 10 goals, passing Miroslav Klose and Lionel Messi as the World Cup's all-time top scorer." }
    ],
    trophies: [
      { title: "FIFA World Cup", count: 1 },
      { title: "Ligue 1", count: 7 },
      { title: "UEFA Nations League", count: 1 },
      { title: "Coupe de France", count: 4 }
    ]
  },
  {
    name: "Pelé",
    slug: "pele",
    position: "Forward / Attacking Mid",
    country: "🇧🇷",
    countryName: "Brazil",
    bio: "Edson Arantes do Nascimento, known globally as Pelé, is widely considered the king of football. He remains the only player in history to win three FIFA World Cups.",
    style: "An athletic and complete forward who could shoot with both feet, head the ball with power, and execute breathtaking dribbles. Pelé's vision, playmaking abilities, and clinical scoring revolutionized the game.",
    stats: [
      { label: "Goals", value: "1281" },
      { label: "Assists", value: "350+" },
      { label: "World Cups", value: "3" },
      { label: "App", value: "1363" }
    ],
    timeline: [
      { year: "1956", title: "Santos FC Debut", description: "Made his debut for Santos at age 15, scoring in his first match." },
      { year: "1958", title: "First World Cup at 17", description: "Became the youngest player to win the World Cup, scoring twice in the final." },
      { year: "1962", title: "Second World Cup Win", description: "Won back-to-back titles with Brazil, establishing them as global giants." },
      { year: "1970", title: "Legendary 1970 Campaign", description: "Led what is considered the greatest team in history to win his third World Cup." },
      { year: "1975", title: "New York Cosmos Move", description: "Joined the NASL to popularize football in the United States." }
    ],
    trophies: [
      { title: "FIFA World Cup", count: 3 },
      { title: "Copa Libertadores", count: 2 },
      { title: "Campeonato Paulista", count: 10 },
      { title: "Intercontinental Cup", count: 2 }
    ]
  },
  {
    name: "Andrés Iniesta",
    slug: "andres-iniesta",
    position: "Central Midfielder",
    country: "🇪🇸",
    countryName: "Spain",
    bio: "The midfield maestro who scored the winning goal in the 2010 World Cup Final. Iniesta was the central heartbeat of Barcelona and Spain's golden eras of dominant possession football.",
    style: "An elegant, agile playmaker whose trademark move was 'La Croqueta'. He excelled in tight spaces, possessing unmatched balance, spatial awareness, and passing accuracy to control the midfield tempo.",
    stats: [
      { label: "Goals", value: "90+" },
      { label: "Assists", value: "160+" },
      { label: "UCL Titles", value: "4" },
      { label: "App", value: "950+" }
    ],
    timeline: [
      { year: "2002", title: "Barcelona Debut", description: "Rose through La Masia to make his first-team debut under Louis van Gaal." },
      { year: "2008", title: "Euro 2008 Champions", description: "Named in the Team of the Tournament as Spain won the European Championship." },
      { year: "2009", title: "Iniestazo at Stamford Bridge", description: "Scored a legendary last-minute goal against Chelsea to send Barca to the UCL Final." },
      { year: "2010", title: "World Cup Winning Goal", description: "Scored the historic 116th-minute winner against the Netherlands in South Africa." },
      { year: "2012", title: "Euro 2012 Best Player", description: "Won the UEFA Best Player in Europe award after leading Spain to back-to-back Euros." }
    ],
    trophies: [
      { title: "FIFA World Cup", count: 1 },
      { title: "UEFA European Championship", count: 2 },
      { title: "UEFA Champions League", count: 4 },
      { title: "La Liga", count: 9 }
    ]
  },
  {
    name: "Franz Beckenbauer",
    slug: "franz-beckenbauer",
    position: "Libero / Sweeper",
    country: "🇩🇪",
    countryName: "Germany",
    bio: "Nicknamed 'Der Kaiser' (The Emperor), Beckenbauer is credited with inventing the modern 'Libero' (sweeper) role. He won the World Cup as both a captain and a manager.",
    style: "Commanding, elegant, and tactically supreme. Beckenbauer would drop behind the defense to clean up play, then carry the ball forward with grace to join the midfield, launching attacks from deep.",
    stats: [
      { label: "Goals", value: "110+" },
      { label: "Ballon d'Or", value: "2" },
      { label: "Bundesliga", value: "5" },
      { label: "App", value: "850+" }
    ],
    timeline: [
      { year: "1964", title: "Bayern Munich Debut", description: "Made his debut for Bayern Munich, transforming them into a European superpower." },
      { year: "1972", title: "Ballon d'Or & Euro 72", description: "Captained West Germany to Euro glory and won his first Ballon d'Or." },
      { year: "1974", title: "World Cup Captain", description: "Led West Germany to lift the World Cup on home soil, defeating Cruyff's Netherlands." },
      { year: "1976", title: "UCL Three-Peat", description: "Captained Bayern Munich to their third consecutive European Cup title." },
      { year: "1990", title: "World Cup Winner as Manager", description: "Managed West Germany to a World Cup victory in Italy, joining a rare elite club." }
    ],
    trophies: [
      { title: "FIFA World Cup (Player)", count: 1 },
      { title: "FIFA World Cup (Manager)", count: 1 },
      { title: "UEFA European Championship", count: 1 },
      { title: "European Cup (UCL)", count: 3 }
    ]
  },
  {
    name: "Diego Maradona",
    slug: "diego-maradona",
    position: "Attacking Midfielder",
    country: "🇦🇷",
    countryName: "Argentina",
    bio: "One of the most iconic figures in sports history, Maradona was a footballing genius who single-handedly inspired Argentina to the 1986 World Cup and transformed Napoli into Serie A champions.",
    style: "A master dribbler with magical footwork, balance, and crossing ability. Maradona used his legendary left foot to execute free kicks, defense-splitting passes, and solo runs that defined a generation.",
    stats: [
      { label: "Goals", value: "340+" },
      { label: "Assists", value: "200+" },
      { label: "World Cup Golden Ball", value: "1" },
      { label: "App", value: "680+" }
    ],
    timeline: [
      { year: "1976", title: "Professional Debut at 15", description: "Debuted for Argentinos Juniors ten days before his 16th birthday." },
      { year: "1982", title: "Barcelona Transfer", description: "Joined Barcelona for a world-record fee, winning the Copa del Rey." },
      { year: "1984", title: "Napoli Revolution", description: "Transferred to Napoli, leading them to their only two Serie A titles in history (1987, 1990)." },
      { year: "1986", title: "The Goal of the Century", description: "Scored the famous 'Hand of God' and the 60-meter solo 'Goal of the Century' against England." },
      { year: "1990", title: "World Cup Runner-up", description: "Led Argentina to a second consecutive World Cup Final, falling to West Germany." }
    ],
    trophies: [
      { title: "FIFA World Cup", count: 1 },
      { title: "Serie A", count: 2 },
      { title: "UEFA Cup", count: 1 },
      { title: "Copa del Rey", count: 1 }
    ]
  },
  {
    name: "Zinedine Zidane",
    slug: "zinedine-zidane",
    position: "Attacking Midfielder",
    country: "🇫🇷",
    countryName: "France",
    bio: "An icon of elegance and big-match performance, Zidane scored twice in the 1998 World Cup Final and went on to win three Champions League titles in a row as the manager of Real Madrid.",
    style: "Zidane was characterized by his ball control, body feints, vision, and technical precision. He possessed the rare ability to make complex movements look completely effortless.",
    stats: [
      { label: "Goals", value: "150+" },
      { label: "Assists", value: "130+" },
      { label: "Ballon d'Or", value: "1" },
      { label: "App", value: "800+" }
    ],
    timeline: [
      { year: "1996", title: "Juventus Move", description: "Joined Juventus from Bordeaux, winning back-to-back Serie A titles." },
      { year: "1998", title: "World Cup & Ballon d'Or", description: "Scored two headers in the final against Brazil to win the World Cup, claiming the Ballon d'Or." },
      { year: "2001", title: "Galáctico Transfer", description: "Joined Real Madrid for a world-record transfer fee." },
      { year: "2002", title: "Legendary UCL Volley", description: "Scored one of the greatest goals in history—a left-foot volley in the UCL Final." },
      { year: "2006", title: "World Cup Final & Retirement", description: "Led France to the final, winning the Golden Ball before retiring from professional play." }
    ],
    trophies: [
      { title: "FIFA World Cup", count: 1 },
      { title: "UEFA European Championship", count: 1 },
      { title: "UEFA Champions League (Player)", count: 1 },
      { title: "UEFA Champions League (Manager)", count: 3 }
    ]
  }
];
