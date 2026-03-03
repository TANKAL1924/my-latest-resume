import AppLogo from "../components/ui/AppLogo";
import { usePortfolioStore } from "../lib/store";

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
      </div>
    </footer>
  );
}