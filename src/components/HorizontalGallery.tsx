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
    const items = sectionRef.current.querySelectorAll(".gallery-item");

    if (!track || items.length === 0) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + totalScroll,
        invalidateOnRefresh: true,
      },
    });

    // Parallax on each image
    items.forEach((item, i) => {
      const img = item.querySelector(".gallery-img");
      if (img) {
        gsap.fromTo(
          img,
          { xPercent: -15 },
          {
            xPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              containerAnimation: gsap.getById?.("gallery-scroll") || undefined,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      }
    });

    // Scale on scroll
    gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((item) => {
      gsap.fromTo(
        item,
        { scale: 0.85 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "left 80%",
            end: "left 40%",
            scrub: true,
            containerAnimation: gsap.getById?.("gallery-scroll") || undefined,
          },
        }
      );
    });
  }, { scope: sectionRef });

  const images = [
    { title: "Mercedes Classe S", category: "Restauration complète" },
    { title: "BMW Série 5", category: "Peinture showroom" },
    { title: "Range Rover Evoque", category: "Détailing premium" },
    { title: "Porsche Cayenne", category: "Carrosserie premium" },
    { title: "Audi A8", category: "Transformation totale" },
    { title: "Mercedes GLE", category: "Finition cuir" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] overflow-hidden"
    >
      {/* Section label */}
      <div className="absolute top-12 left-8 md:left-20 z-10">
        <span className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/50 font-medium">
          Portfolio
        </span>
        <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight mt-2">
          Nos réalisations
        </h2>
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
            style={{ width: "clamp(320px, 40vw, 600px)" }}
          >
            {/* Image placeholder with gradient */}
            <div
              className="gallery-img w-full rounded-lg overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <div
                className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                style={{
                  background: `linear-gradient(${135 + index * 30}deg, ${
                    [
                      "#1a1a2e, #16213e",
                      "#1b1b2f, #162447",
                      "#1f1f1f, #2d2d44",
                      "#141414, #1e1e30",
                      "#0f0f1a, #1a1a2e",
                      "#111122, #1c1c36",
                    ][index]
                  })`,
                }}
              />
            </div>

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium">
                {img.category}
              </span>
              <h3 className="text-white text-lg font-semibold mt-1">
                {img.title}
              </h3>
            </div>

            {/* Gold corner accent on hover */}
            <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#D4AF37]/0 group-hover:border-[#D4AF37]/60 transition-all duration-500 rounded-tr-sm" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#D4AF37]/0 group-hover:border-[#D4AF37]/60 transition-all duration-500 rounded-bl-sm" />
          </div>
        ))}
      </div>
    </section>
  );
}
