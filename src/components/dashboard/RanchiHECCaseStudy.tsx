"use client";

import React from "react";
import Link from "next/link";
import {
  Trees,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Compass,
  FileText,
  MapPin,
  ExternalLink,
  Sparkles,
  Download,
} from "lucide-react";
import dashboardData from "@/data/ranchi-environmental-data.json";
import { downloadCsv } from "@/lib/csvExport";

export const RanchiHECCaseStudy: React.FC = () => {
  const caseStudy = dashboardData.hec_case_study;

  const handleDownloadHecCsv = () => {
    downloadCsv(
      "ranchi_hec_dhurwa_corridor_case_study_data",
      ["Parameter / Metric", "Value", "Unit / Scope", "DPR Reference", "Citizen Mitigation Recommendation"],
      [
        ["Corridor Route Stretch", "Vivekananda School More to Naya Sarai", "6.089 km", "SHAJ-111047-1 Alignment", "Split carriageway maintaining center trees"],
        ["Trees Under Imminent Threat", caseStudy.stats.trees_at_risk, "Trees", "Tree enumeration field survey", "Preserve median heritage avenue"],
        ["Proposed Paved Right-of-Way", caseStudy.stats.proposed_road_width_m, "Meters", "10-lane standard cross section", "Reduce paved width to 35m, saving 82% trees"],
        ["Mature Heritage Trees (>50 yrs)", caseStudy.stats.heritage_trees_above_50_years, "Heritage Stands", "Trunk girth > 150 cm survey", "Designate heritage botanical corridor"],
        ["Dependent Avian Species", caseStudy.stats.bird_species_dependent, "Species", "eBird corridor checklist", "Protect obligate breeding cavities"],
      ]
    );
  };

  return (
    <div className="bg-gradient-to-br from-[#122e22] via-[#0f261c] to-[#0a1b13] text-white p-6 sm:p-10 rounded-3xl border-2 border-emerald-500/40 shadow-xl space-y-6 relative overflow-hidden">
      {/* Decorative Badge */}
      <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>In-Depth Spotlight Case Study (01 / 15 Hotspots)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {caseStudy.title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 max-w-3xl leading-relaxed">
              {caseStudy.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <a
              href="https://c.org/sTJg4xx2Vz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 text-xs font-black transition-all shadow-md hover:scale-105"
            >
              <span>✍️ Sign Petition (750+ Signed)</span>
              <span>↗</span>
            </a>

            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-semibold border border-emerald-400/40 transition-all shadow-md"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>HEC GIS Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 5 Impact Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">
              Corridor Length
            </span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">
              {caseStudy.stats.corridor_length_km} km
            </span>
            <span className="text-[10px] text-gray-400">Vivekananda to Naya Sarai</span>
          </div>

          <div className="bg-red-950/80 p-3.5 rounded-2xl border border-red-500/40 text-center">
            <span className="text-[10px] font-bold text-red-300 uppercase tracking-wider block">
              Trees Under Threat
            </span>
            <span className="text-2xl font-black text-red-400 mt-1 block">
              ~{caseStudy.stats.trees_at_risk.toLocaleString()}
            </span>
            <span className="text-[10px] text-red-300">Estimated corridor impact</span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">
              Proposed Width
            </span>
            <span className="text-2xl font-black text-amber-300 mt-1 block">
              {caseStudy.stats.proposed_road_width_m} m
            </span>
            <span className="text-[10px] text-gray-400">10-lane SHAJ alignment</span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">
              Heritage Trees (&gt;50 yrs)
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {caseStudy.stats.heritage_trees_above_50_years}+
            </span>
            <span className="text-[10px] text-gray-400">Sal, Peepal, Banyan</span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">
              Dependent Birds
            </span>
            <span className="text-2xl font-black text-rose-400 mt-1 block">
              {caseStudy.stats.bird_species_dependent} species
            </span>
            <span className="text-[10px] text-gray-400">Cavity & hollow nesters</span>
          </div>
        </div>

        {/* Narrative & Mitigation Proposal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/30 p-5 sm:p-6 rounded-2xl border border-white/10 text-xs sm:text-sm">
          <div className="space-y-3">
            <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Key Field Observations</span>
            </h4>
            <ul className="space-y-2 text-gray-200 list-disc list-inside leading-relaxed">
              {caseStudy.key_takeaways.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 bg-emerald-950/70 p-4 rounded-xl border border-emerald-500/40">
            <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Constructive Citizen Alternative Design</span>
            </h4>
            <p className="text-emerald-100 leading-relaxed">
              {caseStudy.citizen_mitigation_proposal}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/project"
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-bold underline decoration-amber-400"
              >
                <span>Read Full Engineering Analysis & DPR Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
        {/* Verifiable Link / Source & CSV Download */}
        <div className="bg-black/50 border border-white/15 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap text-emerald-200">
              <span className="font-bold text-white">Case Study Sources:</span>
              <a
                href="https://rcd.jharkhand.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>Jharkhand Road Construction Dept (RCD)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <a
                href="http://forest.jharkhand.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>DFO Ranchi RTI Disclosures</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-gray-400">
              Project alignment SHAJ-111047-1 engineering DPR and community field tree GPS census.
            </p>
          </div>

          <button
            onClick={handleDownloadHecCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm self-start sm:self-auto shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download HEC Corridor Data (CSV)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
