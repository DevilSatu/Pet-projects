"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Palette,
  Database,
  Cloud,
  GearSix,
  BracketsSquare,
  Sparkle,
} from "@phosphor-icons/react";

const skills = [
  {
    title: "Frontend Architecture",
    desc: "React, TypeScript, Next.js, Tailwind CSS with a focus on performance and accessibility.",
    icon: BracketsSquare,
    gradient: "from-rose/20 via-rose/10 to-transparent",
    borderColor: "border-rose/20",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
    image: "https://picsum.photos/seed/frontend-skill/800/400",
  },
  {
    title: "Design Systems",
    desc: "Building scalable component libraries with consistent design tokens, documentation, and testing.",
    icon: Palette,
    gradient: "from-violet/20 via-violet/10 to-transparent",
    borderColor: "border-violet/20",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-2",
    image: null,
  },
  {
    title: "Backend & APIs",
    desc: "Node.js, Python, GraphQL, RESTful services with clean architecture patterns.",
    icon: Database,
    gradient: "from-cyan/20 via-cyan/10 to-transparent",
    borderColor: "border-cyan/20",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    image: null,
  },
  {
    title: "DevOps & Cloud",
    desc: "Docker, AWS, CI/CD pipelines, infrastructure as code for reliable deployments.",
    icon: Cloud,
    gradient: "from-amber/20 via-amber/10 to-transparent",
    borderColor: "border-amber/20",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    image: null,
  },
  {
    title: "Tools & Workflow",
    desc: "Git, testing frameworks, performance optimization, and developer experience tooling.",
    icon: GearSix,
    gradient: "from-emerald/20 via-emerald/10 to-transparent",
    borderColor: "border-emerald/20",
    colSpan: "lg:col-span-3",
    rowSpan: "lg:row-span-1",
    image: "https://picsum.photos/seed/tools-skill/1200/400",
  },
];

export default function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 md:py-40">
      <div className="absolute inset-0 bg-gradient-to-t from-deep via-surface/50 to-deep z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 mb-4 font-mono">
            Capabilities
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[1.1] max-w-3xl">
            What I{" "}
            <span className="gradient-text-rose">bring</span> to the{" "}
            <span className="gradient-text-cyan">table</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: reduce ? 0 : i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative overflow-hidden rounded-2xl border ${skill.borderColor} ${skill.colSpan} ${skill.rowSpan} min-h-[220px]`}
            >
              {skill.image && (
                <img
                  src={skill.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                />
              )}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-70 group-hover:opacity-90 transition-opacity duration-700`}
              />
              <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
                    <skill.icon size={18} className="text-stone-300" />
                  </div>
                  <h3 className="font-display font-bold text-base md:text-lg text-stone-100">
                    {skill.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-stone-400 leading-relaxed flex-1">
                  {skill.desc}
                </p>
                <div className="mt-3 md:mt-4 flex items-center gap-2 text-[10px] md:text-xs text-stone-500 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose/60 shrink-0" />
                  {i === 0 && "React  TypeScript  Next.js"}
                  {i === 1 && "Figma  Tokens  Storybook"}
                  {i === 2 && "Node.js  GraphQL  PostgreSQL"}
                  {i === 3 && "Docker  AWS  CI/CD"}
                  {i === 4 && "Git  Vitest  Lighthouse"}
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Sparkle size={16} className="text-rose/40" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
