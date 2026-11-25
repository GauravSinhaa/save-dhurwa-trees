"use client";

import React, { useState } from "react";
import {
  Trees,
  Bug,
  Bird,
  Shield,
  Sprout,
  Wind,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Flame,
  XCircle,
  CheckCircle2,
  Download,
  ExternalLink,
} from "lucide-react";
import dashboardData from "@/data/ranchi-environmental-data.json";
import { downloadCsv } from "@/lib/csvExport";

export const RanchiEcosystemChain: React.FC = () => {
  const [isCut, setIsCut] = useState(false);
  const chain = dashboardData.ecosystem_chain;

  const handleDownloadChainCsv = () => {
    downloadCsv(
      "ranchi_tree_ecosystem_chain_model",
      ["Link Step", "Ecosystem Level", "Ecological Description", "Status When Preserved", "Immediate Impact When Tree Is Felled", "Scientific Basis"],
      chain.links.map((n, i) => [
        `Link 0${i + 1}`,
        n.title,
        n.description,
        "Active Living Ecosystem Benefit",
        n.status_when_cut,
        "Zoological Survey of India (ZSI) & FAO Urban Canopy Models",
      ])
    );
  };

  const getIcon = (type: string, broken: boolean) => {
    const iconClass = broken ? "w-6 h-6 text-red-600" : "w-6 h-6 text-emerald-700";
    switch (type) {
      case "tree":
        return <Trees className={iconClass} />;
      case "bug":
        return <Bug className={iconClass} />;
      case "bird":
        return <Bird className={iconClass} />;
      case "shield":
        return <Shield className={iconClass} />;
      case "sprout":
        return <Sprout className={iconClass} />;
      case "wind":
        return <Wind className={iconClass} />;
      default:
        return <Trees className={iconClass} />;
    }
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-emerald-950 via-[#0d281a] to-[#07170e] text-white p-6 sm:p-10 rounded-3xl border border-emerald-800/40 shadow-xl relative overflow-hidden">
      {/* Background Ambience */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isCut
            ? "bg-red-950/40 opacity-100 backdrop-grayscale"
            : "bg-emerald-900/10 opacity-50"
        }`}
      />

      <div className="relative z-10 space-y-8">
        {/* Header & Simulator Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>Interactive Ecological Food Web</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {chain.headline}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-2xl leading-relaxed">
              Urban trees are not standalone ornamental poles. They anchor an interconnected living web of biodiversity, biological pest control, and regional climate stability.
            </p>
          </div>

          {/* Interactive Trigger Button */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <button
              onClick={() => setIsCut(!isCut)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 shadow-xl ${
                isCut
                  ? "bg-emerald-500 hover:bg-emerald-400 text-gray-950 ring-4 ring-emerald-900/50"
                  : "bg-red-600 hover:bg-red-500 text-white ring-4 ring-red-900/50 animate-pulse"
              }`}
            >
              {isCut ? (
                <>
                  <RotateCcw className="w-4 h-4 text-gray-900" />
                  <span>Restore Living Canopy Chain</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 text-white" />
                  <span>Click to Simulate Felling the Tree</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-gray-400 font-medium">
              {isCut ? "⚠️ Simulating severed ecosystem" : "Interactive: Test the ripple effect of cutting 1 tree"}
            </span>
          </div>
        </div>

        {/* Powerful Quote Callout */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center max-w-4xl mx-auto shadow-inner">
          <p className="text-base sm:text-xl font-bold text-amber-300 italic leading-snug">
            "{chain.core_quote}"
          </p>
        </div>

        {/* Chain Nodes Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chain.links.map((node, idx) => (
            <div
              key={node.id}
              className={`rounded-2xl p-5 border transition-all duration-500 flex flex-col justify-between ${
                isCut
                  ? "bg-red-950/60 border-red-500/70 text-red-100 shadow-lg scale-95"
                  : "bg-white/10 border-white/15 text-white hover:bg-white/15"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isCut ? "bg-red-900/80" : "bg-emerald-900/60"
                    }`}
                  >
                    {getIcon(node.icon, isCut)}
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      isCut
                        ? "bg-red-900 text-red-300 border border-red-700"
                        : "bg-emerald-900 text-emerald-300"
                    }`}
                  >
                    Link 0{idx + 1}
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-base text-white">{node.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">{node.description}</p>
                </div>
              </div>

              {/* Status footer */}
              <div
                className={`mt-4 pt-3 border-t text-xs font-semibold flex items-center gap-1.5 ${
                  isCut ? "border-red-800 text-red-300" : "border-white/10 text-emerald-400"
                }`}
              >
                {isCut ? (
                  <>
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{node.status_when_cut}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Active Ecosystem Benefit</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Reality Check */}
        {isCut && (
          <div className="bg-red-950/90 border-2 border-red-500 rounded-2xl p-5 text-red-200 text-xs sm:text-sm space-y-2 animate-fadeIn shadow-2xl">
            <div className="flex items-center gap-2 font-black text-red-400 uppercase tracking-wider text-sm">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span>Cascading Ecological Breakdown Triggered:</span>
            </div>
            <p className="leading-relaxed">
              When 1 mature tree is cut, <strong>50+ species of pollinators and beneficial insects lose their habitat immediately</strong>. Insect-eating birds (hornbills, flycatchers, barbets) face reproductive collapse. Natural biological pest control fails, leading to urban mosquito and rodent outbreaks. Local ground surface temperatures surge by up to <strong>+4.5°C</strong>, and ambient air dust filtration ceases permanently.
            </p>
          </div>
        )}
        {/* Verifiable Link / Source & CSV Download */}
        <div className="bg-black/50 border border-white/15 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap text-emerald-200">
              <span className="font-bold text-white">Ecological References:</span>
              <a
                href="https://zsi.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>Zoological Survey of India (ZSI)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>•</span>
              <a
                href="https://www.fao.org/forestry/urban"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>FAO Urban Forestry Framework</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-gray-400">
              Chave et al. tropical allometric equations & Jharkhand Biodiversity Board urban canopy guidelines.
            </p>
          </div>

          <button
            onClick={handleDownloadChainCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm self-start sm:self-auto shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Ecosystem Model (CSV)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
