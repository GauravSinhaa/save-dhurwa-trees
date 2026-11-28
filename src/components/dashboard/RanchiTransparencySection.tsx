"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Code,
  Calendar,
  Database,
  Info,
} from "lucide-react";
import dashboardData from "@/data/ranchi-environmental-data.json";

export const RanchiTransparencySection: React.FC = () => {
  const [showJsonPreview, setShowJsonPreview] = useState(false);
  const metadata = dashboardData.metadata;

  const handleDownloadCsv = () => {
    const lines: string[] = [];

    // Header
    lines.push(`"Save Ranchi - Save Our Trees: Comprehensive Citywide Environmental Dataset"`);
    lines.push(`"Generated Date","${metadata.last_updated}"`);
    lines.push(`"Official Sources","CPCB, JSPCB, FSI, Forest Dept RTI, eBird, WHO"`);
    lines.push("");

    // Section 1: Hotspots
    lines.push(`"--- RANCHI HOTSPOTS CANOPY & AIR QUALITY ---"`);
    lines.push(`"Area ID","Area Name","Hindi Name","Latitude","Longitude","Status","Trees Cut (2019-2025)","Trees Threatened","Current AQI","PM2.5 (ug/m3)","Bird Species Impacted","Reason for Tree Felling","Official Reference"`);

    dashboardData.hotspots.forEach((h) => {
      lines.push(
        `"${h.id}","${h.name}","${h.hindi_name}",${h.coordinates[0]},${h.coordinates[1]},"${h.status}",${h.trees_cut},${h.trees_threatened || 0},${h.current_aqi},${h.pm25},"${h.bird_species_lost}","${h.reason_for_cutting.replace(/"/g, '""')}","${h.official_record_ref}"`
      );
    });

    lines.push("");
    // Section 2: Annual AQI
    lines.push(`"--- RANCHI ANNUAL AQI & PARTICULATE TREND (2019-2025) ---"`);
    lines.push(`"Year","Annual Avg AQI","PM2.5 (ug/m3)","PM10 (ug/m3)","Poor/Very Poor Days","Status Tier","Notable Infrastructure Event"`);
    dashboardData.aqi_trend_annual.forEach((a) => {
      lines.push(
        `${a.year},${a.aqi},${a.pm25},${a.pm10},${a.poor_very_poor_days},"${a.status}","${a.notable_event.replace(/"/g, '""')}"`
      );
    });

    lines.push("");
    // Section 3: Tree Audit
    lines.push(`"--- TREES CUT VS COMPENSATORY SURVIVED ---"`);
    lines.push(`"Year","Trees Felled","Compensatory Saplings Claimed","Audited Surviving Saplings (16%)","Net True Deficit"`);
    dashboardData.trees_felling_audit.annual_records.forEach((r) => {
      lines.push(
        `${r.year},${r.trees_cut},${r.trees_planted},${r.trees_survived},${r.net_loss}`
      );
    });

    lines.push("");
    // Section 4: Birds & Wildlife
    lines.push(`"--- RANCHI BIRD SPECIES EXTINCTION RISK ---"`);
    lines.push(`"Common Name (EN)","Hindi Name","Scientific Name","IUCN Status","Where Seen in Ranchi","Why Trees Matter","Consequence If Felled"`);
    dashboardData.birds_wildlife.species_cards.forEach((b) => {
      lines.push(
        `"${b.english_name}","${b.hindi_name}","${b.scientific_name}","${b.iucn_status}","${b.where_seen_in_ranchi.replace(/"/g, '""')}","${b.why_trees_matter.replace(/"/g, '""')}","${b.consequence_if_cut.replace(/"/g, '""')}"`
      );
    });

    lines.push("");
    // Section 5: Decadal Correlation
    lines.push(`"--- DECADAL DECLINE CORRELATION (2015-2025) ---"`);
    lines.push(`"Year","FSI District Forest Cover (sq km)","eBird Avian Sighting Index (Base 100)","Annual Average AQI"`);
    dashboardData.decline_correlation.forEach((c) => {
      lines.push(`${c.year},${c.tree_cover_sq_km},${c.bird_sightings_index},${c.annual_aqi}`);
    });

    const csvContent = lines.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ranchi_environmental_dataset_${metadata.last_updated}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Open Data & Civic Transparency</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Verifiable Official Data & Open Records
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
            All data published on this dashboard is compiled from official statutory bodies, RTI disclosures, and accredited citizen-science databases. If data for any specific area is not continuously monitored, it is strictly noted as "Data Not Available".
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="/documents/Save_Ranchi_Trees_Official_Evidence_Dossier.pdf"
            download="Save_Ranchi_Trees_Official_Evidence_Dossier.pdf"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-red-200" />
            <span>Download Evidence Dossier (.PDF)</span>
          </a>

          <a
            href="/documents/Save_Ranchi_Trees_Official_Evidence_Dossier.md"
            download="Save_Ranchi_Trees_Official_Evidence_Dossier.md"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4 text-amber-200" />
            <span>Markdown (.MD)</span>
          </a>

          <a
            href="/documents/Save_Ranchi_Trees_Official_Evidence_Dossier.txt"
            download="Save_Ranchi_Trees_Official_Evidence_Dossier.txt"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Mobile Text (.TXT)</span>
          </a>

          <button
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-300" />
            <span>Download Raw CSV Dataset</span>
          </button>

          <a
            href="/data/ranchi-environmental-data.json"
            download="ranchi-environmental-data.json"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors"
          >
            <Database className="w-4 h-4 text-gray-600" />
            <span>Download data.json</span>
          </a>

          <button
            onClick={() => setShowJsonPreview(!showJsonPreview)}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
          >
            <Code className="w-4 h-4 text-gray-600" />
            <span>{showJsonPreview ? "Hide JSON" : "Inspect data.json"}</span>
          </button>
        </div>
      </div>

      {/* Official Data Sources Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-inner">
        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-50 border-b border-gray-200 text-[11px] font-extrabold uppercase text-gray-600">
            <tr>
              <th className="py-3 px-4">Statutory Authority / Civic Source</th>
              <th className="py-3 px-4">Scope & Verification Metric</th>
              <th className="py-3 px-4 text-right">Verification Portal / Direct Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {metadata.lead_sources.map((source) => (
              <tr key={source.name} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-4 font-bold text-gray-900">{source.name}</td>
                <td className="py-3 px-4 text-gray-600">{source.description}</td>
                <td className="py-3 px-4 text-right">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
                  >
                    <span>
                      {source.url.includes("c.org") || source.url.includes("change.org")
                        ? "change.org (Petition)"
                        : source.url.replace("https://", "").replace("http://", "").split("/")[0]}
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* JSON Inspector View (Optional Toggle) */}
      {showJsonPreview && (
        <div className="bg-gray-950 text-emerald-400 p-4 rounded-2xl border border-gray-800 font-mono text-[11px] max-h-96 overflow-y-auto space-y-2 animate-fadeIn shadow-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs border-b border-gray-800 pb-2 mb-2 font-sans font-bold">
            <span>Editable Source: /src/data/ranchi-environmental-data.json</span>
            <span>Version: {metadata.version}</span>
          </div>
          <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
        </div>
      )}

      {/* Bottom Metadata & Editable Note */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>
            <strong>Last Updated:</strong> {metadata.last_updated} (Version {metadata.version})
          </span>
        </div>
        <div className="text-[11px] text-gray-500">
          <strong>Transparency Guarantee:</strong> All area-wise numbers are editable from one central{" "}
          <code className="bg-gray-200 px-1 py-0.5 rounded font-mono text-gray-800">data.json</code> file.
        </div>
      </div>
    </div>
  );
};
