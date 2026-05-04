"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: "MERCEDES", svg: "mercedes" },
  { name: "PORSCHE", svg: "porsche" },
  { name: "RANGE ROVER", svg: "range-rover" },
  { name: "AUDI", svg: "audi" },
  { name: "BMW", svg: "bmw" },
];

function MercedesLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-white/15">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" />
      <path d="M24 8L14 36h20L24 8z" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <line x1="24" y1="10" x2="24" y2="34" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function PorscheLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-white/15">
      <rect x="4" y="4" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="1" />
      <path d="M24 12v24M12 24h24M14 14l20 20M34 14L14 34" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function RangeRoverLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-white/15">
      <ellipse cx="24" cy="24" rx="22" ry="16" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="24" cy="24" rx="14" ry="10" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <path d="M6 24h36" stroke="currentColor" strokeWidth="0.6" />
      <text x="24" y="27" textAnchor="middle" fontSize="7" fill="currentColor" fontFamily="sans-serif" fontWeight="bold">RR</text>
    </svg>
  );
}

function AudiLogo() {
  return (
    <svg width="60" height="48" viewBox="0 0 60 48" fill="none" className="text-white/15">
      {[8, 20, 32, 44].map((cx, i) => (
        <circle key={i} cx={cx} cy="24" r="8" stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}

function BMWLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-white/15">
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" />
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <text x="24" y="22" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="sans-serif" fontWeight="bold">B</text>
      <text x="24" y="32" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="sans-serif" fontWeight="bold">M</text>
      <text x="34" y="27" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="sans-serif" fontWeight="bold">W</text>
    </svg>
  );
}

const logoComponents: Record<string, () => React.ReactNode> = {
  mercedes: () => <MercedesLogo />,
  porsche: () => <PorscheLogo />,
  "range-rover": () => <RangeRoverLogo />,
  audi: () => <AudiLogo />,
  bmw: () => <BMWLogo />,
};

export default function TrustLogos() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".trust-label", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
      },
    });

    gsap.utils.toArray<HTMLElement>(".trust-logo").forEach((logo, i) => {
      gsap.from(logo, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-[#F8F8F6] border-b border-[#eee] relative"
    >
      <p className="trust-label text-[10px] tracking-[0.5em] uppercase text-[#bbb] text-center mb-12">
        Ils nous font confiance
      </p>

      <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="trust-logo flex flex-col items-center gap-3 group cursor-default"
            data-cursor="pointer"
          >
            {logoComponents[brand.svg]?.()}
            <span className="text-sm font-bold tracking-[0.15em] text-[#ccc] group-hover:text-[#D4AF37] transition-colors duration-500">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
