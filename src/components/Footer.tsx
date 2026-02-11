"use client";

import { motion } from "framer-motion";

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
            <div className="flex flex-col items-center md:items-start gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Logo_transperent.svg"
                alt="RepoWise"
                className="h-12 w-auto"
              />
              <p className="text-slate-500 text-sm">
                Continuous codebase intelligence for AI coding tools
              </p>
            </div>

            {/* Info */}
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>Early access Q2 2026</span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-500">
            <p>© 2026 RepoWise</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
