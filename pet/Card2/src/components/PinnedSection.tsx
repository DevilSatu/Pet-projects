"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Nebula",
    desc: "Real-time collaborative design tool built with WebSocket sync and CRDTs.",
    year: "2026",
    image: "https://picsum.photos/seed/nebula/800/600",
  },
  {
    title: "Helios",
    desc: "Energy monitoring dashboard with live data visualization and predictive analytics.",
    year: "2025",
    image: "https://picsum.photos/seed/helios/800/600",
  },
  {
    title: "Cascade",
    desc: "Component-driven design system powering 12 products across 3 teams.",
    year: "2025",
    image: "https://picsum.photos/seed/cascade/800/600",
  },
  {
    title: "Prism",
    desc: "Interactive 3D configurator for architectural glass panels using WebGL.",
    year: "2024",
    image: "https://picsum.photos/seed/prism/800/600",
  },
];

export default function PinnedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: pinnedRef.current,
        start: "top 20%",
        end: "bottom 60%",
      });

      gsap.fromTo(
        ".project-item",
        {
          opacity: 0,
          x: 120,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 py-32 md:py-48">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:gap-24">
        <div
          ref={pinnedRef}
          className="lg:w-1/3 lg:self-start"
        >
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            Selected work
          </span>
          <h2 className="mt-4 font-outfit text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Projects
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/40 md:text-base">
            A curated selection of projects that pushed the boundaries of what was possible.
          </p>
        </div>

        <div ref={itemsRef} className="flex-1 space-y-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-item group flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/5 bg-surface p-6 md:flex-row md:items-center"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl md:w-48 md:shrink-0">
                <div
                  className="h-full w-full bg-cover bg-center grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-outfit text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {project.title}
                  </h3>
                  <span className="rounded-full border border-white/10 px-3 py-0.5 font-mono text-xs text-white/30">
                    {project.year}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/40 md:text-base">
                  {project.desc}
                </p>
              </div>
              <div className="shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 group-hover:bg-white group-hover:border-white">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-white/40 transition-colors duration-300 group-hover:text-black"
                  >
                    <path
                      d="M2 8h10M8 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
