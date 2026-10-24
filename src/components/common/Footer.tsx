"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Trees, Shield, ExternalLink, Heart, Info, ArrowUpRight, Phone, MessageCircle } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#122e22] text-gray-300 border-t border-[#1b4332] text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2d6a4f] flex items-center justify-center text-emerald-300">
                <Trees className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                SAVE DHURWA TREES
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              &quot;{t.tagline}&quot;
              <br />
              {t.supportingMessage}
            </p>
            <p className="text-xs text-amber-300/90 font-mono bg-[#1b4332]/60 p-2 rounded border border-[#2d6a4f]/50">
              Focus: Dhurwa, Jagannathpur, Naya Sarai & Ring Road, Ranchi, Jharkhand.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/map" className="hover:text-emerald-400 transition-colors">
                  Interactive Tree Map & Census
                </Link>
              </li>
              <li>
                <Link href="/project" className="hover:text-emerald-400 transition-colors">
                  The Dhurwa Project Corridor
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-emerald-400 transition-colors">
                  Environmental Impact & Carbon Analysis
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-emerald-400 transition-colors">
                  Transparency Centre & RTI Drafts
                </Link>
              </li>
            </ul>
          </div>

          {/* Public Participation */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Civic Participation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/report" className="hover:text-emerald-400 transition-colors">
                  Submit Field Tree Observation (Mobile GPS)
                </Link>
              </li>
              <li>
                <Link href="/petition" className="hover:text-emerald-400 transition-colors">
                  Sign Public Petition for Smarter Roads
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="hover:text-emerald-400 transition-colors">
                  Volunteer & Citizen Action Kit
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-emerald-400 transition-colors">
                  Chronological Updates & Orders
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition-colors">
                  Admin Verification Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Nonpartisan stance */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">
              Legal & Fact-Based Stance
            </h4>
            <div className="p-3 bg-[#1b4332]/50 rounded-lg border border-[#2d6a4f]/50 text-xs space-y-1.5 text-gray-300">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Shield className="w-3.5 h-3.5" />
                <span>Nonpartisan Civic Initiative</span>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-400">
                {t.footer.disclaimer}
              </p>
              <p className="text-[11px] text-gray-400">
                {t.footer.peacefulStance}
              </p>
            </div>

            {/* Coordinator Contacts & WhatsApp */}
            <div className="p-3 bg-[#16382a] rounded-lg border border-[#2d6a4f]/70 text-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                Coordinator Helplines
              </span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Primary Admin:</span>
                  <a
                    href="tel:+917667597383"
                    className="font-mono text-white font-semibold hover:text-emerald-300 flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>+91 76675 97383</span>
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">WhatsApp Desk:</span>
                  <a
                    href="https://wa.me/919884029319?text=Hello%21%20I%20would%20like%20to%20connect%20with%20Save%20Dhurwa%20Trees%20team."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-emerald-300 font-semibold hover:text-emerald-200 flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3 text-emerald-400" />
                    <span>+91 98840 29319</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#1b4332] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            © 2026 Save Dhurwa Trees. {t.footer.rights}
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-white transition-colors">
              About & Methodology
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
