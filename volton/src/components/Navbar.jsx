import React, { useEffect, useState } from "react";

// Brand green — change this one line to retheme the whole navbar.
const BRAND = "#16a34a";

// Placeholder links — replace later.
const NAV_ITEMS = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About Us" },
  { id: "whyus", label: "Why Us" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const CTA_LABEL = "Contact Us";

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      Boolean,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <nav
        id="volton-navbar"
        className={[
          "fixed left-0 right-0 z-50 flex items-center justify-between px-[6vw]",
          "border-b font-sans text-[#0f1a14] transition-all duration-500 ease-out",
          scrolled
            ? "border-[#0f1a14]/[0.06] bg-white/80 py-3.5 shadow-[0_12px_24px_-16px_rgba(15,26,20,0.18)] backdrop-blur-xl"
            : "border-transparent bg-white py-6",
        ].join(" ")}
        style={{ top: "env(safe-area-inset-top, 0px)" }}
      >
        {/* Wordmark */}
        <a href="#top" className="group flex items-center gap-3">
          <span
            className="relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-transparent"
            style={{ borderColor: `${BRAND}55`, color: BRAND }}
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `${BRAND}14` }}
            />
            <span className="relative">
              <BoltIcon />
            </span>
          </span>
          <span className="text-[1.15rem] font-semibold tracking-tight">
            Volton
          </span>
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="relative inline-block py-1 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[#0f1a14]/55 transition-colors duration-300 hover:text-[#0f1a14]"
                style={active === item.id ? { color: "#0f1a14" } : {}}
              >
                {item.label}
                <span
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-[1.5px] rounded-full transition-all duration-500 ease-out"
                  style={{
                    background: BRAND,
                    width: active === item.id ? "100%" : "0%",
                  }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-full border px-6 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.08em] transition-colors duration-300 hover:text-white"
            style={{ borderColor: BRAND, color: BRAND }}
          >
            <span
              className="absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
              style={{ background: BRAND }}
            />
            {CTA_LABEL}
          </a>
        </div>

        {/* Hamburger */}
        <button
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex md:hidden flex-col gap-[5px] p-2 text-[#0f1a14]"
        >
          <span
            className="h-[1.5px] w-[22px] bg-current transition-transform duration-300"
            style={
              mobileOpen ? { transform: "translateY(6.5px) rotate(45deg)" } : {}
            }
          />
          <span
            className="h-[1.5px] w-[22px] bg-current transition-opacity duration-300"
            style={mobileOpen ? { opacity: 0 } : {}}
          />
          <span
            className="h-[1.5px] w-[22px] bg-current transition-transform duration-300"
            style={
              mobileOpen
                ? { transform: "translateY(-6.5px) rotate(-45deg)" }
                : {}
            }
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={[
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white font-sans",
          "transition-opacity duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setMobileOpen(false)}
            className="text-3xl font-semibold tracking-tight text-[#0f1a14] transition-all duration-300"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(14px)",
              transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms",
            }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          className="mt-4 rounded-full px-7 py-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-white transition-all duration-300"
          style={{
            background: BRAND,
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? "translateY(0)" : "translateY(14px)",
            transitionDelay: mobileOpen ? `${NAV_ITEMS.length * 50}ms` : "0ms",
          }}
        >
          {CTA_LABEL}
        </a>
      </div>
    </>
  );
}
