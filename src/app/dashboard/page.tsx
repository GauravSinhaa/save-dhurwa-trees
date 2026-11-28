"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, FileText, FileCheck, Shield } from "lucide-react";
import { RanchiHeroSection } from "@/components/dashboard/RanchiHeroSection";
import { RanchiInteractiveMap } from "@/components/dashboard/RanchiInteractiveMap";
import { RanchiAQISection } from "@/components/dashboard/RanchiAQISection";
import { RanchiTreesCutPlantChart } from "@/components/dashboard/RanchiTreesCutPlantChart";
import { RanchiWildlifeSection } from "@/components/dashboard/RanchiWildlifeSection";
import { RanchiEcosystemChain } from "@/components/dashboard/RanchiEcosystemChain";
import { RanchiCorrelationChart } from "@/components/dashboard/RanchiCorrelationChart";
import { RanchiHealthCalculator } from "@/components/dashboard/RanchiHealthCalculator";
import { RanchiHECCaseStudy } from "@/components/dashboard/RanchiHECCaseStudy";
import { RanchiActionSection } from "@/components/dashboard/RanchiActionSection";
import { RanchiTransparencySection } from "@/components/dashboard/RanchiTransparencySection";

export default function RanchiDashboardPage() {
  const [selectedHotspot, setSelectedHotspot] = useState<string>("ALL");

  return (
    <div className="min-h-screen bg-[#fbfaf5] text-[#1c2826] space-y-12 pb-24">
      {/* 1. Hero Section - Ranchi is Choking */}
      <RanchiHeroSection
        selectedHotspot={selectedHotspot}
        onSelectHotspot={setSelectedHotspot}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Featured Statutory Evidence Dossier Quick Download Banner */}
        <div className="bg-gradient-to-br from-[#0c2419] via-[#1b4332] to-[#2d6a4f] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <FileCheck className="w-3 h-3" />
                <span>Verified Evidence Record</span>
              </span>
              <span className="text-xs text-emerald-300 font-medium">
                SHAJ Tender 2026_SHAJ_111047_1 • CPCB • FSI • eBird
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
              Official Statutory Evidence Dossier & Source Verification Manual
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              The authoritative evidence document backing every statistic, map point, and air quality chart across this dashboard. Download the comprehensive PDF with verified tender IDs, CPCB CAAQMS air monitoring records, and CAMPA survival audits.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/documents/Save_Ranchi_Trees_Official_Evidence_Dossier.pdf"
              download="Save_Ranchi_Trees_Official_Evidence_Dossier.pdf"
              className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-105"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download Evidence Dossier (.PDF)</span>
            </a>
            <Link
              href="/documents"
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-300" />
              <span>Browse All Records</span>
            </Link>
          </div>
        </div>

        {/* 2. Ranchi Map - Interactive Leaflet Map */}
        <section id="ranchi-map" className="scroll-mt-20">
          <RanchiInteractiveMap
            selectedHotspot={selectedHotspot}
            onSelectHotspot={setSelectedHotspot}
            height="620px"
          />
        </section>

        {/* 3. AQI Change Over Years - Ranchi City */}
        <section id="aqi-trends" className="scroll-mt-20">
          <RanchiAQISection />
        </section>

        {/* 4. Trees Cut vs Planted - Ranchi District */}
        <section id="trees-audit" className="scroll-mt-20">
          <RanchiTreesCutPlantChart />
        </section>

        {/* 5. Birds & Wildlife of Ranchi - Extinction Risk */}
        <section id="wildlife-risk" className="scroll-mt-20">
          <RanchiWildlifeSection />
        </section>

        {/* 6. One Tree = One Ecosystem Chain */}
        <section id="ecosystem-chain" className="scroll-mt-20">
          <RanchiEcosystemChain />
        </section>

        {/* 7. Decline Chart - Trees vs Birds vs AQI */}
        <section id="decline-correlation" className="scroll-mt-20">
          <RanchiCorrelationChart />
        </section>

        {/* 8. Health Cost for Ranchi People */}
        <section id="health-cost" className="scroll-mt-20">
          <RanchiHealthCalculator />
        </section>

        {/* Spotlight Case Study: HEC & Dhurwa Corridor */}
        <section id="hec-case-study" className="scroll-mt-20">
          <RanchiHECCaseStudy />
        </section>

        {/* 9. What Can Ranchi Do? - Action CTAs */}
        <section id="citizen-action" className="scroll-mt-20">
          <RanchiActionSection />
        </section>

        {/* 10. Transparency & Open Data */}
        <section id="transparency" className="scroll-mt-20">
          <RanchiTransparencySection />
        </section>
      </div>
    </div>
  );
}
