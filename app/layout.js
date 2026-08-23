import "../styles/globals.css";

export const metadata = {
  title: "Nick Fan — Full-Stack Software Engineer",
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
    title: "Nick Fan — Full-Stack Software Engineer",
    description:
      "Portfolio of Nick Fan, a full-stack software engineer working with React, Node.js, and TypeScript.",
    url: "https://nickfan.dev",
    siteName: "Nick Fan Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nick Fan — Full-Stack Software Engineer",
    description:
      "Portfolio of Nick Fan, a full-stack software engineer working with React, Node.js, and TypeScript.",
  },
};

export const viewport = {
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
