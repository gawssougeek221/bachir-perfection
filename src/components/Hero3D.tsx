"use client";

import { useRef, Suspense } from "react";
import Image from "next/image";
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
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/showroom.jpg"
        alt="Luxury showroom"
        fill
        className="object-cover object-center"
        priority
        quality={90}
        unoptimized
      />

      {/* 3D Car - FULL SCREEN canvas with transparent bg */}
      <div className="absolute inset-0 z-[2]">
        <Canvas
          camera={{ position: [4, 2, 6], fov: 30 }}
          shadows
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 8, 5]} intensity={2.5} castShadow />
          <directionalLight position={[-3, 4, -2]} intensity={0.8} />
          <spotLight
            position={[0, 10, 0]}
            intensity={2}
            angle={0.4}
            penumbra={0.6}
            castShadow
          />
          <Suspense fallback={null}>
            <CarModel />
            <ContactShadows
              position={[0, -0.5, 0]}
              opacity={0.25}
              scale={15}
              blur={2.5}
              far={4}
            />
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 6}
            target={[0, 0.3, 0]}
          />
        </Canvas>
      </div>

      {/* Subtle gradient overlay on left for text readability */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(248,248,246,0.85) 0%, rgba(248,248,246,0.5) 35%, transparent 60%)",
        }}
      />

      {/* Text overlay - LEFT ALIGNED */}
      <div className="absolute inset-0 z-[4] flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 pointer-events-none">
        <div className="max-w-xl md:max-w-2xl pointer-events-auto">
          {/* Top label */}
          <p className="hero-label text-xs md:text-sm tracking-[0.4em] uppercase text-[#D4AF37] font-medium mb-6">
            Luxury Car Renovation
          </p>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5rem] font-bold tracking-tight text-[#111] leading-[1.08]">
            <span className="hero-line-1 block">
              PERFECTION IS
              <br />
              NOT REPAIR.
            </span>
            <span className="hero-line-2 block mt-1 text-[#D4AF37]">
              IT IS REBIRTH.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-sm md:text-base text-[#555] mt-6 max-w-md leading-relaxed">
            Rénovation automobile haut de gamme à Dakar, Sénégal.
          </p>

          {/* CTA Buttons - STACKED */}
          <div className="flex flex-col gap-4 mt-10 w-fit pointer-events-auto">
            <a
              href="#transformations"
              className="hero-btn-1 inline-flex items-center justify-center gap-3 bg-[#D4AF37] text-[#111] px-8 py-4 rounded-[30px] text-sm tracking-wider uppercase font-semibold hover:bg-[#C4A030] transition-all duration-300 shadow-lg shadow-[#D4AF37]/20"
            >
              Voir Nos Transformations
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <a
              href="https://wa.me/221XXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-2 inline-flex items-center justify-center gap-3 bg-white/90 backdrop-blur-sm text-[#333] px-8 py-3.5 rounded-[25px] text-sm tracking-wider uppercase font-medium border border-[#D4AF37]/60 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Devis WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator - BOTTOM LEFT */}
      <div className="hero-scroll absolute bottom-10 left-8 md:left-16 flex flex-col items-center gap-1 z-[5]">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#999]">
          SCROLL
        </span>
        <div className="w-px h-8 bg-[#999]/40 relative overflow-hidden">
          <div className="hero-chevron-line absolute top-0 left-0 w-full h-1/2 bg-[#999]" />
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#999]">
          TO DISCOVER
        </span>
      </div>

      {/* Page indicator - BOTTOM RIGHT */}
      <div className="absolute bottom-10 right-8 md:right-16 z-[5]">
        <span className="text-xs tracking-[0.2em] text-[#999]">
          01 / 05
        </span>
      </div>
    </section>
  );
}
