"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Globe, GithubLogo } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Vela",
    subtitle: "Analytics Dashboard",
    desc: "A real-time analytics platform with interactive visualizations, custom reporting, and team collaboration features.",
    image: "https://picsum.photos/seed/vela-project/1200/800",
    accent: "rose",
    tags: ["React", "TypeScript", "D3.js", "WebSocket"],
  },
  {
    title: "Cascade",
    subtitle: "Design System",
    desc: "A comprehensive component library with 60+ accessible components, theme customization, and automated visual regression testing.",
    image: "https://picsum.photos/seed/cascade-project/1200/800",
    accent: "cyan",
    tags: ["React", "Storybook", "Tailwind", "A11y"],
  },
  {
    title: "Prism",
    subtitle: "E-Commerce Platform",
    desc: "A modern headless commerce platform with server-side rendering, dynamic pricing, and real-time inventory management.",
    image: "https://picsum.photos/seed/prism-project/1200/800",
    accent: "amber",
    tags: ["Next.js", "Stripe", "GraphQL", "PostgreSQL"],
  },
  {
    title: "Synth",
    subtitle: "AI-Powered Tool",
    desc: "An intelligent code assistant that leverages LLMs for automated refactoring, documentation generation, and code review.",
    image: "https://picsum.photos/seed/synth-project/1200/800",
    accent: "violet",
    tags: ["Python", "OpenAI", "React", "FastAPI"],
  },
];

const accentStyles: Record<string, { numBg: string; numBorder: string; numText: string; gradient: string }> = {
  rose: {
    numBg: "bg-rose/10",
    numBorder: "border-rose/20",
    numText: "text-rose",
    gradient: "from-rose/30 via-violet/20 to-cyan/10",
  },
  cyan: {
    numBg: "bg-cyan/10",
    numBorder: "border-cyan/20",
    numText: "text-cyan",
    gradient: "from-cyan/30 via-emerald/20 to-amber/10",
  },
  amber: {
    numBg: "bg-amber/10",
    numBorder: "border-amber/20",
    numText: "text-amber",
    gradient: "from-amber/30 via-rose/20 to-violet/10",
  },
  violet: {
    numBg: "bg-violet/10",
    numBorder: "border-violet/20",
    numText: "text-violet",
    gradient: "from-violet/30 via-fuchsia/20 to-rose/10",
  },
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const pinned = pinnedRef.current;

    if (!section || !track || !pinned) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: pinned,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep via-surface to-deep z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 mb-4 font-mono">
            Selected Work
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[1.1] max-w-3xl">
            Projects I've{" "}
            <span className="gradient-text-rose">crafted</span>
          </h2>
        </div>
      </div>

      <div ref={pinnedRef} className="relative">
        <div ref={trackRef} className="flex gap-4 md:gap-6 px-4 md:px-6 pb-24 md:pb-32" style={{ width: "max-content" }}>
          {projects.map((project, i) => {
            const s = accentStyles[project.accent];
            return (
              <div
                key={project.title}
                className="project-card relative w-[80vw] md:w-[480px] lg:w-[560px] flex-shrink-0 rounded-3xl overflow-hidden border border-border group"
                style={{ minHeight: "400px" }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-80`} />
                <div className="absolute inset-0 bg-deep/40" />

                <div className="relative z-10 p-6 md:p-10 flex flex-col h-full justify-between min-h-[400px]">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${s.numBg} ${s.numBorder} border flex items-center justify-center shrink-0`}
                      >
                        <span className={`${s.numText} font-bold text-base md:text-lg`}>
                          {i + 1}
                        </span>
                      </span>
                      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-400 font-mono">
                        {project.subtitle}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl md:text-4xl text-stone-100 mt-3 md:mt-4 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-3 md:mt-4 text-stone-400 leading-relaxed max-w-sm text-xs md:text-sm">
                      {project.desc}
                    </p>
                  </div>

                  <div className="mt-6 md:mt-8">
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-deep/50 border border-white/5 text-stone-400 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                      <a
                        href="#"
                        className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium text-stone-200 hover:text-stone-100 transition-colors"
                      >
                        <Globe size={14} />
                        Live Site
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium text-stone-400 hover:text-stone-200 transition-colors"
                      >
                        <GithubLogo size={14} />
                        Source
                      </a>
                      <a
                        href="#"
                        className="ml-auto flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium bg-stone-100 text-deep px-3 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-stone-200 transition-all hover:scale-105 active:scale-[0.98]"
                      >
                        Case Study
                        <ArrowRight size={12} weight="bold" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
