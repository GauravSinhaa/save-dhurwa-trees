"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { InteractiveTreeMap } from "@/components/map/InteractiveTreeMap";
import {
  Trees,
  MapPin,
  FileCheck,
  Send,
  AlertTriangle,
  ShieldCheck,
  Compass,
  ArrowRight,
  TrendingDown,
  SunMedium,
  Droplets,
  Bird,
  HeartPulse,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { AvianImpactSection } from "@/components/biodiversity/AvianImpactSection";
import { GrassrootsSpotlight } from "@/components/community/GrassrootsSpotlight";
import { QuickReportSection } from "@/components/home/QuickReportSection";

export default function HomePage() {
  const { language, t } = useLanguage();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[640px] flex items-center justify-center overflow-hidden bg-[#0d2319]">
        {/* Background Image with Natural Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_trees.jpg"
            alt="Mature Sal and Banyan canopy avenue in Ranchi"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2319] via-[#0d2319]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2319] via-[#0d2319]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b4332]/80 border border-[#40916c]/50 text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>{t.tagline}</span>
            <span className="text-gray-400">•</span>
            <span className="text-amber-300 font-normal">{t.taglineAlt}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-sm">
            {t.hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base sm:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {t.hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold text-sm transition-all shadow-lg hover:shadow-emerald-900/50 hover:-translate-y-0.5 border border-[#52b788]/40"
            >
              <MapPin className="w-4 h-4 text-emerald-300" />
              <span>{t.hero.ctaMap}</span>
            </Link>

            <Link
              href="/petition"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-sm transition-all shadow-lg hover:shadow-amber-900/40 hover:-translate-y-0.5"
            >
              <FileCheck className="w-4 h-4 text-gray-900" />
              <span>{t.hero.ctaPetition}</span>
            </Link>

            <Link
              href="/report"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 backdrop-blur-sm transition-all"
            >
              <Send className="w-4 h-4 text-emerald-300" />
              <span>{t.hero.ctaReport}</span>
            </Link>
          </div>

          {/* Civic Clarification: Lawful Research Initiative, Not a Protest */}
          <div className="mt-8 max-w-2xl mx-auto bg-emerald-950/70 border border-emerald-400/50 rounded-xl px-4 py-2.5 text-xs text-emerald-100 backdrop-blur-md flex items-center justify-center gap-2.5 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="leading-snug">
              <strong>
                {language === "hi"
                  ? "नागरिक स्थिति (सकारात्मक पहल):"
                  : "Civic Notice (Constructive Dialogue):"}
              </strong>{" "}
              {language === "hi"
                ? "यह मंच कोई विरोध प्रदर्शन (प्रोटेस्ट) या आंदोलन नहीं है। यह सरकारी नियमों के पूर्ण अनुपालन में वैज्ञानिक डेटा संकलन, वृक्ष मैपिंग और सतत विकास हेतु पारदर्शी नागरिक सहयोग की पहल है।"
                : "This platform is NOT an agitation or protest. It is a strictly lawful, nonpartisan scientific research and civic documentation effort to assist urban planning and preserve Ranchi's green cover."}
            </span>
          </div>

          {/* Verification Disclaimer */}
          <div className="mt-4 max-w-2xl mx-auto bg-black/40 border border-amber-400/40 rounded-xl p-3 text-xs text-amber-200/90 backdrop-blur-md flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.hero.disclaimer}</span>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Stat 1: Reported estimate */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 shadow-md flex flex-col justify-between">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded">
                Unverified Report
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-950 mt-2 font-mono">
                ~7,000
              </div>
              <div className="text-xs font-semibold text-amber-900 mt-1">
                {t.stats.reportedAffected}
              </div>
            </div>
            <div className="text-[10px] text-amber-700/80 mt-2 italic">
              {t.stats.reportedSubtitle}
            </div>
          </div>

          {/* Stat 2: Individually Verified Trees */}
          <div className="bg-white border border-[#2d6a4f]/30 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Field Verified
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] mt-2 font-mono">
                {stats?.verifiedTrees ?? "6"}
              </div>
              <div className="text-xs font-semibold text-gray-800 mt-1">
                {t.stats.verifiedTrees}
              </div>
            </div>
            <div className="text-[10px] text-gray-500 mt-2">
              {t.stats.verifiedSubtitle}
            </div>
          </div>

          {/* Stat 3: Citizen Reports */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                Citizen Input
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 font-mono">
                {stats?.citizenReportsCount ?? "2"}
              </div>
              <div className="text-xs font-semibold text-gray-800 mt-1">
                {t.stats.citizenReports}
              </div>
            </div>
            <div className="text-[10px] text-gray-500 mt-2">
              {t.stats.citizenSubtitle}
            </div>
          </div>

          {/* Stat 4: Public Supporters */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                Petition
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-950 mt-2 font-mono">
                {stats?.publicSupporterCount ?? "5"}
              </div>
              <div className="text-xs font-semibold text-gray-800 mt-1">
                {t.stats.supporters}
              </div>
            </div>
            <div className="text-[10px] text-gray-500 mt-2">
              {t.stats.supportersSubtitle}
            </div>
          </div>

          {/* Stat 5: Official Documents */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                Transparency
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-950 mt-2 font-mono">
                {stats?.officialDocumentsCount ?? "4"}
              </div>
              <div className="text-xs font-semibold text-gray-800 mt-1">
                {t.stats.officialDocs}
              </div>
            </div>
            <div className="text-[10px] text-gray-500 mt-2">
              {t.stats.officialDocsSubtitle}
            </div>
          </div>

          {/* Stat 6: Pending Verification */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-orange-800 bg-orange-100 px-2 py-0.5 rounded">
                Review Queue
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-orange-950 mt-2 font-mono">
                {stats?.pendingTrees ?? "1"}
              </div>
              <div className="text-xs font-semibold text-gray-800 mt-1">
                {t.stats.pendingReview}
              </div>
            </div>
            <div className="text-[10px] text-gray-500 mt-2">
              {t.stats.pendingReviewSubtitle}
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters: 4 Evidence Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] tracking-tight">
            {t.whyItMatters.title}
          </h2>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            {t.whyItMatters.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Heat */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2dfd4] shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <SunMedium className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900 mb-2">
              {t.whyItMatters.urbanHeat.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.whyItMatters.urbanHeat.desc}
            </p>
          </div>

          {/* Card 2: Biodiversity */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2dfd4] shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bird className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900 mb-2">
              {t.whyItMatters.biodiversity.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.whyItMatters.biodiversity.desc}
            </p>
          </div>

          {/* Card 3: Water and Soil */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2dfd4] shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900 mb-2">
              {t.whyItMatters.waterSoil.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.whyItMatters.waterSoil.desc}
            </p>
          </div>

          {/* Card 4: Public Health */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2dfd4] shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900 mb-2">
              {t.whyItMatters.publicHealth.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.whyItMatters.publicHealth.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Avian and Canopy Fauna Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AvianImpactSection />
      </section>

      {/* Featured Interactive Map Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Interactive Geospatial Evidence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] tracking-tight">
              Dhurwa Road Corridor Map
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Surveyed tree markers along Vivekananda School More to Naya Sarai (6.089 km)
            </p>
          </div>
          <Link
            href="/map"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1b4332] text-white text-xs font-semibold hover:bg-[#2d6a4f] transition-colors self-start md:self-auto"
          >
            <span>Full-Screen GIS Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Embedded Interactive Map */}
        <InteractiveTreeMap height="560px" showFilters={true} />
      </section>

      {/* Grassroots Citizen Movement Spotlight: @hamari.ranchi & @highpurpos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GrassrootsSpotlight />
      </section>

      {/* Dhurwa 10-Lane Road Quick Citizen Tree Report Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuickReportSection />
      </section>

      {/* Action Banner: Submit a Tree & Public Petition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: Citizen Tree Reporting */}
          <div className="bg-white p-8 rounded-3xl border border-[#e2dfd4] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Submit a Field Tree Observation
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Notice a mature tree or construction activity near Dhurwa, Jagannathpur, or
                Naya Sarai? Upload a photograph and GPS coordinate. Your submission will be
                peer-reviewed and added to the public record.
              </p>
            </div>
            <Link
              href="/report"
              className="inline-flex items-center justify-between px-5 py-3 rounded-xl bg-[#1b4332] text-white font-semibold text-xs hover:bg-[#2d6a4f] transition-colors"
            >
              <span>Open Mobile Tree Submission Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Box 2: Sign Public Petition */}
          <div className="bg-[#fcfbf7] p-8 rounded-3xl border border-amber-300/80 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Sign the Citizen Petition for Smarter Planning
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Join fellow Ranchi residents in calling upon the road authorities to disclose
                tree surveys, conduct transparent public consultations, and protect mature
                trees before irreversible cutting occurs.
              </p>
            </div>
            <Link
              href="/petition"
              className="inline-flex items-center justify-between px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs transition-colors"
            >
              <span>Add Your Name to the Petition</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
