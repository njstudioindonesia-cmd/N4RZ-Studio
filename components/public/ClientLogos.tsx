"use client";

import { motion } from "framer-motion";
import { ClientLogo } from "@prisma/client";
import Image from "next/image";

export default function ClientLogos({ 
  logos, 
  theme = 'light' 
}: { 
  logos: ClientLogo[], 
  theme?: 'light' | 'dark' 
}) {
  if (!logos || logos.length === 0) return null;

  // Duplicate the array multiple times to create a seamless infinite loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  const bgColor = theme === 'light' ? 'bg-off-white' : 'bg-charcoal';
  const textColor = theme === 'light' ? 'text-charcoal/40' : 'text-off-white/40';
  const borderColor = theme === 'light' ? 'border-charcoal/5' : 'border-off-white/5';
  const gradientFrom = theme === 'light' ? 'from-off-white' : 'from-charcoal';

  // Base speed on number of unique logos to keep speed consistent
  const duration = Math.max(20, logos.length * 8);

  return (
    <section className={`py-16 md:py-24 overflow-hidden ${bgColor} border-y ${borderColor}`}>
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className={`text-sm font-semibold tracking-widest uppercase ${textColor}`}>
          Dipercaya oleh Klien & Brand Terbaik
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden flex">
        {/* Left/Right Gradients for fading effect */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r ${gradientFrom} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l ${gradientFrom} to-transparent z-10 pointer-events-none`} />
        
        <motion.div
          className="flex gap-16 md:gap-24 items-center shrink-0 pr-16 md:pr-24"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: duration 
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`} 
              className={`relative h-12 md:h-16 w-32 md:w-48 shrink-0 transition-all duration-500 
                ${theme === 'light' 
                  ? 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0' 
                  : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0 contrast-200 brightness-200 hover:contrast-100 hover:brightness-100'
                }`}
            >
              <Image 
                src={logo.imageUrl} 
                alt={logo.name} 
                fill 
                className="object-contain" 
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
