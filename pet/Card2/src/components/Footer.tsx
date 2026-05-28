"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
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
    <footer
      id="contact"
      ref={sectionRef}
      className="relative border-t border-white/5 px-6 py-32 md:py-48"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-transparent" />

      <div className="footer-content relative mx-auto max-w-6xl">
        <div className="mb-20">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            Contact
          </span>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="font-outfit text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-white">
              Let&apos;s build something
              <br />
              <span className="text-accent">remarkable</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/40 md:text-base">
              Available for freelance projects, collaborations, and full-time opportunities.
              I&apos;m always open to discussing new ideas.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-12">
            <div className="space-y-6">
              <a
                href="mailto:hello@example.com"
                className="group inline-flex items-center gap-3 font-outfit text-2xl font-medium tracking-tight text-white/80 hover:text-white transition-colors md:text-3xl"
              >
                hello@example.com
                <span className="inline-block h-3 w-3 rounded-full bg-accent/60 transition-transform duration-300 group-hover:scale-150" />
              </a>
              <br />
              <a
                href="#"
                className="group inline-flex items-center gap-3 font-outfit text-lg tracking-tight text-white/30 hover:text-white/60 transition-colors"
              >
                GitHub
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path
                    d="M2 12L12 2M12 2H5M12 2V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div className="flex flex-col gap-2 text-sm text-white/20">
              <p>Based in Berlin, DE</p>
              <p>&copy; {new Date().getFullYear()} — All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
