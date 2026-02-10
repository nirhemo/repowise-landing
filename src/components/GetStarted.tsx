"use client";

import { motion } from "framer-motion";
import { Copy, Check, Terminal } from "lucide-react";
import { useState } from "react";

const codeLines = [
  { type: "comment", content: "# Install RepoWise" },
  { type: "command", content: "npm install -g repowise" },
  { type: "empty", content: "" },
  { type: "comment", content: "# Generate context for your project" },
  { type: "command", content: "cd your-project" },
  { type: "command", content: "npx repowise create" },
  { type: "empty", content: "" },
  { type: "comment", content: "# That's it! Check .repowise-context/" },
];

const installCommands = `# Install RepoWise
npm install -g repowise

# Generate context for your project
cd your-project
npx repowise create

# That's it! Check .repowise-context/`;

export default function GetStarted() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="get-started" className="py-28 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-secondary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h2 className="heading-lg mb-5">
            Start in <span className="text-gradient-primary">60 seconds</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            One command to generate AI-ready context for your entire codebase
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Animated glow effect */}
          <div className="code-glow rounded-2xl">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-2xl blur-2xl opacity-60" />
          </div>
          
          <div className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Code block header */}
            <div className="flex items-center justify-between px-5 py-4 bg-slate-800/60 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Terminal className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-500 font-mono">bash</span>
                </div>
              </div>
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200 border border-slate-600/50"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-secondary" />
                    <span className="text-secondary font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Code content with line numbers */}
            <div className="p-5 overflow-x-auto">
              <div className="font-mono text-sm">
                {codeLines.map((line, index) => (
                  <div key={index} className="flex">
                    {/* Line number */}
                    <span className="w-8 text-right pr-4 text-slate-600 select-none shrink-0">
                      {index + 1}
                    </span>
                    {/* Line content */}
                    <span className={`${
                      line.type === "comment"
                        ? "text-slate-500"
                        : line.type === "command"
                        ? "text-slate-300"
                        : ""
                    }`}>
                      {line.content}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bottom accent line */}
            <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-50" />
          </div>
        </motion.div>

        {/* CTA below code block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-slate-500 text-sm mb-4">
            Works with any codebase • No configuration required
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <span className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              TypeScript
            </span>
            <span className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Python
            </span>
            <span className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Go
            </span>
            <span className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              + more
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
