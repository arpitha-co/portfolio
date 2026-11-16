/**
 * Curated repositories for the GitHub section.
 * Live stats (language, stars, last update) are fetched from the GitHub API at
 * build time and merged in. If the API is unavailable, these values are shown.
 * Only repositories listed here are displayed.
 */
export interface RepoConfig {
  name: string;
  title: string;
  description: string;
  language: string;
  topics: string[];
  projectSlug?: string;
}

export const repos: RepoConfig[] = [
  {
    name: "4connect",
    title: "Connect Four Robot",
    description: "Vision-guided Connect Four on a Niryo Ned2: HSV disc detection, ROI extraction, Minimax and pyniryo control.",
    language: "Python",
    topics: ["computer-vision", "robotics", "opencv"],
    projectSlug: "connect-four-robot",
  },
  {
    name: "autonomous_driving",
    title: "Autonomous Maze Navigation",
    description: "Frontier exploration, occupancy mapping and A* planning for a RosBot in five Webots mazes.",
    language: "Python",
    topics: ["path-planning", "webots", "lidar"],
    projectSlug: "autonomous-navigation",
  },
  {
    name: "racing_car",
    title: "RL Race Track Navigation",
    description: "Soft Actor-Critic agent for a 34-gate race course. The trained model and evaluation script are included (50/50 runs, median 85 steps).",
    language: "Python",
    topics: ["reinforcement-learning", "sac", "gymnasium"],
    projectSlug: "rl-race-track",
  },
  {
    name: "infinity_valley",
    title: "Infinite Valley Navigation",
    description: "Custom continuous-control environment with terrain-driven dynamics and wind, solved with a SAC agent.",
    language: "Python",
    topics: ["reinforcement-learning", "custom-environment"],
  },
];
