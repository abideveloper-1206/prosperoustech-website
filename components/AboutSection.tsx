"use client";

import Link from "next/link";
import styles from "./AboutSection.module.css";
import { useInView } from "@/lib/useInView";
import { ABOUT } from "@/lib/content";

export default function AboutSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className={`${styles.section} ${inView ? styles.inView : ""}`}
    >
      <div className={styles.orb} aria-hidden="true" />
      <div className={styles.orbSecondary} aria-hidden="true" />
      <svg
        className={styles.ring}
        viewBox="0 0 200 200"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="100"
          cy="100"
          r="98"
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="1"
          strokeDasharray="4 10"
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b14bff" />
            <stop offset="100%" stopColor="#4c6fff" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.panel}>
        <p className={styles.eyebrow}>{ABOUT.eyebrow}</p>
        <h2 className={styles.heading}>{ABOUT.heading}</h2>
        <div className={styles.footRow}>
          <p className={styles.description}>{ABOUT.description}</p>
          <Link href={ABOUT.cta.href} className={styles.cta}>
            {ABOUT.cta.label}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
