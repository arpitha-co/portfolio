export const education = [
  {
    degree: "Master of Science",
    field: "Artificial Intelligence for Industrial Applications",
    school: "Ostbayerische Technische Hochschule (OTH) Amberg-Weiden",
    schoolUrl: "https://www.oth-aw.de/",
    place: "Amberg, Germany",
    period: "2024 – Present",
    current: true,
    focus: ["Robot learning", "Computer vision", "Handwritten text recognition", "Reinforcement learning", "Autonomous systems"],
    projects: [
      { title: "Fine-tuning VLA models for robotic manipulation (thesis, Fraunhofer IMS)", slug: "vla-robotic-manipulation" },
      { title: "Herbarium object detection & handwriting recognition", slug: "herbarium-detection" },
      { title: "Niryo Ned2 Connect Four robot", slug: "connect-four-robot" },
      { title: "Autonomous maze exploration & navigation", slug: "autonomous-navigation" },
      { title: "RL race track navigation (SAC)", slug: "rl-race-track" },
    ],
  },
  {
    degree: "Bachelor of Engineering",
    field: "Mechatronics Engineering",
    school: "The Oxford College of Engineering",
    schoolUrl: "https://www.theoxfordengg.org/",
    place: "Bengaluru, India",
    period: "2018 – 2022",
    current: false,
    focus: ["SolidWorks", "AutoCAD"],
    // PLACEHOLDER: add your bachelor's final-year project here, e.g.
    // { title: "Final-year project title" }
    projects: [] as { title: string; slug?: string }[],
  },
];
