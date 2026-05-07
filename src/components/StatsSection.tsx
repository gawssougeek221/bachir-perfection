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
}: {
  target: number;
  label: string;
  suffix?: string;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!counterRef.current) return;

    const obj = { val: 0 };

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
          counterRef.current.textContent = `${Math.round(obj.val).toLocaleString()}`;
        }
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="text-center group cursor-default">
      <div className="relative inline-block">
        <span
          ref={counterRef}
          className="text-5xl md:text-7xl lg:text-[6rem] font-extralight tracking-tight text-[#111] tabular-nums block"
          style={{ willChange: "transform" }}
        >
          0
        </span>
        <span className="text-5xl md:text-7xl lg:text-[6rem] font-extralight tracking-tight text-[#D4AF37] tabular-nums">
          {suffix}
        </span>
        <div className="w-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mx-auto mt-2 group-hover:w-full transition-all duration-700" />
      </div>
      <p className="text-[10px] tracking-[0.4em] uppercase text-[#999] font-medium mt-4">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".stats-title-line-1", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
    gsap.from(".stats-title-line-2", {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
    gsap.from(".stats-subtitle", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-40 px-6 relative overflow-hidden bg-[#F8F8F6]"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Label */}
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.6em] uppercase text-[#bbb] font-medium">
            En chiffres
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            <span className="stats-title-line-1 block text-[#111]">
              L&apos;excellence en
            </span>
            <span className="stats-title-line-2 block text-[#D4AF37]">
              chiffres
            </span>
          </h2>
        </div>

        {/* Subtitle */}
        <p className="stats-subtitle text-[#999] text-sm max-w-md mx-auto text-center leading-relaxed mb-16">
          Plus d&apos;une décennie de passion au service de l&apos;automobile d&apos;exception
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-[#e5e5e3] mb-16" />

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <AnimatedCounter target={350} suffix="+" label="Voitures transformées" />
          <AnimatedCounter target={12} suffix="" label="Années d'expertise" />
          <AnimatedCounter target={98} suffix="%" label="Clients satisfaits" />
          <AnimatedCounter target={24} suffix="h" label="Délai moyen" />
        </div>
      </div>
    </section>
  );
}
