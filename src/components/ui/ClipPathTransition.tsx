"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DARK = "#080709";
const LIGHT = "#F8F8F6";
const GOLD = "#D4AF37";

export default function ClipPathTransition({ className = "" }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const circle = circleRef.current!;
      const ring = ringRef.current!;
      const pulse = pulseRef.current!;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      tl.fromTo(pulse, { opacity: 0, scale: 0 }, { opacity: 0.6, scale: 1, duration: 0.4, ease: "none" }, 0);
      tl.to(pulse, { opacity: 0, duration: 0.3, ease: "none" }, 0.4);
      tl.fromTo(ring, { scale: 0, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.5, ease: "none" }, 0);
      tl.fromTo(circle, { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(150% at 50% 50%)", duration: 0.85, ease: "none" }, 0.15);
      tl.to(ring, { opacity: 0, duration: 0.35, ease: "none" }, 0.6);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`} style={{ height: "35vh" }}>
      <div className="absolute inset-0" style={{ backgroundColor: LIGHT }} />

      <div ref={pulseRef} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
        <div
          className="rounded-full will-change-[opacity,transform]"
          style={{
            width: "320px",
            height: "320px",
            background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.04) 50%, transparent 100%)",
          }}
        />
      </div>

      <div ref={ringRef} className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-[opacity,transform]" style={{ opacity: 0 }}>
        <div
          className="rounded-full"
          style={{
            width: "220px",
            height: "220px",
            border: `6px solid ${GOLD}`,
            boxShadow: `0 0 40px 20px ${GOLD}55, 0 0 80px 40px ${GOLD}22`,
          }}
        />
      </div>

      <div
        ref={circleRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ clipPath: "circle(0% at 50% 50%)", backgroundColor: DARK }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${GOLD}22 0%, ${GOLD}08 40%, transparent 100%)`,
          }}
        />
      </div>
    </div>
  );
}
