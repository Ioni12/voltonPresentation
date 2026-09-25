import React from "react";
import { useReveal } from "../hooks/useReveal";
import LightningText from "./LightningText";

import heroImg from "../assets/images/Gemini_Generated_Image_u7gmhyu7gmhyu7gm_upscayl_4x_ultramix-balanced-4x.png";

// Brand green — keep in sync with the other components.
const BRAND = "#16a34a";

const FACTS = [
  { value: "6–110 kV", label: "Network voltages" },
  { value: "Fixed price", label: "Contracts" },
  { value: "24/7", label: "Uninterrupted supply" },
];

// Pop-in animation from the Drift hero. Delay steps of 60ms, as in the original.
function Pop({ revealed, step = 0, className = "", children }) {
  return (
    <div
      className={className}
      style={
        revealed
          ? {
              animation: "pop-in 0.5s cubic-bezier(.2,.9,.3,1.3) both",
              animationDelay: `${0.03 + step * 0.06}s`,
            }
          : { opacity: 0 }
      }
    >
      {children}
    </div>
  );
}

export default function Hero() {
  // Replays the pop-in every time the hero re-enters the viewport.
  const [ref, revealed] = useReveal(0.4);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-[100dvh] min-h-[640px] flex-col justify-end overflow-hidden px-[6vw] pb-[7vh] pt-32 font-sans text-white"
      style={{ backgroundColor: "#06140d" }}
    >
      {/* Background image with slow zoom */}
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full animate-[kenburns_14s_ease-out_both] object-cover"
      />

      {/* Overlay for text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#06140d]/90 via-[#06140d]/55 to-[#06140d]/35" />

      {/* Content */}
      <div className="relative z-10 max-w-[820px]">
        <Pop
          revealed={revealed}
          step={0}
          className="mb-5 inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/80"
        >
          <span
            className="h-[1.5px] w-8 rounded-full"
            style={{ background: BRAND }}
          />
          Licensed Energy Supplier · Volton SHPK
        </Pop>

        {/* Headline plays the lightning flash once on load (no Pop wrapper,
            so the two effects don't fight over opacity/transform). */}
        <h1 className="text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-[1.02] tracking-tight">
          <LightningText
            color="#ffffff"
            glow="rgba(234,241,255,0.85)"
            settle="#ffffff"
          >
            Your Energy,
          </LightningText>
          <br />
          <LightningText
            color="#4ade80"
            glow="rgba(74,222,128,0.85)"
            settle={BRAND}
            delay={120}
          >
            Our Solution
          </LightningText>
        </h1>

        <Pop revealed={revealed} step={2}>
          <p className="mt-6 max-w-[46ch] text-[1.1rem] leading-relaxed text-white/75">
            Sustainable energy, guaranteed prices. Tailored electricity supply
            for businesses connected to high-voltage networks.
          </p>
        </Pop>

        <Pop
          revealed={revealed}
          step={3}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#services"
            className="rounded-full px-7 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-white transition-transform duration-300 hover:-translate-y-0.5"
            style={{ background: BRAND }}
          >
            Learn More
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/40 px-7 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#0f1a14]"
          >
            Contact Us
          </a>
        </Pop>
      </div>

      {/* Bottom strip */}
      <Pop
        revealed={revealed}
        step={4}
        className="relative z-10 mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/20 pt-5"
      >
        {FACTS.map((f) => (
          <div key={f.label}>
            <div className="text-lg font-semibold tracking-tight">
              {f.value}
            </div>
            <div className="text-xs uppercase tracking-[0.12em] text-white/60">
              {f.label}
            </div>
          </div>
        ))}
      </Pop>
    </section>
  );
}
