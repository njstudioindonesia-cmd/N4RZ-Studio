"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function Magnetic({
  children,
  strength = 30, // How far it can be pulled
  damping = 15,
  stiffness = 150,
  mass = 0.5,
}: {
  children: React.ReactElement;
  strength?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Create spring-animated values for x and y
  const springConfig = { damping, stiffness, mass };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Pull the element towards the mouse based on strength
    x.set(middleX * (strength / 100));
    y.set(middleY * (strength / 100));
  };

  const handleMouseLeave = () => {
    // Snap back to original position
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
