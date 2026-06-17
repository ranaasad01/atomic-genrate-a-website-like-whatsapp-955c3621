import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChatWave — Modern Messaging for Everyone",
  description:
    "ChatWave is a fast, secure, and beautiful messaging platform. Connect with friends, family, and teams in real time.",
  keywords: ["messaging", "chat", "real-time", "secure", "group chat"],
  authors: [{ name: "ChatWave Team" }],
  openGraph: {
    title: "ChatWave — Modern Messaging for Everyone",
    description:
      "Fast, secure, and beautiful real-time messaging. Connect with anyone, anywhere.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#111B21] text-white font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}