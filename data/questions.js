// 10 Physical Quantities & SI Units for "Guess the Quantity"
// Tuned for 1st-year college students: accessible, engaging, and clear!

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
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Formula (100 pts)",
        text: "Formula: f = 1 / T. My SI unit is simply 1/second (s⁻¹). I measure how many complete waves, cycles, or vibrations occur every single second."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual Clue (75 pts)",
        text: "Visual: Imagine a vibrating guitar string, ripples spreading across water, or a sine wave plotted on an oscilloscope."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Real-World: Modern smartphone displays refresh at 60 or 120 of me. Home Wi-Fi routers broadcast at 2.4 or 5 Giga-____, and human hearing ranges from 20 to 20,000 of me."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Scientist & Fun Clue (25 pts)",
        text: "Scientist: Named after German physicist Heinrich Hertz, who proved radio waves exist in 1887. (Dad joke: What unit hurts when you stub your toe?)"
      }
    ],
    explanation: "Frequency measures how many cycles happen per second. Its SI unit is the Hertz (Hz = 1/s), named after Heinrich Hertz."
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
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Formula (100 pts)",
        text: "Formula: Q = I × t (Current × Time). In base SI units, I equal 1 Ampere-second (A·s). I measure the fundamental quantity of electric charge."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual Clue (75 pts)",
        text: "Visual: Rubbing a balloon on a wool sweater makes it stick to a wall, or two gold leaves diverging in an electroscope due to electrostatic repulsion."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Real-World: A single electron carries a tiny -1.602 × 10⁻¹⁹ of me. A smartphone battery stores roughly 15,000 of me, and a summer lightning bolt delivers about 15 of me."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Scientist & Fun Clue (25 pts)",
        text: "Scientist: Named after Charles-Augustin de Coulomb, who discovered that like charges repel and opposite charges attract via the inverse-square law: F = k·(q₁q₂)/r²."
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
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Formula (100 pts)",
        text: "Formula: Work = Force × Distance (W = F × d). In SI units, I equal 1 Newton-meter (N·m) or 1 Watt-second (W·s)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual Clue (75 pts)",
        text: "Visual: A stretched archery bow ready to shoot an arrow, a roller coaster dropping down a hill, or mechanical effort heating up a container of water."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Real-World: Lifting an average 100-gram apple vertically upwards by exactly 1 meter against Earth's gravity takes about 1 of me. One dietary food Calorie equals about 4,184 of me."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Scientist & Fun Clue (25 pts)",
        text: "Scientist: Named after James Prescott Joule, the English physicist who proved mechanical work converts directly into heat. Every form of energy uses my unit!"
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
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Formula (100 pts)",
        text: "Formula: C = Q / V (Stored charge per Volt). My SI unit is defined as 1 Coulomb per Volt (C/V)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual Clue (75 pts)",
        text: "Visual: Two parallel metal plates separated by an insulating gap (ceramic, air, or plastic) that temporarily stores electric charge like a miniature electronic reservoir."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Real-World: Found in the cylindrical 'condenser' that gives ceiling fans torque to start spinning, and inside camera flashes. Usually measured in micro-____ (µF)."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Scientist & Fun Clue (25 pts)",
        text: "Scientist: Named after Michael Faraday, who discovered electromagnetic induction, invented the electric motor, and created the famous metallic Faraday cage."
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
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Formula (100 pts)",
        text: "Formula: Induced EMF V = -L (dI/dt). My unit equals 1 Volt-second per Ampere (V·s/A) or 1 Weber per Ampere (Wb/A). I oppose sudden changes in current."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual Clue (75 pts)",
        text: "Visual: A neat copper wire wound in a spiral helical coil or solenoid around an iron core, creating a magnetic field when electric current flows."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Real-World: Key component in electric guitar pickups, wireless Qi charging pads, AC power adapters, and tube-light choke ballasts. Usually measured in milli-____ (mH)."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Scientist & Fun Clue (25 pts)",
        text: "Scientist: Named after American physicist Joseph Henry, who discovered self-inductance and served as the first Secretary of the Smithsonian Institution."
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
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Formula (100 pts)",
        text: "Formula: Φ = B × A × cos(θ) (Magnetic Field × Area). In other derived SI units, I equal 1 Tesla-square meter (T·m²) or 1 Volt-second (V·s)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual Clue (75 pts)",
        text: "Visual: Imagine magnetic field lines streaming like water rays through an open circular hula hoop or loop of wire."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Real-World: According to Faraday's Law, when I change inside a coil of wire, voltage is induced! This is how every hydroelectric dam and power generator creates electricity."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Scientist & Fun Clue (25 pts)",
        text: "Scientist: Named after German physicist Wilhelm Weber, who worked closely with Carl Friedrich Gauss on Earth's magnetism and built an early electric telegraph in 1833."
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
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Formula (100 pts)",
        text: "Formula: G = 1 / R = I / V. I am the exact mathematical reciprocal (opposite) of Electrical Resistance. My unit is 1/ohm (Ω⁻¹)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual Clue (75 pts)",
        text: "Visual: If resistance represents a bottleneck or friction slowing down cars, I represent a wide open multi-lane expressway showing how easily electrons flow!"
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Real-World: Water purity testers and aquarium TDS meters measure me (in µS/cm) to check dissolved minerals. Historically engineers called me 'mho' (ohm spelled backwards!)."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Scientist & Fun Clue (25 pts)",
        text: "Scientist: Named after Werner von Siemens, the German electrical engineer who built Europe's first electric railway and founded the global engineering company Siemens AG."
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
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Formula (100 pts)",
        text: "Formula: Lorentz force F = q(v × B) or B = F / (I·L). In derived SI units: 1 Weber per square meter (Wb/m²) or 1 Newton per Ampere-meter. I measure magnetic field strength."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual Clue (75 pts)",
        text: "Visual: Dark iron filings clustering tightly in sharp, dense curving lines around the poles of a strong bar magnet."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Real-World: Earth's geomagnetic field is faint (~50 µT). A fridge magnet is ~5 milli-____. Hospital MRI scanners that produce detailed body scans are 1.5 to 3 of me!"
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Scientist & Fun Clue (25 pts)",
        text: "Scientist: Named after Nikola Tesla, the brilliant Serbian-American inventor of alternating current (AC) motors and the Tesla coil (and namesake of the famous EV car brand!)."
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
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Formula (100 pts)",
        text: "Formula: L = 10 log₁₀(P / P₀). I am a dimensionless logarithmic unit expressing the ratio of power, voltage, or sound intensity relative to a baseline reference."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual Clue (75 pts)",
        text: "Visual: Green, amber, and red VU meter LED bars bouncing in sync with the beat on a DJ music mixing board."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Real-World: A library whisper is ~30 of me, normal human talking is ~60 of me, city traffic is ~85 of me, and a loud rock concert reaches 110 of me (130 is the pain threshold!)."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Scientist & Fun Clue (25 pts)",
        text: "Scientist: Prefixes 'deci-' (one-tenth) onto the 'Bel', named in honor of Alexander Graham Bell, the Scottish-born inventor who patented the telephone in 1876."
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
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Formula (100 pts)",
        text: "Formula: Units: s⁻¹ (1/second). Unlike frequency which counts repetitive cycles, I specifically count nuclear decays: exactly 1 atomic nucleus disintegrating per second."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual Clue (75 pts)",
        text: "Visual: A handheld Geiger-Müller counter rapidly clicking as unstable radioactive atoms emit alpha particles, beta electrons, or gamma rays."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Real-World: Eating an ordinary banana emits roughly 15 of me due to natural Potassium-40 (⁴⁰K). The average human body naturally produces about 4,500 of me constantly!"
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Scientist & Fun Clue (25 pts)",
        text: "Scientist: Named after Henri Becquerel, who in 1896 discovered natural radioactivity by accidentally leaving uranium salts in a dark drawer next to photo plates (shared Nobel Prize with Marie Curie)."
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
      clue: "Italian physicist who invented the Voltaic Pile in 1800 (the world's first true chemical battery made of copper and zinc discs).",
      points: 50
    },
    {
      id: "quantity",
      title: "Name the Physical Quantity",
      answer: "Electric Potential Difference / Voltage / Electromotive Force (EMF)",
      clue: "The work needed per unit of charge between two points (1 V = 1 Joule per Coulomb).",
      points: 50
    },
    {
      id: "example",
      title: "Provide a Real-World Example",
      answer: "AA Battery (~1.5 V), USB Port (5 V), Car Battery (12 V), Wall Socket (120 V / 230 V)",
      clue: "Any everyday household or electronics voltage rating.",
      points: 50
    }
  ],
  hostNotes: "Host can award up to 150 bonus points for the Reverse Detective round by checking off the verified answers!"
};

module.exports = {
  questions,
  reverseDetective
};
