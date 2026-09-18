import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll helper shared by every section below the hero (the hero
 * itself reveals on page load instead, since it's what's visible first).
 * Fires once: after the element enters the viewport it stays "in view" so
 * the CSS transition doesn't reverse if the user scrolls back past it.
 */
export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // `options` is expected to be a stable literal at each call site, not
    // re-created every render, so it's intentionally left out below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return { ref, inView } as const;
}
