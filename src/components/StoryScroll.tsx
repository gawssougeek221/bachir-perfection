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
      "Évaluation minutieuse de chaque surface, chaque joint, chaque détail. Nous identifions tout ce qui nécessite une attention particulière avant de commencer.",
    step: "01",
    subtitle: "Inspection",
  },
  {
    title: "Démontage expert",
    description:
      "Chaque pièce est soigneusement démontée, cataloguée et protégée. Un travail de précision qui prépare le terrain pour une restauration parfaite.",
    step: "02",
    subtitle: "Préparation",
  },
  {
    title: "Peinture cabine",
    description:
      "Application en cabine contrôlée avec des peintures haute définition. Chaque couche est posée avec une maîtrise artisanale d'exception.",
    step: "03",
    subtitle: "Exécution",
  },
  {
    title: "Finition showroom",
    description:
      "Polissage, détails et assemblage final. Le résultat : une voiture qui semble tout juste sortir du concessionnaire, voire mieux.",
    step: "04",
    subtitle: "Livraison",
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
        const content = panel.querySelector(".panel-content");
        if (content) {
          gsap.from(content, {
            y: 80,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            scrollTrigger: {
              trigger: panel,
              start: "left 80%",
              end: "left 40%",
              scrub: 1,
            },
          });
        }

        // Step number reveal
        const step = panel.querySelector(".panel-step");
        if (step) {
          gsap.from(step, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: panel,
              start: "left 75%",
              end: "left 50%",
              scrub: 1,
            },
          });
        }

        // Progress bar fill
        const progress = panel.querySelector(".panel-progress");
        if (progress) {
          gsap.from(progress, {
            scaleX: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "left 70%",
              end: "left 30%",
              scrub: 1,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      <div className="flex h-full" style={{ width: "400vw" }}>
        {panels.map((panel, index) => (
          <div
            key={index}
            className="story-panel w-screen h-screen flex items-center justify-center shrink-0 relative bg-[#0a0a0a]"
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, rgba(212,175,55,${
                  0.03 + index * 0.01
                }) 0%, transparent 70%)`,
              }}
            />

            {/* Vertical decorative lines */}
            <div className="absolute left-[10%] top-0 bottom-0 w-px bg-white/[0.03]" />
            <div className="absolute right-[10%] top-0 bottom-0 w-px bg-white/[0.03]" />

            {/* Content */}
            <div className="panel-content text-center px-8 max-w-2xl relative z-10">
              {/* Step */}
              <div className="panel-step flex flex-col items-center gap-4 mb-8">
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]/50 font-medium">
                  {panel.subtitle}
                </span>
                <span className="text-7xl md:text-8xl font-extralight text-white/[0.06] tabular-nums">
                  {panel.step}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
                {panel.title}
              </h2>

              {/* Gold divider */}
              <div className="panel-progress w-16 h-px bg-[#D4AF37]/40 mx-auto mb-6 origin-left" />

              {/* Description */}
              <p className="text-sm text-white/30 max-w-md mx-auto leading-relaxed">
                {panel.description}
              </p>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-3 mt-12">
                {panels.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === index
                        ? "w-8 bg-[#D4AF37]"
                        : i < index
                        ? "w-4 bg-[#D4AF37]/30"
                        : "w-1 bg-white/10"
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
