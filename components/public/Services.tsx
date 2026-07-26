"use client";

import { motion } from "framer-motion";
import { Service } from "@prisma/client";
import { useState } from "react";

export default function Services({ data }: { data: Service[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!data || data.length === 0) return null;

  return (
    <section id="services" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-charcoal text-off-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl max-w-lg leading-tight">
            Capabilities & <br className="hidden md:block" /> Expertises
          </h2>
          <p className="text-off-white/60 max-w-sm font-light text-base">
            We merge strategic thinking with premium aesthetics to deliver solutions that elevate your brand.
          </p>
        </motion.div>

        <div className="border-t border-off-white/20">
          {data.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setHoveredId(hoveredId === service.id ? null : service.id)} // Toggle on mobile tap
              className="group border-b border-off-white/20 py-8 md:py-12 cursor-pointer relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-3 md:gap-12">
                <span className="font-display text-xl md:text-2xl text-off-white/40 group-hover:text-deep-amber transition-colors duration-300 w-12">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl mb-2 md:mb-4 group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-500 ease-out">
                    {service.title}
                  </h3>
                  
                  {/* On Mobile, always show part of the description or toggle it, but here we'll use CSS to handle it elegantly */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${hoveredId === service.id ? 'max-h-48 opacity-100' : 'max-h-0 md:max-h-0 opacity-0 md:opacity-0'} md:group-hover:max-h-48 md:group-hover:opacity-100`}
                  >
                    <p className="text-off-white/70 font-light max-w-xl text-base md:text-lg pt-2 md:pt-4 pb-2">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="hidden md:block w-12 h-12 transform group-hover:rotate-45 transition-transform duration-500 text-off-white/30 group-hover:text-off-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="19" x2="19" y2="5"></line>
                    <polyline points="9 5 19 5 19 15"></polyline>
                  </svg>
                </div>
              </div>
              
              {/* Hover highlight background */}
              <div className="hidden md:block absolute inset-0 bg-off-white/5 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out z-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
