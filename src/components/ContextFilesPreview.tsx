"use client";

import { motion } from "framer-motion";
import {
  Folder,
  FileText,
  Map,
  Layers,
  Code2,
  TestTube,
  Wrench,
  BookOpen,
  GitBranch,
  Settings,
} from "lucide-react";

const contextFiles = [
  { name: "project-overview.md", icon: BookOpen, color: "text-primary", preview: "# Project Overview\n## Purpose\nThis project..." },
  { name: "architecture.md", icon: Map, color: "text-secondary", preview: "# Architecture\n## System Design\nThe application..." },
  { name: "tech-stack.md", icon: Layers, color: "text-accent", preview: "# Tech Stack\n## Frontend\n- React 18..." },
  { name: "coding-patterns.md", icon: Code2, color: "text-primary", preview: "# Coding Patterns\n## State Management\nWe use..." },
  { name: "testing-strategy.md", icon: TestTube, color: "text-secondary", preview: "# Testing Strategy\n## Unit Tests\nAll..." },
  { name: "development-setup.md", icon: Wrench, color: "text-accent", preview: "# Development Setup\n## Prerequisites\n- Node.js..." },
  { name: "conventions.md", icon: FileText, color: "text-primary", preview: "# Conventions\n## Naming\nUse camelCase..." },
  { name: "git-workflow.md", icon: GitBranch, color: "text-secondary", preview: "# Git Workflow\n## Branches\nMain branch..." },
  { name: "config.json", icon: Settings, color: "text-slate-400", preview: '{\n  "version": "1.0"...' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function ContextFilesPreview() {
  return (
    <section className="py-28 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-5">
            What you get
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Comprehensive context files covering every aspect of your codebase
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            
            <div className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
              {/* Folder header */}
              <div className="flex items-center gap-3 px-5 py-4 bg-slate-800/60 border-b border-slate-700/50">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Folder className="w-5 h-5 text-primary" />
                  <span className="font-mono text-sm text-primary font-medium">
                    _bmad-context/
                  </span>
                </div>
                <span className="ml-auto text-xs text-slate-500 font-mono">
                  9 files
                </span>
              </div>

              {/* File list */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-3"
              >
                {contextFiles.map((file, index) => (
                  <motion.div
                    key={file.name}
                    variants={itemVariants}
                    className="group/item relative"
                  >
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800/60 transition-all duration-200 cursor-default">
                      {/* Tree line indicator */}
                      <div className="flex items-center justify-center w-4 text-slate-600">
                        {index === contextFiles.length - 1 ? "└" : "├"}
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                        file.color === "text-primary"
                          ? "bg-primary/10"
                          : file.color === "text-secondary"
                          ? "bg-secondary/10"
                          : file.color === "text-accent"
                          ? "bg-accent/10"
                          : "bg-slate-700/50"
                      }`}>
                        <file.icon className={`w-3.5 h-3.5 ${file.color}`} />
                      </div>
                      
                      {/* Filename */}
                      <span className="font-mono text-sm text-slate-300 group-hover/item:text-white transition-colors">
                        {file.name}
                      </span>
                      
                      {/* Preview tooltip on hover */}
                      <div className="hidden sm:block ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-mono truncate max-w-[150px]">
                            {file.preview.split('\n')[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Summary line */}
                <motion.div
                  variants={itemVariants}
                  className="mt-4 pt-4 border-t border-slate-800"
                >
                  <div className="flex items-center justify-between px-3 text-xs">
                    <span className="text-slate-500">
                      <span className="text-secondary font-medium">12 files</span> total • AI-optimized format
                    </span>
                    <span className="text-slate-600">
                      ~15KB • &lt;5 seconds to generate
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
