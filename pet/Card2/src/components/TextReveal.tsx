"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const text = `Every interface is a conversation. Between function and form, between user and system, between what is necessary and what is beautiful. I work at this intersection — crafting digital spaces that respect both the machine and the human.`;

export default function TextReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return;

      const words = textRef.current.querySelectorAll(".word");

      gsap.fromTo(
        words,
        { opacity: 0.06 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[80vh] items-center justify-center px-6 py-32 md:py-48"
    >
      <div className="mx-auto max-w-5xl">
        <p
          ref={textRef}
          className="font-outfit text-2xl leading-relaxed tracking-tight text-white md:text-3xl md:leading-relaxed lg:text-4xl lg:leading-relaxed"
        >
          {text.split(" ").map((word, i) => (
            <span key={i} className="word inline-block">
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
