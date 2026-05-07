"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import LiquidProgress from "@/components/ui/LiquidProgress";
import { HeroScrub } from "@/components/ui/hero-scrub";
import { ScrubMorphText } from "@/components/MorphEffects";
import ScrubTransition from "@/components/ui/ScrubTransition";
import TrustLogos from "@/components/TrustLogos";
import StatsSection from "@/components/StatsSection";
import ClipPathTransition from "@/components/ui/ClipPathTransition";
import Services from "@/components/Services";
import SenegalDivider from "@/components/SenegalDivider";
import BeforeAfter from "@/components/BeforeAfter";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  // SAFETY: Force show page after 4 seconds even if preloader fails
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <GrainOverlay />
      <LiquidProgress />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <main
        className={`w-full overflow-x-clip transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />

        {/* ══════════════════════════════════════════════════════
            SECTION 01 — HERO SCRUB (86 frames, 300vh, DARK #080709)
            ══════════════════════════════════════════════════════ */}
        <HeroScrub />

        {/* ══════════════════════════════════════════════════════
            SECTION 02 — SCRUB MORPH TEXT (REPAIR→RESTORE→TRANSFORM→REBIRTH)
            ══════════════════════════════════════════════════════ */}
        <ScrubMorphText />

        {/* ══════════════════════════════════════════════════════
            TRANSITION — WIPE DARK → WHITE (35vh gold glow)
            ══════════════════════════════════════════════════════ */}
        <ScrubTransition direction="dark-to-light" />

        {/* ══════════════════════════════════════════════════════
            SECTION 03 — TRUST LOGOS (LIGHT #F8F8F6)
            ══════════════════════════════════════════════════════ */}
        <TrustLogos />

        {/* ══════════════════════════════════════════════════════
            SECTION 04 — STATS (LIGHT #F8F8F6)
            ══════════════════════════════════════════════════════ */}
        <StatsSection />

        {/* ══════════════════════════════════════════════════════
            TRANSITION — WIPE WHITE → DARK (35vh gold glow)
            ══════════════════════════════════════════════════════ */}
        <ScrubTransition direction="light-to-dark" />

        {/* ══════════════════════════════════════════════════════
            TRANSITION — CLIP PATH GOLD CIRCLE (35vh)
            ══════════════════════════════════════════════════════ */}
        <ClipPathTransition />

        {/* ══════════════════════════════════════════════════════
            SECTION 05 — SERVICES (DARK #080709)
            ══════════════════════════════════════════════════════ */}
        <Services />

        {/* ══════════════════════════════════════════════════════
            SECTION 06 — SENEGAL DIVIDER (DARK)
            ══════════════════════════════════════════════════════ */}
        <SenegalDivider variant="diamonds" color="#D4AF37" count={7} />

        {/* ══════════════════════════════════════════════════════
            SECTION 07 — BEFORE / AFTER with VIDEO (DARK #080709)
            ══════════════════════════════════════════════════════ */}
        <BeforeAfter />

        {/* ══════════════════════════════════════════════════════
            TRANSITION — WIPE DARK → WHITE (35vh gold glow)
            ══════════════════════════════════════════════════════ */}
        <ScrubTransition direction="dark-to-light" />

        {/* ══════════════════════════════════════════════════════
            SECTION 08 — CTA (LIGHT #F8F8F6)
            SplitText animation + Magnetic button
            ══════════════════════════════════════════════════════ */}
        <CTA />

        {/* ══════════════════════════════════════════════════════
            FOOTER — Cinematic Footer (Curtain reveal + BACHIR + Marquee)
            ══════════════════════════════════════════════════════ */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
