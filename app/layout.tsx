import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Lato } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Nick Fan - Full-Stack Software Engineer",
  description:
    "Portfolio of Nick Fan, a full-stack software engineer working with React, Node.js, and TypeScript.",
  keywords: [
    "Nick Fan",
    "portfolio",
    "software engineer",
    "full-stack",
    "react",
    "next.js",
    "typescript",
    "node.js",
  ],
  metadataBase: new URL("https://nickfan.dev"),
  openGraph: {
    title: "Nick Fan - Full-Stack Software Engineer",
    description:
      "Portfolio of Nick Fan, a full-stack software engineer working with React, Node.js, and TypeScript.",
    url: "https://nickfan.dev",
    siteName: "Nick Fan Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nick Fan - Full-Stack Software Engineer",
    description:
      "Portfolio of Nick Fan, a full-stack software engineer working with React, Node.js, and TypeScript.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nick Fan",
  jobTitle: "Full-Stack Software Engineer",
  url: "https://nickfan.dev",
  sameAs: [
    "https://github.com/fanhuanliang",
    "https://www.linkedin.com/in/fanhuanliang/",
  ],
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={lato.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
