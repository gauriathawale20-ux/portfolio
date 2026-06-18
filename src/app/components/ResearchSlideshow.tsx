import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScreenPlaceholder } from "./ScreenPlaceholder";

const serif = "'Instrument Serif', serif";
const sans = "'Inter', sans-serif";
const mono = "'Geist Mono', monospace";

const SLIDE_DURATION = 5000;

const slides = [
  {
    phase: "Discovery",
    number: "01",
    title: "Session recordings + interviews",
    detail:
      "Watched 40 recorded sessions. The pattern was consistent: users opened the AI tab, stared at the box for 5–15 seconds, typed something vague, got a generic response, and closed it.",
    imageLabel: "Session recording / heatmap",
  },
  {
    phase: "Analysis",
    number: "02",
    title: "Drop-off mapping across 6 weeks",
    detail:
      "Mapped every interaction that preceded an AI session close. 68% were within 30 seconds of the first interaction. The bottleneck wasn't quality of output — it was activation energy to start.",
    imageLabel: "Drop-off funnel / analytics screen",
  },
  {
    phase: "Hypothesis",
    number: "03",
    title: "The blank box is a wall, not a door",
    detail:
      "Prompted inputs perform dramatically better than blank-slate ones. The fix wasn't better AI — it was a better starting shape for the conversation.",
    imageLabel: "Whiteboard / hypothesis diagram",
  },
];

interface ResearchSlideshowProps {
  onComplete?: () => void;
}

export function ResearchSlideshow({ onComplete }: ResearchSlideshowProps) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const activeRef = useRef(0);
  const completedRef = useRef(false);
  const startTimeRef = useRef(0);
  const elapsedRef = useRef(0);
  const rafRef = useRef(0);

  const goTo = (i: number) => {
    cancelAnimationFrame(rafRef.current);
    elapsedRef.current = 0;
    setActive(i);
    activeRef.current = i;
    setProgress(0);
  };

  const runTick = useCallback(() => {
    const tick = (now: number) => {
      if (pausedRef.current) return;
      const elapsed = now - startTimeRef.current + elapsedRef.current;
      const pct = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(pct);

      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        const nextIdx = activeRef.current + 1;
        if (nextIdx < slides.length) {
          elapsedRef.current = 0;
          activeRef.current = nextIdx;
          setActive(nextIdx);
          setProgress(0);
          startTimeRef.current = performance.now();
          rafRef.current = requestAnimationFrame(tick);
        } else if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
      }
    };
    startTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [onComplete]);

  useEffect(() => {
    pausedRef.current = false;
    elapsedRef.current = 0;
    cancelAnimationFrame(rafRef.current);
    runTick();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePause = () => {
    if (paused) {
      pausedRef.current = false;
      setPaused(false);
      startTimeRef.current = performance.now();
      runTick();
    } else {
      pausedRef.current = true;
      setPaused(true);
      elapsedRef.current += performance.now() - startTimeRef.current;
      cancelAnimationFrame(rafRef.current);
    }
  };

  const secondsLeft = Math.ceil((1 - progress) * SLIDE_DURATION / 1000);

  return (
    <div
      className="grid md:grid-cols-2 gap-0"
      style={{ minHeight: "480px" }}
      onMouseEnter={() => { if (!paused) { pausedRef.current = true; setPaused(true); elapsedRef.current += performance.now() - startTimeRef.current; cancelAnimationFrame(rafRef.current); } }}
      onMouseLeave={() => { if (paused) return; pausedRef.current = false; startTimeRef.current = performance.now(); runTick(); }}
    >
      {/* Left: text items */}
      <div className="flex flex-col border-r border-border">
        {slides.map((slide, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => { cancelAnimationFrame(rafRef.current); elapsedRef.current = 0; activeRef.current = i; setActive(i); setProgress(0); startTimeRef.current = performance.now(); runTick(); }}
              className="text-left relative overflow-hidden flex-1 transition-colors duration-300"
              style={{
                background: isActive ? "rgba(201,185,122,0.04)" : "transparent",
                borderBottom: i < slides.length - 1 ? "1px solid var(--border)" : "none",
                padding: "32px 40px",
                cursor: "pointer",
              }}
            >
              {/* Left accent bar — fills with time */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background: "var(--border)" }} />
              {isActive && (
                <div
                  className="absolute left-0 top-0 w-[2px] transition-none"
                  style={{ height: `${progress * 100}%`, background: "var(--accent)" }}
                />
              )}

              <div className="flex items-start gap-6">
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    color: isActive ? "var(--accent)" : "var(--muted-foreground)",
                    paddingTop: "3px",
                    minWidth: "20px",
                    transition: "color 0.3s",
                  }}
                >
                  {slide.number}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: "0.6rem",
                      letterSpacing: "0.14em",
                      color: isActive ? "var(--accent)" : "var(--muted-foreground)",
                      marginBottom: "8px",
                      transition: "color 0.3s",
                    }}
                  >
                    {slide.phase.toUpperCase()}
                  </div>
                  <h3
                    style={{
                      fontFamily: serif,
                      fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                      marginBottom: isActive ? "12px" : "0",
                      lineHeight: 1.3,
                      transition: "color 0.3s",
                    }}
                  >
                    {slide.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="detail"
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            fontFamily: sans,
                            fontSize: "0.875rem",
                            lineHeight: 1.75,
                            color: "var(--muted-foreground)",
                          }}
                        >
                          {slide.detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </button>
          );
        })}

        {/* Footer: dots + timer */}
        <div className="flex items-center gap-3 px-10 py-5 border-t border-border">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { cancelAnimationFrame(rafRef.current); elapsedRef.current = 0; activeRef.current = i; setActive(i); setProgress(0); startTimeRef.current = performance.now(); runTick(); }}
              style={{
                width: i === active ? "22px" : "6px",
                height: "5px",
                borderRadius: "3px",
                background: i === active ? "var(--accent)" : "var(--border)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                border: "none",
                padding: 0,
              }}
            />
          ))}
          <button
            onClick={handlePause}
            style={{
              fontFamily: mono,
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              color: "var(--muted-foreground)",
              marginLeft: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {paused ? "▶ RESUME" : `⏸ ${secondsLeft}s`}
          </button>
        </div>
      </div>

      {/* Right: image panel */}
      <div className="relative overflow-hidden" style={{ minHeight: "400px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{ padding: "32px" }}
          >
            <ScreenPlaceholder
              label={slides[active].imageLabel}
              style={{ height: "100%", aspectRatio: "unset" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Progress bar at bottom of image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "var(--border)" }}
        >
          <div
            className="h-full"
            style={{ width: `${progress * 100}%`, background: "var(--accent)", transition: "none" }}
          />
        </div>
      </div>
    </div>
  );
}
