"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "Deep dive into your product, users, and goals. I map the problem space, audit existing systems, and define success metrics before writing a single line of code.",
    duration: "1–2 weeks",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Design & Prototype",
    description:
      "High-fidelity Figma prototypes with interactive states, motion specs, and design tokens. Every component is designed to be built, not just to look good in a deck.",
    duration: "1–3 weeks",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Engineering & Build",
    description:
      "Component-first development with TypeScript, performance budgets, and accessibility baked in. CI/CD pipelines, automated testing, and zero-downtime deployments.",
    duration: "3–8 weeks",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Launch & Iterate",
    description:
      "Staged rollout with real-user monitoring, Core Web Vitals tracking, and rapid iteration based on data. I stay engaged post-launch to ensure long-term success.",
    duration: "Ongoing",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap?.registerPlugin(ScrollTrigger);

      gsap?.fromTo(
        headingRef?.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: headingRef?.current, start: "top 85%" },
        }
      );

      const stepEls = stepsRef?.current?.querySelectorAll(".process-step-item");
      if (stepEls) {
        gsap?.fromTo(
          stepEls,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: "expo.out", stagger: 0.18,
            scrollTrigger: { trigger: stepsRef?.current, start: "top 80%" },
          }
        );
      }

      // Progress line draw
      const line = sectionRef?.current?.querySelector(".process-line");
      if (line) {
        gsap?.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1, duration: 1.5, ease: "expo.out", transformOrigin: "top",
            scrollTrigger: { trigger: stepsRef?.current, start: "top 80%" },
          }
        );
      }
    };

    initGSAP();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-32 lg:py-40"
      style={{ background: "#141414" }}
    >
      {/* Ambient */}
      <div
        className="ambient-glow"
        style={{
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)",
          top: "20%", right: "5%",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headingRef} style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#F5A623" }}>
              03 — Process
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(240,237,232,0.06)" }} />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <h2 className="section-headline font-display" style={{ color: "#F0EDE8" }}>
              How I work
              <br />
              <span className="text-gradient-amber">with you</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed" style={{ color: "#8A8580" }}>
              A transparent, collaborative process refined over 7 years and 60+ projects. No surprises, just results.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative pl-16 space-y-0">
          {/* Vertical line */}
          <div
            className="process-line absolute left-5 top-6 bottom-6"
            style={{
              width: "1px",
              background: "linear-gradient(to bottom, rgba(245,166,35,0.4), rgba(245,166,35,0.1), transparent)",
            }}
          />

          {steps?.map((step, index) => (
            <div
              key={step?.number}
              className="process-step-item relative flex gap-8 pb-12 last:pb-0"
              style={{ opacity: 0 }}
            >
              {/* Number node */}
              <div
                className="absolute -left-16 flex items-center justify-center w-10 h-10 rounded-full"
                style={{
                  background: index === 0 ? "#F5A623" : "rgba(26,26,26,0.9)",
                  border: `1px solid ${index === 0 ? "#F5A623" : "rgba(245,166,35,0.2)"}`,
                  color: index === 0 ? "#0D0D0D" : "#F5A623",
                  top: "4px",
                }}
              >
                <span className="text-xs font-bold font-display">{step?.number}</span>
              </div>

              {/* Content card */}
              <div
                className="glass-card rounded-2xl p-7 flex-1 hover:border-accent group"
                style={{
                  borderColor: index === 0 ? "rgba(245,166,35,0.25)" : undefined,
                  transition: "all 0.4s ease",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        background: "rgba(245,166,35,0.1)",
                        color: "#F5A623",
                      }}
                    >
                      {step?.icon}
                    </div>
                    <h3
                      className="text-xl font-display font-bold"
                      style={{ color: "#F0EDE8", letterSpacing: "-0.02em" }}
                    >
                      {step?.title}
                    </h3>
                  </div>
                  <span
                    className="text-xs font-semibold shrink-0"
                    style={{
                      color: "#F5A623",
                      background: "rgba(245,166,35,0.1)",
                      border: "1px solid rgba(245,166,35,0.2)",
                      padding: "3px 10px",
                      borderRadius: "100px",
                    }}
                  >
                    {step?.duration}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#8A8580" }}>
                  {step?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}