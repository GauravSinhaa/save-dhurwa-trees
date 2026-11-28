"use client";

import React, { useState } from "react";
import {
  Bird,
  AlertOctagon,
  MapPin,
  Trees,
  ShieldAlert,
  ExternalLink,
  Search,
  Filter,
  Info,
  Download,
} from "lucide-react";
import dashboardData from "@/data/ranchi-environmental-data.json";
import { downloadCsv } from "@/lib/csvExport";

export const RanchiWildlifeSection: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState("");
  const wildlife = dashboardData.birds_wildlife;
  const speciesList = wildlife.species_cards;

  const handleDownloadWildlifeCsv = () => {
    downloadCsv(
      "ranchi_bird_species_extinction_risk_dataset",
      [
        "Species ID",
        "Common Name (English)",
        "Hindi Name",
        "Scientific Name",
        "IUCN Status",
        "Sighting Habitats in Ranchi",
        "Ecological Tree Dependency",
        "Direct Consequence of Tree Felling",
        "Primary Source Reference",
      ],
      speciesList.map((s) => [
        s.id,
        s.english_name,
        s.hindi_name,
        s.scientific_name,
        s.iucn_status,
        s.where_seen_in_ranchi,
        s.why_trees_matter,
        s.consequence_if_cut,
        "eBird Ranchi Atlas & State of India's Birds (SoIB 2023)",
      ])
    );
  };

  const filteredSpecies = speciesList.filter(
    (s) =>
      s.english_name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.hindi_name.includes(filterQuery) ||
      s.where_seen_in_ranchi.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.scientific_name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Bird className="w-3.5 h-3.5 text-rose-700" />
            <span>Avian & Canopy Biodiversity Crisis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            When Ranchi's Trees Fall, Ranchi's Birds Disappear
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
            Birds do not nest on concrete poles or 1-meter roadside saplings. Over 40 species of hornbills, owls, barbets, and pollinators are obligate tree-cavity nesters that depend entirely on 40+ year-old Peepal, Banyan, and Sal canopies.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search bird or location in Ranchi..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-600 bg-gray-50 focus:bg-white"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-rose-50 border border-rose-200/60 rounded-2xl p-4 text-center">
          <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
            Ranchi District Bird Species Recorded
          </span>
          <span className="text-3xl font-black text-rose-900 mt-1 block">
            {wildlife.kpis.recorded_species_ebird}
          </span>
          <span className="text-xs text-rose-700 font-medium">eBird Citizen Science Baseline</span>
        </div>

        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 text-center">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
            Species in Steep National Decline
          </span>
          <span className="text-3xl font-black text-amber-900 mt-1 block">
            {wildlife.kpis.species_declined_gt_50_pct}
          </span>
          <span className="text-xs text-amber-700 font-medium">&gt;50% decline (State of India's Birds)</span>
        </div>

        <div className="bg-red-100 border border-red-300 rounded-2xl p-4 text-center">
          <span className="text-[11px] font-bold text-red-900 uppercase tracking-wider block">
            Local Extinction Alert in Urban Ranchi
          </span>
          <span className="text-3xl font-black text-red-900 mt-1 block">
            {wildlife.kpis.species_local_extinction_risk}
          </span>
          <span className="text-xs text-red-700 font-medium">Cavity & dense canopy obligates</span>
        </div>
      </div>

      {/* Bird Species Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredSpecies.map((species) => (
          <div
            key={species.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Image / Header Banner */}
            <div className="relative h-48 overflow-hidden bg-emerald-950">
              <img
                src={species.photo}
                alt={species.english_name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/90 text-gray-900 backdrop-blur-md shadow-sm">
                  {species.iucn_status.split("(")[0].trim()}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-extrabold text-lg leading-tight text-white drop-shadow-sm">
                  {species.english_name}
                </h3>
                <div className="text-xs font-medium text-emerald-300 flex items-center justify-between mt-0.5">
                  <span>{species.hindi_name}</span>
                  <span className="italic text-[11px] text-gray-300">({species.scientific_name})</span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between text-xs leading-relaxed">
              <div className="space-y-2.5">
                {/* Where in Ranchi */}
                <div className="bg-emerald-50/70 border border-emerald-200/50 rounded-xl p-2.5">
                  <span className="font-bold text-emerald-900 flex items-center gap-1 text-[11px] mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    Where in Ranchi was it seen?
                  </span>
                  <p className="text-emerald-950 text-[11px]">{species.where_seen_in_ranchi}</p>
                </div>

                {/* Why Trees Matter */}
                <div>
                  <strong className="text-gray-900 block text-[11px] mb-0.5">Why Trees Matter:</strong>
                  <p className="text-gray-600">{species.why_trees_matter}</p>
                </div>
              </div>

              {/* Consequence if Cut */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-950">
                <span className="font-extrabold text-[11px] text-red-800 flex items-center gap-1 uppercase tracking-wider mb-1">
                  <AlertOctagon className="w-3.5 h-3.5 text-red-600" />
                  If Trees Cut:
                </span>
                <p className="text-[11px] text-red-900 font-medium">{species.consequence_if_cut}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verifiable Link / Source & CSV Download */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap text-gray-700">
            <span className="font-bold text-gray-900">Avian & Biodiversity Sources:</span>
            <a
              href="https://ebird.org/india"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>eBird Ranchi Atlas</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://stateofindiasbirds.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>State of India's Birds (SoIB 2023)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://www.iucnredlist.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>IUCN Red List</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-[11px] text-gray-500">
            Checklist records verified by citizen ornithologists across Dhurwa, HEC, Morabadi, Kanke Dam, and Rock Garden.
          </p>
        </div>

        <button
          onClick={handleDownloadWildlifeCsv}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs transition-colors shadow-sm self-start sm:self-auto shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download 11 Bird Species Data (CSV)</span>
        </button>
      </div>
    </div>
  );
};
