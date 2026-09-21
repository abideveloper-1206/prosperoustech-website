"use client";

import type { ReactNode } from "react";
import styles from "./CapabilitiesMarquee.module.css";
import { CAPABILITIES_MARQUEE } from "@/lib/content";

// One icon per capability, in the same order as CAPABILITIES_MARQUEE.items.
const ICONS: ReactNode[] = [
  // AI-Powered Products — brain
  <path
    key="ai"
    d="M9 4a3 3 0 0 0-3 3v.2A3 3 0 0 0 4.5 10a3 3 0 0 0 1 5.6V16a3 3 0 0 0 3 3h1V4H9Zm6 0a3 3 0 0 1 3 3v.2a3 3 0 0 1 1.5 2.8 3 3 0 0 1-1 5.6V16a3 3 0 0 1-3 3h-1V4h1Z"
  />,
  // SaaS Platforms — globe
  <g key="saas">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.2 2.4 3.4 5.3 3.4 8.5s-1.2 6.1-3.4 8.5c-2.2-2.4-3.4-5.3-3.4-8.5S9.8 5.9 12 3.5Z" />
  </g>,
  // Web Applications — browser
  <g key="web">
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <path d="M3 8.5h18" />
  </g>,
  // Mobile Applications — phone
  <g key="mobile">
    <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
    <path d="M11 18.5h2" />
  </g>,
  // Cloud Infrastructure — cloud
  <path
    key="cloud"
    d="M7 18a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17.2 8.1 4 4 0 0 1 17 16H7Z"
  />,
  // Data Intelligence — bar chart
  <path key="data" d="M4 20V10M10 20V4M16 20v-7M4 20h16" />,
  // DevOps & Support — infinity loop
  <path
    key="devops"
    d="M8 16a4 4 0 1 1 0-8c2.5 0 4.5 4 8 4a4 4 0 1 0 0-8"
  />,
  // Technical Partnership — handshake
  <path
    key="partner"
    d="M8.5 12.5 5 9l2.5-2.5a2 2 0 0 1 2.8 0L12 8.2l1.7-1.7a2 2 0 0 1 2.8 0L19 9l-3.5 3.5M8.5 12.5 11 15a2 2 0 0 0 2.8 0l4.2-4.2M8.5 12.5 12 16"
  />,
];

export default function CapabilitiesMarquee() {
  // Rendered twice back to back, with the track animated exactly -50% —
  // a seamless infinite loop (same technique as we-brand's wave marquee).
  const items = [...CAPABILITIES_MARQUEE.items, ...CAPABILITIES_MARQUEE.items];

  return (
    <section className={styles.section} aria-label={CAPABILITIES_MARQUEE.eyebrow}>
      <p className={styles.eyebrow}>{CAPABILITIES_MARQUEE.eyebrow}</p>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {items.map((label, i) => (
            <div className={styles.pill} key={`${label}-${i}`}>
              <span className={styles.iconWrap}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {ICONS[i % ICONS.length]}
                </svg>
              </span>
              <span className={styles.label}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
