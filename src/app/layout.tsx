import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "RepoWise - AI-Ready Codebase Documentation",
  description:
    "Generate living context documentation that keeps AI coding assistants in sync with your codebase. Runs locally.",
  keywords:
    "AI documentation, codebase context, AI coding assistant, developer tools, code documentation",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "RepoWise - Your codebase, understood by AI",
    description:
      "Generate living context documentation that keeps AI agents in sync with your code",
    url: "https://repowise.ai",
    siteName: "RepoWise",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepoWise - AI-Ready Codebase Documentation",
    description:
      "Generate living context documentation that keeps AI coding assistants in sync with your codebase.",
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
      </body>
    </html>
  );
}
