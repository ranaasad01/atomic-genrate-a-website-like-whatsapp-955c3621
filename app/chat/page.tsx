"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Search, MoreVertical, Users, Pin, Lock, Shield, Zap, Check, CheckCheck, Smile, Paperclip, Mic, Send, Phone, Video, X } from 'lucide-react';
import { fadeIn, slideInLeft, slideInRight, fadeInUp, staggerContainer } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Contact {
  id: string;
  name: string;
  initials: string;
  gradient: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  pinned: boolean;
}

interface MockMessage {
  id: string;
  content: string;
  sent: boolean;
  time: string;
  status: "sent" | "delivered" | "read";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const contacts: Contact[] = [
  { id: "1", name: "Alice Johnson", initials: "AJ", gradient: "from-emerald-500 to-teal-600", lastMessage: "Hey! Are you coming tonight?", time: "12:45 PM", unread: 3, online: true, pinned: true },
  { id: "2", name: "Bob Martinez", initials: "BM", gradient: "from-blue-500 to-indigo-600", lastMessage: "The files have been sent ✓", time: "11:30 AM", unread: 0, online: false, pinned: true },
  { id: "3", name: "Carol White", initials: "CW", gradient: "from-purple-500 to-pink-600", lastMessage: "Sounds great! 😊", time: "10:15 AM", unread: 1, online: true, pinned: false },
  { id: "4", name: "David Lee", initials: "DL", gradient: "from-rose-500 to-red-600", lastMessage: "Can we reschedule?", time: "Yesterday", unread: 0, online: false, pinned: false },
  { id: "5", name: "Emma Davis", initials: "ED", gradient: "from-yellow-400 to-orange-500", lastMessage: "Photo", time: "Yesterday", unread: 7, online: true, pinned: false },
  { id: "6", name: "Frank Wilson", initials: "FW", gradient: "from-emerald-500 to-teal-600", lastMessage: "Thanks for the update!", time: "Mon", unread: 0, online: false, pinned: false },
  { id: "7", name: "Grace Kim", initials: "GK", gradient: "from-blue-500 to-indigo-600", lastMessage: "I'll check and get back to you", time: "Mon", unread: 2, online: true, pinned: false },
  { id: "8", name: "Henry Brown", initials: "HB", gradient: "from-purple-500 to-pink-600", lastMessage: "👍", time: "Sun", unread: 0, online: false, pinned: false },
  { id: "9", name: "Isla Turner", initials: "IT", gradient: "from-rose-500 to-red-600", lastMessage: "Meeting at 3pm confirmed", time: "Sun", unread: 0, online: true, pinned: false },
  { id: "10", name: "Jack Chen", initials: "JC", gradient: "from-yellow-400 to-orange-500", lastMessage: "Voice message", time: "Sat", unread: 0, online: false, pinned: false },
  { id: "11", name: "Karen Scott", initials: "KS", gradient: "from-emerald-500 to-teal-600", lastMessage: "Did you see the news?", time: "Fri", unread: 4, online: false, pinned: false },
  { id: "12", name: "Liam Patel", initials: "LP", gradient: "from-blue-500 to-indigo-600", lastMessage: "Let's catch up soon!", time: "Fri", unread: 0, online: true, pinned: false },
];

const mockMessages: MockMessage[] = [
  { id: "m1", content: "Hey! How's everything going?", sent: false, time: "10:30 AM", status: "read" },
  { id: "m2", content: "All good here! Just finished the project. You?", sent: true, time: "10:31 AM", status: "read" },
  { id: "m3", content: "That's awesome! I'm still working on mine 😅", sent: false, time: "10:32 AM", status: "read" },
  { id: "m4", content: "Let me know if you need any help. Happy to review it!", sent: true, time: "10:33 AM", status: "read" },
  { id: "m5", content: "Thanks so much, really appreciate it 🙏", sent: false, time: "10:35 AM", status: "read" },
  { id: "m6", content: "Of course! Ping me whenever you're ready.", sent: true, time: "10:36 AM", status: "delivered" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Avatar({ initials, gradient, online, size = "md" }: { initials: string; gradient: string; online?: boolean; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "w-12 h-12 text-sm" : size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  const dotSize = size === "lg" ? "w-3.5 h-3.5" : "w-3 h-3";
  return (
    <div className="relative flex-shrink-0">
      <div className={`${sizeClass} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-semibold`}>
        {initials}
      </div>
      {online && (
        <span className={`absolute bottom-0 right-0 ${dotSize} rounded-full bg-[#25D366] border-2 border-[#202C33]`} />
      )}
    </div>
  );
}

function MessageStatusIcon({ status }: { status: "sent" | "delivered" | "read" }) {
  if (status === "read") return <CheckCheck className="w-4 h-4 text-[#53BDEB]" />;
  if (status === "delivered") return <CheckCheck className="w-4 h-4 text-white/40" />;
  return <Check className="w-4 h-4 text-white/40" />;
}

// ─── Inline Conversation Panel ────────────────────────────────────────────────

function ConversationPanel({ contact }: { contact: Contact }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <motion.div
      key={contact.id}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col h-full w-full"
    >
      {/* Header */}
      <div className="bg-[#202C33] px-4 py-3 flex items-center gap-3 border-b border-white/5 flex-shrink-0">
        <Avatar initials={contact.initials} gradient={contact.gradient} online={contact.online} size="lg" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{contact.name}</p>
          <p className={`text-xs ${contact.online ? "text-[#25D366]" : "text-white/40"}`}>
            {contact.online ? "online" : "last seen recently"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {[
            { Icon: Video, label: "Video call" },
            { Icon: Phone, label: "Voice call" },
            { Icon: Search, label: "Search" },
            { Icon: MoreVertical, label: "More" },
          ].map(({ Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Icon className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#0B1418] space-y-1">
        {/* Date divider */}
        <div className="flex items-center justify-center my-3">
          <span className="px-3 py-1 rounded-full bg-[#182229] text-white/40 text-xs">Today</span>
        </div>

        {mockMessages.map((msg) => (
          <motion.div
            key={msg.id}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className={`flex ${msg.sent ? "justify-end" : "justify-start"} mb-1`}
          >
            <div
              className={`max-w-[65%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                msg.sent
                  ? "bg-[#005C4B] text-white rounded-tr-none"
                  : "bg-[#202C33] text-white/90 rounded-tl-none"
              }`}
            >
              <p>{msg.content}</p>
              <div className={`flex items-center gap-1 mt-1 ${msg.sent ? "justify-end" : "justify-start"}`}>
                <span className="text-[10px] text-white/40">{msg.time}</span>
                {msg.sent && <MessageStatusIcon status={msg.status} />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="bg-[#202C33] px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <button aria-label="Emoji" className="p-1.5 rounded-full hover:bg-white/5 transition-colors">
          <Smile className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
        </button>
        <button aria-label="Attach" className="p-1.5 rounded-full hover:bg-white/5 transition-colors">
          <Paperclip className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message"
          className="flex-1 bg-[#111B21] rounded-full px-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:ring-1 focus:ring-[#00A884]/40 transition-all"
        />
        <button
          aria-label={inputValue.trim() ? "Send" : "Voice message"}
          className="p-1.5 rounded-full hover:bg-white/5 transition-colors"
        >
          {inputValue.trim() ? (
            <Send className="w-5 h-5 text-[#25D366]" />
          ) : (
            <Mic className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center h-full px-8"
    >
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <MessageCircle className="w-24 h-24 text-white/10 mb-6" />
      </motion.div>
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-3xl font-light text-white/80 mb-3"
      >
        ChatWave Web
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center text-white/40 text-sm max-w-sm leading-relaxed mb-8"
      >
        Send and receive messages without keeping your phone online. Use ChatWave on up to 4 linked devices and 1 phone.
      </motion.p>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm border-t border-white/5 mb-8"
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap items-center justify-center gap-3"
      >
        {[
          { Icon: Lock, label: "End-to-end encrypted" },
          { Icon: Shield, label: "Private & Secure" },
          { Icon: Zap, label: "Lightning Fast" },
        ].map(({ Icon, label }) => (
          <motion.div
            key={label}
            variants={fadeInUp}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/50 text-xs"
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </motion.div>
        ))}
      </motion.div>
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-xs text-white/20 mt-6"
      >
        Select a conversation to start messaging
      </motion.p>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const filteredContacts = contacts.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q);
  });

  const pinnedContacts = filteredContacts.filter((c) => c.pinned);
  const unpinnedContacts = filteredContacts.filter((c) => !c.pinned);
  const orderedContacts = [...pinnedContacts, ...unpinnedContacts];

  const selectedContact = contacts.find((c) => c.id === selectedContactId) ?? null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#111B21]">
      {/* ── LEFT SIDEBAR ── */}
      <motion.aside
        variants={slideInLeft}
        initial="hidden"
        animate="visible"
        className="w-[360px] min-w-[320px] bg-[#202C33] border-r border-white/5 flex flex-col flex-shrink-0"
      >
        {/* Header */}
        <div className="bg-[#202C33] flex items-center justify-between px-4 py-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#25D366] to-[#00A884] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            ME
          </div>
          <div className="flex items-center gap-1">
            <button aria-label="New group" className="px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">
              <Users className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
            </button>
            <button aria-label="New chat" className="px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">
              <MessageCircle className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
            </button>
            <button aria-label="Menu" className="px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">
              <MoreVertical className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-2 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or start new chat"
              className="w-full bg-[#111B21] rounded-lg pl-9 pr-4 py-2 text-sm text-white/80 placeholder-white/30 outline-none focus:ring-1 focus:ring-[#00A884]/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 text-white/40 hover:text-white/70 transition-colors" />
              </button>
            )}
          </div>
        </div>

        {/* Pinned label */}
        {pinnedContacts.length > 0 && (
          <div className="px-4 py-1 flex-shrink-0">
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Pinned</span>
          </div>
        )}

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {orderedContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <Search className="w-10 h-10 text-white/10 mb-3" />
              <p className="text-white/30 text-sm text-center">No chats found for &ldquo;{searchQuery}&rdquo;</p>
            </div>
          ) : (
            orderedContacts.map((contact, index) => {
              const isSelected = selectedContactId === contact.id;
              const showAllChatsLabel =
                index > 0 &&
                !contact.pinned &&
                orderedContacts[index - 1].pinned;

              return (
                <div key={contact.id}>
                  {showAllChatsLabel && (
                    <div className="px-4 py-1">
                      <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">All Chats</span>
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedContactId(contact.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer ${
                      isSelected ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <Avatar
                      initials={contact.initials}
                      gradient={contact.gradient}
                      online={contact.online}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm font-medium text-white truncate flex-1 text-left">{contact.name}</span>
                        <span className="text-xs text-white/40 ml-2 flex-shrink-0">{contact.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50 truncate flex-1 text-left">{contact.lastMessage}</span>
                        <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                          {contact.pinned && <Pin className="w-3 h-3 text-white/30" />}
                          {contact.unread > 0 && (
                            <span className="w-5 h-5 rounded-full bg-[#25D366] text-[#111B21] text-xs font-bold flex items-center justify-center">
                              {contact.unread > 9 ? "9+" : contact.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </motion.aside>

      {/* ── RIGHT PANEL ── */}
      <motion.main
        variants={slideInRight}
        initial="hidden"
        animate="visible"
        className="flex-1 bg-[#111B21] flex flex-col overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {selectedContact ? (
            <ConversationPanel key={selectedContact.id} contact={selectedContact} />
          ) : (
            <EmptyState key="empty" />
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
