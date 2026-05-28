import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BentoGrid from "@/components/BentoGrid";
import PinnedSection from "@/components/PinnedSection";
import ScaleGallery from "@/components/ScaleGallery";
import TextReveal from "@/components/TextReveal";
import HorizontalAccordion from "@/components/HorizontalAccordion";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-bg">
      <Nav />
      <Hero />
      <Marquee />
      <BentoGrid />
      <PinnedSection />
      <ScaleGallery />
      <TextReveal />
      <HorizontalAccordion />
      <Footer />
    </main>
  );
}
