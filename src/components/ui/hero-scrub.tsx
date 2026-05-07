"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_MAP = ["001", "002", "003", "005", "006", "007", "008", "009"];

export function HeroScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const frames = framesRef.current.filter(Boolean);
      if (frames.length === 0) return;

      // Pin the hero section
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${frames.length * 100}%`,
        pin: true,
      });

      // Frame scrub animation
      const obj = { frame: 0 };
      gsap.to(obj, {
        frame: frames.length - 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${frames.length * 100}%`,
          scrub: 1.5,
          onUpdate: () => {
            const idx = Math.round(obj.frame);
            frames.forEach((f, i) => {
              if (f) f.style.opacity = i === idx ? "1" : "0";
            });
          },
        },
      });

      // Text parallax
      if (textRef.current) {
        gsap.to(textRef.current, {
          y: -120,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${frames.length * 60}%`,
            scrub: 1,
          },
        });
      }

      return () => {
        st.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#080709]"
    >
      {/* Van frames */}
      {FRAME_MAP.map((num, i) => (
        <img
          key={num}
          ref={(el) => { if (el) framesRef.current[i] = el; }}
          src={`/frames/frame-${num}.jpg`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-none"
          style={{
            opacity: i === 0 ? 1 : 0,
            willChange: "opacity",
          }}
        />
      ))}

      {/* Overlay gradient */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(105deg, rgba(8,7,9,0.92) 0%, rgba(8,7,9,0.6) 30%, rgba(8,7,9,0.3) 55%, rgba(8,7,9,0.15) 100%)",
        }}
      />

      {/* Text content */}
      <div
        ref={textRef}
        className="absolute inset-0 z-[2] flex items-center pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 pointer-events-auto max-w-xl lg:max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#D4AF37]/60" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37] font-medium">
              Luxury Car Renovation
            </p>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            <span className="block">
              PERFECTION IS
              <br />
              NOT REPAIR.
            </span>
            <span
              className="block mt-2 text-[#D4AF37]"
              style={{ textShadow: "0 0 40px rgba(212,175,55,0.2)" }}
            >
              IT IS REBIRTH.
            </span>
          </h1>

          <p className="text-sm md:text-base text-white/50 mt-5 max-w-sm leading-relaxed font-light">
            Rénovation automobile haut de gamme à Dakar, Sénégal.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 w-fit">
            <a
              href="#transformations"
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#111] px-7 py-3.5 rounded-full text-[11px] md:text-sm tracking-wider uppercase font-semibold hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-shadow duration-500"
            >
              Voir Nos Transformations
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <a
              href="https://wa.me/221XXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/[0.07] backdrop-blur-md text-white/80 px-7 py-3.5 rounded-full text-[11px] md:text-sm tracking-wider uppercase font-medium border border-white/[0.12] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-500"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Devis WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-6 md:left-14 flex flex-col items-center gap-2 z-[3]">
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/30 font-medium">SCROLL</span>
        <div className="w-px h-10 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#D4AF37] to-transparent" style={{ animation: "scrollPulse 1.5s ease infinite" }} />
        </div>
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/30 font-medium">TO DISCOVER</span>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent z-[3]" />

      <style jsx>{`
        @keyframes scrollPulse {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
