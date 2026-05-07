"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CinematicFooter } from "@/components/ui/motion-footer";

gsap.registerPlugin(ScrollTrigger);

const services = ["Carrosserie", "Peinture", "Polish", "Restauration", "Jantes", "Cuir"];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cta = footerRef.current?.querySelector(".footer-main-cta");
    if (cta) {
      cta.addEventListener("mousemove", (e: Event) => {
        const rect = (cta as HTMLElement).getBoundingClientRect();
        const x = (e as MouseEvent).clientX - rect.left - rect.width / 2;
        const y = (e as MouseEvent).clientY - rect.top - rect.height / 2;
        gsap.to(cta, { x: x * 0.2, y: y * 0.2, duration: 0.4, ease: "power2.out" });
      });
      cta.addEventListener("mouseleave", () => {
        gsap.to(cta, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      });
    }
  }, { scope: footerRef });

  return (
    <CinematicFooter>
      <div ref={footerRef} className="relative overflow-hidden" style={{ background: "#F8F8F6" }}>
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

        <div className="py-24 md:py-36 px-6 text-center relative">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(212,175,55,0.3) 49px, rgba(212,175,55,0.3) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(212,175,55,0.3) 49px, rgba(212,175,55,0.3) 50px)`,
          }} />
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="footer-reveal text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/60 font-medium block mb-8">Prêt à transformer votre véhicule ?</span>
            <h2 className="footer-reveal text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-[#111]">
              Donnons vie à <span className="text-[#D4AF37]">votre vision</span>
            </h2>
            <p className="footer-reveal text-[#999] mt-6 text-sm md:text-base max-w-md mx-auto">
              Chaque voiture a une histoire. Nous l&apos;écrivons avec passion et précision depuis plus de 12 ans à Dakar.
            </p>
            <div className="footer-reveal mt-12">
              <a href="https://wa.me/221XXXXXXXX" target="_blank" rel="noopener noreferrer" className="footer-main-cta inline-flex items-center gap-3 bg-[#D4AF37] text-[#111] px-10 py-5 rounded-full text-sm tracking-wider uppercase font-semibold hover:bg-[#C4A030] transition-colors duration-300 shadow-lg shadow-[#D4AF37]/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Réserver
              </a>
            </div>
          </div>
        </div>

        {/* Diagonal Marquee */}
        <div className="footer-marquee py-6 overflow-hidden" style={{ background: "#080709", transform: "rotate(-1deg) scale(1.05)" }}>
          <div className="footer-marquee-inner flex gap-12 whitespace-nowrap">
            {[...services, ...services, ...services, ...services].map((s, i) => (
              <span key={i} className="text-lg md:text-xl tracking-[0.3em] uppercase font-medium" style={{ color: i % 2 === 0 ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.1)" }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Service Pills */}
        <div className="footer-reveal py-10 px-6">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
            {services.map((s) => (
              <button key={s} className="footer-pill px-5 py-2.5 rounded-full text-xs tracking-[0.15em] uppercase font-medium transition-all duration-500 cursor-pointer" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.12)", color: "#D4AF37" }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#eee] py-8 px-6" style={{ background: "#F8F8F6" }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="footer-reveal flex flex-col items-center md:items-start">
              <span className="text-sm font-bold tracking-[0.15em] text-[#111]">PERFECTION</span>
              <span className="text-[8px] tracking-[0.4em] uppercase text-[#D4AF37]/50 mt-0.5">BY BACHIR</span>
            </div>
            <div className="footer-reveal">
              <span className="text-[10px] tracking-[0.2em] text-[#999]">Crafted with <span className="text-[#D4AF37] inline-block" style={{ animation: "heartbeat 1.5s ease infinite" }}>&#9829;</span> by Bachir</span>
            </div>
            <div className="footer-reveal flex items-center gap-6">
              {["Instagram", "TikTok", "YouTube"].map((social) => (
                <a key={social} href="#" className="text-[10px] tracking-[0.2em] uppercase text-[#999] hover:text-[#D4AF37] transition-colors duration-300">{social}</a>
              ))}
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-6 text-center">
            <p className="text-[10px] text-[#bbb] tracking-wider">&copy; {new Date().getFullYear()} Tous droits réservés</p>
          </div>
        </div>

        <style jsx>{`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            15% { transform: scale(1.3); }
            30% { transform: scale(1); }
            45% { transform: scale(1.2); }
          }
        `}</style>
      </div>
    </CinematicFooter>
  );
}
