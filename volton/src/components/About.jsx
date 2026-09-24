import React from "react";
import { useReveal } from "../hooks/useReveal";

import aboutImg from "../assets/images/jason-mavrommatis-nyL-rzwP-Mk-unsplash.jpg";

// Brand green — keep in sync with the other components.
const BRAND = "#16a34a";

// Same easing as the Drift mask / clip-path reveals.
const MASK_EASE = "cubic-bezier(.16,.84,.24,1)";

const STATS = [
  { value: "6–110 kV", label: "Network voltages" },
  { value: "Fixed price", label: "Contracts" },
  { value: "Local + intl.", label: "Energy sources" },
];

// Text that slides up from behind a mask. Replays on re-entry.
function Mask({ delayMs = 0, className = "", children }) {
  const [ref, revealed] = useReveal(0.3);
  return (
    <span ref={ref} className={`block overflow-hidden ${className}`}>
      <span
        className="block"
        style={{
          transform: revealed ? "translateY(0)" : "translateY(110%)",
          transition: `transform 850ms ${MASK_EASE}`,
          transitionDelay: revealed ? `${delayMs}ms` : "0ms",
        }}
      >
        {children}
      </span>
    </span>
  );
}

export default function About() {
  const [imgRef, imgRevealed] = useReveal(0.3);
  const [extraRef, extraRevealed] = useReveal(0.3);

  return (
    <section
      id="about"
      className="relative grid grid-cols-1 items-center gap-[6vw] bg-white px-[6vw] py-[12vh] font-sans text-[#0f1a14] md:grid-cols-2"
    >
      {/* Text */}
      <div className="max-w-[54ch]">
        <Mask className="mb-5">
          <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[#0f1a14]/60">
            <span
              className="h-[1.5px] w-8 rounded-full"
              style={{ background: BRAND }}
            />
            About Us
          </span>
        </Mask>

        <h2 className="mb-7 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.08] tracking-tight">
          <Mask delayMs={0}>Your Trusted</Mask>
          <Mask delayMs={90}>
            <span style={{ color: BRAND }}>Energy Supplier</span>
          </Mask>
        </h2>

        <Mask delayMs={180} className="mb-4">
          <p className="text-[1.02rem] leading-[1.75] text-[#0f1a14]/65">
            Volton SHPK is a licensed energy company focused on supplying
            electricity to businesses connected to 6 kV to 110 kV networks. With
            the liberalization of the energy market, we bring flexibility and
            efficiency, with stable prices and capacity matched to each
            client&apos;s needs.
          </p>
        </Mask>

        <Mask delayMs={270} className="mb-9">
          <p className="text-[1.02rem] leading-[1.75] text-[#0f1a14]/65">
            We source electricity from international energy exchanges and local
            producers. Our teams forecast annual consumption accurately and
            actively look for the most competitive prices, delivering
            transparency and reliability to every client.
          </p>
        </Mask>

        {/* Stats + CTA */}
        <div
          ref={extraRef}
          style={{
            opacity: extraRevealed ? 1 : 0,
            transform: extraRevealed ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 700ms ${MASK_EASE}, transform 700ms ${MASK_EASE}`,
            transitionDelay: extraRevealed ? "360ms" : "0ms",
          }}
        >
          <div className="mb-9 flex flex-wrap gap-x-10 gap-y-4 border-t border-[#0f1a14]/10 pt-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-lg font-semibold tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-[0.12em] text-[#0f1a14]/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="group relative inline-block overflow-hidden rounded-full border px-7 py-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] transition-colors duration-300 hover:text-white"
            style={{ borderColor: BRAND, color: BRAND }}
          >
            <span
              className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
              style={{ background: BRAND, zIndex: 0 }}
            />
            <span className="relative z-10">Contact Us</span>
          </a>
        </div>
      </div>

      {/* Image */}
      {/* The observed element is the OUTER wrapper (never clipped). Observing
          the clipped element itself can leave it stuck invisible. */}
      <div ref={imgRef} className="relative order-first md:order-none">
        <div
          className="aspect-[16/10] w-full overflow-hidden rounded-2xl md:aspect-[4/5]"
          style={{
            backgroundColor: "#0b1f14",
            clipPath: imgRevealed ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
            transition: `clip-path 1000ms ${MASK_EASE}`,
          }}
        >
          <img
            src={aboutImg}
            alt="Solar and energy infrastructure"
            className="block h-full w-full object-cover"
          />
        </div>

        {/* Floating badge */}
        <div
          className="absolute -bottom-6 left-6 z-10 max-w-[230px] rounded-xl border border-white/10 bg-[#0b1f14] p-6 text-white shadow-xl"
          style={{
            opacity: imgRevealed ? 1 : 0,
            transform: imgRevealed
              ? "translateY(0) scale(1)"
              : "translateY(-16px) scale(0.9)",
            transition:
              "opacity 500ms cubic-bezier(.3,.6,.2,1.4), transform 500ms cubic-bezier(.3,.6,.2,1.4)",
            transitionDelay: imgRevealed ? "350ms" : "0ms",
          }}
        >
          <span
            className="mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.16em]"
            style={{ color: BRAND }}
          >
            Our mission
          </span>
          <span className="block text-lg font-semibold leading-tight tracking-tight">
            Accessible energy for every business
          </span>
        </div>
      </div>
    </section>
  );
}
