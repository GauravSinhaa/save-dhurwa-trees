"use client";

import React, { useState, useEffect } from "react";
import { ProjectDocument, DocumentCategory } from "@/lib/types";
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
} from "lucide-react";

export default function DocumentsTransparencyPage() {
  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
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

  useEffect(() => {
    async function loadDocs() {
      try {
        const res = await fetch("/api/documents");
        const json = await res.json();
        if (json.success && json.data) setDocuments(json.data);
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

          {/* Tab switcher */}
          <div className="pt-2 flex gap-2">
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
          </div>
        </div>
      </div>

      {activeTab === "DOCS" ? (
        <div className="space-y-6">
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
                className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-gray-500 font-semibold bg-gray-100 px-2.5 py-0.5 rounded">
                      {doc.document_type}
                    </span>
                    {getStatusBadge(doc.verification_status)}
                  </div>

                  <h3 className="font-bold text-base text-gray-900 leading-snug">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {doc.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <div className="space-y-0.5">
                    <span className="font-medium text-gray-700 block">
                      {doc.issuing_authority}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Date: {doc.publication_date} • {doc.page_count ?? 1} pages
                    </span>
                  </div>

                  <a
                    href={doc.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition-colors border border-emerald-200"
                  >
                    <span>View Record</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
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
    </div>
  );
}
