import type { Experience, TimelineItem } from "./types";

export const experience: Experience[] = [
  {
    id: "fraunhofer",
    role: "Student Research Assistant — Robot Learning & Master's Thesis",
    org: "Fraunhofer Institute for Microelectronic Circuits and Systems (IMS)",
    orgUrl: "https://www.ims.fraunhofer.de/",
    period: "09/2026 – Present",
    location: "Duisburg, Germany",
    status: "ongoing",
    summary:
      "Master's thesis on fine-tuning Vision-Language-Action (VLA) models for robotic grasping and manipulation with a Franka Emika Panda.",
    metrics: [
      { value: "62%", label: "pick-and-place success after fine-tuning (31 / 50 episodes, up from 0% zero-shot)" },
      { value: "70", label: "planner-generated demonstrations" },
    ],
    bullets: [
      "Evaluated pretrained VLA models (OpenVLA, OpenVLA-OFT, π0 and π0.5) zero-shot on a pick-and-place task in Isaac Sim. All reached a 0% success rate, which shows how hard direct transfer to a new robot setup is.",
      "Developed a data-collection workflow that uses a planner to generate robot demonstrations, and collected 70 demonstrations covering different object positions.",
      "Fine-tuned π0.5 for the Franka Emika Panda pick-and-place setup and compared checkpoints on the same 50 seeded episodes: 10 / 50 successes at 5,000 steps and 31 / 50 (62%) at 7,000 steps.",
      "Currently investigating how demonstration quality, dataset diversity, object positions, model adaptation and fine-tuning strategies affect performance, with a focus on reliability and generalisation.",
    ],
    tech: ["π0 / π0.5", "VLA models", "Franka Emika Panda", "Python", "Isaac Sim", "ROS 2", "Robotic manipulation", "Data collection & fine-tuning"],
  },
  {
    id: "infosys",
    role: "System Engineer",
    org: "Infosys Limited",
    orgUrl: "https://www.infosys.com/",
    period: "08/2022 – 10/2024",
    location: "Bengaluru, India",
    status: "completed",
    summary:
      "Enterprise software development and automation: OCR-based document processing and banking back-end services.",
    metrics: [
      { value: ">90%", label: "unit-test coverage with JUnit & Mockito" },
      { value: "2+ yrs", label: "production software engineering" },
    ],
    bullets: [
      "Contributed to an OCR-based PDF invoice and bill-processing platform, testing and validating extraction accuracy and data quality for the SLS and Template modules across heterogeneous document formats.",
      "Developed and enhanced REST APIs for banking modules (Accounts, Beneficiary) using Java 17 and Spring Boot.",
      "Designed automated unit tests with JUnit and Mockito, reaching more than 90% coverage and reducing production defects.",
      "Gathered requirements with client stakeholders and wrote the Technical Specification Documents the team built from; ran knowledge-transfer sessions for new team members.",
    ],
    tech: ["Java 17", "Spring Boot", "REST APIs", "JUnit", "Mockito", "Maven", "Git"],
  },
  {
    id: "visolutions",
    role: "Data Analysis Intern",
    org: "VI Solutions",
    orgUrl: "https://visolutions.org/",
    period: "08/2021 – 09/2021",
    location: "Bengaluru, India",
    status: "completed",
    summary: "Machine learning on sensor data for prediction and anomaly detection.",
    bullets: [
      "Processed and analyzed sensor data to perform prediction and anomaly detection using machine learning techniques.",
      "Applied data-driven methods to identify patterns and support process optimization decisions.",
      "Collaborated with cross-functional teams to interpret results and translate them into actionable insights.",
    ],
    tech: ["Machine Learning", "Data Analysis", "Anomaly Detection"],
  },
];

/** About-section journey. Dates come from the CV; nothing is estimated. */
export const journey: TimelineItem[] = [
  {
    period: "2018 – 2022",
    title: "B.E. Mechatronics Engineering",
    org: "The Oxford College of Engineering",
    place: "Bengaluru, India",
    kind: "education",
  },
  {
    period: "2022 – 2024",
    title: "System Engineer",
    org: "Infosys",
    place: "Bengaluru, India",
    kind: "work",
  },
  {
    period: "2024 – Present",
    title: "M.Sc. AI for Industrial Applications",
    org: "OTH Amberg-Weiden",
    place: "Amberg, Germany",
    kind: "education",
    current: true,
  },
  {
    period: "2026 – Present",
    title: "Robot Learning Research & Master's Thesis",
    org: "Fraunhofer IMS",
    place: "Duisburg, Germany",
    kind: "research",
    current: true,
  },
];
