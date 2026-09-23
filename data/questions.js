// 10 Physical Quantities & SI Units for "Guess the Quantity"
// Clue Order:
// Clue 1 (100 pts): Simple, direct core concept/function (e.g., "I resist electric current" style)
// Clue 2 (75 pts): The Scientist / Author who it is named after
// Clue 3 (50 pts): Everyday gadgets, tech, and relatable examples
// Clue 4 (25 pts): Formula, SI symbol hint, and dead giveaway

const questions = [
  {
    id: 1,
    quantity: "Frequency",
    unit: "Hertz",
    symbol: "Hz",
    dimensionalFormula: "s⁻¹ or 1/second",
    aliases: ["hertz", "hz", "hertzes", "frequency", "freq", "1/s", "s^-1", "cycles per second"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Core Function",
        badge: "🎯 Clue 1 · Core Concept (100 pts)",
        text: "I measure how many times a wave, vibration, or complete cycle repeats every single second."
      },
      {
        level: 2,
        points: 75,
        type: "Scientist / Author",
        badge: "👨‍🔬 Clue 2 · The Scientist (75 pts)",
        text: "I am named after German physicist Heinrich Hertz, who in 1887 built spark-gap transmitters to prove electromagnetic radio waves exist."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday",
        badge: "📱 Clue 3 · Everyday Tech (50 pts)",
        text: "Smartphone displays refresh at 60 or 120 of me. Home Wi-Fi runs at 2.4 or 5 Giga-____, and human hearing ranges from 20 to 20,000 of me."
      },
      {
        level: 4,
        points: 25,
        type: "Formula & Giveaway",
        badge: "⚡ Clue 4 · Formula & Symbol (25 pts)",
        text: "Formula: f = 1 / T. My SI unit is 1/second (s⁻¹), and my symbol is Hz. (Dad joke: What unit hurts when you stub your toe?)"
      }
    ],
    explanation: "Frequency measures repeating cycles per second. Its SI unit is the Hertz (Hz = 1/s), named after Heinrich Hertz."
  },
  {
    id: 2,
    quantity: "Electric Charge",
    unit: "Coulomb",
    symbol: "C",
    dimensionalFormula: "A·s (Ampere · second)",
    aliases: ["coulomb", "coulombs", "c", "charge", "electric charge", "q", "a*s", "as"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Core Function",
        badge: "🎯 Clue 1 · Core Concept (100 pts)",
        text: "I measure the fundamental quantity of electricity carried by atomic particles like electrons and protons."
      },
      {
        level: 2,
        points: 75,
        type: "Scientist / Author",
        badge: "👨‍🔬 Clue 2 · The Scientist (75 pts)",
        text: "I am named after French military engineer Charles-Augustin de Coulomb, who proved that opposite charges attract and like charges repel."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday",
        badge: "📱 Clue 3 · Everyday Tech (50 pts)",
        text: "Rubbing an inflated balloon on your hair charges it with me so it sticks to a wall. A summer lightning bolt delivers 15 to 25 of me to the ground."
      },
      {
        level: 4,
        points: 25,
        type: "Formula & Giveaway",
        badge: "⚡ Clue 4 · Formula & Symbol (25 pts)",
        text: "Formula: Q = I × t (Current × Time). My base SI unit is Ampere-second (A·s), and my symbol is C. One electron carries 1.6 × 10⁻¹⁹ of me."
      }
    ],
    explanation: "Electric Charge is the physical property of matter carried by electrons and protons. Its SI unit is the Coulomb (C = A·s)."
  },
  {
    id: 3,
    quantity: "Energy / Work",
    unit: "Joule",
    symbol: "J",
    dimensionalFormula: "kg·m²/s² or N·m",
    aliases: ["joule", "joules", "j", "energy", "work", "heat", "n*m", "nm", "w*s", "ws"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Core Function",
        badge: "🎯 Clue 1 · Core Concept (100 pts)",
        text: "I measure the capacity to do physical work or produce heat."
      },
      {
        level: 2,
        points: 75,
        type: "Scientist / Author",
        badge: "👨‍🔬 Clue 2 · The Scientist (75 pts)",
        text: "I am named after James Prescott Joule, the English brewer and physicist who proved that mechanical work converts directly into heat."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday",
        badge: "📱 Clue 3 · Everyday Tech (50 pts)",
        text: "Lifting an everyday 100g apple upwards by 1 meter takes exactly 1 of me. Check any snack wrapper: 1 food Calorie contains 4,184 of me!"
      },
      {
        level: 4,
        points: 25,
        type: "Formula & Giveaway",
        badge: "⚡ Clue 4 · Formula & Symbol (25 pts)",
        text: "Formula: Work = Force × Distance (W = F · d). In units: Newton-meter (N·m) or Watt-second. My symbol is J (rhymes with 'Cool'!)."
      }
    ],
    explanation: "Energy is the capacity to do work. Its SI unit is the Joule (J = N·m = kg·m²/s²), named after James Prescott Joule."
  },
  {
    id: 4,
    quantity: "Capacitance",
    unit: "Farad",
    symbol: "F",
    dimensionalFormula: "Coulomb / Volt (C/V)",
    aliases: ["farad", "farads", "f", "capacitance", "capacitor", "c/v"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Core Function",
        badge: "🎯 Clue 1 · Core Concept (100 pts)",
        text: "I measure the ability of an electrical component to store separated electric charge between two metal plates."
      },
      {
        level: 2,
        points: 75,
        type: "Scientist / Author",
        badge: "👨‍🔬 Clue 2 · The Scientist (75 pts)",
        text: "I am named after Michael Faraday, the legendary English scientist who invented the electric motor and the famous protective Faraday Cage."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday",
        badge: "📱 Clue 3 · Everyday Tech (50 pts)",
        text: "I am the cylindrical 'condenser' that gives ceiling fans torque to start spinning, and the reason Wi-Fi router LEDs stay lit for 3 seconds after being unplugged."
      },
      {
        level: 4,
        points: 25,
        type: "Formula & Giveaway",
        badge: "⚡ Clue 4 · Formula & Symbol (25 pts)",
        text: "Formula: C = Q / V (Stored charge per Volt). Usually rated in micro-____ (µF) on circuit boards, and my SI symbol is F."
      }
    ],
    explanation: "Capacitance is the ability to store electric charge per unit voltage. Its SI unit is the Farad (F = C/V), named after Michael Faraday."
  },
  {
    id: 5,
    quantity: "Inductance",
    unit: "Henry",
    symbol: "H",
    dimensionalFormula: "Volt·s/A or Wb/A",
    aliases: ["henry", "henries", "henrys", "h", "inductance", "inductor", "wb/a"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Core Function",
        badge: "🎯 Clue 1 · Core Concept (100 pts)",
        text: "I measure a wire coil's opposition or resistance to any sudden changes in electric current."
      },
      {
        level: 2,
        points: 75,
        type: "Scientist / Author",
        badge: "👨‍🔬 Clue 2 · The Scientist (75 pts)",
        text: "I honor American physicist Joseph Henry, who discovered electromagnetic self-induction and became the first leader of the Smithsonian."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday",
        badge: "📱 Clue 3 · Everyday Tech (50 pts)",
        text: "Without me, wireless phone charging pads wouldn't work, electric guitars couldn't turn string vibrations into music, and airport metal detectors wouldn't beep."
      },
      {
        level: 4,
        points: 25,
        type: "Formula & Giveaway",
        badge: "⚡ Clue 4 · Formula & Symbol (25 pts)",
        text: "Look for copper wire coiled around an iron cylinder in transformers. Formula: V = -L (dI/dt). Unit: Weber/Ampere (Wb/A). Symbol: H."
      }
    ],
    explanation: "Inductance is the property of an electric conductor that opposes changes in current. Its SI unit is the Henry (H = Wb/A), named after Joseph Henry."
  },
  {
    id: 6,
    quantity: "Magnetic Flux",
    unit: "Weber",
    symbol: "Wb",
    dimensionalFormula: "Tesla · m² or Volt · second",
    aliases: ["weber", "webers", "wb", "magnetic flux", "flux", "v*s", "vs", "t*m^2"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Core Function",
        badge: "🎯 Clue 1 · Core Concept (100 pts)",
        text: "I measure the total quantity of magnetic field lines passing through an open loop or surface area."
      },
      {
        level: 2,
        points: 75,
        type: "Scientist / Author",
        badge: "👨‍🔬 Clue 2 · The Scientist (75 pts)",
        text: "I am named after Wilhelm Eduard Weber, the German physicist who collaborated with Carl Friedrich Gauss on geomagnetism and built an early electric telegraph."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday",
        badge: "📱 Clue 3 · Everyday Tech (50 pts)",
        text: "Whenever I change inside a coil of wire, voltage is induced! Power stations and wind turbines spin magnets to change me and generate electricity."
      },
      {
        level: 4,
        points: 25,
        type: "Formula & Giveaway",
        badge: "⚡ Clue 4 · Formula & Symbol (25 pts)",
        text: "Formula: Φ = B × A (Magnetic Field × Area). In units: Tesla-square meter (T·m²) or Volt-second. Symbol: Wb (pronounced 'VAY-ber')."
      }
    ],
    explanation: "Magnetic Flux measures the total magnetic field passing through an area. Its SI unit is the Weber (Wb = T·m² = V·s), named after Wilhelm Weber."
  },
  {
    id: 7,
    quantity: "Conductance",
    unit: "Siemens",
    symbol: "S",
    dimensionalFormula: "1/Ohm (Ω⁻¹)",
    aliases: ["siemens", "s", "conductance", "electrical conductance", "mho", "siemen", "1/ohm"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Core Function",
        badge: "🎯 Clue 1 · Core Concept (100 pts)",
        text: "I measure how easily electric current flows through a wire — the exact opposite (reciprocal) of electrical resistance!"
      },
      {
        level: 2,
        points: 75,
        type: "Scientist / Author",
        badge: "👨‍🔬 Clue 2 · The Scientist (75 pts)",
        text: "I am named after Werner von Siemens, the German electrical pioneer who built Europe's first electric railway and founded Siemens AG."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday",
        badge: "📱 Clue 3 · Everyday Tech (50 pts)",
        text: "Water filter technicians use digital conductivity pens measuring in µS/cm to test the purity and dissolved mineral salts of drinking water."
      },
      {
        level: 4,
        points: 25,
        type: "Formula & Giveaway",
        badge: "⚡ Clue 4 · Formula & Symbol (25 pts)",
        text: "Formula: G = 1 / R = I / V. My unit is 1/ohm (Ω⁻¹), historically nicknamed 'mho' (ohm spelled backwards!). Symbol: S."
      }
    ],
    explanation: "Conductance is the measure of how easily current flows through a conductor. Its SI unit is the Siemens (S = 1/Ω), named after Werner von Siemens."
  },
  {
    id: 8,
    quantity: "Magnetic Flux Density",
    unit: "Tesla",
    symbol: "T",
    dimensionalFormula: "Weber/m² or N/(A·m)",
    aliases: ["tesla", "teslas", "t", "magnetic flux density", "magnetic field", "b field", "magnetic field strength", "wb/m^2"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Core Function",
        badge: "🎯 Clue 1 · Core Concept (100 pts)",
        text: "I measure the concentrated strength and intensity of a magnetic field per unit area."
      },
      {
        level: 2,
        points: 75,
        type: "Scientist / Author",
        badge: "👨‍🔬 Clue 2 · The Scientist (75 pts)",
        text: "I am named after Nikola Tesla, the eccentric visionary who gave humanity AC power grids and wireless coils (and whose surname was borrowed by Elon Musk!)."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday",
        badge: "📱 Clue 3 · Everyday Tech (50 pts)",
        text: "Earth's natural magnetic field is faint (~50 µT). A fridge magnet is ~5 milli-____. Hospital MRI scanners that scan human body organs operate at 1.5 to 3 of me!"
      },
      {
        level: 4,
        points: 25,
        type: "Formula & Giveaway",
        badge: "⚡ Clue 4 · Formula & Symbol (25 pts)",
        text: "Sprinkle iron filings around a magnet to see my lines. Formula: F = q(v × B). Unit: Weber/m² or N/(A·m). Symbol: T."
      }
    ],
    explanation: "Magnetic Flux Density measures magnetic field strength per unit area. Its SI unit is the Tesla (T = Wb/m²), named after Nikola Tesla."
  },
  {
    id: 9,
    quantity: "Signal / Sound Level",
    unit: "Decibel",
    symbol: "dB",
    dimensionalFormula: "Dimensionless (Logarithmic Ratio)",
    aliases: ["decibel", "decibels", "db", "bel", "bels", "sound level", "volume", "loudness"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Core Function",
        badge: "🎯 Clue 1 · Core Concept (100 pts)",
        text: "I measure sound volume, loudness, and relative signal power ratios."
      },
      {
        level: 2,
        points: 75,
        type: "Scientist / Author",
        badge: "👨‍🔬 Clue 2 · The Scientist (75 pts)",
        text: "I combine the prefix 'deci-' (one-tenth) with the 'Bel', named after Alexander Graham Bell, the famous inventor of the telephone."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday",
        badge: "📱 Clue 3 · Everyday Tech (50 pts)",
        text: "A soft whisper is 30 of me, normal conversation is 60 of me, city traffic is 85 of me, a rock concert is 110 of me, and 130 of me is ear pain threshold!"
      },
      {
        level: 4,
        points: 25,
        type: "Formula & Giveaway",
        badge: "⚡ Clue 4 · Formula & Symbol (25 pts)",
        text: "Look at the bouncing green and red VU meter bars on an audio mixer. I am a logarithmic ratio unit: 10 log₁₀(P/P₀). Symbol: dB."
      }
    ],
    explanation: "The Decibel (dB) is a logarithmic unit expressing ratios of physical power or sound intensity, named after Alexander Graham Bell."
  },
  {
    id: 10,
    quantity: "Radioactivity",
    unit: "Becquerel",
    symbol: "Bq",
    dimensionalFormula: "s⁻¹ (1 disintegration per second)",
    aliases: ["becquerel", "becquerels", "bq", "radioactivity", "activity", "decay rate"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Core Function",
        badge: "🎯 Clue 1 · Core Concept (100 pts)",
        text: "I measure how many unstable atomic nuclei decay or disintegrate every single second."
      },
      {
        level: 2,
        points: 75,
        type: "Scientist / Author",
        badge: "👨‍🔬 Clue 2 · The Scientist (75 pts)",
        text: "I am named after Henri Becquerel, who discovered natural radioactivity in 1896 with uranium salts and shared the Nobel Prize with Marie Curie."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday",
        badge: "📱 Clue 3 · Everyday Tech (50 pts)",
        text: "Eating an ordinary banana emits ~15 of me because of natural Potassium-40. Your own human body naturally emits about 4,500 of me every second!"
      },
      {
        level: 4,
        points: 25,
        type: "Formula & Giveaway",
        badge: "⚡ Clue 4 · Formula & Symbol (25 pts)",
        text: "Listen to a handheld Geiger counter rapidly clicking near radioactive rocks. My SI unit is defined as exactly 1 nuclear decay per second (s⁻¹). Symbol: Bq."
      }
    ],
    explanation: "Radioactivity (Activity) is the rate of spontaneous nuclear decay. Its SI unit is the Becquerel (Bq = 1 decay/s), named after Henri Becquerel."
  }
];

