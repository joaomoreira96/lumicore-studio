import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects";
import { ServicesPreviewSection } from "@/components/home/services-preview";
import { CtaSection } from "@/components/shared/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection />
      <ServicesPreviewSection />
      <CtaSection />
    </>
  );
}
