"use client";

import { motion } from "framer-motion";
import {
  Folder,
  BookOpen,
  Map,
  Layers,
  MoreHorizontal,
} from "lucide-react";

const contextFiles = [
  { name: "project-overview.md", icon: BookOpen, color: "text-primary" },
  { name: "architecture.md", icon: Map, color: "text-secondary" },
  { name: "tech-stack.md", icon: Layers, color: "text-accent" },
];

export default function ContextFilesPreview() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What you get
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Comprehensive context files covering every aspect of your codebase
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Folder header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border-b border-slate-800">
              <Folder className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm text-primary">
                _bmad-context/
              </span>
            </div>

            {/* File list */}
            <div className="p-2">
              {contextFiles.map((file, index) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 1, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-default"
                >
                  <file.icon className={`w-4 h-4 ${file.color}`} />
                  <span className="font-mono text-sm text-slate-300">
                    {file.name}
                  </span>
                </motion.div>
              ))}
              
              {/* More files indicator */}
              <motion.div
                initial={{ opacity: 1, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.45 }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-default"
              >
                <MoreHorizontal className="w-4 h-4 text-slate-500" />
                <span className="font-mono text-sm text-slate-500">
                  and more...
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
