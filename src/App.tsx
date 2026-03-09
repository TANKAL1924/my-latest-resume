import { useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutSection from "./pages/AboutSection";
import ExperiencesSection from "./pages/ExperiencesSection";
import ReferencesSection from "./pages/ReferencesSection";
import ContactSection from "./pages/ContactSection";
import { getPortfolioProfile } from "./lib/portfolio";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getPortfolioProfile();
  }, []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
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
        <ReferencesSection />
        <div className="section-divider" />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}