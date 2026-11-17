import type { SkillGroup } from "./types";

/** Every item here appears in the CV or a public repository. No proficiency levels. */
export const skills: SkillGroup[] = [
  {
    title: "Robot Learning",
    icon: "bot",
    items: [
      "Vision-Language-Action models",
      "OpenVLA / OpenVLA-OFT",
      "π0 / π0.5",
      "Octo",
      "Imitation learning",
      "Reinforcement learning (SAC)",
      "Demonstration collection & fine-tuning",
    ],
  },
  {
    title: "Machine Learning & Computer Vision",
    icon: "eye",
    items: [
      "Deep Learning",
      "Object Detection",
      "Image Processing",
      "Vision-Language Models",
      "YOLOv8",
      "Grounding DINO",
      "YOLO-World",
      "CLIP",
      "OCR / Handwritten Text Recognition",
      "OpenCV",
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: "brain",
    items: ["PyTorch", "scikit-learn", "CVAT", "Stable-Baselines3", "Gymnasium", "NumPy"],
  },
  {
    title: "Robotics & Simulation",
    icon: "wrench",
    items: ["ROS 2", "MoveIt", "NVIDIA Isaac Sim", "Webots", "Franka Emika Panda", "Niryo Ned2", "LabVIEW", "SolidWorks"],
  },
  {
    title: "Programming",
    icon: "code",
    items: ["Python", "Java", "SQL", "Linux", "Git", "Docker"],
  },
  {
    title: "Software Engineering",
    icon: "server",
    items: ["Spring Boot", "REST APIs", "JUnit", "Mockito", "Maven", "MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
];
