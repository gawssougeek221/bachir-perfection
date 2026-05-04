import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import TrustLogos from "@/components/TrustLogos";
import StoryScroll from "@/components/StoryScroll";
import BeforeAfter from "@/components/BeforeAfter";
import Services from "@/components/Services";
import CTA from "@/components/CTA";

export default function Page() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <Hero3D />
      <TrustLogos />
      <StoryScroll />
      <BeforeAfter />
      <Services />
      <CTA />
    </main>
  );
}
