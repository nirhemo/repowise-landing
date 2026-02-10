"use client";

import { motion } from "framer-motion";
import { Search, BookX, RefreshCw } from "lucide-react";

const problems = [
  {
    icon: Search,
    title: "No Context",
    description: "AI reads code but misses the 'why' — decisions, patterns, and architectural intent remain hidden.",
  },
  {
    icon: BookX,
    title: "Stale Docs",
    description: "Documentation drifts from reality. By the time docs are updated, the code has moved on.",
  },
  {
    icon: RefreshCw,
    title: "Manual Sync",
    description: "Keeping context updated is tedious. Manual documentation becomes a chore nobody wants.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            AI assistants are{" "}
            <span className="text-accent">flying blind</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Without proper context, even the smartest AI makes avoidable mistakes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
              <p className="text-slate-400">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
