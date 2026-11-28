"use client";

import React from "react";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Wind,
  Bird,
  Trees,
  ShieldAlert,
  Flame,
  ArrowDownRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Download,
} from "lucide-react";
import dashboardData from "@/data/ranchi-environmental-data.json";
import { downloadCsv } from "@/lib/csvExport";

interface RanchiHeroSectionProps {
  selectedHotspot: string;
  onSelectHotspot: (id: string) => void;
}

export const RanchiHeroSection: React.FC<RanchiHeroSectionProps> = ({
  selectedHotspot,
  onSelectHotspot,
}) => {
  const { city_overview, hotspots } = dashboardData;
  const kpis = city_overview.kpis;

  const handleDownloadKpiCsv = () => {
    downloadCsv(
      "ranchi_citywide_kpis_2019_2025",
      ["Indicator", "Value", "Unit", "Primary Official Source", "Source URL", "Verification Basis"],
      [
        [
          "Total Mature Trees Felled",
          kpis.total_trees_cut_2019_2025,
          "Trees",
          "Jharkhand Forest Dept & RMC RTI Disclosures",
          "http://forest.jharkhand.gov.in",
          "Officially recorded tree felling approvals across roads, flyovers & Smart City",
        ],
        [
          "Annual Average AQI (2025)",
          kpis.annual_average_aqi_2025,
          "AQI Index",
          "Central Pollution Control Board (CPCB)",
          "https://cpcb.nic.in",
          "Continuous CAAQMS stations at Albert Ekka, Harmu, Kanke, and Dhurwa",
        ],
        [
          "Urban Dense Canopy Lost",
          kpis.green_cover_lost_pct,
          "Percentage (%)",
          "Forest Survey of India (FSI ISFR 2021 & 2023)",
          "https://fsi.nic.in",
          "Remote sensing satellite canopy reduction within Ranchi municipal zone",
        ],
        [
          "Avian Species at Local Risk",
          kpis.bird_species_at_risk,
          "Species",
          "eBird Ranchi District & State of India's Birds 2023",
          "https://ebird.org/india",
          "Decadal checklist frequency decline of >50% for cavity & canopy nesters",
        ],
        [
          "Compensatory Sapling Survival Rate",
          kpis.compensatory_survival_rate_pct,
          "Percentage (%)",
          "Independent Forestry & RTI Audit",
          "http://forest.jharkhand.gov.in",
          "Field audit of saplings planted under compensatory afforestation schemes",
        ],
        [
          "Net Standing Tree Deficit",
          kpis.net_tree_deficit,
          "Trees",
          "Ecological Accounting",
          "https://save-dhurwa-trees.vercel.app/dashboard",
          "Calculated true canopy deficit after accounting for 16% sapling survival rate",
        ],
      ]
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#091b12] via-[#0f2a1d] to-[#123323] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#2d6a4f]/40">
      {/* Background Subtle Red-Alert Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Urgent Civic Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-red-950/80 border border-red-500/50 rounded-2xl px-4 py-2.5 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-red-200">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="uppercase tracking-wider text-red-400 font-bold">
              Citywide Ecological Emergency
            </span>
            <span className="text-red-400/60 hidden sm:inline">•</span>
            <span className="text-gray-200 hidden sm:inline">
              Ranchi District & Urban Municipal Zone
            </span>
          </div>
          <div className="text-[11px] sm:text-xs text-red-300 flex items-center gap-2 font-medium">
            <a
              href="/documents/Save_Ranchi_Trees_Official_Evidence_Dossier.pdf"
              download="Save_Ranchi_Trees_Official_Evidence_Dossier.pdf"
              className="px-3 py-1 rounded-lg bg-red-900/90 hover:bg-red-800 text-white font-bold flex items-center gap-1.5 border border-red-500/60 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Download Evidence Dossier (.PDF)</span>
            </a>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-300 text-xs font-medium tracking-wide">
            <Trees className="w-3.5 h-3.5 text-emerald-400" />
            <span>Public Evidence Dashboard: Ranchi Tree Dashboard — Heritage Canopy Preservation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            {city_overview.hero_title}
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 leading-relaxed max-w-3xl">
            {city_overview.hero_subtitle}
          </p>

          <p className="text-xs sm:text-sm text-gray-300/80 leading-relaxed">
            Rapid infrastructure projects, flyovers, airport expansion, and smart city grids have felled over{" "}
            <strong className="text-white underline decoration-red-500 decoration-2 font-bold">
              34,000 mature heritage trees
            </strong>{" "}
            in Ranchi between 2019 and 2025. HEC and Dhurwa are the latest frontline, but the crisis spans every corner of the capital.
          </p>
        </div>

        {/* 4 Big KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {/* Card 1: Total Trees Cut */}
          <div className="bg-gradient-to-br from-[#1a382b] to-[#122e22] border-2 border-red-500/50 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-red-400 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  Trees Felled (2019-2025)
                </span>
                <span className="text-[10px] bg-red-950/90 px-2 py-0.5 rounded text-red-300 border border-red-800">
                  Official RTI
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {kpis.total_trees_cut_2019_2025.toLocaleString()}
              </div>
              <p className="text-xs text-red-200/80 mt-2 leading-snug">
                Documented trees cut across Ranchi roads, flyovers & Smart City.
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
                <span>Compensatory Survival:</span>
                <span className="text-red-400 font-bold">{kpis.compensatory_survival_rate_pct}% only</span>
              </div>
            </div>

            {/* Direct Source Link */}
            <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Source: Forest Dept RTI</span>
              <a
                href="http://forest.jharkhand.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>Verify Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 2: Annual Average AQI */}
          <div className="bg-gradient-to-br from-[#1a382b] to-[#122e22] border border-amber-500/40 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-amber-400 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-amber-400" />
                  Annual Average AQI
                </span>
                <span className="text-[10px] bg-amber-950/90 px-2 py-0.5 rounded text-amber-300 border border-amber-800">
                  CPCB 2025
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                  {kpis.annual_average_aqi_2025}
                </span>
                <span className="text-xs font-semibold text-rose-300">"Poor" Tier</span>
              </div>
              <p className="text-xs text-amber-100/80 mt-2 leading-snug">
                Surged from 118 in 2019 to 196 in 2025. Winter spikes routinely exceed 340.
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
                <span>Poor Days / Year:</span>
                <span className="text-amber-400 font-bold">152 days</span>
              </div>
            </div>

            {/* Direct Source Link */}
            <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Source: CPCB CAAQMS</span>
              <a
                href="https://cpcb.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>Verify Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 3: Green Cover Lost */}
          <div className="bg-gradient-to-br from-[#1a382b] to-[#122e22] border border-emerald-500/40 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-emerald-400 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  Urban Canopy Lost
                </span>
                <span className="text-[10px] bg-emerald-950/90 px-2 py-0.5 rounded text-emerald-300 border border-emerald-800">
                  FSI ISFR
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {kpis.green_cover_lost_pct}%
                </span>
                <span className="text-xs font-semibold text-red-300">Dense Canopy</span>
              </div>
              <p className="text-xs text-emerald-100/80 mt-2 leading-snug">
                Reduction in mature dense urban canopy within Ranchi municipal limits since 2015.
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
                <span>Net District Deficit:</span>
                <span className="text-red-300 font-bold">{kpis.net_tree_deficit.toLocaleString()} trees</span>
              </div>
            </div>

            {/* Direct Source Link */}
            <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Source: FSI (ISFR)</span>
              <a
                href="https://fsi.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>Verify Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 4: Bird Species at Risk */}
          <div className="bg-gradient-to-br from-[#1a382b] to-[#122e22] border border-rose-500/40 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-rose-400 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Bird className="w-4 h-4 text-rose-400" />
                  Bird Species at Risk
                </span>
                <span className="text-[10px] bg-rose-950/90 px-2 py-0.5 rounded text-rose-300 border border-rose-800">
                  eBird + IUCN
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-rose-400 tracking-tight">
                  {kpis.bird_species_at_risk}
                </span>
                <span className="text-xs font-semibold text-gray-300">Species in Decline</span>
              </div>
              <p className="text-xs text-rose-100/80 mt-2 leading-snug">
                Hornbills, owls, and flycatchers losing 40+ year hollow nesting trees across city avenues.
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
                <span>Local Extinction Alert:</span>
                <span className="text-rose-400 font-bold">14 species</span>
              </div>
            </div>

            {/* Direct Source Link */}
            <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Source: eBird Ranchi</span>
              <a
                href="https://ebird.org/india"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>Verify Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Unified Source & CSV Download Bar Below KPI Cards */}
        <div className="bg-black/40 border border-white/15 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs backdrop-blur-md">
          <div className="flex items-center gap-2 flex-wrap text-gray-300">
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <span>Official Verification Sources:</span>
            </span>
            <a
              href="https://cpcb.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white underline decoration-emerald-500 inline-flex items-center gap-0.5"
            >
              CPCB CAAQMS <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span>•</span>
            <a
              href="https://fsi.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white underline decoration-emerald-500 inline-flex items-center gap-0.5"
            >
              FSI ISFR Reports <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span>•</span>
            <a
              href="http://forest.jharkhand.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white underline decoration-emerald-500 inline-flex items-center gap-0.5"
            >
              Jharkhand Forest Dept <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span>•</span>
            <a
              href="https://ebird.org/india"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white underline decoration-emerald-500 inline-flex items-center gap-0.5"
            >
              eBird Ranchi Atlas <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <button
            onClick={handleDownloadKpiCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm self-start sm:self-auto shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download KPI Data (CSV)</span>
          </button>
        </div>

        {/* Hotspot Quick Filter Bar */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-300 flex items-center gap-1.5">
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              Filter by Ranchi Hotspot ({hotspots.length} Surveyed Areas):
            </span>
            <span className="text-[11px] text-gray-300">
              Click any area to jump to interactive map and localized environmental metrics
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onSelectHotspot("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedHotspot === "ALL"
                  ? "bg-white text-gray-950 shadow-md font-bold"
                  : "bg-white/10 hover:bg-white/20 text-gray-200"
                }`}
            >
              All Ranchi (Citywide)
            </button>
            {hotspots.map((h) => {
              const isSelected = selectedHotspot === h.id;
              const isSevere = h.status === "SEVERE_LOSS";
              return (
                <button
                  key={h.id}
                  onClick={() => onSelectHotspot(h.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${isSelected
                      ? "bg-amber-400 text-gray-950 font-bold ring-2 ring-white shadow-md"
                      : isSevere
                        ? "bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800/60"
                        : "bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-800/60"
                    }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${isSevere ? "bg-red-500 animate-pulse" : "bg-orange-400"
                      }`}
                  />
                  <span>{h.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
