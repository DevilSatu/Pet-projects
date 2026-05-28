"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react";
import TiltGlass from "./TiltGlass";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: GithubLogo, href: "#", label: "GitHub" },
  { icon: LinkedinLogo, href: "#", label: "LinkedIn" },
  { icon: XLogo, href: "#", label: "X / Twitter" },
];

export default function ContactFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const els = contentRef.current.querySelectorAll(".animate-in");
        gsap.fromTo(
          els,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
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
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12"
    >
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto flex flex-col items-center text-center"
      >
        <p className="animate-in text-[11px] uppercase tracking-[0.22em] text-white/20 font-mono mb-6">
          Get in touch
        </p>

        <h2 className="animate-in font-display text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] max-w-4xl">
          Have a project in mind?{" "}
          <span className="text-white/40">Let&apos;s build something</span>
          <span className="bg-gradient-to-r from-[#6ecbf5] via-[#a078ff] to-[#ff78b4] bg-clip-text text-transparent">
            {" "}
            exceptional.
          </span>
        </h2>

        <div className="animate-in mt-12">
          <TiltGlass tiltMax={5}>
            <a
              href="mailto:alex@example.com"
              className="group flex items-center gap-4 glass-strong rounded-full px-8 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
            >
              Start a conversation
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                <ArrowRight size={16} weight="bold" />
              </span>
            </a>
          </TiltGlass>
        </div>

        <div className="animate-in flex items-center gap-4 mt-16">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="w-11 h-11 rounded-full glass flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>

        <p className="animate-in mt-8 text-xs text-white/15 font-mono">
          &copy; {new Date().getFullYear()} Alex Chen. Crafted with care.
        </p>
      </div>
    </section>
  );
}
