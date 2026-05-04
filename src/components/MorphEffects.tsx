"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════ */
/* SCRUB MORPH TEXT — Giant words morph on scroll             */
/* ═══════════════════════════════════════════════════════════ */
const morphWords = [
  { word: "RÉPARER", sub: "Restaurer l'intégrité" },
  { word: "RESTAURER", sub: "Redonner la noblesse" },
  { word: "TRANSFORMER", sub: "Réinventer l'excellence" },
  { word: "RENAÎTRE", sub: "La perfection ressuscitée" },
];

export function ScrubMorphText() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Scrub through words with blur/scale morph
    morphWords.forEach((_, i) => {
      const el = sectionRef.current!.querySelector(`.morph-word-${i}`);
      if (!el) return;

      // Determine visibility range (each word visible for 25% of scroll)
      const startPct = 15 + i * 22;
      const endPct = 30 + i * 22;

      gsap.fromTo(
        el,
        {
          opacity: 0,
          scale: 1.4,
          y: 60,
          filter: "blur(25px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `${startPct}% center`,
            end: `${endPct}% center`,
            scrub: 1,
          },
        }
      );

      // Fade out
      gsap.to(el, {
        opacity: 0,
        scale: 0.9,
        y: -40,
        filter: "blur(15px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `${endPct}% center`,
          end: `${endPct + 10}% center`,
          scrub: 1,
        },
      });
    });

    // Sub text animation
    gsap.utils
      .toArray<HTMLElement>(
        sectionRef.current!.querySelectorAll(".morph-sub")
      )
      .forEach((el, i) => {
        const startPct = 17 + i * 22;
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${startPct}% center`,
              end: `${startPct + 5}% center`,
              scrub: 1,
            },
          }
        );
      });

    // Section line reveal
    gsap.fromTo(
      ".morph-line-top, .morph-line-bottom",
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080808]"
      style={{ height: "300vh" }}
    >
      {/* Decorative lines */}
      <div className="morph-line-top absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent origin-center z-10" />
      <div className="morph-line-bottom absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent origin-center z-10" />

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background gradient shift */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Stacked words */}
        <div className="relative text-center px-6">
          {morphWords.map((item, i) => (
            <div
              key={i}
              className={`morph-word-${i} absolute inset-0 flex flex-col items-center justify-center opacity-0`}
              style={{ willChange: "transform, opacity, filter" }}
            >
              <span
                className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[13rem] font-bold tracking-tighter text-white leading-none select-none"
                style={{
                  textShadow: "0 0 80px rgba(212,175,55,0.08)",
                }}
              >
                {item.word}
              </span>
              <p className="morph-sub text-[11px] tracking-[0.5em] uppercase text-[#D4AF37]/30 font-medium mt-6 opacity-0">
                {item.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          <div className="w-8 h-px bg-white/10" />
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-mono">
            01 / 07
          </span>
          <div className="w-8 h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/* INFINITE MARQUEE — Infinite scrolling text bands           */
/* ═══════════════════════════════════════════════════════════ */
export function InfiniteMarquee({
  words,
  speed = 30,
  className = "",
}: {
  words: string[];
  speed?: number;
  className?: string;
}) {
  const marqueeId = useRef(
    `marquee-${Math.random().toString(36).slice(2, 9)}`
  );

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ willChange: "transform" }}
    >
      <style>{`
        @keyframes ${marqueeId.current} {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .${marqueeId.current} {
          animation: ${marqueeId.current} ${speed}s linear infinite;
        }
      `}</style>

      {/* Double the words for seamless loop */}
      <div className={`inline-flex ${marqueeId.current}`}>
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <span
            key={i}
            className="text-sm md:text-base tracking-[0.3em] uppercase font-medium text-white/[0.06] mx-8 md:mx-12 select-none"
          >
            {word}
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37]/15 ml-8 md:ml-12 align-middle" />
          </span>
        ))}
      </div>
    </div>
  );
}
