// ─── Brand Constants ──────────────────────────────────────────────────────────
export const APP_NAME = "ChatWave";
export const APP_TAGLINE = "Message freely. Connect deeply.";
export const APP_DESCRIPTION =
  "A fast, secure, and beautifully designed messaging platform inspired by the best — built for everyone.";

// ─── Color Palette ────────────────────────────────────────────────────────────
export const BRAND_COLORS = {
  primary: "#00A884",
  primaryLight: "#25D366",
  darkBg: "#111B21",
  darkPanel: "#202C33",
  chatBg: "#ECE5DD",
  white: "#FFFFFF",
} as const;

// ─── Navigation Links (homepage anchors only) ─────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "About", href: "#about" },
  { label: "Chat", href: "/chat" },
  { label: "Conversation", href: "/conversation" },
];

export const navCTA = {
  label: "Get Started Free",
  href: "#get-started",
};

// ─── Shared TypeScript Types ──────────────────────────────────────────────────
export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  type: "text" | "image" | "file" | "audio";
}

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  isPinned?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface GroupChat {
  id: string;
  name: string;
  avatar: string;
  members: User[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  description?: string;
}
