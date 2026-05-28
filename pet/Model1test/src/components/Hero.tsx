"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Star } from "@phosphor-icons/react";
import TiltGlass from "./TiltGlass";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.8"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 pb-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="z-10">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#6ecbf5] animate-pulse" />
            <span className="text-xs text-white/60 font-medium tracking-wide">
              Available for projects
            </span>
          </div>

          <h1
            ref={titleRef}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.05] tracking-tight text-white"
          >
            <span>Frontend</span>
            <br />
            <span className="text-white/40">Developer</span>
            <br />
            <span className="bg-gradient-to-r from-[#6ecbf5] via-[#a078ff] to-[#ff78b4] bg-clip-text text-transparent">
              & Designer
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 text-base sm:text-lg text-white/40 max-w-lg leading-relaxed"
          >
            Crafting premium digital experiences with clean code, thoughtful
            interaction design, and a relentless eye for detail.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
            <TiltGlass tiltMax={4}>
              <a
                href="#projects"
                className="group flex items-center gap-3 glass-strong rounded-full px-7 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                View selected work
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </a>
            </TiltGlass>
            <TiltGlass tiltMax={4}>
              <a
                href="#contact"
                className="group flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white/50 hover:text-white border border-white/10 hover:border-white/20 transition-all"
              >
                Get in touch
              </a>
            </TiltGlass>
          </div>
        </div>

        <div ref={visualRef} className="relative flex items-center justify-center">
          <TiltGlass
            tiltMax={8}
            className="glass rounded-[2rem] p-1.5 w-full max-w-md aspect-[4/5]"
          >
            <div className="w-full h-full rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] flex flex-col items-center justify-center p-8 gap-4 border border-white/[0.03]">
              <div className="w-20 h-20 rounded-full glass-strong flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-white/80">
                  AC
                </span>
              </div>
              <div className="text-center">
                <p className="text-white/80 font-display text-lg font-medium">
                  Alex Chen
                </p>
                <p className="text-white/30 text-sm mt-1">
                  Frontend Lead
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                {["React", "Next.js", "TS", "GSAP"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 text-white/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} weight="fill" className="text-[#6ecbf5]/50" />
                ))}
              </div>
              <p className="text-white/20 text-xs mt-2 text-center max-w-[200px]">
                8+ years of crafting interfaces users love
              </p>
            </div>
          </TiltGlass>
        </div>
      </div>
    </section>
  );
}
