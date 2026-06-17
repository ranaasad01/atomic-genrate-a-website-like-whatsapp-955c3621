"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Video, Phone, Search, MoreVertical, Check, CheckCheck, Smile, Paperclip, Mic, Send, User, Clock, MessageCircle, Image, ArrowRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type MessageStatus = "sent" | "delivered" | "read";

interface Message {
  id: number;
  type: "sent" | "received";
  text: string;
  time: string;
  status?: MessageStatus;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const messages: Message[] = [
  { id: 1, type: "received", text: "Hey! Good morning 😊", time: "9:41 AM" },
  { id: 2, type: "sent", text: "Good morning! How are you?", time: "9:42 AM", status: "read" },
  { id: 3, type: "received", text: "I'm doing great, thanks! Did you finish the project report?", time: "9:43 AM" },
  { id: 4, type: "sent", text: "Almost done! Just need to add the final charts and it'll be ready.", time: "9:44 AM", status: "read" },
  { id: 5, type: "received", text: "Awesome! The deadline is tomorrow at noon, right?", time: "9:45 AM" },
  { id: 6, type: "sent", text: "Yes, 12pm sharp. I'll send it over by 10am to give you time to review.", time: "9:46 AM", status: "read" },
  { id: 7, type: "received", text: "Perfect 👌 Also, are you coming to the team lunch today?", time: "9:47 AM" },
  { id: 8, type: "sent", text: "Definitely! What time is it again?", time: "9:48 AM", status: "delivered" },
  { id: 9, type: "received", text: "1:30 PM at the usual place — Rosario's on 5th.", time: "9:49 AM" },
  { id: 10, type: "sent", text: "Great, I'll be there! Should I bring anything?", time: "9:50 AM", status: "delivered" },
  { id: 11, type: "received", text: "Just yourself 😄 Oh, and maybe those amazing cookies you brought last time!", time: "9:51 AM" },
  { id: 12, type: "sent", text: "Haha deal! I'll bake a fresh batch tonight 🍪", time: "9:52 AM", status: "sent" },
  { id: 13, type: "received", text: "You're the best! See you at lunch then 🎉", time: "9:53 AM" },
  { id: 14, type: "sent", text: "See you there! 👋", time: "9:54 AM", status: "sent" },
];

const mediaTiles = [
  "from-emerald-500/20 to-teal-600/20",
  "from-blue-500/20 to-indigo-600/20",
  "from-purple-500/20 to-pink-600/20",
  "from-rose-500/20 to-red-600/20",
  "from-yellow-400/20 to-orange-500/20",
  "from-[#25D366]/20 to-[#00A884]/20",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: MessageStatus }) {
  if (status === "read") {
    return <CheckCheck className="w-4 h-4 text-[#53BDEB]" />;
  }
  if (status === "delivered") {
    return <CheckCheck className="w-4 h-4 text-white/40" />;
  }
  return <Check className="w-4 h-4 text-white/40" />;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      {[0, 0.15, 0.3].map((delay, i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-white/40 block"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function HeaderTypingIndicator() {
  return (
    <span className="flex items-center gap-1 text-xs text-[#25D366]">
      typing
      {[0, 0.15, 0.3].map((delay, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ConversationPage() {
  const [isTyping] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="pt-16 h-screen flex flex-col overflow-hidden">
      {/* ── Chat UI ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden bg-[#0B1418]">

        {/* 1. CHAT HEADER */}
        <div className="bg-[#202C33] px-4 py-3 flex items-center gap-3 border-b border-white/5 shrink-0">
          {/* Back button */}
          <button className="p-1 rounded-lg hover:bg-white/5 transition-colors">
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>

          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
              AJ
            </div>
            <span className="w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#202C33] absolute bottom-0 right-0" />
          </div>

          {/* Name + status */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white leading-tight">Alice Johnson</p>
            {isTyping ? (
              <HeaderTypingIndicator />
            ) : (
              <p className="text-xs text-[#25D366]">online</p>
            )}
          </div>

          {/* Action icons */}
          <div className="flex items-center">
            {[
              { Icon: Video, label: "Video call" },
              { Icon: Phone, label: "Voice call" },
              { Icon: Search, label: "Search" },
              { Icon: MoreVertical, label: "More" },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Icon className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* 2. MESSAGE THREAD */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-[#0B1418]">
          {/* Date separator */}
          <div className="flex justify-center mb-4">
            <span className="bg-[#202C33] text-white/50 text-xs px-3 py-1 rounded-full">
              Today
            </span>
          </div>

          {/* Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.type === "sent" ? "justify-end" : "justify-start"
              } mb-1`}
            >
              <div className="flex flex-col">
                <div
                  className={`px-4 py-2 max-w-[65%] text-sm leading-relaxed ${
                    msg.type === "sent"
                      ? "bg-[#005C4B] text-white rounded-2xl rounded-tr-sm"
                      : "bg-[#202C33] text-white rounded-2xl rounded-tl-sm"
                  }`}
                  style={{ maxWidth: "min(65vw, 420px)" }}
                >
                  {msg.text}
                </div>
                {msg.type === "sent" ? (
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <span className="text-xs text-white/30">{msg.time}</span>
                    {msg.status && <StatusIcon status={msg.status} />}
                  </div>
                ) : (
                  <span className="text-xs text-white/30 mt-1 ml-1">{msg.time}</span>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator bubble */}
          <div className="flex justify-start mb-1">
            <div className="bg-[#202C33] rounded-2xl rounded-tl-sm px-4 py-3 w-16 flex items-center gap-1">
              <TypingDots />
            </div>
          </div>

          <div ref={messagesEndRef} />
        </div>

        {/* 3. MESSAGE INPUT BAR */}
        <div className="bg-[#202C33] px-4 py-3 flex items-center gap-3 shrink-0 border-t border-white/5">
          {/* Emoji */}
          <button aria-label="Emoji" className="shrink-0">
            <Smile className="w-6 h-6 text-white/60 hover:text-[#25D366] transition-colors" />
          </button>

          {/* Attachment */}
          <button aria-label="Attach file" className="shrink-0">
            <Paperclip className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
          </button>

          {/* Text input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            className="flex-1 bg-[#111B21] rounded-full px-5 py-2.5 text-sm text-white placeholder-white/30 outline-none border border-transparent focus:border-[#00A884]/30 transition-colors"
          />

          {/* Send / Mic */}
          {inputValue.trim() ? (
            <motion.button
              aria-label="Send message"
              onClick={handleSend}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full bg-[#00A884] hover:bg-[#25D366] flex items-center justify-center shrink-0 transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </motion.button>
          ) : (
            <button aria-label="Voice message" className="shrink-0">
              <Mic className="w-6 h-6 text-white/60 hover:text-[#25D366] transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* ── Section A: Conversation Details ─────────────────────────────── */}
      <div className="bg-[#202C33]/50 border-t border-white/5 px-6 py-8 shrink-0">
        <h2 className="text-lg font-semibold text-white mb-4">Conversation Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {/* Card 1 */}
          <div className="bg-[#111B21] rounded-xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00A884]/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-[#00A884]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">Alice Johnson</p>
              <p className="text-xs text-white/40">Contact</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-[#111B21] rounded-xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00A884]/10 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#00A884]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">Since March 2023</p>
              <p className="text-xs text-white/40">Connected</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-[#111B21] rounded-xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00A884]/10 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[#00A884]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">1,247 messages</p>
              <p className="text-xs text-white/40">Total Messages</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="border border-[#00A884] text-[#00A884] hover:bg-[#00A884]/10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
            View Profile
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-white/70 px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
            Mute Notifications
          </button>
        </div>
      </div>

      {/* ── Section B: Shared Media ──────────────────────────────────────── */}
      <div className="bg-[#111B21] px-6 py-8 shrink-0">
        <h2 className="text-lg font-semibold text-white mb-2">Shared Media</h2>
        <p className="text-sm text-white/40 mb-6">24 photos · 8 videos · 12 documents</p>

        <div className="grid grid-cols-3 gap-2">
          {mediaTiles.map((gradient, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
            >
              <Image className="w-6 h-6 text-white/20" />
            </div>
          ))}
        </div>

        <button className="mt-4 text-sm text-[#00A884] hover:text-[#25D366] font-medium flex items-center gap-1 transition-colors">
          View All Media
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
