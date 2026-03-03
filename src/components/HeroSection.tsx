"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

export default function HeroSection() {
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { data } = supabase.storage
      .from("resume")
      .getPublicUrl("Izzat Hafizuddin(Resume).pdf");
    if (data?.publicUrl) setResumeUrl(data.publicUrl);
  }, []);

  useEffect(() => {
    let gsap: typeof import("gsap").gsap;

    const init = async () => {
      const gsapModule = await import("gsap");
      gsap = gsapModule.gsap;

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.2 });

      // Animate badge
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
        );
      }

      // Animate headline words
      const wordInners = headlineRef.current?.querySelectorAll(".hero-word-inner");
      if (wordInners && wordInners.length > 0) {
        tl.to(
          wordInners,
          {
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.08,
          },
          "-=0.4"
        );
      }

      // Animate subtext
      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, ease: "expo.out" },
          "-=0.8"
        );
      }

      // Animate CTA
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" },
          "-=0.6"
        );
      }

      // Animate stats
      const statChildren = statsRef.current ? Array.from(statsRef.current.children) : [];
      if (statChildren.length > 0) {
        tl.fromTo(
          statChildren,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.1 },
          "-=0.4"
        );
      }

      // Animate scroll indicator
      if (scrollRef.current) {
        tl.fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.3"
        );
      }

      // Parallax blobs on mouse
      const hero = heroRef.current;
      if (!hero) return;

      const onMouseMove = (e: MouseEvent) => {
        const rect = hero.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (e.clientX - rect.left - cx) / cx;
        const dy = (e.clientY - rect.top - cy) / cy;

        gsap.to(blob1Ref.current, {
          x: dx * 60,
          y: dy * 40,
          duration: 2,
          ease: "power2.out",
        });
        gsap.to(blob2Ref.current, {
          x: -dx * 40,
          y: -dy * 30,
          duration: 2.5,
          ease: "power2.out",
        });
      };

      hero.addEventListener("mousemove", onMouseMove);
      return () => hero.removeEventListener("mousemove", onMouseMove);
    };

    init();
  }, []);

  const headlineLines = [
    { words: ["Building", "Scalable"] },
    { words: ["Web", "Applications"] },
    { words: ["That", "Perform."] },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "4rem" }}
    >
      {/* Ambient blobs */}
      <div
        ref={blob1Ref}
        className="ambient-glow"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)",
          top: "10%",
          left: "-10%",
        }}
      />
      <div
        ref={blob2Ref}
        className="ambient-glow"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)",
          bottom: "10%",
          right: "-5%",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,237,232,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,232,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 mb-10"
          style={{ opacity: 0 }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#F5A623" }}
          />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#8A8580" }}
          >
            Available for work — 2026
          </span>
          <span className="tag-badge">Open to roles</span>
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="hero-headline font-display mb-8">
          {headlineLines.map((line, li) => (
            <div key={li} className="overflow-hidden">
              {line.words.map((word, wi) => (
                <span key={wi} className="hero-word">
                  <span
                    className={`hero-word-inner ${
                      li === 1 && wi === 0 ? "text-gradient-amber" : ""
                    }`}
                  >
                    {word}
                    {wi < line.words.length - 1 ? "\u00A0" : ""}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Sub */}
        <p
          ref={subRef}
          className="max-w-xl text-lg leading-relaxed mb-10"
          style={{ color: "#8A8580", opacity: 0 }}
        >
          Mid-Level Full Stack Developer specializing in Vite, React, and Node.js. 
          I design and build fast, maintainable applications from frontend interfaces to backend APIs.
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center gap-4 mb-20"
          style={{ opacity: 0 }}
        >
          <a href={resumeUrl} download="Izzat Hafizuddin(Resume).pdf" target="_blank" rel="noreferrer" className="btn-primary">
            Download Resume
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>

      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity: 0 }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "#4A4745" }}
        >
          Scroll
        </span>
        <div
          className="scroll-indicator"
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, rgba(245,166,35,0.5), transparent)",
          }}
        />
      </div>
    </section>
  );
}