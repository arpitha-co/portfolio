import type { Hobby, Interest } from "./types";

/**
 * "What I'm Exploring". Add, remove or reorder freely.
 * `icon` is any Lucide icon name registered in components/Research.tsx.
 */
export const research: Interest[] = [
  {
    title: "Vision-Language-Action models",
    blurb: "Policies that map camera images and a language instruction directly to robot actions.",
    icon: "Workflow",
  },
  {
    title: "Robotic manipulation & grasping",
    blurb: "Reliable pick-and-place across different objects, poses and scenes.",
    icon: "Hand",
  },
  {
    title: "Vision-Language Models",
    blurb: "Grounding language in what a camera sees: open-vocabulary detection and scene understanding.",
    icon: "ScanEye",
  },
  {
    title: "Foundation models for robotics",
    blurb: "How large pretrained models adapt to a specific robot with a small amount of data.",
    icon: "Layers",
  },
  {
    title: "Sim-to-real transfer",
    blurb: "Closing the gap between policies that work in Isaac Sim and on real hardware.",
    icon: "ArrowLeftRight",
  },
  {
    title: "AI-driven industrial automation",
    blurb: "Perception and learning that hold up on the factory floor, not only in demos.",
    icon: "Factory",
  },
  {
    title: "Intelligent autonomous systems",
    blurb: "Robots that explore, map, plan and recover from mistakes by themselves.",
    icon: "Route",
  },
  {
    title: "Human-robot interaction",
    blurb: "Robots that take natural instructions and work safely alongside people.",
    icon: "Users",
  },
];

/**
 * "Beyond Technology". To add a photo, drop it in /public/images/personal/
 * and set `photo: "/images/personal/knitting.jpg"`.
 */
export const hobbies: Hobby[] = [
  {
    title: "Knitting & handmade things",
    blurb: "Slow, patient work with my hands. A good counterweight to debugging robots.",
    illustration: "yarn",
  },
  {
    title: "Baking",
    blurb: "Experimenting with recipes. Basically trial-and-error optimisation, but you get to eat the results.",
    illustration: "whisk",
  },
  {
    title: "Travelling",
    blurb: "Exploring new places, cities and landscapes, from Karnataka to Bavaria and beyond.",
    illustration: "compass",
  },
  {
    title: "Learning languages",
    blurb: "Kannada is home, English is everyday, and German is a work in progress (B1).",
    illustration: "speech",
  },
  {
    title: "Creative experiments",
    blurb: "Trying out new ideas and technologies just to see what happens.",
    illustration: "spark",
  },
];
