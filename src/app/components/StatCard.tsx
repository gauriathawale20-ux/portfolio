import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { FadeIn } from "./FadeIn";

interface StatCardProps {
  value: string;
  label: string;
  sub?: string;
  delay?: number;
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return count;
}

export function StatCard({ value, label, sub, delay = 0 }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const numericMatch = value.match(/^(\d+)/);
  const numeric = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = value.replace(/^\d+/, "");

  const count = useCountUp(numeric, 1400, isInView);

  return (
    <FadeIn delay={delay}>
      <div
        ref={ref}
        className="group border-t border-border pt-8 pb-6 hover:border-accent transition-colors duration-500"
      >
        <div
          className="mb-2 leading-none"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            color: "var(--accent)",
            letterSpacing: "-0.02em",
          }}
        >
          {isInView ? count : 0}{suffix}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            color: "var(--foreground)",
            letterSpacing: "0.04em",
          }}
        >
          {label}
        </div>
        {sub && (
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "0.7rem",
              color: "var(--muted-foreground)",
              marginTop: "4px",
              letterSpacing: "0.06em",
            }}
          >
            {sub}
          </div>
        )}
      </div>
    </FadeIn>
  );
}
