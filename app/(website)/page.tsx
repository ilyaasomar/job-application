import { CategoriesSection } from "@/components/categories-section";
import { CTASection } from "@/components/cta-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { StatsSection } from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import React from "react";

const page = () => {
  return (
    <div className="w-full ">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CategoriesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default page;
