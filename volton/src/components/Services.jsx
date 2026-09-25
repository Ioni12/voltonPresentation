import React from "react";
import { useReveal } from "../hooks/useReveal";

// Brand green — keep in sync with the other components.
const BRAND = "#16a34a";

// Same spring easing as the Drift "spin" reveal.
const SPIN_EASE = "cubic-bezier(.18,.75,.2,1.15)";

const SERVICES = [
  {
    title: "Fixed-Price Supply Contracts",
    body: "One-year or longer contracts, tailored to your needs. Your prices stay stable regardless of national and international market fluctuations.",
    spin: "left",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </>
    ),
  },
  {
    title: "Personalized Analysis & Offers",
    body: "Detailed analysis and custom offers for every client, based on their consumption profile and the type of activity they run.",
    spin: "right",
    icon: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  },
  {
    title: "Capacity Management",
    body: "Need more capacity? We guarantee stable, uninterrupted supply so your business operations keep running without a break.",
    spin: "left",
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  },
];

// Scales up and rotates into place; direction alternates per card.
function Spin({ children, delayMs = 0, spin = "left", className = "" }) {
  const [ref, revealed] = useReveal(0.15);
  const fromRotate = spin === "right" ? "14deg" : "-14deg";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed
          ? "scale(1) rotate(0deg)"
          : `scale(0.75) rotate(${fromRotate})`,
        transition: `opacity 750ms ${SPIN_EASE}, transform 750ms ${SPIN_EASE}`,
        transitionDelay: revealed ? `${delayMs}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative bg-[#f4faf6] px-[6vw] py-[12vh] font-sans text-[#0f1a14] dark:bg-[#08160e] dark:text-white"
    >
      {/* Heading */}
      <Spin spin="left" className="mx-auto mb-[7vh] max-w-[60ch] text-center">
        <div className="mb-5 inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[#0f1a14]/60 dark:text-white/60">
          <span
            className="h-[1.5px] w-8 rounded-full"
            style={{ background: BRAND }}
          />
          Our Services
        </div>
        <h2 className="text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-tight tracking-tight">
          Reliable, Tailored{" "}
          <span style={{ color: BRAND }}>Energy Solutions</span>
        </h2>
      </Spin>

      {/* Cards */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-3">
        {SERVICES.map((item, i) => (
          <Spin
            key={item.title}
            delayMs={i * 150}
            spin={item.spin}
            className="h-full"
          >
            <div className="group flex h-full flex-col rounded-2xl border border-[#0f1a14]/10 bg-white p-10 dark:border-white/10 dark:bg-[#0e2016] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#16a34a]/40 hover:shadow-[0_20px_40px_-24px_rgba(22,163,74,0.35)]">
              <div
                className="mb-7 flex h-16 w-16 items-center justify-center rounded-xl border transition-colors duration-300 group-hover:bg-[#16a34a] group-hover:text-white"
                style={{
                  borderColor: `${BRAND}40`,
                  background: `${BRAND}0f`,
                  color: BRAND,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[30px] w-[30px]"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </div>

              <h3 className="mb-3 text-[1.3rem] font-semibold leading-snug tracking-tight">
                {item.title}
              </h3>
              <p className="mb-8 text-[0.98rem] leading-relaxed text-[#0f1a14]/65 dark:text-white/60">
                {item.body}
              </p>

              <a
                href="#contact"
                className="mt-auto inline-flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-[gap] duration-300 group-hover:gap-3"
                style={{ color: BRAND }}
              >
                Learn more
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Spin>
        ))}
      </div>
    </section>
  );
}
