"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function MobileMenu({ studioName }: { studioName?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: { opacity: 0, y: -10, scale: 0.95, pointerEvents: "none" as any },
    open: { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" as any, transition: { duration: 0.2, ease: "easeOut" } }
  };

  const links = [
    { name: "About Us", href: "/about" },
    { name: "Capabilities", href: "/#services" },
    { name: "Works", href: "/#portfolio" },
    { name: "Jasa Web", href: "/jasa-website" },
    { name: "Jasa Roblox", href: "/jasa-roblox-development" },
    { name: "Shop", href: "/shop" },
    { name: "Insights", href: "/blog" }
  ];

  return (
    <div className="flex items-center relative" ref={menuRef}>
      <button 
        onClick={toggleMenu}
        className="p-2 text-charcoal hover:text-deep-amber transition-colors relative z-10"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-full right-0 mt-4 w-56 bg-white/95 backdrop-blur-xl border border-charcoal/10 rounded-2xl shadow-2xl p-3 flex flex-col gap-1 origin-top-right z-[100]"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-charcoal hover:text-deep-amber hover:bg-black/5 rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
