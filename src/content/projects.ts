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

  // ---------------------------------------------------------------- Indoor localisation (EMI)
  {
    slug: "indoor-localization",
    title: "Indoor Localisation with Smartphone PDR, BLE Beacons and a Particle Filter",
    shortTitle: "Indoor Localisation: PDR + BLE Particle Filter",
    tagline: "Tracking a walker through a building, across floors, with a phone's IMU, BLE beacons and the floor plan",
    period: "07/2026",
    status: "completed",
    context: "Group project (3 people) · OTH Amberg-Weiden",
    description:
      "Smartphone step detection and dead reckoning fused with BLE beacons in a particle filter that respects walls and detects stair transitions between floors.",
    problem:
      "GPS doesn't work reliably indoors. Pedestrian dead reckoning from a phone's IMU gives a smooth path but drifts with every step; BLE beacons don't drift but their signal strength is noisy and only gives a rough position. The task was to combine both, plus the building's floor plan, to track a person walking through a university building, including a route that changes floor.",
    approach: [
      "We recorded four walks with a smartphone logging accelerometer, gyroscope, orientation and BLE scans, and timed when the walker passed known doors as ground truth. Each run's IMU and BLE events are put on one run-relative time axis and cleaned of invalid RSSI values and duplicates.",
      "Steps are peaks of the de-trended acceleration magnitude above an adaptive threshold, at least 0.35 s apart. Step length follows Weinberg's model; heading comes from the phone's fused orientation, corrected with the integrated gyroscope on sharp turns.",
      "A particle filter with 1,000 particles, each carrying its own heading bias, moves every particle by the measured step with noise. Particles that leave the walkable polygons of the floor plan get zero weight, the two strongest BLE beacons reweight the rest through a path-loss likelihood, and the filter resamples when the effective sample size drops. A staircase detector moves the particle cloud to the next floor's map.",
    ],
    architecture: [
      { label: "IMU + BLE logging", detail: "Four recorded walks, timed door checkpoints" },
      { label: "Clean & sync", detail: "Run-relative time, invalid RSSI and duplicates removed" },
      { label: "Steps & PDR", detail: "Adaptive peak detection, Weinberg length, gyro-corrected heading" },
      { label: "Particle filter", detail: "Map constraint, BLE likelihood, ESS resampling" },
      { label: "Floors & evaluation", detail: "Stair detection; error at 22 checkpoints" },
    ],
    contribution: [
      "Implemented step detection and the PDR motion model: adaptive-threshold peak detection, Weinberg step length and gyro-corrected heading.",
      "Built the particle filter with BLE likelihood updates and walkable-polygon map constraints.",
      "Worked on floor-transition detection and on RSSI filtering and beacon weighting.",
      "Recorded the runs with the team, timed the reference checkpoints and evaluated the results.",
    ],
    sections: [
      {
        title: "Limitations",
        items: [
          "Heading is the weak link: magnetic interference and slow gyro drift on long straight corridors aren't fully corrected.",
          "Two beacons per area only give a coarse absolute position; the path-loss parameters weren't calibrated per corridor.",
          "Four runs, two phones and one building: too few to generalise across people and walking styles.",
        ],
      },
    ],
    highlights: [
      "Smartphone PDR: step detection, Weinberg step length, gyro-corrected heading",
      "Particle filter with floor-plan constraints and BLE likelihood",
      "Multi-floor tracking with staircase detection",
    ],
    results: [
      { value: "2.4–3.5 m", label: "RMSE on the three single-floor runs" },
      { value: "8.0 m", label: "RMSE on the two-floor run (stair transition detected)" },
    ],
    resultsTable: {
      caption: "Localisation error at manually timed door checkpoints (only the start point is given to the filter)",
      head: ["Run", "Route", "Checkpoints", "Mean error", "RMSE"],
      rows: [
        ["R1", "Zig-zag, ground floor", "5", "3.26 m", "3.50 m"],
        ["R2", "Zig-zag, reverse of R1", "5", "2.03 m", "2.40 m"],
        ["R3", "Ground floor → stairs → first floor", "7", "6.86 m", "8.01 m"],
        ["R4", "Straight with U-turn, first floor", "5", "2.43 m", "2.63 m"],
        ["All", "", "22", "3.94 m", "5.11 m"],
      ],
    },
    tech: ["Python", "NumPy", "pandas", "Matplotlib", "Particle filter", "Sensor fusion", "IMU", "BLE"],
    coverVideo: video("indoor/r2", "Run R2: the particle cloud follows the walker along the ground-floor corridor", "110 / 47"),
    demos: [
      {
        kind: "grid",
        title: "Two-floor run (R3)",
        intro: "The particle filter detects the stair transition at about 49 s and continues on the first-floor map. The error here is the largest, because heading and distance drift built up on the long corridor before the stairs.",
        columns: 2,
        items: [
          { video: video("indoor/r3-floor0", "Run R3 on the ground floor, up to the staircase", "110 / 47"), label: "Ground floor", caption: "From the start to the staircase.", tone: "warn" },
          { video: video("indoor/r3-floor1", "Run R3 on the first floor after the stair transition", "110 / 47"), label: "First floor", caption: "After the detected stair transition.", tone: "warn" },
        ],
      },
      {
        kind: "grid",
        title: "Single-floor runs",
        intro: "Particle-cloud animations, coloured by particle weight. Each step of the walk is one frame.",
        columns: 2,
        items: [
          { video: video("indoor/r1", "Run R1: zig-zag route on the ground floor", "110 / 47"), label: "R1 · zig-zag", caption: "RMSE 3.50 m over 5 checkpoints.", tone: "ok" },
          { video: video("indoor/r4", "Run R4: straight route with a U-turn on the first floor", "110 / 47"), label: "R4 · U-turn", caption: "RMSE 2.63 m over 5 checkpoints.", tone: "ok" },
        ],
      },
    ],
    images: [
      { src: "/images/projects/indoor-r3-two-floors.png", alt: "Run R3: particle-filter trajectory on the ground floor and, after the stair transition, on the first floor, with checkpoints and beacons", fit: "contain" },
      { src: "/images/projects/indoor-walkable-areas.png", alt: "Walkable polygons and staircase regions configured on both floor maps", fit: "contain" },
      { src: "/images/projects/indoor-r1-pdr.png", alt: "Run R1: acceleration with detected steps, step length and heading over time, and the PDR-only trajectory", fit: "contain" },
      { src: "/images/projects/indoor-r1-rssi.png", alt: "Run R1: raw BLE RSSI per beacon with a one-second trailing median", fit: "contain" },
    ],
    github: "https://github.com/arpitha-co/indoor-localization-pdr-ble",
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
    illustration: "herbarium",
    github: null,
    featured: true,
  },

  // ---------------------------------------------------------------- NLP equation extraction
  {
    slug: "equation-extraction-nlp",
    title: "Explainable Equation Extraction from Quantum Physics Papers",
    shortTitle: "Equation Extraction from Physics Papers (NLP)",
    tagline: "Symbols, definitions, meanings and equation relations, extracted without LLMs",
    period: "06/2026",
    status: "completed",
    context: "University project · OTH Amberg-Weiden",
    description:
      "An LLM-free NLP pipeline that extracts numbered equations from arXiv quantum-physics papers and links each symbol to its definition in the text, names the equation and maps how equations depend on each other.",
    problem:
      "Equations in scientific papers are only meaningful together with the text around them: what each symbol stands for, what the equation expresses and which earlier equations it builds on. The aim was to recover that information automatically for quantum-physics papers on arXiv, without language models, so that every result can be explained and traced back to its source sentence.",
    approach: [
      "The pipeline works through a list of arXiv IDs until it has 350 equations (at most 7 per paper). HTML is the main source because it keeps the equation structure; when it's missing, the PDF is converted to Markdown with marker-pdf. Numbered equations such as (1), (2a), (S1) and (A.1) are detected, multi-line equations are merged, and the surrounding text is kept.",
      "Symbols are extracted from the LaTeX with explicit rules for Greek letters, sub- and superscripts, hats, bars and vectors. Definitions are then found with spaCy and handcrafted patterns such as “Y is defined as X”. The search moves outwards from the equation: text before it, text after it, local context, global context, then definitions from earlier in the same paper, with a small dictionary of standard constants as the last resort.",
      "To name an equation, it is masked as EQ_n (other maths as MATH), and dependency parsing finds the verb and noun phrase it is attached to. Candidates are ranked by distance, dependency relation and position.",
      "A directed graph links the equations of each paper. Explicit references (“substituting Eq. (2)”) and a left-hand side reused in another equation count as strong relations; shared key symbols or similar context count as potential ones. Every output carries an audit trail naming the rule that produced it.",
    ],
    architecture: [
      { label: "Download & parse", detail: "arXiv HTML, PDF fallback via marker-pdf; numbered equations" },
      { label: "Symbol extraction", detail: "Rule-based LaTeX cleaning and tokenisation" },
      { label: "Context windows", detail: "Sentence-level and section-level context" },
      { label: "Definitions", detail: "spaCy patterns, searched from nearest to widest context" },
      { label: "Meaning & relations", detail: "Dependency parsing; strong / potential / none graph" },
    ],
    contribution: [
      "Built the full pipeline: downloading, equation parsing, symbol extraction, context windows, definition and meaning extraction, and the relation graph.",
      "Evaluated definition extraction against 105 manually annotated symbols from 21 equations, with a script that scores coverage and precision.",
      "Wrote the project report, including an analysis of the failure cases.",
    ],
    sections: [
      {
        title: "Limitations",
        items: [
          "When only the PDF is available, visually similar symbols and multi-line equations can be misread.",
          "Equations embedded as images can't be extracted.",
          "Recall depends on how explicitly authors define their symbols; phrasings the rules don't cover are missed.",
        ],
      },
    ],
    highlights: [
      "Rule-based, explainable pipeline: no LLMs",
      "spaCy dependency parsing and handcrafted definition patterns",
      "Directed equation graph with strong / potential relations",
    ],
    results: [
      { value: "350", label: "Equations from 58 arXiv papers" },
      { value: "72.4%", label: "Definition coverage (105 annotated symbols)" },
      { value: "69.7%", label: "Definition precision" },
    ],
    resultsTable: {
      caption: "Symbol-definition evaluation against manual annotations, from the project report",
      head: ["Metric", "Value"],
      rows: [
        ["Symbols examined", "105"],
        ["Symbols resolved", "76"],
        ["Coverage (recall)", "72.38%"],
        ["Correct among resolved", "53"],
        ["Precision", "69.74%"],
      ],
    },
    tech: ["Python", "spaCy", "NLTK", "NetworkX", "BeautifulSoup", "PyMuPDF", "marker-pdf", "LaTeX", "Dependency parsing"],
    images: [
      {
        src: "/images/projects/nlp-definition-pattern.png",
        alt: "Definition pattern “Y is defined as X”: “flow velocity” in the text is linked to the symbol u in u = (1/m)∇S",
        fit: "contain",
      },
      {
        src: "/images/projects/nlp-relation-graph.png",
        alt: "Equation graph for one paper: Eq. 2 and Eq. 3 both have strong relations into Eq. 4",
        fit: "contain",
      },
    ],
    illustration: "equations",
    github: "https://github.com/arpitha-co/nlp-equation-extraction",
    featured: true,
  },

  // ---------------------------------------------------------------- ML: XGBoost + edge rules
  {
    slug: "ml-regression-edge-rules",
    title: "Skewed-Target Regression with XGBoost and an Edge-Deployable Rule Model",
    shortTitle: "XGBoost Regression & Edge-Deployable Rules",
    tagline: "An accurate model for a skewed target, and a four-rule model that runs without any ML library",
    period: "12/2025 – 01/2026",
    status: "completed",
    context: "University project · OTH Amberg-Weiden",
    description:
      "Two regression tasks on an anonymised 273-feature dataset: XGBoost with sample weighting for a skewed, imbalanced target, and four if/else rules with linear formulas that reproduce a second target exactly on an edge device.",
    problem:
      "The dataset has 10,000 samples and 273 anonymised features, of which only a few matter. Task 1: predict a skewed, imbalanced target as accurately as possible. Task 2: predict a second target on an edge device that supports only comparisons and basic arithmetic, with no machine-learning libraries.",
    approach: [
      "For Task 1, the target is skewed and non-linear, with about 2.9% of samples below 0.2 and 2.9% above 1.0. I used XGBoost with a Tweedie objective and, instead of resampling, gave samples weights by target range (2.0 below 0.2, 2.5 between 0.8 and 1.0, 4.0 above 1.0), so the rare ranges count more without changing the distribution.",
      "A first model ranked the features by importance; retraining on only the top 9 cut the test RMSE from 0.172 to 0.094.",
      "For Task 2, a depth-2 decision tree found the split points, all on a single feature (feat_267). A linear regression inside each of the four regions gave one formula per region. The coefficients came out as clean two-decimal values with zero intercepts, which showed the rules had recovered the formula that generated the target. They were implemented in the course's edge framework using only comparisons and arithmetic.",
    ],
    architecture: [
      { label: "Data analysis", detail: "Skew, imbalance and feature distributions" },
      { label: "Weighted XGBoost", detail: "Tweedie objective, sample weights by target range" },
      { label: "Feature selection", detail: "Importance ranking, retrain on the top 9" },
      { label: "Split discovery", detail: "Depth-2 decision tree on feat_267" },
      { label: "Edge rules", detail: "Four regions, one linear formula each, no ML libraries" },
    ],
    contribution: [
      "Analysed the data and designed the weighting and feature-selection strategy for Task 1.",
      "Trained and evaluated the XGBoost model and generated the submitted predictions.",
      "Derived the Task 2 rules from a decision tree and per-region linear fits, and implemented them in the edge framework.",
    ],
    highlights: [
      "XGBoost with a Tweedie objective and range-based sample weights",
      "Feature selection from 273 to 9 features",
      "Rule model that recovers the target formula exactly",
    ],
    results: [
      { value: "0.846", label: "R² on the held-out test split (Task 1)" },
      { value: "0.094", label: "Test RMSE (Task 1)" },
      { value: "4 rules", label: "Reproduce Task 2's target exactly, no ML libraries" },
    ],
    resultsTable: {
      caption: "Task 1 on a 20% held-out split; Task 2 on all 10,000 samples",
      head: ["Task", "Model", "Result"],
      rows: [
        ["1", "XGBoost, all features", "RMSE 0.172 · R² 0.489"],
        ["1", "XGBoost, top 9 features", "RMSE 0.094 · MAE 0.071 · R² 0.846"],
        ["2", "4 rules + linear formulas", "Max error ≈ 1e-14 (exact)"],
      ],
    },
    tech: ["Python", "XGBoost", "scikit-learn", "pandas", "NumPy", "Matplotlib", "Decision trees"],
    images: [
      { src: "/images/projects/ml-decision-tree.png", alt: "Depth-2 decision tree splitting feat_267 at 0.5, 0.2 and 0.7 into four regions", fit: "contain" },
      { src: "/images/projects/ml-task1-actual-vs-predicted.png", alt: "Task 1: actual vs predicted values on the test split, close to the diagonal", fit: "contain" },
      { src: "/images/projects/ml-top9-features.png", alt: "The nine most important features, led by feat_270", fit: "contain" },
      { src: "/images/projects/ml-task2-actual-vs-predicted.png", alt: "Task 2: actual vs predicted values, all exactly on the diagonal", fit: "contain" },
    ],
    github: "https://github.com/arpitha-co/ml-regression-edge-rules",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
