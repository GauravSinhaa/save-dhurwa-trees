import React from "react";
import { Scale, FileText, CheckCircle2 } from "lucide-react";

export default function TermsOfUsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b pb-4 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Platform Governance
        </span>
        <h1 className="text-3xl font-extrabold text-[#1b4332]">Terms of Use</h1>
        <p className="text-xs text-gray-500">Last updated: April 2026</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6 text-xs text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-900">
            1. Purpose of the Platform
          </h2>
          <p>
            Save Dhurwa Trees is a non-commercial, civic data and environmental
            advocacy platform established to facilitate lawful, peaceful, and
            evidence-based dialogue concerning road infrastructure development and tree
            conservation in Ranchi, Jharkhand.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-900">
            2. Fact-Based Contributions
          </h2>
          <p>
            Users who submit tree observations, photographs, or official documents agree to
            provide accurate, truthful records to the best of their knowledge. Deliberate
            submission of fabricated data, defamatory statements, or commercial spam is
            strictly prohibited and subject to immediate removal.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-900">
            3. Independent Legal Status
          </h2>
          <p>
            This website is an independent initiative and is not an official instrument of
            the State Highways Authority of Jharkhand, the Ranchi Municipal Corporation, or
            any government ministry. Mention of government projects or official filings is
            for informational and public scrutiny purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-900">
            4. Open Data License
          </h2>
          <p>
            Aggregated environmental summaries and public tree coordinates are published
            under Creative Commons Attribution 4.0 International (CC BY 4.0) for civic and
            educational use.
          </p>
        </section>
      </div>
    </div>
  );
}
