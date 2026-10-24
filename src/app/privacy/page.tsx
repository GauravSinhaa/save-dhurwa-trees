import React from "react";
import { Shield, Lock, EyeOff, FileCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b pb-4 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Data Governance
        </span>
        <h1 className="text-3xl font-extrabold text-[#1b4332]">Privacy Policy</h1>
        <p className="text-xs text-gray-500">Last updated: April 2026</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6 text-xs text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-900">1. Data Minimisation Principle</h2>
          <p>
            Save Dhurwa Trees operates on the principle of data minimisation. We collect
            only the information strictly necessary for verifying field tree
            observations and recording legitimate civic endorsements for the public
            petition.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-900">
            2. Personal Contact Information Safeguards
          </h2>
          <p>
            Email addresses and private phone numbers submitted via the tree reporting form
            or petition form are <strong>never published publicly</strong>, shared with
            commercial entities, or made accessible via open API endpoints. All petition
            supporters are displayed with consented display names and general localities
            only.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-900">
            3. Geolocation Data Handling
          </h2>
          <p>
            Tree location coordinates (latitude and longitude) are collected solely with
            explicit user consent for documenting the physical location of the tree in
            the corridor. We never track users in the background.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-900">
            4. Data Retention & Deletion Requests
          </h2>
          <p>
            Any contributor or petitioner may request the deletion of their personal
            information or the retraction of a field observation by writing to{" "}
            <code className="text-emerald-800 font-bold">privacy@savedhurwatrees.org</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