const reverseDetective = {
  subject: "Volt",
  symbol: "V",
  formula: "kg·m²/(A·s³) or J/C",
  checklist: [
    {
      id: "scientist",
      title: "Name the Scientist",
      answer: "Alessandro Volta (1745–1827)",
      clue: "Italian count & physicist who invented the Voltaic Pile in 1800 (the world's first true chemical battery made from stacked zinc and copper discs separated by saltwater pads).",
      points: 50
    },
    {
      id: "quantity",
      title: "Name the Physical Quantity",
      answer: "Electric Potential Difference / Voltage / Electromotive Force (EMF)",
      clue: "The work needed per unit of charge to move a test charge between two points in an electric field (1 V = 1 Joule per Coulomb).",
      points: 50
    },
    {
      id: "example",
      title: "Provide a Real-World Example",
      answer: "AA / AAA Battery (~1.5 V), USB Port (5 V), Car Battery (12 V), Wall Socket (120 V / 230 V)",
      clue: "Contestant must cite any accurate real-world voltage rating (e.g., lemon battery ~0.9V, AA battery ~1.5V, smartphone fast charger 9V/20V, overhead transmission lines 400 kV).",
      points: 50
    }
  ],
  hostNotes: "Host can award up to 150 bonus points for the Reverse Detective round by checking off the verified answers!"
};

module.exports = {
  questions,
  reverseDetective
};
