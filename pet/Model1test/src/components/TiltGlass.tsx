"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";

interface TiltGlassProps {
  children: ReactNode;
  className?: string;
  tiltMax?: number;
  glare?: boolean;
  as?: "div" | "section" | "article";
}

export default function TiltGlass({
  children,
  className = "",
  tiltMax = 6,
  glare = true,
  as: Tag = "div",
}: TiltGlassProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltMax;
    const rotateY = ((x - centerX) / centerX) * tiltMax;

    gsap.to(el, {
      rotateX,
      rotateY,
      transformPerspective: 1200,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (glare && glareRef.current) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      gsap.set(glareRef.current, {
        "--glare-x": `${glareX}%`,
        "--glare-y": `${glareY}%`,
      });
    }
  };

  const handlePointerLeave = () => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 0%), rgba(255,255,255,0.08) 0%, transparent 60%)",
            transition: "background 0.1s ease",
          }}
        />
      )}
    </Tag>
  );
}
