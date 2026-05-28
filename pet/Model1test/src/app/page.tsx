import CursorBackground from "@/components/CursorBackground";
import GlassNav from "@/components/GlassNav";
import Hero from "@/components/Hero";
import BentoSkills from "@/components/BentoSkills";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <>
      <CursorBackground />
      <GlassNav />
      <main className="w-full max-w-full overflow-x-hidden">
        <Hero />
        <BentoSkills />
        <ProjectsShowcase />
        <ContactFooter />
      </main>
    </>
  );
}
