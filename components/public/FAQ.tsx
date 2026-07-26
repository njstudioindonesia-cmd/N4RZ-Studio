"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ({ faqs, title = "Frequently Asked Questions" }: { faqs: FAQItem[], title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-off-white text-charcoal">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display mb-12 text-center text-charcoal tracking-tight">{title}</h2>
        
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border border-charcoal/10 rounded-2xl overflow-hidden transition-colors ${isOpen ? 'bg-charcoal/5 border-charcoal/20' : 'bg-white hover:border-charcoal/20'}`}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <span className="text-charcoal/50 flex-shrink-0">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-charcoal/70 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
