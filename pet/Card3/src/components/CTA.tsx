"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, PaperPlaneTilt } from "@phosphor-icons/react";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 md:py-40">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://picsum.photos/seed/cta-bg-contact/1920/1080"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/80 via-deep/60 to-deep/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gradient-to-br from-rose/15 via-violet/10 to-cyan/15 blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-deep via-transparent to-deep" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 mb-6">
            <PaperPlaneTilt size={14} className="text-rose" weight="fill" />
            <span className="text-xs uppercase tracking-[0.2em] text-stone-400 font-mono">
              Let's Connect
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-6xl tracking-tighter leading-[1.1]">
            Have a project in{" "}
            <span className="gradient-text-rose">mind</span>?
          </h2>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-stone-400 max-w-lg mx-auto leading-relaxed">
            Whether you need a website, web application, or just want to chat
            about technology — I'd love to hear from you.
          </p>

          <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
            <a
              href="mailto:raya@example.com"
              className="group flex items-center gap-3 bg-rose hover:bg-rose/90 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-500 hover:scale-105 active:scale-[0.98] text-sm md:text-base"
            >
              Send a Message
              <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors">
                <ArrowRight size={16} weight="bold" />
              </span>
            </a>
            <a
              href="#"
              className="group flex items-center gap-2 text-stone-300 hover:text-stone-100 font-medium px-5 md:px-6 py-3 md:py-4 rounded-full border border-border hover:border-stone-500 transition-all duration-500 hover:scale-105 active:scale-[0.98] text-sm md:text-base"
            >
              View GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
