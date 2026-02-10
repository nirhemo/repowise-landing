"use client";

import { motion } from "framer-motion";
import {
  Bot,
  FolderOpen,
  RefreshCcw,
  ShieldCheck,
  Heart,
  Laptop,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-First Format",
    description:
      "Context optimized for token efficiency. Structured for how AI agents actually read and process information.",
  },
  {
    icon: FolderOpen,
    title: "12 Context Files",
    description:
      "Comprehensive coverage: architecture, patterns, tech stack, conventions, testing strategy, and more.",
  },
  {
    icon: RefreshCcw,
    title: "Auto-Sync",
    description:
      "Git hooks keep documentation fresh with every commit. No manual updates required.",
  },
  {
    icon: ShieldCheck,
    title: "Validation Tests",
    description:
      "Built-in tests ensure your context files stay accurate and aligned with actual code.",
  },
  {
    icon: Heart,
    title: "Free & OSS",
    description:
      "MIT licensed. No vendor lock-in, no subscriptions. Own your documentation forever.",
  },
  {
    icon: Laptop,
    title: "Runs Locally",
    description:
      "Your code never leaves your machine. Complete privacy and security by default.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Built for AI agents,{" "}
            <span className="text-secondary">not just humans</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every feature designed to make AI coding assistants more effective
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800/30 border border-slate-800 rounded-xl p-6 hover:border-primary/50 hover:bg-slate-800/50 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
