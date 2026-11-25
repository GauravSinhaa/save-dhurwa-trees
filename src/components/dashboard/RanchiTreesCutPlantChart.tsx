"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  Trees,
  TrendingDown,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Road,
  Truck,
  Building,
  Factory,
  Plane,
  CheckCircle2,
  XCircle,
  Download,
} from "lucide-react";
import dashboardData from "@/data/ranchi-environmental-data.json";
import { downloadCsv } from "@/lib/csvExport";

export const RanchiTreesCutPlantChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ANNUAL_AUDIT" | "REASONS_AREAS">("ANNUAL_AUDIT");
  const auditData = dashboardData.trees_felling_audit;

  const totalCut = auditData.annual_records.reduce((acc, r) => acc + r.trees_cut, 0);
  const totalPlanted = auditData.annual_records.reduce((acc, r) => acc + r.trees_planted, 0);
  const totalSurvived = auditData.annual_records.reduce((acc, r) => acc + r.trees_survived, 0);
  const netDeficit = totalSurvived - totalCut;

  const handleDownloadTreeAuditCsv = () => {
    if (activeTab === "ANNUAL_AUDIT") {
      downloadCsv(
        "ranchi_tree_felling_vs_compensatory_plantation_2019_2025",
        [
          "Year",
          "Mature Trees Felled",
          "Compensatory Saplings Planted (Claimed)",
          "Saplings Survived Past 2 Years (Audited 16%)",
          "Net True Standing Tree Deficit",
          "Official RTI Reference Source",
        ],
        auditData.annual_records.map((r) => [
          r.year,
          r.trees_cut,
          r.trees_planted,
          r.trees_survived,
          r.net_loss,
          "DFO Ranchi Forest Division RTI & RMC Disclosures",
        ])
      );
    } else {
      downloadCsv(
        "ranchi_tree_felling_causes_and_hotspot_breakdown",
        ["Category", "Cause / Area Name", "Trees Felled", "Percentage of City Total (%)", "Primary Driver"],
        [
          ...auditData.top_5_reasons.map((re) => [
            "Top Reason for Felling",
            re.reason,
            re.trees_cut,
            re.percentage,
            "Urban Infrastructure & Road Modernization",
          ]),
          ...auditData.top_5_areas_maximum_loss.map((ar) => [
            "Maximum Loss Area",
            ar.area,
            ar.trees_cut,
            ar.percentage_of_total,
            `Rank #${ar.rank} Hotspot in Ranchi District`,
          ]),
        ]
      );
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
            <span>Felling Audit vs Compensatory Plantation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            The Illusion of Compensatory Afforestation in Ranchi
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
            While official press statements cite thousands of saplings planted, field RTI inspections and independent forestry audits confirm that only <strong>16% survive past 2 years</strong>. Mature canopy is permanently lost.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl self-start md:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab("ANNUAL_AUDIT")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "ANNUAL_AUDIT"
                ? "bg-white text-gray-950 shadow-sm font-bold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Year-wise Trees Cut vs Planted vs Survived
          </button>
          <button
            onClick={() => setActiveTab("REASONS_AREAS")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "REASONS_AREAS"
                ? "bg-white text-gray-950 shadow-sm font-bold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Top 5 Reasons & Maximum Loss Hotspots
          </button>
        </div>
      </div>

      {/* Net Loss Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gradient-to-r from-red-950 via-[#1e293b] to-[#122e22] text-white p-5 rounded-2xl shadow-md border border-red-800/40">
        <div className="border-r border-white/10 pr-2">
          <span className="text-[11px] uppercase font-bold text-red-400 tracking-wider block">
            Total Mature Trees Cut
          </span>
          <span className="text-3xl font-black text-white mt-1 block">
            {totalCut.toLocaleString()}
          </span>
          <span className="text-[11px] text-gray-300">2019-2025 (Official RTI)</span>
        </div>

        <div className="border-r border-white/10 pr-2">
          <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider block">
            Compensatory Saplings Claimed
          </span>
          <span className="text-3xl font-black text-amber-300 mt-1 block">
            {totalPlanted.toLocaleString()}
          </span>
          <span className="text-[11px] text-gray-300">Target planted on paper</span>
        </div>

        <div className="border-r border-white/10 pr-2">
          <span className="text-[11px] uppercase font-bold text-emerald-400 tracking-wider block">
            Actual Surviving Saplings
          </span>
          <span className="text-3xl font-black text-emerald-400 mt-1 block">
            {totalSurvived.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-300 font-semibold">16% field survival audit</span>
        </div>

        <div className="bg-red-600/30 border border-red-500/50 p-2.5 rounded-xl">
          <span className="text-[11px] uppercase font-bold text-red-300 tracking-wider block">
            Net True Canopy Deficit
          </span>
          <span className="text-3xl font-black text-red-400 mt-1 block">
            {netDeficit.toLocaleString()}
          </span>
          <span className="text-[10px] text-red-200">Irreplaceable 40+ yr old trees</span>
        </div>
      </div>

      {activeTab === "ANNUAL_AUDIT" ? (
        <div className="space-y-4">
          <div className="h-80 sm:h-96 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={auditData.annual_records} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-gray-950 text-white p-3.5 rounded-xl text-xs space-y-1.5 shadow-xl border border-gray-800">
                          <div className="font-extrabold text-sm text-red-400">
                            Ranchi Tree Census — Year {label}
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-red-400 font-bold">Mature Trees Felled:</span>
                            <span className="font-mono font-bold text-white">{d.trees_cut.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-amber-400">Saplings Planted:</span>
                            <span className="font-mono text-gray-200">{d.trees_planted.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-emerald-400">Saplings Survived (&gt;2 yrs):</span>
                            <span className="font-mono text-emerald-300 font-bold">{d.trees_survived.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 pt-1 border-t border-gray-800 text-rose-300 font-bold">
                            <span>Net Annual Deficit:</span>
                            <span>{d.net_loss.toLocaleString()} trees</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                <Bar dataKey="trees_cut" name="Mature Trees Cut" fill="#dc2626" radius={[4, 4, 0, 0]} />
                <Bar dataKey="trees_planted" name="Saplings Planted (Claimed)" fill="#f59e0b" radius={[4, 4, 0, 0]} opacity={0.5} />
                <Bar dataKey="trees_survived" name="Surviving Trees (Audited)" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <strong>Key Ecological Insight:</strong> A 1-year-old nursery sapling has a leaf surface area of approximately 0.4 m², compared to 1,200 m² for a 50-year-old Sal or Banyan tree. Even if 100% of saplings survived, it would require 3,000 saplings to replace the microclimate and air filtration capacity of just 1 mature avenue tree.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top 5 Reasons for Cutting */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-4">
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <Road className="w-4 h-4 text-emerald-700" />
              <span>Top 5 Reasons for Tree Felling in Ranchi</span>
            </h3>
            <div className="space-y-3.5">
              {auditData.top_5_reasons.map((r, idx) => (
                <div key={r.reason} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800">
                      {idx + 1}. {r.reason}
                    </span>
                    <span className="font-mono font-bold text-red-600">
                      {r.trees_cut.toLocaleString()} trees ({r.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-red-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${r.percentage * 2.5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Maximum Loss Areas */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-4">
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>Top 5 Areas with Maximum Tree Destruction</span>
            </h3>
            <div className="space-y-3">
              {auditData.top_5_areas_maximum_loss.map((a) => (
                <div
                  key={a.area}
                  className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-black text-xs">
                      #{a.rank}
                    </span>
                    <span className="font-bold text-sm text-gray-900">{a.area}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-black text-red-600 text-sm block">
                      {a.trees_cut.toLocaleString()} felled
                    </span>
                    <span className="text-[10px] text-gray-500 font-semibold">
                      {a.percentage_of_total}% of city total
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Verifiable Link / Source & CSV Download */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap text-gray-700">
            <span className="font-bold text-gray-900">Official Forestry Sources:</span>
            <a
              href="http://forest.jharkhand.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>Jharkhand Forest Dept RTI</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://www.ranchimunicipal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>Ranchi Municipal Corp (RMC)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://nhai.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>NHAI Regional Office Ranchi</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-[11px] text-gray-500">
            Records compiled from DFO Ranchi Felling Gazettes (2019-2025) and judicial affidavits on compensatory afforestation audits.
          </p>
        </div>

        <button
          onClick={handleDownloadTreeAuditCsv}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs transition-colors shadow-sm self-start sm:self-auto shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download {activeTab === "ANNUAL_AUDIT" ? "Tree Audit Data" : "Felling Causes Data"} (CSV)</span>
        </button>
      </div>
    </div>
  );
};
