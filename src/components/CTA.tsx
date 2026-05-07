"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/ui/SplitText";
import Magnetic from "@/components/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(".cta-decor", { y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" } });
    gsap.from(".cta-location", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".cta-location", start: "top 90%" } });
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-44 px-6 relative overflow-hidden" style={{ background: "#F8F8F6" }}>
      <div className="absolute top-12 left-1/4 w-px h-24 bg-gradient-to-b from-transparent via-[#D4AF37]/15 to-transparent hidden md:block cta-decor" />
      <div className="absolute top-20 right-1/3 w-px h-16 bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent hidden md:block cta-decor" />
      <div className="absolute bottom-24 left-1/3 w-px h-16 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent hidden md:block cta-decor" />

      <div className="max-w-2xl mx-auto text-center relative">
        <div className="cta-decor flex items-center justify-center gap-3 mb-12">
          <div className="w-8 h-px bg-[#D4AF37]/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <div className="w-8 h-px bg-[#D4AF37]/30" />
        </div>

        <SplitText as="h2" className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-[#111] mb-6" splitBy="words" stagger={0.08} duration={0.9} y={50}>
          Votre voiture mérite le meilleur
        </SplitText>

        <p className="cta-decor text-[#999] mt-6 text-sm max-w-md mx-auto leading-relaxed">
          Contactez-nous pour une transformation premium. Devis gratuit sous 24h, directement sur WhatsApp.
        </p>

        <div className="cta-decor mt-12">
          <Magnetic strength={0.3}>
            <a href="https://wa.me/221XXXXXXXX" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-[#D4AF37] text-[#111] rounded-full hover:bg-[#C4A030] transition-colors duration-300 text-sm tracking-wider uppercase font-semibold shadow-lg shadow-[#D4AF37]/15">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Nous contacter
            </a>
          </Magnetic>
        </div>

        <div className="cta-location mt-20 flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-[#D4AF37]/20" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#bbb]">Dakar, Sénégal</span>
          <div className="w-12 h-px bg-[#D4AF37]/20" />
        </div>
      </div>
    </section>
  );
}
