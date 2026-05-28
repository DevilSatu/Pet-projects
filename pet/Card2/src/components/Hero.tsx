"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-line",
        { y: 120, opacity: 0, rotateX: -15 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15 }
      );

      tl.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
        "-=0.4"
      );

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 0.85, x: 80, opacity: 0 },
          { scale: 1, x: 0, opacity: 1, duration: 1.4, ease: "power2.out" },
          "-=1.6"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden px-6 pt-28 pb-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-soft/5" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-0">
        <div ref={textRef} className="relative z-10 w-full lg:w-3/5 lg:pr-16">
          <div className="overflow-hidden">
            <h1 className="hero-line font-outfit text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-white">
              I shape{" "}
              <span
                className="inline-block h-12 w-28 rounded-full align-middle bg-cover bg-center mx-2 shadow-2xl ring-2 ring-white/10 md:h-16 md:w-40"
                style={{ backgroundImage: "url(https://picsum.photos/seed/abstract/400/200)" }}
              />{" "}
              digital{" "}
              <span className="text-accent">experiences</span>
            </h1>
          </div>
          <div className="mt-6 overflow-hidden">
            <p className="hero-line font-outfit text-lg leading-relaxed text-white/50 md:text-xl max-w-lg">
              Frontend developer crafting intentional, motion-rich interfaces.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="overflow-hidden">
              <a
                href="#work"
                className="hero-cta inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold tracking-tight text-black hover:bg-white/90 transition-all"
              >
                View work
              </a>
            </div>
            <div className="overflow-hidden">
              <a
                href="#contact"
                className="hero-cta inline-block rounded-full border border-white/20 px-8 py-3 text-sm font-semibold tracking-tight text-white/80 hover:bg-white/5 hover:border-white/40 transition-all"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative z-0 w-full lg:w-2/5 lg:-ml-20"
        >
          <div className="aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <div
              className="h-full w-full bg-cover bg-center grayscale contrast-125"
              style={{ backgroundImage: "url(https://picsum.photos/seed/studio/800/1000)" }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-accent-soft/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
