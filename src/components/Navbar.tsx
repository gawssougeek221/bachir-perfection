"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-200/60 ${
        scrolled
          ? "bg-[rgba(248,248,246,0.92)] backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
          : "bg-[rgba(248,248,246,0.85)] backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col items-start">
          <span className="text-xl font-bold tracking-wider text-[#111] leading-none">
            PERFECTION
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mt-0.5">
            BY BACHIR
          </span>
        </a>

        {/* Center Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {["Accueil", "Services", "Transformations", "À propos"].map(
            (link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-").replace(/à/g, "a")}`}
                className="text-sm tracking-wide text-[#555] hover:text-[#D4AF37] transition-colors duration-300"
              >
                {link}
              </a>
            )
          )}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/221XXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-[#D4AF37] text-white text-xs tracking-wider uppercase px-5 py-2.5 rounded-full font-medium hover:bg-[#C4A030] transition-colors duration-300"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Devis WhatsApp
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-px bg-[#111] transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`w-5 h-px bg-[#111] transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-px bg-[#111] transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 border-t border-gray-200/60" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4 bg-[rgba(248,248,246,0.98)] backdrop-blur-md">
          {["Accueil", "Services", "Transformations", "À propos"].map(
            (link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-").replace(/à/g, "a")}`}
                className="text-sm tracking-wide text-[#555] hover:text-[#D4AF37] transition-colors duration-300"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            )
          )}
          <a
            href="https://wa.me/221XXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-white text-xs tracking-wider uppercase px-5 py-2.5 rounded-full font-medium hover:bg-[#C4A030] transition-colors duration-300 w-fit"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Devis WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
