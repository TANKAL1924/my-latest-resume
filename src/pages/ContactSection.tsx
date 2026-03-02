"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend/email service
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
              05 — Contact
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
                  { label: "Email", value: "hello@marcuschen.dev", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  )},
                  { label: "Location", value: "San Francisco, CA (Remote OK)", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  )},
                  { label: "Response time", value: "Within 24 hours", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
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

            {/* Right: Form */}
            <div>
              {submitted ? (
                <div
                  className="glass-card rounded-3xl p-10 flex flex-col items-center justify-center text-center"
                  style={{ minHeight: "400px" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.3)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3" style={{ color: "#F0EDE8" }}>
                    Message sent!
                  </h3>
                  <p className="text-sm" style={{ color: "#8A8580" }}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="glass-card rounded-3xl p-8 space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { name: "name", label: "Your name", type: "text", placeholder: "Marcus Chen" },
                      { name: "email", label: "Email address", type: "email", placeholder: "hello@company.com" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="block text-xs font-semibold uppercase tracking-wider mb-2"
                          style={{ color: "#4A4745" }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formState[field.name as keyof typeof formState]}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300"
                          style={{
                            background: "rgba(240,237,232,0.04)",
                            border: "1px solid rgba(240,237,232,0.08)",
                            color: "#F0EDE8",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "rgba(245,166,35,0.3)";
                            e.target.style.background = "rgba(240,237,232,0.06)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(240,237,232,0.08)";
                            e.target.style.background = "rgba(240,237,232,0.04)";
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "#4A4745" }}
                    >
                      Project budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 appearance-none"
                      style={{
                        background: "rgba(240,237,232,0.04)",
                        border: "1px solid rgba(240,237,232,0.08)",
                        color: formState.budget ? "#F0EDE8" : "#4A4745",
                      }}
                    >
                      <option value="">Select budget range</option>
                      <option value="5k-15k">$5K – $15K</option>
                      <option value="15k-50k">$15K – $50K</option>
                      <option value="50k-100k">$50K – $100K</option>
                      <option value="100k+">$100K+</option>
                      <option value="fulltime">Full-time role</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "#4A4745" }}
                    >
                      Tell me about your project
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="What are you building? What's the timeline? What does success look like?"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 resize-none"
                      style={{
                        background: "rgba(240,237,232,0.04)",
                        border: "1px solid rgba(240,237,232,0.08)",
                        color: "#F0EDE8",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(245,166,35,0.3)";
                        e.target.style.background = "rgba(240,237,232,0.06)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(240,237,232,0.08)";
                        e.target.style.background = "rgba(240,237,232,0.04)";
                      }}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    Send message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13" /><path d="M22 2L15 22 11 13 2 9l20-7z" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}