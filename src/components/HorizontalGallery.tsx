"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const track = sectionRef.current.querySelector(".gallery-track") as HTMLElement;
    if (!track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.5,
        end: () => "+=" + totalScroll,
        invalidateOnRefresh: true,
      },
    });

    // Per-item scrub effects
    sectionRef.current.querySelectorAll<HTMLElement>(".gallery-item").forEach((item, i) => {
      // Scale from 0.7 to 1.05 to 1 based on viewport position
      gsap.fromTo(
        item,
        { scale: 0.7, opacity: 0.3, rotation: i % 2 === 0 ? -3 : 3 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "left 90%",
            end: "left 30%",
            scrub: 1,
            containerAnimation: tween,
          },
        }
      );

      // Image parallax inside card
      const img = item.querySelector(".gallery-img-inner");
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -15, scale: 1.2 },
          {
            yPercent: 15,
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "left right",
              end: "right left",
              scrub: true,
              containerAnimation: tween,
            },
          }
        );
      }

      // Info overlay slide
      const info = item.querySelector(".gallery-info");
      if (info) {
        gsap.fromTo(
          info,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "left 60%",
              end: "left 30%",
              scrub: 1,
              containerAnimation: tween,
            },
          }
        );
      }

      // Corner accent draw
      const corner = item.querySelector(".gallery-corner");
      if (corner) {
        gsap.fromTo(
          corner,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "left 50%",
              end: "left 30%",
              scrub: 1,
              containerAnimation: tween,
            },
          }
        );
      }
    });
  }, { scope: sectionRef });

  const images = [
    { title: "Mercedes Classe S", category: "Restauration complète", year: "2024" },
    { title: "BMW Série 5", category: "Peinture showroom", year: "2024" },
    { title: "Range Rover Evoque", category: "Détailing premium", year: "2023" },
    { title: "Porsche Cayenne", category: "Carrosserie premium", year: "2024" },
    { title: "Audi A8", category: "Transformation totale", year: "2023" },
    { title: "Mercedes GLE", category: "Finition cuir + peinture", year: "2024" },
  ];

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Section label */}
      <div className="absolute top-[90px] left-8 md:left-20 z-10">
        <span className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/30 font-medium">
          Portfolio
        </span>
        <h2 className="text-white/80 text-2xl md:text-3xl font-semibold tracking-tight mt-2">
          Nos réalisations
        </h2>
      </div>

      {/* Section counter */}
      <div className="absolute top-[90px] right-8 md:right-16 z-10">
        <span className="text-[10px] tracking-[0.2em] text-white/15 font-mono">04 / 07</span>
      </div>

      {/* Gallery track */}
      <div
        className="gallery-track flex items-center h-screen gap-8 pl-8 md:pl-20 pr-[20vw]"
        style={{ width: "fit-content" }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="gallery-item relative shrink-0 cursor-pointer group"
            style={{
              width: "clamp(320px, 40vw, 600px)",
              transform: `rotate(${index % 2 === 0 ? -3 : 3}deg)`,
              willChange: "transform, opacity",
            }}
            data-cursor="pointer"
            data-cursor-text={String(index + 1).padStart(2, "0")}
          >
            {/* Card */}
            <div
              className="w-full rounded-xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "4/5" }}
            >
              <div
                className="gallery-img-inner w-full h-full transition-transform duration-700 group-hover:scale-110"
                style={{
                  background: `linear-gradient(${135 + index * 30}deg, ${
                    [
                      "#1a1a2e, #16213e, #0f3460",
                      "#1b1b2f, #162447, #1f4068",
                      "#1f1f1f, #2d2d44, #1a1a30",
                      "#141414, #1e1e30, #0a1628",
                      "#0f0f1a, #1a1a2e, #162447",
                      "#111122, #1c1c36, #141428",
                    ][index]
                  })`,
                }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>

            {/* Info overlay */}
            <div className="gallery-info absolute bottom-0 left-0 right-0 p-6 z-10" style={{ willChange: "transform, opacity" }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium">
                  {img.category}
                </span>
                <span className="text-[9px] text-white/20">{img.year}</span>
              </div>
              <h3 className="text-white text-xl font-semibold tracking-tight">
                {img.title}
              </h3>
              <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-4 h-px bg-[#D4AF37]/50" />
                <span className="text-[9px] tracking-[0.2em] uppercase text-white/30">Voir le projet</span>
              </div>
            </div>

            {/* Corner accent */}
            <div className="gallery-corner absolute top-4 right-4 w-5 h-5 pointer-events-none z-10" style={{ willChange: "transform, opacity" }}>
              <div className="absolute top-0 right-0 w-full h-px bg-[#D4AF37]/40" />
              <div className="absolute top-0 right-0 w-px h-full bg-[#D4AF37]/40" />
            </div>

            {/* Item number */}
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[10px] font-mono text-white/10">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        <div className="w-8 h-px bg-white/10" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/15">SCROLL HORIZONTAL</span>
        <div className="w-8 h-px bg-white/10" />
      </div>
    </section>
  );
}
