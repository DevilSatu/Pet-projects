"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Orb {
  el: HTMLDivElement;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  color: string;
  blur: number;
  speed: number;
}

export default function CursorBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = [
      "rgba(110, 203, 245, 0.15)",
      "rgba(160, 120, 255, 0.1)",
      "rgba(255, 120, 180, 0.08)",
      "rgba(80, 220, 200, 0.1)",
    ];

    const orbs: Orb[] = [];
    const orbCount = 6;

    for (let i = 0; i < orbCount; i++) {
      const el = document.createElement("div");
      const size = 300 + Math.random() * 400;
      const color = colors[i % colors.length];
      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle at center, ${color}, transparent 70%);
        pointer-events: none;
        will-change: transform;
        opacity: 0.8;
      `;
      container.appendChild(el);

      orbs.push({
        el,
        x: Math.random(),
        y: Math.random(),
        tx: Math.random(),
        ty: Math.random(),
        size,
        color,
        blur: 60 + Math.random() * 80,
        speed: 0.3 + Math.random() * 0.4,
      });
    }

    orbsRef.current = orbs;

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      mouseRef.current = {
        x: t.clientX / window.innerWidth,
        y: t.clientY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch);

    let animationId: number;

    const animate = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      orbs.forEach((orb, i) => {
        const targetX = mx + (Math.sin(Date.now() * 0.0003 + i * 2) * 0.15);
        const targetY = my + (Math.cos(Date.now() * 0.0002 + i * 3) * 0.15);

        orb.tx += (targetX - orb.tx) * 0.03;
        orb.ty += (targetY - orb.ty) * 0.03;

        const px = orb.tx * window.innerWidth - orb.size / 2;
        const py = orb.ty * window.innerHeight - orb.size / 2;

        gsap.set(orb.el, {
          x: px,
          y: py,
          opacity: 0.5 + Math.sin(Date.now() * 0.001 + i) * 0.15,
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
      orbs.forEach((orb) => orb.el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ filter: "blur(80px)" }}
    />
  );
}
