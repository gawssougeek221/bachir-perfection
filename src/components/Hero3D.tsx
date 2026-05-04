"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-label", {
        y: -20,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-line-1",
          {
            x: -30,
            opacity: 0,
            duration: 1.0,
          },
          "-=0.4"
        )
        .from(
          ".hero-line-2",
          {
            x: 30,
            opacity: 0,
            duration: 1.0,
          },
          "-=0.7"
        )
        .from(
          ".hero-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-btn",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
          },
          "-=0.4"
        )
        .from(
          ".hero-scroll-indicator",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2"
        );

      // Animate the chevron bouncing
      gsap.to(".hero-chevron", {
        y: 6,
        duration: 1.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden pt-20"
      style={{
        background:
          "linear-gradient(135deg, #E8E6E3 0%, #F5F3F0 30%, #EDEBE8 60%, #F8F8F6 100%)",
      }}
    >
      {/* Subtle radial overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Decorative subtle lines */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent hidden lg:block" />
      <div className="absolute top-1/3 right-12 w-px h-24 bg-gradient-to-b from-transparent via-[#D4AF37]/15 to-transparent hidden lg:block" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <div className="text-center">
          {/* Top label */}
          <p className="hero-label text-xs tracking-[0.4em] uppercase text-[#D4AF37] font-medium mb-6">
            Luxury Car Renovation
          </p>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#111] text-center leading-[1.1]">
            <span className="hero-line-1 block">PERFECTION IS NOT REPAIR.</span>
            <span className="hero-line-2 block mt-2 text-[#D4AF37]">
              IT IS REBIRTH.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-base md:text-lg text-[#555] mt-6 max-w-lg mx-auto text-center leading-relaxed">
            Rénovation automobile haut de gamme à Dakar, Sénégal.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
            <a
              href="#transformations"
              className="hero-btn inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-white px-8 py-4 rounded-full text-sm tracking-wider uppercase font-medium hover:bg-[#C4A030] transition-colors duration-300"
            >
              Voir Nos Transformations
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <a
              href="https://wa.me/221XXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn inline-flex items-center justify-center gap-2 bg-white text-[#333] px-8 py-4 rounded-full text-sm tracking-wider uppercase font-medium border border-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Devis WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-[0.3em] uppercase text-[#999]">
          Scroll to discover
        </span>
        <svg
          className="hero-chevron"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="#999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8l4 4 4-4" />
        </svg>
      </div>
    </section>
  );
}
