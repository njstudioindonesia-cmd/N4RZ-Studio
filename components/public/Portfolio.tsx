"use client";

import { motion } from "framer-motion";
import { PortfolioItem } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function Portfolio({ data }: { data: PortfolioItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="portfolio" className="py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-24 flex flex-col sm:flex-row justify-between sm:items-end gap-6 border-b border-charcoal/10 pb-8 md:pb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl max-w-lg leading-tight">
            Selected Works
          </h2>
          <Link href="/portfolio" className="inline-flex items-center gap-3 text-sm tracking-widest uppercase font-semibold hover-underline w-fit">
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-24">
          {data.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-16 items-start md:items-center group`}
            >
              {/* Image Container - Mobile First: 100% width, aspect ratio video on mobile, 4/3 on desktop */}
              <Link href={`/portfolio/${item.slug}`} className="w-full md:w-3/5 overflow-hidden relative aspect-video md:aspect-[4/3] bg-charcoal/5 rounded-lg md:rounded-none">
                <Image 
                  src={item.coverImage} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                />
                <div className="hidden md:block absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-500" />
              </Link>

              {/* Text Container - Stacked vertically on mobile */}
              <div className="w-full md:w-2/5 flex flex-col items-start pt-2 md:pt-0">
                <div className="flex items-center gap-3 mb-4 md:mb-6 flex-wrap">
                  <span className="text-xs font-semibold tracking-widest uppercase text-deep-amber bg-deep-amber/10 px-3 py-1 rounded-full md:bg-transparent md:px-0 md:py-0 md:rounded-none">
                    {item.category}
                  </span>
                  <span className="hidden md:block w-8 h-[1px] bg-charcoal/20"></span>
                  <span className="text-xs font-medium tracking-widest text-charcoal/50">
                    {item.year}
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl mb-3 md:mb-6 group-hover:text-deep-amber transition-colors duration-300">
                  <Link href={`/portfolio/${item.slug}`}>{item.title}</Link>
                </h3>
                
                {item.description && (
                  <p className="text-charcoal/60 font-light mb-6 md:mb-8 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
                    {item.description}
                  </p>
                )}

                <Link 
                  href={`/portfolio/${item.slug}`} 
                  className="inline-flex items-center gap-2 text-sm tracking-widest uppercase font-semibold hover-underline group/link"
                >
                  Explore Case
                  <svg className="transform group-hover/link:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
