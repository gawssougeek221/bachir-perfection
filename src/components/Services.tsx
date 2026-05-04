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
    description:
      "Réparation et restauration de carrosserie avec une précision artisanale. Chaque surface retravaillée pour retrouver son éclat d'origine, avec des techniques de pointe et un savoir-faire hérité des meilleurs ateliers européens.",
    icon: Shield,
    number: "01",
    image: "/service-1-carrosserie.png",
  },
  {
    title: "Peinture showroom",
    description:
      "Application en cabine contrôlée avec des peintures haute définition. Chaque couche est posée avec une maîtrise artisanale d'exception, garantissant un résultat showroom irréprochable.",
    icon: Palette,
    number: "02",
    image: "/service-2-peinture.png",
  },
  {
    title: "Polish detailing",
    description:
      "Polissage professionnel et protection céramique longue durée. Nous redonnons à chaque surface sa brillance d'origine avec des produits premium et un soin méticuleux.",
    icon: Sparkles,
    number: "03",
    image: "/service-3-polish.png",
  },
  {
    title: "Restauration complète",
    description:
      "Transformation totale de A à Z, comme sortie d'usine. Du démontage à la livraison, chaque étape est exécutée avec la plus haute exigence de qualité.",
    icon: RefreshCw,
    number: "04",
    image: "/service-4-restauration.png",
  },
  {
    title: "Jantes premium",
    description:
      "Remise en état, peinture et personnalisation de jantes. Nous transformons vos jantes en véritables pièces d'orfèvrerie automobile avec des finitions uniques.",
    icon: CircleDot,
    number: "05",
    image: "/service-5-jantes.png",
  },
  {
    title: "Intérieur cuir",
    description:
      "Restauration et réfection de sellerie cuir haut de gamme. Du nettoyage profond à la retouche couleur, nous redonnons vie à votre habitacle avec des matériaux premium.",
    icon: Armchair,
    number: "06",
    image: "/service-6-cuir.png",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal section header
    gsap.from(".services-header", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services-header",
        start: "top 85%",
      },
    });

    // Reveal each card
    gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
      gsap.from(card, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Gold line reveal
      const line = card.querySelector(".service-gold-line");
      if (line) {
        gsap.from(line, {
          scaleX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 md:px-12 lg:px-20 bg-[#111] relative overflow-hidden"
      id="services"
    >
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 99px,
            rgba(212,175,55,0.5) 99px,
            rgba(212,175,55,0.5) 100px
          )`,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="services-header mb-20 md:mb-28">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/60 font-medium">
              Ce que nous offrons
            </span>
            <div className="w-12 h-px bg-[#D4AF37]/20" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
            Nos Services
          </h2>
          <p className="text-white/30 mt-4 max-w-md text-sm leading-relaxed">
            Chaque service est exécuté avec la plus haute attention aux détails,
            dans notre atelier à Dakar.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-card group relative border border-white/5 rounded-2xl hover:border-[#D4AF37]/20 transition-all duration-700 bg-white/[0.02] hover:bg-white/[0.04] overflow-hidden"
                data-cursor="pointer"
                data-cursor-text={service.number}
              >
                {/* Card Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent" />
                  {/* Number overlay */}
                  <span className="absolute top-4 right-5 text-[48px] font-light leading-none text-white/10 group-hover:text-[#D4AF37]/20 transition-colors duration-700 select-none">
                    {service.number}
                  </span>
                </div>

                <div className="p-8 md:p-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-all duration-500 group-hover:scale-110">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-500">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/30 text-sm leading-relaxed group-hover:text-white/50 transition-colors duration-500">
                    {service.description}
                  </p>
                </div>

                {/* Gold bottom line */}
                <div className="service-gold-line absolute bottom-0 left-8 right-8 h-px bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/40 origin-left transition-colors duration-700" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
