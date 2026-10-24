"use client";

import React, { useEffect, useState } from "react";
import { InteractiveTreeMap } from "@/components/map/InteractiveTreeMap";
import { useLanguage } from "@/context/LanguageContext";
import {
  Download,
  Info,
  ShieldCheck,
  AlertTriangle,
  Compass,
  FileSpreadsheet,
  Layers,
  Sparkles,
} from "lucide-react";

export default function TreeMapPage() {
  const { language } = useLanguage();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        if (json.success) setStats(json.data);
      } catch (e) {
        console.error(e);
      }
    }
    loadStats();
  }, []);

  const handleExportCSV = async () => {
    try {
      const res = await fetch("/api/trees");
      const json = await res.json();
      if (!json.success || !json.data) return;

      const headers = [
        "public_tree_id",
        "species_common_name",
        "species_scientific_name",
        "latitude",
        "longitude",
        "locality",
        "trunk_circumference_cm",
        "estimated_height_m",
        "health_status",
        "threat_status",
        "verification_status",
        "source_type",
        "survey_date",
      ];

      const rows = json.data.map((t: any) =>
        headers.map((h) => `"${t[h] ?? ""}"`).join(",")
      );

      const csvContent =
        "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `save_dhurwa_trees_census_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert("Failed to export tree data");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Live Geographic Information System
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] tracking-tight mt-1">
            Dhurwa Road Corridor Interactive Tree Map
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl">
            Explore verified tree specimens, reported citizen observations, and the
            reported 6.089 km road corridor from Vivekananda School More to Naya Sarai.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold rounded-xl text-xs shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export Public Census CSV</span>
          </button>
        </div>
      </div>

      {/* Top Geographic KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-[11px] text-gray-500 block">Total Mapped Trees</span>
          <span className="text-xl font-extrabold text-[#1b4332] font-mono mt-0.5 block">
            {stats?.totalRecordedTrees ?? "8"}
          </span>
          <span className="text-[10px] text-gray-400">Database GIS markers</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-[11px] text-emerald-700 font-medium block">
            Verified Trees
          </span>
          <span className="text-xl font-extrabold text-emerald-800 font-mono mt-0.5 block">
            {stats?.verifiedTrees ?? "6"}
          </span>
          <span className="text-[10px] text-emerald-600">On-ground census verified</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-[11px] text-amber-700 font-medium block">
            Corridor Conflicts
          </span>
          <span className="text-xl font-extrabold text-amber-900 font-mono mt-0.5 block">
            {stats?.potentiallyAffectedInCorridor ?? "6"}
          </span>
          <span className="text-[10px] text-amber-700">Within 60m right-of-way</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-[11px] text-purple-700 font-medium block">
            Mature Old-Growth
          </span>
          <span className="text-xl font-extrabold text-purple-900 font-mono mt-0.5 block">
            {stats?.matureTreeCount ?? "5"}
          </span>
          <span className="text-[10px] text-purple-600">Girth &gt; 150 cm (DBH &gt; 50cm)</span>
        </div>

        <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-300 shadow-sm col-span-2 md:col-span-1">
          <span className="text-[11px] text-amber-900 font-bold block">
            Reported Overall Estimate
          </span>
          <span className="text-xl font-extrabold text-amber-950 font-mono mt-0.5 block">
            ~7,000
          </span>
          <span className="text-[10px] text-amber-800 italic">Unverified estimate</span>
        </div>
      </div>

      {/* Main Full-Height Interactive Leaflet Map */}
      <InteractiveTreeMap height="700px" showFilters={true} />

      {/* Evidence & Methodology Note */}
      <div className="bg-[#f6f4ee] p-4 rounded-2xl border border-[#e2dfd4] text-xs text-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-2.5">
          <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Data Integrity Standard:</strong> Tree positions are verified by GPS
            waypoint recordings and photographs. Trees tagged with{" "}
            <span className="inline-block px-1.5 py-0.2 bg-indigo-100 text-indigo-800 rounded font-bold font-mono">
              [DEMO]
            </span>{" "}
            are clearly marked development demonstration samples and are never passed off
            as verified survey findings.
          </p>
        </div>
        <a
          href="/report"
          className="shrink-0 px-4 py-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-medium rounded-xl text-xs transition-colors"
        >
          Submit Tree Observation
        </a>
      </div>
    </div>
  );
}
