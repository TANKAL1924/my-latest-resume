import { useEffect } from "react";
import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutSection from "./pages/AboutSection";
import ExperiencesSection from "./pages/ExperiencesSection";
import ContactSection from "./pages/ContactSection";
import { getPortfolioProfile } from "./lib/portfolio";

export default function App() {
  useEffect(() => {
    getPortfolioProfile();
  }, []);

  return (
    <>
      {/* Noise texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor (client) */}
      <CustomCursor />

      {/* Navigation */}
      <Header />

      {/* Main content */}
      <main>
        <HeroSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <ExperiencesSection />
        <div className="section-divider" />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}