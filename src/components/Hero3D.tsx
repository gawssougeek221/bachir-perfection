"use client";

import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CarModel from "./CarModel";

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#222" wireframe />
    </mesh>
  );
}

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-title", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".hero-subtitle", {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#F8F8F6] overflow-hidden"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 1, 5], fov: 45 }}
          shadows
          dpr={[1, 2]}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 3, 3]} intensity={2} castShadow />
          <directionalLight position={[-2, 2, -1]} intensity={0.5} />
          <Suspense fallback={<LoadingFallback />}>
            <CarModel />
            <ContactShadows
              position={[0, -1.2, 0]}
              opacity={0.4}
              scale={10}
              blur={2.5}
              far={4}
            />
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={2}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 4}
          />
        </Canvas>
      </div>

      {/* Text overlay */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-24 md:pb-32 pointer-events-none">
        <div className="text-center px-6">
          <p className="hero-badge text-xs md:text-sm tracking-[0.3em] uppercase text-[#666] mb-4">
            Dakar · Restauration Premium
          </p>
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-[#111]">
            PERFECTION IS REBIRTH
          </h1>
          <p className="hero-subtitle text-base md:text-lg text-[#666] mt-6 max-w-md mx-auto">
            Luxury automotive restoration in Dakar
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#999] animate-pulse" />
        </div>
      </div>
    </section>
  );
}
