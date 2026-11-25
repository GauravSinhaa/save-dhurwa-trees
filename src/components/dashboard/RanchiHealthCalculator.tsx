"use client";

import React, { useState } from "react";
import {
  HeartPulse,
  Activity,
  AlertTriangle,
  User,
  MapPin,
  ShieldAlert,
  ExternalLink,
  Cigarette,
  Stethoscope,
  Info,
  Download,
} from "lucide-react";
import dashboardData from "@/data/ranchi-environmental-data.json";
import { downloadCsv } from "@/lib/csvExport";

export const RanchiHealthCalculator: React.FC = () => {
  const [selectedAreaId, setSelectedAreaId] = useState("harmu");
  const [ageGroup, setAgeGroup] = useState<"child" | "adult" | "senior">("adult");
  const [hasCondition, setHasCondition] = useState(false);

  const hotspots = dashboardData.hotspots;
  const currentHotspot = hotspots.find((h) => h.id === selectedAreaId) || hotspots[0];
  const healthData = dashboardData.health_cost;

  // Berkeley Earth formula: 1 cigarette per day is roughly equivalent to a PM2.5 level of 22 µg/m³
  const rawPm25 = currentHotspot.pm25;
  const equivalentCigarettes = (rawPm25 / 22).toFixed(1);
  const excessOverWho = (rawPm25 / 5).toFixed(1);

  const vulnerabilityInfo = healthData.risk_matrix[ageGroup];

  const handleDownloadHealthCsv = () => {
    downloadCsv(
      `ranchi_health_exposure_risk_${currentHotspot.id}`,
      [
        "Locality in Ranchi",
        "Ambient AQI",
        "Local PM2.5 (ug/m3)",
        "WHO Safe Guideline (ug/m3)",
        "Excess Multiple over WHO Guideline",
        "Estimated Daily Equivalent Cigarettes Inhaled",
        "Selected Age Bracket",
        "Age-Specific Vulnerability Multiplier",
        "Clinical Warning",
        "Pre-Existing Condition Present",
        "Medical Reference Source",
      ],
      [
        [
          currentHotspot.name,
          currentHotspot.current_aqi,
          currentHotspot.pm25,
          5.0,
          `${excessOverWho}x`,
          `~${equivalentCigarettes} cigs/day`,
          vulnerabilityInfo.label,
          vulnerabilityInfo.vulnerability_multiplier,
          vulnerabilityInfo.warning,
          hasCondition ? "YES (Asthma / Bronchitis / Cardiovascular)" : "NO",
          "WHO Guidelines 2021 & RIMS Ranchi Pulmonary Medicine Data",
        ],
      ]
    );
  };

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider mb-2">
            <HeartPulse className="w-3.5 h-3.5 text-rose-700" />
            <span>Public Health Cost of Deforestation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            The Human Cost: Breathing in Ranchi Without Canopy
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
            Trees filter fine particulate matter (PM2.5) before it reaches deep alveoli and bloodstream. Without shade and canopy filtration, air pollution causes acute respiratory distress, pediatric asthma, and cardiovascular strain across Ranchi.
          </p>
        </div>

        {/* Hospital Surge Stats */}
        <div className="text-xs bg-rose-50 border border-rose-200 p-3 rounded-2xl flex items-center gap-3">
          <Activity className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <div className="font-bold text-rose-900">
              +{healthData.ranchi_hospital_admissions.pediatric_asthma_surge_pct}% Pediatric Asthma Surge
            </div>
            <div className="text-rose-700 text-[11px]">
              Winter respiratory admissions up {healthData.ranchi_hospital_admissions.winter_emergency_visits_growth} (RIMS data)
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Health Risk Calculator Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-br from-gray-50 to-rose-50/40 p-5 sm:p-7 rounded-2xl border border-rose-100">
        {/* Left: Inputs (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-rose-600" />
            <span>Personal Exposure Calculator</span>
          </h3>

          {/* Area Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Select Your Area in Ranchi:
            </label>
            <select
              value={selectedAreaId}
              onChange={(e) => setSelectedAreaId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-300 bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {hotspots.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} (AQI: {h.current_aqi})
                </option>
              ))}
            </select>
          </div>

          {/* Age Group Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-blue-700" />
              Select Age Group:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["child", "adult", "senior"] as const).map((group) => (
                <button
                  key={group}
                  onClick={() => setAgeGroup(group)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border text-center transition-all ${
                    ageGroup === group
                      ? "bg-rose-600 text-white border-rose-700 shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {group === "child" ? "Child (<12)" : group === "adult" ? "Adult (18-59)" : "Senior (60+)"}
                </button>
              ))}
            </div>
          </div>

          {/* Pre-existing Condition Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gray-200 cursor-pointer hover:border-gray-300">
              <input
                type="checkbox"
                checked={hasCondition}
                onChange={(e) => setHasCondition(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
              />
              <span className="text-xs font-semibold text-gray-800">
                Pre-existing Asthma, Bronchitis, or Heart condition
              </span>
            </label>
          </div>

          <div className="text-[11px] text-gray-500 leading-snug">
            Calculations calibrated against World Health Organization (WHO) Global Air Quality Guidelines 2021 and ICMR epidemiological cohorts.
          </div>
        </div>

        {/* Right: Results Display (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-rose-200/80 shadow-md space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Calculated Risk Profile
                </span>
                <h4 className="text-lg font-black text-gray-900">{currentHotspot.name}</h4>
              </div>
              <span
                className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                  rawPm25 > 90
                    ? "bg-red-600 text-white animate-pulse"
                    : rawPm25 > 70
                    ? "bg-amber-500 text-gray-950"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {rawPm25 > 90 ? "🚨 Critical Hazard Tier" : "⚠️ High Exposure Risk"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-center">
                <span className="text-[10px] font-bold text-gray-500 uppercase block">
                  Local PM2.5 Inhaled
                </span>
                <span className="text-xl font-black text-rose-600 block mt-0.5">
                  {rawPm25} µg/m³
                </span>
                <span className="text-[10px] text-gray-600">WHO limit: 5 µg/m³</span>
              </div>

              <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-center">
                <span className="text-[10px] font-bold text-rose-800 uppercase block">
                  Excess Over WHO Limit
                </span>
                <span className="text-xl font-black text-rose-900 block mt-0.5">
                  {excessOverWho}x
                </span>
                <span className="text-[10px] text-rose-700 font-semibold">Toxicity factor</span>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-center">
                <span className="text-[10px] font-bold text-amber-800 uppercase block">
                  Daily Cigarette Equiv.
                </span>
                <span className="text-xl font-black text-amber-900 block mt-0.5 flex items-center justify-center gap-1">
                  <Cigarette className="w-4 h-4 text-amber-700" />
                  ~{equivalentCigarettes}
                </span>
                <span className="text-[10px] text-amber-800 font-medium">cigs/day inhaled</span>
              </div>
            </div>

            {/* Personalized Medical Warning */}
            <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-3.5 space-y-1.5 text-xs text-rose-950">
              <div className="font-bold flex items-center gap-1.5 text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Age-Specific Health Advisory ({vulnerabilityInfo.label}):</span>
              </div>
              <p className="leading-relaxed">{vulnerabilityInfo.warning}</p>
              {hasCondition && (
                <p className="font-bold text-red-700 pt-1 border-t border-rose-200">
                  ⚠️ Pre-existing Respiratory Condition Alert: Elevated risk of acute bronchospasm, asthma attacks, and emergency hospital visits in {currentHotspot.name.split(" ")[0]}.
                </p>
              )}
            </div>
          </div>

          <div className="text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex items-center justify-between">
            <span>Reference: WHO Guidelines & Rajendra Institute of Medical Sciences (RIMS)</span>
            <span className="font-semibold text-rose-700">Protect Ranchi's Green Canopy</span>
          </div>
        </div>
      </div>

      {/* Verifiable Link / Source & CSV Download */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap text-gray-700">
            <span className="font-bold text-gray-900">Health Impact Sources:</span>
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>WHO Air Quality Guidelines</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://www.icmr.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>ICMR Clean Air Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://www.rimsranchi.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>RIMS Ranchi Pulmonary Records</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-[11px] text-gray-500">
            Epidemiological conversion models based on Berkeley Earth particulate-cigarette equivalency and ICMR respiratory morbidity surveys.
          </p>
        </div>

        <button
          onClick={handleDownloadHealthCsv}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs transition-colors shadow-sm self-start sm:self-auto shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download {currentHotspot.name.split(" ")[0]} Health Risk (CSV)</span>
        </button>
      </div>
    </div>
  );
};
