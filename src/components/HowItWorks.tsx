"use client";

import { motion } from "framer-motion";
import { Plus, GitCommit, CheckCircle, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: Plus,
    label: "CREATE",
    command: "npx repowise create",
    description: "Generate context from your codebase",
    color: "primary",
  },
  {
    icon: GitCommit,
    label: "SYNC",
    command: "git commit",
    description: "Auto-hook keeps docs fresh",
    color: "secondary",
  },
  {
    icon: CheckCircle,
    label: "VALIDATE",
    command: "npx repowise validate",
    description: "Ensure context matches code",
    color: "accent",
  },
];

export default function HowItWorks() {
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
            Three commands.{" "}
            <span className="text-primary">Living documentation.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Simple workflow that fits naturally into your development process
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex items-center"
            >
              {/* Step card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-72 hover:border-slate-700 transition-colors">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    step.color === "primary"
                      ? "bg-primary/10"
                      : step.color === "secondary"
                      ? "bg-secondary/10"
                      : "bg-accent/10"
                  }`}
                >
                  <step.icon
                    className={`w-6 h-6 ${
                      step.color === "primary"
                        ? "text-primary"
                        : step.color === "secondary"
                        ? "text-secondary"
                        : "text-accent"
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-sm font-bold ${
                      step.color === "primary"
                        ? "text-primary"
                        : step.color === "secondary"
                        ? "text-secondary"
                        : "text-accent"
                    }`}
                  >
                    {index + 1}. {step.label}
                  </span>
                </div>

                <code className="block bg-slate-950 px-3 py-2 rounded text-sm font-mono text-slate-300 mb-3">
                  {step.command}
                </code>

                <p className="text-slate-400 text-sm">{step.description}</p>
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <ChevronRight className="hidden lg:block w-8 h-8 text-slate-700 mx-2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
