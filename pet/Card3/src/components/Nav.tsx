"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { List, X, ArrowRight } from "@phosphor-icons/react";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (menuOpen && overlayRef.current && linksRef.current) {
        const tl = gsap.timeline();
        tl.fromTo(
          overlayRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
        );
        tl.fromTo(
          linksRef.current.querySelectorAll(".nav-link-item"),
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
          "-=0.15"
        );
      }
    },
    { dependencies: [menuOpen], scope: navRef }
  );

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-100 w-[calc(100%-2rem)] max-w-5xl"
      >
        <div className="glass-panel-strong rounded-full px-6 py-3 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-rose to-amber flex items-center justify-center text-deep text-xs font-extrabold">
              R
            </span>
            <span className="font-display font-semibold text-sm tracking-tight hidden sm:inline">
              Raya Farkh
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-stone-400 hover:text-stone-100 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="flex items-center gap-2 text-sm font-medium bg-rose hover:bg-rose/90 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-[0.98]"
            >
              Resume
              <ArrowRight size={14} weight="bold" />
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </nav>

      <div
        ref={overlayRef}
        className={`fixed inset-0 z-90 bg-deep/95 backdrop-blur-3xl flex items-center justify-center ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"
        }`}
      >
        <div ref={linksRef} className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="nav-link-item text-4xl md:text-5xl font-display font-bold text-stone-300 hover:text-stone-100 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="nav-link-item mt-4 flex items-center gap-3 text-lg font-medium bg-rose hover:bg-rose/90 text-white px-8 py-4 rounded-full transition-all duration-300"
          >
            Resume
            <ArrowRight size={18} weight="bold" />
          </a>
        </div>
      </div>
    </>
  );
}
