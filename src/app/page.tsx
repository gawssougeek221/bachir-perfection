"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import { HeroScrub } from "@/components/ui/hero-scrub";
import { ScrubMorphText } from "@/components/MorphEffects";
import ScrubTransition from "@/components/ui/ScrubTransition";
import ClipPathTransition from "@/components/ui/ClipPathTransition";
import TrustLogos from "@/components/TrustLogos";
import StatsSection from "@/components/StatsSection";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-[9990] pointer-events-none opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  // SAFETY: Force show page after 4 seconds even if preloader fails
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <GrainOverlay />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <main
        className={`w-full overflow-x-clip transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />

        {/* ═══ HERO ═══ */}
        <HeroScrub />

        {/* ═══ NOTRE PHILOSOPHIE ═══ */}
        <ScrubMorphText />

        {/* ═══ WIPE: DARK → LIGHT ═══ */}
        <ScrubTransition direction="dark-to-light" />

        {/* ═══ TRUST + STATS (WHITE ZONE) ═══ */}
        <TrustLogos />
        <StatsSection />

        {/* ═══ CLIP PATH GOLDEN TRANSITION (LIGHT → DARK) ═══ */}
        <ClipPathTransition />

        {/* ═══ SERVICES (DARK ZONE) ═══ */}
        <Services />

        {/* ═══ BEFORE / AFTER (DARK ZONE) ═══ */}
        <BeforeAfter />

        {/* ═══ WIPE: DARK → LIGHT ═══ */}
        <ScrubTransition direction="dark-to-light" />

        {/* ═══ CTA (WHITE ZONE) ═══ */}
        <CTA />

        {/* ═══ FOOTER (CINEMATIC) ═══ */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
