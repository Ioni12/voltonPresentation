import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

// Brand green — change this one line to retheme the whole navbar.
const BRAND = "#16a34a";

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

function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#0f1a14]/15 text-[#0f1a14]/70 transition-colors duration-300 hover:border-[#16a34a] hover:text-[#16a34a] dark:border-white/20 dark:text-white/70 dark:hover:border-[#16a34a] dark:hover:text-[#16a34a] ${className}`}
    >
      {isDark ? (
        // Sun
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // Moon
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
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
          "border-b font-sans text-[#0f1a14] transition-all duration-500 ease-out dark:text-white",
          scrolled
            ? "border-[#0f1a14]/[0.06] bg-white/80 py-3.5 shadow-[0_12px_24px_-16px_rgba(15,26,20,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-[#06140d]/80 dark:shadow-[0_12px_24px_-16px_rgba(0,0,0,0.6)]"
            : "border-transparent bg-white py-6 dark:bg-[#06140d]",
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
        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={[
                  "relative inline-block py-1 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300",
                  active === item.id
                    ? "text-[#0f1a14] dark:text-white"
                    : "text-[#0f1a14]/55 hover:text-[#0f1a14] dark:text-white/55 dark:hover:text-white",
                ].join(" ")}
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

        {/* Right side: theme toggle + CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-full border px-6 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.08em] transition-colors duration-300 hover:text-white"
            style={{ borderColor: BRAND, color: BRAND }}
          >
            <span
              className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
              style={{ background: BRAND, zIndex: 0 }}
            />
            <span className="relative z-10">{CTA_LABEL}</span>
          </a>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex flex-col gap-[5px] p-2 text-[#0f1a14] dark:text-white"
          >
            <span
              className="h-[1.5px] w-[22px] bg-current transition-transform duration-300"
              style={
                mobileOpen
                  ? { transform: "translateY(6.5px) rotate(45deg)" }
                  : {}
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
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={[
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white font-sans dark:bg-[#06140d]",
          "transition-opacity duration-300",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setMobileOpen(false)}
            className="text-3xl font-semibold tracking-tight text-[#0f1a14] transition-all duration-300 dark:text-white"
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
