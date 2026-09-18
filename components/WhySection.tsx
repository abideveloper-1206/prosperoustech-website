"use client";

import type { ReactNode } from "react";
import styles from "./WhySection.module.css";
import { useInView } from "@/lib/useInView";
import { WHY } from "@/lib/content";

type IconKey = (typeof WHY.items)[number]["icon"];

const ICONS: Record<IconKey, ReactNode> = {
  handshake: (
    <path d="M8.5 12.5 5 9l2.5-2.5a2 2 0 0 1 2.8 0L12 8.2l1.7-1.7a2 2 0 0 1 2.8 0L19 9l-3.5 3.5M8.5 12.5 11 15a2 2 0 0 0 2.8 0l4.2-4.2M8.5 12.5 12 16" />
  ),
  brainCircuit: (
    <>
      <path d="M9 4a3 3 0 0 0-3 3v.2A3 3 0 0 0 4.5 10a3 3 0 0 0 1 5.6V16a3 3 0 0 0 3 3h1V4H9Zm6 0a3 3 0 0 1 3 3v.2a3 3 0 0 1 1.5 2.8 3 3 0 0 1-1 5.6V16a3 3 0 0 1-3 3h-1V4h1Z" />
      <circle cx="18.5" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="5.5" cy="16" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  scale: (
    <path d="M12 3v18M7 7 4 13a3 3 0 0 0 6 0L7 7Zm10 0-3 6a3 3 0 0 0 6 0l-3-6ZM5 7h4M15 7h4M9 21h6" />
  ),
  rocket: (
    <path d="M12 2.5c2.5 1.2 4.5 4 4.5 8 0 2-.7 3.6-1.5 4.8L15 20l-3-1.5L9 20l-.5-4.7C7.7 14.1 7 12.5 7 10.5c0-4 2-6.8 4.5-8h.5Zm0 6a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM7.5 15 5 17.5M16.5 15 19 17.5" />
  ),
};

export default function WhySection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id="why"
      ref={ref}
      className={`${styles.section} ${inView ? styles.inView : ""}`}
    >
      <div className={styles.orb} aria-hidden="true" />
      <div className={styles.orbSecondary} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.eyebrow}>{WHY.eyebrow}</p>
          <h2 className={styles.heading}>{WHY.heading}</h2>
          <p className={styles.subheading}>{WHY.subheading}</p>
        </div>

        {/* A clean "stat-strip" grid — icon, title, description, cells
            separated by a hairline rule rather than boxed cards — instead
            of the earlier timeline design. */}
        <dl className={styles.grid}>
          {WHY.items.map((item, i) => (
            <div
              key={item.title}
              className={styles.cell}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className={styles.iconChip}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {ICONS[item.icon as IconKey]}
                </svg>
              </span>
              <dt className={styles.cellTitle}>{item.title}</dt>
              <dd className={styles.cellDescription}>{item.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
