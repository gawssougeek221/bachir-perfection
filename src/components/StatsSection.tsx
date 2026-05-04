"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({
  target,
  label,
  suffix = "",
  prefix = "",
}: {
  target: number;
  label: string;
  suffix?: string;
  prefix?: string;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!counterRef.current) return;

    const obj = { val: 0 };

    // Scrub-driven counter (not just trigger-based)
    gsap.to(obj, {
      val: target,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
        end: "top 30%",
        scrub: 1.5,
      },
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}`;
        }
      },
    });

    // Scale pulse on center of viewport
    gsap.fromTo(
      containerRef.current,
      { scale: 0.85 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="text-center group cursor-default">
      <div className="relative inline-block">
        <span
          ref={counterRef}
          className="text-5xl md:text-7xl lg:text-[6rem] font-extralight tracking-tight text-white tabular-nums block"
          style={{ willChange: "transform" }}
        >
          {prefix}0
        </span>
        <span className="text-5xl md:text-7xl lg:text-[6rem] font-extralight tracking-tight text-[#D4AF37] tabular-nums">
          {suffix}
        </span>
        {/* Underline animation */}
        <div className="w-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mx-auto mt-2 group-hover:w-full transition-all duration-700" />
      </div>
      <p className="text-[10px] tracking-[0.4em] uppercase text-white/15 font-medium mt-4">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Section wipe reveal from center
    gsap.fromTo(
      ".stats-wipe",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    // Background pulse
    gsap.fromTo(
      ".stats-glow",
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      }
    );

    // Floating particles
    gsap.utils.toArray<HTMLElement>(".stats-particle").forEach((p, i) => {
      gsap.to(p, {
        y: -20 - Math.random() * 30,
        opacity: 0,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        delay: i * 0.3,
        ease: "power1.out",
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-44 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0a0808 50%, #080805 100%)",
      }}
    >
      {/* Background glow */}
      <div className="stats-glow absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)",
        willChange: "transform, opacity",
      }} />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="stats-particle absolute w-1 h-1 rounded-full bg-[#D4AF37]/20 pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Top/bottom lines */}
      <div className="stats-wipe absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent origin-center" />
      <div className="stats-wipe absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent origin-center" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Label */}
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.6em] uppercase text-[#D4AF37]/30 font-medium">
            En chiffres
          </span>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <AnimatedCounter target={350} suffix="+" label="Voitures transformées" />
          <AnimatedCounter target={12} suffix="" label="Années d'expertise" />
          <AnimatedCounter target={98} suffix="%" label="Clients satisfaits" />
          <AnimatedCounter target={24} suffix="h" label="Délai moyen" />
        </div>

        {/* Decorative text marquee below */}
        <div className="mt-24 overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: "statsMarquee 20s linear infinite" }}>
            {Array(8).fill(null).map((_, i) => (
              <span key={i} className="text-[12rem] md:text-[16rem] font-bold tracking-tighter text-white/[0.015] leading-none select-none mx-4">
                PERFECTION
              </span>
            ))}
          </div>
          <style jsx>{`
            @keyframes statsMarquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
