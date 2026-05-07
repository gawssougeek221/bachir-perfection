"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Shield, Palette, Sparkles, RefreshCw, CircleDot, Armchair } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Carrosserie premium",
    subtitle: "RESTAURATION",
    description:
      "Réparation et restauration de carrosserie avec une précision artisanale. Chaque surface retravaillée pour retrouver son éclat d'origine, utilisant des techniques d'atelier européennes.",
    icon: Shield,
    image: "/service-1-carrosserie.png",
  },
  {
    title: "Peinture showroom",
    subtitle: "APPLICATION",
    description:
      "Application en cabine contrôlée avec des peintures haute définition. Maîtrise artisanale pour un résultat showroom irréprochable, digne des plus grands constructeurs.",
    icon: Palette,
    image: "/service-2-peinture.png",
  },
  {
    title: "Polish detailing",
    subtitle: "PROTECTION",
    description:
      "Polissage professionnel et protection céramique longue durée. Nous redonnons à chaque surface sa brillance d'origine avec des produits premium et un soin méticuleux.",
    icon: Sparkles,
    image: "/service-3-polish.png",
  },
  {
    title: "Restauration complète",
    subtitle: "TRANSFORMATION",
    description:
      "Transformation totale de A à Z, comme sortie d'usine. Du démontage complet à la livraison avec la plus haute exigence et un suivi détaillé de chaque étape.",
    icon: RefreshCw,
    image: "/service-4-restauration.png",
  },
  {
    title: "Jantes premium",
    subtitle: "PERSONNALISATION",
    description:
      "Remise en état, peinture et personnalisation de jantes. Véritables pièces d'orfèvrerie automobile, chaque jante est traitée comme une œuvre d'art.",
    icon: CircleDot,
    image: "/service-5-jantes.png",
  },
  {
    title: "Cuir intérieur",
    subtitle: "SELLERIE",
    description:
      "Restauration et réfection de sellerie cuir haut de gamme. Nous redonnons vie à votre habitacle avec des matériaux nobles et un savoir-faire artisanal.",
    icon: Armchair,
    image: "/service-6-cuir.png",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header animation
    gsap.from(".services-header-title", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".services-header-title", start: "top 85%" },
    });

    // Cards stagger
    gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
      gsap.from(card, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="pt-28 pb-24 px-6 md:px-12 lg:px-20 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080709 0%, #060606 100%)" }}
      id="services"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 99px, rgba(212,175,55,0.5) 99px, rgba(212,175,55,0.5) 100px)` }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section counter */}
        <div className="flex items-center justify-between mb-12">
          <div className="services-header-title">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#D4AF37]/20" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/60 font-medium">
                05 / 07
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Nos Services
            </h2>
            <p className="text-white/30 mt-3 max-w-md text-sm leading-relaxed">
              Chaque service est exécuté avec la plus haute attention aux détails, dans notre atelier à Dakar.
            </p>
          </div>
          <span className="hidden md:block text-[10px] tracking-[0.2em] text-white/15 font-mono">
            SERVICES
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-card group relative rounded-xl overflow-hidden cursor-pointer"
                style={{
                  background:
                    "linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "border-color 0.5s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080709] via-[#080709]/50 to-transparent" />
                  <div
                    className="absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgba(212,175,55,0.12)",
                      border: "1px solid rgba(212,175,55,0.2)",
                    }}
                  >
                    <Icon className="w-4 h-4 text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors duration-300" />
                  </div>
                  <span className="absolute top-4 left-4 text-[36px] font-light leading-none tracking-tighter select-none text-white/[0.06]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/20 mb-1.5">
                    {service.subtitle}
                  </p>
                  <h3 className="text-xl font-bold tracking-tight uppercase text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/25 text-sm leading-relaxed mt-3 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-3 mt-5">
                    <span className="text-xs tracking-[0.15em] uppercase text-white/20 group-hover:text-[#D4AF37]/60 transition-colors duration-300">
                      En savoir plus
                    </span>
                    <div className="h-px w-6 bg-white/10 group-hover:w-10 group-hover:bg-[#D4AF37]/30 transition-all duration-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
