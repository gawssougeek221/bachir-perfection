"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const hasCalledComplete = useRef(false);

  const safeComplete = useCallback(() => {
    if (hasCalledComplete.current) return;
    hasCalledComplete.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // SAFETY: Force show page after 3 seconds no matter what
    const safetyTimer = setTimeout(() => {
      safeComplete();
    }, 3000);

    try {
      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimer);
          safeComplete();
        },
      });

      const obj = { val: 0 };
      tl.to(obj, {
        val: 100,
        duration: 2.0,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(obj.val);
          setProgress(v);
          if (numberRef.current) {
            numberRef.current.textContent = v.toString().padStart(3, "0");
          }
        },
      });

      tl.to(
        progressRef.current,
        { scaleX: 1, duration: 2.0, ease: "power2.inOut" },
        0
      );

      tl.fromTo(
        ".preloader-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power3.out" },
        0
      );

      return () => {
        clearTimeout(safetyTimer);
        tl.kill();
      };
    } catch {
      // If GSAP fails completely, still show the page
      clearTimeout(safetyTimer);
      safeComplete();
    }
  }, [safeComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#111] flex items-center justify-center"
      style={{ willChange: "transform" }}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-[2] flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-bold tracking-[0.2em] text-white">
            PERFECTION
          </span>
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37] font-medium">
            BY BACHIR
          </span>
        </div>

        <div className="w-48 md:w-64 h-px bg-white/10 relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-full h-full bg-[#D4AF37] origin-left scale-x-0"
          />
        </div>

        <span
          ref={numberRef}
          className="text-[#D4AF37] text-sm tracking-[0.3em] font-mono tabular-nums"
        >
          000
        </span>
      </div>

      <div className="preloader-line absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/40 origin-left scale-x-0" />
      <div className="preloader-line absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/40 origin-right scale-x-0" />
    </div>
  );
}
