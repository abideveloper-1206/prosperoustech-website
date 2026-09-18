"use client";

import { useEffect } from "react";

/**
 * Ports the original inline <script type="module"> block that wired up Lenis
 * smooth scrolling. Runs once on mount, cleans up its rAF loop on unmount.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let rafHandle = 0;
    let destroyed = false;

    (async () => {
      try {
        const { default: Lenis } = await import("lenis");
        if (destroyed) return;
        const lenis = new Lenis({ smoothWheel: true });

        function raf(time: number) {
          lenis.raf(time);
          rafHandle = requestAnimationFrame(raf);
        }
        rafHandle = requestAnimationFrame(raf);
      } catch (e) {
        console.warn("Lenis failed to load; smooth scroll disabled.", e);
      }
    })();

    return () => {
      destroyed = true;
      if (rafHandle) cancelAnimationFrame(rafHandle);
    };
  }, []);

  return <>{children}</>;
}
