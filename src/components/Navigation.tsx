"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { trackClick } from "@/lib/analytics";
import { useEffect, useState } from "react";

const sections = [
  { name: "Problem", href: "#problem" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Features", href: "#features" },
  { name: "Compare", href: "#compare" },
  { name: "Context", href: "#context" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionName: string) => {
    trackClick(`nav_${sectionName.toLowerCase().replace(/\s+/g, '_')}`);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-slate-950/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Logo_transperent.svg"
                alt="RepoWise"
                className="h-16 w-auto"
              />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1 gap-3">
            {sections.map((section) => (
              <motion.a
                key={section.name}
                href={section.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick(section.name)}
                className="px-4 py-2 text-base font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                {section.name}
              </motion.a>
            ))}
          </div>
          
          {/* CTA Button — visible on all screen sizes */}
          <motion.a
            href="#hero-form"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick("cta")}
            className="inline-flex items-center px-4 py-2 md:px-5 md:py-2.5 bg-primary hover:bg-primary-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            Get Early Access
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
