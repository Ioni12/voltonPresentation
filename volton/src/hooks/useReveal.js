import { useEffect, useRef, useState } from "react";

/**
 * Toggles `revealed` when the element enters/leaves the viewport,
 * so animations replay every time the section scrolls back into view
 * (same behavior as the original Drift HTML).
 *
 * `rootMargin` makes it trigger a little early, which keeps anchor
 * jumps (like the "Contact Us" button) from landing on hidden content.
 */
export function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setRevealed(entry.isIntersecting),
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, revealed];
}
