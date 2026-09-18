"use client";

import { useState } from "react";
import styles from "./FaqSection.module.css";
import { useInView } from "@/lib/useInView";
import { FAQ } from "@/lib/content";

export default function FaqSection() {
  const { ref, inView } = useInView<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      ref={ref}
      className={`${styles.section} ${inView ? styles.inView : ""}`}
    >
      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.eyebrow}>{FAQ.eyebrow}</p>
          <h2 className={styles.heading}>{FAQ.heading}</h2>
        </div>

        <div className={styles.accordion}>
          {FAQ.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.question}
                className={`${styles.item} ${open ? styles.itemOpen : ""}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={open}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.question}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.chevron}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div id={`faq-answer-${i}`} className={styles.answerWrap} role="region">
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
