"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import TrustLogos from "@/components/TrustLogos";
import { ScrubMorphText, InfiniteMarquee } from "@/components/MorphEffects";
import StatsSection from "@/components/StatsSection";
import StoryScroll from "@/components/StoryScroll";
import BeforeAfter from "@/components/BeforeAfter";
import HorizontalGallery from "@/components/HorizontalGallery";
import Services from "@/components/Services";
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
        className={`w-full overflow-x-hidden transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <Hero3D />

        {/* Scrub Morph Text Section */}
        <ScrubMorphText />

        {/* Infinite Marquee */}
        <InfiniteMarquee
          words={["PERFECTION", "BY BACHIR", "DAKAR", "SÉNÉGAL"]}
          speed={25}
          className="py-4 bg-[#050505]"
        />

        <TrustLogos />
        <StatsSection />
        <StoryScroll />

        {/* Another Marquee */}
        <InfiniteMarquee
          words={["REBIRTH", "SHOWROOM", "PREMIUM", "EXPERTISE"]}
          speed={35}
          className="py-4 bg-[#111] rotate-[0.5deg]"
        />

        <BeforeAfter />
        <HorizontalGallery />
        <Services />

        {/* Final Marquee */}
        <InfiniteMarquee
          words={["CONTACTEZ-NOUS", "WHATSAPP", "DEVIS GRATUIT", "DAKAR"]}
          speed={30}
          className="py-4 bg-[#0a0a0a]"
        />

        <CTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
