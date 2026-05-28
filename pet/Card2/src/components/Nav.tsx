"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const links = ["Work", "About", "Contact"];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/70 backdrop-blur-xl px-1 py-1 shadow-2xl">
        <a
          href="#"
          className="rounded-full px-5 py-2 text-sm font-medium tracking-tight text-white/80 hover:text-white transition-colors"
        >
          CV
        </a>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={(e) => handleScroll(e, link)}
            className="rounded-full px-5 py-2 text-sm font-medium tracking-tight text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            {link}
          </a>
        ))}
        <a
          href="#contact"
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold tracking-tight text-black hover:bg-white/90 transition-all"
        >
          Let&apos;s talk
        </a>
      </div>
    </nav>
  );
}
