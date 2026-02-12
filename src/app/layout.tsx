import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "RepoWise | The Context Engine | Continuous Codebase Intelligence",
  description:
    "The always-on context layer between your codebase and AI. Production watcher auto-syncs on every merge. Works with Cursor, Claude, Copilot, and any AI tool.",
  keywords:
    "context engine, codebase intelligence, production watcher, Cursor context, Claude context, Copilot context, AI documentation, codebase context, AI coding assistant, developer tools",
  authors: [{ name: "RepoWise" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "RepoWise | The Context Engine | Continuous Codebase Intelligence",
    description:
      "The always-on context layer between your codebase and AI. Production watcher auto-syncs on every merge. Works with Cursor, Claude, Copilot, and any AI tool.",
    url: "https://www.repowise.ai",
    siteName: "RepoWise",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.repowise.ai/images/og-image-v6.jpg",
        width: 1200,
        height: 630,
        alt: "RepoWise - Continuous codebase intelligence for AI coding tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RepoWise | The Context Engine | Continuous Codebase Intelligence",
    description:
      "The always-on context layer between your codebase and AI. Production watcher auto-syncs on every merge. Works with Cursor, Claude, Copilot, and any AI tool.",
    images: ["https://www.repowise.ai/images/og-image-v6.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Plausible Analytics - privacy-friendly */}
        <Script
          defer
          data-domain="repowise.ai"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        {/* Define plausible function for custom events */}
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-900 text-slate-50`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
