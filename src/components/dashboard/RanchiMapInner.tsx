"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import {
  MapPin,
  AlertTriangle,
  Wind,
  Bird,
  Trees,
  Search,
  Filter,
  ExternalLink,
  Info,
  ShieldAlert,
  ArrowRight,
  Maximize2,
  X,
  Download,
} from "lucide-react";
import dashboardData from "@/data/ranchi-environmental-data.json";
import { downloadCsv } from "@/lib/csvExport";

interface RanchiMapInnerProps {
  selectedHotspot: string;
  onSelectHotspot: (id: string) => void;
  height?: string;
}

export default function RanchiMapInner({
  selectedHotspot,
  onSelectHotspot,
  height = "600px",
}: RanchiMapInnerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [filterStatus, setFilterStatus] = useState<"ALL" | "SEVERE" | "MODERATE">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArea, setActiveArea] = useState<any>(
    selectedHotspot === "ALL"
      ? dashboardData.hotspots[0]
      : dashboardData.hotspots.find((h) => h.id === selectedHotspot) || dashboardData.hotspots[0]
  );

  const hotspots = dashboardData.hotspots;

  const handleDownloadHotspotsCsv = () => {
    downloadCsv(
      "ranchi_15_hotspots_environmental_data",
      [
        "Hotspot ID",
        "Locality Name",
        "Hindi Name",
        "Latitude",
        "Longitude",
        "Severity Status",
        "Trees Felled (2019-2025)",
        "Trees Threatened in Pipeline",
        "Current AQI",
        "PM2.5 (ug/m3)",
        "Bird Species Impacted",
        "Reason for Tree Felling",
        "Primary Threat Details",
        "Monitoring CAAQMS Station",
        "Official Statutory Reference",
      ],
      hotspots.map((h) => [
        h.id,
        h.name,
        h.hindi_name,
        h.coordinates[0],
        h.coordinates[1],
        h.status,
        h.trees_cut,
        h.trees_threatened || 0,
        h.current_aqi,
        h.pm25,
        h.bird_species_lost,
        h.reason_for_cutting,
        h.primary_threat,
        h.aqi_monitoring_station,
        h.official_record_ref,
      ])
    );
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [23.35, 85.31],
        zoom: 12,
        minZoom: 10,
        maxZoom: 18,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Sync selectedHotspot from parent
  useEffect(() => {
    if (selectedHotspot && selectedHotspot !== "ALL") {
      const match = hotspots.find((h) => h.id === selectedHotspot);
      if (match) {
        setActiveArea(match);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo(match.coordinates as [number, number], 14, {
            duration: 1.2,
          });
        }
      }
    }
  }, [selectedHotspot, hotspots]);

  // Update map markers when filters or active area changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    const filtered = hotspots.filter((h) => {
      const matchesSearch =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.hindi_name.includes(searchQuery) ||
        h.reason_for_cutting.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (filterStatus === "SEVERE") return h.status === "SEVERE_LOSS";
      if (filterStatus === "MODERATE") return h.status === "MODERATE_LOSS";
      return true;
    });

    filtered.forEach((hotspot) => {
      const isSevere = hotspot.status === "SEVERE_LOSS";
      const isSelected = activeArea?.id === hotspot.id;

      const markerHtml = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <div style="
            width: ${isSelected ? "36px" : "28px"};
            height: ${isSelected ? "36px" : "28px"};
            border-radius: 50%;
            background-color: ${hotspot.color};
            border: ${isSelected ? "3px solid #ffffff" : "2px solid #ffffff"};
            box-shadow: 0 4px 14px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: 800;
            font-size: ${isSelected ? "13px" : "11px"};
            transition: all 0.2s ease;
          ">
            ${isSevere ? "!" : "•"}
          </div>
          ${
            isSevere
              ? `<span style="
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  background-color: ${hotspot.color};
                  opacity: 0.4;
                  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                  z-index: -1;
                "></span>`
              : ""
          }
        </div>
      `;

      const customIcon = L.divIcon({
        className: "custom-hotspot-pin",
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(hotspot.coordinates as [number, number], { icon: customIcon });

      const popupHtml = `
        <div style="padding: 12px; font-family: inherit; min-width: 240px; max-width: 290px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: ${
              isSevere ? "#fee2e2" : "#ffedd5"
            }; color: ${isSevere ? "#991b1b" : "#9a3412"};">
              ${isSevere ? "🔴 SEVERE LOSS" : "🟠 MODERATE LOSS"}
            </span>
            <span style="font-size: 11px; font-weight: bold; color: #475569;">AQI: ${hotspot.current_aqi}</span>
          </div>
          <h4 style="margin: 0 0 2px 0; font-size: 14px; font-weight: 800; color: #0f172a;">${hotspot.name}</h4>
          <p style="margin: 0 0 8px 0; font-size: 11px; color: #64748b; font-weight: 500;">${hotspot.hindi_name}</p>
          
          <div style="background: #f8fafc; border-radius: 6px; padding: 6px 8px; margin-bottom: 8px; font-size: 11px; line-height: 1.4;">
            <div><strong>Trees Felled:</strong> <span style="color: #dc2626; font-weight: 700;">${hotspot.trees_cut.toLocaleString()}</span></div>
            <div><strong>Birds Impacted:</strong> ${
              hotspot.bird_species_lost === "Data Not Available"
                ? "Data Not Available"
                : hotspot.bird_species_lost + " species declined"
            }</div>
            <div><strong>Main Cause:</strong> ${hotspot.reason_for_cutting.substring(0, 75)}...</div>
          </div>
          <div style="font-size: 9px; color: #94a3b8; text-align: right;">Ref: ${hotspot.official_record_ref}</div>
        </div>
      `;

      marker.bindPopup(popupHtml, { closeButton: false, offset: [0, -10] });

      marker.on("click", () => {
        setActiveArea(hotspot);
        onSelectHotspot(hotspot.id);
      });

      markersGroup.addLayer(marker);
    });
  }, [hotspots, activeArea, filterStatus, searchQuery, onSelectHotspot]);

  return (
    <div className="space-y-4">
      {/* Map Control Bar: Search & Severity Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Ranchi area (e.g. Harmu, Morabadi, HEC, Ratu Road)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-gray-50 focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-gray-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <button
            onClick={() => setFilterStatus("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterStatus === "ALL"
                ? "bg-[#1b4332] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Hotspots ({hotspots.length})
          </button>
          <button
            onClick={() => setFilterStatus("SEVERE")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
              filterStatus === "SEVERE"
                ? "bg-red-600 text-white"
                : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            Severe Loss (8)
          </button>
          <button
            onClick={() => setFilterStatus("MODERATE")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
              filterStatus === "MODERATE"
                ? "bg-amber-600 text-white"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Moderate Loss (7)
          </button>
        </div>
      </div>

      {/* Map Canvas with Floating Map Legend */}
      <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-md">
        <div ref={mapContainerRef} style={{ height }} className="w-full z-0" />

        {/* Floating Legend */}
        <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-xl border border-gray-200 shadow-lg text-xs space-y-2 pointer-events-auto">
          <div className="font-bold text-gray-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
            <span>Ranchi Canopy Loss Map Legend</span>
          </div>
          <div className="flex flex-col gap-1.5 text-gray-700 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-red-600 flex items-center justify-center text-[9px] text-white font-bold">
                !
              </span>
              <span>
                <strong>Red Alert:</strong> Severe Loss (&gt;1,800 trees or flyover canyon)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 flex items-center justify-center text-[9px] text-white font-bold">
                •
              </span>
              <span>
                <strong>Orange Alert:</strong> Moderate Loss (Suburban & Feeder corridors)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-600"></span>
              <span>
                <strong>Green:</strong> Undisturbed Reserve (Outside Municipal Limits)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Area Detail Inspection Drawer / Card */}
      {activeArea && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-emerald-900/10 shadow-lg transition-all animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full ${
                    activeArea.status === "SEVERE_LOSS"
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  {activeArea.status === "SEVERE_LOSS" ? "🚨 Severe Ecological Loss" : "⚠️ Moderate Canopy Loss"}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500 font-medium">{activeArea.aqi_monitoring_station}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                {activeArea.name} <span className="text-sm font-normal text-gray-500">({activeArea.hindi_name})</span>
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo(activeArea.coordinates as [number, number], 15, {
                      duration: 1.2,
                    });
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Zoom to Area</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
            <div className="bg-rose-50/70 border border-rose-200/60 rounded-xl p-3.5">
              <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
                Trees Felled (2019-2025)
              </span>
              <span className="text-2xl font-black text-rose-900 mt-1 block">
                {activeArea.trees_cut.toLocaleString()}
              </span>
              <span className="text-[11px] text-rose-700 mt-0.5 block">
                Threatened in pipeline: {activeArea.trees_threatened?.toLocaleString() || "N/A"}
              </span>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3.5">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                Current Ambient AQI
              </span>
              <span className="text-2xl font-black text-amber-900 mt-1 block">
                {activeArea.current_aqi}
              </span>
              <span className="text-[11px] text-amber-700 mt-0.5 block">
                PM2.5: {activeArea.pm25} µg/m³ (WHO limit: 5 µg)
              </span>
            </div>

            <div className="bg-blue-50/70 border border-blue-200/60 rounded-xl p-3.5">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                Bird Species Disappeared
              </span>
              <span className="text-2xl font-black text-blue-900 mt-1 block">
                {activeArea.bird_species_lost === "Data Not Available"
                  ? "Data Not Available"
                  : activeArea.bird_species_lost + " species"}
              </span>
              <span className="text-[11px] text-blue-700 mt-0.5 block">
                {activeArea.bird_species_lost === "Data Not Available"
                  ? "Pending eBird checklist survey"
                  : "Hornbills, owls & songbirds displaced"}
              </span>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                Official Record Ref
              </span>
              <span className="text-xs font-mono font-bold text-gray-800 mt-1 block break-all">
                {activeArea.official_record_ref}
              </span>
              <span className="text-[10px] text-gray-500 mt-0.5 block">Verified through RTI & Forest Gazette</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2 text-xs sm:text-sm">
            <div>
              <strong className="text-gray-900">Reason for Tree Felling:</strong>{" "}
              <span className="text-gray-700">{activeArea.reason_for_cutting}</span>
            </div>
            <div>
              <strong className="text-gray-900">Canopy Status & Threat:</strong>{" "}
              <span className="text-gray-700">{activeArea.canopy_loss_status}</span>
            </div>
          </div>
        </div>
      )}

      {/* Verifiable Source Attribution & CSV Download Under Map */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap text-gray-700">
            <span className="font-bold text-gray-900">Map & Hotspot Data Sources:</span>
            <a
              href="https://fsi.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>FSI ISFR Reports</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://cpcb.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>CPCB CAAQMS Stations</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="http://forest.jharkhand.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>Jharkhand Forest Dept RTI</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-[11px] text-gray-500">
            All 15 hotspots surveyed across Ranchi Municipal Corporation (RMC) limits and peripheral expressways.
          </p>
        </div>

        <button
          onClick={handleDownloadHotspotsCsv}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs transition-colors shadow-sm self-start sm:self-auto shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download 15 Hotspots (CSV)</span>
        </button>
      </div>
    </div>
  );
}
