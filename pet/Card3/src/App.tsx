import Nav from "./components/Nav";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import Projects from "./components/Projects";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="noise-overlay" />
      <Nav />
      <main className="w-full max-w-full overflow-x-hidden">
        <Hero />
        <BentoGrid />
        <Projects />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
