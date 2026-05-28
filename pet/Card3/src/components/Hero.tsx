"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Mouse } from "@phosphor-icons/react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      const heroWords = textRef.current?.querySelectorAll(".hero-word");
      if (heroWords?.length) {
        tl.fromTo(
          heroWords,
          { y: 80, opacity: 0, rotateX: -15 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.12 },
          0.2
        );
      }
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.3"
        );
      }
      const ctaItems = ctaRef.current?.querySelectorAll(".hero-cta");
      if (ctaItems?.length) {
        tl.fromTo(
          ctaItems,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
          "-=0.2"
        );
      }
      const decorItems = decorRef.current?.querySelectorAll(".decor-blob");
      if (decorItems?.length) {
        tl.fromTo(
          decorItems,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, stagger: 0.2, ease: "elastic.out(1, 0.5)" },
          "-=0.6"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20 pb-16"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/dev-hero-bg/1920/1080"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-deep/90 via-deep/70 to-surface/80" />
      </div>
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-rose/15 via-violet/10 to-transparent blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-cyan/15 via-emerald/10 to-transparent blur-3xl" />
      <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-amber/10 blur-3xl" />

      <div ref={decorRef} className="absolute inset-0 z-1 pointer-events-none">
        <div className="decor-blob absolute top-[15%] right-[8%] w-72 h-72 rounded-full border border-rose/20 bg-rose/5 blur-sm" />
        <div className="decor-blob absolute bottom-[20%] right-[20%] w-48 h-48 rounded-full border border-cyan/20 bg-cyan/5 blur-sm" />
        <div className="decor-blob absolute top-[50%] left-[5%] w-36 h-36 rounded-full border border-amber/20 bg-amber/5 blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 mb-6 font-mono">
            Full-Stack Developer
          </p>

          <h1
            ref={textRef}
            className="font-display font-extrabold text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] tracking-tighter"
          >
            <span className="hero-word inline-block">Building</span>{" "}
            <span className="hero-word inline-block gradient-text-rose">
              digital
            </span>{" "}
            <span className="hero-word inline-block gradient-text-cyan">
              experiences
            </span>
            <br />
            <span className="hero-word inline-block">that</span>{" "}
            <span className="hero-word inline-block">resonate</span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 md:mt-8 text-base md:text-lg text-stone-400 max-w-xl leading-relaxed font-display"
          >
            I architect and build performant web applications with modern
            technologies, turning complex problems into elegant, intuitive
            interfaces.
          </p>

          <div
            ref={ctaRef}
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 md:gap-4"
          >
            <a
              href="#work"
              className="hero-cta group flex items-center gap-3 bg-rose hover:bg-rose/90 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-500 hover:scale-105 active:scale-[0.98] text-sm md:text-base"
            >
              View My Work
              <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors">
                <ArrowRight size={16} weight="bold" />
              </span>
            </a>
            <a
              href="#contact"
              className="hero-cta group flex items-center gap-2 text-stone-300 hover:text-stone-100 font-medium px-5 md:px-6 py-3 md:py-4 rounded-full border border-border hover:border-stone-500 transition-all duration-500 hover:scale-105 active:scale-[0.98] text-sm md:text-base"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-600">
          <Mouse size={18} />
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
