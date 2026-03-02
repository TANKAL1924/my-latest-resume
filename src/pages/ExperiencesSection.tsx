"use client";

import { useEffect, useRef, useState } from "react";
import { getExperiences } from "../lib/experiences";
import type {
  ExperiencePublic,
  ExperienceDescriptionItem,
  ExperienceDescriptionProject,
} from "../lib/experiences";
import { usePortfolioStore } from "../lib/store";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric" });
}

function isProjectEntry(
  item: ExperienceDescriptionItem
): item is ExperienceDescriptionProject {
  return "project" in item;
}

function DescriptionBlock({
  description,
}: {
  description: ExperienceDescriptionItem[];
}) {
  return (
    <div className="mt-3 space-y-4">
      {description.map((item, i) => {
        if (isProjectEntry(item)) {
          return (
            <div key={i}>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#F5A623" }}
              >
                {item.project}
              </p>
              <ul className="space-y-1">
                {item.work_list.map((workObj, j) => {
                  const text = Object.values(workObj)[0];
                  return (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                      style={{ color: "#8A8580" }}
                    >
                      <span
                        className="mt-1.5 shrink-0 w-1 h-1 rounded-full"
                        style={{ background: "rgba(245,166,35,0.5)" }}
                      />
                      {text}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }
        return (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed"
            style={{ color: "#8A8580" }}
          >
            <span
              className="mt-1.5 shrink-0 w-1 h-1 rounded-full"
              style={{ background: "rgba(245,166,35,0.5)" }}
            />
            {item.work}
          </li>
        );
      })}
    </div>
  );
}

export default function ExperiencesSection() {
  const userId = usePortfolioStore((state) => state.userId);
  const [experiences, setExperiences] = useState<ExperiencePublic[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId) return;
    getExperiences().then((data) => {
      setExperiences(data);
      setLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    if (loading) return;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap?.registerPlugin(ScrollTrigger);

      gsap?.fromTo(
        headingRef?.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: headingRef?.current, start: "top 85%" },
        }
      );

      const items = listRef?.current?.querySelectorAll(".exp-item");
      if (items) {
        gsap?.fromTo(
          items,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.18,
            scrollTrigger: { trigger: listRef?.current, start: "top 80%" },
          }
        );
      }

      const line = sectionRef?.current?.querySelector(".exp-line");
      if (line) {
        gsap?.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "expo.out",
            transformOrigin: "top",
            scrollTrigger: { trigger: listRef?.current, start: "top 80%" },
          }
        );
      }
    };

    initGSAP();
  }, [loading]);

  return (
    <section
      ref={sectionRef}
      id="experiences"
      className="relative py-32 lg:py-40"
      style={{ background: "#141414" }}
    >
      {/* Ambient glow */}
      <div
        className="ambient-glow"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)",
          top: "20%",
          right: "5%",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headingRef} style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#F5A623" }}
            >
              02 — Experiences
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(240,237,232,0.06)" }}
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <h2
              className="section-headline font-display"
              style={{ color: "#F0EDE8" }}
            >
              Where I've
              <br />
              <span className="text-gradient-amber">worked</span>
            </h2>
            <p
              className="max-w-sm text-sm leading-relaxed"
              style={{ color: "#8A8580" }}
            >
              A track record of delivering impactful work across companies,
              teams, and industries.
            </p>
          </div>
        </div>

        {/* Timeline */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-sm" style={{ color: "#8A8580" }}>
              Loading experiences...
            </span>
          </div>
        ) : experiences.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-sm" style={{ color: "#8A8580" }}>
              No experiences found.
            </span>
          </div>
        ) : (
          <div ref={listRef} className="relative pl-16 space-y-0">
            {/* Vertical line */}
            <div
              className="exp-line absolute left-5 top-6 bottom-6"
              style={{
                width: "1px",
                background:
                  "linear-gradient(to bottom, rgba(245,166,35,0.4), rgba(245,166,35,0.1), transparent)",
              }}
            />

            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="exp-item relative flex gap-8 pb-12 last:pb-0"
                style={{ opacity: 0 }}
              >
                {/* Node */}
                <div
                  className="absolute -left-16 flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    background:
                      index === 0 ? "#F5A623" : "rgba(26,26,26,0.9)",
                    border: `1px solid ${
                      index === 0
                        ? "#F5A623"
                        : "rgba(245,166,35,0.2)"
                    }`,
                    color: index === 0 ? "#0D0D0D" : "#F5A623",
                    top: "4px",
                  }}
                >
                  {/* Briefcase icon */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                </div>

                {/* Card */}
                <div
                  className="glass-card rounded-2xl p-7 flex-1 hover:border-accent group"
                  style={{
                    borderColor:
                      index === 0
                        ? "rgba(245,166,35,0.25)"
                        : undefined,
                    transition: "all 0.4s ease",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                    <div>
                      <h3
                        className="text-xl font-display font-bold"
                        style={{
                          color: "#F0EDE8",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {exp.title_company}
                      </h3>
                      <p
                        className="text-sm font-semibold mt-0.5"
                        style={{ color: "#F5A623" }}
                      >
                        {exp.company_name}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span
                        className="text-xs"
                        style={{ color: "#8A8580" }}
                      >
                        {formatDate(exp.start_date)} —{" "}
                        {formatDate(exp.end_date)}
                      </span>
                    </div>
                  </div>
                  {exp.description && exp.description.length > 0 && (
                    <DescriptionBlock description={exp.description} />
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
