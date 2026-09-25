import React, { useState } from "react";
import { useReveal } from "../hooks/useReveal";

// Brand green — keep in sync with the other components.
const BRAND = "#16a34a";

const FAQS = [
  {
    q: "How does Volton SHPK work?",
    a: "Through detailed analysis of each client's consumption and needs, Volton SHPK delivers personalized, flexible solutions that maximize efficiency and minimize costs.",
  },
  {
    q: "Which network voltage levels does Volton SHPK supply?",
    a: "Volton SHPK supplies electricity to businesses connected to 6 kV, 10 kV, 20 kV, 35 kV and 110 kV networks.",
  },
  {
    q: "How does Volton SHPK help clients with energy market liberalization?",
    a: "With the liberalization of the energy market, we bring flexibility and efficiency by guaranteeing stable prices and offering capacity tailored to each client's specific needs.",
  },
  {
    q: "What benefits does Volton SHPK offer its clients?",
    a: "Financial stability through fixed-price contracts, solutions tailored to client needs, and a steady, uninterrupted supply.",
  },
];

// One accordion card. Reveals on scroll (replays), tilts when opened.
// The observed element is the outer wrapper; the animated one is inside it.
function Item({ q, a, open, onToggle, delayMs }) {
  const [ref, revealed] = useReveal(0.2);

  return (
    <div ref={ref}>
      <div
        className="overflow-hidden rounded-xl border bg-[#10291b] dark:bg-[#112619]"
        style={{
          borderColor: open ? `${BRAND}66` : "rgba(255,255,255,0.12)",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(24px)",
          transition:
            "opacity 550ms ease, transform 550ms ease, border-color 300ms ease",
          transitionDelay: revealed ? `${delayMs}ms` : "0ms",
          perspective: "800px",
        }}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-center justify-between px-6 py-6 text-left hover:bg-white/[0.03]"
          style={{
            transformOrigin: "top center",
            transform: open ? "rotateX(-6deg) translateY(-2px)" : "none",
            transition:
              "transform 400ms cubic-bezier(.4,.1,.2,1), background-color 200ms ease",
          }}
        >
          <h4 className="max-w-[42ch] text-[1.02rem] font-medium leading-snug text-white">
            {q}
          </h4>

          {/* Plus icon that morphs to minus */}
          <span
            className="relative ml-5 flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full"
            style={{ backgroundColor: `${BRAND}26` }}
            aria-hidden="true"
          >
            <span
              className="absolute h-[1.5px] w-3 rounded-full"
              style={{
                background: BRAND,
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 350ms ease",
              }}
            />
            <span
              className="absolute h-3 w-[1.5px] rounded-full"
              style={{
                background: BRAND,
                transform: open
                  ? "rotate(90deg) scaleY(0)"
                  : "rotate(0deg) scaleY(1)",
                transition: "transform 350ms ease",
              }}
            />
          </span>
        </button>

        {/* Answer: grid-rows trick animates to the content's real height */}
        <div
          className="grid"
          style={{
            gridTemplateRows: open ? "1fr" : "0fr",
            transition: "grid-template-rows 450ms cubic-bezier(.4,.1,.2,1)",
          }}
        >
          <div className="overflow-hidden">
            <p className="max-w-[46ch] px-6 pb-6 text-[0.96rem] leading-relaxed text-white/60">
              {a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [headRef, headRevealed] = useReveal(0.2);

  return (
    <section
      id="faq"
      className="relative bg-[#0b1f14] px-[6vw] py-[12vh] font-sans text-white dark:bg-[#0c1d14]"
    >
      {/* Heading */}
      <div ref={headRef} className="mx-auto mb-[6vh] max-w-[60ch] text-center">
        <div
          style={{
            opacity: headRevealed ? 1 : 0,
            transform: headRevealed ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 650ms ease, transform 650ms ease",
          }}
        >
          <div className="mb-5 inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/60">
            <span
              className="h-[1.5px] w-8 rounded-full"
              style={{ background: BRAND }}
            />
            Questions and Answers
          </div>
          <h2 className="text-[clamp(1.9rem,4vw,2.7rem)] font-semibold leading-[1.15] tracking-tight">
            Have questions about{" "}
            <span style={{ color: BRAND }}>Volton SHPK?</span>
          </h2>
        </div>
      </div>

      {/* Cards — items-start so an open card doesn't stretch its neighbor */}
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-x-8 gap-y-5 md:grid-cols-2">
        {FAQS.map((item, i) => (
          <Item
            key={item.q}
            q={item.q}
            a={item.a}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            delayMs={(i % 2) * 100}
          />
        ))}
      </div>
    </section>
  );
}
