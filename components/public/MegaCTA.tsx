"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { ArrowUpRight } from "lucide-react";

export default function MegaCTA({ phone = "6281234567890" }: { phone?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const waNumber = phone.replace(/\D/g, '');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-charcoal text-off-white overflow-hidden relative flex flex-col items-center justify-center">
      {/* Background noise and ambient light */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-deep-amber/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div style={{ scale, opacity }} className="text-center z-10 relative px-6 w-full flex flex-col items-center">
        <h2 className="text-[14vw] md:text-[10vw] font-display font-bold leading-[0.9] tracking-tighter mb-12">
          HAVE AN IDEA?<br/>LET'S TALK.
        </h2>
        
        <Magnetic strength={50}>
          <Link 
            href={`https://wa.me/${waNumber}?text=Halo%20NJ%20Studio`}
            className="flex items-center justify-center w-36 h-36 md:w-48 md:h-48 rounded-full bg-deep-amber text-charcoal font-bold tracking-widest text-xs md:text-sm transition-transform duration-500 shadow-2xl group border-4 border-charcoal hover:bg-white"
          >
            <div className="flex flex-col items-center gap-1">
              <span>MULAI</span>
              <span>PROYEK</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </Link>
        </Magnetic>
      </motion.div>
    </section>
  );
}
