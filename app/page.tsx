"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Shield, Zap, Users, Lock, Smartphone, Globe, Star, Check, ArrowRight, Phone, Video, Image, Mic, ChevronDown, Bell, Search } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ──────────────────────────────────────────────────────────────

const features = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "Every message, call, and file is protected with military-grade encryption. Only you and your recipient can read what's sent — nobody else, not even us.",
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description:
      "Messages arrive in milliseconds across the globe. Our distributed infrastructure ensures zero lag whether you're texting across the street or across continents.",
    color: "from-yellow-400 to-orange-500",
    glow: "shadow-yellow-500/20",
  },
  {
    icon: Phone,
    title: "Crystal-Clear Voice Calls",
    description:
      "HD voice calls that sound like you're in the same room. Adaptive audio technology adjusts to your network for uninterrupted conversations.",
    color: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/20",
  },
  {
    icon: Video,
    title: "HD Video Calling",
    description:
      "Face-to-face moments, no matter the distance. Group video calls support up to 32 participants with screen sharing and background blur.",
    color: "from-purple-500 to-pink-600",
    glow: "shadow-purple-500/20",
  },
  {
    icon: Users,
    title: "Group Chats & Communities",
    description:
      "Create groups for family, friends, or work. Communities support thousands of members with organized sub-groups and announcement channels.",
    color: "from-[#25D366] to-[#00A884]",
    glow: "shadow-[#25D366]/20",
  },
  {
    icon: Image,
    title: "Rich Media Sharing",
    description:
      "Share photos, videos, documents, and voice notes in full quality. Auto-compress for fast delivery or send originals — your choice.",
    color: "from-rose-500 to-red-600",
    glow: "shadow-rose-500/20",
  },
];

const steps = [
  {
    step: "01",
    title: "Download & Sign Up",
    description:
      "Get ChatWave on any device — iOS, Android, or desktop. Sign up with just your phone number in under 60 seconds.",
    icon: Smartphone,
  },
  {
    step: "02",
    title: "Find Your People",
    description:
      "ChatWave automatically finds your contacts who are already on the platform. Invite others with a simple link.",
    icon: Search,
  },
  {
    step: "03",
    title: "Start Messaging",
    description:
      "Send texts, voice notes, photos, and make calls — all encrypted, all free, all instant. It's that simple.",
    icon: MessageCircle,
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    avatar: "/images/sarah-chen-designer.jpg",
    rating: 5,
    text: "ChatWave replaced every other messaging app for me. The interface is gorgeous, messages are instant, and I finally feel like my conversations are actually private.",
  },
  {
    name: "Marcus Williams",
    role: "Remote Team Lead",
    avatar: "/images/marcus-williams-team-lead.jpg",
    rating: 5,
    text: "We moved our entire 40-person team to ChatWave. The group features are incredible — channels, threads, file sharing. It's like Slack but actually enjoyable to use.",
  },
  {
    name: "Priya Patel",
    role: "Freelance Developer",
    avatar: "/images/priya-patel-developer.jpg",
    rating: 5,
    text: "The end-to-end encryption gives me peace of mind when sharing client files. And the voice call quality is genuinely better than any other app I've tried.",
  },
  {
    name: "James O'Brien",
    role: "Journalist",
    avatar: "/images/james-obrien-journalist.jpg",
    rating: 5,
    text: "As a journalist, source protection is everything. ChatWave's zero-knowledge architecture means I can communicate securely without compromising anyone.",
  },
  {
    name: "Aiko Tanaka",
    role: "University Student",
    avatar: "/images/aiko-tanaka-student.jpg",
    rating: 5,
    text: "My study group uses ChatWave daily. The ability to share documents, voice notes, and do quick video calls all in one place is a game changer for collaboration.",
  },
  {
    name: "David Okafor",
    role: "Startup Founder",
    avatar: "/images/david-okafor-founder.jpg",
    rating: 5,
    text: "ChatWave's community feature helped us build a 5,000-member user community. The moderation tools and announcement channels are exactly what we needed.",
  },
];

const stats = [
  { value: "2B+", label: "Active Users" },
  { value: "100B+", label: "Messages Daily" },
  { value: "180+", label: "Countries" },
  { value: "99.99%", label: "Uptime" },
];

