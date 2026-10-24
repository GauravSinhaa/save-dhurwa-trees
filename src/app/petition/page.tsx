"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";
import {
  FileCheck,
  CheckCircle2,
  Users,
  Shield,
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
  const [totalCount, setTotalCount] = useState(5);
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
        setTotalCount(json.total_signatures || 5);
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
          <p className="font-semibold text-[#1b4332] text-base">
            &quot;We support better roads, safer mobility, and improved connectivity in
            Ranchi. We also believe that the city&apos;s established trees are valuable
            public assets.
          </p>
          <p>
            We request the Government of Jharkhand and the relevant road authorities to
            publish the complete tree survey, disclose applicable tree-felling
            permissions, assess alternatives to minimise tree removal, and preserve mature
            trees wherever technically feasible.
          </p>
          <p>
            Before irreversible tree felling proceeds, we ask the authorities to make the
            relevant project documents publicly accessible and provide a reasoned
            response to feasible tree-preservation alternatives.
          </p>
          <p className="font-semibold text-gray-900">
            We support infrastructure planning that balances mobility, environmental
            protection, and the long-term interests of Ranchi&apos;s residents.&quot;
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
          <div className="bg-[#1b4332] text-white p-6 rounded-3xl shadow-md border border-[#2d6a4f]/50">
            <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">
              Total Validated Supporters
            </span>
            <div className="text-4xl font-extrabold font-mono mt-1 text-white">
              {totalCount}
            </div>
            <p className="text-xs text-gray-300 mt-2">
              Citizen signatures verified against duplicate email records.
            </p>
          </div>

          {/* Recent Supporters List */}
          <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Recent Public Supporters</span>
            </h3>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {supporters.map((s) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
