import React, { useEffect, useRef, useState } from "react";

/**
 * Lightning-flash text effect that repeats like a storm.
 *
 * Each "strike" is: dim -> quick double flash -> pause -> one long flash ->
 * settle. Strikes repeat after a calm gap (with a little random jitter), so
 * the text is flashing at most 3 times in under a second, then rests for
 * several seconds. That stays inside the WCAG limit of 3 flashes per second.
 *
 * Between strikes the text sits at `settle`, so it is always readable.
 * Nothing runs when the tab is hidden or the element is off-screen, and
 * nothing flashes at all when the visitor prefers reduced motion.
 *
 * Props
 *  - color:   peak flash color
 *  - glow:    glow color used in the text-shadow
 *  - settle:  resting color between strikes
 *  - delay:   ms offset so two lines can strike slightly apart
 *  - gap:     [min, max] ms of calm between strikes
 */

const DIM_MIX = 0.18; // how dark the "off" frames get, relative to settle

function buildFrames({ color, glow, settle }) {
  const dim = { color: settle, opacity: DIM_MIX };
  // Softer peaks than the original demo; timing is unchanged.
  return [
    { t: 0, color, opacity: 1, shadow: `0 0 24px ${glow}, 0 0 64px ${glow}` },
    { t: 60, ...dim, shadow: "none" },
    { t: 110, color, opacity: 1, shadow: `0 0 30px ${glow}, 0 0 80px ${glow}` },
    { t: 150, ...dim, shadow: "none" },
    { t: 220, color, opacity: 1, shadow: `0 0 18px ${glow}, 0 0 48px ${glow}` },
    { t: 260, ...dim, shadow: "none" },
    {
      t: 420,
      color,
      opacity: 1,
      shadow: `0 0 44px ${glow}, 0 0 110px ${glow}`,
    },
    { t: 470, color: settle, opacity: 1, shadow: `0 0 12px ${glow}` },
    { t: 650, color: settle, opacity: 1, shadow: "none" },
  ];
}

const SEQUENCE_MS = 700; // a little longer than the last frame

export default function LightningText({
  children,
  color = "#ffffff",
  glow = "rgba(234,241,255,0.9)",
  settle = "#ffffff",
  delay = 0,
  gap = [4200, 6500],
  className = "",
}) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rest = { color: settle, opacity: 1, textShadow: "none" };
  const [style, setStyle] = useState(rest);

  const elRef = useRef(null);
  const timers = useRef([]);
  const visible = useRef(true);

  useEffect(() => {
    if (reduced) return;

    const frames = buildFrames({ color, glow, settle });
    let cancelled = false;

    const clearAll = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    const later = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timers.current.push(id);
    };

    // Only strike while the tab is visible AND the text is on screen.
    const canStrike = () => visible.current && !document.hidden;

    function strike() {
      if (cancelled) return;

      if (canStrike()) {
        frames.forEach((f) =>
          later(
            () =>
              setStyle({
                color: f.color,
                opacity: f.opacity,
                textShadow: f.shadow,
              }),
            f.t,
          ),
        );
      }

      // Schedule the next strike after a calm, slightly random gap.
      const wait = gap[0] + Math.random() * (gap[1] - gap[0]);
      later(strike, SEQUENCE_MS + wait);
    }

    // Track whether the text is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    if (elRef.current) io.observe(elRef.current);

    // First strike shortly after load (plus this line's offset).
    later(strike, 200 + delay);

    return () => {
      cancelled = true;
      clearAll();
      io.disconnect();
    };
  }, [color, glow, settle, delay, gap[0], gap[1], reduced]);

  return (
    <span ref={elRef} className={className} style={style}>
      {children}
    </span>
  );
}
