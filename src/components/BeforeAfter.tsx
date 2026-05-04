"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(percentage);
    },
    []
  );

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

  return (
    <section className="py-32 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111] mb-4">
        Transformation réelle
      </h2>
      <p className="text-[#666] mb-10 max-w-md mx-auto">
        Faites glisser pour voir la différence
      </p>

      <div
        ref={containerRef}
        className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden cursor-ew-resize select-none"
        style={{ aspectRatio: "16/10" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Before (bottom layer) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #8B7355 0%, #6B5B45 25%, #A0896C 50%, #7D6E5A 75%, #9C8B73 100%)",
          }}
        >
          {/* Simulated scratches/damage texture */}
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.1) 10px,
              rgba(0,0,0,0.1) 11px
            ), repeating-linear-gradient(
              -30deg,
              transparent,
              transparent 20px,
              rgba(0,0,0,0.08) 20px,
              rgba(0,0,0,0.08) 21px
            )`,
          }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white/80 text-2xl md:text-3xl font-semibold tracking-tight">
                AVANT
              </p>
              <p className="text-white/50 text-sm mt-2">Usure · Rayures · Patine</p>
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
          {/* Pristine showroom finish */}
          <div className="absolute inset-0 opacity-30" style={{
            background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.3), transparent 60%)",
          }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white/90 text-2xl md:text-3xl font-semibold tracking-tight">
                APRÈS
              </p>
              <p className="text-white/60 text-sm mt-2">Showroom · Finition parfaite</p>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 z-10"
          style={{
            left: `${sliderPos}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="w-px h-full bg-white shadow-lg" />
          {/* Circular handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center"
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
        </div>
      </div>
    </section>
  );
}
