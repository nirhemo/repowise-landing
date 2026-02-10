"use client";

import { motion } from "framer-motion";
import { BookOpen, Cpu, Github } from "lucide-react";
import Link from "next/link";
import { trackClick } from "@/lib/analytics";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300"
            >
              <Cpu className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white">RepoWise</span>
          </Link>

          <div className="flex items-center gap-2">
            <motion.a
              href="https://github.com/repowise"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => trackClick("nav_github")}
              className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">GitHub</span>
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); trackClick("nav_docs"); }}
                className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Docs</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
