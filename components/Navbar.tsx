"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, MessageCircle } from 'lucide-react';
import { navLinks, navCTA, APP_NAME } from "@/lib/data";
import { fadeIn } from "@/lib/motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#111B21]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#25D366] to-[#00A884] flex items-center justify-center shadow-lg shadow-[#00A884]/30">
              <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              {APP_NAME}
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#25D366] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href={navCTA.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(navCTA.href);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#00A884] text-white text-sm font-semibold shadow-lg shadow-[#00A884]/25 hover:shadow-[#00A884]/40 transition-all duration-200"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              {navCTA.label}
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-[#202C33]/98 backdrop-blur-md border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={navCTA.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(navCTA.href);
                }}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.05, duration: 0.25 }}
                className="mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#00A884] text-white text-sm font-semibold text-center shadow-lg"
              >
                {navCTA.label}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}