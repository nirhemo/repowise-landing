"use client";

import { motion } from "framer-motion";
import { Plus, GitCommit, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Plus,
    label: "CREATE",
    command: "npx repowise create",
    description: "Generate context from codebase",
    color: "primary",
  },
  {
    icon: GitCommit,
    label: "SYNC",
    command: "git commit",
    description: "Auto-sync on every commit",
    color: "secondary",
  },
  {
    icon: CheckCircle,
    label: "VALIDATE",
    command: "npx repowise validate",
    description: "Verify context matches code",
    color: "accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="heading-lg mb-5">
            Three commands.{" "}
            <span className="text-gradient-primary">Living documentation.</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Simple workflow that fits naturally into your development process
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-0.5">
            <div className="h-full bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 rounded-full" />
            {/* Animated glow on the line */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-sm"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                variants={itemVariants}
                className="w-full"
              >
                {/* Step card */}
                <div className="group relative h-full">
                  {/* Card glow */}
                  <div className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 ${
                    step.color === "primary"
                      ? "bg-primary/20"
                      : step.color === "secondary"
                      ? "bg-secondary/20"
                      : "bg-accent/20"
                  }`} />
                  
                  <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-7 h-full hover:border-slate-700 transition-all duration-300 hover-lift flex flex-col">
                    {/* Step number badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`step-badge ${
                        step.color === "primary"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : step.color === "secondary"
                          ? "bg-secondary/20 text-secondary border border-secondary/30"
                          : "bg-accent/20 text-accent border border-accent/30"
                      }`}>
                        {index + 1}
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        step.color === "primary"
                          ? "bg-primary/10"
                          : step.color === "secondary"
                          ? "bg-secondary/10"
                          : "bg-accent/10"
                      }`}>
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
                    </div>

                    {/* Label */}
                    <div className={`text-sm font-bold tracking-wide mb-3 ${
                      step.color === "primary"
                        ? "text-primary"
                        : step.color === "secondary"
                        ? "text-secondary"
                        : "text-accent"
                    }`}>
                      {step.label}
                    </div>

                    {/* Command */}
                    <code className="block bg-slate-950/80 border border-slate-800 px-4 py-3 rounded-xl text-sm font-mono text-slate-300 mb-4 group-hover:border-slate-700 transition-colors text-center whitespace-nowrap">
                      {step.command}
                    </code>

                    {/* Description */}
                    <p className="body-md text-sm mt-auto">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
