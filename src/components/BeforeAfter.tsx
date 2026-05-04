"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [clipShape, setClipShape] = useState(50);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
    setClipShape(percentage);
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
    const handleEnd = () => setIsDragging(false);

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

  // GSAP reveals
  useEffect(() => {
    gsap.from(".ba-section-label", {
      y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".ba-section-label", start: "top 85%" },
    });

    gsap.from(".ba-title", {
      y: 50, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ".ba-title", start: "top 85%" },
    });

    // Diagonal wipe reveal for the slider
    gsap.fromTo(
      ".ba-container",
      { clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".ba-container", start: "top 75%" },
      }
    );

    // Labels stagger
    gsap.from(".ba-label", {
      y: 20, opacity: 0, duration: 0.6, stagger: 0.2, ease: "power3.out",
      scrollTrigger: { trigger: ".ba-container", start: "top 60%" },
    });
  }, []);

  return (
    <section className="py-32 md:py-44 px-6 bg-[#0a0a0a]" id="transformations">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="ba-section-label text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/50 font-medium block mb-5">
            Avant & Après
          </span>
          <h2 className="ba-title text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Transformation réelle
          </h2>
          <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-5" />
          <div className="ba-label flex items-center justify-center gap-4 mt-5">
            <span className="text-white/30 text-xs">Faites glisser</span>
            <div className="w-5 h-px bg-[#D4AF37]/30" />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#D4AF37]/50">
              <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
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
          {/* Before */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #8B7355 0%, #6B5B45 25%, #A0896C 50%, #7D6E5A 75%, #9C8B73 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px), repeating-linear-gradient(-30deg, transparent, transparent 20px, rgba(0,0,0,0.08) 20px, rgba(0,0,0,0.08) 21px)`,
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/80 text-2xl md:text-3xl font-semibold tracking-tight">AVANT</p>
                <p className="text-white/30 text-[10px] mt-3 tracking-[0.3em] uppercase">Usure · Rayures · Patine</p>
              </div>
            </div>
          </div>

          {/* After - with creative clip path */}
          <div
            className="absolute inset-0 transition-[clip-path] duration-100 ease-out"
            style={{
              clipPath: `inset(0 ${100 - clipShape}% 0 0)`,
              background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #111111 50%, #252525 75%, #0a0a0a 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-30" style={{
              background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.3), transparent 60%)",
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/90 text-2xl md:text-3xl font-semibold tracking-tight">APRÈS</p>
                <p className="text-white/30 text-[10px] mt-3 tracking-[0.3em] uppercase">Showroom · Perfection</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="absolute top-0 bottom-0 z-10" style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}>
            {/* Glow line */}
            <div className="w-[2px] h-full bg-[#D4AF37] relative">
              <div className="absolute inset-0 bg-[#D4AF37] blur-sm opacity-50" />
            </div>

            {/* Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#D4AF37] shadow-2xl flex items-center justify-center"
              style={{
                cursor: isDragging ? "grabbing" : "grab",
                boxShadow: "0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-[#111]">
                <path d="M7 11H3M19 11H15M7 11L9 9M7 11L9 13M15 11L13 9M15 11L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Labels */}
            <div className="absolute top-5 -translate-x-[calc(100%+16px)] text-[9px] tracking-[0.3em] uppercase text-white/40 font-medium whitespace-nowrap hidden md:block">
              Avant
            </div>
            <div className="absolute top-5 translate-x-[calc(100%+16px)] text-[9px] tracking-[0.3em] uppercase text-white/40 font-medium whitespace-nowrap hidden md:block">
              Après
            </div>

            {/* Percentage indicator */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <span className="text-[10px] font-mono text-[#D4AF37]/60">
                {Math.round(clipShape)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
