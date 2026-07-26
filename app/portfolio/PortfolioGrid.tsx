"use client";

import { useState } from "react";
import { PortfolioItem } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState<"ALL" | "COMPLETED" | "IN_PROGRESS">("ALL");

  const filteredItems = items.filter(item => {
    if (filter === "ALL") return true;
    return item.status === filter;
  });

  return (
    <section className="pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto min-h-[50vh]">
      <div className="flex gap-6 mb-12 border-b border-gray-200 pb-4 overflow-x-auto">
        {["ALL", "COMPLETED", "IN_PROGRESS"].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f as any)}
            className={`text-sm font-semibold tracking-widest uppercase pb-2 border-b-2 transition-colors whitespace-nowrap ${filter === f ? 'border-deep-amber text-charcoal' : 'border-transparent text-gray-400 hover:text-charcoal hover:border-gray-300'}`}
          >
            {f.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <AnimatePresence mode="popLayout">
          {filteredItems.map(item => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group flex flex-col"
            >
              <Link href={`/portfolio/${item.slug}`} className="w-full aspect-[4/3] relative overflow-hidden bg-gray-100 rounded-xl mb-6">
                <Image 
                  src={item.coverImage} 
                  alt={item.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                  {item.status === 'COMPLETED' ? 'Completed' : 'In Progress'}
                </div>
              </Link>
              
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-widest uppercase text-deep-amber">
                  {item.category}
                </span>
                <span className="w-6 h-[1px] bg-charcoal/20"></span>
                <span className="text-xs font-medium tracking-widest text-charcoal/50">
                  {item.year}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-display font-medium mb-3 group-hover:text-deep-amber transition-colors">
                <Link href={`/portfolio/${item.slug}`}>{item.title}</Link>
              </h3>
              
              {item.description && (
                <p className="text-gray-500 font-light leading-relaxed line-clamp-2 mb-6">
                  {item.description}
                </p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredItems.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center py-20 text-gray-400 font-light text-lg"
        >
          No projects found in this category.
        </motion.div>
      )}
    </section>
  );
}
