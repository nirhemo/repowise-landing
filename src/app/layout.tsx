import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
    "Generate living context documentation that keeps AI coding assistants in sync with your codebase. Free, open source, runs locally.",
  keywords:
    "AI documentation, codebase context, AI coding assistant, developer tools, code documentation, BMAD",
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
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-900 text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
