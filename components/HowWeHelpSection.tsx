"use client";

import styles from "./HowWeHelpSection.module.css";
import { useInView } from "@/lib/useInView";
import { HOW_WE_HELP } from "@/lib/content";

export default function HowWeHelpSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id="how-we-help"
      ref={ref}
      className={`${styles.section} ${inView ? styles.inView : ""}`}
    >
      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.eyebrow}>{HOW_WE_HELP.eyebrow}</p>
          <h2 className={styles.heading}>{HOW_WE_HELP.heading}</h2>
          <p className={styles.subheading}>{HOW_WE_HELP.subheading}</p>
        </div>

        <div className={styles.grid}>
          {HOW_WE_HELP.steps.map((step, i) => (
            <div
              key={step.title}
              className={styles.step}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className={styles.badge}>{i + 1}</span>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
