"use client";

import { motion } from "framer-motion";
import {
  Folder,
  FolderOpen,
  MoreVertical,
} from "lucide-react";

const contextFolders = [
  { name: "architecture", color: "text-primary" },
  { name: "patterns", color: "text-secondary" },
  { name: "conventions", color: "text-accent" },
];

export default function ContextFilesPreview() {
  return (
    <section id="context" className="py-28 bg-slate-950 relative overflow-hidden">
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
          className="max-w-xl mx-auto"
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
                  <FolderOpen className="w-5 h-5 text-primary" />
                  <span className="font-mono text-sm text-primary font-medium">
                    .repowise/
                  </span>
                </div>
              </div>

              {/* Folder list */}
              <div className="p-4">
                {contextFolders.map((folder, index) => (
                  <motion.div
                    key={folder.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-800/60 transition-all duration-200 cursor-default"
                  >
                    {/* Tree line */}
                    <span className="text-slate-600 font-mono text-sm">├</span>
                    
                    {/* Folder icon */}
                    <Folder className={`w-5 h-5 ${folder.color}`} />
                    
                    {/* Folder name */}
                    <span className="font-mono text-sm text-slate-300">
                      {folder.name}/
                    </span>
                  </motion.div>
                ))}
                
                {/* Vertical dots indicating more */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex items-center gap-3 px-3 py-2"
                >
                  <span className="text-slate-600 font-mono text-sm">│</span>
                  <div className="flex flex-col items-center gap-1 ml-1">
                    <MoreVertical className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="text-slate-500 text-sm ml-2">
                    and more context files...
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
