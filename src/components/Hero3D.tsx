"use client";

import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CarModel from "./CarModel";

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-label", {
        y: -20,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-line-1",
          { x: -40, opacity: 0, duration: 1.0 },
          "-=0.4"
        )
        .from(
          ".hero-line-2",
          { x: -40, opacity: 0, duration: 1.0 },
          "-=0.7"
        )
        .from(
          ".hero-subtitle",
          { y: 20, opacity: 0, duration: 0.8 },
          "-=0.5"
        )
        .from(
          ".hero-btn-1",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.4"
        )
        .from(
          ".hero-btn-2",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.3"
        )
        .from(
          ".hero-scroll",
          { opacity: 0, duration: 0.6 },
          "-=0.2"
        );

      gsap.to(".hero-chevron-line", {
        y: 6,
        duration: 1.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden mx-auto"
      style={{
        backgroundImage: "url('/showroom.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark gradient overlay - heavier on left for text readability, lighter on right for car */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* Subtle bottom gradient for scroll indicator area */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[1]"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
        }}
      />

      {/* 3D Car Canvas - covers full hero, car positioned center-right */}
      <div className="absolute inset-0 z-[2]">
        <Canvas
          camera={{ position: [4, 2, 6], fov: 32 }}
          shadows
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 8, 5]} intensity={3} castShadow />
          <directionalLight position={[-3, 4, -2]} intensity={1.2} />
          <spotLight
            position={[0, 12, 0]}
            intensity={3}
            angle={0.35}
            penumbra={0.6}
            castShadow
          />
          <Suspense fallback={null}>
            <CarModel />
            <ContactShadows
              position={[0, -0.6, 0]}
              opacity={0.15}
              scale={20}
              blur={2.5}
              far={4}
            />
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 6}
            target={[0, 0.4, 0]}
          />
        </Canvas>
      </div>

      {/* Text overlay - LEFT SIDE, vertically centered */}
      <div className="absolute inset-0 z-[4] flex items-center pointer-events-none">
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 pointer-events-auto">
          <div className="max-w-md lg:max-w-lg">
            <p className="hero-label text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#D4AF37] font-medium mb-4 md:mb-6">
              Luxury Car Renovation
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              <span className="hero-line-1 block">
                PERFECTION IS
                <br />
                NOT REPAIR.
              </span>
              <span className="hero-line-2 block mt-1 text-[#D4AF37]">
                IT IS REBIRTH.
              </span>
            </h1>

            <p className="hero-subtitle text-xs md:text-sm text-white/70 mt-4 md:mt-6 max-w-xs leading-relaxed">
              Rénovation automobile haut de gamme à Dakar, Sénégal.
            </p>

            <div className="flex flex-col gap-3 md:gap-4 mt-6 md:mt-8 w-fit pointer-events-auto">
              <a
                href="#transformations"
                className="hero-btn-1 inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#111] px-6 md:px-8 py-3 md:py-4 rounded-[30px] text-[11px] md:text-sm tracking-wider uppercase font-semibold hover:bg-[#C4A030] transition-all duration-300 shadow-lg shadow-[#D4AF37]/20"
              >
                Voir Nos Transformations
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
              <a
                href="https://wa.me/221XXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-2 inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 md:px-8 py-3 md:py-3.5 rounded-[25px] text-[11px] md:text-sm tracking-wider uppercase font-medium border border-white/30 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Devis WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - BOTTOM LEFT */}
      <div className="hero-scroll absolute bottom-10 left-6 md:left-12 lg:left-20 flex flex-col items-center gap-1 z-[5]">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/60">
          SCROLL
        </span>
        <div className="w-px h-8 bg-white/30 relative overflow-hidden">
          <div className="hero-chevron-line absolute top-0 left-0 w-full h-1/2 bg-white/60" />
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/60">
          TO DISCOVER
        </span>
      </div>

      {/* Page indicator - BOTTOM RIGHT */}
      <div className="absolute bottom-10 right-6 md:right-12 lg:right-20 z-[5]">
        <span className="text-xs tracking-[0.2em] text-white/50">01 / 05</span>
      </div>
    </section>
  );
}
