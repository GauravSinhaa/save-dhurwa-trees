"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";
import {
  FileCheck,
  CheckCircle2,
  Users,
  Shield,
  ShieldCheck,
  Download,
  AlertCircle,
  Clock,
  Heart,
  Share2,
  MapPin,
} from "lucide-react";

interface Supporter {
  id: string;
  display_name: string;
  locality: string;
  submitted_at: string;
}

export default function PublicPetitionPage() {
  const { language } = useLanguage();

  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [locality, setLocality] = useState("Dhurwa, Sector 3");
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [signedSuccess, setSignedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const localities = [
    "Dhurwa, Sector 2",
    "Dhurwa, Sector 3",
    "HEC Township",
    "Jagannathpur",
    "Naya Sarai",
    "Doranda",
    "Harmu",
    "Morabadi",
    "Bariatu",
    "Kanke Road",
    "Ranchi Central",
    "Other Ranchi Locality",
  ];

  const fetchSupporters = async () => {
    try {
      const res = await fetch("/api/petition");
      const json = await res.json();
      if (json.success) {
        setSupporters(json.supporters || []);
        setTotalCount(json.total_signatures || 0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSupporters();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!consent) {
      setErrorMessage("Please accept the consent checkbox to support the petition.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/petition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          display_name: name,
          email,
          locality,
          consent_given: consent,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSignedSuccess(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#1b4332", "#2d6a4f", "#d97706", "#52b788"],
        });
        fetchSupporters();
      } else {
        setErrorMessage(json.error || "Submission failed.");
      }
    } catch (err) {
      setErrorMessage("Network error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleExportPetitionPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Petition Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
          Democratic Civic Representation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b4332] tracking-tight">
          Save Dhurwa&apos;s Trees. Choose Smarter Development.
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          A constructive citizen representation addressed to the Government of Jharkhand
          and the State Highways Authority of Jharkhand (SHAJ).
        </p>
      </div>

      {/* Featured Live Change.org Petition Hero Banner (750+ Signatures) */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-gray-950 p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-amber-400 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-950/20 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-wider text-gray-900 bg-amber-200/80 px-3 py-1 rounded-full border border-amber-800/30">
              Active Official Change.org Campaign
            </span>
          </div>
          <div className="inline-flex items-center gap-2 bg-gray-950 text-white px-4 py-1.5 rounded-full text-xs font-mono font-bold shadow-md self-start sm:self-auto">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>750+ Citizens Have Signed</span>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-gray-950 leading-snug">
            &quot;Ranchi needs your support! Around 7,000 trees in the HEC–Dhurwa area are potentially at risk due to the proposed road development.&quot;
          </h2>
          <p className="text-xs sm:text-sm text-gray-900 leading-relaxed font-medium">
            Please take a moment to sign this petition and share it with others. Together, we can raise our voices for sustainable development and protect Ranchi&apos;s green heritage, biodiversity, and natural environment. Every signature matters. Please support this cause. 💚
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href="https://c.org/sTJg4xx2Vz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gray-950 hover:bg-gray-900 text-amber-400 font-extrabold text-sm transition-all shadow-xl hover:shadow-2xl hover:scale-105 border border-amber-400/50"
          >
            <span>✍️ Sign the Official Petition on Change.org</span>
            <span className="text-xs bg-amber-400 text-gray-950 px-2 py-0.5 rounded-full font-black">750+ Signed</span>
          </a>

          <a
            href="https://api.whatsapp.com/send?text=Ranchi%20needs%20your%20support!%20Around%207%2C000%20trees%20in%20the%20HEC%E2%80%93Dhurwa%20area%20are%20potentially%20at%20risk%20due%20to%20the%20proposed%20road%20development.%20%0A%0A%E2%9C%8D%EF%B8%8F%20Sign%20the%20petition%20(750%2B%20signed)%3A%20https%3A%2F%2Fc.org%2FsTJg4xx2Vz%20%0A%0ATogether%2C%20we%20can%20raise%20our%20voices%20for%20sustainable%20development%20and%20protect%20Ranchi%27s%20green%20heritage%2C%20biodiversity%20and%20natural%20environment.%20Every%20signature%20matters.%20Please%20support%20this%20cause.%20%F0%9F%92%9A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/30 hover:bg-white/40 text-gray-950 font-bold text-xs backdrop-blur-md transition-all border border-gray-950/20 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Petition on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Petition Text Card */}
      <div className="bg-white rounded-3xl border border-[#e2dfd4] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <span>Formal Civic Petition Text</span>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full font-mono font-bold">
            Public Document
          </span>
        </div>

        <div className="text-sm text-gray-800 leading-relaxed space-y-4 font-serif">
          <p className="font-semibold text-[#1b4332] text-base leading-snug">
            &quot;We support modern infrastructure, safer commutes, and orderly connectivity for Ranchi. As citizens and taxpayers whose public funds fund this reported ₹177 crore project, access to complete project documents and transparency is our statutory and democratic right.
          </p>
          <p>
            Under Section 4 of the Right to Information Act, 2005 and established principles of environmental governance, all public infrastructure projects affecting community assets must proactively disclose their detailed plans to the public domain.
          </p>
          <div className="my-3 p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 font-sans text-xs space-y-2 text-emerald-950 not-italic">
            <p className="font-bold text-emerald-900 uppercase tracking-wider text-[11px]">
              Our Specific Civic Demands:
            </p>
            <ol className="list-decimal pl-4 space-y-1.5 font-medium">
              <li>
                <strong>Proactive Publication of the DPR:</strong> Make the Detailed Project Report (DPR Volume 2: Environmental &amp; Social Impact) publicly accessible on the SHAJ / RCD portal.
              </li>
              <li>
                <strong>Full Tree Enumeration Register:</strong> Disclose the official joint tree census showing the exact species, girth, health, and GPS chainage of all ~7,000 potentially affected trees.
              </li>
              <li>
                <strong>Geometric Alignment Drawings (CAD/GIS):</strong> Release the exact Right-of-Way (ROW) cross-section drawings so independent engineers and arborists can verify alignment widths.
              </li>
              <li>
                <strong>Adoption of Smart Green Alternatives:</strong> Incorporate mature canopy trees into divided carriageway central/lateral green medians rather than clearing the 50m–60m corridor flat.
              </li>
            </ol>
          </div>
          <p className="font-semibold text-gray-900">
            Before irreversible chainsaws proceed, we ask the Government of Jharkhand and the State Highways Authority of Jharkhand (SHAJ) to uphold citizen transparency, publish these foundational records, and engage in open technical dialogue.&quot;
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-700" />
            <span>Lawful, constructive, and peaceful civic engagement</span>
          </div>
          <button
            onClick={handleExportPetitionPDF}
            className="inline-flex items-center gap-1.5 text-xs text-emerald-800 hover:underline font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Petition Statement for Submission</span>
          </button>
        </div>
      </div>

      {/* Non-Protest Legal Representation Banner */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-300 p-4 text-xs text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-[#1b4332]">
            Democratic &amp; Lawful Representation — Not an Agitation or Protest
          </p>
          <p className="text-gray-700 leading-relaxed">
            This representation is a lawful, democratic, and respectful communication addressed to the competent state authorities under constitutional rights to petition and participate in transparent environmental governance. It is not an unlawful assembly, dharna, road blockage, or disruptive agitation.
          </p>
        </div>
      </div>

      {/* Petition Sign Form & Live Counter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Sign Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b pb-3">
            <h2 className="text-lg font-bold text-gray-900">
              Add Your Voice to the Public Representation
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Email addresses are verified and kept strictly private; only your name and
              locality appear on public supporter tallies.
            </p>
          </div>

          {signedSuccess ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base text-emerald-950">
                Thank You for Supporting Ranchi&apos;s Green Heritage!
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                Your support has been officially recorded in the civic registry. You can
                share this initiative with neighbors, family, and colleagues in Dhurwa and
                Ranchi.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <a
                  href="https://api.whatsapp.com/send?text=I%20just%20supported%20the%20civic%20initiative%20to%20save%20Dhurwa%27s%20trees%20and%20advocate%20for%20smarter%20road%20development%20in%20Ranchi.%20Read%20and%20sign%20here%3A%20https%3A%2F%2Fsavedhurwatrees.org%2Fpetition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-sm inline-flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-900 border border-red-200 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name / Preferred Display Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anjali Sharma"
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#1b4332] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address * (Confidential - never displayed)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#1b4332] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Neighborhood / Locality *
                </label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#1b4332] focus:bg-white"
                >
                  {localities.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span className="leading-relaxed">
                    I endorse the petition statement above and authorize the inclusion of
                    my name and locality in the collective civic representation to the
                    Government of Jharkhand.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <FileCheck className="w-4 h-4 text-gray-950" />
                <span>
                  {submitting ? "Recording Support..." : "Sign Citizen Petition"}
                </span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Live Supporter Counter & Feed */}
        <div className="lg:col-span-5 space-y-6">
          {/* Counter card */}
          <div className="bg-[#1b4332] text-white p-6 rounded-3xl shadow-md border border-[#2d6a4f]/50 space-y-4">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">
                Total Collective Supporters
              </span>
              <div className="text-4xl font-extrabold font-mono mt-1 text-white flex items-baseline gap-2">
                <span>{(750 + totalCount).toLocaleString()}</span>
                <span className="text-xs text-amber-300 font-sans font-bold">Signatures &amp; Rising</span>
              </div>
              <p className="text-xs text-emerald-100/80 mt-2">
                Including <strong>750+ verified signers on Change.org</strong> plus on-site civic declarations.
              </p>
            </div>

            <a
              href="https://c.org/sTJg4xx2Vz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>View &amp; Sign on Change.org</span>
              <span>↗</span>
            </a>
          </div>

          {/* Recent Supporters List */}
          <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Recent Public Supporters</span>
            </h3>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {supporters.length === 0 ? (
                <div className="text-center py-8 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Heart className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-gray-800">
                    Be the First Verified Signatory
                  </p>
                  <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs mx-auto">
                    Fill out the form on the left to inaugurate this lawful citizen petition for Ranchi&apos;s green canopy!
                  </p>
                </div>
              ) : (
                supporters.map((s) => (
                  <div
                    key={s.id}
                    className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-gray-800 block">
                        {s.display_name}
                      </span>
                      <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-700" />
                        {s.locality}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {s.submitted_at.split("T")[0]}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
