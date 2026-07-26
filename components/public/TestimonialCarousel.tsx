"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Testimonial } from "@prisma/client";

export default function TestimonialCarousel({ data }: { data: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!data || data.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % data.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);

  return (
    <section className="py-32 bg-charcoal text-off-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Client Stories</h2>
          <p className="text-gray-400 font-sans tracking-widest uppercase text-sm">Don't just take our word for it</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-10">
                {Array.from({ length: data[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-deep-amber fill-deep-amber" />
                ))}
              </div>
              <blockquote className="text-xl md:text-3xl font-display font-light leading-relaxed mb-12 text-gray-300 max-w-4xl mx-auto">
                "{data[currentIndex].content}"
              </blockquote>
              
              <div>
                <div className="font-bold text-xl tracking-wide">{data[currentIndex].client}</div>
                <div className="text-deep-amber text-sm font-medium mt-2 uppercase tracking-wider">
                  {data[currentIndex].role} {data[currentIndex].company && `@ ${data[currentIndex].company}`}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-6 mt-16">
            <button 
              onClick={prev}
              className="p-4 rounded-full border border-gray-600 hover:bg-white hover:border-white hover:text-charcoal transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="p-4 rounded-full border border-gray-600 hover:bg-white hover:border-white hover:text-charcoal transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
