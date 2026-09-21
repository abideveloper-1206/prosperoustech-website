import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./SiteFooter.module.css";
import { FOOTER, SITE } from "@/lib/content";

// One icon per FOOTER.social entry, matched by label.
const SOCIAL_ICONS: Record<string, ReactNode> = {
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10v6.5M7.5 7.6v.01M11.5 16.5V13a2 2 0 0 1 4 0v3.5M11.5 10v6.5" />
    </>
  ),
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  Facebook: (
    <path d="M14 21v-7h2.5l.5-3H14V9c0-.86.24-1.45 1.47-1.45H17V4.9c-.26-.03-1.15-.11-2.19-.11-2.17 0-3.66 1.32-3.66 3.76V11H9v3h2.15v7Z" />
  ),
};

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandMark}>
              <Image
                src="/logo-1.png"
                alt={SITE.name}
                width={960}
                height={416}
                className={styles.logo}
              />
            </Link>
            <p className={styles.description}>{FOOTER.description}</p>
            <address className={styles.address}>
              <a href={`mailto:${FOOTER.contact.email}`}>
                {FOOTER.contact.email}
              </a>
              <a href={`tel:${FOOTER.contact.phone.replace(/\s+/g, "")}`}>
                {FOOTER.contact.phone}
              </a>
              <span className={styles.muted}>{FOOTER.contact.address}</span>
            </address>
          </div>

          {FOOTER.columns.map((column) => (
            <nav className={styles.navCol} key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.connectCol}>
            <h4>Connect</h4>
            <p>Follow along, or reach out directly.</p>
            <div className={styles.socials}>
              {FOOTER.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {SOCIAL_ICONS[social.label]}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{FOOTER.copyright}</p>
          <p className={styles.tagline}>{FOOTER.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
