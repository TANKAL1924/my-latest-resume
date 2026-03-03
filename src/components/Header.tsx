"use client";

import { useEffect, useRef, useState } from "react";
import AppLogo from "../components/ui/AppLogo";
import { usePortfolioStore } from "../lib/store";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experiences", href: "#experiences" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const fullname = usePortfolioStore((state) => state.profile?.fullname ?? "");
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      gsap?.fromTo(
        headerRef?.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.1 }
      );
    };
    initGSAP();

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        opacity: 0,
        background: scrolled
          ? "rgba(13,13,13,0.9)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(240,237,232,0.05)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <AppLogo
          text={fullname}
          size={32}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks?.map((link) => (
            <a key={link?.label} href={link?.href} className="nav-link">
              {link?.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "#F0EDE8",
              transform: menuOpen ? "rotate(45deg) translate(3px, 4px)" : "none",
            }}
          />
          <span
            className="block w-4 h-0.5 transition-all duration-300"
            style={{
              background: "#F0EDE8",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "#F0EDE8",
              transform: menuOpen ? "rotate(-45deg) translate(3px, -4px)" : "none",
            }}
          />
        </button>
      </div>
      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: menuOpen ? "320px" : "0",
          background: "rgba(13,13,13,0.98)",
          backdropFilter: "blur(20px)",
          borderTop: menuOpen ? "1px solid rgba(240,237,232,0.05)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
          {navLinks?.map((link) => (
            <a
              key={link?.label}
              href={link?.href}
              className="block text-lg font-medium transition-colors duration-200"
              style={{ color: "#8A8580" }}
              onClick={() => setMenuOpen(false)}
            >
              {link?.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}