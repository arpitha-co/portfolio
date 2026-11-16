/**
 * Central profile + links. Edit here; every component reads from this file.
 */
export const site = {
  name: "Arpitha Thimmegowda",
  firstName: "Arpitha",
  headline: "AI Engineer | Robotics & Computer Vision Enthusiast",
  role: "AI Engineer",
  // Change to your final domain before deploying (used for SEO / sitemap).
  url: "https://arpitha-co.github.io",
  description:
    "Arpitha Thimmegowda is an AI Engineer working on vision-language-action models for robotic manipulation at Fraunhofer IMS, with two years of production software engineering experience.",
  intro:
    "Hi, I'm Arpitha — an AI Engineer passionate about building intelligent systems that interact with the real world. My interests lie at the intersection of artificial intelligence, robotics, and computer vision. I enjoy experimenting with emerging AI technologies and turning research ideas into practical applications.",
  currently: {
    label: "Currently",
    text: "Master's thesis at Fraunhofer IMS — fine-tuning VLA models for robotic pick-and-place",
  },
  location: "Germany",
  email: "arpithasa2023@gmail.com",
  photo: "/images/profile.jpg",
  cv: {
    href: "/cv/Arpitha_Thimmegowda_CV.pdf",
    fileName: "Arpitha_Thimmegowda_CV.pdf",
  },
  social: {
    github: "https://github.com/arpitha-co",
    githubUser: "arpitha-co",
    linkedin: "https://www.linkedin.com/in/arpitha-t-aa375421b/",
  },
  /**
   * Contact form delivery. Leave empty to fall back to opening the visitor's
   * mail app with the message pre-filled. To deliver straight to your inbox,
   * create a free form at https://formspree.io and paste its endpoint here,
   * e.g. "https://formspree.io/f/abcdwxyz".
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
  languages: [
    { name: "Kannada", level: "Native" },
    { name: "English", level: "C1" },
    { name: "German", level: "B1" },
  ],
} as const;

export const nav = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#research", label: "Research" },
  { href: "/#github", label: "GitHub" },
  { href: "/#contact", label: "Contact" },
] as const;
