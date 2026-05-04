"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
} from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CarModel from "./CarModel";

function DebugSphere() {
  return (
    <mesh position={[0, 1, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.6} />
    </mesh>
  );
}

// Animated SVG lines in background
function AnimatedGridLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" preserveAspectRatio="none">
      {/* Horizontal lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          y1={`${(i / 20) * 100}%`}
          x2="100%"
          y2={`${(i / 20) * 100}%`}
          stroke="#D4AF37"
          strokeWidth="0.5"
          className="grid-line-h"
        />
      ))}
      {/* Vertical lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={`${(i / 12) * 100}%`}
          y1="0"
          x2={`${(i / 12) * 100}%`}
          y2="100%"
          stroke="#D4AF37"
          strokeWidth="0.5"
          className="grid-line-v"
        />
      ))}
    </svg>
  );
}

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });

  // Mouse parallax tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // RAF loop for smooth mouse parallax
  useEffect(() => {
    let rafId: number;
    const animate = () => {
      currentMouseRef.current.x += (mouseRef.current.x - currentMouseRef.current.x) * 0.04;
      currentMouseRef.current.y += (mouseRef.current.y - currentMouseRef.current.y) * 0.04;

      const mx = currentMouseRef.current.x;
      const my = currentMouseRef.current.y;

      // Parallax layer 1: Background image (slowest)
      const bgLayer = containerRef.current?.querySelector(".parallax-bg");
      if (bgLayer) {
        bgLayer.style.transform = `scale(1.1) translate(${mx * -8}px, ${my * -8}px)`;
      }

      // Parallax layer 2: Canvas (medium)
      const canvasLayer = containerRef.current?.querySelector(".parallax-canvas");
      if (canvasLayer) {
        canvasLayer.style.transform = `translate(${mx * -15}px, ${my * -12}px)`;
      }

      // Parallax layer 3: Text (fastest)
      const textLayer = containerRef.current?.querySelector(".parallax-text");
      if (textLayer) {
        textLayer.style.transform = `translate(${mx * -25}px, ${my * -20}px)`;
      }

      // Parallax layer 4: Decorative elements (varies)
      const decors = containerRef.current?.querySelectorAll(".parallax-decor");
      decors?.forEach((decor, i) => {
        const speed = 1 + i * 0.5;
        (decor as HTMLElement).style.transform = `translate(${mx * -20 * speed}px, ${my * -15 * speed}px)`;
      });

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-label", {
        y: -30,
        opacity: 0,
        duration: 1,
        delay: 2.3,
      })
        .from(
          ".hero-line-1",
          { x: -60, opacity: 0, duration: 1.2 },
          "-=0.6"
        )
        .from(
          ".hero-line-2",
          { x: -60, opacity: 0, duration: 1.2 },
          "-=0.8"
        )
        .from(
          ".hero-subtitle",
          { y: 30, opacity: 0, duration: 1 },
          "-=0.6"
        )
        .from(
          ".hero-btn-1",
          { y: 30, opacity: 0, scale: 0.9, duration: 0.8 },
          "-=0.4"
        )
        .from(
          ".hero-btn-2",
          { y: 30, opacity: 0, scale: 0.9, duration: 0.8 },
          "-=0.5"
        )
        .from(
          ".hero-scroll",
          { opacity: 0, y: 20, duration: 0.8 },
          "-=0.3"
        )
        .from(
          ".hero-decor-1",
          { scale: 0, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" },
          "-=1"
        )
        .from(
          ".hero-decor-2",
          { scale: 0, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" },
          "-=1"
        );

      // Floating animation for decorative elements
      gsap.to(".hero-decor-1", {
        y: -15,
        rotation: 5,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-decor-2", {
        y: 10,
        rotation: -3,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // Grid lines animation
      gsap.fromTo(
        ".grid-line-h",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 2, stagger: 0.05, ease: "power2.out", delay: 2 }
      );
      gsap.fromTo(
        ".grid-line-v",
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 2, stagger: 0.08, ease: "power2.out", delay: 2.2 }
      );

      // Scroll indicator pulse
      gsap.to(".hero-chevron-line", {
        y: 8,
        duration: 1.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Hero parallax on scroll
      gsap.to(".parallax-text", {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
    >
      {/* LAYER 0: Background image with parallax */}
      <div
        className="parallax-bg absolute inset-0 scale-110"
        style={{
          backgroundImage: "url('/showroom.jpg')",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#111111",
          willChange: "transform",
        }}
      />

      {/* Animated grid overlay */}
      <AnimatedGridLines />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* Decorative floating elements */}
      <div className="parallax-decor hero-decor-1 absolute top-[15%] right-[15%] z-[1] pointer-events-none">
        <div className="w-24 h-24 rounded-full border border-[#D4AF37]/10" />
      </div>
      <div className="parallax-decor hero-decor-2 absolute bottom-[25%] right-[25%] z-[1] pointer-events-none">
        <div className="w-16 h-16 rounded-full border border-[#D4AF37]/5 rotate-45" />
      </div>

      {/* Small decorative dots */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="parallax-decor absolute w-1 h-1 rounded-full bg-[#D4AF37]/20 pointer-events-none z-[1]"
          style={{
            top: `${20 + i * 12}%`,
            left: `${60 + (i % 3) * 15}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* LAYER 1: 3D Car Canvas with parallax */}
      <div
        className="parallax-canvas absolute inset-0 z-[2]"
        style={{ willChange: "transform" }}
      >
        <Canvas
          camera={{
            position: [6, 3, 8],
            fov: 35,
            near: 0.1,
            far: 1000,
          }}
          shadows
          dpr={[1, 2]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
          onCreated={() => console.log("Canvas created")}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          <ambientLight intensity={2.5} color="#ffffff" />
          <directionalLight
            position={[8, 10, 5]}
            intensity={4}
            castShadow
            color="#ffffff"
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight
            position={[-5, 5, -3]}
            intensity={2}
            color="#ffffff"
          />
          <pointLight position={[5, 3, 5]} intensity={3} color="#fff5e0" />
          <pointLight position={[-3, 2, 3]} intensity={2} color="#e0f0ff" />
          <spotLight
            position={[0, 15, 0]}
            intensity={5}
            angle={0.4}
            penumbra={0.5}
            castShadow
            color="#ffffff"
          />
          <hemisphereLight
            skyColor="#ffffff"
            groundColor="#444444"
            intensity={1.5}
          />

          <Suspense fallback={<DebugSphere />}>
            <group onAfterRender={() => setModelLoaded(true)}>
              <CarModel />
            </group>
            <ContactShadows
              position={[0, -0.5, 0]}
              opacity={0.25}
              scale={30}
              blur={2}
              far={4}
              color="#000000"
            />
          </Suspense>

          <Preload all />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 6}
            target={[0, 0.5, 0]}
          />
        </Canvas>
      </div>

      {/* LAYER 2: Text overlay with parallax (FASTEST) */}
      <div
        className="parallax-text absolute inset-0 z-[4] flex items-center pointer-events-none"
        style={{ willChange: "transform" }}
      >
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
                className="hero-btn-1 inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#111] px-6 md:px-8 py-3 md:py-4 rounded-[30px] text-[11px] md:text-sm tracking-wider uppercase font-semibold hover:bg-[#C4A030] hover:scale-105 transition-all duration-500 shadow-lg shadow-[#D4AF37]/20"
                data-cursor="pointer"
                data-cursor-text="GO"
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
                className="hero-btn-2 inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 md:px-8 py-3 md:py-3.5 rounded-[25px] text-[11px] md:text-sm tracking-wider uppercase font-medium border border-white/30 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-500"
                data-cursor="pointer"
                data-cursor-text="WA"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Devis WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-6 md:left-12 lg:left-20 flex flex-col items-center gap-1 z-[5]">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
          SCROLL
        </span>
        <div className="w-px h-8 bg-white/20 relative overflow-hidden">
          <div className="hero-chevron-line absolute top-0 left-0 w-full h-1/2 bg-[#D4AF37]/60" />
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
          TO DISCOVER
        </span>
      </div>

      {/* Page indicator */}
      <div className="absolute bottom-10 right-6 md:right-12 lg:right-20 z-[5]">
        <span className="text-xs tracking-[0.2em] text-white/30 font-mono">
          01 / 07
        </span>
      </div>

      {/* Corner accents */}
      <div className="absolute top-[80px] left-6 md:left-12 w-8 h-8 border-l border-t border-white/5 z-[3]" />
      <div className="absolute bottom-[60px] right-6 md:right-12 w-8 h-8 border-r border-b border-white/5 z-[3]" />
    </section>
  );
}
