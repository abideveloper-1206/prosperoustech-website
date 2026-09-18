"use client";

import Link from "next/link";
import styles from "./CtaBanner.module.css";
import { useInView } from "@/lib/useInView";
import { CTA_BANNER } from "@/lib/content";

export default function CtaBanner() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className={`${styles.section} ${inView ? styles.inView : ""}`}
    >
      <div className={styles.banner}>
        <div className={styles.left}>
          <span className={styles.iconWrap} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
            </svg>
          </span>
          <div>
            <h2 className={styles.message}>{CTA_BANNER.message}</h2>
            <p className={styles.description}>{CTA_BANNER.description}</p>
          </div>
        </div>

        <div className={styles.right}>
          <Link href={CTA_BANNER.cta.href} className={styles.pillBtn}>
            {CTA_BANNER.cta.label}
          </Link>
          <Link
            href={CTA_BANNER.cta.href}
            className={styles.arrowBtn}
            aria-label={CTA_BANNER.cta.label}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="19" x2="19" y2="5" />
              <polyline points="9 5 19 5 19 15" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
