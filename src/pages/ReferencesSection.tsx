import { useEffect, useRef, useState } from "react";
import { getReferences } from "../lib/references";
import type { ReferencePublic } from "../lib/references";
import { usePortfolioStore } from "../lib/store";

export default function ReferencesSection() {
  const userId = usePortfolioStore((state) => state.userId);
  const [references, setReferences] = useState<ReferencePublic[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId) return;
    getReferences().then((data) => {
      setReferences(data);
      setLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    if (loading) return;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      const cards = gridRef.current?.querySelectorAll(".ref-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.15,
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          }
        );
      }
    };

    initGSAP();
  }, [loading]);

  return (
    <section
      ref={sectionRef}
      id="references"
      className="relative py-20 md:py-32 lg:py-40"
      style={{ background: "#141414" }}
    >
      {/* Ambient glow */}
      <div
        className="ambient-glow"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)",
          top: "20%",
          left: "5%",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headingRef} style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#F5A623" }}
            >
              03 — References
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(240,237,232,0.06)" }}
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-16">
            <h2
              className="section-headline font-display"
              style={{ color: "#F0EDE8" }}
            >
              People who
              <br />
              <span className="text-gradient-amber">vouch for me</span>
            </h2>
            <p
              className="max-w-sm text-sm leading-relaxed"
              style={{ color: "#8A8580" }}
            >
              Professionals I've had the privilege of working with who can speak
              to my skills and character.
            </p>
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-sm" style={{ color: "#8A8580" }}>
              Loading references...
            </span>
          </div>
        ) : references.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-sm" style={{ color: "#8A8580" }}>
              No references found.
            </span>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {references.map((ref) => (
              <div
                key={ref.id}
                className="ref-card group relative rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300"
                style={{
                  opacity: 0,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(240,237,232,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border =
                    "1px solid rgba(245,166,35,0.25)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(245,166,35,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border =
                    "1px solid rgba(240,237,232,0.07)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.02)";
                }}
              >
                {/* Quote icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ color: "rgba(245,166,35,0.4)" }}
                >
                  <path
                    d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                    fill="currentColor"
                  />
                  <path
                    d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                    fill="currentColor"
                  />
                </svg>

                {/* Info */}
                <div className="flex-1">
                  <p
                    className="text-base font-semibold mb-1"
                    style={{ color: "#F0EDE8" }}
                  >
                    {ref.name}
                  </p>
                  <p
                    className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: "#F5A623" }}
                  >
                    {ref.position}
                  </p>
                </div>

                {/* Divider */}
                <div
                  className="h-px w-full"
                  style={{ background: "rgba(240,237,232,0.06)" }}
                />

                {/* Contact */}
                <div className="space-y-2">
                  {ref.email && (
                    <a
                      href={`mailto:${ref.email}`}
                      className="flex items-center gap-2.5 text-sm transition-colors duration-200 hover:opacity-100 min-w-0"
                      style={{ color: "#8A8580" }}
                    >
                      {/* Email icon */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0, color: "rgba(245,166,35,0.6)" }}
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span className="truncate">{ref.email}</span>
                    </a>
                  )}
                  {ref.number && (
                    <a
                      href={`tel:${ref.number}`}
                      className="flex items-center gap-2.5 text-sm transition-colors duration-200 hover:opacity-100 min-w-0"
                      style={{ color: "#8A8580" }}
                    >
                      {/* Phone icon */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0, color: "rgba(245,166,35,0.6)" }}
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span className="truncate">{ref.number}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
