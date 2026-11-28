"use client";

import React, { useState, useEffect } from "react";
import { ProjectDocument, DocumentCategory } from "@/lib/types";
import { initialProjectDocuments } from "@/lib/db";
import {
  FileText,
  Search,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  Copy,
  Printer,
  Sparkles,
  Shield,
  Layers,
  Eye,
  X,
  FileCheck,
  Calendar,
  Building2,
  Tag,
} from "lucide-react";

export default function DocumentsTransparencyPage() {
  const [documents, setDocuments] = useState<ProjectDocument[]>(initialProjectDocuments);
  const [selectedDocForModal, setSelectedDocForModal] = useState<ProjectDocument | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"DOCS" | "RTI_ASSISTANT">("DOCS");

  // RTI Assistant State
  const [applicantName, setApplicantName] = useState("");
  const [applicantAddress, setApplicantAddress] = useState("");
  const [targetAuthority, setTargetAuthority] = useState("SHAJ");
  const [selectedInquiries, setSelectedInquiries] = useState<string[]>([
    "Copy of Joint Tree Enumeration Survey Register along Chainage 0+000 to 6+089.",
    "Copy of statutory Tree Felling Permission application and sanction order, if issued.",
  ]);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const getPortalButtonLabel = (url: string) => {
    if (url.includes("jharkhandtenders.gov.in")) return "Open e-Procurement Portal (jharkhandtenders.gov.in)";
    if (url.includes("cpcb") || url.includes("cpcbccr")) return "Open CPCB CAAQMS Air Quality Portal";
    if (url.includes("jharkhandhighcourt")) return "Open High Court Portal (jharkhandhighcourt.nic.in)";
    if (url.includes("forest.jharkhand.gov.in")) return "Open Forest Dept / CAMPA Portal";
    if (url.includes("campa.nic.in")) return "Open National CAMPA Portal";
    if (url.includes("fsi.nic.in")) return "Open FSI Portal (fsi.nic.in)";
    if (url.includes("ebird.org")) return "Open eBird Avian Database";
    if (url.includes("change.org") || url.includes("c.org")) return "Sign Citizen Petition (Change.org)";
    return "Open Official Verification Source";
  };

  const getPortalTooltip = (url: string) => {
    if (url.includes("change.org") || url.includes("c.org")) return "Sign Citizen Petition (Change.org)";
    if (url.includes("ebird.org")) return "Open eBird Avian Database";
    return "Open Official Statutory Portal";
  };

  useEffect(() => {
    async function loadDocs() {
      try {
        const res = await fetch("/api/documents");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setDocuments(json.data);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadDocs();
  }, []);

  const categories = [
    { id: "ALL", label: "All Documents" },
    { id: "DPR", label: "Detailed Project Reports (DPR)" },
    { id: "RTI_REPLY", label: "RTI Applications & Replies" },
    { id: "COURT_ORDER", label: "Court Orders & PIL Records" },
    { id: "COMPENSATORY_AFFORESTATION", label: "Afforestation Plans" },
    { id: "FELLING_PERMISSION", label: "Tree Felling Clearances" },
    { id: "MEDIA_REPORT", label: "Published Media Investigations" },
  ];

  const getStatusBadge = (status: ProjectDocument["verification_status"]) => {
    switch (status) {
      case "OFFICIAL_VERIFIED":
        return (
          <span className="badge-verified px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Official Verified
          </span>
        );
      case "MEDIA_REPORTED":
        return (
          <span className="badge-reported px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" /> Media Reported
          </span>
        );
      case "REQUESTED_AWAITING":
        return (
          <span className="badge-pending px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Requested — Awaiting Response
          </span>
        );
      case "DISPUTED":
        return (
          <span className="badge-disputed px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Disputed / Superseded
          </span>
        );
    }
  };

  const filteredDocs = documents.filter((doc) => {
    if (selectedCategory !== "ALL" && doc.document_type !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.issuing_authority.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const availableRtiQuestions = [
    "Copy of Complete Detailed Project Report (DPR Volume 2: Environmental & Social Assessment).",
    "Copy of standalone Environmental Impact Assessment (EIA) / Environmental Management Plan (EMP), or certified confirmation if environmental clearance was claimed exempt.",
    "Copy of Joint Tree Enumeration Survey Register along Chainage 0+000 to 6+089.",
    "Copy of statutory Tree Felling Permission application and sanction order, if issued.",
    "Approved Right-of-Way (ROW) and geometric cross-section alignment drawings.",
    "Certified details of compensatory afforestation budget and identified plantation land parcels in Ranchi district.",
    "Technical feasibility reports assessing realignment to preserve mature heritage trees.",
    "Minutes of public hearings or stakeholder consultations conducted in Dhurwa or Jagannathpur.",
  ];

  const toggleRtiQuery = (q: string) => {
    if (selectedInquiries.includes(q)) {
      setSelectedInquiries(selectedInquiries.filter((i) => i !== q));
    } else {
      setSelectedInquiries([...selectedInquiries, q]);
    }
  };

  const generateRtiText = () => {
    const authorityName =
      targetAuthority === "SHAJ"
        ? "The Public Information Officer (PIO)\nState Highways Authority of Jharkhand (SHAJ)\nF.F.P. Building, Dhurwa, Ranchi - 834004"
        : "The Public Information Officer (PIO)\nOffice of the Divisional Forest Officer (DFO)\nRanchi Forest Division, Doranda, Ranchi - 834002";

    return `FORM 'A'
APPLICATION FOR INFORMATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

To:
${authorityName}

1. Full Name of Applicant: ${applicantName || "[Your Full Name]"}
2. Complete Address for Correspondence: ${applicantAddress || "[Your Address, Ranchi, Jharkhand]"}
3. Subject Matter of Information:
   Records concerning the proposed road development corridor from Vivekananda School More, Dhurwa to Ranchi Ring Road via Naya Sarai (approx. 6.089 km).

4. Specific Information & Certified Copies Requested:
${selectedInquiries.map((q, idx) => `   (${idx + 1}) ${q}`).join("\n")}

5. Period to which the information relates: 2024 to Present Date.
6. Mode of Delivery: Registered Post / Certified Physical Inspection.
7. Application Fee: ₹10 (enclosed via Indian Postal Order / Court Fee Stamp).

I hereby declare that I am a Citizen of India and the requested information does not fall under exemptions defined in Section 8 or 9 of the RTI Act, 2005.

Place: Ranchi
Date: ${new Date().toISOString().split("T")[0]}

Signature of Applicant: ___________________________`;
  };

  const handleCopyRti = () => {
    navigator.clipboard.writeText(generateRtiText());
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-[#1b4332] text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="bg-teal-400 text-gray-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Public Disclosure Repository
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Documents & Transparency Centre
          </h1>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            A public record of project drawings, tree survey filings, environmental
            permissions, court orders, and Right to Information (RTI) records. We ensure
            every civic claim is backed by official evidence.
          </p>

          {/* Tab switcher & Download */}
          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("DOCS")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === "DOCS"
                  ? "bg-white text-[#1b4332] shadow-md"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Browse Public Document Archive
            </button>
            <button
              onClick={() => setActiveTab("RTI_ASSISTANT")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === "RTI_ASSISTANT"
                  ? "bg-amber-400 text-gray-950 shadow-md"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>RTI Application Assistant</span>
            </button>
            <a
              href="/documents/Save_Ranchi_Trees_Official_Evidence_Dossier.md"
              download="Save_Ranchi_Trees_Official_Evidence_Dossier.md"
              className="px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 bg-emerald-400 hover:bg-emerald-300 text-gray-950 shadow-md font-sans"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Evidence Dossier (.MD)</span>
            </a>
          </div>
        </div>
      </div>

      {activeTab === "DOCS" ? (
        <div className="space-y-6">
          {/* Featured Official Evidence Dossier Showcase */}
          <div className="bg-gradient-to-br from-[#0c2419] to-[#1b4332] text-white p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="bg-amber-400 text-gray-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Shield className="w-3.5 h-3.5" />
                Featured Statutory Record
              </span>
              <span className="text-xs text-emerald-300 font-mono">
                Updated Nov 2026 • Verified Reference Dossier
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Official Statutory Evidence Dossier & Source Verification Manual
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-4xl">
                The authoritative, comprehensive evidence manual detailing <strong>SHAJ Tender ID: 2026_SHAJ_111047_1</strong>, 4 CPCB CAAQMS air monitoring stations, Forest Survey of India (ISFR) canopy records, 16% compensatory survival audits, and 38 at-risk bird species.
              </p>
            </div>

            {/* Evidence Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="bg-black/25 border border-white/10 rounded-2xl p-3">
                <div className="text-[11px] text-gray-400 font-medium">Tender Notice ID</div>
                <div className="text-sm sm:text-base font-black text-amber-300 font-mono truncate">2026_SHAJ_111047_1</div>
              </div>
              <div className="bg-black/25 border border-white/10 rounded-2xl p-3">
                <div className="text-[11px] text-gray-400 font-medium">Trees Cut / Net Deficit</div>
                <div className="text-sm sm:text-base font-black text-red-400 font-mono">34,140 / -20,540</div>
              </div>
              <div className="bg-black/25 border border-white/10 rounded-2xl p-3">
                <div className="text-[11px] text-gray-400 font-medium">Ranchi Annual AQI</div>
                <div className="text-sm sm:text-base font-black text-orange-400 font-mono">196 (Peak 340+)</div>
              </div>
              <div className="bg-black/25 border border-white/10 rounded-2xl p-3">
                <div className="text-[11px] text-gray-400 font-medium">Verified Petition</div>
                <div className="text-sm sm:text-base font-black text-emerald-300 font-mono">750+ Signed</div>
              </div>
            </div>

            {/* Action Buttons & Snapshots */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-emerald-800/60">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/documents/Save_Ranchi_Trees_Official_Evidence_Dossier.md"
                  download="Save_Ranchi_Trees_Official_Evidence_Dossier.md"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-gray-950 flex items-center gap-1.5 shadow-md transition-all font-sans"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Dossier (.MD)</span>
                </a>
                <a
                  href="/documents/Save_Ranchi_Trees_Official_Evidence_Dossier.txt"
                  download="Save_Ranchi_Trees_Official_Evidence_Dossier.txt"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-gray-100 text-gray-900 flex items-center gap-1.5 shadow-md transition-all font-sans"
                >
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>Download Mobile Text (.TXT)</span>
                </a>
              </div>

              {/* Verified Snapshot Cards Links */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-gray-300 text-[11px]">Evidence Cards:</span>
                <a
                  href="/documents/evidence_screens/01_shaj_tender_evidence.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/40 text-[11px] flex items-center gap-1"
                >
                  <span>1. SHAJ Tender</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/documents/evidence_screens/02_cpcb_aqi_evidence.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/40 text-[11px] flex items-center gap-1"
                >
                  <span>2. CPCB AQI</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/documents/evidence_screens/03_fsi_canopy_audit_evidence.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/40 text-[11px] flex items-center gap-1"
                >
                  <span>3. FSI Audit</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/documents/evidence_screens/04_ebird_wildlife_evidence.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/40 text-[11px] flex items-center gap-1"
                >
                  <span>4. eBird Wildlife</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="/documents/evidence_screens/05_citizen_petition_evidence.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/40 text-[11px] flex items-center gap-1"
                >
                  <span>5. Citizen Petition</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search documents by title, authority..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#1b4332] focus:bg-white"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                    selectedCategory === c.id
                      ? "bg-[#1b4332] text-white border-[#1b4332]"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDocForModal(doc)}
                className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4 cursor-pointer group hover:border-emerald-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-gray-500 font-semibold bg-gray-100 px-2.5 py-0.5 rounded">
                      {doc.document_type}
                    </span>
                    {getStatusBadge(doc.verification_status)}
                  </div>

                  <h3 className="font-bold text-base text-gray-900 group-hover:text-emerald-900 transition-colors leading-snug">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {doc.summary}
                  </p>

                  {/* Statutory reference pill if available */}
                  {doc.statutory_ref && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/60 text-[11px] font-mono text-emerald-800">
                      <Shield className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate max-w-[280px] sm:max-w-xs">{doc.statutory_ref}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-medium text-gray-700 block truncate">
                      {doc.issuing_authority}
                    </span>
                    <span className="text-[11px] text-gray-400 block">
                      Date: {doc.publication_date} • {doc.page_count ?? 1} pages
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDocForModal(doc);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Record</span>
                    </button>

                    {doc.source_url && doc.source_url.startsWith("http") && (
                      <a
                        href={doc.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors"
                        title={getPortalTooltip(doc.source_url)}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {doc.source_url && (doc.source_url.endsWith(".md") || doc.source_url.endsWith(".txt")) && (
                      <a
                        href={doc.source_url}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs transition-colors border border-amber-200"
                        title="Download Dossier"
                      >
                        <Download className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* RTI Assistant Section */
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="border-b pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Legal Transparency Tool
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-2">
              Right to Information (RTI) Application Assistant
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Draft a legally rigorous request for public records under the RTI Act, 2005.
              Distinguishes between requests for existing records and policy feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Options Form */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Target Public Authority
                </label>
                <select
                  value={targetAuthority}
                  onChange={(e) => setTargetAuthority(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#1b4332]"
                >
                  <option value="SHAJ">
                    State Highways Authority of Jharkhand (Road Planning & Alignment)
                  </option>
                  <option value="DFO">
                    Divisional Forest Officer, Ranchi (Tree Census & Felling Permits)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Applicant Name (Indian Citizen)
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#1b4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Postal Address for Reply
                </label>
                <input
                  type="text"
                  value={applicantAddress}
                  onChange={(e) => setApplicantAddress(e.target.value)}
                  placeholder="e.g. Sector 2, Dhurwa, Ranchi - 834004"
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#1b4332]"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-gray-700 mb-2">
                  Select Specific Records Requested:
                </span>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {availableRtiQuestions.map((q) => (
                    <label
                      key={q}
                      onClick={() => toggleRtiQuery(q)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        selectedInquiries.includes(q)
                          ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedInquiries.includes(q)}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-500"
                      />
                      <span className="leading-tight">{q}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Generated RTI Preview */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Formatted Legal RTI Draft
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyRti}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedDraft ? "Copied!" : "Copy Draft"}</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-semibold transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Form A</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-gray-50 border border-gray-300 rounded-2xl text-[11px] font-mono text-gray-800 whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto shadow-inner">
                {generateRtiText()}
              </pre>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <strong>Submission instructions:</strong> Attach a ₹10 Court Fee Stamp or
                IPO made payable to &quot;Public Information Officer, SHAJ&quot; and submit via
                Registered Post or at the designated department receipt counter in Ranchi.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Document Details & Evidence Modal */}
      {selectedDocForModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedDocForModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur z-10">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-gray-600 font-bold bg-gray-100 px-2.5 py-0.5 rounded">
                    {selectedDocForModal.document_type}
                  </span>
                  {getStatusBadge(selectedDocForModal.verification_status)}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                  {selectedDocForModal.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedDocForModal(null)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors shrink-0"
                title="Close Record"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Metadata Chips Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
                <div>
                  <div className="text-gray-500 font-medium">Issuing Authority</div>
                  <div className="font-bold text-gray-900 mt-0.5">{selectedDocForModal.issuing_authority}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium">Publication Date & Pages</div>
                  <div className="font-bold text-gray-900 mt-0.5">
                    {selectedDocForModal.publication_date} • {selectedDocForModal.page_count ?? 1} pages
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium">Statutory Reference</div>
                  <div className="font-mono font-bold text-emerald-800 truncate mt-0.5" title={selectedDocForModal.statutory_ref || "Official Record"}>
                    {selectedDocForModal.statutory_ref || "Official Record"}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Official Record Summary</h4>
                <p className="text-sm text-gray-700 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                  {selectedDocForModal.summary}
                </p>
              </div>

              {/* Key Findings */}
              {selectedDocForModal.key_findings && selectedDocForModal.key_findings.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Key Statutory Findings & Provisions</h4>
                  <div className="space-y-2">
                    {selectedDocForModal.key_findings.map((finding, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 bg-gray-50/70 p-2.5 rounded-xl border border-gray-100 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence Card Preview (if exists) */}
              {selectedDocForModal.evidence_image && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Verified Evidence Snapshot</h4>
                    <a
                      href={selectedDocForModal.evidence_image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 hover:underline"
                    >
                      <span>Open High-Resolution Card</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-950 flex items-center justify-center p-2">
                    <img
                      src={selectedDocForModal.evidence_image}
                      alt={selectedDocForModal.title}
                      className="max-h-80 w-auto rounded-xl object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 rounded-b-3xl">
              <div className="flex flex-wrap items-center gap-2">
                {selectedDocForModal.source_url && selectedDocForModal.source_url.startsWith("http") && (
                  <a
                    href={selectedDocForModal.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{getPortalButtonLabel(selectedDocForModal.source_url)}</span>
                  </a>
                )}

                {selectedDocForModal.document_type === "RTI_REPLY" && (
                  <button
                    onClick={() => {
                      setSelectedDocForModal(null);
                      setActiveTab("RTI_ASSISTANT");
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Draft in RTI Assistant</span>
                  </button>
                )}

                {selectedDocForModal.source_url && (selectedDocForModal.source_url.endsWith(".md") || selectedDocForModal.source_url.endsWith(".txt")) && (
                  <a
                    href={selectedDocForModal.source_url}
                    download
                    className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Dossier</span>
                  </a>
                )}

                {selectedDocForModal.evidence_image && (
                  <a
                    href={selectedDocForModal.evidence_image}
                    download
                    className="px-4 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center gap-1.5 border border-emerald-300 transition-colors"
                  >
                    <Download className="w-4 h-4 text-emerald-700" />
                    <span>Download Evidence Image</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const text = `${selectedDocForModal.title} (${selectedDocForModal.issuing_authority}, ${selectedDocForModal.publication_date}). Ref: ${selectedDocForModal.statutory_ref || selectedDocForModal.id}`;
                    navigator.clipboard.writeText(text);
                    setCopiedRef(true);
                    setTimeout(() => setCopiedRef(false), 2000);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedRef ? "Citation Copied!" : "Copy Citation"}</span>
                </button>
                <button
                  onClick={() => setSelectedDocForModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
