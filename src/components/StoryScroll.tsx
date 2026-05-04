"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    title: "Voiture brute",
    description: "L'état initial — chaque voiture a une histoire",
    bg: "bg-[#F8F8F6]",
    icon: "🔍",
  },
  {
    title: "Démontage",
    description: "Chaque pièce est soigneusement démontée et cataloguée",
    bg: "bg-[#EFEFEF]",
    icon: "🔧",
  },
  {
    title: "Peinture premium",
    description: "Application de peinture haute définition en cabine contrôlée",
    bg: "bg-[#E6E6E6]",
    icon: "🎨",
  },
  {
    title: "Résultat showroom",
    description: "Une finition digne des plus grands ateliers",
    bg: "bg-[#DCDCDC]",
    icon: "✨",
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
      panelsElements.forEach((panel, i) => {
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
      <div className="flex h-full" id="story-scroll-container" style={{ width: "400vw" }}>
        {panels.map((panel, index) => (
          <div
            key={index}
            className={`story-panel ${panel.bg} w-screen h-screen flex items-center justify-center shrink-0`}
          >
            <div className="panel-content text-center px-8 max-w-2xl">
              <span className="text-6xl mb-8 block">{panel.icon}</span>
              <span className="text-sm tracking-[0.3em] uppercase text-[#999] block mb-4">
                Étape {index + 1}
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#111] mb-6">
                {panel.title}
              </h2>
              <p className="text-lg text-[#666] max-w-md mx-auto leading-relaxed">
                {panel.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
