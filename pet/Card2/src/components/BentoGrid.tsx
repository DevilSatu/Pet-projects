"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Full-stack development",
    desc: "From pixel-perfect UI to scalable backends. React, Next.js, Node.js, and everything in between.",
    colSpan: "col-span-2 row-span-2",
    bg: "bg-surface",
  },
  {
    title: "Motion design",
    desc: "GSAP, Framer Motion, Lottie — interfaces that feel alive.",
    colSpan: "col-span-1 row-span-1",
    bg: "bg-surface-2",
  },
  {
    title: "3D & WebGL",
    desc: "Interactive 3D experiences with Three.js and WebGL shaders.",
    colSpan: "col-span-1 row-span-1",
    bg: "bg-surface-2",
    accent: true,
  },
  {
    title: "Design systems",
    desc: "Component libraries, design tokens, and brand guidelines that scale across products and teams.",
    colSpan: "col-span-3 row-span-1",
    bg: "bg-surface",
  },
];

export default function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="px-6 py-32 md:py-48"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            Capabilities
          </span>
          <h2 className="mt-4 font-outfit text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            What I do
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`bento-card group relative ${card.colSpan} ${card.bg} p-8 md:p-12`}
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <span className="font-mono text-xs text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-outfit text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/40 md:text-base">
                    {card.desc}
                  </p>
                </div>
                {card.accent && (
                  <div className="mt-8 h-32 w-full rounded-xl bg-gradient-to-br from-accent/10 to-accent-soft/5 border border-white/5" />
                )}
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.02] to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
