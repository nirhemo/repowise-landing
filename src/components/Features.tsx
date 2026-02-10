"use client";

import { motion } from "framer-motion";
import {
  Bot,
  FolderOpen,
  RefreshCcw,
  ShieldCheck,
  Laptop,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-First Format",
    description:
      "Context optimized for token efficiency. Structured for how AI agents actually read and process information.",
    color: "primary",
  },
  {
    icon: FolderOpen,
    title: "Context Files",
    description:
      "Comprehensive coverage: architecture, patterns, tech stack, conventions, testing strategy, and more.",
    color: "secondary",
  },
  {
    icon: RefreshCcw,
    title: "Auto-Sync",
    description:
      "Syncs on every merge to production. Works with GitHub, GitLab, and Bitbucket.",
    color: "accent",
  },
  {
    icon: ShieldCheck,
    title: "Validation Tests",
    description:
      "Built-in tests ensure your context files stay accurate and aligned with actual code.",
    color: "primary",
  },
  {
    icon: BookOpen,
    title: "Human Readable",
    description:
      "AI agent builds documentation that humans love to read. Clear, organized, always up-to-date.",
    color: "secondary",
  },
  {
    icon: Laptop,
    title: "Runs Locally",
    description:
      "Your code never leaves your machine. Complete privacy and security by default.",
    color: "accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-28 bg-slate-900 relative overflow-hidden">
      {/* Subtle background gradients */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-5">
            The context layer{" "}
            <span className="text-gradient-primary">your AI needs</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Every feature designed to make AI coding assistants more effective
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              {/* Gradient border on hover */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Card content */}
              <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 h-full border border-slate-800/50 hover:bg-slate-800/60 transition-all duration-300">
                {/* Icon with circular gradient background */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative overflow-hidden ${
                  feature.color === "primary"
                    ? "bg-primary/10"
                    : feature.color === "secondary"
                    ? "bg-secondary/10"
                    : "bg-accent/10"
                }`}>
                  {/* Subtle inner glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    feature.color === "primary"
                      ? "bg-primary/20"
                      : feature.color === "secondary"
                      ? "bg-secondary/20"
                      : "bg-accent/20"
                  }`} />
                  <feature.icon className={`w-6 h-6 relative z-10 ${
                    feature.color === "primary"
                      ? "text-primary"
                      : feature.color === "secondary"
                      ? "text-secondary"
                      : "text-accent"
                  }`} />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
