"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    step: "01",
    subtitle: "INSPECTION",
    title: "Diagnostic complet",
    description:
      "Évaluation minutieuse de chaque surface, chaque joint, chaque détail. Notre regard expert ne laisse rien au hasard. Chaque millimètre est inspecté sous haute luminosité.",
    bigNumber: "147",
    unit: "points contrôlés",
  },
  {
    step: "02",
    subtitle: "PRÉPARATION",
    title: "Démontage expert",
    description:
      "Chaque pièce est soigneusement démontée, cataloguée et protégée. Un travail de précision chirurgicale qui prépare le terrain pour une restauration parfaite.",
    bigNumber: "2 400+",
    unit: "pièces manipulées",
  },
  {
    step: "03",
    subtitle: "EXÉCUTION",
    title: "Peinture cabine",
    description:
      "Application en cabine contrôlée avec des peintures haute définition. Chaque couche est posée avec une maîtrise artisanale d'exception. Trois couches de vernis pour l'éternité.",
    bigNumber: "7",
    unit: "couches de perfection",
  },
  {
    step: "04",
    subtitle: "LIVRAISON",
    title: "Finition showroom",
    description:
      "Polissage au diamant, détails et assemblage final. Le résultat : une voiture qui semble tout juste sortir du concessionnaire, voire mieux que neuve.",
    bigNumber: "100%",
    unit: "satisfaction garantie",
  },
];

export default function StoryScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panelsElements = gsap.utils.toArray<HTMLElement>(".story-panel");

    // Horizontal scroll
    const tween = gsap.to(panelsElements, {
      xPercent: -100 * (panelsElements.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.5,
        end: () => "+=" + sectionRef.current!.offsetWidth * 1.2,
        invalidateOnRefresh: true,
      },
    });

    // Per-panel scrub animations
    panelsElements.forEach((panel, i) => {
      // Big number counter scrub
      const counter = panel.querySelector(".panel-counter-num");
      if (counter) {
        const target = parseFloat(counter.textContent?.replace(/[^0-9.]/g, "") || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "left 60%",
            end: "left 20%",
            scrub: 1.5,
            containerAnimation: tween,
          },
          onUpdate: () => {
            if (counter) {
              counter.textContent = Math.round(obj.val).toLocaleString();
            }
          },
        });
      }

      // Step number: scale from 0 to full
      const stepEl = panel.querySelector(".panel-step-big");
      if (stepEl) {
        gsap.fromTo(
          stepEl,
          { scale: 3, opacity: 0, rotation: -10 },
          {
            scale: 1,
            opacity: 0.06,
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "left 80%",
              end: "left 40%",
              scrub: 1,
              containerAnimation: tween,
            },
          }
        );
      }

      // Title: reveal from bottom with blur
      const titleEl = panel.querySelector(".panel-title");
      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { y: 100, opacity: 0, filter: "blur(20px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "left 70%",
              end: "left 35%",
              scrub: 1,
              containerAnimation: tween,
            },
          }
        );
      }

      // Description: fade in from right
      const descEl = panel.querySelector(".panel-desc");
      if (descEl) {
        gsap.fromTo(
          descEl,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "left 60%",
              end: "left 30%",
              scrub: 1.2,
              containerAnimation: tween,
            },
          }
        );
      }

      // Divider line: width expands
      const dividerEl = panel.querySelector(".panel-divider");
      if (dividerEl) {
        gsap.fromTo(
          dividerEl,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "left 65%",
              end: "left 35%",
              scrub: 1,
              containerAnimation: tween,
            },
          }
        );
      }

      // Unit text: slide up
      const unitEl = panel.querySelector(".panel-unit");
      if (unitEl) {
        gsap.fromTo(
          unitEl,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "left 55%",
              end: "left 25%",
              scrub: 1,
              containerAnimation: tween,
            },
          }
        );
      }

      // Progress dots: fill based on scroll position
      const dot = panel.querySelector(".progress-dot-active");
      if (dot) {
        gsap.to(dot, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "left center",
            end: "left center",
            toggleActions: "play none none reverse",
            containerAnimation: tween,
          },
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#050505]">
      {/* Background subtle gradient that shifts */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#080808] to-[#050505]" />
      </div>

      <div className="flex h-full" style={{ width: "400vw" }}>
        {panels.map((panel, index) => (
          <div
            key={index}
            className="story-panel w-screen h-screen flex items-center justify-center shrink-0 relative"
          >
            {/* Background accent glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at ${30 + index * 10}% 50%, rgba(212,175,55,${
                  0.02 + index * 0.008
                }) 0%, transparent 60%)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10 px-8 max-w-3xl">
              {/* Step */}
              <div className="mb-12">
                <span className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/40 font-medium block mb-4">
                  {panel.subtitle}
                </span>
                <span className="panel-step-big text-[180px] md:text-[240px] font-extralight text-white/[0.04] leading-none block tabular-nums">
                  {panel.step}
                </span>
              </div>

              {/* Counter */}
              <div className="mb-8">
                <div className="flex items-baseline gap-3">
                  <span className="panel-counter-num text-5xl md:text-7xl font-bold text-[#D4AF37] tabular-nums tracking-tight">
                    0
                  </span>
                </div>
                <p className="panel-unit text-[11px] tracking-[0.3em] uppercase text-white/20 mt-2">
                  {panel.unit}
                </p>
              </div>

              {/* Divider */}
              <div className="panel-divider w-16 h-px bg-[#D4AF37]/30 origin-left mb-8" />

              {/* Title */}
              <h2 className="panel-title text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6" style={{ willChange: "transform, opacity, filter" }}>
                {panel.title}
              </h2>

              {/* Description */}
              <p className="panel-desc text-sm text-white/25 max-w-lg leading-relaxed" style={{ willChange: "transform, opacity" }}>
                {panel.description}
              </p>
            </div>

            {/* Decorative corner lines */}
            <div className="absolute top-[80px] left-8 w-16 h-px bg-white/[0.03]" />
            <div className="absolute top-[80px] left-8 w-px h-16 bg-white/[0.03]" />
            <div className="absolute bottom-[80px] right-8 w-16 h-px bg-white/[0.03]" />
            <div className="absolute bottom-[80px] right-8 w-px h-16 bg-white/[0.03]" />
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {panels.map((_, i) => (
          <div
            key={i}
            className="h-[2px] rounded-full bg-white/10 overflow-hidden w-6"
          >
            <div
              className="progress-dot-active h-full bg-[#D4AF37]/50 scale-x-0 origin-left"
              style={{ willChange: "transform" }}
            />
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 right-8 md:right-16 z-20 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
        </div>
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">SCROLL</span>
      </div>

      {/* Section counter */}
      <div className="absolute top-[90px] right-8 md:right-16 z-20">
        <span className="text-[10px] tracking-[0.2em] text-white/15 font-mono">02 / 07</span>
      </div>
    </section>
  );
}
