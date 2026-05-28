"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  Palette,
  Pulse,
  Cube,
  Globe,
  Lightning,
} from "@phosphor-icons/react";
import TiltGlass from "./TiltGlass";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: "React & Next.js",
    desc: "Building production-grade applications with modern React patterns, server components, and optimal rendering strategies.",
    icon: Code,
    colSpan: "lg:col-span-2 lg:row-span-1",
    tag: "Core",
  },
  {
    title: "Motion Design",
    desc: "GSAP, Framer Motion, and CSS animations for fluid, purposeful interfaces that guide user attention.",
    icon: Pulse,
    colSpan: "lg:col-span-1 lg:row-span-1",
    tag: "Animation",
  },
  {
    title: "TypeScript",
    desc: "End-to-end type safety with advanced generics, discriminated unions, and strict configuration.",
    icon: Cube,
    colSpan: "lg:col-span-1 lg:row-span-1",
    tag: "Language",
  },
  {
    title: "Visual Design",
    desc: "Typography systems, color theory, and compositional hierarchy for interfaces that feel intentional.",
    icon: Palette,
    colSpan: "lg:col-span-1 lg:row-span-2",
    tag: "Design",
  },
  {
    title: "Performance",
    desc: "Lighthouse optimization, code splitting, bundle analysis, and rendering profiling for sub-second loads.",
    icon: Lightning,
    colSpan: "lg:col-span-2 lg:row-span-1",
    tag: "OPS",
  },
  {
    title: "Ecosystem",
    desc: "Tailwind, tRPC, Prisma, Zustand, React Query — building cohesive stacks that scale.",
    icon: Globe,
    colSpan: "lg:col-span-2 lg:row-span-1",
    tag: "Stack",
  },
];

export default function BentoSkills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".animate-in"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".bento-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="mb-16 md:mb-20">
          <p className="animate-in text-[11px] uppercase tracking-[0.22em] text-white/20 font-mono mb-4">
            Capabilities
          </p>
          <h2 className="animate-in font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1]">
            Engineering &<br />
            <span className="text-white/40">Design</span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px]"
          style={{ gridAutoFlow: "dense" }}
        >
          {items.map((item) => (
            <TiltGlass
              key={item.title}
              tiltMax={5}
              glare
              className={`bento-card glass rounded-2xl p-6 md:p-8 flex flex-col ${item.colSpan}`}
              as="div"
            >
              <div className="flex items-start justify-between mb-auto">
                <item.icon size={22} className="text-[#6ecbf5]/60" />
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/15 font-mono">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-display text-lg md:text-xl font-medium text-white/80 mt-3">
                {item.title}
              </h3>
              <p className="text-sm text-white/30 mt-1.5 leading-relaxed max-w-[90%]">
                {item.desc}
              </p>
            </TiltGlass>
          ))}
        </div>
      </div>
    </section>
  );
}
