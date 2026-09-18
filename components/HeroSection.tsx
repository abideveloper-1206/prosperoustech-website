"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./HeroSection.module.css";
import { HERO } from "@/lib/content";

// The WebGL fluid sim touches window/canvas directly, so it only makes sense
// on the client — load it without SSR, same as the original inline <script>.
const FluidBackground = dynamic(() => import("./FluidBackground"), {
  ssr: false,
});

// Two explicit lines, each split into words for the same per-word stagger
// reveal as the original HTML. Word index continues across both lines so the
// stagger timing reads as one continuous animation.
const LINE_1_WORDS = HERO.headingLine1.split(" ");
const LINE_2_WORDS = HERO.headingLine2;
const SUB_WORDS = HERO.subline.split(" ");

export default function HeroSection() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setReady(true);
      return;
    }
    const onLoad = () => setReady(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <section className={styles.hero}>
      <FluidBackground className={styles.canvas} />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.center}>
        <p
          className={`${styles.badge} ${ready ? styles.revealed : ""}`}
          style={{ transitionDelay: "320ms" }}
        >
          {HERO.badge}
        </p>

        <h1 className={styles.heading}>
          <span className={styles.headingLine}>
            {LINE_1_WORDS.map((word, i) => (
              <span key={`${word}-${i}`}>
                <span
                  className={`${styles.word} ${ready ? styles.revealed : ""}`}
                  style={{ transitionDelay: `${480 + i * 85}ms` }}
                >
                  {word}
                </span>{" "}
              </span>
            ))}
          </span>
          <span className={styles.headingLine}>
            {LINE_2_WORDS.map((word, i) => (
              <span key={`${word}-${i}`}>
                <span
                  className={`${styles.word} ${
                    word === HERO.headingHighlight ? styles.highlight : ""
                  } ${ready ? styles.revealed : ""}`}
                  style={{
                    transitionDelay: `${
                      480 + (LINE_1_WORDS.length + i) * 85
                    }ms`,
                  }}
                >
                  {word}
                </span>{" "}
              </span>
            ))}
          </span>
        </h1>

        <p className={styles.sub}>
          {SUB_WORDS.map((word, i) => (
            <span key={`${word}-${i}`}>
              <span
                className={`${styles.subWord} ${ready ? styles.revealed : ""}`}
                style={{ transitionDelay: `${1150 + i * 22}ms` }}
              >
                {word}
              </span>{" "}
            </span>
          ))}
        </p>

        <div
          className={`${styles.ctaRow} ${ready ? styles.revealed : ""}`}
          style={{ transitionDelay: "1450ms" }}
        >
          <Link href={HERO.primaryCta.href} className={styles.pillBtn}>
            {HERO.primaryCta.label}
          </Link>
          <Link href={HERO.secondaryCta.href} className={styles.ghostBtn}>
            {HERO.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
