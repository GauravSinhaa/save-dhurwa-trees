"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { TreeRecord } from "@/lib/types";
import { dhurwaRoadAlignment } from "@/lib/db";
import {
  Search,
  Filter,
  Eye,
  Layers,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Ruler,
  Maximize2,
  FileText,
  X,
  Compass,
  TreeDeciduous,
  Info,
  ExternalLink,
} from "lucide-react";

interface LeafletMapProps {
  initialTrees?: TreeRecord[];
  height?: string;
  showFilters?: boolean;
}

export default function LeafletMap({
  initialTrees = [],
  height = "750px",
  showFilters = true,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const alignmentLayerRef = useRef<L.LayerGroup | null>(null);

  const [trees, setTrees] = useState<TreeRecord[]>(initialTrees);
  const [selectedTree, setSelectedTree] = useState<TreeRecord | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("ALL");
  const [selectedThreat, setSelectedThreat] = useState("ALL");
  const [selectedVerification, setSelectedVerification] = useState("ALL");
  const [showAlignment, setShowAlignment] = useState(true);
  const [showDemoData, setShowDemoData] = useState(true);

  // Fetch latest trees from API on mount
  useEffect(() => {
    async function fetchTrees() {
      try {
        const res = await fetch("/api/trees");
        const json = await res.json();
        if (json.success && json.data) {
          setTrees(json.data);
        }
      } catch (e) {
        console.error("Failed to load trees from API", e);
      }
    }
    fetchTrees();
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Dhurwa corridor, Ranchi
    const map = L.map(mapContainerRef.current, {
      center: [23.315, 85.275],
      zoom: 13,
      minZoom: 11,
      maxZoom: 18,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Save Dhurwa Trees',
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    alignmentLayerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Draw Road Alignment Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !alignmentLayerRef.current) return;

    alignmentLayerRef.current.clearLayers();

    if (!showAlignment) return;

    const latlngs: [number, number][] = dhurwaRoadAlignment.map((p) => [
      p.lat,
      p.lng,
    ]);

    // Buffer corridor representation (60m broad corridor zone)
    const corridorBuffer = L.polyline(latlngs, {
      color: "#f59e0b",
      weight: 18,
      opacity: 0.28,
      lineCap: "round",
    });

    // Central road centerline
    const corridorCenterline = L.polyline(latlngs, {
      color: "#b45309",
      weight: 4,
      dashArray: "6, 6",
      opacity: 0.9,
    });

    // Alignment milestone markers
    dhurwaRoadAlignment.forEach((p, idx) => {
      const isStart = idx === 0;
      const isEnd = idx === dhurwaRoadAlignment.length - 1;

      const marker = L.circleMarker([p.lat, p.lng], {
        radius: isStart || isEnd ? 7 : 4,
        fillColor: isStart ? "#10b981" : isEnd ? "#ef4444" : "#f59e0b",
        color: "#ffffff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      }).bindTooltip(
        `<strong>${p.name}</strong><br/><span style="font-size:11px;color:#666;">Reported Chainage ${idx * 1.0} km</span>`,
        { direction: "top", offset: [0, -5] }
      );

      alignmentLayerRef.current?.addLayer(marker);
    });

    alignmentLayerRef.current.addLayer(corridorBuffer);
    alignmentLayerRef.current.addLayer(corridorCenterline);
  }, [showAlignment]);

  // Filter Trees
  const filteredTrees = trees.filter((tree) => {
    if (!showDemoData && tree.source_type === "DEMONSTRATION") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        tree.public_tree_id.toLowerCase().includes(q) ||
        tree.species_common_name.toLowerCase().includes(q) ||
        tree.species_scientific_name.toLowerCase().includes(q) ||
        tree.locality.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedSpecies !== "ALL" && tree.species_common_name !== selectedSpecies) {
      return false;
    }

    if (selectedThreat !== "ALL" && tree.threat_status !== selectedThreat) {
      return false;
    }

    if (
      selectedVerification !== "ALL" &&
      tree.verification_status !== selectedVerification
    ) {
      return false;
    }

    return true;
  });

  // Render tree markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredTrees.forEach((tree) => {
      // Determine marker color and icon
      let fillColor = "#16a34a"; // Green for verified existing
      let borderColor = "#ffffff";
      let statusLabel = "Verified Tree";

      if (tree.source_type === "DEMONSTRATION") {
        fillColor = "#6366f1"; // Indigo for demo
        statusLabel = "Demonstration Sample";
      } else if (tree.threat_status === "POTENTIALLY_AFFECTED") {
        fillColor = "#d97706"; // Amber for corridor conflict
        statusLabel = "Potentially Affected";
      } else if (tree.threat_status === "OFFICIALLY_LISTED_FELLING") {
        fillColor = "#dc2626"; // Red for authorized cutting
        statusLabel = "Listed for Felling";
      } else if (tree.threat_status === "CONFIRMED_FELLED") {
        fillColor = "#4b5563"; // Gray for felled
        statusLabel = "Confirmed Felled";
      } else if (tree.threat_status === "TRANSPLANTATION_PROPOSED") {
        fillColor = "#0284c7"; // Blue
        statusLabel = "Transplantation Proposed";
      } else if (tree.verification_status === "PENDING_REVIEW") {
        fillColor = "#f97316"; // Orange
        statusLabel = "Awaiting Verification";
      }

      // Proportional radius based on tree trunk girth (GBH)
      const radius = Math.min(
        16,
        Math.max(7, Math.round(tree.trunk_circumference_cm / 25))
      );

      const marker = L.circleMarker([tree.latitude, tree.longitude], {
        radius,
        fillColor,
        color: borderColor,
        weight: 2,
        opacity: 0.95,
        fillOpacity: 0.85,
      });

      marker.bindTooltip(
        `<div style="font-family:sans-serif; padding:2px;">
          <div style="font-weight:bold; font-size:12px; color:#1f2937;">${tree.public_tree_id}: ${tree.species_common_name}</div>
          <div style="font-size:11px; color:#4b5563;">Girth: ${tree.trunk_circumference_cm} cm | Height: ${tree.estimated_height_m}m</div>
          <div style="font-size:10px; font-weight:600; margin-top:2px; color:${fillColor};">${statusLabel}</div>
        </div>`,
        { direction: "top", offset: [0, -radius] }
      );

      marker.on("click", () => {
        setSelectedTree(tree);
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [filteredTrees]);

  // Unique species list for dropdown
  const uniqueSpecies = Array.from(
    new Set(trees.map((t) => t.species_common_name))
  ).sort();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#2d6a4f]/40 shadow-xl bg-white">
      {/* Top Map Control Bar */}
      <div className="bg-[#1b4332] text-white p-3 sm:p-4 border-b border-[#2d6a4f] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          <span className="font-semibold text-sm">
            Dhurwa Road Corridor Tree GIS
          </span>
          <span className="bg-[#2d6a4f] text-emerald-200 px-2 py-0.5 rounded-full font-mono text-[11px]">
            {filteredTrees.length} records shown
          </span>
        </div>

        {/* Layer Visibility Toggles */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer text-gray-200 hover:text-white">
            <input
              type="checkbox"
              checked={showAlignment}
              onChange={(e) => setShowAlignment(e.target.checked)}
              className="rounded text-amber-500 focus:ring-amber-400"
            />
            <span>Road Corridor (6.089 km)</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-gray-200 hover:text-white">
            <input
              type="checkbox"
              checked={showDemoData}
              onChange={(e) => setShowDemoData(e.target.checked)}
              className="rounded text-indigo-500 focus:ring-indigo-400"
            />
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              Demo Samples
            </span>
          </label>
        </div>
      </div>

      {/* Filter Toolbar */}
      {showFilters && (
        <div className="bg-[#f6f4ee] p-3 border-b border-[#e2dfd4] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by ID, species, locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2d6a4f] text-xs"
            />
          </div>

          {/* Species Filter */}
          <select
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
            className="w-full py-2 px-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2d6a4f] text-xs font-medium"
          >
            <option value="ALL">All Species ({uniqueSpecies.length})</option>
            {uniqueSpecies.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Threat Status Filter */}
          <select
            value={selectedThreat}
            onChange={(e) => setSelectedThreat(e.target.value)}
            className="w-full py-2 px-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2d6a4f] text-xs font-medium"
          >
            <option value="ALL">All Threat Categories</option>
            <option value="POTENTIALLY_AFFECTED">Potentially Affected in Corridor</option>
            <option value="VERIFIED_EXISTING">Verified Existing / Safe</option>
            <option value="TRANSPLANTATION_PROPOSED">Transplantation Proposed</option>
            <option value="REPORTED_BY_CITIZEN">Reported by Citizen</option>
            <option value="OFFICIALLY_LISTED_FELLING">Officially Listed for Felling</option>
            <option value="CONFIRMED_FELLED">Confirmed Felled</option>
          </select>

          {/* Verification Status */}
          <select
            value={selectedVerification}
            onChange={(e) => setSelectedVerification(e.target.value)}
            className="w-full py-2 px-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2d6a4f] text-xs font-medium"
          >
            <option value="ALL">All Verification Statuses</option>
            <option value="VERIFIED">Verified Field Record</option>
            <option value="PENDING_REVIEW">Awaiting Review</option>
            <option value="UNVERIFIED">Unverified / Sample</option>
          </select>
        </div>
      )}

      {/* Map Body & Detail Panel Container */}
      <div className="relative" style={{ height }}>
        {/* Leaflet DOM container */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Map Legend (Floating on bottom left) */}
        <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-200 text-[11px] max-w-xs space-y-1.5 hidden md:block">
          <div className="font-bold text-gray-800 flex items-center justify-between border-b pb-1">
            <span>Map Legend</span>
            <span className="text-[10px] text-gray-400 font-normal">
              Circle size = Girth
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-gray-700">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>Verified Existing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Potentially Threatened</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span>Citizen Report</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span>Transplant Proposed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span>Demonstration Sample</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-amber-600 border border-amber-300"></span>
              <span>Reported Corridor</span>
            </div>
          </div>
        </div>

        {/* Selected Tree Detail Drawer (Floating on right) */}
        {selectedTree && (
          <div className="absolute top-4 right-4 z-30 w-80 sm:w-96 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90%] animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="bg-[#1b4332] text-white p-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#2d6a4f] text-emerald-300 font-mono text-xs px-2 py-0.5 rounded font-bold">
                    {selectedTree.public_tree_id}
                  </span>
                  {selectedTree.source_type === "DEMONSTRATION" && (
                    <span className="bg-indigo-900 text-indigo-200 border border-indigo-400 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      Demo Sample
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base mt-1 text-white">
                  {selectedTree.species_common_name}
                </h3>
                <p className="text-xs italic text-emerald-200">
                  {selectedTree.species_scientific_name}
                </p>
              </div>
              <button
                onClick={() => setSelectedTree(null)}
                className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tree Photo */}
            <div className="relative h-44 bg-gray-100 overflow-hidden">
              <img
                src={selectedTree.photo_url || "/images/field_survey.jpg"}
                alt={selectedTree.species_common_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                Survey Date: {selectedTree.survey_date}
              </div>
            </div>

            {/* Body Specs */}
            <div className="p-4 space-y-3 overflow-y-auto text-xs">
              {/* Threat & Verification Badges */}
              <div className="flex flex-wrap gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                    selectedTree.threat_status === "POTENTIALLY_AFFECTED"
                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                      : selectedTree.threat_status === "VERIFIED_EXISTING"
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      : "bg-blue-100 text-blue-900 border border-blue-300"
                  }`}
                >
                  {selectedTree.threat_status.replace(/_/g, " ")}
                </span>
                <span
                  className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                    selectedTree.verification_status === "VERIFIED"
                      ? "badge-verified"
                      : selectedTree.verification_status === "PENDING_REVIEW"
                      ? "badge-pending"
                      : "badge-demo"
                  }`}
                >
                  {selectedTree.verification_status}
                </span>
              </div>

              {/* Location & GPS */}
              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-gray-800">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{selectedTree.locality}</span>
                </div>
                <div className="text-[11px] text-gray-500 font-mono flex items-center justify-between">
                  <span>
                    GPS: {selectedTree.latitude.toFixed(5)}° N,{" "}
                    {selectedTree.longitude.toFixed(5)}° E
                  </span>
                  <a
                    href={`https://www.google.com/maps?q=${selectedTree.latitude},${selectedTree.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline flex items-center gap-0.5"
                  >
                    Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Measurements Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-emerald-50/50 rounded-lg border border-emerald-100 text-center">
                  <span className="block text-[10px] text-gray-500 font-medium">
                    Trunk Girth (GBH)
                  </span>
                  <span className="font-bold text-gray-800 text-sm">
                    {selectedTree.trunk_circumference_cm} cm
                  </span>
                </div>
                <div className="p-2 bg-emerald-50/50 rounded-lg border border-emerald-100 text-center">
                  <span className="block text-[10px] text-gray-500 font-medium">
                    Height
                  </span>
                  <span className="font-bold text-gray-800 text-sm">
                    {selectedTree.estimated_height_m} m
                  </span>
                </div>
                <div className="p-2 bg-emerald-50/50 rounded-lg border border-emerald-100 text-center">
                  <span className="block text-[10px] text-gray-500 font-medium">
                    Canopy Spread
                  </span>
                  <span className="font-bold text-gray-800 text-sm">
                    {selectedTree.canopy_spread_m} m
                  </span>
                </div>
              </div>

              {/* Health & Age */}
              <div className="flex items-center justify-between text-gray-700 border-t pt-2">
                <span>
                  <strong>Health:</strong> {selectedTree.health_status}
                </span>
                <span>
                  <strong>Est. Age:</strong>{" "}
                  {selectedTree.estimated_age
                    ? `~${selectedTree.estimated_age} years`
                    : "Not assessed"}
                </span>
              </div>

              {/* Observer notes */}
              {selectedTree.observer_notes && (
                <div className="text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-[11px] leading-relaxed">
                  <strong>Field Notes:</strong> {selectedTree.observer_notes}
                </div>
              )}

              {/* Associated Avian & Wildlife Nesting */}
              <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-200/80 text-[11px] text-emerald-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <TreeDeciduous className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Avian & Wildlife Nesting Role:</span>
                </div>
                <p className="leading-relaxed text-[10.5px] text-emerald-900/90">
                  {selectedTree.species_common_name.toLowerCase().includes("banyan") ||
                  selectedTree.species_common_name.toLowerCase().includes("bargad") ||
                  selectedTree.species_common_name.toLowerCase().includes("peepal")
                    ? "Essential host for the Indian Grey Hornbill (धनेश), Spotted Owlet (उल्लू), Coppersmith Barbet, and colonial Flying Fox bat roosts. Ancient trunk cavities cannot be replicated by young saplings."
                    : selectedTree.species_common_name.toLowerCase().includes("sal") ||
                      selectedTree.species_common_name.toLowerCase().includes("sakhuwa")
                    ? "High-canopy nesting site for the Black-hooded Oriole, Alexandrine Parakeet, and Shikra raptors. Provides nocturnal roosting branches for Indian Peafowl (मोर)."
                    : selectedTree.species_common_name.toLowerCase().includes("mahua") ||
                      selectedTree.species_common_name.toLowerCase().includes("semal")
                    ? "Vital spring nectar and floral feeding resource for parakeets, barbets, sunbirds, and cavity-nesting owlets."
                    : "Provides shaded canopy nesting, insect foraging, and local bird perches along the road corridor."}
                </p>
              </div>

              {/* Official doc reference */}
              {selectedTree.official_doc_reference && (
                <div className="text-[10px] text-gray-500 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-amber-600" />
                  <span>Ref: {selectedTree.official_doc_reference}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
