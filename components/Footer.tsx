"use client";

import { motion } from "framer-motion";
import { MessageCircle, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Heart } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Security", href: "#security" },
    { label: "Get Started", href: "#get-started" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Blog", href: "#about" },
    { label: "Careers", href: "#about" },
    { label: "Press", href: "#about" },
  ],
  Support: [
    { label: "Help Center", href: "#contact" },
    { label: "Contact Us", href: "#contact" },
    { label: "Privacy Policy", href: "#about" },
    { label: "Terms of Service", href: "#about" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const handleClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-[#111B21] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2.5 mb-4 group w-fit"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#25D366] to-[#00A884] flex items-center justify-center shadow-lg shadow-[#00A884]/30">
                <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {APP_NAME}
              </span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              {APP_TAGLINE}. Built for real connections — fast, private, and
              beautifully designed for everyone.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#00A884]/20 border border-white/5 hover:border-[#00A884]/30 flex items-center justify-center text-white/50 hover:text-[#25D366] transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={fadeInUp}>
              <h3 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(link.href);
                      }}
                      className="text-white/50 hover:text-[#25D366] text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1.5">
            Made with{" "}
            <Heart className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" /> for
            seamless communication
          </p>
        </motion.div>
      </div>
    </footer>
  );
}