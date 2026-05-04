"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    title: "Diagnostic complet",
    description:
      "Évaluation minutieuse de chaque surface, chaque joint, chaque détail. Nous identifions tout ce qui nécessite une attention particulière.",
    bg: "#FAFAF8",
    step: "01",
  },
  {
    title: "Démontage expert",
    description:
      "Chaque pièce est soigneusement démontée, cataloguée et protégée. Un travail de précision qui prépare le terrain pour une restauration parfaite.",
    bg: "#F5F3EF",
    step: "02",
  },
  {
    title: "Peinture cabine",
    description:
      "Application en cabine contrôlée avec des peintures haute définition. Chaque couche est posée avec une maîtrise artisanale d'exception.",
    bg: "#F0EDE7",
    step: "03",
  },
  {
    title: "Finition showroom",
    description:
      "Polissage, détails et assemblage final. Le résultat : une voiture qui semble tout juste sortir du concessionnaire, voire mieux.",
    bg: "#EAE7E0",
    step: "04",
  },
];

export default function StoryScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panelsElements = gsap.utils.toArray<HTMLElement>(".story-panel");

      gsap.to(panelsElements, {
        xPercent: -100 * (panelsElements.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + sectionRef.current!.offsetWidth,
          invalidateOnRefresh: true,
        },
      });

      // Animate each panel's content
      panelsElements.forEach((panel) => {
        gsap.from(panel.querySelector(".panel-content"), {
          y: 60,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: panel,
            start: "left 80%",
            end: "left 40%",
            scrub: 1,
            containerAnimation: gsap.getById("story-scroll") || undefined,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <div
        className="flex h-full"
        id="story-scroll-container"
        style={{ width: "400vw" }}
      >
        {panels.map((panel, index) => (
          <div
            key={index}
            className="story-panel w-screen h-screen flex items-center justify-center shrink-0 relative"
            style={{ backgroundColor: panel.bg }}
          >
            {/* Gold accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/40" />

            <div className="panel-content text-center px-8 max-w-2xl">
              {/* Step number */}
              <span className="text-sm tracking-[0.3em] text-[#D4AF37] font-medium block mb-6">
                Étape {panel.step}
              </span>

              {/* Title */}
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#111] mb-6">
                {panel.title}
              </h2>

              {/* Gold divider */}
              <div className="w-12 h-px bg-[#D4AF37] mx-auto mb-6" />

              {/* Description */}
              <p className="text-lg text-[#555] max-w-md mx-auto leading-relaxed">
                {panel.description}
              </p>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-3 mt-10">
                {panels.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      i === index ? "bg-[#D4AF37]" : "bg-[#ccc]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
