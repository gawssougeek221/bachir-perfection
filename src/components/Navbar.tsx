"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate navbar entry
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.2 }); // After preloader
    tl.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const navLinks = ["ACCUEIL", "SERVICES", "RÉALISATIONS", "À PROPOS", "CONTACT"];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#111]/90 backdrop-blur-xl shadow-[0_1px_30px_rgba(0,0,0,0.3)] border-b border-white/5"
          : "bg-transparent"
      }`}
      style={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="h-[70px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col items-start group" data-cursor="pointer">
            <span
              className={`text-lg font-bold tracking-[0.15em] leading-none transition-colors duration-500 ${
                scrolled || mobileOpen
                  ? "text-white"
                  : "text-white"
              }`}
            >
              PERFECTION
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#D4AF37] mt-1 font-medium group-hover:tracking-[0.45em] transition-all duration-500">
              BY BACHIR
            </span>
          </a>

          {/* Center Nav Links - Desktop */}
          <div ref={linksRef} className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-").replace(/à/g, "a").replace(/é/g, "e")}`}
                className="text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-[#D4AF37] transition-all duration-300 font-medium relative group"
                data-cursor="pointer"
                data-cursor-text={link.slice(0, 2)}
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/221XXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-[#D4AF37] text-[#111] text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-[25px] font-semibold hover:bg-[#C4A030] hover:scale-105 transition-all duration-300 shadow-sm shadow-[#D4AF37]/20"
              data-cursor="pointer"
              data-cursor-text="GO"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              DEVIS WHATSAPP
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
              data-cursor="pointer"
            >
              <span
                className={`w-5 h-px bg-white transition-all duration-300 ${
                  mobileOpen
                    ? "rotate-45 translate-y-[3.5px] bg-[#D4AF37]"
                    : ""
                }`}
              />
              <span
                className={`w-5 h-px bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-px bg-white transition-all duration-300 ${
                  mobileOpen
                    ? "-rotate-45 -translate-y-[3.5px] bg-[#D4AF37]"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <div className="px-6 md:px-16 py-8 flex flex-col gap-6 bg-[#111]/98 backdrop-blur-xl border-t border-white/5">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-").replace(/à/g, "a").replace(/é/g, "e")}`}
              className="text-xs tracking-[0.25em] uppercase text-white/40 hover:text-[#D4AF37] transition-colors duration-300 font-medium pl-2 border-l border-transparent hover:border-[#D4AF37]/30 hover:pl-4"
              style={{ transition: "all 0.3s ease" }}
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="https://wa.me/221XXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#111] text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-[25px] font-semibold hover:bg-[#C4A030] transition-all duration-300 w-fit mt-2"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            DEVIS WHATSAPP
          </a>
        </div>
      </div>
    </nav>
  );
}
