"use client";

import React, { useState, useEffect } from "react";
import { TreeRecord, CitizenReport, AuditLog } from "@/lib/types";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Upload,
  FileSpreadsheet,
  AlertTriangle,
  Layers,
  History,
  Lock,
  Eye,
  KeyRound,
  FileText,
  RefreshCw,
  PlusCircle,
  Database,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [role, setRole] = useState("Administrator");
  const [actorName, setActorName] = useState("Admin Lead");

  const [activeTab, setActiveTab] = useState<
    "QUEUE" | "INVENTORY" | "IMPORT" | "AUDIT"
  >("QUEUE");

  // Data states
  const [pendingReports, setPendingReports] = useState<CitizenReport[]>([]);
  const [trees, setTrees] = useState<TreeRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);

  // Import State
  const [importFormat, setImportFormat] = useState<"geojson" | "csv">("csv");
  const [importContent, setImportContent] = useState<string>(
    `public_tree_id,species_common_name,latitude,longitude,locality,estimated_height_m,trunk_circumference_cm,health_status,threat_status
DHT-101,Sal / Sakhuwa,23.3215,85.2950,HEC Administrative Sector,18,210,GOOD,POTENTIALLY_AFFECTED
DHT-102,Peepal,23.3190,85.2910,Dhurwa Sector 2 Avenue,16,320,EXCELLENT,POTENTIALLY_AFFECTED`
  );
  const [importResult, setImportResult] = useState<any>(null);

  // Tree status update modal
  const [editingTree, setEditingTree] = useState<TreeRecord | null>(null);
  const [newThreatStatus, setNewThreatStatus] = useState<string>("");
  const [statusReason, setStatusReason] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "dhurwa2026" || pin === "admin") {
      setAuthenticated(true);
      loadAdminData();
    } else {
      alert("Invalid Admin PIN. Use 'dhurwa2026' for testing.");
    }
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // 1. Citizen reports
      const resR = await fetch("/api/reports");
      const jsonR = await resR.json();
      if (jsonR.success) {
        setPendingReports(
          jsonR.data.filter((r: CitizenReport) => r.review_status === "PENDING")
        );
      }

      // 2. Trees
      const resT = await fetch("/api/trees");
      const jsonT = await resT.json();
      if (jsonT.success) setTrees(jsonT.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewReport = async (reportId: string, action: "APPROVE" | "REJECT") => {
    try {
      const res = await fetch("/api/reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          report_id: reportId,
          action,
          reviewer_name: `${actorName} (${role})`,
        }),
      });
      const json = await res.json();
      if (json.success) {
        alert(`Observation ${action.toLowerCase()}d successfully.`);
        loadAdminData();
      } else {
        alert(json.error || "Review action failed");
      }
    } catch (e) {
      alert("Network error");
    }
  };

  const handleUpdateTreeStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTree) return;

    try {
      const res = await fetch(`/api/trees/${editingTree.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threat_status: newThreatStatus,
          actor_name: `${actorName} (${role})`,
          reason: statusReason || "Administrative verification update",
        }),
      });

      const json = await res.json();
      if (json.success) {
        alert("Tree record updated with auditable log entry.");
        setEditingTree(null);
        loadAdminData();
      } else {
        alert(json.error || "Update failed");
      }
    } catch (e) {
      alert("Network error updating tree");
    }
  };

  const handleImportSubmit = async (dryRun: boolean) => {
    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format: importFormat,
          data: importContent,
          dry_run: dryRun,
          actor_name: `${actorName} (${role})`,
        }),
      });
      const json = await res.json();
      setImportResult(json);
      if (!dryRun && json.success) {
        alert(`Successfully imported ${json.imported_count} records into GIS database.`);
        loadAdminData();
      }
    } catch (e) {
      alert("Import request failed");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-[600px] flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-3xl border border-gray-200 p-8 max-w-md w-full shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold text-gray-900">
              Admin & Verification Portal
            </h1>
            <p className="text-xs text-gray-500">
              Restricted to authorized arborists, reviewers, and data managers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs"
              >
                <option value="Administrator">Administrator</option>
                <option value="Tree Survey Reviewer">Tree Survey Reviewer</option>
                <option value="Botanist / Technical Reviewer">
                  Botanist / Technical Reviewer
                </option>
                <option value="Document Reviewer">Document Reviewer</option>
                <option value="Read-Only Analyst">Read-Only Analyst</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Display Name / Reviewer Identity
              </label>
              <input
                type="text"
                required
                value={actorName}
                onChange={(e) => setActorName(e.target.value)}
                placeholder="e.g. Dr. K. Soren"
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Administrative Passcode (PIN)
              </label>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN (dhurwa2026)"
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-mono"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                Development PIN: <code className="text-emerald-700 font-bold">dhurwa2026</code>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold rounded-xl text-xs transition-colors shadow-md"
            >
              Authenticate & Open Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Top Header */}
      <div className="bg-[#1b4332] text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Authorized Administrative Session
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">
            Data Moderation & Inventory Control
          </h1>
          <p className="text-xs text-gray-300 mt-0.5">
            Logged in as <strong>{actorName}</strong> ({role}) • Strict audit logging active.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={loadAdminData}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs border border-white/20 transition-colors"
            title="Refresh records"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => setAuthenticated(false)}
            className="px-3 py-2 bg-red-800 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("QUEUE")}
          className={`pb-3 px-2 transition-colors border-b-2 ${
            activeTab === "QUEUE"
              ? "border-[#1b4332] text-[#1b4332]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Citizen Review Queue ({pendingReports.length})
        </button>
        <button
          onClick={() => setActiveTab("INVENTORY")}
          className={`pb-3 px-2 transition-colors border-b-2 ${
            activeTab === "INVENTORY"
              ? "border-[#1b4332] text-[#1b4332]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Tree Inventory ({trees.length})
        </button>
        <button
          onClick={() => setActiveTab("IMPORT")}
          className={`pb-3 px-2 transition-colors border-b-2 ${
            activeTab === "IMPORT"
              ? "border-[#1b4332] text-[#1b4332]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          GIS & CSV Import Tool
        </button>
      </div>

      {/* Tab 1: Citizen Review Queue */}
      {activeTab === "QUEUE" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Citizen submissions awaiting verification before addition to the public map:
            </span>
          </div>

          {pendingReports.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center text-gray-500 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="font-semibold text-sm text-gray-800">
                All submissions reviewed!
              </p>
              <p className="text-xs">No pending observations in queue.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-gray-500">
                        {report.id}
                      </span>
                      <span className="badge-pending px-2 py-0.5 rounded text-[10px] font-bold">
                        Pending Review
                      </span>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <img
                          src={report.photo_url || "/images/field_survey.jpg"}
                          alt="Observation"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1 text-xs">
                        <h3 className="font-bold text-gray-900 text-sm">
                          {report.species_common_name}
                        </h3>
                        <p className="text-gray-500 italic">
                          {report.species_scientific_name || "Unspecified"}
                        </p>
                        <p className="text-gray-600">
                          <strong>Location:</strong> {report.locality}, {report.city || "Ranchi"}
                        </p>
                        <p className="text-gray-600">
                          <strong>Date:</strong> {report.date || (report.created_at ? report.created_at.split("T")[0] : "2026-04-10")}
                        </p>
                        <p className="font-mono text-[11px] text-gray-500">
                          GPS: {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs bg-gray-50 p-2 rounded-xl">
                      <div>
                        <span className="block text-[10px] text-gray-400">Girth</span>
                        <span className="font-bold text-gray-800">
                          {report.trunk_circumference_cm} cm
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-gray-400">Height</span>
                        <span className="font-bold text-gray-800">
                          {report.estimated_height_m} m
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-gray-400">Health</span>
                        <span className="font-bold text-gray-800">
                          {report.health_status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 bg-gray-50/70 p-2.5 rounded-xl border border-gray-100 leading-relaxed">
                      &quot;{report.description}&quot;
                    </p>

                    <div className="text-[11px] text-gray-400">
                      Reported by: <strong>{report.reporter_name}</strong> on{" "}
                      {report.created_at.split("T")[0]}
                    </div>
                  </div>

                  <div className="pt-3 border-t flex gap-2">
                    <button
                      onClick={() => handleReviewReport(report.id, "APPROVE")}
                      className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Add to Map</span>
                    </button>
                    <button
                      onClick={() => handleReviewReport(report.id, "REJECT")}
                      className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Tree Inventory */}
      {activeTab === "INVENTORY" && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between text-xs">
            <span className="font-bold text-gray-800">
              Official Tree Inventory Master Records ({trees.length})
            </span>
            <span className="text-gray-500">
              Click &quot;Update Status&quot; to log verified condition changes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#fbfaf5] border-b text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Species</th>
                  <th className="p-3">Locality</th>
                  <th className="p-3">Girth / Height</th>
                  <th className="p-3">Threat Status</th>
                  <th className="p-3">Verification</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {trees.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold text-gray-900">
                      {t.public_tree_id}
                    </td>
                    <td className="p-3">
                      <span className="font-semibold block">
                        {t.species_common_name}
                      </span>
                      <span className="italic text-[11px] text-gray-500">
                        {t.species_scientific_name}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">{t.locality}</td>
                    <td className="p-3 font-mono">
                      {t.trunk_circumference_cm} cm / {t.estimated_height_m} m
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-[11px]">
                        {t.threat_status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.verification_status === "VERIFIED"
                            ? "badge-verified"
                            : "badge-demo"
                        }`}
                      >
                        {t.verification_status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setEditingTree(t);
                          setNewThreatStatus(t.threat_status);
                          setStatusReason("");
                        }}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200"
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: GIS Import Tool */}
      {activeTab === "IMPORT" && (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-700" />
              <span>GIS Dataset & GeoJSON/CSV Importer</span>
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Supports surveyor CSVs and GeoJSON point files. Validates coordinate
              boundaries (Ranchi WGS84 bounds: 22.0°N to 24.5°N, 84.0°E to 86.5°E),
              detects duplicate tree IDs, and ensures full audit trail.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 text-xs font-semibold">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="importFormat"
                  value="csv"
                  checked={importFormat === "csv"}
                  onChange={() => setImportFormat("csv")}
                />
                <span>CSV Dataset</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="importFormat"
                  value="geojson"
                  checked={importFormat === "geojson"}
                  onChange={() => setImportFormat("geojson")}
                />
                <span>GeoJSON FeatureCollection</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Paste Raw {importFormat.toUpperCase()} Data
              </label>
              <textarea
                rows={8}
                value={importContent}
                onChange={(e) => setImportContent(e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-300 font-mono text-xs focus:ring-1 focus:ring-[#1b4332]"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleImportSubmit(true)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl text-xs transition-colors"
              >
                Run Validation Dry-Run
              </button>
              <button
                onClick={() => handleImportSubmit(false)}
                className="px-5 py-2.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Validate & Import to Master Database
              </button>
            </div>

            {/* Validation Feedback Result */}
            {importResult && (
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <div className="font-bold flex items-center gap-2">
                  <span>Import Report:</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      importResult.success ? "badge-verified" : "badge-disputed"
                    }`}
                  >
                    {importResult.dry_run ? "Dry Run Completed" : "Committed to DB"}
                  </span>
                </div>
                <div className="text-gray-600">
                  Total Parsed: <strong>{importResult.total_rows ?? importResult.imported_count}</strong> |
                  Rejected / Errors:{" "}
                  <strong className="text-red-700">
                    {importResult.rejected_rows ?? importResult.rejected_count}
                  </strong>
                </div>

                {importResult.errors && importResult.errors.length > 0 && (
                  <div className="p-3 bg-red-50 text-red-900 rounded-xl space-y-1 font-mono text-[11px]">
                    <strong>Validation Errors:</strong>
                    {importResult.errors.map((err: any, i: number) => (
                      <div key={i}>
                        Row {err.row} ({err.id}): {err.error}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tree Status Update Modal */}
      {editingTree && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <h3 className="font-bold text-base text-gray-900">
              Update Status for {editingTree.public_tree_id} (
              {editingTree.species_common_name})
            </h3>

            <form onSubmit={handleUpdateTreeStatus} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Threat Category
                </label>
                <select
                  value={newThreatStatus}
                  onChange={(e) => setNewThreatStatus(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300"
                >
                  <option value="POTENTIALLY_AFFECTED">Potentially Affected in Corridor</option>
                  <option value="VERIFIED_EXISTING">Verified Existing / Safe</option>
                  <option value="TRANSPLANTATION_PROPOSED">Transplantation Proposed</option>
                  <option value="OFFICIALLY_LISTED_FELLING">Officially Listed for Felling</option>
                  <option value="CONFIRMED_FELLED">Confirmed Felled</option>
                  <option value="PRESERVED_FOLLOWING_MODIFICATION">
                    Preserved Following Project Modification
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Justification / Document Reference *
                </label>
                <textarea
                  required
                  rows={3}
                  value={statusReason}
                  onChange={(e) => setStatusReason(e.target.value)}
                  placeholder="e.g. Field inspection by DFO arborist team confirms tree falls outside modified alignment curb."
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTree(null)}
                  className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1b4332] text-white font-bold hover:bg-[#2d6a4f]"
                >
                  Commit Status with Audit Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
