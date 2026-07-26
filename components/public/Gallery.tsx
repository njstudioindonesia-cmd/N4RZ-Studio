"use client";

import { motion } from "framer-motion";
import { GalleryItem } from "@prisma/client";
import Image from "next/image";

export default function Gallery({ data }: { data: GalleryItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">Visual Explorations</h2>
          <p className="text-charcoal/60 max-w-lg font-light text-sm md:text-base">
            A curated selection of our creative experiments, photography, and behind-the-scenes moments.
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {data.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              className="break-inside-avoid relative group overflow-hidden bg-charcoal/5 rounded-lg md:rounded-sm aspect-[4/5]"
            >
              <Image 
                src={item.imageUrl} 
                alt={item.category || "Gallery Image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                {item.category && (
                  <span className="text-off-white font-medium tracking-widest uppercase text-xs border border-off-white/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {item.category}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
