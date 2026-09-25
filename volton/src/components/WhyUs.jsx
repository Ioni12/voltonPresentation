import React from "react";
import { useReveal } from "../hooks/useReveal";

// Brand green — keep in sync with the other components.
const BRAND = "#16a34a";

// Same easings as the Drift Why Us sections.
const WIPE_EASE = "cubic-bezier(.65,0,.15,1)";

const POINTS = [
  {
    title: "Transparent Pricing",
    body: "No surprises, no hidden fees. Just clear, predictable prices tailored to your business.",
  },
  {
    title: "Clear Terms & Conditions",
    body: "Simple, easy-to-understand contracts that build full transparency and mutual trust.",
  },
  {
    title: "Client-Focused Service",
    body: "Solutions tailored to each client, with flexibility, proactive communication, and dedicated support.",
  },
];

// Fades in while letter-spacing tightens ("drift-in"), staggered per item.
function Drift({ revealed, step = 0, className = "", children }) {
  return (
    <div
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        letterSpacing: revealed ? "normal" : "0.12em",
        transform: revealed ? "translateY(0)" : "translateY(10px)",
        transition:
          "opacity 650ms ease, letter-spacing 650ms ease, transform 650ms ease",
        transitionDelay: revealed ? `${0.05 + step * 0.1}s` : "0s",
      }}
    >
      {children}
    </div>
  );
}

// One checklist point: slides in from the left, replays on re-entry.
// The observed element is the wrapper; the animated one is the inner div.
function Point({ title, body, delayMs }) {
  const [ref, revealed] = useReveal(0.25);
  return (
    <div ref={ref} className="border-b border-white/10 last:border-b-0">
      <div
        className="flex gap-5 py-7"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateX(0)" : "translateX(-24px)",
          transition: "opacity 550ms ease, transform 550ms ease",
          transitionDelay: revealed ? `${delayMs}ms` : "0ms",
        }}
      >
        <div
          className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border-[1.5px]"
          style={{ borderColor: BRAND, color: BRAND }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M5 12.5 10 17.5 19 7.5" />
          </svg>
        </div>
        <div>
          <h4 className="mb-1.5 text-[1.15rem] font-semibold tracking-tight text-white">
            {title}
          </h4>
          <p className="max-w-[46ch] text-[0.98rem] leading-relaxed text-white/60">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhyUs() {
  // Observe the text column wrapper (never hidden itself).
  const [textRef, textRevealed] = useReveal(0.25);

  return (
    <section
      id="whyus"
      className="relative grid grid-cols-1 items-center gap-[6vw] bg-[#0b1f14] px-[6vw] py-[12vh] font-sans text-white dark:bg-[#040e08] md:grid-cols-2"
    >
      {/* Text */}
      <div ref={textRef} className="max-w-[54ch]">
        {/* Eyebrow: clip-path wipe (the observed wrapper above is not clipped) */}
        <div
          className="mb-5"
          style={{
            clipPath: textRevealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
            transition: `clip-path 900ms ${WIPE_EASE}`,
          }}
        >
          <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/60">
            <span
              className="h-[1.5px] w-8 rounded-full"
              style={{ background: BRAND }}
            />
            Why Us
          </span>
        </div>

        <Drift revealed={textRevealed} step={1}>
          <h2 className="mb-6 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-tight">
            Why Choose <span style={{ color: BRAND }}>Volton SHPK?</span>
          </h2>
        </Drift>

        <Drift revealed={textRevealed} step={2}>
          <p className="max-w-[50ch] text-[1.02rem] leading-[1.75] text-white/60">
            We work with reliable partners in energy trading, at home and
            abroad. These partnerships let us deliver tailored energy solutions
            and a steady, uninterrupted supply for our clients.
          </p>
        </Drift>
      </div>

      {/* Points */}
      <div>
        {POINTS.map((p, i) => (
          <Point key={p.title} {...p} delayMs={i * 120} />
        ))}
      </div>
    </section>
  );
}
