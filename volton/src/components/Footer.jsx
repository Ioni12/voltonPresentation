import React from "react";
import { useReveal } from "../hooks/useReveal";

// Brand green — keep in sync with the other components.
const BRAND = "#16a34a";
const BG = "#06140d";

// TODO: replace with Volton's real email address.
const CONTACT_EMAIL = "info@volton.al";
const PHONE = "+355 67 4001 007";
const ADDRESS = "Rruga Rezervat e Shtetit, Lundër 1, Tirana 1001";

const LINKS = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About Us" },
  { href: "#whyus", label: "Why Us" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

function BoltIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

// Rise-in reveal for one column. `revealed` comes from the grid wrapper's
// observer, so the observed element itself is never hidden.
function Col({ revealed, delayMs = 0, children }) {
  return (
    <div
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 600ms ease, transform 600ms ease",
        transitionDelay: revealed ? `${delayMs}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

function ColHeading({ children }) {
  return (
    <>
      <h5 className="mb-3 text-[1.05rem] font-semibold tracking-tight text-white">
        {children}
      </h5>
      <div
        className="mb-6 h-0.5 w-[34px] rounded-full"
        style={{ background: BRAND }}
      />
    </>
  );
}

function ContactRow({ icon, children }) {
  return (
    <li className="flex items-start gap-3 text-[0.95rem] leading-snug text-white/70">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 h-5 w-5 flex-none"
        style={{ color: BRAND }}
        aria-hidden="true"
      >
        {icon}
      </svg>
      <span>{children}</span>
    </li>
  );
}

export default function Footer() {
  const [gridRef, revealed] = useReveal(0.2);

  return (
    <footer
      className="relative overflow-hidden px-[6vw] pt-20 font-sans text-white"
      style={{ backgroundColor: BG }}
    >
      {/* Green accent line along the top */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)`,
        }}
      />

      {/* Soft green glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: BRAND }}
      />

      <div
        ref={gridRef}
        className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1.2fr] md:gap-16"
      >
        {/* Brand */}
        <Col revealed={revealed} delayMs={0}>
          <a href="#top" className="mb-5 inline-flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border"
              style={{ borderColor: `${BRAND}88`, color: BRAND }}
            >
              <BoltIcon size={16} />
            </span>
            <span className="text-[1.25rem] font-semibold tracking-tight text-white">
              Volton
            </span>
          </a>
          <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-white/60">
            Your trusted partner for sustainable and efficient energy.
          </p>
          <a
            href="#contact"
            className="mt-7 inline-block rounded-full px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white transition-transform duration-300 hover:-translate-y-0.5"
            style={{ background: BRAND }}
          >
            Get an Offer
          </a>
        </Col>

        {/* Menu */}
        <Col revealed={revealed} delayMs={100}>
          <ColHeading>Menu</ColHeading>
          <ul className="space-y-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="flex items-center gap-2 text-[0.95rem] text-white/70 transition-all duration-300 before:content-['›'] before:text-[#16a34a] hover:gap-3 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Col>

        {/* Contact */}
        <Col revealed={revealed} delayMs={200}>
          <ColHeading>Contact Us</ColHeading>
          <ul className="space-y-5">
            <ContactRow
              icon={
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
              }
            >
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="text-white transition-colors duration-300 hover:text-[#16a34a]"
              >
                {PHONE}
              </a>
            </ContactRow>

            <ContactRow
              icon={
                <>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </>
              }
            >
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="transition-colors duration-300 hover:text-[#16a34a]"
              >
                {CONTACT_EMAIL}
              </a>
            </ContactRow>

            <ContactRow
              icon={
                <>
                  <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </>
              }
            >
              {ADDRESS}
            </ContactRow>
          </ul>
        </Col>
      </div>

      {/* Bottom bar */}
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:justify-between">
        <span>© Volton SHPK 2026. All rights reserved.</span>
        <span>Licensed energy supplier</span>
      </div>
    </footer>
  );
}
