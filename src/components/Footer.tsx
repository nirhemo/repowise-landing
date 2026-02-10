"use client";

import { motion } from "framer-motion";
import { Cpu, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">RepoWise</span>
            </div>

            {/* Info */}
            <div className="text-slate-400 text-sm">
              Free & open source • Coming soon
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© 2026 RepoWise</p>
            <p className="flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-400" /> for the
              AI-assisted development community
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
