"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function MobileMenu({ studioName }: { studioName?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5 }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: { duration: 0.5 }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.5
      }
    })
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
    <div className="md:hidden flex items-center">
      {/* Hamburger Button (In Header) */}
      <button 
        onClick={toggleMenu}
        className="p-2 text-charcoal hover:text-deep-amber transition-colors"
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Fullscreen Overlay Menu (Rendered via Portal to escape header's backdrop-blur containing block) */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 z-[100] bg-off-white flex flex-col px-6 py-6"
            >
              {/* Header inside overlay */}
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-6 mb-12">
                <a href="/" className="flex items-center gap-3 text-xl font-display font-semibold tracking-wide text-charcoal">
                  <img src="/icon.png" alt="Logo" className="w-8 h-8 object-contain rounded-md brightness-0" />
                  {studioName || "NJ Studio"}
                </a>
                <button 
                  onClick={toggleMenu}
                  className="p-2 text-charcoal hover:text-deep-amber transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-8 text-center mt-12">
                {links.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    custom={i}
                    variants={linkVariants}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-display font-light text-charcoal hover:text-deep-amber transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
              
              <motion.div 
                custom={links.length}
                variants={linkVariants}
                className="absolute bottom-12 left-0 right-0 text-center text-sm font-medium tracking-widest text-charcoal/50 uppercase"
              >
                Premium Design Agency
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
