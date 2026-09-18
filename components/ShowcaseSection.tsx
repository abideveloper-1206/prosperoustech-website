"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ShowcaseSection.module.css";
import { useInView } from "@/lib/useInView";
import { SHOWCASE } from "@/lib/content";

/**
 * Same graceful-fallback logic as ServiceMedia in ServicesSection.tsx (see
 * that file for why both the mount-time check and onError are needed).
 * Duplicated rather than shared since this version's markup/classNames
 * differ enough (overlay label instead of a badge) that sharing would mean
 * threading a handful of style props through anyway.
 */
function ShowcaseImage({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  if (failed) {
    return <div className={styles.imageFallback} />;
  }

  return (
    // See ServiceMedia in ServicesSection.tsx for why a plain <img> is used.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={styles.image}
      onError={() => setFailed(true)}
    />
  );
}

export default function ShowcaseSection() {
  const { ref, inView } = useInView<HTMLElement>();
  const [first, second] = SHOWCASE.items;

  return (
    <section
      ref={ref}
      className={`${styles.section} ${inView ? styles.inView : ""}`}
    >
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.eyebrow}>{SHOWCASE.eyebrow}</p>
          <h2 className={styles.heading}>{SHOWCASE.heading}</h2>
          <p className={styles.description}>{SHOWCASE.description}</p>
        </div>

        <div className={styles.gallery}>
          <div className={`${styles.card} ${styles.cardPrimary}`}>
            <ShowcaseImage src={first.image} alt={first.title} />
            <div className={styles.overlay}>
              <h3>{first.title}</h3>
              <p>{first.description}</p>
            </div>
          </div>
          <div className={`${styles.card} ${styles.cardSecondary}`}>
            <ShowcaseImage src={second.image} alt={second.title} />
            <div className={styles.overlay}>
              <h3>{second.title}</h3>
              <p>{second.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
