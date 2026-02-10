"use client";

import { motion } from "framer-motion";
import { Github, BookOpen, Cpu } from "lucide-react";
import Link from "next/link";
import { trackClick } from "@/lib/analytics";

export default function Navigation() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:glow-primary transition-all duration-300">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">RepoWise</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/nirhemo/repowise"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("nav_github")}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
            <Link
              href="https://docs.repowise.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("nav_docs")}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span className="hidden sm:inline">Docs</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
