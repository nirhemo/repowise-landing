"use client";

import { motion } from "framer-motion";
import { Search, BookX, RefreshCw } from "lucide-react";

const problems = [
  {
    icon: Search,
    title: "No Context",
    description: "AI reads code but misses the 'why' — decisions, patterns, and architectural intent remain hidden.",
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: BookX,
    title: "Stale Docs",
    description: "Documentation drifts from reality. By the time docs are updated, the code has moved on.",
    color: "accent",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: RefreshCw,
    title: "Manual Sync",
    description: "Keeping context updated is tedious. Manual documentation becomes a chore nobody wants.",
    color: "secondary",
    gradient: "from-secondary/20 to-secondary/5",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Problem() {
  return (
    <section id="problem" className="py-28 bg-slate-900 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-5">
            AI assistants are{" "}
            <span className="text-gradient-accent">flying blind</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Without proper context, even the smartest AI makes avoidable mistakes
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${problem.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />
              
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-7 h-full hover:border-slate-600 transition-all duration-300 hover-lift">
                {/* Icon with circular background */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                  problem.color === "primary"
                    ? "bg-primary/10 border border-primary/20"
                    : problem.color === "secondary"
                    ? "bg-secondary/10 border border-secondary/20"
                    : "bg-accent/10 border border-accent/20"
                }`}>
                  <problem.icon className={`w-7 h-7 ${
                    problem.color === "primary"
                      ? "text-primary"
                      : problem.color === "secondary"
                      ? "text-secondary"
                      : "text-accent"
                  }`} />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-white">{problem.title}</h3>
                <p className="body-md">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
