"use client";

import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const installCommands = `# Install RepoWise
npm install -g repowise

# Generate context for your project
cd your-project
npx repowise create

# That's it! Check _bmad-context/`;

export default function GetStarted() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start in <span className="text-secondary">60 seconds</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            One command to generate AI-ready context for your entire codebase
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Code block header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-800">
              <span className="text-sm text-slate-500 font-mono">bash</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 text-sm text-slate-400 hover:text-white rounded-md hover:bg-slate-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-secondary" />
                    <span className="text-secondary">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code content */}
            <pre className="p-4 overflow-x-auto">
              <code className="font-mono text-sm">
                <span className="text-slate-500"># Install RepoWise</span>
                {"\n"}
                <span className="text-slate-300">npm install -g repowise</span>
                {"\n\n"}
                <span className="text-slate-500">
                  # Generate context for your project
                </span>
                {"\n"}
                <span className="text-slate-300">cd your-project</span>
                {"\n"}
                <span className="text-slate-300">npx repowise create</span>
                {"\n\n"}
                <span className="text-slate-500">
                  # That&apos;s it! Check _bmad-context/
                </span>
              </code>
            </pre>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
