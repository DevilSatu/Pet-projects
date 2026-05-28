"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const tools = [
  "React", "Next.js", "TypeScript", "Tailwind CSS",
  "GSAP", "Framer Motion", "Three.js", "Node.js",
  "Figma", "WebGL", "Rust", "Go",
];

export default function Marquee() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
      gsap.to(row2Ref.current, {
        xPercent: 50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-white/5 py-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-transparent to-bg z-10" />
      <div className="relative">
        <div ref={row1Ref} className="flex w-max gap-16">
          {[...tools, ...tools].map((tool, i) => (
            <span
              key={`r1-${i}`}
              className="font-outfit text-3xl font-light tracking-widest text-white/20 md:text-4xl"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
      <div className="relative mt-6">
        <div ref={row2Ref} className="flex w-max gap-16">
          {[...tools, ...tools].map((tool, i) => (
            <span
              key={`r2-${i}`}
              className="font-outfit text-2xl font-light tracking-widest text-white/10 md:text-3xl"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
