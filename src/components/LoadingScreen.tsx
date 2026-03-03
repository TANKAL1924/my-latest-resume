import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // Phase 1: 0 → 95 over 1.8s (ease-out cubic)
    // Phase 2: 95 → 100 over 2.5s (very slow linear crawl)
    const phase1Duration = 1800;
    const phase2Duration = 2500;

    const tick = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;

      if (elapsed < phase1Duration) {
        // ease-out cubic mapping to 0–95
        const raw = elapsed / phase1Duration;
        const eased = 1 - Math.pow(1 - raw, 3);
        setProgress(Math.floor(eased * 95));
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Phase 2: linear crawl from 95 → 100
        const phase2Elapsed = elapsed - phase1Duration;
        const raw2 = Math.min(phase2Elapsed / phase2Duration, 1);
        // ease-in quad so it feels like it's stuck, then nudges forward
        const eased2 = raw2 * raw2;
        const next = 95 + Math.floor(eased2 * 5);
        setProgress(next);

        if (raw2 < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setProgress(100);
          setTimeout(() => {
            setLeaving(true);
            setTimeout(onComplete, 700);
          }, 400);
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "#0D0D0D",
        transition: leaving ? "opacity 0.7s ease, transform 0.7s ease" : "none",
        opacity: leaving ? 0 : 1,
        transform: leaving ? "translateY(-12px)" : "translateY(0)",
        pointerEvents: leaving ? "none" : "all",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 w-full max-w-xs px-6 flex flex-col items-center gap-10">
        {/* Name / logo */}
        <div className="text-center">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-1"
            style={{ color: "#F5A623" }}
          >
            Portfolio
          </p>
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: "#F0EDE8" }}
          >
            Izzat Hafizuddin
          </h1>
        </div>

        {/* Bar + percentage */}
        <div className="w-full flex flex-col gap-3">
          {/* Track */}
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: "2px", background: "rgba(240,237,232,0.08)" }}
          >
            {/* Fill */}
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #F5A623, #f7c060)",
                borderRadius: "9999px",
                transition: "width 0.05s linear",
                boxShadow: "0 0 8px rgba(245,166,35,0.6)",
              }}
            />
          </div>

          {/* Percentage label */}
          <div className="flex justify-between items-center">
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "#4A4745" }}
            >
              Loading
            </span>
            <span
              className="text-xs font-semibold tabular-nums"
              style={{ color: "#F5A623" }}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
