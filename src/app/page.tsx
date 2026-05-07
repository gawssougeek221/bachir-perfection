"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
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

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  return (
    <SmoothScroll>
      <CustomCursor />
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
