"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  FileCheck,
  Send,
  Download,
  Share2,
  Heart,
  Trees,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  MessageCircle,
} from "lucide-react";

export const RanchiActionSection: React.FC = () => {
  const [pledgeCount, setPledgeCount] = useState(1482);
  const [hasPledged, setHasPledged] = useState(false);

  const handlePledge = () => {
    if (!hasPledged) {
      setPledgeCount((prev) => prev + 1);
      setHasPledged(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#059669", "#f59e0b", "#34d399"],
      });
    }
  };

  const handleDownloadObjectionLetter = () => {
    const letterContent = `FORMAL PUBLIC OBJECTION AGAINST EXCESSIVE MATURE TREE FELLING IN RANCHI CITY
Under Section 28 of Jharkhand Urban Tree Protection Guidelines & EIA Notification 2006

To:
1. The Divisional Forest Officer (DFO), Ranchi Forest Division, Jharkhand.
2. The Municipal Commissioner, Ranchi Municipal Corporation (RMC), Ranchi.
3. The Principal Secretary, Forest, Environment & Climate Change Dept, Govt of Jharkhand.

Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
Subject: Formal Civic Representation Demanding Immediate Moratorium on Indiscriminate Tree Felling, Mandatory Public Tree Enumeration, and Design Modification in Ranchi Infrastructure Corridors.

Respected Authorities,

I am writing as a concerned resident of Ranchi to place on official record our grave concern regarding the alarming loss of urban green canopy across Ranchi City and District. 

As documented by the Forest Survey of India (ISFR), continuous CAAQMS air monitoring by CPCB/JSPCB, and civic surveys:
1. OVER 34,000 MATURE HERITAGE TREES have been felled in Ranchi between 2019 and 2025 for flyovers (Ratu Road, Kantatoli, Siramtoli), airport widening, Ring Road, and smart city grids.
2. RANCHI'S ANNUAL AVERAGE AQI HAS SPIKED FROM 118 (2019) TO 196 (2025), with winter spikes exceeding 340 AQI, directly endangering children and senior citizens.
3. COMPENSATORY AFFORESTATION IS FAILING: Independent environmental audit confirms that only 16% of claimed nursery saplings survive past 2 years, whereas 40-to-60 year old Sal, Banyan, and Peepal trees take half a century to replace.
4. CORRIDORS UNDER IMMEDIATE IMMINENT THREAT: Over 7,000 heritage trees along the 6.089 km Vivekananda School to Naya Sarai (HEC/Dhurwa) stretch, as well as Ring Road feeder corridors.

PRAYER / DEMANDS:
1. IMMEDIATE MORATORIUM on felling permissions until geo-tagged tree enumeration is publicly published for citizen review.
2. ADOPTION OF SPLIT-CARRIAGEWAY / TREE-PRESERVING ENGINEERING DESIGNS: Shift from rigid 60m right-of-way to median-sparing 35m designs that preserve up to 82% of standing canopy trees.
3. MANDATORY GEO-TAGGING & AUDIT: Any compensatory plantation must be geo-tagged and independently audited with 5-year survival liability.
4. INDEPENDENT TREE CENSUS COMMITTEE: Include botanists, civil society representatives, and citizen researchers in pre-felling site appraisals.

We urge the administration to prioritize "Development Without Destruction" for the living future of Ranchi.

Sincerely,
Concerned Citizen of Ranchi
Save Dhurwa Trees — Heritage Canopy Initiative
Platform URL: https://save-dhurwa-trees.vercel.app/dashboard
`;

    const blob = new Blob([letterContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Ranchi_Tree_Protection_Objection_Letter_${new Date().toISOString().split("T")[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareText = encodeURIComponent(
    `🚨 Ranchi Is Losing Its Green Cover & Clean Air!

Check the official citywide tree loss, AQI spikes & wildlife impact across Ranchi:
📊 Live Environmental Dashboard:
https://save-dhurwa-trees.vercel.app/dashboard

Over 7,000 mature trees in the HEC–Dhurwa corridor are currently at risk. Please add your voice:
✍️ Sign the Citizen Petition (750+ already signed):
https://c.org/sTJg4xx2Vz

Together, let's advocate for Development Without Destruction. Please share this with every Ranchi resident! 🌲💚`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  return (
    <div className="space-y-6 bg-gradient-to-b from-[#fbfaf5] to-emerald-50/50 p-6 sm:p-10 rounded-3xl border border-emerald-200/80 shadow-md">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
          Citizen Empowerment & Civic Action
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#1b4332] tracking-tight">
          What Can Ranchi Do? Take Action Today
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Preserving Ranchi’s remaining trees is not an agitation — it is lawful civic engagement. Every signature, every geo-tagged tree photo, and every official objection pushes authorities toward greener, smarter planning.
        </p>
      </div>

      {/* 5 Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {/* Card 1: Sign Petition */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/70 p-6 rounded-2xl border-2 border-amber-400 shadow-md flex flex-col justify-between space-y-4 hover:shadow-lg transition-all group">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-200 text-amber-950 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileCheck className="w-6 h-6 text-amber-900" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-gray-950 px-2.5 py-1 rounded-full shadow-sm animate-pulse">
                750+ Signed
              </span>
            </div>
            <h3 className="font-extrabold text-lg text-gray-950">1. Sign the Citizen Petition</h3>
            <p className="text-xs text-gray-800 leading-relaxed">
              &quot;Around 7,000 trees in the HEC–Dhurwa area are potentially at risk. Together, we can protect Ranchi&apos;s green heritage and biodiversity.&quot;
            </p>
          </div>
          <div className="space-y-2 pt-2">
            <a
              href="https://c.org/sTJg4xx2Vz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-gray-950 hover:bg-gray-900 text-amber-400 font-extrabold text-xs transition-colors shadow-sm"
            >
              <span>✍️ Sign on Change.org (750+ Signed)</span>
              <span>↗</span>
            </a>
            <Link
              href="/petition"
              className="inline-flex items-center justify-center w-full px-4 py-1.5 rounded-lg text-gray-700 hover:text-gray-950 font-semibold text-[11px] transition-colors"
            >
              <span>Read Full Statutory Demands</span>
            </Link>
          </div>
        </div>

        {/* Card 2: Report Tree Cutting */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-300 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all group">
          <div className="space-y-2.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Send className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">2. Report Tree Cutting in Your Area</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Spotted mature tree felling, road widening, or unpermitted clearing in your neighborhood? Upload a photo and GPS pin directly to the civic map.
            </p>
          </div>
          <Link
            href="/report"
            className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <span>Submit Geo-Tagged Tree Report</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 3: Download Legal Objection Template */}
        <div className="bg-white p-6 rounded-2xl border border-blue-300 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all group">
          <div className="space-y-2.5">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Download className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">3. Download Objection Letter Template</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Pre-drafted formal representation addressed to the DFO Ranchi and Municipal Commissioner demanding public tree surveys and design changes.
            </p>
          </div>
          <button
            onClick={handleDownloadObjectionLetter}
            className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <span>Download Official Template (.txt)</span>
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Card 4: WhatsApp Share */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-300 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all group">
          <div className="space-y-2.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">4. Share Dashboard on WhatsApp</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Spread verified environmental data across Ranchi resident associations, family groups, and morning walking clubs with one tap.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
          >
            <span>Share on WhatsApp</span>
            <Share2 className="w-4 h-4" />
          </a>
        </div>

        {/* Card 5: Adopt a Tree in Ranchi Counter (Spans 2 cols on desktop) */}
        <div className="bg-gradient-to-br from-[#1b4332] to-[#0f2a1d] text-white p-6 rounded-2xl border border-emerald-500/50 shadow-md flex flex-col justify-between space-y-4 md:col-span-2 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Ranchi Citizen Tree Guardianship</span>
              </div>
              <h3 className="font-black text-xl text-white">5. "Adopt a Tree in Ranchi" Civic Pledge</h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed max-w-xl">
                Pledge to watch over, photograph, and protect at least 1 mature shade or heritage tree in your neighborhood. You will receive alert updates if felling activity is reported nearby.
              </p>
            </div>

            <div className="bg-black/30 px-5 py-3 rounded-2xl border border-white/10 text-center shrink-0">
              <span className="text-[10px] text-gray-300 uppercase tracking-wider block font-bold">
                Citizens Pledged
              </span>
              <span className="text-3xl font-black text-amber-400 block mt-0.5">
                {pledgeCount.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-300 font-semibold">Active Guardians</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
            <button
              onClick={handlePledge}
              disabled={hasPledged}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${hasPledged
                ? "bg-emerald-400 text-gray-950 cursor-default"
                : "bg-amber-400 hover:bg-amber-300 text-gray-950 shadow-lg hover:shadow-amber-500/30 hover:scale-105"
                }`}
            >
              {hasPledged ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-gray-950" />
                  <span>Pledged! You Are a Ranchi Tree Guardian</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-gray-950" />
                  <span>Pledge to Protect a Tree in Ranchi</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-emerald-200">
              No fee or registration required • Direct civic stewardship
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
