"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import {
  Wind,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  Info,
  Calendar,
  Layers,
  Sparkles,
  Download,
} from "lucide-react";
import dashboardData from "@/data/ranchi-environmental-data.json";
import { downloadCsv } from "@/lib/csvExport";

export const RanchiAQISection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"CITY_TREND" | "AREA_COMPARISON">("CITY_TREND");
  const [selectedAreaInsight, setSelectedAreaInsight] = useState<number>(0);

  const annualTrend = dashboardData.aqi_trend_annual;
  const areaComparison = dashboardData.aqi_area_comparison;
  const areaInsights = dashboardData.area_insights;

  const handleDownloadAqiCsv = () => {
    if (activeTab === "CITY_TREND") {
      downloadCsv(
        "ranchi_annual_aqi_particulate_trend_2019_2025",
        [
          "Year",
          "Annual Average AQI",
          "PM2.5 Concentration (ug/m3)",
          "PM10 Concentration (ug/m3)",
          "Poor or Very Poor Air Days per Year",
          "CPCB Air Quality Tier",
          "Associated Infrastructure & Canopy Event",
          "Primary Data Source",
        ],
        annualTrend.map((a) => [
          a.year,
          a.aqi,
          a.pm25,
          a.pm10,
          a.poor_very_poor_days,
          a.status,
          a.notable_event,
          "Central Pollution Control Board (CPCB) CAAQMS",
        ])
      );
    } else {
      downloadCsv(
        "ranchi_area_wise_aqi_comparison_2019_2025",
        ["Year", "Harmu AQI (Bypass & Riverfront)", "Kanke AQI (Dam & BAU)", "Dhurwa AQI (Smart City & HEC)", "Morabadi AQI (Tagore Hill)", "Data Source"],
        areaComparison.map((r) => [
          r.year,
          r.Harmu,
          r.Kanke,
          r.Dhurwa,
          r.Morabadi,
          "CPCB & Jharkhand State Pollution Control Board (JSPCB)",
        ])
      );
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Wind className="w-3.5 h-3.5 text-amber-700" />
            <span>Air Quality Deterioration (2019 - 2025)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            How Tree Cutting Skyrocketed Ranchi’s AQI
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
            Trees act as mechanical particulate scrubbers and microclimate buffers. As continuous mature avenue canopies were severed for flyovers and road widening, particulate dust (PM2.5 and PM10) rose to toxic levels.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl self-start md:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab("CITY_TREND")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "CITY_TREND"
                ? "bg-white text-gray-950 shadow-sm font-bold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Citywide AQI & Particulate Trend
          </button>
          <button
            onClick={() => setActiveTab("AREA_COMPARISON")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "AREA_COMPARISON"
                ? "bg-white text-gray-950 shadow-sm font-bold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Area-wise Comparison (Harmu vs Kanke vs Dhurwa)
          </button>
        </div>
      </div>

      {/* Chart View */}
      {activeTab === "CITY_TREND" ? (
        <div className="space-y-4">
          <div className="h-80 sm:h-96 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={annualTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-gray-950 text-white p-3.5 rounded-xl text-xs space-y-1.5 shadow-xl border border-gray-800">
                          <div className="font-extrabold text-sm text-amber-400">
                            Ranchi City — Year {label}
                          </div>
                          <div>
                            <strong>Annual Average AQI:</strong>{" "}
                            <span className="text-red-400 font-bold">{data.aqi}</span> ({data.status})
                          </div>
                          <div>
                            <strong>PM2.5:</strong> {data.pm25} µg/m³ (WHO Safe Limit: 5 µg)
                          </div>
                          <div>
                            <strong>PM10:</strong> {data.pm10} µg/m³
                          </div>
                          <div>
                            <strong>Poor / Very Poor Days:</strong>{" "}
                            <span className="text-amber-300 font-semibold">{data.poor_very_poor_days} days</span>
                          </div>
                          <div className="text-[10px] text-gray-400 pt-1 border-t border-gray-800">
                            {data.notable_event}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                <Line
                  type="monotone"
                  dataKey="aqi"
                  name="Annual Average AQI"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#dc2626" }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="pm10"
                  name="PM10 (µg/m³)"
                  stroke="#d97706"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
                <Line
                  type="monotone"
                  dataKey="pm25"
                  name="PM2.5 (µg/m³)"
                  stroke="#0284c7"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="poor_very_poor_days"
                  name="Poor Days / Year"
                  stroke="#7c3aed"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Micro Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-red-50 border border-red-200/60 rounded-xl p-3 text-center">
              <span className="text-[10px] font-bold text-red-800 uppercase tracking-wider block">
                2019 Baseline AQI
              </span>
              <span className="text-2xl font-black text-red-700 block">118</span>
              <span className="text-[10px] text-gray-500">Pre-major flyover felling</span>
            </div>
            <div className="bg-red-100 border border-red-300 rounded-xl p-3 text-center">
              <span className="text-[10px] font-bold text-red-900 uppercase tracking-wider block">
                2025 Current AQI
              </span>
              <span className="text-2xl font-black text-red-900 block">196</span>
              <span className="text-[10px] text-red-700 font-semibold">+66.1% Deterioration</span>
            </div>
            <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3 text-center">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                PM2.5 Surge
              </span>
              <span className="text-2xl font-black text-amber-800 block">86 µg/m³</span>
              <span className="text-[10px] text-amber-900 font-semibold">17x over WHO limit</span>
            </div>
            <div className="bg-purple-50 border border-purple-200/60 rounded-xl p-3 text-center">
              <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">
                Poor Air Days
              </span>
              <span className="text-2xl font-black text-purple-900 block">152 / yr</span>
              <span className="text-[10px] text-gray-500">Up from 38 in 2019</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="h-80 sm:h-96 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={areaComparison} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-950 text-white p-3.5 rounded-xl text-xs space-y-1.5 shadow-xl border border-gray-800">
                          <div className="font-extrabold text-sm text-emerald-400">
                            Ranchi Stations — Year {label} (AQI)
                          </div>
                          {payload.map((entry: any) => (
                            <div key={entry.name} className="flex items-center justify-between gap-4">
                              <span style={{ color: entry.color }} className="font-bold">
                                {entry.name}:
                              </span>
                              <span className="font-mono font-bold text-white">{entry.value}</span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                <Line
                  type="monotone"
                  dataKey="Harmu"
                  name="Harmu (Severe Loss Corridor)"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Dhurwa"
                  name="Dhurwa & HEC (Smart City clearing)"
                  stroke="#ea580c"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Morabadi"
                  name="Morabadi (Tagore Hill)"
                  stroke="#d97706"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Kanke"
                  name="Kanke (Dam & Agricultural Univ)"
                  stroke="#16a34a"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-gray-500 italic text-center">
            Harmu deteriorated fastest after 2,600 trees were removed for the bypass and riverfront concreting. Dhurwa, formerly Ranchi's cleanest station, is now spiking as Smart City felling advances.
          </p>
        </div>
      )}

      {/* Dynamic Area Insight Box */}
      <div className="bg-gradient-to-r from-red-50 via-amber-50 to-emerald-50 rounded-2xl p-4 sm:p-5 border border-red-200/70 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-red-600" />
            <span>Empirical Environmental Insight:</span>
          </div>
          <div className="flex items-center gap-1">
            {areaInsights.map((ins, idx) => (
              <button
                key={ins.area}
                onClick={() => setSelectedAreaInsight(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedAreaInsight === idx
                    ? "bg-red-700 text-white shadow-sm"
                    : "bg-white/80 text-gray-700 hover:bg-white"
                }`}
              >
                {ins.area}
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm font-semibold text-gray-900 leading-relaxed bg-white/70 p-3.5 rounded-xl border border-red-200/50">
          "{areaInsights[selectedAreaInsight].text}"
        </div>
      </div>

      {/* Verifiable Link / Source & CSV Download */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap text-gray-700">
            <span className="font-bold text-gray-900">Air Quality Sources:</span>
            <a
              href="https://cpcb.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>CPCB National Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://jspcb.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>JSPCB Telemetry Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-[11px] text-gray-500">
            Telemetry continuous monitoring stations: Albert Ekka Chowk, Harmu Housing Colony, Kanke BAU, and Dhurwa Institutional Hub.
          </p>
        </div>

        <button
          onClick={handleDownloadAqiCsv}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs transition-colors shadow-sm self-start sm:self-auto shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download {activeTab === "CITY_TREND" ? "City AQI Trend" : "Area AQI Comparison"} (CSV)</span>
        </button>
      </div>
    </div>
  );
};
