"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DARK = "#080709";
const LIGHT = "#F8F8F6";
const GOLD = "#D4AF37";

interface ScrubTransitionProps {
  direction: "dark-to-light" | "light-to-dark";
  className?: string;
}

export default function ScrubTransition({
  direction,
  className = "",
}: ScrubTransitionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const featherRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const oldColor = direction === "dark-to-light" ? DARK : LIGHT;
      const overlay = overlayRef.current!;
      const feather = featherRef.current!;
      const glow = glowRef.current!;

      overlay.style.backgroundColor = oldColor;
      feather.style.background = `linear-gradient(to top, ${oldColor}, transparent)`;
      glow.style.boxShadow = `0 0 40px 0 ${GOLD}66`;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.0,
          pin: false,
        },
      });

      tl.to(overlay, { yPercent: -100, ease: "none", duration: 0.85 }, 0);
      tl.to(feather, { opacity: 0, ease: "none", duration: 0.4 }, 0.6);
      tl.to(glow, { opacity: 0, ease: "none", duration: 0.3 }, 0.7);
    }, wrapperRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full overflow-x-clip ${className}`}
      style={{ height: "35vh" }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: direction === "dark-to-light" ? LIGHT : DARK }}
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ backgroundColor: direction === "dark-to-light" ? DARK : LIGHT }}
      >
        <div
          ref={featherRef}
          className="absolute bottom-0 left-0 w-full will-change-[opacity]"
          style={{
            height: "220px",
            background: `linear-gradient(to top, ${direction === "dark-to-light" ? DARK : LIGHT}, transparent)`,
            transform: "translateY(100%)",
          }}
        />
        <div
          ref={glowRef}
          className="absolute bottom-0 left-0 w-full will-change-[opacity]"
          style={{
            height: "2px",
            background: `linear-gradient(90deg, transparent 0%, ${GOLD}33 15%, ${GOLD} 50%, ${GOLD}33 85%, transparent 100%)`,
            boxShadow: `0 0 40px 20px ${GOLD}44`,
            transform: "translateY(100%)",
          }}
        />
      </div>
    </div>
  );
}
