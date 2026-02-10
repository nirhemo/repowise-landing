"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const comparisons = [
  {
    feature: "AI-optimized output",
    repowise: true,
    cursorRules: false,
    swimm: false,
    codesee: false,
  },
  {
    feature: "Auto-sync with code",
    repowise: true,
    cursorRules: false,
    swimm: true,
    codesee: true,
  },
  {
    feature: "Validation tests",
    repowise: true,
    cursorRules: false,
    swimm: false,
    codesee: false,
  },
  {
    feature: "Free/OSS",
    repowise: true,
    cursorRules: "na",
    swimm: false,
    codesee: false,
  },
  {
    feature: "Works offline",
    repowise: true,
    cursorRules: true,
    swimm: false,
    codesee: false,
  },
  {
    feature: "BMAD integration",
    repowise: true,
    cursorRules: false,
    swimm: false,
    codesee: false,
  },
];

function StatusIcon({ value }: { value: boolean | string }) {
  if (value === "na") {
    return <Minus className="w-5 h-5 text-slate-500" />;
  }
  return value ? (
    <Check className="w-5 h-5 text-secondary" />
  ) : (
    <X className="w-5 h-5 text-red-400" />
  );
}

export default function ComparisonTable() {
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
            How we compare
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            RepoWise is purpose-built for AI agent workflows
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-4 px-4 text-slate-400 font-medium">
                  Feature
                </th>
                <th className="text-center py-4 px-4">
                  <span className="text-primary font-semibold">RepoWise</span>
                </th>
                <th className="text-center py-4 px-4 text-slate-400 font-medium">
                  Cursor Rules
                </th>
                <th className="text-center py-4 px-4 text-slate-400 font-medium">
                  Swimm
                </th>
                <th className="text-center py-4 px-4 text-slate-400 font-medium">
                  CodeSee
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 1, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-4 px-4 text-slate-300">{row.feature}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <StatusIcon value={row.repowise} />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <StatusIcon value={row.cursorRules} />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <StatusIcon value={row.swimm} />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <StatusIcon value={row.codesee} />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
