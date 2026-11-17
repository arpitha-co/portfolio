import type { Project } from "./types";

/**
 * Projects. `featured: true` shows the project on the home page; every project
 * gets a detail page at /projects/<slug>/.
 * Only add results you have measured. Set `github` to null until a public repo exists.
 */
export const projects: Project[] = [
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
    details: [
      "Vision-Language-Action (VLA) models promise robots that act on camera images and natural-language instructions. My thesis studies how well these models transfer to a specific robotic setup, and what it takes to make them work there, using a Franka Emika Panda. The task: pick up a cube and place it in a bin.",
      "I started by evaluating pretrained OpenVLA, OpenVLA-OFT, π0 and π0.5 zero-shot in Isaac Sim. None of them completed the task (0% success). Some drifted away from the table, others went for the bin instead of the cube, which shows how hard it is to transfer pretrained policies directly to a new robot setup.",
      "To improve performance, I built a data-collection workflow that uses a motion planner to generate robot demonstrations. With it I collected 70 demonstrations covering different object positions and used them to fine-tune π0.5 for the pick-and-place task.",
      "I evaluated fine-tuning checkpoints on the same 50 seeded episodes. At 5,000 training steps the policy succeeded in 10 of 50 episodes. At 7,000 steps it succeeded in 31 of 50 (62%) and finished successful episodes faster. The remaining failures were 14 timeouts and 5 episodes where the cube was pushed off the table.",
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
      head: ["Checkpoint", "Success", "Timeout", "Cube fell off table", "Success rate"],
      rows: [
        ["5,000 steps", "10", "38", "2", "20%"],
        ["7,000 steps", "31", "14", "5", "62%"],
      ],
    },
    coverVideo: {
      src: "/videos/vla/cover-ft7000-success.mp4",
      poster: "/videos/vla/cover-ft7000-success.jpg",
      alt: "Fine-tuned π0.5 picking up a cube and placing it in a bin with a Franka Panda in Isaac Sim",
    },
    videoGroups: [
      {
        title: "Zero-shot: pretrained models, no fine-tuning",
        intro: "Each pretrained model on the same pick-and-place task without any adaptation. None of them completes it. Played at 4× speed; the longer runs are trimmed to their first 45 s.",
        columns: 2,
        items: [
          { src: "/videos/vla/zs-openvla.mp4", poster: "/videos/vla/zs-openvla.jpg", label: "OpenVLA", caption: "Hovers above the table and never reaches the cube.", tone: "fail" },
          { src: "/videos/vla/zs-openvla-oft.mp4", poster: "/videos/vla/zs-openvla-oft.jpg", label: "OpenVLA-OFT", caption: "Drifts slowly towards the cube but stays high and never grasps it.", tone: "fail" },
          { src: "/videos/vla/zs-pi0.mp4", poster: "/videos/vla/zs-pi0.jpg", label: "π0", caption: "Moves towards the bin with erratic motions and never picks up the cube.", tone: "fail" },
          { src: "/videos/vla/zs-pi05.mp4", poster: "/videos/vla/zs-pi05.jpg", label: "π0.5", caption: "Heads for the bin instead of the cube.", tone: "fail" },
        ],
      },
      {
        title: "Fine-tuned π0.5: 7,000 steps",
        intro: "Overhead camera (left) and wrist camera (right), in real time. One example of each outcome from the 50-episode evaluation; the last frame is held for 3 s so the final state is visible.",
        columns: 1,
        items: [
          { src: "/videos/vla/ft7000-success.mp4", poster: "/videos/vla/ft7000-success.jpg", label: "Success", caption: "Seed 1000: grasps the cube and places it in the bin (visible in the wrist camera at the end).", tone: "ok" },
          { src: "/videos/vla/ft7000-timeout.mp4", poster: "/videos/vla/ft7000-timeout.jpg", label: "Timeout", caption: "Seed 1001: does not finish within the 90 s limit.", tone: "warn" },
          { src: "/videos/vla/ft7000-cube-fell.mp4", poster: "/videos/vla/ft7000-cube-fell.jpg", label: "Cube fell", caption: "Seed 1030: the cube is pushed off the table.", tone: "fail" },
        ],
      },
      {
        title: "Earlier checkpoint: 5,000 steps",
        intro: "The same seeds at 5,000 training steps, where only 10 of 50 episodes succeeded. Real time.",
        columns: 1,
        items: [
          { src: "/videos/vla/ft5000-success.mp4", poster: "/videos/vla/ft5000-success.jpg", label: "Success", caption: "Seed 1000: succeeds, but more slowly than at 7,000 steps.", tone: "ok" },
          { src: "/videos/vla/ft5000-timeout.mp4", poster: "/videos/vla/ft5000-timeout.jpg", label: "Timeout", caption: "Seed 1001: times out.", tone: "warn" },
          { src: "/videos/vla/ft5000-cube-fell.mp4", poster: "/videos/vla/ft5000-cube-fell.jpg", label: "Cube fell", caption: "Seed 1030: the cube is pushed off the table.", tone: "fail" },
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
  {
    slug: "herbarium-detection",
    title: "Herbarium AI: Computer Vision and Historical Handwritten Text Recognition",
    shortTitle: "Herbarium AI — Detection & Handwriting Recognition",
    tagline: "Extracting structured botanical information from historical herbarium sheets",
    period: "04/2026 – Present",
    status: "ongoing",
    context: "University project · OTH Amberg-Weiden",
    description:
      "Object detection and handwritten text recognition on the University of Kiel's digitised herbarium specimens. YOLOv8n reaches ~98.3% mAP@50.",
    details: [
      "Herbarium sheets are pressed plant specimens with handwritten labels, often more than a century old. I'm working with the University of Kiel herbarium dataset to develop computer vision approaches for analysing these digitised specimens.",
      "The project combines object detection with document understanding. For detection, I annotated and managed a custom dataset in CVAT and fine-tuned YOLOv8 on it. I also ran open-vocabulary detection experiments with Grounding DINO and YOLO-World. I evaluated the models with mAP@50 and mAP@50-95, and YOLOv8n reached approximately 98.3% mAP@50 and 85.9% mAP@50-95 on the evaluated dataset.",
      "The second part, currently in progress, is automated recognition of the handwritten information on the specimen labels. These multilingual, historical documents are hard for standard OCR.",
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
        title: "1 · Object detection",
        items: [
          "Fine-tuned YOLOv8 on a custom herbarium dataset.",
          "Grounding DINO and YOLO-World for open-vocabulary detection experiments.",
          "CVAT for dataset annotation and management.",
          "Evaluated with mAP@50 and mAP@50-95. YOLOv8n reached ≈98.3% mAP@50 and ≈85.9% mAP@50-95 on the evaluated dataset.",
        ],
      },
      {
        title: "2 · Multilingual handwritten text recognition: challenges",
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
  {
    slug: "connect-four-robot",
    title: "Computer Vision System for Object Detection & Robotic Interaction",
    shortTitle: "Niryo Ned2 — Connect Four Robot",
    tagline: "A robot arm that sees the board, picks a move, and plays it",
    period: "10/2025 – 01/2026",
    status: "completed",
    context: "University project · OTH Amberg-Weiden",
    description:
      "An end-to-end perception-to-action pipeline: the Niryo Ned2 watches a physical Connect Four board, decides its move with Minimax, and drops the disc itself.",
    details: [
      "The system closes the loop from camera to gripper. A live camera stream is processed with OpenCV: the board is located, a Region of Interest is extracted, and red and yellow discs are segmented in HSV colour space and mapped to the 6×7 grid.",
      "The detected game state is passed to a Minimax decision engine, which chooses the best column. The chosen move is executed on the Niryo Ned2 through pyniryo: the arm picks a disc from the stack and drops it into the selected column.",
      "A Tkinter dashboard shows the live feed, detection overlays, ROI preview, decision state and robot feedback. I evaluated robustness under varying lighting and object configurations to make both perception and execution more reliable.",
    ],
    highlights: [
      "HSV colour segmentation + ROI extraction mapped to the game grid",
      "Minimax decision engine for move selection",
      "Real-time pick-and-drop on the Niryo Ned2 via pyniryo",
    ],
    tech: ["Python", "OpenCV", "HSV colour detection", "ROI", "Minimax", "pyniryo", "Niryo Ned2", "Tkinter"],
    images: [
      { src: "/images/projects/connect4-robot.jpg", alt: "Niryo Ned2 robot arm next to a Connect Four board with a human placing a disc" },
      { src: "/images/projects/connect4-interface.jpg", alt: "Dashboard with live camera feed, detection overlay and robot status" },
      { src: "/images/projects/connect4-roi.jpg", alt: "Extracted region of interest of the board with detected discs" },
      { src: "/images/projects/connect4-playing.jpg", alt: "The robot playing a move during a game" },
    ],
    github: "https://github.com/arpitha-co/4connect",
    featured: true,
  },
  {
    slug: "autonomous-navigation",
    title: "Autonomous Exploration & Navigation for Mobile Robots",
    shortTitle: "Autonomous Maze Navigation",
    tagline: "Frontier exploration and A* planning through unknown mazes",
    period: "10/2025 – 02/2026",
    status: "completed",
    context: "University project · OTH Amberg-Weiden",
    description:
      "A navigation stack for a RosBot in Webots that explores unknown mazes, builds an occupancy map, and plans the shortest route between goals while avoiding forbidden terrain.",
    details: [
      "The robot has to drive from a blue pillar to a yellow pillar in five unknown mazes as quickly as possible, avoiding green ground and recognising red walls as dead ends.",
      "Exploration is frontier-based: the closest frontier plus selected farther frontiers. An occupancy grid is maintained and inflated into a costmap, and A* plans the path, which is turned into waypoints and followed sequentially.",
      "The camera detects pillars and forbidden ground. Red walls trigger a 180° turn and replanning, and LiDAR confirms them so cells are only marked occupied after repeated detection, which reduces false positives.",
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
      { src: "/images/projects/nav-image.jpg", alt: "Webots maze with the RosBot, camera view and live occupancy map" },
      { src: "/images/projects/nav-map.png", alt: "Occupancy map generated during exploration", fit: "contain" },
      { src: "/images/projects/nav-inflated.png", alt: "Inflated costmap used by the A* planner", fit: "contain" },
    ],
    github: "https://github.com/arpitha-co/autonomous_driving",
    featured: true,
  },
  {
    slug: "rl-race-track",
    title: "Reinforcement Learning for Autonomous Race Track Navigation",
    shortTitle: "RL Race Track Navigation",
    tagline: "A Soft Actor-Critic agent that learns time-optimal laps under noisy control",
    period: "12/2025 – 02/2026",
    status: "completed",
    context: "University project · OTH Amberg-Weiden",
    description:
      "A Soft Actor-Critic policy that learns to drive a 34-gate race course with acceleration limits and noisy actuation, finishing it in all 50 evaluation runs (median 85 steps).",
    details: [
      "The environment is a 2D vehicle with acceleration limits, a 5 m/s top speed, steering that tightens with speed, and Gaussian noise on every acceleration command. The vehicle must pass 34 gates of a winding course in order.",
      "I wrapped the course-provided environment in a Gymnasium adapter without modifying it. The adapter adds a 13-D observation (vehicle state plus the next four gate centres in the vehicle's own frame, so the policy can plan ahead) and a shaped reward: gate bonuses, a dense progress term towards the next gate, a per-step penalty that rewards speed, and a boundary penalty.",
      "I trained a Soft Actor-Critic agent with Stable-Baselines3 using hyperparameters from a sweep (2×256 MLP, 150k environment steps), running several independent training instances and tracking sample efficiency and best lap length for each.",
      "I then evaluated every trained model over 50 noisy episodes each. The best one finishes the course in all 50 runs, with a median of 85 steps. That model is included in the repository, together with an evaluation script that reproduces these numbers.",
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
    images: [
      { src: "/images/projects/race-best-model.gif", alt: "Trained SAC agent completing all 34 gates of the parcour", fit: "contain" },
      { src: "/images/projects/race-episode-10.gif", alt: "Episode 10: the agent loses the course after a few gates", fit: "contain" },
      { src: "/images/projects/race-episode-100.gif", alt: "Episode 100: reaches the second-to-last gate before the time limit", fit: "contain" },
    ],
    github: "https://github.com/arpitha-co/racing_car",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
