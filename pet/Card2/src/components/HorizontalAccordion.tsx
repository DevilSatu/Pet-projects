"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    label: "Strategy",
    desc: "Understanding the problem before writing a single line of code. Research, planning, architecture.",
    image: "https://picsum.photos/seed/strategy/400/600",
  },
  {
    label: "Design",
    desc: "Interface design that balances aesthetics with usability. Prototyping, iteration, refinement.",
    image: "https://picsum.photos/seed/design/400/600",
  },
  {
    label: "Build",
    desc: "Clean, maintainable code. Component architecture, performance optimization, testing.",
    image: "https://picsum.photos/seed/build/400/600",
  },
  {
    label: "Ship",
    desc: "Deployment, monitoring, and continuous improvement. Production-grade delivery every time.",
    image: "https://picsum.photos/seed/ship/400/600",
  },
];

export default function HorizontalAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".accordion-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".accordion-slice",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-32 md:py-48">
      <div className="mx-auto max-w-6xl">
        <div className="accordion-title mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            Process
          </span>
          <h2 className="mt-4 font-outfit text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            How I work
          </h2>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:h-[500px] md:gap-0">
          {items.map((item, i) => (
            <div
              key={i}
              className={`accordion-slice group relative flex md:flex-1 cursor-pointer overflow-hidden border border-white/5 transition-all duration-700 ease-out ${
                activeIndex === i ? "md:flex-[3]" : ""
              }`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="absolute inset-0">
                <div
                  className="h-full w-full bg-cover bg-center grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
              </div>

              <div className="relative flex w-full flex-col justify-end p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <span className="font-outfit text-xs font-semibold tracking-[0.15em] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-outfit text-lg font-semibold tracking-tight text-white md:text-xl">
                    {item.label}
                  </h3>
                </div>
                <div
                  className={`mt-4 overflow-hidden transition-all duration-500 ${
                    activeIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-white/60 md:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
