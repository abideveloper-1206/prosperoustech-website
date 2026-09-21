import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhySection from "@/components/WhySection";
import ShowcaseSection from "@/components/ShowcaseSection";
import HowWeHelpSection from "@/components/HowWeHelpSection";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import CapabilitiesMarquee from "@/components/CapabilitiesMarquee";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <WhySection />
      <ShowcaseSection />
      <HowWeHelpSection />
      <FaqSection />
      <CtaBanner />
      <CapabilitiesMarquee />
      <SiteFooter />
    </>
  );
}
