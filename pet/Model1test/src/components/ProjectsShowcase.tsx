"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import TiltGlass from "./TiltGlass";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Nexus Dashboard",
    desc: "Real-time analytics platform serving 50k+ daily users with complex data visualization and collaborative features.",
    tags: ["React", "D3.js", "WebSocket"],
    gradient: "from-[#6ecbf5]/20 via-[#a078ff]/10 to-transparent",
    accent: "#6ecbf5",
  },
  {
    title: "Craft Design System",
    desc: "Comprehensive component library and design token framework powering 12 product teams across the organization.",
    tags: ["React", "Tailwind", "Storybook"],
    gradient: "from-[#a078ff]/20 via-[#ff78b4]/10 to-transparent",
    accent: "#a078ff",
  },
  {
    title: "Voyage Travel",
    desc: "Immersive travel planning experience with interactive maps, itinerary builder, and real-time pricing engine.",
    tags: ["Next.js", "Mapbox", "Node"],
    gradient: "from-[#ff78b4]/20 via-[#50dcc8]/10 to-transparent",
    accent: "#ff78b4",
  },
  {
    title: "Pulse Audio",
    desc: "Social music discovery platform with collaborative playlists, spatial audio previews, and artist analytics.",
    tags: ["React Native", "GraphQL", "WebAudio"],
    gradient: "from-[#50dcc8]/20 via-[#6ecbf5]/10 to-transparent",
    accent: "#50dcc8",
  },
];

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

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
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (trackRef.current && sectionRef.current) {
        const track = trackRef.current;
        const distance = track.scrollWidth - window.innerWidth;

        if (distance > 0) {
          gsap.to(track, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${distance + window.innerHeight * 0.4}`,
              pin: true,
              pinSpacing: true,
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setCardRef = (i: number) => (el: HTMLAnchorElement | null) => {
    cardsRef.current[i] = el;
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={headerRef} className="mb-16 md:mb-20">
          <p className="animate-in text-[11px] uppercase tracking-[0.22em] text-white/20 font-mono mb-4">
            Selected work
          </p>
          <h2 className="animate-in font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1]">
            Projects that<br />
            <span className="text-white/40">define the craft</span>
          </h2>
        </div>
      </div>

      <div ref={trackRef} className="flex gap-6 px-6 md:px-12 pb-32 md:pb-40" style={{ minWidth: "max-content" }}>
        {projects.map((project, i) => (
          <TiltGlass
            key={project.title}
            tiltMax={6}
            glare
            className="group glass rounded-[1.75rem] p-[1px] flex-shrink-0"
            as="div"
          >
            <a
              ref={setCardRef(i)}
              href="#"
              className={`block w-[420px] md:w-[480px] h-[520px] rounded-[calc(1.75rem-1px)] bg-gradient-to-br ${project.gradient} p-8 md:p-10 flex flex-col relative overflow-hidden`}
              onClick={(e) => e.preventDefault()}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: project.accent }}
              />
              <div className="flex items-start justify-between mb-auto">
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-10 h-10 rounded-full glass-strong flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <ArrowUpRight size={16} className="text-white/40 group-hover:text-white transition-colors" />
                </span>
              </div>

              <div className="mt-auto">
                <h3 className="font-display text-2xl md:text-3xl font-medium text-white leading-tight">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-white/30 leading-relaxed max-w-sm">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/5 text-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </TiltGlass>
        ))}
      </div>
    </section>
  );
}
