"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./ServicesSection.module.css";
import { useInView } from "@/lib/useInView";
import { SERVICES } from "@/lib/content";

type IconKey = (typeof SERVICES.items)[number]["icon"];

// Small, consistent line-icon set — shown as a fallback inside each card's
// media frame until a matching photo is dropped into public/services/.
const ICONS: Record<IconKey, ReactNode> = {
  brain: (
    <path d="M9 4a3 3 0 0 0-3 3v.2A3 3 0 0 0 4.5 10a3 3 0 0 0 1 5.6V16a3 3 0 0 0 3 3h1V4H9Zm6 0a3 3 0 0 1 3 3v.2a3 3 0 0 1 1.5 2.8 3 3 0 0 1-1 5.6V16a3 3 0 0 1-3 3h-1V4h1Z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.4 5.3 3.4 8.5s-1.2 6.1-3.4 8.5c-2.2-2.4-3.4-5.3-3.4-8.5S9.8 5.9 12 3.5Z" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 8.5h18" />
      <circle cx="6" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="8.2" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M11 18.5h2" />
    </>
  ),
  enterprise: (
    <>
      <path d="M4 21V6.5L12 3l8 3.5V21" />
      <path d="M9 21v-5h6v5M9 10h.01M12 10h.01M15 10h.01M9 14h.01M12 14h.01M15 14h.01" />
    </>
  ),
  data: <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" />,
};

function Icon({ name, className }: { name: IconKey; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

/**
 * Renders the photo if it loads, otherwise the icon fallback. `onError`
 * alone isn't enough here: Next.js server-renders the <img> tag directly
 * into the HTML, so the browser can request — and fail — a 404 image
 * before React has even hydrated and attached the handler (`error` events
 * also don't bubble, so this isn't just a delegation quirk). The mount-time
 * `complete && naturalWidth === 0` check catches that already-failed case;
 * `onError` still covers a failure that happens later (slow network, the
 * file getting removed, etc).
 */
function ServiceMedia({
  src,
  alt,
  icon,
}: {
  src: string;
  alt: string;
  icon: IconKey;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  return (
    <>
      {!failed && (
        // Plain <img> on purpose: the onError/mount-check fallback above
        // needs an element that degrades gracefully on a 404, and the
        // eventual uploads' dimensions aren't known ahead of time.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={styles.mediaImg}
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className={styles.mediaFallback}>
          <Icon name={icon} className={styles.mediaFallbackIcon} />
        </div>
      )}
    </>
  );
}

export default function ServicesSection() {
  // threshold: 0, rootMargin with a large bottom bias — this section is
  // unusually tall (six sticky cards stacked in normal flow), so:
  //  - threshold 0 means "as soon as any pixel is visible" rather than the
  //    useInView default of 0.2 (20% of the TARGET's own height — for a
  //    ~3500px section that's a full extra viewport of scrolling before
  //    it would have fired at all).
  //  - rootMargin fires the observer while the section is still ~600px
  //    below the viewport, giving Lenis's smooth-scroll inertia (which
  //    keeps easing the page for a while after a scroll gesture ends) and
  //    the fade transition time to finish before the section is actually
  //    on screen, instead of visibly catching up after the user arrives.
  const { ref, inView } = useInView<HTMLElement>({
    threshold: 0,
    rootMargin: "0px 0px 600px 0px",
  });

  return (
    <section
      id="services"
      ref={ref}
      className={`${styles.section} ${inView ? styles.inView : ""}`}
    >
      <div className={styles.decor} aria-hidden="true">
        <div className={styles.orb} />
        <div className={styles.orbSecondary} />
      </div>

      <div className={styles.inner}>
        <div className={styles.headerBlock}>
          <p className={styles.eyebrow}>{SERVICES.eyebrow}</p>
          <h2 className={styles.heading}>
            <span className={styles.headingHighlight}>
              {SERVICES.headingLead}
            </span>{" "}
            {SERVICES.headingTail}
          </h2>
          <p className={styles.subheading}>{SERVICES.subheading}</p>
        </div>

        {/* Each card is `position: sticky` at the SAME top offset (set in
            CSS, not per-card here) — that's what makes each one fully
            cover the last as it scrolls up over it. A per-card increasing
            offset (an earlier version of this) breaks that: cards end up
            stacked with gaps instead of fully overlapping. */}
        <div className={styles.stackList}>
          {SERVICES.items.map((item, i) => (
            <article key={item.title} className={styles.card}>
              <div className={styles.media}>
                <ServiceMedia
                  src={item.image}
                  alt={item.title}
                  icon={item.icon as IconKey}
                />
                <span className={styles.mediaBadge}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.mediaExplore} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="19" x2="19" y2="5" />
                    <polyline points="9 5 19 5 19 15" />
                  </svg>
                </span>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
                <a href="#contact" className={styles.cardCta}>
                  <span>Build This With Us</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
