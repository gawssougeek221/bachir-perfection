"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import StoryScroll from "@/components/StoryScroll";
import TrustLogos from "@/components/TrustLogos";
import StatsSection from "@/components/StatsSection";
import HorizontalGallery from "@/components/HorizontalGallery";
import Services from "@/components/Services";
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
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <main
        className={`w-full overflow-x-clip transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />

        {/* ═══ 01 — HERO 3D ═══ */}
        <Hero3D />

        {/* ═══ 02 — NOTRE PROCESSUS (StoryScroll horizontal) ═══ */}
        <StoryScroll />

        {/* ═══ 03 — TRUST LOGOS (WHITE ZONE) ═══ */}
        <TrustLogos />

        {/* ═══ 04 — STATS (WHITE ZONE) ═══ */}
        <StatsSection />

        {/* ═══ 05 — NOS RÉALISATIONS (Horizontal Gallery) ═══ */}
        <HorizontalGallery />

        {/* ═══ 06 — SERVICES ═══ */}
        <Services />

        {/* ═══ 07 — BEFORE / AFTER ═══ */}
        <BeforeAfter />

        {/* ═══ 08 — CTA ═══ */}
        <CTA />

        {/* ═══ FOOTER ═══ */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
