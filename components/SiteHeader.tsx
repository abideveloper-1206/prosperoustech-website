"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { NAV_LINKS, SITE } from "@/lib/content";

const SCROLL_THRESHOLD = 40;

export default function SiteHeader() {
  const [revealed, setRevealed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Compact the header into a logo + Build With Us + menu-icon bar once the
  // page scrolls past the hero's top area; back to the full nav at the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The desktop dropdown only exists in the scrolled/condensed state — if
  // the user scrolls back to the top while it's open, close it with it.
  useEffect(() => {
    if (!scrolled) setDropdownOpen(false);
  }, [scrolled]);

  // Desktop dropdown: close on outside click or Escape.
  useEffect(() => {
    if (!dropdownOpen) return;

    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dropdownOpen]);

  // Lock background scroll while the mobile menu is open, close it on
  // Escape, and auto-close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const mql = window.matchMedia("(min-width: 640px)");
    const onBreakpointChange = () => {
      if (mql.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    mql.addEventListener("change", onBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      mql.removeEventListener("change", onBreakpointChange);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`${styles.nav} ${revealed ? styles.revealed : ""} ${
          scrolled ? styles.scrolled : ""
        }`}
      >
        <Link
          href="/"
          className={styles.brand}
          onClick={() => setMenuOpen(false)}
        >
          <span className={styles.logoStack}>
            <Image
              src="/logo-1.png"
              alt={SITE.name}
              width={960}
              height={416}
              priority
              quality={100}
              className={styles.brandLogo}
            />
            {/* Recolors the (flat white) logo PNG to the brand gradient via
                a CSS mask, for the scrolled/glass header state — plain white
                would nearly disappear once the bar turns translucent over a
                light section. See .brandLogoTint in the CSS. */}
            <span className={styles.brandLogoTint} aria-hidden="true" />
          </span>
        </Link>

        <nav className={styles.navPill}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="#contact" className={styles.pillBtn}>
            Build With Us
          </Link>

          {/* Condensed-state trigger: only visible once `.scrolled` is on
              and we're at the desktop breakpoint (see CSS). Opens on hover
              or click, matching how a persistent top nav usually behaves. */}
          <div
            ref={dropdownRef}
            className={styles.navDropdownWrap}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              className={`${styles.navToggle} ${
                dropdownOpen ? styles.menuOpen : ""
              }`}
              aria-expanded={dropdownOpen}
              aria-controls="desktop-menu"
              aria-label={dropdownOpen ? "Close menu" : "Open menu"}
              onClick={() =>
                // Always open, never toggle-close here: a mouse click is
                // preceded by a hover that already opened it, so a naive
                // toggle would flip it straight back shut. Closing is
                // handled by mouseleave / outside click / Escape instead.
                setDropdownOpen(true)
              }
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>

            <nav
              id="desktop-menu"
              className={`${styles.desktopDropdown} ${
                dropdownOpen ? styles.open : ""
              }`}
              aria-hidden={!dropdownOpen}
            >
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.desktopDropdownLink}
                  style={{
                    transitionDelay: dropdownOpen ? `${60 + i * 45}ms` : "0ms",
                  }}
                  onClick={() => setDropdownOpen(false)}
                  tabIndex={dropdownOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <button
          type="button"
          className={`${styles.menuButton} ${menuOpen ? styles.menuOpen : ""}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </header>

      {/*
        Rendered outside <header> on purpose: the header animates in with a
        CSS `transform`, and a `transform` on an ancestor becomes the
        containing block for `position: fixed` descendants. Nesting these
        inside the header would anchor them to its small animated box
        instead of the viewport.
      */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.open : ""}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      <nav
        id="mobile-menu"
        className={`${styles.mobilePanel} ${menuOpen ? styles.open : ""}`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : "0ms" }}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="#contact"
          className={styles.mobileCta}
          style={{
            transitionDelay: menuOpen
              ? `${80 + NAV_LINKS.length * 60}ms`
              : "0ms",
          }}
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? 0 : -1}
        >
          Build With Us
        </Link>
      </nav>
    </>
  );
}
