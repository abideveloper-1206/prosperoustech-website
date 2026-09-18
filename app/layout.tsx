import type { Metadata } from "next";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { SITE } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description:
    "Transform your technical vision into reality with our AI-first engineering approach. We build intelligent products, scalable platforms, and provide long-term technical partnership for ambitious founders.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Same Google Fonts <link> approach as the original hero HTML. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- this
            rule targets the pages-router _document.js; the app router has
            no equivalent, and this <link> approach mirrors the source HTML. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
