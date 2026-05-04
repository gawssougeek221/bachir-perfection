"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
  MeshReflectorMaterial,
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

// Reflective showroom floor
function ShowroomFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.52, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={0.8}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#111111"
        metalness={0.8}
        mirror={0.5}
      />
    </mesh>
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
      currentMouseRef.current.x += (mouseRef.current.x - currentMouseRef.current.x) * 0.03;
      currentMouseRef.current.y += (mouseRef.current.y - currentMouseRef.current.y) * 0.03;

      const mx = currentMouseRef.current.x;
      const my = currentMouseRef.current.y;

      // Background (slowest)
      const bgLayer = containerRef.current?.querySelector(".hero-bg");
      if (bgLayer) {
        bgLayer.style.transform = `scale(1.15) translate(${mx * -6}px, ${my * -4}px)`;
      }

      // 3D Canvas (medium)
      const canvasLayer = containerRef.current?.querySelector(".hero-canvas");
      if (canvasLayer) {
        canvasLayer.style.transform = `translate(${mx * -12}px, ${my * -8}px)`;
      }

      // Text (fastest)
      const textLayer = containerRef.current?.querySelector(".hero-text-layer");
      if (textLayer) {
        textLayer.style.transform = `translate(${mx * -20}px, ${my * -15}px)`;
      }

      // Decorative elements
      const decors = containerRef.current?.querySelectorAll(".hero-parallax-decor");
      decors?.forEach((decor, i) => {
        const speed = 1.2 + i * 0.4;
        (decor as HTMLElement).style.transform = `translate(${mx * -18 * speed}px, ${my * -12 * speed}px)`;
      });

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Hero entrance animation sequence (starts after preloader ~2s)
      tl.from(".hero-label", {
        y: -30, opacity: 0, duration: 1, delay: 2.2,
      })
        .from(".hero-line-1", { x: -80, opacity: 0, duration: 1.4 }, "-=0.5")
        .from(".hero-line-2", { x: -80, opacity: 0, duration: 1.4 }, "-=1.0")
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 1 }, "-=0.7")
        .from(".hero-btn-1", { y: 30, opacity: 0, scale: 0.9, duration: 0.8 }, "-=0.5")
        .from(".hero-btn-2", { y: 30, opacity: 0, scale: 0.9, duration: 0.8 }, "-=0.5")
        .from(".hero-scroll-indicator", { opacity: 0, y: 20, duration: 0.8 }, "-=0.3")
        .from(".hero-decor-ring-1", { scale: 0, opacity: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" }, "-=1.2")
        .from(".hero-decor-ring-2", { scale: 0, opacity: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" }, "-=1.2")
        .from(".hero-corner-tl", { scaleX: 0, scaleY: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
        .from(".hero-corner-br", { scaleX: 0, scaleY: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".hero-page-indicator", { opacity: 0, duration: 0.6 }, "-=0.4");

      // Floating ring animations
      gsap.to(".hero-decor-ring-1", {
        y: -12, rotation: 180, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
      gsap.to(".hero-decor-ring-2", {
        y: 8, rotation: -120, duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2,
      });

      // Scroll chevron pulse
      gsap.to(".hero-chevron", {
        y: 8, duration: 1.5, ease: "power1.inOut", yoyo: true, repeat: -1,
      });

      // Text parallax on scroll
      gsap.to(".hero-text-layer", {
        y: -120, opacity: 0, ease: "none",
        scrollTrigger: {
          trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1,
        },
      });

      // Canvas parallax on scroll (slower than text)
      gsap.to(".hero-canvas", {
        y: 60, ease: "none",
        scrollTrigger: {
          trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#0a0a0a]">

      {/* ═══════════════════════════════════════════════ */}
      {/* LAYER 0: SHOWROOM BACKGROUND IMAGE               */}
      {/* ═══════════════════════════════════════════════ */}
      <div
        className="hero-bg absolute inset-0 scale-115"
        style={{
          backgroundImage: "url('/showroom.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundRepeat: "no-repeat",
          willChange: "transform",
        }}
      />

      {/* ═══════════════════════════════════════════════ */}
      {/* LAYER 1: GRADIENT OVERLAY                       */}
      {/* Left dark for text, right lighter for car        */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(105deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.1) 100%)",
      }} />

      {/* Bottom fade for scroll area */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[1]" style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
      }} />

      {/* ═══════════════════════════════════════════════ */}
      {/* LAYER 2: DECORATIVE ELEMENTS                     */}
      {/* ═══════════════════════════════════════════════ */}

      {/* Animated ring 1 */}
      <div className="hero-parallax-decor hero-decor-ring-1 absolute z-[1] pointer-events-none"
        style={{ top: "12%", right: "18%" }}>
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-[#D4AF37]/15" />
        <div className="absolute inset-2 rounded-full border border-[#D4AF37]/8" />
      </div>

      {/* Animated ring 2 */}
      <div className="hero-parallax-decor hero-decor-ring-2 absolute z-[1] pointer-events-none"
        style={{ bottom: "28%", right: "30%" }}>
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#D4AF37]/10 rotate-45" />
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="hero-parallax-decor absolute rounded-full pointer-events-none z-[1]"
          style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            backgroundColor: `rgba(212,175,55,${0.1 + (i % 4) * 0.05})`,
            top: `${15 + (i * 11) % 70}%`,
            left: `${45 + (i * 17) % 45}%`,
            boxShadow: `0 0 ${4 + i}px rgba(212,175,55,0.15)`,
          }}
        />
      ))}

      {/* Corner accents */}
      <div className="hero-corner-tl absolute top-[90px] left-6 md:left-14 w-10 h-10 z-[3] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-[#D4AF37]/30" />
        <div className="absolute top-0 left-0 w-px h-full bg-[#D4AF37]/30" />
      </div>
      <div className="hero-corner-br absolute bottom-[70px] right-6 md:right-14 w-10 h-10 z-[3] pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-px bg-[#D4AF37]/30" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-[#D4AF37]/30" />
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* LAYER 3: 3D CAR CANVAS                           */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="hero-canvas absolute inset-0 z-[2]" style={{ willChange: "transform" }}>
        <Canvas
          camera={{ position: [5, 2.5, 7], fov: 32, near: 0.1, far: 1000 }}
          shadows
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          {/* Premium showroom lighting */}
          <ambientLight intensity={2.0} color="#f5f0e8" />
          <directionalLight
            position={[8, 12, 6]} intensity={4} castShadow color="#ffffff"
            shadow-mapSize-width={2048} shadow-mapSize-height={2048}
          />
          <directionalLight position={[-6, 6, -4]} intensity={2.5} color="#e8e0ff" />
          <spotLight
            position={[0, 18, 2]} intensity={6} angle={0.3} penumbra={0.6}
            castShadow color="#ffffff"
          />
          <spotLight
            position={[6, 8, 0]} intensity={3} angle={0.5} penumbra={0.8}
            color="#fff5e0"
          />
          <pointLight position={[-4, 3, 5]} intensity={2} color="#e0f0ff" />
          <hemisphereLight skyColor="#f5f0e8" groundColor="#222222" intensity={1.8} />

          <Suspense fallback={<DebugSphere />}>
            <group onAfterRender={() => setModelLoaded(true)}>
              <CarModel />
            </group>

            {/* Reflective showroom floor */}
            <ShowroomFloor />

            {/* Subtle shadow */}
            <ContactShadows
              position={[0, -0.52, 0]} opacity={0.4} scale={20} blur={1.5} far={4} color="#000000"
            />
          </Suspense>

          <Preload all />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2.05}
            minPolarAngle={Math.PI / 7}
            target={[0, 0.3, 0]}
          />
        </Canvas>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* LAYER 4: TEXT OVERLAY                           */}
      {/* ═══════════════════════════════════════════════ */}
      <div
        className="hero-text-layer absolute inset-0 z-[4] flex items-center pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 pointer-events-auto">
          <div className="max-w-md lg:max-w-lg">

            {/* Label */}
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-8 h-px bg-[#D4AF37]/60" />
              <p className="hero-label text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#D4AF37] font-medium">
                Luxury Car Renovation
              </p>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              <span className="hero-line-1 block">
                PERFECTION IS
                <br />
                NOT REPAIR.
              </span>
              <span className="hero-line-2 block mt-2 text-[#D4AF37]" style={{
                textShadow: "0 0 40px rgba(212,175,55,0.2)",
              }}>
                IT IS REBIRTH.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-sm md:text-base text-white/50 mt-5 md:mt-7 max-w-sm leading-relaxed font-light">
              Rénovation automobile haut de gamme à Dakar, Sénégal.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 md:mt-10 w-fit pointer-events-auto">
              <a
                href="#transformations"
                className="hero-btn-1 group relative inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] text-[#111] px-7 md:px-9 py-3.5 md:py-4 rounded-full text-[11px] md:text-sm tracking-wider uppercase font-semibold overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                style={{ boxShadow: "0 4px 30px rgba(212,175,55,0.25)" }}
                data-cursor="pointer"
                data-cursor-text="GO"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Voir Nos Transformations
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </a>
              <a
                href="https://wa.me/221XXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-2 inline-flex items-center justify-center gap-2.5 bg-white/[0.07] backdrop-blur-md text-white/80 px-7 md:px-9 py-3.5 md:py-4 rounded-full text-[11px] md:text-sm tracking-wider uppercase font-medium border border-white/[0.12] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-500"
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

      {/* ═══════════════════════════════════════════════ */}
      {/* BOTTOM INDICATORS                               */}
      {/* ═══════════════════════════════════════════════ */}

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-10 left-6 md:left-14 flex flex-col items-center gap-2 z-[5]">
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/30 font-medium">
          SCROLL
        </span>
        <div className="w-px h-10 bg-white/10 relative overflow-hidden">
          <div className="hero-chevron absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </div>
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/30 font-medium">
          TO DISCOVER
        </span>
      </div>

      {/* Page indicator */}
      <div className="hero-page-indicator absolute bottom-10 right-6 md:right-14 z-[5]">
        <span className="text-[11px] tracking-[0.15em] text-white/20 font-mono">
          01 / 07
        </span>
      </div>

      {/* Thin gold line at very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent z-[5]" />
    </section>
  );
}
