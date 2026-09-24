import React, { useEffect, useRef, useState } from "react";

// Brand green — keep in sync with the other components.
const BRAND = "#16a34a";

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

// Fires once when the element scrolls into view.
function useReveal(threshold = 0.25) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, revealed];
}

function Point({ title, body, delay }) {
  const [ref, revealed] = useReveal();
  return (
    <div
      ref={ref}
      className="flex gap-5 border-b border-white/10 py-7 transition-all duration-700 ease-out last:border-b-0"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateX(0)" : "translateX(-24px)",
        transitionDelay: `${delay}ms`,
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
        <h4 className="mb-1.5 text-[1.15rem] font-semibold tracking-tight">
          {title}
        </h4>
        <p className="max-w-[46ch] text-[0.98rem] leading-relaxed text-white/60">
          {body}
        </p>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const [textRef, textRevealed] = useReveal();

  return (
    <section
      id="whyus"
      className="relative grid grid-cols-1 items-center gap-[6vw] bg-[#0b1f14] px-[6vw] py-[12vh] font-sans text-white md:grid-cols-2"
    >
      {/* Text */}
      <div ref={textRef} className="max-w-[54ch]">
        <div
          className="mb-5 inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/60 transition-[clip-path] duration-[900ms]"
          style={{
            clipPath: textRevealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          }}
        >
          <span
            className="h-[1.5px] w-8 rounded-full"
            style={{ background: BRAND }}
          />
          Why Us
        </div>

        <h2
          className="mb-6 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-tight transition-[clip-path] duration-[900ms]"
          style={{
            clipPath: textRevealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
            transitionDelay: "100ms",
          }}
        >
          Why Choose <span style={{ color: BRAND }}>Volton SHPK?</span>
        </h2>

        <p
          className="max-w-[50ch] text-[1.02rem] leading-[1.75] text-white/60 transition-[clip-path] duration-[900ms]"
          style={{
            clipPath: textRevealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
            transitionDelay: "200ms",
          }}
        >
          We work with reliable partners in energy trading, at home and abroad.
          These partnerships let us deliver tailored energy solutions and a
          steady, uninterrupted supply for our clients.
        </p>
      </div>

      {/* Points */}
      <div>
        {POINTS.map((p, i) => (
          <Point key={p.title} {...p} delay={i * 120} />
        ))}
      </div>
    </section>
  );
}
