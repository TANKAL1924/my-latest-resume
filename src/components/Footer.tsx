"use client";

import AppLogo from "../components/ui/AppLogo";
import { usePortfolioStore } from "../lib/store";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 6.628 5.374 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12zm7.885 5.44a10.03 10.03 0 0 1 2.089 5.003c-.306-.061-3.37-.684-6.454-.296-.067-.163-.132-.33-.2-.496-.195-.477-.404-.952-.623-1.416 3.396-1.382 4.947-3.373 5.188-3.795zM12 2.027a9.968 9.968 0 0 1 6.725 2.588c-.2.386-1.6 2.244-4.877 3.472-1.524-2.8-3.213-5.098-3.468-5.438A10.09 10.09 0 0 1 12 2.027zm-3.057.624c.245.326 1.908 2.623 3.449 5.363-4.347 1.156-8.19 1.135-8.596 1.127a10.018 10.018 0 0 1 5.147-6.49zM2.007 12.04c0-.138.004-.275.01-.412 0 0 4.29.2 9.162-1.269.257.5.502 1.008.73 1.52-.116.032-.232.068-.347.107C6.93 13.536 4.456 17.33 4.26 17.65A9.965 9.965 0 0 1 2.007 12.04zm9.993 9.934a9.953 9.953 0 0 1-6.083-2.063c.163-.307 2.014-3.898 7.32-5.71.022-.008.044-.015.066-.023a35.73 35.73 0 0 1 1.837 6.524 9.929 9.929 0 0 1-3.14.272zm5.07-1.14a37.4 37.4 0 0 0-1.71-6.136c2.813-.448 5.279.286 5.593.383a10.024 10.024 0 0 1-3.883 5.753z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const fullname = usePortfolioStore((state) => state.profile?.fullname ?? "");

  return (
    <footer
      className="relative py-16 px-6 lg:px-12"
      style={{ borderTop: "1px solid rgba(240,237,232,0.06)", background: "#0D0D0D" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo + copyright */}
        <div className="flex items-center gap-6">
          <AppLogo text={fullname} size={28} />
          <div
            className="hidden md:block w-px h-5"
            style={{ background: "rgba(240,237,232,0.1)" }}
          />
          <p className="text-sm" style={{ color: "#4A4745" }}>
            © 2026 {fullname}. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {["Privacy", "Terms"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm transition-colors duration-200"
              style={{ color: "#4A4745" }}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="transition-colors duration-200"
              style={{ color: "#4A4745" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F5A623")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4A4745")}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}