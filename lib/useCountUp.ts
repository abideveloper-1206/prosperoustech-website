import { useEffect, useState } from "react";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates a number from 0 up to `target` once `start` becomes true (driven
 * by the caller's own scroll-into-view check, e.g. useInView). Returns the
 * current value already formatted to `decimals` places, as a string, so the
 * component can just interpolate it straight into JSX.
 */
export function useCountUp(
  target: number,
  start: boolean,
  { decimals = 0, duration = 1300 }: { decimals?: number; duration?: number } = {}
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let raf = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      setValue(target * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value.toFixed(decimals);
}
