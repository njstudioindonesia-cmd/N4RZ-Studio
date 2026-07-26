"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ParallaxImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  className = "",
  parallaxOffset = -50, // Negative goes up, positive goes down
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  parallaxOffset?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position relative to the container element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to Y translation
  // Scale the image slightly so it doesn't reveal blank space at the edges when moving
  const y = useTransform(scrollYProgress, [0, 1], [-parallaxOffset, parallaxOffset]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        style={{ y, scale: 1.15 }} // Scale up slightly to prevent clipping during parallax
        className="absolute inset-0 w-full h-full"
      >
        <Image 
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
