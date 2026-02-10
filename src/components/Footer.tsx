"use client";

import { motion } from "framer-motion";
import { Cpu, Heart, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 bg-slate-900 border-t border-slate-800/50 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-50" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">RepoWise</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <motion.a
                href="https://github.com/repowise"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </motion.a>
              <motion.a
                href="https://twitter.com/repowise"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span className="text-sm">Twitter</span>
              </motion.a>
            </div>

            {/* Info */}
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Free & open source • Coming soon</span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© 2026 RepoWise. MIT License.</p>
            <p className="flex items-center gap-1.5">
              Built with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              </motion.span>{" "}
              for the AI-assisted development community
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
