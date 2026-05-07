"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LiquidProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] pointer-events-none"
      style={{ background: "rgba(8,7,9,0.3)" }}
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0"
        style={{
          background: "linear-gradient(90deg, #D4AF37, #E8C84A, #D4AF37)",
          boxShadow: "0 0 10px rgba(212,175,55,0.4)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
