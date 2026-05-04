"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({
  target,
  label,
  suffix = "",
}: {
  target: number;
  label: string;
  suffix?: string;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!counterRef.current) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counterRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(obj.val).toString();
        }
      },
    });
  }, { scope: counterRef });

  return (
    <div className="text-center group">
      <div className="relative">
        <span
          ref={counterRef}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#111] tabular-nums"
        >
          0
        </span>
        <span className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#D4AF37] tabular-nums">
          {suffix}
        </span>
      </div>
      <div className="w-8 h-px bg-[#D4AF37]/40 mx-auto mt-4 mb-3 group-hover:w-16 transition-all duration-500" />
      <p className="text-xs tracking-[0.3em] uppercase text-[#999] font-medium">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".stats-line", {
      scaleX: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-40 px-6 bg-[#111] relative overflow-hidden"
    >
      {/* Decorative lines */}
      <div className="stats-line absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent origin-left" />
      <div className="stats-line absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent origin-right" />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/60 font-medium">
            En chiffres
          </span>
        </div>

        {/* Counters grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <AnimatedCounter target={350} suffix="+" label="Voitures transformées" />
          <AnimatedCounter target={12} suffix="" label="Années d'expertise" />
          <AnimatedCounter target={98} suffix="%" label="Clients satisfaits" />
          <AnimatedCounter target={24} suffix="h" label="Délai moyen" />
        </div>
      </div>
    </section>
  );
}