const securityFeatures = [
  "End-to-end encryption on all messages",
  "Zero-knowledge architecture — we can't read your chats",
  "Disappearing messages with custom timers",
  "Two-factor authentication",
  "Biometric app lock",
  "Secure backup with client-side encryption",
  "No ads, no data selling, ever",
  "Open-source cryptography protocol",
];

const mockMessages = [
  { id: "1", from: "them", text: "Hey! Did you see the game last night? 🏆", time: "9:41 AM", read: true },
  { id: "2", from: "me", text: "Yes!! That last-minute goal was insane 😱", time: "9:42 AM", read: true },
  { id: "3", from: "them", text: "I literally jumped off my couch haha", time: "9:42 AM", read: true },
  { id: "4", from: "me", text: "Same 😂 Want to watch the replay tonight?", time: "9:43 AM", read: true },
  { id: "5", from: "them", text: "Absolutely! I'll bring snacks 🍕", time: "9:44 AM", read: false },
];

const mockContacts = [
  { id: "1", name: "Alex Rivera", preview: "Absolutely! I'll bring snacks 🍕", time: "9:44 AM", unread: 1, online: true },
  { id: "2", name: "Team Design", preview: "Sarah: New mockups are ready!", time: "9:30 AM", unread: 3, online: false },
  { id: "3", name: "Mom ❤️", preview: "Call me when you're free", time: "Yesterday", unread: 0, online: true },
  { id: "4", name: "Dev Squad", preview: "Marcus: PR is merged 🚀", time: "Yesterday", unread: 0, online: false },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

function MockChatUI() {
  const [inputVal, setInputVal] = useState("");

  return (
    <div className="w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 bg-[#111B21]">
      {/* Status bar */}
      <div className="bg-[#202C33] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#25D366] to-[#00A884] flex items-center justify-center text-white text-xs font-bold">
            AR
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-none">Alex Rivera</p>
            <p className="text-[#25D366] text-xs mt-0.5">online</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white/60">
          <Phone className="w-4 h-4" />
          <Video className="w-4 h-4" />
        </div>
      </div>

      {/* Chat area */}
      <div
        className="px-3 py-4 space-y-2 min-h-[260px]"
        style={{ background: "linear-gradient(180deg, #0B141A 0%, #0D1F27 100%)" }}
      >
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                msg.from === "me"
                  ? "bg-[#005C4B] text-white rounded-br-sm"
                  : "bg-[#202C33] text-white/90 rounded-bl-sm"
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-[10px] mt-1 text-right ${msg.from === "me" ? "text-white/50" : "text-white/40"}`}>
                {msg.time}
                {msg.from === "me" && (
                  <span className="ml-1 text-[#53BDEB]">✓✓</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="bg-[#202C33] px-3 py-2 flex items-center gap-2">
        <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Message"
            className="flex-1 bg-transparent text-white/80 text-sm outline-none placeholder:text-white/30"
          />
        </div>
        <button
          className="w-9 h-9 rounded-full bg-gradient-to-br from-[#25D366] to-[#00A884] flex items-center justify-center shadow-lg"
          onClick={() => setInputVal("")}
          aria-label="Send message"
        >
          <Mic className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = (variants: object) =>
    shouldReduceMotion ? {} : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <main className="bg-[#111B21] text-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#00A884]/10 blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#25D366]/8 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A884]/15 border border-[#00A884]/25 text-[#25D366] text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              Now available on all platforms
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
            >
              <span className="text-white">Message</span>
              <br />
              <span className="bg-gradient-to-r from-[#25D366] via-[#00A884] to-[#25D366] bg-clip-text text-transparent">
                freely.
              </span>
              <br />
              <span className="text-white">Connect</span>
              <br />
              <span className="text-white/60">deeply.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
            >
              {APP_DESCRIPTION}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href="#get-started"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#00A884] text-white font-semibold text-lg shadow-xl shadow-[#00A884]/30 hover:shadow-[#00A884]/50 transition-all duration-300"
                whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                Download Free
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                See How It Works
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap items-center gap-6 justify-center lg:justify-start">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Mock UI */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <MockChatUI />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[#00A884]/5 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...motionProps(staggerContainer)}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-[#25D366] font-semibold text-sm uppercase tracking-widest mb-3">
              Everything You Need
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Built for real conversations
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 text-lg max-w-2xl mx-auto">
              ChatWave packs every feature you love — and a few you didn't know you needed — into one beautifully designed app.
            </motion.p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={scaleIn}
                  whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
                  className="group relative p-6 rounded-2xl bg-[#202C33] border border-white/5 hover:border-[#00A884]/30 transition-all duration-300 cursor-default"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg ${feature.glow}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00A884]/0 to-[#00A884]/0 group-hover:from-[#00A884]/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-[#0B141A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#25D366]/5 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...motionProps(staggerContainer)} className="text-center mb-16">
            <motion.p variants={fadeInUp} className="text-[#25D366] font-semibold text-sm uppercase tracking-widest mb-3">
              Simple by Design
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Up and running in minutes
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 text-lg max-w-2xl mx-auto">
              No complicated setup. No learning curve. Just download, sign in, and start connecting with the people who matter.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-[#25D366]/30 via-[#00A884]/50 to-[#25D366]/30" />

            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative text-center"
                >
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#00A884] shadow-xl shadow-[#00A884]/30 mb-6 mx-auto">
                    <Icon className="w-7 h-7 text-white" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#111B21] border-2 border-[#25D366] text-[#25D366] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* App preview strip */}
          <motion.div
            {...motionProps(fadeInUp)}
            className="mt-20 rounded-3xl bg-[#202C33] border border-white/5 overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left: contact list mock */}
              <div className="p-6 border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-bold text-lg">Chats</h4>
                  <div className="flex items-center gap-2 text-white/40">
                    <Search className="w-4 h-4" />
                    <Bell className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  {mockContacts.map((contact) => (
                    <motion.div
                      key={contact.id}
                      whileHover={shouldReduceMotion ? {} : { x: 4, backgroundColor: "rgba(255,255,255,0.04)" }}
                      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#25D366]/40 to-[#00A884]/40 flex items-center justify-center text-white font-bold text-sm">
                          {contact.name.charAt(0)}
                        </div>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#202C33]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-white text-sm font-semibold truncate">{contact.name}</p>
                          <p className="text-white/30 text-xs flex-shrink-0 ml-2">{contact.time}</p>
                        </div>
                        <p className="text-white/40 text-xs truncate mt-0.5">{contact.preview}</p>
                      </div>
                      {contact.unread > 0 && (
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center justify-center">
                          {contact.unread}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: message thread mock */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#25D366]/40 to-[#00A884]/40 flex items-center justify-center text-white font-bold text-sm">
                    A
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Alex Rivera</p>
                    <p className="text-[#25D366] text-xs">online</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {mockMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                          msg.from === "me"
                            ? "bg-[#005C4B] text-white rounded-br-sm"
                            : "bg-[#2A3942] text-white/90 rounded-bl-sm"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className="text-[10px] mt-1 text-right text-white/40">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECURITY ─────────────────────────────────────────────────────── */}
      <section id="security" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#00A884]/8 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: visual */}
            <motion.div
              {...motionProps(slideInLeft)}
              className="relative"
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-[#202C33] to-[#0B141A] border border-white/5 p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#00A884]/10 blur-[60px]" />
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#00A884] flex items-center justify-center mb-6 shadow-2xl shadow-[#00A884]/40">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">Your privacy is non-negotiable</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    We built ChatWave on a foundation of trust. Our open-source Signal Protocol ensures that every message is encrypted before it leaves your device.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Messages Encrypted", value: "100%" },
                      { label: "Data Sold", value: "0%" },
                      { label: "Uptime SLA", value: "99.99%" },
                      { label: "Audits/Year", value: "4+" },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-[#25D366] text-xl font-extrabold">{item.value}</p>
                        <p className="text-white/40 text-xs mt-0.5">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: list */}
            <motion.div {...motionProps(staggerContainer)}>
              <motion.p variants={fadeInUp} className="text-[#25D366] font-semibold text-sm uppercase tracking-widest mb-3">
                Security First
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                Privacy you can actually trust
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/50 text-lg mb-8 leading-relaxed">
                In a world where your data is the product, ChatWave is different. We've engineered privacy into every layer of the platform — not as an afterthought, but as the foundation.
              </motion.p>

              <motion.ul variants={staggerContainer} className="space-y-3">
                {securityFeatures.map((feat) => (
                  <motion.li
                    key={feat}
                    variants={fadeInUp}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00A884]/20 border border-[#00A884]/30 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#25D366]" />
                    </div>
                    <span className="text-white/70 text-sm">{feat}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.a
                variants={fadeInUp}
                href="#get-started"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#00A884] text-white font-semibold shadow-lg shadow-[#00A884]/25 hover:shadow-[#00A884]/40 transition-all duration-300"
                whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                Start Messaging Securely
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0B141A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#25D366]/5 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...motionProps(staggerContainer)} className="text-center mb-16">
            <motion.p variants={fadeInUp} className="text-[#25D366] font-semibold text-sm uppercase tracking-widest mb-3">
              Loved by Millions
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Real people. Real connections.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 text-lg max-w-2xl mx-auto">
              From families staying in touch to teams shipping products — ChatWave is how the world communicates.
            </motion.p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="p-6 rounded-2xl bg-[#202C33] border border-white/5 hover:border-[#00A884]/20 transition-all duration-300"
              >
                <StarRating count={t.rating} />
                <p className="text-white/70 text-sm leading-relaxed mt-4 mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#25D366]/30 to-[#00A884]/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00A884]/8 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...motionProps(staggerContainer)}>
              <motion.p variants={fadeInUp} className="text-[#25D366] font-semibold text-sm uppercase tracking-widest mb-3">
                Our Mission
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
                Communication is a human right
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/60 text-lg leading-relaxed mb-4">
                ChatWave was founded on a simple belief: everyone deserves to communicate freely, privately, and without barriers. We built the platform we always wanted — one that respects your intelligence and your privacy.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-white/50 text-base leading-relaxed mb-8">
                We're a team of engineers, designers, and privacy advocates who believe technology should serve people — not the other way around. No ads. No data harvesting. Just a beautifully crafted tool for human connection.
              </motion.p>
              <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4">
                {[
                  { icon: Globe, label: "Available in 60+ languages" },
                  { icon: Shield, label: "SOC 2 Type II certified" },
                  { icon: Users, label: "2 billion+ users worldwide" },
                  { icon: Zap, label: "Founded in 2019" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      variants={fadeInUp}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#202C33] border border-white/5"
                    >
                      <Icon className="w-5 h-5 text-[#25D366] flex-shrink-0" />
                      <span className="text-white/60 text-sm">{item.label}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div
              {...motionProps(slideInRight)}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    className={`p-6 rounded-2xl border text-center ${
                      idx === 0
                        ? "bg-gradient-to-br from-[#25D366] to-[#00A884] border-transparent shadow-xl shadow-[#00A884]/30"
                        : "bg-[#202C33] border-white/5"
                    }`}
                  >
                    <p className={`text-3xl font-extrabold ${idx === 0 ? "text-white" : "text-[#25D366]"}`}>
                      {stat.value}
                    </p>
                    <p className={`text-sm mt-1 ${idx === 0 ? "text-white/80" : "text-white/40"}`}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GET STARTED CTA ──────────────────────────────────────────────── */}
      <section id="get-started" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00A884]/15 via-transparent to-[#25D366]/10 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#00A884]/15 blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div {...motionProps(staggerContainer)}>
            <motion.div
              variants={scaleIn}
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#25D366] to-[#00A884] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#00A884]/40"
            >
              <MessageCircle className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Ready to chat without limits?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/60 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Join over 2 billion people who've made ChatWave their home for private, fast, and joyful communication. Free forever. No credit card needed.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#00A884] text-white font-bold text-lg shadow-2xl shadow-[#00A884]/35 hover:shadow-[#00A884]/55 transition-all duration-300"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -3 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                <Smartphone className="w-5 h-5" />
                Download for iOS
              </motion.a>
              <motion.a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/15 text-white font-bold text-lg hover:bg-white/15 transition-all duration-300"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -3 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                <Globe className="w-5 h-5" />
                Download for Android
              </motion.a>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-white/30 text-sm mt-6">
              Also available on Windows, macOS, and Linux · No account required to try
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}