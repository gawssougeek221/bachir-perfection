"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) updatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) updatePosition(e.touches[0].clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, updatePosition]);

  // GSAP reveal
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.from(".ba-header", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".ba-header",
        start: "top 85%",
      },
    });

    gsap.from(".ba-container", {
      y: 60,
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".ba-container",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section className="py-32 md:py-40 px-6 bg-[#F8F8F6]" id="transformations">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="ba-header text-center mb-16">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/60 font-medium block mb-4">
            Avant & Après
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111]">
            Transformation réelle
          </h2>
          <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-5 mb-4" />
          <p className="text-[#999] max-w-md mx-auto text-sm">
            Faites glisser pour voir la différence
          </p>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="ba-container relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden select-none"
          style={{ aspectRatio: "16/10" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          data-cursor="pointer"
          data-cursor-text="DRAG"
        >
          {/* Before (bottom layer) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #8B7355 0%, #6B5B45 25%, #A0896C 50%, #7D6E5A 75%, #9C8B73 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg, transparent, transparent 10px,
                  rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px
                ), repeating-linear-gradient(
                  -30deg, transparent, transparent 20px,
                  rgba(0,0,0,0.08) 20px, rgba(0,0,0,0.08) 21px
                )`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/80 text-2xl md:text-3xl font-semibold tracking-tight">
                  AVANT
                </p>
                <p className="text-white/40 text-xs mt-2 tracking-wider uppercase">
                  Usure · Rayures · Patine
                </p>
              </div>
            </div>
          </div>

          {/* After (top layer with clip) */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              background:
                "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #111111 50%, #252525 75%, #0a0a0a 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.3), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/90 text-2xl md:text-3xl font-semibold tracking-tight">
                  APRÈS
                </p>
                <p className="text-white/40 text-xs mt-2 tracking-wider uppercase">
                  Showroom · Finition parfaite
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 z-10"
            style={{
              left: `${sliderPos}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="w-px h-full bg-white/60" />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center"
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="text-[#111]"
              >
                <path
                  d="M6 10L3 10M17 10L14 10M6 10L8 8M6 10L8 12M14 10L12 8M14 10L12 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="absolute top-4 -translate-x-[calc(100%+12px)] text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium whitespace-nowrap hidden md:block">
              Avant
            </div>
            <div className="absolute top-4 translate-x-[calc(100%+12px)] text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium whitespace-nowrap hidden md:block">
              Après
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
