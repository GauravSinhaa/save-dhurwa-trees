"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  Trees,
  MapPin,
  FileText,
  BarChart3,
  AlertTriangle,
  Menu,
  X,
  Languages,
  ShieldAlert,
  Users,
  Send,
  HelpCircle,
  FileCheck,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t.nav.home, icon: Trees },
    { href: "/project", label: t.nav.project, icon: AlertTriangle },
    { href: "/map", label: t.nav.map, icon: MapPin },
    { href: "/impact", label: t.nav.impact, icon: BarChart3 },
    { href: "/report", label: t.nav.report, icon: Send },
    { href: "/petition", label: t.nav.petition, icon: FileCheck },
    { href: "/documents", label: t.nav.documents, icon: FileText },
    { href: "/news", label: t.nav.news, icon: FileText },
    { href: "/get-involved", label: t.nav.getInvolved, icon: Users },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1b4332]/95 text-white backdrop-blur-md border-b border-[#2d6a4f]/50 shadow-md">
      {/* Top Advisory Bar */}
      <div className="bg-[#122e22] text-xs text-[#a7d7c5] px-4 py-1 text-center flex items-center justify-center gap-2 border-b border-[#1b4332]">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
        <span>
          <strong>{language === "hi" ? "सूचना:" : "Civic Notice:"}</strong>{" "}
          {language === "hi"
            ? "7,000 प्रभावित वृक्षों की संख्या मीडिया द्वारा अनुमानित है — आधिकारिक वन सर्वेक्षण सत्यापन प्रतीक्षित है।"
            : "The ~7,000 affected trees figure is a reported estimate — official forest department verification is pending."}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] p-1.5 flex items-center justify-center border border-[#40916c]/40 shadow-inner group-hover:scale-105 transition-transform">
              {/* Tree & Road Complementary Icon */}
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-[#74c69d]"
              >
                {/* Road curve */}
                <path
                  d="M10 44C10 44 20 28 20 18C20 10 32 4 42 4"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M14 44C14 44 23 29 23 20"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                {/* Tree Canopy */}
                <circle cx="33" cy="22" r="11" fill="#52b788" opacity="0.9" />
                <circle cx="26" cy="18" r="9" fill="#2d6a4f" />
                <circle cx="38" cy="19" r="8" fill="#40916c" />
                {/* Tree Trunk */}
                <path
                  d="M32 28V42M30 42H34"
                  stroke="#d8f3dc"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white block leading-none">
                {t.siteTitle}
              </span>
              <span className="text-[10px] tracking-wider text-[#95d5b2] uppercase font-medium">
                Ranchi • Jharkhand
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    active
                      ? "bg-[#2d6a4f] text-white shadow-sm"
                      : "text-gray-200 hover:text-white hover:bg-[#2d6a4f]/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Bilingual Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-[#2d6a4f]/70 hover:bg-[#2d6a4f] text-amber-300 border border-amber-400/40 transition-colors shadow-sm"
              title="Switch language (English / हिन्दी)"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === "en" ? "हिन्दी" : "English"}</span>
            </button>

            {/* Admin Link */}
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg bg-gray-800/60 hover:bg-gray-800 text-gray-300 border border-gray-700 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav.admin}</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-gray-200 hover:text-white hover:bg-[#2d6a4f]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#163829] border-t border-[#2d6a4f] px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? "bg-[#2d6a4f] text-white"
                      : "text-gray-200 hover:bg-[#2d6a4f]/50"
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#2d6a4f]/60 flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-medium text-amber-300 hover:underline"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{t.nav.admin} Dashboard</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-gray-300 hover:text-white"
            >
              About the Initiative
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
