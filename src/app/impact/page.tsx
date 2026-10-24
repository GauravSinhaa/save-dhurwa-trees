"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Trees,
  CloudRain,
  Flame,
  Wind,
  ShieldAlert,
  Info,
  Download,
  Printer,
  Sparkles,
  Calculator,
  AlertCircle,
  HelpCircle,
  Bird,
} from "lucide-react";
import { AvianImpactSection } from "@/components/biodiversity/AvianImpactSection";

export default function EnvironmentalImpactPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        }
      } catch (e) {
        console.error("Failed to load impact stats", e);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const COLORS = ["#1b4332", "#2d6a4f", "#40916c", "#52b788", "#74c69d", "#d97706", "#f59e0b"];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReportCSV = () => {
    if (!stats) return;
    const lines = [
      "Indicator,Value,Unit,Methodology / Basis,Limitations",
      `"Total Recorded Trees",${stats.totalRecordedTrees},"trees","Field GPS Census","Active survey in progress"`,
      `"Verified Existing Trees",${stats.verifiedTrees},"trees","Arborist Validated","Physical field verification"`,
      `"Mature Heritage Trees",${stats.matureTreeCount},"trees","Trunk Girth > 150cm","Only for documented trees"`,
      `"Corridor Conflict Count",${stats.potentiallyAffectedInCorridor},"trees","60m Buffer GIS Intersection","Based on preliminary SHAJ alignment"`,
      `"Estimated Stored Carbon",${stats.estimatedCarbonStoredTonnes},"Tonnes CO2eq","FAO Allometric Model (Chave et al.)","Modelled estimate with +/-15% uncertainty"`,
      `"Estimated Annual Sequestration",${stats.estimatedAnnualSequestrationKg},"Kg CO2eq/year","24.5 kg CO2/mature tree/yr average","Climate and species dependent"`,
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dhurwa_environmental_assessment_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm">Calculating environmental metrics from active database...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Evidence-Based Ecological Accounting
          </span>
          <h1 className="text-3xl font-extrabold text-[#1b4332] tracking-tight mt-2">
            Environmental Impact & Biomass Assessment
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-3xl">
            Quantitative analysis of tree canopy, biomass, carbon reservoirs, and
            microclimatic buffering for the Dhurwa to Naya Sarai road corridor in Ranchi.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={handleDownloadReportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-xs font-semibold rounded-xl shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export Metrics CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-300" />
            <span>Print Assessment Report</span>
          </button>
        </div>
      </div>

      {/* Mandatory Scientific Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 text-xs text-amber-950 space-y-2 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Scientific Assessment Standard & Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          The reported estimate of <strong>~7,000 potentially affected trees</strong> is a preliminary figure from regional media and tender notices. In accordance with strict scientific practice, <strong>we do NOT convert this 7,000 figure blindly into carbon emission totals</strong>. Carbon storage requires individual species identification, tree height measurements, and trunk circumference (GBH) measurements.
        </p>
        <p className="text-[11px] text-amber-800 italic">
          All carbon and biomass metrics displayed below are computed <strong>solely from the verified and documented individual trees currently in our database</strong> using standard forestry allometric models.
        </p>
      </div>

      {/* Carbon & Biomass Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Carbon Stored (Documented)</span>
              <Calculator className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-3xl font-extrabold text-[#1b4332] font-mono mt-3">
              {stats?.estimatedCarbonStoredTonnes ?? 0}{" "}
              <span className="text-sm font-sans font-medium text-gray-500">Tonnes</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Stored in {stats?.totalRecordedTrees} documented tree trunks and root systems.
            </p>
          </div>
          <div className="text-[10px] text-gray-400 mt-4 border-t pt-2">
            Model: Chave et al. (2014) Allometric Equation
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Annual Sequestration</span>
              <Trees className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-3xl font-extrabold text-[#1b4332] font-mono mt-3">
              {stats?.estimatedAnnualSequestrationKg ?? 0}{" "}
              <span className="text-sm font-sans font-medium text-gray-500">kg/yr</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Ongoing carbon absorbed annually by the surveyed mature canopy.
            </p>
          </div>
          <div className="text-[10px] text-gray-400 mt-4 border-t pt-2">
            Basis: Average 24.5 kg CO2/mature tree/yr
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Mature Heritage Trees</span>
              <ShieldAlert className="w-4 h-4 text-purple-700" />
            </div>
            <div className="text-3xl font-extrabold text-purple-900 font-mono mt-3">
              {stats?.matureTreeCount ?? 0}{" "}
              <span className="text-sm font-sans font-medium text-gray-500">trees</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Trunk circumference exceeding 150 cm (&gt;50 cm DBH). Irreplaceable by saplings.
            </p>
          </div>
          <div className="text-[10px] text-gray-400 mt-4 border-t pt-2">
            Estimated ages: 45 to 85+ years old
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Corridor Direct Threat</span>
              <Flame className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-amber-900 font-mono mt-3">
              {stats?.potentiallyAffectedInCorridor ?? 0}{" "}
              <span className="text-sm font-sans font-medium text-gray-500">in buffer</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Trees falling within the reported 60m road construction envelope.
            </p>
          </div>
          <div className="text-[10px] text-gray-400 mt-4 border-t pt-2">
            Awaiting finalized SHAJ alignment CAD
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Species Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                Species Diversity in Corridor
              </h3>
              <p className="text-xs text-gray-500">
                Breakdown of indigenous and naturalized tree species documented
              </p>
            </div>
            <span className="text-xs font-mono font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg">
              {stats?.speciesDistribution?.length ?? 0} Species
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats?.speciesDistribution || []}
                margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val) => [`${val} trees`, "Recorded Count"]}
                  contentStyle={{
                    borderRadius: "0.75rem",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="#2d6a4f" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Trunk Girth Classes */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                Trunk Girth (GBH) Distribution
              </h3>
              <p className="text-xs text-gray-500">
                Maturity and diameter classes measured at breast height
              </p>
            </div>
            <span className="text-xs font-mono font-semibold bg-purple-50 text-purple-800 px-2.5 py-1 rounded-lg">
              Size Hierarchy
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats?.sizeClasses || []}
                margin={{ top: 10, right: 10, left: -20, bottom: 35 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="range"
                  tick={{ fontSize: 10 }}
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val) => [`${val} trees`, "Specimens"]}
                  contentStyle={{
                    borderRadius: "0.75rem",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="#7c3aed" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Avian and Wildlife Impact Section */}
      <AvianImpactSection />

      {/* Methodology and Assumptions Transparent Box */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-700" />
          <span>Biomass & Carbon Model Methodology</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-600 leading-relaxed">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <h4 className="font-bold text-gray-900 text-sm">1. Allometric Formula</h4>
            <p>
              Aboveground Biomass (AGB) is derived from the standard pantropical allometric
              relation for moist tropical trees:
            </p>
            <div className="font-mono bg-white p-2 rounded border text-gray-800 text-[11px]">
              AGB (kg) = 0.08 × (DBH)^2.1 × (H)^0.6
            </div>
            <p className="text-[11px] text-gray-500">
              Where DBH is diameter at breast height (cm) and H is total tree height (m).
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <h4 className="font-bold text-gray-900 text-sm">2. Carbon Conversion</h4>
            <p>
              Dry wood biomass contains approximately 47% to 50% elemental carbon (IPCC
              Good Practice Guidance, 2003):
            </p>
            <div className="font-mono bg-white p-2 rounded border text-gray-800 text-[11px]">
              Carbon (kg) = AGB × 0.48
            </div>
            <p className="text-[11px] text-gray-500">
              Equivalent CO2 stored is computed multiplying carbon by 3.67 (molecular ratio of CO2/C).
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <h4 className="font-bold text-gray-900 text-sm">3. Limitations & Bounds</h4>
            <ul className="list-disc pl-4 space-y-1 text-gray-600">
              <li>Uncertainty range is estimated at ±15% due to wood density variations.</li>
              <li>Belowground root biomass is approximated at 20% of AGB.</li>
              <li>Only individually field-measured trees are factored into computation.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
