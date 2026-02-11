"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Does RepoWise have access to my source code?",
    answer:
      "RepoWise reads your repository to generate context summaries, structured descriptions of architecture, patterns, and conventions. Your source code is processed but never stored on our servers.",
  },
  {
    question: "How does context reach my AI tools?",
    answer:
      "RepoWise generates structured context files that live in your repo or a connected workspace. Your AI tools (Cursor, Claude, Copilot) read them automatically. No plugins or extensions needed.",
  },
  {
    question: "What languages and frameworks are supported?",
    answer:
      "RepoWise is language-agnostic. It analyzes code structure, architecture patterns, and conventions regardless of your stack. JavaScript, Python, Go, Rust, Java, and more.",
  },
  {
    question: "When is launch?",
    answer:
      "We're targeting early access in Q2 2026. Waitlist members will be invited in order. Refer friends to move up the list.",
  },
  {
    question: "How much will it cost?",
    answer:
      "Pricing will be announced closer to launch. We're building affordable plans for individual developers and teams. Waitlist members get early access pricing.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-white font-medium pr-8 group-hover:text-primary transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="text-slate-400 text-sm leading-relaxed pb-5">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-5">Frequently asked questions</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {faqs.map((faq) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
