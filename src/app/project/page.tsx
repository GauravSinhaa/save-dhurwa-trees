"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  AlertTriangle,
  FileText,
  CheckCircle2,
  Clock,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Send,
  Layers,
  MapPin,
  X,
  Download,
} from "lucide-react";

interface ProjectFact {
  id: string;
  title: string;
  reportedValue: string;
  source: string;
  date: string;
  verificationStatus:
    | "VERIFIED_OFFICIAL"
    | "MEDIA_REPORTED"
    | "AWAITING_VERIFICATION"
    | "DISPUTED";
  documentRef?: string;
  notes: string;
}

export default function DhurwaProjectPage() {
  const { language } = useLanguage();
  const [showRtiModal, setShowRtiModal] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([
    "Tree Enumeration Census Sheet",
    "Detailed Project Report (DPR) Volume 2",
  ]);

  const facts: ProjectFact[] = [
    {
      id: "f1",
      title: "Corridor Origin Point",
      reportedValue: "Vivekananda School More, Dhurwa (Chainage 0+000)",
      source: "State Highway Authority of Jharkhand preliminary tender notice",
      date: "2025-11-20",
      verificationStatus: "MEDIA_REPORTED",
      documentRef: "SHAJ/Dhurwa/Tender-Prelim/2025",
      notes:
        "Reported intersection point connecting HEC residential sectors with the proposed widening route.",
    },
    {
      id: "f2",
      title: "Corridor Destination Point",
      reportedValue: "Ranchi Ring Road Intersect via Naya Sarai (Chainage 6+089)",
      source: "Project alignment schedule published in local daily notices",
      date: "2025-11-20",
      verificationStatus: "MEDIA_REPORTED",
      documentRef: "SHAJ/Dhurwa/Schedule-A",
      notes:
        "Ties the Dhurwa township directly into the Ranchi Ring Road outer bypass.",
    },
    {
      id: "f3",
      title: "Total Corridor Length",
      reportedValue: "Approximately 6.089 km",
      source: "Detailed Project Report Executive Summary",
      date: "2025-10-15",
      verificationStatus: "VERIFIED_OFFICIAL",
      documentRef: "DPR-SHAJ-DHURWA-6KM-VOL1",
      notes:
        "Length documented in technical survey documentation across 7 planned chainage segments.",
    },
    {
      id: "f4",
      title: "Cross-Section Configuration",
      reportedValue: "6-Lane Main Carriageway + Two 2-Lane Service Roads (10-Lane Footprint)",
      source: "Regional media report quoting SHAJ planning engineers",
      date: "2025-12-05",
      verificationStatus: "MEDIA_REPORTED",
      notes:
        "Total Right-of-Way (ROW) reportedly ranges between 50m to 60m width, generating extensive roadside tree conflicts.",
    },
    {
      id: "f5",
      title: "Reported Estimated Project Cost",
      reportedValue: "Approximately ₹177 Crore",
      source: "Cabinet infrastructure sanction announcement",
      date: "2026-01-10",
      verificationStatus: "MEDIA_REPORTED",
      notes:
        "Includes civil construction, drainage structures, and utility relocation; environmental mitigation budget details unconfirmed.",
    },
    {
      id: "f6",
      title: "Executing Agency",
      reportedValue: "State Highways Authority of Jharkhand (SHAJ)",
      source: "Official departmental designation",
      date: "2025-09-01",
      verificationStatus: "VERIFIED_OFFICIAL",
      notes: "State-level road development corporation under the Government of Jharkhand.",
    },
    {
      id: "f7",
      title: "Reported Potentially Affected Trees",
      reportedValue: "Approximately 7,000 Trees (Unverified)",
      source: "Civic delegations & news media estimates",
      date: "2026-02-18",
      verificationStatus: "AWAITING_VERIFICATION",
      notes:
        "Awaiting official joint tree enumeration records from the Ranchi Forest Division. Not yet verified tree by tree.",
    },
    {
      id: "f8",
      title: "Tree Felling Permissions",
      reportedValue: "Formal Statutory Clearance Status Unconfirmed",
      source: "Pending Right to Information response from DFO Ranchi",
      date: "2026-03-01",
      verificationStatus: "AWAITING_VERIFICATION",
      documentRef: "RTI/Ranchi-DFO/2026-08",
      notes:
        "No official gazetted tree-felling permit has yet been made publicly available in the open domain.",
    },
  ];

  const getBadge = (status: ProjectFact["verificationStatus"]) => {
    switch (status) {
      case "VERIFIED_OFFICIAL":
        return (
          <span className="badge-verified px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Official Record
          </span>
        );
      case "MEDIA_REPORTED":
        return (
          <span className="badge-reported px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Reported by Media
          </span>
        );
      case "AWAITING_VERIFICATION":
        return (
          <span className="badge-pending px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            Awaiting Official Verification
          </span>
        );
      case "DISPUTED":
        return (
          <span className="badge-disputed px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            Disputed / Superseded
          </span>
        );
    }
  };

  const checklistItems = [
    "Complete Tree Enumeration & Girth Survey Register",
    "Detailed Project Report (DPR) Volume 2: Environmental & Social Impact",
    "Statutory Tree Felling Permission Applications & Orders",
    "Proposed Geometric Alignment Drawings (CAD / GeoJSON)",
    "Compensatory Afforestation Scheme & Land Allocation Plan",
    "Traffic Flow & Capacity Volume Study (PCU Count)",
  ];

  const toggleDoc = (item: string) => {
    if (selectedDocs.includes(item)) {
      setSelectedDocs(selectedDocs.filter((i) => i !== item));
    } else {
      setSelectedDocs([...selectedDocs, item]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#1b4332] text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="bg-[#2d6a4f] text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Corridor Profile & Evidence Record
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            The Dhurwa to Naya Sarai Road Project
          </h1>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            A comprehensive factual account of the reported ₹177 crore, 6.089 km road
            development from Vivekananda School More to Ranchi Ring Road. Every fact is
            audited against official disclosures, media reports, and verified documents.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setShowRtiModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold rounded-xl text-xs transition-colors shadow-md"
            >
              <FileText className="w-4 h-4 text-gray-900" />
              <span>Request Official Project Documents (RTI Checklist)</span>
            </button>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-xs border border-white/20 transition-colors"
            >
              <MapPin className="w-4 h-4 text-emerald-300" />
              <span>View Corridor on Map</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Corridor Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e2dfd4] shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">
            Corridor Length
          </span>
          <span className="text-2xl font-extrabold text-[#1b4332] font-mono mt-1 block">
            6.089 km
          </span>
          <span className="text-[11px] text-emerald-700">
            Vivekananda More to Ring Road
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2dfd4] shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">
            Reported Cost
          </span>
          <span className="text-2xl font-extrabold text-[#1b4332] font-mono mt-1 block">
            ₹177 Crore
          </span>
          <span className="text-[11px] text-amber-700">
            Cabinet sanctioned estimate
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2dfd4] shadow-sm">
          <span className="text-xs text-gray-500 font-medium block">
            Proposed Width
          </span>
          <span className="text-2xl font-extrabold text-[#1b4332] font-mono mt-1 block">
            10 Lanes (54-60m)
          </span>
          <span className="text-[11px] text-gray-600">6 main + 4 service lanes</span>
        </div>

        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-300 shadow-sm">
          <span className="text-xs text-amber-900 font-medium block">
            Reported Tree Impact
          </span>
          <span className="text-2xl font-extrabold text-amber-950 font-mono mt-1 block">
            ~7,000 Trees
          </span>
          <span className="text-[11px] text-amber-800 font-semibold">
            Unverified Estimate
          </span>
        </div>
      </div>

      {/* Fact-Check & Verification Status Table */}
      <div className="bg-white rounded-3xl border border-[#e2dfd4] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#fbfaf5]">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Corridor Claims & Evidence Registry
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Every detail is classified by evidentiary reliability to prevent misinformation.
            </p>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Audited regularly against public notices</span>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {facts.map((fact) => (
            <div
              key={fact.id}
              className="p-6 hover:bg-gray-50/60 transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
            >
              <div className="md:col-span-4 space-y-1">
                <span className="text-xs text-gray-400 font-mono">#{fact.id}</span>
                <h3 className="font-bold text-sm text-gray-900">{fact.title}</h3>
                <div className="text-xs font-semibold text-[#1b4332] bg-emerald-50/80 p-2 rounded-lg border border-emerald-100">
                  {fact.reportedValue}
                </div>
              </div>

              <div className="md:col-span-5 space-y-1.5 text-xs text-gray-600">
                <p className="leading-relaxed">{fact.notes}</p>
                <div className="text-[11px] text-gray-500 flex items-center gap-2">
                  <span>
                    <strong>Source:</strong> {fact.source}
                  </span>
                  <span>•</span>
                  <span>{fact.date}</span>
                </div>
                {fact.documentRef && (
                  <div className="text-[11px] text-amber-700 font-mono flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    <span>Doc: {fact.documentRef}</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-3 flex justify-start md:justify-end">
                {getBadge(fact.verificationStatus)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right to Information (RTI) Interactive Modal */}
      {showRtiModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Right to Information Act, 2005
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">
                  Request Official Project Documents
                </h3>
              </div>
              <button
                onClick={() => setShowRtiModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Select the specific records you wish to request from the Public Information
              Officer (PIO) of the State Highways Authority of Jharkhand (SHAJ) or the
              Ranchi Forest Division. We generate a formatted legal draft for you.
            </p>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {checklistItems.map((item) => (
                <label
                  key={item}
                  onClick={() => toggleDoc(item)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    selectedDocs.includes(item)
                      ? "bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(item)}
                    onChange={() => {}}
                    className="rounded text-emerald-700 focus:ring-emerald-500"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              <strong>Notice:</strong> An RTI request requests existing public records
              held by the government authority. It is an information tool, not an
              injunction or court stay.
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500">
                {selectedDocs.length} items selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRtiModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  Close
                </button>
                <Link
                  href="/documents"
                  className="px-5 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold shadow-md inline-flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Formatted RTI Draft</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
