"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type DividerVariant = "diamonds" | "triangles" | "waves" | "dots" | "crosses";

interface SenegalDividerProps {
  variant?: DividerVariant;
  className?: string;
  color?: string;
  count?: number;
  animated?: boolean;
}

export default function SenegalDivider({
  variant = "diamonds",
  className = "",
  color = "#D4AF37",
  count = 5,
  animated = true,
}: SenegalDividerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated || !ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".divider-element"),
      { opacity: 0, scale: 0.5, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" } },
    );
  }, [animated]);

  return (
    <div ref={ref} className={`flex items-center justify-center gap-4 md:gap-6 py-8 ${className}`}>
      <div className="flex-1 max-w-[180px] h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}33)` }} />
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="divider-element" style={{ opacity: animated ? 0 : 0.4 }}>
          {variant === "diamonds" && (
            <div className="rotate-45" style={{
              width: i === Math.floor(count / 2) ? 14 : 8,
              height: i === Math.floor(count / 2) ? 14 : 8,
              backgroundColor: color,
              opacity: i === Math.floor(count / 2) ? 1 : 0.4,
              boxShadow: i === Math.floor(count / 2) ? `0 0 16px ${color}66` : "none",
            }} />
          )}
        </div>
      ))}
      <div className="flex-1 max-w-[180px] h-px" style={{ background: `linear-gradient(270deg, transparent, ${color}33)` }} />
    </div>
  );
}
