import { useEffect, useRef, useState } from "react";
import AppImage from "../components/ui/AppImage";
import { usePortfolioStore } from "../lib/store";
import { getTechnicalSkills } from "../lib/technical";
import type { TechnicalPublic } from "../lib/technical";
import { supabase } from "../lib/supabase";

export default function AboutSection() {
  const profile = usePortfolioStore((state) => state.profile);
  const userId = usePortfolioStore((state) => state.userId);
  const [technicalSkills, setTechnicalSkills] = useState<TechnicalPublic[]>([]);
  const [picUrl, setPicUrl] = useState<string>("");

  useEffect(() => {
    const { data } = supabase.storage
      .from("work_pic")
      .getPublicUrl("izzat.jpg");
    if (data?.publicUrl) setPicUrl(data.publicUrl);
  }, []);
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap?.registerPlugin(ScrollTrigger);

      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" }
          }
        );
      }

      // Left column
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1, x: 0, duration: 1.2, ease: "expo.out",
            scrollTrigger: { trigger: leftRef.current, start: "top 80%" }
          }
        );
      }

      // Right column
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1, x: 0, duration: 1.2, ease: "expo.out",
            scrollTrigger: { trigger: rightRef.current, start: "top 80%" }
          }
        );
      }

      // Skill bars
      const bars = barsRef?.current?.querySelectorAll(".skill-bar-fill");
      if (bars && bars.length > 0) {
        bars.forEach((bar) => {
          const target = bar.getAttribute("data-width") || "0";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: `${target}%`, duration: 1.4, ease: "expo.out",
              scrollTrigger: { trigger: barsRef.current, start: "top 80%" }
            }
          );
        });
      }
    };

    initGSAP();
  }, []);

  useEffect(() => {
    if (!userId) return;
    getTechnicalSkills().then(setTechnicalSkills);
  }, [userId]);

  useEffect(() => {
    if (technicalSkills.length === 0) return;
    const runPillAnimation = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const pills = skillsRef.current?.querySelectorAll('.skill-pill');
      if (pills && pills.length > 0) {
        gsap.fromTo(
          pills,
          { opacity: 0, scale: 0.85, y: 10 },
          {
            opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)', stagger: 0.05,
            scrollTrigger: { trigger: skillsRef.current, start: 'top 80%' }
          }
        );
      }
    };
    runPillAnimation();
  }, [technicalSkills]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 lg:py-40"
      style={{ background: "linear-gradient(to bottom, #0D0D0D, #141414, #0D0D0D)" }}>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <div ref={headingRef} className="flex items-center gap-4 mb-16" style={{ opacity: 0 }}>
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "#F5A623" }}>
            
            01 — About
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(240,237,232,0.06)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text + skills */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <h2 className="section-headline font-display mb-8" style={{ color: "#F0EDE8" }}>
              <span className="text-gradient-amber heading-underline">
                {profile?.main_course ?? "intersection"}
              </span>
            </h2>

            <div className="space-y-5 mb-10" style={{ color: "#8A8580" }}>
              {profile?.work_profile
                ? profile.work_profile.split("\n").filter(Boolean).map((para, i) => (
                    <p key={i} className="text-base leading-relaxed">{para}</p>
                  ))
                : <p className="text-base leading-relaxed" style={{ opacity: 0.4 }}>Loading...</p>
              }
            </div>

            {/* Skills grid */}
            <div ref={skillsRef} className="flex flex-wrap gap-2">
              {technicalSkills.map((item) =>
              <span key={item.id} className="skill-pill" style={{ opacity: 0, display: 'inline-block' }}>
                  {item.skills}
                </span>
              )}
            </div>
          </div>

          {/* Right: Image + skill bars */}
          <div ref={rightRef} className="space-y-8" style={{ opacity: 0 }}>
            {/* Portrait */}
            <div className="relative">
              <div
                className="rounded-3xl overflow-hidden"
                style={{ aspectRatio: "4/3", background: "#1A1A1A" }}>
                
                <AppImage
                  src={picUrl}
                  alt={`${profile?.fullname ?? ""}, profile photo`}
                  className="w-full h-full object-cover" />
                
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                    "linear-gradient(135deg, rgba(245,166,35,0.05) 0%, transparent 60%)"
                  }} />
                
              </div>
              {/* Floating badge */}
              <div
                className="glass-card absolute -bottom-4 -right-4 rounded-2xl px-5 py-3 flex items-center gap-3"
                style={{ border: "1px solid rgba(245,166,35,0.2)" }}>
                
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }} />
                
                <span className="text-sm font-semibold" style={{ color: "#F0EDE8" }}>
                  Available for projects
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>);

}