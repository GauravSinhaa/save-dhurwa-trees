"use client";

import React from "react";
import {
  Trees,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Heart,
  FileText,
  Mail,
  HelpCircle,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Civic Charter & Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b4332] tracking-tight">
          About Save Dhurwa Trees
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          &quot;Development Without Destruction.&quot; A digital platform dedicated to
          preserving Ranchi&apos;s mature urban green canopy through evidence, engineering,
          and democratic dialogue.
        </p>
      </div>

      {/* Core Principles */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
          <Scale className="w-5 h-5 text-emerald-700" />
          <span>Our Founding Principles</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-700 leading-relaxed">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. Evidence-Based & Factual</span>
            </h3>
            <p>
              We distinguish strictly between official verified survey records, media
              reports, and unverified estimates. We never invent tree coordinates,
              permissions, or impact figures.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>2. Constructive & Pro-Mobility</span>
            </h3>
            <p>
              We support better roads, safer commutes, and infrastructure progress in
              Ranchi. Our goal is to achieve modern mobility through smarter geometric
              design rather than indiscriminate deforestation.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3. Lawful & Nonpartisan</span>
            </h3>
            <p>
              The platform is entirely independent of political affiliations, commercial
              interests, or partisan groups. We advocate lawfully through Right to
              Information, public consultations, and peaceful representations.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>4. Open Civic Data</span>
            </h3>
            <p>
              All aggregated mapping data, species distributions, and documents are made
              freely available to citizens, researchers, urban planners, and government
              agencies.
            </p>
          </div>
        </div>
      </div>

      {/* Grassroots Catalysts & Citizen Acknowledgments */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-4 shadow-sm text-xs text-gray-700">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
          <Heart className="w-5 h-5 text-pink-600" />
          <span>Grassroots Catalysts: @hamari.ranchi & @highpurpos</span>
        </div>
        <p className="leading-relaxed">
          Special civic recognition is extended to the youth and environmental initiatives{" "}
          <strong>@hamari.ranchi</strong> and <strong>@highpurpos</strong> on Instagram. Their
          early mobilization, on-ground peaceful gatherings at Vivekanand Chowk / Shaheed
          Maidan, protective sacred thread-tying drives, and continuous community videos
          brought vital public attention to the Dhurwa road corridor&apos;s mature tree loss.
          This platform exists as an open, evidence-based technical tool to support and
          amplify their lawful public advocacy.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href="https://www.instagram.com/hamari.ranchi?cplk=MWJqbGRsazc1a2RzbQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-50 text-pink-800 border border-pink-200 font-semibold"
          >
            <span>Follow @hamari.ranchi on Instagram</span>
          </a>
          <a
            href="https://www.instagram.com/highpurpos?mdxt=cXY5eGZmN21zMWNx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold"
          >
            <span>Follow @highpurpos on Instagram</span>
          </a>
        </div>
      </div>

      {/* Disclaimers & Independent Nature */}
      <div className="bg-[#fcfbf7] rounded-3xl border border-amber-300 p-6 sm:p-8 space-y-4 shadow-sm text-xs text-amber-950">
        <h3 className="text-base font-bold text-amber-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-700" />
          <span>Statutory Disclaimer & Independence</span>
        </h3>
        <p className="leading-relaxed">
          Save Dhurwa Trees is an independent civic and environmental initiative created
          by Ranchi citizens, researchers, and arborists. It is <strong>NOT an official
          government portal</strong> and does not claim affiliation with the State Highways
          Authority of Jharkhand (SHAJ), the Department of Forest, Environment & Climate
          Change, or any municipal body.
        </p>
        <p className="leading-relaxed text-amber-900/90">
          The reported figure of approximately 7,000 potentially affected trees is treated
          as an unverified estimate derived from public representations and media
          coverage until official joint-survey enumeration records are officially
          published.
        </p>
      </div>

      {/* Correction & Fact-Check Request */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-4 shadow-sm text-xs text-gray-700">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-emerald-700" />
          <span>Notice of Corrections & Document Submissions</span>
        </h3>
        <p className="leading-relaxed">
          If you represent a government department, surveying firm, media agency, or
          citizen group and notice any factual discrepancy in a tree record, alignment
          chainage, or document classification, please notify our audit team:
        </p>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 font-mono text-gray-900 font-semibold inline-block">
          contact@savedhurwatrees.org • audit@savedhurwatrees.org
        </div>
        <p className="text-[11px] text-gray-500">
          All corrections are promptly investigated against primary sources and recorded in
          our public audit log.
        </p>
      </div>
    </div>
  );
}
