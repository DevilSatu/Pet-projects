"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { seed: "arch1", label: "Spatial" },
  { seed: "arch2", label: "Structural" },
  { seed: "arch3", label: "Kinetic" },
  { seed: "arch4", label: "Fluid" },
  { seed: "arch5", label: "Modular" },
  { seed: "arch6", label: "Organic" },
];

export default function ScaleGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((item) => {
        const img = item.querySelector(".gallery-img") as HTMLElement;
        const label = item.querySelector(".gallery-label") as HTMLElement;

        gsap.fromTo(
          img,
          { scale: 0.8, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 30%",
              scrub: 1.5,
            },
          }
        );

        gsap.fromTo(
          label,
          { opacity: 0.1, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 40%",
              scrub: 1.2,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-32 md:py-48">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            Process
          </span>
          <h2 className="mt-4 font-outfit text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Approach
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <div
              key={i}
              className="gallery-item group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/5">
                <div
                  className="gallery-img h-full w-full bg-cover bg-center grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  style={{
                    backgroundImage: `url(https://picsum.photos/seed/${img.seed}/600/750)`,
                  }}
                />
              </div>
              <span className="gallery-label mt-4 block font-outfit text-sm font-medium tracking-tight text-white/60">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
