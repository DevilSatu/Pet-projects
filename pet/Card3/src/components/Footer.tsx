import { GithubLogo, XLogo, LinkedinLogo, Heart } from "@phosphor-icons/react";

const socialLinks = [
  { label: "GitHub", icon: GithubLogo, href: "#" },
  { label: "Twitter", icon: XLogo, href: "#" },
  { label: "LinkedIn", icon: LinkedinLogo, href: "#" },
];

const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div>
            <a href="#hero" className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-rose to-amber flex items-center justify-center text-deep text-xs font-extrabold">
                R
              </span>
              <span className="font-display font-semibold text-sm tracking-tight text-stone-300">
                Raya Farkh
              </span>
            </a>
            <p className="text-sm text-stone-500 max-w-xs leading-relaxed">
              Full-stack developer crafting digital experiences with modern
              technologies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-600 font-mono mb-4">
                Navigation
              </p>
              <ul className="flex flex-col gap-3">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-stone-400 hover:text-stone-200 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-600 font-mono mb-4">
                Social
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-stone-400 hover:text-stone-200 hover:border-stone-500 transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600 font-mono">
            &copy; {year} Raya Farkh. All rights reserved.
          </p>
          <p className="text-xs text-stone-600 font-mono flex items-center gap-1.5">
            Crafted with <Heart size={12} className="text-rose" weight="fill" /> using
            React & GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
