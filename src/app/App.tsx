import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { FadeIn } from "./components/FadeIn";
import { CursorGlow } from "./components/CursorGlow";
import { StatCard } from "./components/StatCard";
import { ScreenPlaceholder } from "./components/ScreenPlaceholder";
import { ResearchSlideshow } from "./components/ResearchSlideshow";

const serif = "'Instrument Serif', serif";
const sans = "'Inter', sans-serif";
const mono = "'Geist Mono', monospace";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-px origin-left"
      style={{ scaleX, background: "var(--accent)" }}
    />
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(13,13,11,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <span style={{ fontFamily: mono, fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--muted-foreground)" }}>
        CASE STUDY
      </span>
      <span style={{ fontFamily: mono, fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>
        2024 — UX / AI PRODUCT
      </span>
    </motion.nav>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-end pb-20 px-8 md:px-16 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="absolute top-24 left-8 md:left-16 right-8 md:right-16 h-px origin-left"
        style={{ background: "var(--border)" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 flex items-center gap-4"
        >
          <span style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--accent)" }}>
            MOMENTUM AI
          </span>
          <span style={{ color: "var(--border)", fontSize: "1rem" }}>/</span>
          <span style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}>
            CASE STUDY
          </span>
        </motion.div>

        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            style={{
              fontFamily: serif,
              fontSize: "clamp(3.2rem, 8vw, 7.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--foreground)",
              fontWeight: 400,
            }}
          >
            From an AI nobody
            <br />
            trusted to{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>one they</em>
            <br />
            act on.
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-0 right-0 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}
          >
            SCROLL
          </motion.div>
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, var(--muted-foreground), transparent)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* Full-width hero screen placeholder — sits below the hero text */
function HeroScreen() {
  return (
    <section className="px-8 md:px-16 pb-0 border-t border-border">
      <FadeIn>
        <ScreenPlaceholder
          label="Hero product screenshot / demo video"
          aspectRatio="16/7"
          style={{ borderRadius: "2px 2px 0 0" }}
        />
      </FadeIn>
    </section>
  );
}

function Overview() {
  return (
    <section className="px-8 md:px-16 py-24 md:py-36 border-t border-border">
      <div className="grid md:grid-cols-12 gap-16 md:gap-8">
        <FadeIn className="md:col-span-4" direction="left">
          <span style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--accent)" }}>
            01 — OVERVIEW
          </span>
        </FadeIn>
        <div className="md:col-span-8">
          <FadeIn delay={0.1}>
            <p
              style={{
                fontFamily: sans,
                fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)",
                lineHeight: 1.65,
                color: "var(--foreground)",
                fontWeight: 300,
                maxWidth: "680px",
              }}
            >
              Momentum's built-in AI was a feature the company sold but users avoided.{" "}
              <span style={{ color: "var(--muted-foreground)" }}>
                40% touched it less than once a week. After the redesign, adoption crossed 70% in the first quarter,
                client onboarding conversion rose 60%, and acceptance of AI suggestions rose 80%.
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={0.25} className="mt-8">
            <p style={{ fontFamily: sans, fontSize: "1rem", lineHeight: 1.8, color: "var(--muted-foreground)", maxWidth: "620px" }}>
              The shift came from three changes: giving the AI the client's actual context, replacing the blank prompt
              box with a guided builder that cut prompt attempts from three to one, and embedding the AI inside the work
              instead of parking it in a separate tab.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="px-8 md:px-16 py-16 border-t border-border">
      <FadeIn className="mb-12">
        <span style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}>
          KEY OUTCOMES
        </span>
      </FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
        <StatCard value="70%" label="AI Adoption" sub="UP FROM 40% / Q1 POST-LAUNCH" delay={0} />
        <StatCard value="80%" label="Suggestion Acceptance" sub="AI RECOMMENDATIONS ACTED ON" delay={0.1} />
        <StatCard value="60%" label="Onboarding Conversion" sub="CLIENT SIGN-ON IMPROVEMENT" delay={0.2} />
        <StatCard value="3→1" label="Prompt Attempts" sub="GUIDED BUILDER EFFICIENCY" delay={0.3} />
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="px-8 md:px-16 py-24 md:py-36 border-t border-border">
      <div className="grid md:grid-cols-12 gap-16 md:gap-8 mb-16">
        <FadeIn className="md:col-span-4" direction="left">
          <span style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--accent)" }}>
            02 — THE PROBLEM
          </span>
        </FadeIn>
        <div className="md:col-span-8 space-y-10">
          <FadeIn delay={0.1}>
            <h2
              style={{
                fontFamily: serif,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "var(--foreground)",
                maxWidth: "580px",
              }}
            >
              The AI existed, but it operated in isolation.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontFamily: sans, fontSize: "1rem", lineHeight: 1.8, color: "var(--muted-foreground)", maxWidth: "600px" }}>
              Users were handed a blank prompt box and told to ask the AI anything. Without context about the specific
              client or the task at hand, most couldn't think of what to type. Those who tried often iterated two or
              three times before giving up or getting something useful.
            </p>
          </FadeIn>
          <FadeIn delay={0.28}>
            <p style={{ fontFamily: sans, fontSize: "1rem", lineHeight: 1.8, color: "var(--muted-foreground)", maxWidth: "600px" }}>
              The AI lived in its own tab — a deliberate architectural decision that turned out to be the product's
              biggest liability. Switching context killed momentum. Users finished their work manually rather than
              interrupt their flow to consult a separate tool.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
              {[
                { label: "Blank canvas paralysis", note: "No starting point → no interaction" },
                { label: "Context blindness", note: "AI didn't know who the client was" },
                { label: "Tab isolation", note: "Friction killed in-flow usage" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 group hover:bg-card transition-colors duration-300"
                  style={{ background: "var(--background)" }}
                >
                  <div style={{ fontFamily: sans, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "6px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.06em", color: "var(--muted-foreground)" }}>
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Before-state screen placeholder */}
      <FadeIn delay={0.1}>
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-start-5 md:col-span-8">
            <div className="mb-3 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--muted-foreground)" }} />
              <span style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--muted-foreground)" }}>
                BEFORE — THE BLANK PROMPT EXPERIENCE
              </span>
            </div>
            <ScreenPlaceholder label="Before screen — blank AI tab / empty prompt box" aspectRatio="16/9" />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function Research() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleComplete = useCallback(() => {
    if (!sectionRef.current) return;
    const next = sectionRef.current.nextElementSibling as HTMLElement | null;
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-border">
      {/* Header row */}
      <div className="px-8 md:px-16 py-10 border-b border-border">
        <FadeIn>
          <span style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--accent)" }}>
            03 — RESEARCH
          </span>
        </FadeIn>
      </div>

      {/* Slideshow */}
      <ResearchSlideshow onComplete={handleComplete} />
    </section>
  );
}

