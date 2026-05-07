"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Shield, Palette, Sparkles, RefreshCw, CircleDot, Armchair } from "lucide-react";
import { CardStack } from "@/components/ui/card-stack";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "Carrosserie", subtitle: "premium", description: "Réparation et restauration de carrosserie avec une précision artisanale. Chaque surface retravaillée pour retrouver son éclat d'origine.", icon: Shield, image: "/service-1-carrosserie.png" },
  { title: "Peinture", subtitle: "showroom", description: "Application en cabine contrôlée avec des peintures haute définition. Résultat showroom irréprochable garanti.", icon: Palette, image: "/service-2-peinture.png" },
  { title: "Polish", subtitle: "detailing", description: "Polissage professionnel et protection céramique longue durée. Nous redonnons à chaque surface sa brillance d'origine.", icon: Sparkles, image: "/service-3-polish.png" },
  { title: "Restauration", subtitle: "complète", description: "Transformation totale de A à Z, comme sortie d'usine. Du démontage à la livraison avec la plus haute exigence.", icon: RefreshCw, image: "/service-4-restauration.png" },
  { title: "Jantes", subtitle: "premium", description: "Remise en état, peinture et personnalisation de jantes. Véritables pièces d'orfèvrerie automobile.", icon: CircleDot, image: "/service-5-jantes.png" },
  { title: "Cuir", subtitle: "intérieur", description: "Restauration et réfection de sellerie cuir haut de gamme. Nous redonnons vie à votre habitacle.", icon: Armchair, image: "/service-6-cuir.png" },
];

function renderCard(item: typeof services[0], index: number, isActive: boolean) {
  const Icon = item.icon;
  return (
    <div
      className="relative w-[320px] md:w-[400px] h-[480px] md:h-[540px] rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border: `1px solid ${isActive ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.06)"}`,
        backdropFilter: "blur(20px)",
        transition: "border-color 0.5s ease",
      }}
    >
      <div className="relative h-[55%] overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700" style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080709] via-[#080709]/50 to-transparent" />
        <div className="absolute top-5 right-5 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500" style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.2)" }}>
          <Icon className="w-5 h-5" style={{ color: isActive ? "#D4AF37" : "rgba(255,255,255,0.6)" }} />
        </div>
        <span className="absolute top-5 left-5 text-[42px] font-light leading-none tracking-tighter select-none" style={{ color: "rgba(255,255,255,0.06)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="p-8 md:p-10 flex flex-col justify-between h-[45%]">
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase mb-2" style={{ color: isActive ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.2)" }}>{item.subtitle}</p>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase" style={{ color: isActive ? "#D4AF37" : "#ffffff" }}>{item.title}</h3>
          <p className="text-white/30 text-sm leading-relaxed mt-3 line-clamp-3">{item.description}</p>
        </div>
        <div className="flex items-center gap-3 group cursor-pointer">
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: isActive ? "#D4AF37" : "rgba(255,255,255,0.3)" }}>En savoir plus</span>
          <div className="h-px transition-all duration-500" style={{ width: isActive ? 40 : 24, background: isActive ? "#D4AF37" : "rgba(255,255,255,0.15)" }} />
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".services-header", { y: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".services-header", start: "top 85%" } });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pt-32 pb-20 md:pb-24 px-6 md:px-12 lg:px-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #080709 0%, #060606 100%)" }} id="services">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 99px, rgba(212,175,55,0.5) 99px, rgba(212,175,55,0.5) 100px)` }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="services-header mb-16 md:mb-24 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#D4AF37]/20" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/60 font-medium">Ce que nous offrons</span>
            <div className="w-12 h-px bg-[#D4AF37]/20" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white">Nos Services</h2>
          <p className="text-white/30 mt-4 max-w-md text-sm leading-relaxed mx-auto">Chaque service est exécuté avec la plus haute attention aux détails, dans notre atelier à Dakar.</p>
        </div>
        <CardStack items={services} renderCard={renderCard} autoplayInterval={3000} loop={true} className="flex justify-center" />
      </div>
    </section>
  );
}
