"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function lerpPoints(points1: number[][], points2: number[][], t: number): string {
  return points1
    .map((p1, i) => {
      const p2 = points2[i];
      const x = p1[0] + (p2[0] - p1[0]) * t;
      const y = p1[1] + (p2[1] - p1[1]) * t;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ") + " Z";
}

function generateBlob(cx: number, cy: number, radius: number, points: number, seed: number): number[][] {
  const pts: number[][] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const r = radius + Math.sin(angle * 3 + seed) * radius * 0.3 + Math.cos(angle * 2 + seed * 0.7) * radius * 0.15;
    pts.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }
  return pts;
}

function smoothPath(points: number[][]): string {
  if (points.length < 3) return "";
  const n = points.length;
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
  }
  d += " Z";
  return d;
}

const blobShapes = [
  { seed: 0, radius: 200, cx: 400, cy: 300, speed: 0.5, color: "rgba(212,175,55,0.04)" },
  { seed: 2.5, radius: 280, cx: 500, cy: 350, speed: 0.3, color: "rgba(212,175,55,0.03)" },
  { seed: 5.1, radius: 160, cx: 300, cy: 280, speed: 0.7, color: "rgba(212,175,55,0.05)" },
  { seed: 7.8, radius: 220, cx: 600, cy: 320, speed: 0.4, color: "rgba(212,175,55,0.025)" },
  { seed: 10.3, radius: 300, cx: 450, cy: 400, speed: 0.6, color: "rgba(212,175,55,0.035)" },
];

export default function MorphingBlobs() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const paths = svgRef.current?.querySelectorAll("path.blob-path");
    if (!paths) return;
    pathsRef.current = Array.from(paths) as SVGPathElement[];

    let time = 0;
    const animate = () => {
      time += 0.008;
      pathsRef.current.forEach((path, i) => {
        const shape = blobShapes[i];
        if (!shape) return;
        const pts1 = generateBlob(shape.cx, shape.cy, shape.radius, 8, shape.seed + time * shape.speed);
        const pts2 = generateBlob(shape.cx, shape.cy, shape.radius * 1.15, 8, shape.seed + 3 + time * shape.speed * 0.7);
        const t = (Math.sin(time * shape.speed * 2) + 1) / 2;
        const mixed = pts1.map((p, j) => [p[0] + (pts2[j][0] - p[0]) * t, p[1] + (pts2[j][1] - p[1]) * t]);
        path.setAttribute("d", smoothPath(mixed));
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 800 600" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" style={{ zIndex: 0 }}>
      {blobShapes.map((shape, i) => (
        <path key={i} className="blob-path" d="" fill={shape.color} style={{ filter: "blur(40px)", transformOrigin: "center" }} />
      ))}
    </svg>
  );
}

export function ScrubMorphText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  const morphSequence = ["REPAIR", "RESTORE", "TRANSFORM", "REBIRTH"];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;

        const wordIndex = Math.min(Math.floor(progress * morphSequence.length), morphSequence.length - 1);
        const wordProgress = progress * morphSequence.length - wordIndex;

        wordsRef.current.forEach((word, i) => {
          if (!word) return;
          const isActive = i === wordIndex;
          const isPast = i < wordIndex;
          const isNext = i === wordIndex + 1;

          if (isActive) {
            const scale = 1 + (1 - wordProgress) * 0.5;
            const opacity = wordProgress < 0.1 ? wordProgress / 0.1 : wordProgress > 0.8 ? (1 - wordProgress) / 0.2 : 1;
            const y = (1 - wordProgress) * -60 + (wordProgress > 0.5 ? (wordProgress - 0.5) * 80 : 0);
            gsap.set(word, { opacity: Math.max(0, Math.min(1, opacity)), scale, y, filter: `blur(${Math.max(0, (1 - opacity) * 10)}px)` });
          } else if (isPast) {
            gsap.set(word, { opacity: 0, scale: 0.8, y: 80, filter: "blur(10px)" });
          } else if (isNext) {
            gsap.set(word, { opacity: Math.max(0, wordProgress - 0.8) / 0.2, scale: 1.3 - wordProgress * 0.3, y: -40 + wordProgress * 100, filter: `blur(${Math.max(0, 10 - wordProgress * 10)}px)` });
          } else {
            gsap.set(word, { opacity: 0, scale: 1.4, y: -60, filter: "blur(10px)" });
          }
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <MorphingBlobs />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div className="relative z-10 text-center">
        <span className="text-[10px] tracking-[0.6em] uppercase text-[#D4AF37]/30 font-medium block mb-8">
          Notre philosophie
        </span>
        <div className="relative h-[200px] md:h-[260px] flex items-center justify-center">
          {morphSequence.map((word, i) => (
            <div
              key={word}
              ref={(el) => { if (el) wordsRef.current[i] = el; }}
              className="absolute text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter"
              style={{ color: i === morphSequence.length - 1 ? "#D4AF37" : "#fff", opacity: 0, willChange: "transform, opacity, filter" }}
            >
              {word}
            </div>
          ))}
        </div>
        <p className="text-white/20 text-sm tracking-wider max-w-md mx-auto mt-4">
          Chaque voiture mérite une seconde vie
        </p>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-px bg-white/5">
          <div ref={progressRef} className="h-full bg-[#D4AF37]/50 origin-left scale-x-0" style={{ willChange: "transform" }} />
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
          {morphSequence.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10 transition-all duration-300" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function InfiniteMarquee({ words, speed = 30, className = "" }: { words: string[]; speed?: number; className?: string }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="inline-flex" style={{ animation: `marquee ${speed}s linear infinite` }}>
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <span key={i} className="mx-8 text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-white/[0.03] select-none">{word}</span>
        ))}
      </div>
      <style jsx>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-25%); } }`}</style>
    </div>
  );
}