function Solution() {
  const changes = [
    {
      number: "01",
      from: "Generic blank prompt box",
      to: "Guided builder with client context pre-loaded",
      outcome: "Prompt attempts dropped from 3 to 1",
      imageLabel: "Guided builder UI — before vs after",
    },
    {
      number: "02",
      from: "Separate AI tab",
      to: "AI embedded inline at decision points",
      outcome: "In-flow usage increased without context switching",
      imageLabel: "Inline AI suggestion embedded in workflow",
    },
    {
      number: "03",
      from: "No client awareness",
      to: "AI reads client history, goals, and active deal",
      outcome: "Suggestions felt specific, not generic",
      imageLabel: "Context-aware AI panel with client data",
    },
  ];

  return (
    <section className="px-8 md:px-16 py-24 md:py-36 border-t border-border">
      <div className="grid md:grid-cols-12 gap-16 md:gap-8">
        <FadeIn className="md:col-span-4" direction="left">
          <span style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--accent)" }}>
            04 — THE SOLUTION
          </span>
        </FadeIn>
        <div className="md:col-span-8">
          <FadeIn delay={0.1}>
            <h2
              style={{
                fontFamily: serif,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "var(--foreground)",
                letterSpacing: "-0.01em",
                marginBottom: "48px",
                maxWidth: "540px",
              }}
            >
              Three structural changes, not surface-level polish.
            </h2>
          </FadeIn>

          <div className="space-y-16">
            {changes.map((s, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.1}>
                <div className="group">
                  <div className="flex items-start gap-8 pb-8 border-b border-border group-hover:border-accent transition-colors duration-500 mb-8">
                    <span
                      style={{
                        fontFamily: mono,
                        fontSize: "0.65rem",
                        color: "var(--muted-foreground)",
                        letterSpacing: "0.1em",
                        paddingTop: "4px",
                        minWidth: "28px",
                      }}
                    >
                      {s.number}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                        <span
                          className="line-through"
                          style={{
                            fontFamily: sans,
                            fontSize: "0.875rem",
                            color: "var(--muted-foreground)",
                            textDecorationColor: "rgba(201,185,122,0.4)",
                          }}
                        >
                          {s.from}
                        </span>
                        <span style={{ color: "var(--border)" }} className="hidden md:inline">→</span>
                        <span style={{ fontFamily: sans, fontSize: "0.875rem", color: "var(--foreground)" }}>
                          {s.to}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: mono,
                          fontSize: "0.65rem",
                          letterSpacing: "0.1em",
                          color: "var(--accent)",
                        }}
                      >
                        {s.outcome}
                      </div>
                    </div>
                  </div>
                  {/* Screen placeholder per solution step */}
                  <div className="mb-2 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--muted-foreground)" }} />
                    <span style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--muted-foreground)" }}>
                      {s.imageLabel.toUpperCase()}
                    </span>
                  </div>
                  <ScreenPlaceholder label={s.imageLabel} aspectRatio="16/8" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DesignPrinciples() {
  const principles = [
    {
      title: "Context before prompt",
      body: "Every AI interaction starts with what the system already knows: client name, last touchpoint, open opportunities. The user arrives to a pre-filled starting point, not a blank slate.",
      imageLabel: "Context panel / pre-filled prompt UI",
    },
    {
      title: "Work, not features",
      body: "The AI doesn't live in a dedicated space anymore. It surfaces where the user is already working — inside the contact record, inside the proposal, inside the meeting note.",
      imageLabel: "AI surfaced inside contact record",
    },
    {
      title: "Suggested paths, not open fields",
      body: "Instead of asking 'what would you like to do?', the interface offers three relevant starting suggestions based on the current context. The user can override, but rarely needs to.",
      imageLabel: "Suggestion chips / prompt starters",
    },
    {
      title: "Inline, not modal",
      body: "AI output appears as a ghosted suggestion in the text area the user is editing. They accept, reject, or edit without switching context. One keystroke to apply.",
      imageLabel: "Ghost text / inline suggestion UI",
    },
  ];

  return (
    <section className="border-t border-border" style={{ background: "var(--card)" }}>
      <div className="px-8 md:px-16 py-24 md:py-36">
        <FadeIn>
          <span style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--accent)" }}>
            05 — DESIGN PRINCIPLES
          </span>
        </FadeIn>
        <div className="mt-12 grid md:grid-cols-2 gap-px" style={{ background: "var(--border)" }}>
          {principles.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="p-10 group hover:bg-secondary transition-colors duration-400"
                style={{ background: "var(--card)" }}
              >
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    color: "var(--muted-foreground)",
                    marginBottom: "20px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{
                    fontFamily: serif,
                    fontSize: "1.4rem",
                    fontWeight: 400,
                    color: "var(--foreground)",
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontFamily: sans, fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--muted-foreground)", marginBottom: "24px" }}>
                  {p.body}
                </p>
                {/* Per-principle screen placeholder */}
                <ScreenPlaceholder label={p.imageLabel} aspectRatio="4/3" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Outcome() {
  return (
    <section className="px-8 md:px-16 py-24 md:py-40 border-t border-border">
      <div className="grid md:grid-cols-12 gap-16 md:gap-8">
        <FadeIn className="md:col-span-4" direction="left">
          <span style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--accent)" }}>
            06 — OUTCOME
          </span>
        </FadeIn>
        <div className="md:col-span-8 space-y-8">
          <FadeIn delay={0.1}>
            <h2
              style={{
                fontFamily: serif,
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "var(--foreground)",
                letterSpacing: "-0.02em",
                maxWidth: "560px",
              }}
            >
              The AI became part of how people work, not something they work around.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontFamily: sans, fontSize: "1rem", lineHeight: 1.8, color: "var(--muted-foreground)", maxWidth: "560px" }}>
              Within one quarter of shipping, AI adoption crossed 70%. Acceptance of suggestions rose to 80%, meaning
              users weren't just trying the AI — they were trusting it. Client onboarding conversion improved 60%,
              partly because sales teams could demonstrate relevant AI capabilities in live context during demos.
            </p>
          </FadeIn>
          <FadeIn delay={0.28}>
            <p style={{ fontFamily: sans, fontSize: "1rem", lineHeight: 1.8, color: "var(--muted-foreground)", maxWidth: "560px" }}>
              The product shifted from an AI feature to an AI-native product — not because the underlying model changed,
              but because the design finally respected how people actually work.
            </p>
          </FadeIn>
          <FadeIn delay={0.36}>
            <div
              className="mt-4 p-8 border-l-2"
              style={{ borderColor: "var(--accent)", background: "rgba(201,185,122,0.04)" }}
            >
              <p
                style={{
                  fontFamily: serif,
                  fontSize: "1.25rem",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: "var(--foreground)",
                  marginBottom: "16px",
                }}
              >
                "I didn't realize how much I was avoiding the AI until I stopped having to think about how to start."
              </p>
              <span style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>
                — SALES MANAGER, 6 MONTHS POST-LAUNCH
              </span>
            </div>
          </FadeIn>

          {/* Final outcome screen — full width */}
          <FadeIn delay={0.44}>
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                <span style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--muted-foreground)" }}>
                  AFTER — THE REDESIGNED AI EXPERIENCE
                </span>
              </div>
              <ScreenPlaceholder label="Final product — redesigned AI panel in context" aspectRatio="16/9" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-8 md:px-16 py-12 border-t border-border">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div style={{ fontFamily: serif, fontSize: "1.1rem", color: "var(--foreground)", letterSpacing: "-0.01em" }}>
            Momentum AI
          </div>
          <div style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--muted-foreground)", marginTop: "4px" }}>
            CASE STUDY — UX REDESIGN
          </div>
        </div>
        <div style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--muted-foreground)" }}>
          2024 — AI PRODUCT DESIGN
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen relative" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <CursorGlow />
      <ScrollProgress />
      <Nav />
      <Hero />
      <HeroScreen />
      <Overview />
      <Stats />
      <Problem />
      <Research />
      <Solution />
      <DesignPrinciples />
      <Outcome />
      <Footer />
    </div>
  );
}
