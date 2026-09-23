// 10 Physical Quantities & SI Units for "Guess the Quantity"
// Clues strictly in order:
// 1. Math / Dimensional formula (100 pts) - Revealed immediately
// 2. Visual / Descriptive clue (75 pts) - Requires button click
// 3. Real-world example clue (50 pts) - Requires button click
// 4. Story / Scientist clue (25 pts) - Requires button click (always last)

const questions = [
  {
    id: 1,
    quantity: "Frequency",
    unit: "Hertz",
    symbol: "Hz",
    dimensionalFormula: "s⁻¹ or T⁻¹",
    aliases: ["hertz", "hz", "hertzes", "frequency", "freq", "1/s", "s^-1", "cycles per second"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Dimensions (100 pts)",
        text: "My dimensional formula is simply s⁻¹ (or T⁻¹ in base SI dimensions). In wave mechanics, I am inversely proportional to time period: f = 1 / T."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual & Behavior (75 pts)",
        text: "Imagine an oscilloscope screen plotting oscillating peaks and troughs, or concentric ripples spreading across water. Counting how many complete cycles or wave crests pass a fixed point each second gives my value."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Human ears can detect acoustic vibrations from roughly 20 to 20,000 of me. Standard orchestral concert pitch (Middle A) vibrates at exactly 440 of me, and modern home Wi-Fi routers transmit at 2.4 or 5 Giga-____."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Story & Scientist (25 pts)",
        text: "I honor the German physicist Heinrich Hertz, who in 1887 built spark-gap transmitters and zinc parabolic reflectors to experimentally prove Maxwell's theory that electromagnetic radio waves truly exist."
      }
    ],
    explanation: "Frequency measures the number of occurrences of a repeating event per unit of time. Its SI unit is the Hertz (Hz = 1/s), named after Heinrich Hertz."
  },
  {
    id: 2,
    quantity: "Electric Charge",
    unit: "Coulomb",
    symbol: "C",
    dimensionalFormula: "A·s or I·T",
    aliases: ["coulomb", "coulombs", "c", "charge", "electric charge", "q", "a*s", "as"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Dimensions (100 pts)",
        text: "My dimensional formula is A·s (or I·T in base SI units). Mathematically, I am defined by the time integral of electric current: Q = ∫ I dt (or Q = I × t for steady current)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual & Behavior (75 pts)",
        text: "Picture an electroscope with two ultra-thin gold leaves diverging inside a glass flask as like charges repel each other, or a rubber balloon rubbed against a wool sweater sticking magically to a plaster wall."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "A single elementary electron or proton carries an intrinsic magnitude of 1.602 × 10⁻¹⁹ of me. A standard smartphone battery holds roughly 10,000 to 18,000 of me, and a typical summer lightning bolt transfers about 15 of me down to ground."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Story & Scientist (25 pts)",
        text: "I am named in honor of Charles-Augustin de Coulomb, the French military engineer who in 1785 invented a sensitive torsion balance to formulate the famous inverse-square law governing electrostatic attraction and repulsion: F = k·(q₁q₂)/r²."
      }
    ],
    explanation: "Electric Charge is the physical property of matter that causes it to experience a force in an electromagnetic field. Its SI unit is the Coulomb (C = A·s), named after Charles-Augustin de Coulomb."
  },
  {
    id: 3,
    quantity: "Energy / Work",
    unit: "Joule",
    symbol: "J",
    dimensionalFormula: "kg·m²/s² or M·L²·T⁻²",
    aliases: ["joule", "joules", "j", "energy", "work", "heat", "n*m", "nm", "w*s", "ws"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Dimensions (100 pts)",
        text: "My dimensional formula is kg·m²·s⁻² (or M·L²·T⁻²). In terms of other SI units, I equal 1 Newton-meter (N·m), 1 Watt-second (W·s), or 1 Volt-Coulomb (V·C)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual & Behavior (75 pts)",
        text: "Envision a heavy wooden block pulled across a rough tabletop against friction, a compressed steel archery bow storing potential to launch an arrow, or heat transferring into water inside an insulated bomb calorimeter."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Lifting a medium 100-gram apple vertically upwards by exactly 1 meter against Earth's gravity requires roughly 1 of me. One dietary food Calorie (kcal) equals approximately 4,184 of me."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Story & Scientist (25 pts)",
        text: "I honor James Prescott Joule, the English brewer and physicist who used falling mechanical weights to turn brass paddles in water, proving the mechanical equivalence of heat and establishing the First Law of Thermodynamics."
      }
    ],
    explanation: "Energy is the quantitative property transferred to a body or physical system to perform work or heat. Its SI unit is the Joule (J = N·m = kg·m²/s²), named after James Prescott Joule."
  },
  {
    id: 4,
    quantity: "Capacitance",
    unit: "Farad",
    symbol: "F",
    dimensionalFormula: "kg⁻¹·m⁻²·s⁴·A² or M⁻¹·L⁻²·T⁴·I²",
    aliases: ["farad", "farads", "f", "capacitance", "capacitor", "c/v"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Dimensions (100 pts)",
        text: "My dimensional formula is kg⁻¹·m⁻²·s⁴·A² (or M⁻¹·L⁻²·T⁴·I²). In derived units, I am defined as 1 Coulomb of stored charge per 1 Volt of potential difference: C = Q / V."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual & Behavior (75 pts)",
        text: "Visualize two parallel conductive metal sheets separated by a thin non-conductive dielectric barrier (ceramic, mica, or paper). In schematic circuit diagrams, two equal parallel lines with a small gap represent this component."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "One whole unit of me is astronomical! The cylindrical cans soldered onto computer motherboards are rated in micro-____ (µF) or nano-____ (nF), while the electrostatic self-capacitance of the entire planet Earth is only about 710 µF."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Story & Scientist (25 pts)",
        text: "I am named after Michael Faraday, the pioneering English self-taught experimenter who discovered electromagnetic induction, invented the electric motor, and discovered that metallic shielding blocks electric fields (the Faraday Cage)."
      }
    ],
    explanation: "Capacitance is the ability of a system to store an electric charge per unit potential difference. Its SI unit is the Farad (F = C/V), named after Michael Faraday."
  },
  {
    id: 5,
    quantity: "Inductance",
    unit: "Henry",
    symbol: "H",
    dimensionalFormula: "kg·m²·s⁻²·A⁻² or M·L²·T⁻²·I⁻²",
    aliases: ["henry", "henries", "henrys", "h", "inductance", "inductor", "wb/a"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Dimensions (100 pts)",
        text: "My dimensional formula is kg·m²·s⁻²·A⁻² (or M·L²·T⁻²·I⁻²). In terms of derived SI units, I equal 1 Weber per Ampere (Wb/A) or 1 Volt-second per Ampere (V·s/A): V = -L (dI/dt)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual & Behavior (75 pts)",
        text: "Envision a tight helical coil of enameled copper wire wound neatly around an iron, ferrite, or air core. Due to Lenz's law, this component generates a back-EMF that strongly opposes any sudden changes in electric current."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "I am the operating principle behind electric guitar pickups, wireless Qi smartphone chargers, power supply choke coils, and AC step-down voltage transformers. Small RF coils are a few micro-____ (µH), while heavy transformer windings reach several of me."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Story & Scientist (25 pts)",
        text: "I honor Joseph Henry, the brilliant American scientist who discovered electromagnetic self-inductance independently at the same time as Faraday and served as the first Secretary of the Smithsonian Institution in Washington, D.C."
      }
    ],
    explanation: "Inductance is the property of an electrical conductor by which a change in current flowing through it induces an electromotive force in both the conductor itself and nearby conductors. Its SI unit is the Henry (H = Wb/A), named after Joseph Henry."
  },
  {
    id: 6,
    quantity: "Magnetic Flux",
    unit: "Weber",
    symbol: "Wb",
    dimensionalFormula: "kg·m²·s⁻²·A⁻¹ or M·L²·T⁻²·I⁻¹",
    aliases: ["weber", "webers", "wb", "magnetic flux", "flux", "v*s", "vs", "t*m^2", "tm2"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Dimensions (100 pts)",
        text: "My dimensional formula is kg·m²·s⁻²·A⁻¹ (or M·L²·T⁻²·I⁻¹). In derived units, I equal 1 Volt-second (V·s) or 1 Tesla-square meter (T·m²), mathematically defined by the surface integral Φ_B = ∬ B · dA."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual & Behavior (75 pts)",
        text: "Picture invisible magnetic field lines streaming like water rays through a circular hula-hoop or wire loop. I quantify the total aggregate amount of magnetic field that passes perpendicularly through that enclosed boundary."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "According to Faraday's law of induction, if 1 of me changes through a one-turn wire loop within 1 second, it induces an electric potential difference of exactly 1 Volt. This exact relationship drives hydroelectric turbines and wind generators."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Story & Scientist (25 pts)",
        text: "I am named after Wilhelm Eduard Weber, the 19th-century German physicist who collaborated closely with mathematician Carl Friedrich Gauss on the Earth's magnetic field and co-built an early electromagnetic telegraph in 1833."
      }
    ],
    explanation: "Magnetic Flux is a measurement of the total magnetic field which passes through a given surface area. Its SI unit is the Weber (Wb = V·s = T·m²), named after Wilhelm Eduard Weber."
  },
  {
    id: 7,
    quantity: "Conductance",
    unit: "Siemens",
    symbol: "S",
    dimensionalFormula: "kg⁻¹·m⁻²·s³·A² or M⁻¹·L⁻²·T³·I²",
    aliases: ["siemens", "s", "conductance", "electrical conductance", "mho", "siemen", "1/ohm", "ohm^-1"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Dimensions (100 pts)",
        text: "My dimensional formula is kg⁻¹·m⁻²·s³·A² (or M⁻¹·L⁻²·T³·I²). I am the exact mathematical reciprocal of electrical resistance: G = 1 / R = I / V. Historically, engineers wrote my unit by reversing the word 'ohm' to 'mho' with an upside-down omega symbol (℧)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual & Behavior (75 pts)",
        text: "While resistance illustrates a narrow bottleneck or friction slowing down a crowd, imagine me as a wide-open multi-lane highway or a frictionless valve indicating how smoothly and easily electrons glide through a conductor."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Water quality testers and laboratory TDS probes measure me (often in micro-____ per cm, µS/cm) to instantly calculate the salinity, dissolved ionic salts, and mineral purity of drinking water, hydroponics, and swimming pools."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Story & Scientist (25 pts)",
        text: "I honor Werner von Siemens, the legendary 19th-century German electrical engineer, inventor of the pointer telegraph, and industrialist who founded Siemens AG and built the world's first electric street elevator and electric railway."
      }
    ],
    explanation: "Conductance is the measure of how easily electric current flows through a material, the reciprocal of resistance. Its SI unit is the Siemens (S = 1/Ω = A/V), named after Werner von Siemens."
  },
  {
    id: 8,
    quantity: "Magnetic Flux Density",
    unit: "Tesla",
    symbol: "T",
    dimensionalFormula: "kg·s⁻²·A⁻¹ or M·T⁻²·I⁻¹",
    aliases: ["tesla", "teslas", "t", "magnetic flux density", "magnetic field", "b field", "magnetic field strength", "wb/m^2", "wbm2"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Dimensions (100 pts)",
        text: "My dimensional formula is kg·s⁻²·A⁻¹ (or M·T⁻²·I⁻¹). In derived SI units, I equal 1 Weber per square meter (Wb/m²) or 1 Newton per Ampere-meter (N/(A·m)). In the Lorentz force formula: F = q(v × B)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual & Behavior (75 pts)",
        text: "Picture fine dark iron filings clustering tightly in sharp, dense curving lines around the poles of a high-power rare-earth magnet. I quantify the localized concentration or areal density of the magnetic vector field B."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Earth's natural geomagnetic field at the equator is very subtle, around 30 to 50 micro-____ (µT). A decorative refrigerator magnet is about 5 milli-____ (5 mT), while superconducting clinical hospital MRI scanners operate at 1.5 to 3 of me."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Story & Scientist (25 pts)",
        text: "I am named after Nikola Tesla, the eccentric Serbian-American visionary genius whose patents for alternating current (AC) polyphase power distribution, induction motors, and high-frequency resonant coils illuminated the modern world."
      }
    ],
    explanation: "Magnetic Flux Density (also called magnetic B-field) measures the strength and concentration of a magnetic field per unit area. Its SI unit is the Tesla (T = Wb/m² = N/(A·m)), named after Nikola Tesla."
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
        badge: "🔢 Clue 1 · Math & Dimensions (100 pts)",
        text: "I am a dimensionless logarithmic relative unit expressing the ratio of a physical quantity (power, voltage, or sound pressure) relative to a reference level: L = 10 log₁₀(P / P₀) or L = 20 log₁₀(V / V₀)."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual & Behavior (75 pts)",
        text: "Look at a professional sound mixing board or DJ deck with green, amber, and flashing red LED VU peak meters bouncing in time with the music beat, or graphic equalizers labeled from -∞ to +6."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "A rustling leaf or faint whisper is roughly 20 to 30 of me, normal human conversation is about 60 of me, a loud rock music concert or pneumatic drill hits 110 of me, and 130 of me marks the threshold of severe human ear pain."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Story & Scientist (25 pts)",
        text: "My name prefixes 'deci-' (meaning one-tenth) onto the 'Bel', originally named in honor of Alexander Graham Bell, the Scottish-Canadian inventor who received the first US patent for the telephone in 1876."
      }
    ],
    explanation: "The Decibel (dB) is a logarithmic unit used to express the ratio of two values of a physical quantity, commonly used in acoustics, telecommunications, and electronics. Named after Alexander Graham Bell."
  },
  {
    id: 10,
    quantity: "Radioactivity",
    unit: "Becquerel",
    symbol: "Bq",
    dimensionalFormula: "s⁻¹ or T⁻¹",
    aliases: ["becquerel", "becquerels", "bq", "radioactivity", "activity", "decay rate", "disintegrations per second"],
    clues: [
      {
        level: 1,
        points: 100,
        type: "Math & Dimensions",
        badge: "🔢 Clue 1 · Math & Dimensions (100 pts)",
        text: "My dimensional formula is s⁻¹ (or T⁻¹ in base SI dimensions). While frequency measures periodic repetitive cycles, I strictly quantify the stochastic decay rate of atomic nuclei: exactly 1 nuclear disintegration or transformation per second."
      },
      {
        level: 2,
        points: 75,
        type: "Visual & Descriptive",
        badge: "👁️ Clue 2 · Visual & Behavior (75 pts)",
        text: "Imagine an unstable heavy isotope with an erratic nucleus emitting an alpha particle, beta electron, or high-energy gamma photon, causing an audio click and needle kick on a handheld Geiger counter tube."
      },
      {
        level: 3,
        points: 50,
        type: "Real-World Everyday",
        badge: "🌍 Clue 3 · Real-World Example (50 pts)",
        text: "Eating an everyday grocery store banana delivers approximately 15 of me because of naturally occurring radioactive Potassium-40 (⁴⁰K). The average human body naturally emits about 4,000 to 5,000 of me constantly from internal potassium and carbon-14."
      },
      {
        level: 4,
        points: 25,
        type: "Scientist & History",
        badge: "📜 Clue 4 · Story & Scientist (25 pts)",
        text: "I am named after Henri Becquerel, the French physicist who in 1896 stored phosphorescent uranium salts in an opaque dark drawer next to sealed photographic plates, accidentally discovering spontaneous natural radioactivity and sharing the 1903 Nobel Prize with Marie and Pierre Curie."
      }
    ],
    explanation: "Radioactivity (Activity) is the rate at which unstable nuclei decay. Its SI unit is the Becquerel (Bq = 1 decay/s), named after Henri Becquerel."
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
      clue: "Italian physicist & count who invented the Voltaic Pile in 1800 (the world's first true chemical battery made from stacked zinc and copper discs separated by saltwater pads).",
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
