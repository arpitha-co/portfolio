import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { GitHubSection } from "@/components/GitHubSection";
import { Beyond } from "@/components/Beyond";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Research />
      <GitHubSection />
      <Beyond />
      <Education />
      <Contact />
    </>
  );
}
