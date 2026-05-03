import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/sections/HeroSection";
import ServicesSection from "@/sections/ServicesSection";
import WhyUsSection from "@/sections/WhyUsSection";
import StatsSection from "@/sections/StatsSection";
import PortfolioSection from "@/sections/PortfolioSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import BookingSection from "@/sections/BookingSection";
import CTASection from "@/sections/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <StatsSection />
        <PortfolioSection />
        <TestimonialsSection />
        <BookingSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
