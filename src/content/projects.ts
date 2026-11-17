import type { Project } from "./types";
import { video } from "./media";

/**
 * Projects. `featured: true` shows the project on the home page; every project
 * gets a detail page at /projects/<slug>/.
 *
 * Content rules: every number comes from an evaluation log, README or the CV;
 * every technical statement is backed by the code. Set `github` to null until a
 * public repository exists. Never invent results.
 */
export const projects: Project[] = [
  // ---------------------------------------------------------------- VLA thesis
  {
    slug: "vla-robotic-manipulation",
    title: "Fine-Tuning Vision-Language-Action Models for Robotic Grasping and Manipulation",
    shortTitle: "Fine-Tuning VLA Models for Manipulation",
    tagline: "From 0% zero-shot to 62% pick-and-place success on a Franka Emika Panda",
    period: "09/2026 – Present",
    status: "ongoing",
    context: "Master's thesis · Fraunhofer IMS",
    description:
      "Evaluating Vision-Language-Action models for robotic pick-and-place on a Franka Emika Panda in Isaac Sim, and fine-tuning π0.5 on planner-generated demonstrations.",
    problem:
      "Vision-Language-Action (VLA) models promise robots that act directly on camera images and natural-language instructions. Whether a pretrained model transfers to a new robot, camera setup and task, and what it takes to make it work there, is still an open question. The task in this thesis: a Franka Emika Panda has to pick up a cube and place it in a bin.",
    approach: [
      "I first evaluated pretrained OpenVLA, OpenVLA-OFT, π0 and π0.5 zero-shot in Isaac Sim. None of them completed the task (0% success). Some drifted away from the table, others went for the bin instead of the cube, which shows how hard it is to transfer pretrained policies directly to a new setup.",
      "To adapt a model, I built a data-collection workflow that uses a motion planner to generate robot demonstrations, and collected 70 demonstrations covering different object positions. I used them to fine-tune π0.5 for the pick-and-place task.",
      "I compared fine-tuning checkpoints on the same 50 seeded evaluation episodes. At 5,000 training steps the policy succeeded in 10 of 50 episodes. At 7,000 steps it succeeded in 31 of 50 (62%) and finished successful episodes faster. The remaining failures were 14 timeouts and 5 episodes where the cube was pushed off the table.",
    ],
    architecture: [
      { label: "Isaac Sim scene", detail: "Franka Panda, cube and bin; overhead and wrist cameras" },
      { label: "Zero-shot baseline", detail: "OpenVLA, OpenVLA-OFT, π0, π0.5 without adaptation" },
      { label: "Planner demonstrations", detail: "70 planner-generated pick-and-place demos across object positions" },
      { label: "Fine-tune π0.5", detail: "Adapt the pretrained policy on the collected demonstrations" },
      { label: "Seeded evaluation", detail: "Same 50 seeds per checkpoint: success, timeout, cube fell" },
    ],
    contribution: [
      "Set up and ran the zero-shot evaluation of four pretrained VLA models.",
      "Built the planner-based demonstration-collection workflow and collected the 70-demonstration dataset.",
      "Fine-tuned π0.5 and evaluated checkpoints on a fixed set of 50 seeded episodes, including failure analysis.",
    ],
    direction:
      "I'm investigating how demonstration quality, dataset diversity, object positions, model adaptation and fine-tuning strategies affect manipulation performance. Further evaluation will focus on improving reliability and generalisation.",
    highlights: [
      "Zero-shot evaluation of OpenVLA, OpenVLA-OFT, π0 and π0.5: 0% success",
      "Planner-based workflow generating 70 demonstrations across object positions",
      "Fine-tuned π0.5: 10 / 50 at 5k steps → 31 / 50 at 7k steps",
    ],
    results: [
      { value: "62%", label: "success after fine-tuning (31 / 50, 7k steps)" },
      { value: "20%", label: "earlier checkpoint (10 / 50, 5k steps)" },
      { value: "0%", label: "zero-shot baseline" },
    ],
    resultsTable: {
      caption: "Fine-tuned π0.5 on the same 50 seeded episodes in Isaac Sim (from the evaluation logs)",
      head: ["Checkpoint", "Success", "Timeout", "Cube fell off", "Success rate"],
      rows: [
        ["5,000 steps", "10", "38", "2", "20%"],
        ["7,000 steps", "31", "14", "5", "62%"],
      ],
    },
    coverVideo: video("vla/cover-ft7000-success", "Fine-tuned π0.5 picking up a cube and placing it in a bin with a Franka Panda in Isaac Sim"),
    demos: [
      {
        kind: "grid",
        title: "Zero-shot: pretrained models, no fine-tuning",
        intro: "Each pretrained model on the same pick-and-place task without adaptation. None of them completes it. Played at 4× speed; longer runs are trimmed to their first 45 s.",
        columns: 2,
        items: [
          { video: video("vla/zs-openvla", "OpenVLA zero-shot run"), label: "OpenVLA", caption: "Hovers above the table and never reaches the cube.", tone: "fail" },
          { video: video("vla/zs-openvla-oft", "OpenVLA-OFT zero-shot run"), label: "OpenVLA-OFT", caption: "Drifts slowly towards the cube but stays high and never grasps it.", tone: "fail" },
          { video: video("vla/zs-pi0", "π0 zero-shot run"), label: "π0", caption: "Moves towards the bin with erratic motions and never picks up the cube.", tone: "fail" },
          { video: video("vla/zs-pi05", "π0.5 zero-shot run"), label: "π0.5", caption: "Heads for the bin instead of the cube.", tone: "fail" },
        ],
      },
      {
        kind: "grid",
        title: "Fine-tuned π0.5: 7,000 steps",
        intro: "Overhead camera (left) and wrist camera (right), real time. One example of each outcome from the 50-episode evaluation; the last frame is held for 3 s.",
        columns: 1,
        items: [
          { video: video("vla/ft7000-success", "Fine-tuned π0.5, 7,000 steps, seed 1000: success", "32 / 9"), label: "Success", caption: "Seed 1000: grasps the cube and places it in the bin (visible in the wrist camera at the end).", tone: "ok" },
          { video: video("vla/ft7000-timeout", "Fine-tuned π0.5, 7,000 steps, seed 1001: timeout", "32 / 9"), label: "Timeout", caption: "Seed 1001: does not finish within the 90 s limit.", tone: "warn" },
          { video: video("vla/ft7000-cube-fell", "Fine-tuned π0.5, 7,000 steps, seed 1030: cube fell", "32 / 9"), label: "Cube fell", caption: "Seed 1030: the cube is pushed off the table.", tone: "fail" },
        ],
      },
      {
        kind: "grid",
        title: "Earlier checkpoint: 5,000 steps",
        intro: "The same seeds at 5,000 training steps, where only 10 of 50 episodes succeeded. Real time.",
        columns: 1,
        items: [
          { video: video("vla/ft5000-success", "Fine-tuned π0.5, 5,000 steps, seed 1000: success", "32 / 9"), label: "Success", caption: "Seed 1000: succeeds, but more slowly than at 7,000 steps.", tone: "ok" },
          { video: video("vla/ft5000-timeout", "Fine-tuned π0.5, 5,000 steps, seed 1001: timeout", "32 / 9"), label: "Timeout", caption: "Seed 1001: times out.", tone: "warn" },
          { video: video("vla/ft5000-cube-fell", "Fine-tuned π0.5, 5,000 steps, seed 1030: cube fell", "32 / 9"), label: "Cube fell", caption: "Seed 1030: the cube is pushed off the table.", tone: "fail" },
        ],
      },
    ],
    tech: ["π0 / π0.5", "OpenVLA / OpenVLA-OFT", "Vision-Language-Action models", "Franka Emika Panda", "Python", "Isaac Sim", "ROS 2", "Robotic manipulation", "Data collection & fine-tuning"],
    pipeline: [
      { label: "Zero-shot eval (0%)", state: "done" },
      { label: "Planner-based data collection (70 demos)", state: "done" },
      { label: "Fine-tune π0.5", state: "done" },
      { label: "Checkpoint eval: 10 → 31 / 50", state: "done" },
      { label: "Reliability & generalisation", state: "active" },
    ],
    images: [],
    github: null,
    featured: true,
  },

  // ---------------------------------------------------------------- Connect-4
  {
    slug: "connect-four-robot",
    title: "Connect-4 Robot: Vision-Guided Game Play on a Niryo Ned2",
    shortTitle: "Connect-4 Robot — Niryo Ned2",
    tagline: "A robot arm that reads a physical board, chooses a move and plays it",
    period: "10/2025 – 01/2026",
    status: "completed",
    context: "University project · OTH Amberg-Weiden",
    description:
      "A complete perception-to-action loop on real hardware: a camera reads the Connect-4 board, Minimax chooses a column, and the Niryo Ned2 picks a coin by suction and drops it in.",
    problem:
      "Playing a physical board game against a person combines every part of a robotic system: perception that has to be reliable under real lighting, game logic that must only react to valid moves, and manipulation that has to pick and place small coins precisely, every turn, without a human resetting anything.",
    approach: [
      "Perception uses classical computer vision with OpenCV. The board region is selected once and divided into a 6×7 grid. Each frame is converted to HSV, red and yellow discs are segmented with colour thresholds, and contours larger than a minimum area are assigned to grid cells by their centroid.",
      "To avoid reacting to noise or a hand in front of the board, a strict, gravity-aware move detector accepts a new move only if exactly one column changed, exactly one cell in it became occupied, and that cell is the lowest free position.",
      "The robot's move is chosen with Minimax and alpha-beta pruning over a window-based board evaluation. The search depth sets the difficulty (Easy 2, Medium 4, Hard 6).",
      "On the Niryo Ned2 (pyniryo), coins are picked by suction from three stacks of seven, using 21 pre-taught pick poses, and dropped through seven column poses. Every move follows the same safe sequence: approach 8 cm above the coin, pick, lift to a 0.40 m travel height, move over the column, drop, return home. A Tkinter settings dialog sets player, colour, difficulty and who starts, and a mock robot lets the whole pipeline run without hardware.",
    ],
    architecture: [
      { label: "Camera frame", detail: "Live stream, fixed board ROI split into a 6×7 grid" },
      { label: "HSV segmentation", detail: "Red / yellow masks, contour area filter, centroid → cell" },
      { label: "Move detection", detail: "Gravity-aware: one column, one new cell, lowest free slot" },
      { label: "Minimax + α-β", detail: "Depth 2 / 4 / 6 by difficulty, window-based scoring" },
      { label: "Pick & drop", detail: "Suction pick from 21 stack poses, drop at 7 column poses" },
    ],
    contribution: [
      "Implemented the vision pipeline: board grid, HSV disc segmentation and mapping to the game grid.",
      "Wrote the gravity-aware move detector and the Minimax / alpha-beta game AI with difficulty levels.",
      "Programmed the Niryo Ned2 pick-and-drop sequence, coin-stack management and a mock robot for hardware-free testing.",
      "Built the settings dashboard and spoken game feedback, and evaluated robustness under varying lighting and object configurations.",
    ],
    highlights: [
      "HSV colour segmentation mapped to a 6×7 game grid",
      "Gravity-aware move detection + Minimax with alpha-beta pruning",
      "Real suction pick-and-drop on a Niryo Ned2",
    ],
    tech: ["Python", "OpenCV", "HSV segmentation", "Minimax / alpha-beta", "pyniryo", "Niryo Ned2", "Tkinter", "NumPy"],
    coverVideo: video("connect4/cover", "The Niryo Ned2 picking a red coin from the stack and dropping it into the Connect-4 board"),
    demos: [
      {
        kind: "feature",
        title: "Full demonstration",
        intro: "Recorded in the lab: one robot move, a human reply, and the robot's next move. Jump to a moment with the chapters.",
        video: video("connect4/demo", "Connect-4 robot demonstration on the Niryo Ned2"),
        chapters: [
          { t: 0, label: "Detected board on the laptop" },
          { t: 9, label: "Robot picks a coin by suction" },
          { t: 21, label: "Drops it into the chosen column" },
          { t: 30, label: "Human plays a yellow disc" },
          { t: 39, label: "Next pick, close-up" },
          { t: 51, label: "Robot plays its reply" },
        ],
      },
    ],
    images: [
      { src: "/images/projects/connect4-robot.jpg", alt: "Niryo Ned2 next to the Connect-4 board while a person places a disc" },
      { src: "/images/projects/connect4-roi.jpg", alt: "Live Detection window: 6×7 grid overlay with the detected red disc at row 1, column 4" },
      { src: "/images/projects/connect4-interface.jpg", alt: "Game Settings dialog: player name, colour, difficulty and who starts" },
      { src: "/images/projects/connect4-playing.jpg", alt: "The robot during a game, coin stacks in front of it" },
    ],
    github: "https://github.com/arpitha-co/4connect",
    featured: true,
  },

  // ---------------------------------------------------------------- RL racing
  {
    slug: "rl-race-track",
    title: "Reinforcement Learning for Autonomous Race Track Navigation",
    shortTitle: "RL Race Track Navigation",
    tagline: "A Soft Actor-Critic agent that learns fast laps under noisy control",
    period: "12/2025 – 02/2026",
    status: "completed",
    context: "University project · OTH Amberg-Weiden",
    description:
      "A Soft Actor-Critic policy that learns to drive a 34-gate course with acceleration limits and noisy actuation. The included model finishes all 50 evaluation runs (median 85 steps).",
    problem:
      "A 2D vehicle has to pass 34 gates of a winding course in order, as fast as possible. It has acceleration limits, a 5 m/s top speed, steering that tightens with speed, and Gaussian noise on every acceleration command, so a policy has to plan ahead and stay robust, not just react to the next gate.",
    approach: [
      "I wrapped the course-provided environment in a Gymnasium adapter without modifying it. The adapter adds a 13-D observation (vehicle state plus the next four gate centres in the vehicle's own frame, so the policy can plan ahead) and a shaped reward: gate bonuses, a dense progress term towards the next gate, a per-step penalty that rewards speed, and a boundary penalty.",
      "I trained a Soft Actor-Critic agent with Stable-Baselines3, using hyperparameters from a sweep (2×256 MLP, 150k environment steps), and ran independent training instances while tracking sample efficiency and best lap length.",
      "Finally I evaluated every trained model over 50 noisy episodes. The best one finishes the course in all 50 runs with a median of 85 steps; it is included in the repository with an evaluation script that reproduces these numbers.",
    ],
    architecture: [
      { label: "Race environment", detail: "Course-provided dynamics, 34 gates, actuation noise" },
      { label: "Gymnasium adapter", detail: "13-D observation with 4-gate look-ahead in the vehicle frame" },
      { label: "Reward shaping", detail: "Gate bonus, progress term, step and boundary penalties" },
      { label: "SAC training", detail: "Stable-Baselines3, 2×256 MLP, 150k steps, swept hyperparameters" },
      { label: "Evaluation", detail: "50 noisy episodes per model; best model shipped in the repo" },
    ],
    contribution: [
      "Designed the Gymnasium adapter, the look-ahead observation and the reward shaping.",
      "Trained and tuned the SAC agents and logged rollouts during training.",
      "Evaluated all trained models, published the best one with a reproducible evaluation script.",
    ],
    highlights: [
      "Gymnasium adapter with 4-gate look-ahead observations and reward shaping",
      "SAC (Stable-Baselines3) with swept hyperparameters",
      "Trained model + evaluation script included for reproducible results",
    ],
    results: [
      { value: "50 / 50", label: "evaluation runs completed (with noise)" },
      { value: "85", label: "median steps to finish the 34 gates" },
    ],
    tech: ["Python", "Stable-Baselines3", "SAC", "Gymnasium", "PyTorch", "NumPy"],
    coverVideo: video("racing/best-model", "The included SAC model driving all 34 gates of the course", "4 / 3"),
    demos: [
      {
        kind: "episodes",
        title: "Learning progression",
        intro: "Rollouts of the deterministic policy recorded during one training run. Pick an episode to watch how the driving behaviour develops. The red line marks the next gate; rollouts stop at the 300-step limit or when the last gate is passed.",
        episodes: [
          {
            episode: 10,
            stage: "Early training",
            observation: "Passes only the first few gates, then leaves the course and drifts away until the step limit ends the rollout.",
            video: video("racing/episode-10", "Episode 10 rollout", "4 / 3"),
          },
          {
            episode: 40,
            stage: "Intermediate training",
            observation: "Follows the gate sequence for roughly half of the course (around gate 17 of 34) before the step limit is reached.",
            video: video("racing/episode-40", "Episode 40 rollout", "4 / 3"),
          },
          {
            episode: 100,
            stage: "Intermediate training",
            observation: "Gets as far as the second-to-last gate before the step limit is reached.",
            video: video("racing/episode-100", "Episode 100 rollout", "4 / 3"),
          },
          {
            episode: 400,
            stage: "Later training",
            observation: "Passes all 34 gates; the rollout ends when the final gate is crossed.",
            video: video("racing/episode-400", "Episode 400 rollout", "4 / 3"),
          },
        ],
      },
    ],
    images: [],
    github: "https://github.com/arpitha-co/racing_car",
    featured: true,
  },

  // ---------------------------------------------------------------- Maze navigation
  {
    slug: "autonomous-navigation",
    title: "Autonomous Exploration & Navigation for Mobile Robots",
    shortTitle: "Autonomous Maze Navigation",
    tagline: "Frontier exploration and A* planning through unknown mazes",
    period: "10/2025 – 02/2026",
    status: "completed",
    context: "University project · OTH Amberg-Weiden",
    description:
      "A navigation stack for a RosBot in Webots that explores unknown mazes, builds an occupancy map, and plans between goals while avoiding forbidden terrain.",
    problem:
      "In five unknown Webots mazes, a RosBot has to drive from a blue pillar to a yellow pillar as quickly as possible, without driving onto green (forbidden) ground and while recognising red walls as dead ends.",
    approach: [
      "Exploration is frontier-based: the robot targets the closest frontier plus selected farther frontiers for efficiency. An occupancy grid (free / occupied / unknown) is maintained and inflated into a costmap.",
      "A* plans on the costmap; the path is converted into waypoints that the robot follows sequentially, with dynamic replanning as the map changes.",
      "The camera detects the blue and yellow pillars and the green ground. Red walls trigger a 180° turn and replanning; LiDAR confirms them, and cells are only marked occupied after repeated detection to reduce false positives. The Webots supervisor is used only to read the robot's global pose against localisation drift.",
    ],
    architecture: [
      { label: "Camera + LiDAR", detail: "Pillars, green ground and red walls; range scans" },
      { label: "Occupancy grid", detail: "Free / occupied / unknown, inflated into a costmap" },
      { label: "Frontier selection", detail: "Closest plus selected farther frontiers" },
      { label: "A* planning", detail: "Shortest path on the costmap, converted to waypoints" },
      { label: "Execution", detail: "Waypoint following, dead-end turn and replanning" },
    ],
    contribution: [
      "Implemented frontier exploration, occupancy mapping, costmap inflation and A* planning.",
      "Built the camera and LiDAR perception for goals, forbidden ground and dead ends.",
      "Ran and timed the stack in all five mazes.",
    ],
    highlights: [
      "Frontier exploration + occupancy-grid mapping",
      "Costmap inflation and A* path planning with dynamic replanning",
      "Camera + LiDAR fusion for landmarks and dead-end detection",
    ],
    tech: ["Python", "Webots", "A*", "Occupancy grids", "LiDAR", "Computer Vision", "NumPy"],
    resultsTable: {
      caption: "Simulation time per maze (min:s:ms), from the project README",
      head: ["Maze", "Start → Blue", "Blue → Yellow", "Total"],
      rows: [
        ["1", "6:39:168", "4:23:584", "11:02:752"],
        ["2", "8:43:264", "4:54:272", "13:37:536"],
        ["3", "4:23:840", "2:23:104", "6:46:944"],
        ["4", "3:12:128", "2:28:704", "5:40:832"],
        ["5", "1:22:688", "1:31:360", "2:54:048"],
      ],
    },
    images: [
      { src: "/images/projects/nav-image.jpg", alt: "Webots maze with the RosBot, its camera view (bottom left) and the live occupancy map (top right)" },
      { src: "/images/projects/nav-map.png", alt: "Occupancy map generated during exploration", fit: "contain" },
      { src: "/images/projects/nav-inflated.png", alt: "Inflated costmap used by the A* planner", fit: "contain" },
    ],
    github: "https://github.com/arpitha-co/autonomous_driving",
    featured: true,
  },

  // ---------------------------------------------------------------- Herbarium
  {
    slug: "herbarium-detection",
    title: "Herbarium AI: Computer Vision and Historical Handwritten Text Recognition",
    shortTitle: "Herbarium AI — Detection & Handwriting Recognition",
    tagline: "Extracting structured botanical information from historical herbarium sheets",
    period: "04/2026 – Present",
    status: "ongoing",
    context: "University project · OTH Amberg-Weiden",
    description:
      "Object detection and handwritten text recognition on the University of Kiel's digitised herbarium specimens. YOLOv8n reaches ≈98.3% mAP@50.",
    problem:
      "Herbarium sheets are pressed plant specimens with handwritten labels, often more than a century old. Large collections are being digitised, but the information on them, such as plant structures and multilingual handwritten labels, still has to be extracted by hand.",
    approach: [
      "Working with the University of Kiel herbarium dataset, I annotated and managed a custom dataset in CVAT and fine-tuned YOLOv8 on it. I also ran open-vocabulary detection experiments with Grounding DINO and YOLO-World, and evaluated the models with mAP@50 and mAP@50-95.",
      "The second part, in progress, is automated recognition of the handwritten labels. These documents mix German and Latin, historical and calligraphic handwriting, and varied layouts and image quality, which makes them hard for standard OCR.",
    ],
    architecture: [
      { label: "Digitised sheets", detail: "University of Kiel herbarium images" },
      { label: "CVAT annotation", detail: "Custom labelled dataset" },
      { label: "Detection", detail: "Fine-tuned YOLOv8; Grounding DINO / YOLO-World experiments" },
      { label: "Label HTR", detail: "Evaluating OCR / HTR models on handwritten labels" },
      { label: "Structured data", detail: "Goal: botanical information extracted per sheet" },
    ],
    contribution: [
      "Annotated and managed the dataset in CVAT.",
      "Fine-tuned and evaluated YOLOv8; ran the open-vocabulary detection experiments.",
      "Evaluating OCR and handwritten text recognition models on the labels.",
    ],
    direction:
      "I'm evaluating existing OCR and handwritten text recognition models on herbarium labels, comparing their performance across languages and handwriting styles, and identifying ways to improve transcription accuracy. The long-term goal is an AI-based pipeline that extracts structured botanical information from historical herbarium collections.",
    highlights: [
      "Fine-tuned YOLOv8 on a custom CVAT-annotated dataset",
      "Open-vocabulary detection with Grounding DINO and YOLO-World",
      "Multilingual historical handwriting recognition (German, Latin)",
    ],
    results: [
      { value: "≈98.3%", label: "mAP@50 (YOLOv8n)" },
      { value: "≈85.9%", label: "mAP@50-95 (YOLOv8n)" },
    ],
    sections: [
      {
        title: "Handwritten text recognition: challenges",
        items: [
          "Multiple languages, including German and Latin.",
          "Historical handwriting and calligraphic writing styles.",
          "Variations in text layout, image quality and writing conventions.",
          "Difficulty recognising botanical names and historical annotations.",
        ],
      },
    ],
    tech: ["Python", "PyTorch", "YOLOv8", "Grounding DINO", "YOLO-World", "OpenCV", "CVAT", "Object Detection", "OCR / HTR"],
    pipeline: [
      { label: "CVAT annotation", state: "done" },
      { label: "YOLOv8 fine-tuning", state: "done" },
      { label: "Open-vocabulary experiments", state: "done" },
      { label: "HTR model evaluation", state: "active" },
      { label: "Structured extraction pipeline", state: "next" },
    ],
    images: [],
    github: null,
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
