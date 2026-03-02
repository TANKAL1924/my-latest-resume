"use client";

import { useEffect, useRef } from "react";
import { usePortfolioStore } from "../lib/store";

export default function ContactSection() {
  const profile = usePortfolioStore((state) => state.profile);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
        }
      );
    };

    initGSAP();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 lg:py-40"
      style={{ background: "#141414" }}
    >
      {/* Ambient */}
      <div
        className="ambient-glow"
        style={{
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)",
          bottom: "-10%", left: "50%", transform: "translateX(-50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div ref={contentRef} style={{ opacity: 0 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#F5A623" }}>
              03 — Contact
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(240,237,232,0.06)" }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left */}
            <div>
              <h2 className="section-headline font-display mb-6" style={{ color: "#F0EDE8" }}>
                Let's build
                <br />
                <span className="text-gradient-amber">something great</span>
              </h2>
              <p className="text-base leading-relaxed mb-10" style={{ color: "#8A8580" }}>
                I'm currently available for freelance projects and open to full-time founding-team roles. If you have an interesting challenge, let's talk.
              </p>

              {/* Contact info */}
              <div className="space-y-4">
                {[
                  { label: "Email", value: profile?.email ?? "", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  )},
                  { label: "Location", value: [profile?.district, profile?.country].filter(Boolean).join(", "), icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  )},
                  { label: "Phone", value: profile?.phone ?? "", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  )},
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div
                      className="p-2 rounded-xl flex-shrink-0"
                      style={{ background: "rgba(245,166,35,0.1)", color: "#F5A623" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#4A4745" }}>
                        {item.label}
                      </p>
                      <p className="text-sm font-medium" style={{ color: "#F0EDE8" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}