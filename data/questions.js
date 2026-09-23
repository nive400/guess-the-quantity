// 10 Physical Quantities & SI Units for "Guess the Quantity"
// Engaging, riddle-style, and thrilling clues tailored for a high-energy college event!

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
        type: "Math & Quantum",
        badge: "🔢 Clue 1 · The Quantum Signature (100 pts)",
        text: "In quantum physics, multiply me by Planck's constant (E = h·ν) to calculate the energy of a light photon. My SI dimensional formula is deceptively simple: exactly 1/second (s⁻¹)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Sensory",
        badge: "👁️ Clue 2 · The Oscillation (75 pts)",
        text: "Watch a vibrating guitar string blur under stage lights, or an ECG heart monitor beep on a screen. I count how many peaks, ripples, or complete cycles rush past in a single second."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday Life",
        badge: "🌍 Clue 3 · Gamers & Gadgets (50 pts)",
        text: "Gamers obsess over 144 or 240 of me for ultra-smooth monitor refresh rates. Your home Wi-Fi oscillates at billions of me (2.4 or 5 Giga-____), and human ears can only hear me up to 20,000."
      },
      {
        level: 4,
        points: 25,
        type: "Dead Giveaway & Pun",
        badge: "📜 Clue 4 · The Scientist & Pun (25 pts)",
        text: "I honor Heinrich Hertz, who first detected radio waves in 1887. (College dad joke: What SI unit does your pinky toe experience when you stub it on the bedpost? Ouch, that really ____!)"
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
        type: "Math & Integral",
        badge: "🔢 Clue 1 · Current Over Time (100 pts)",
        text: "In circuit theory, integrate electric current over time: Q = ∫ I dt. My fundamental SI dimensional formula is Ampere × second (A·s). I am the true currency of electricity."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Sensory",
        badge: "👁️ Clue 2 · The Static Shock (75 pts)",
        text: "Rub an inflated balloon against your hair and stick it to the ceiling, or walk across a carpet in socks and get a sudden sharp spark on a metal doorknob. That's me accumulating!"
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday Life",
        badge: "🌍 Clue 3 · Electrons & Thunder (50 pts)",
        text: "A single electron carries a tiny -1.602 × 10⁻¹⁹ of me. A 5,000 mAh smartphone battery holds roughly 18,000 of me, and a summer lightning bolt dumps 15 to 25 of me straight into the ground."
      },
      {
        level: 4,
        points: 25,
        type: "Dead Giveaway & Pun",
        badge: "📜 Clue 4 · The Inverse-Square Law (25 pts)",
        text: "I am named after French military engineer Charles-Augustin de Coulomb, whose famous 1785 torsion balance proved that like charges repel and opposite charges attract: F = k·(q₁q₂)/r²."
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
        type: "Math & Physics",
        badge: "🔢 Clue 1 · Force Across Distance (100 pts)",
        text: "In classical mechanics: Work = Force × Distance (W = F · d). My SI base dimension is kg·m²/s². In derived units: 1 Newton-meter (N·m) or 1 Watt-second (W·s)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Sensory",
        badge: "👁️ Clue 2 · The Shape-Shifter (75 pts)",
        text: "I am the universe's greatest shape-shifter: I lurk as elastic potential in a pulled slingshot, burst into kinetic speed as a baseball flies, and dissipate as friction and heat."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday Life",
        badge: "🌍 Clue 3 · Apples & Snack Packs (50 pts)",
        text: "Lifting an average 100g apple upwards by 1 meter against Earth's gravity costs roughly 1 of me. Check the nutrition label on a chips packet or chocolate bar: 1 food Calorie contains 4,184 of me!"
      },
      {
        level: 4,
        points: 25,
        type: "Dead Giveaway & Pun",
        badge: "📜 Clue 4 · The Brewer Physicist (25 pts)",
        text: "I honor James Prescott Joule, the English brewer who stirred water with paddle wheels to prove mechanical work converts to heat. (Rhymes with 'Cool' or 'Jewel'—the crowned king of energy!)."
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
        type: "Math & Ratio",
        badge: "🔢 Clue 1 · The Charge-Voltage Ratio (100 pts)",
        text: "Defined by the clean electrostatic ratio: C = Q / V. My SI unit means storing exactly 1 Coulomb of electric charge at a potential difference of 1 Volt (C/V)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Sensory",
        badge: "👁️ Clue 2 · The Electronic Reservoir (75 pts)",
        text: "Look inside any electronic gadget for tiny cylindrical aluminum cans standing on two wire legs. Inside is a sandwich of metal sheets separated by a dielectric that acts like a micro-battery."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday Life",
        badge: "🌍 Clue 3 · Routers & Ceiling Fans (50 pts)",
        text: "Ever unplug your Wi-Fi router and notice the green light stays on for 3 seconds before dying? That's me discharging! Also, without me inside the ceiling fan 'condenser', the blades won't kickstart."
      },
      {
        level: 4,
        points: 25,
        type: "Dead Giveaway & Pun",
        badge: "📜 Clue 4 · The Bookbinder's Genius (25 pts)",
        text: "One whole unit of me is gigantic (we use micro-µF). I am named after Michael Faraday, the self-taught bookbinder who discovered electromagnetic induction and the famous shielding 'Cage'."
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
        type: "Math & Back-EMF",
        badge: "🔢 Clue 1 · The Law of Inertia (100 pts)",
        text: "Governed by the back-EMF equation: V = -L (dI/dt). In derived SI units: 1 Weber per Ampere (Wb/A) or 1 Volt-second per Ampere (V·s/A). I am electrical inertia personified."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Sensory",
        badge: "👁️ Clue 2 · The Stubborn Coil (75 pts)",
        text: "I look like copper wire tightly wound around a ferrite core or iron nail. Thanks to Lenz's Law, I am stubbornly obstinate: if current tries to surge, I push back; if current drops, I fight to sustain it!"
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday Life",
        badge: "🌍 Clue 3 · Electric Guitars & Wireless Charging (50 pts)",
        text: "Without me, wireless Qi phone charging pads wouldn't work, electric guitars couldn't convert vibrating steel strings into screaming solos, and tube-light choke ballasts couldn't strike an arc."
      },
      {
        level: 4,
        points: 25,
        type: "Dead Giveaway & Pun",
        badge: "📜 Clue 4 · The Smithsonian Pioneer (25 pts)",
        text: "I honor American physicist Joseph Henry, who discovered electromagnetic self-induction independently and became the first leader of the Smithsonian. (Shares a royal first name with King Henry!)."
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
        type: "Math & Field Integral",
        badge: "🔢 Clue 1 · Field Through Surface (100 pts)",
        text: "Calculated by the dot product: Φ = B · A · cos(θ). In derived units: 1 Tesla-square meter (T·m²) or 1 Volt-second (V·s). I measure how much total magnetic field threads through an area."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Sensory",
        badge: "👁️ Clue 2 · The Invisible Net (75 pts)",
        text: "Imagine an invisible net catching a stream of magnetic field lines. I don't measure how tight or dense the lines are—I count the total aggregate quantity of lines piercing through the entire hoop!"
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday Life",
        badge: "🌍 Clue 3 · Dams & Dynamos (50 pts)",
        text: "Whenever I change inside a coil of wire, voltage is born! This single phenomenon in generator dynamos powers every hydroelectric dam, wind turbine, and nuclear power plant on Earth."
      },
      {
        level: 4,
        points: 25,
        type: "Dead Giveaway & Pun",
        badge: "📜 Clue 4 · The German Telegrapher (25 pts)",
        text: "I am named after Wilhelm Eduard Weber, the German physicist who collaborated with Carl Friedrich Gauss on geomagnetism. (In German, my name starts with a 'W' but is pronounced like 'VAY-ber'!)."
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
        type: "Math & Reciprocal",
        badge: "🔢 Clue 1 · The Mathematical Mirror (100 pts)",
        text: "The exact mathematical twin and reciprocal of Resistance: G = 1 / R = I / V. In base dimensions: 1/ohm (Ω⁻¹). I measure how effortlessly electric current travels through a material."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Sensory",
        badge: "👁️ Clue 2 · The Open Superhighway (75 pts)",
        text: "If electrical resistance is a muddy bottleneck road full of potholes, I am a gleaming 8-lane expressway showing how smoothly and freely electrons can glide through a circuit."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday Life",
        badge: "🌍 Clue 3 · Pure Water & Backwards Ohms (50 pts)",
        text: "Aquarium and RO water purity testers measure me (in µS/cm) to detect dissolved mineral ions. In vintage engineering textbooks, my unit was playfully spelled 'mho'—the word 'ohm' written backwards!"
      },
      {
        level: 4,
        points: 25,
        type: "Dead Giveaway & Pun",
        badge: "📜 Clue 4 · The Industrial Giant (25 pts)",
        text: "I honor Werner von Siemens, the legendary 19th-century German electrical pioneer who built Europe's first electric railway and founded the multinational tech titan Siemens AG."
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
        type: "Math & Lorentz",
        badge: "🔢 Clue 1 · The Force Formula (100 pts)",
        text: "Defined by the magnetic Lorentz force: F = q(v × B) or B = F / (I·L). In derived units: 1 Weber per square meter (Wb/m²) or 1 Newton per Ampere-meter. I measure localized magnetic strength."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Sensory",
        badge: "👁️ Clue 2 · The Iron Filings Halo (75 pts)",
        text: "Sprinkle fine grey iron filings on a sheet of paper over a neodymium magnet, and you will see me in action: dense, sharp curved halos showing the raw grip and focus of the magnetic field."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday Life",
        badge: "🌍 Clue 3 · Fridge Magnets & MRI Scanners (50 pts)",
        text: "Earth's natural magnetic shield is ~50 µT. A souvenir fridge magnet is ~5 milli-____. Hospital MRI scanners that peer deep inside the human brain operate at a ferocious 1.5 to 3 of me!"
      },
      {
        level: 4,
        points: 25,
        type: "Dead Giveaway & Pun",
        badge: "📜 Clue 4 · The AC Visionary & Electric Cars (25 pts)",
        text: "I am named after Nikola Tesla, the eccentric visionary who gave humanity alternating current (AC) power grids, radio control, and wireless coils (and whose surname was borrowed by Elon Musk!)."
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
    aliases: ["decibel", "decibels", "db", "bel", "bels", "sound level", "signal level", "volume", "loudness"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Math & Logarithms",
        badge: "🔢 Clue 1 · The Power of Logarithms (100 pts)",
        text: "I am a dimensionless logarithmic ratio: L = 10 log₁₀(P / P₀). Every +10 jump on my scale means sound or signal power has multiplied by 10x; a +20 jump means 100x more power!"
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Sensory",
        badge: "👁️ Clue 2 · The Bouncing VU Meters (75 pts)",
        text: "Watch green, amber, and flashing red LED VU bars bounce in sync with bass drops on a DJ mixing console. In music recording and telecommunications, I am the ultimate volume ruler."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday Life",
        badge: "🌍 Clue 3 · Whispers to Rock Concerts (50 pts)",
        text: "A quiet library whisper is 30 of me. Normal conversation is 60 of me. City traffic is 85 of me. A deafening rock concert hits 110 of me, and 130 of me marks the threshold of severe human ear pain!"
      },
      {
        level: 4,
        points: 25,
        type: "Dead Giveaway & Pun",
        badge: "📜 Clue 4 · Alexander Graham's Unit (25 pts)",
        text: "Attach the metric prefix for 'one-tenth' (deci-) to the 'Bel', named in honor of Alexander Graham Bell, the Scottish-Canadian inventor who received the first patent for the telephone in 1876."
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
        type: "Math & Nuclear Decay",
        badge: "🔢 Clue 1 · The Decay Rate (100 pts)",
        text: "Dimensionally, I appear as 1/second (s⁻¹). But do not confuse me with wave frequency! I specifically measure spontaneous nuclear disintegrations: exactly 1 atomic nucleus decaying per second."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Sensory",
        badge: "👁️ Clue 2 · The Clicking Geiger Counter (75 pts)",
        text: "Picture a researcher in a hazmat suit holding an ionization wand over rock samples. You hear rapid, erratic 'click-click-click' sounds as unstable atoms eject alpha, beta, or gamma radiation."
      },
      {
        level: 3,
        points: 50,
        type: "Tech & Everyday Life",
        badge: "🌍 Clue 3 · The Banana Dose (50 pts)",
        text: "Did you know? Eating a single supermarket banana introduces ~15 of me into your body due to natural Potassium-40! Your own body constantly emits about 4,500 of me every second."
      },
      {
        level: 4,
        points: 25,
        type: "Dead Giveaway & Pun",
        badge: "📜 Clue 4 · The Uranium in the Drawer (25 pts)",
        text: "I honor Henri Becquerel, who in 1896 placed uranium salts in a dark desk drawer next to wrapped photographic plates and serendipitously discovered natural radioactivity (Nobel Prize with Marie Curie)."
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
