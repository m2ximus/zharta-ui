import { TopNav } from "@/components/layout/top-nav";
import { HeroSection } from "@/components/marketing/hero-section";
import { StatsBar } from "@/components/marketing/stats-bar";
import { TrustedBy } from "@/components/marketing/trusted-by";
import { AuditedBy } from "@/components/marketing/audited-by";
import { WhyZharta } from "@/components/marketing/why-zharta";
import { FeaturesSection } from "@/components/marketing/features-section";
import { ParameterCustomization } from "@/components/marketing/parameter-customization";
import { ValueAnimation } from "@/components/marketing/value-animation";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { Footer } from "@/components/marketing/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-dark-bg)]">
      <TopNav />
      <HeroSection />
      <StatsBar />
      <TrustedBy />
      <AuditedBy />
      <WhyZharta />
      <FeaturesSection />
      <ParameterCustomization />
      <ValueAnimation />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
