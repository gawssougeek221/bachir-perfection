"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import TrustLogos from "@/components/TrustLogos";
import StoryScroll from "@/components/StoryScroll";
import BeforeAfter from "@/components/BeforeAfter";
import Services from "@/components/Services";
import StatsSection from "@/components/StatsSection";
import HorizontalGallery from "@/components/HorizontalGallery";
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
        <TrustLogos />
        <StatsSection />
        <StoryScroll />
        <BeforeAfter />
        <HorizontalGallery />
        <Services />
        <CTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
