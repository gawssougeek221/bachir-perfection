"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.3 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    gsap.to(video, {
      scale: 1.05, y: -60, ease: "none",
      scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
    });
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSliderPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => { e.preventDefault(); setIsDragging(true); updatePosition(e.clientX); }, [updatePosition]);
  const handleTouchStart = useCallback((e: React.TouchEvent) => { setIsDragging(true); updatePosition(e.touches[0].clientX); }, [updatePosition]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (isDragging) updatePosition(e.clientX); };
    const onTouch = (e: TouchEvent) => { if (isDragging) updatePosition(e.touches[0].clientX); };
    const onEnd = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("touchend", onEnd);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onEnd); window.removeEventListener("touchmove", onTouch); window.removeEventListener("touchend", onEnd); };
  }, [isDragging, updatePosition]);

  useEffect(() => {
    gsap.from(".ba-section-label", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".ba-section-label", start: "top 85%" } });
    gsap.from(".ba-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".ba-title", start: "top 85%" } });
    gsap.fromTo(".ba-container", { clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)" }, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.5, ease: "power4.inOut", scrollTrigger: { trigger: ".ba-container", start: "top 75%" } });
  }, []);

  return (
    <section ref={sectionRef} className="pt-8 pb-24 md:pb-32 relative overflow-hidden" style={{ background: "#080709" }} id="transformations">
      <div className="absolute inset-0 overflow-hidden">
        <video ref={videoRef} src="/before-after-work.mp4" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ transform: "scale(1.15)", filter: "brightness(0.3) saturate(0.7) contrast(1.1)", willChange: "transform" }} />
        <div className="absolute inset-0" style={{ background: "rgba(8,7,9,0.6)" }} />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#080709] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080709] to-transparent" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(8,7,9,0.8) 100%)" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="ba-section-label text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/50 font-medium block mb-5">Avant & Après</span>
          <h2 className="ba-title text-3xl md:text-5xl font-semibold tracking-tight text-white">Transformation réelle</h2>
          <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-5" />
          <div className="flex items-center justify-center gap-4 mt-5">
            <span className="text-white/30 text-xs">Faites glisser</span>
            <div className="w-5 h-px bg-[#D4AF37]/30" />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#D4AF37]/50"><path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>

        <div ref={containerRef} className="ba-container relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden select-none" style={{ aspectRatio: "16/10", border: "1px solid rgba(212,175,55,0.1)" }} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
          <div className="absolute inset-0">
            <img src="/before.jpg" alt="Avant" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-5 left-5 px-4 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-medium">Avant</span>
            </div>
          </div>
          <div className="absolute inset-0 transition-[clip-path] duration-100 ease-out" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
            <img src="/after.jpg" alt="Après" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-5 right-5 px-4 py-2 rounded-full" style={{ background: "rgba(212,175,55,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium">Après</span>
            </div>
          </div>
          <div className="absolute top-0 bottom-0 z-10" style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}>
            <div className="w-[2px] h-full bg-[#D4AF37] relative"><div className="absolute inset-0 bg-[#D4AF37] blur-sm opacity-50" /></div>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#D4AF37] shadow-2xl flex items-center justify-center" style={{ cursor: isDragging ? "grabbing" : "grab", boxShadow: "0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1)" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-[#111]"><path d="M7 11H3M19 11H15M7 11L9 9M7 11L9 13M15 11L13 9M15 11L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <span className="text-[10px] font-mono text-[#D4AF37]/60">{Math.round(sliderPos)}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
