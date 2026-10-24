"use client";

import React, { useState } from "react";
import {
  Users,
  CheckCircle2,
  Share2,
  Copy,
  Trees,
  Compass,
  FileText,
  Camera,
  HeartHandshake,
  Send,
  AlertCircle,
  ExternalLink,
  Download,
  Phone,
  MessageCircle,
} from "lucide-react";
import { GrassrootsSpotlight } from "@/components/community/GrassrootsSpotlight";

export default function GetInvolvedPage() {
  const [formData, setFormData] = useState({
    display_name: "",
    email: "",
    locality: "Dhurwa, Sector 2",
    areas_of_interest: ["Tree Documentation & Photography", "GIS Mapping"],
    skills: "",
    availability: "Weekends / Flexible",
    consent_contact: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const interestOptions = [
    "Tree Documentation & Photography",
    "Botanical Species Verification",
    "GIS Mapping & GeoJSON Processing",
    "RTI Applications & Document Review",
    "Civil Engineering & Traffic Analysis",
    "Lawful Community Outreach",
  ];

  const toggleInterest = (item: string) => {
    if (formData.areas_of_interest.includes(item)) {
      setFormData({
        ...formData,
        areas_of_interest: formData.areas_of_interest.filter((i) => i !== item),
      });
    } else {
      setFormData({
        ...formData,
        areas_of_interest: [...formData.areas_of_interest, item],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setSuccess(true);
      } else {
        alert(json.error || "Submission failed");
      }
    } catch (e) {
      alert("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  const campaignSummary = `🌳 SAVE DHURWA TREES — Development Without Destruction.
The proposed 10-lane road from Vivekananda School More to Ranchi Ring Road via Naya Sarai (6.089 km) could affect an estimated 7,000 mature trees.

🌿 MISSION: Spread the word to protect Ranchi's green heritage.
🔍 NOTE: This is a peaceful, scientific civic research and tree documentation initiative — not a protest.

We advocate for:
1. Publishing the official joint tree census.
2. Preserving mature avenue canopy trees through smarter geometric road design.
3. Constructive dialogue between citizens, arborists, and urban planners.

Know the facts & explore the interactive tree map:
https://savedhurwatrees.org`;

  const handleCopyShare = () => {
    navigator.clipboard.writeText(campaignSummary);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Citizen Action & Collaboration
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b4332] tracking-tight">
          Get Involved with Save Dhurwa Trees
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Whether you are a student, botanist, engineer, lawyer, or concerned Ranchi
          resident, your skills can help build a fact-based public record to protect our
          city&apos;s living green canopy.
        </p>
      </div>

      {/* Volunteer Form & Social Share Kit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Volunteer Registration Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b pb-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-700" />
              <span>Volunteer Registration</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Join working groups in botanical mapping, GIS, RTI research, or community
              dialogue.
            </p>
          </div>

          {success ? (
            <div className="space-y-6">
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-lg text-emerald-950">
                  Welcome to the Initiative!
                </h3>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you for registering. Your details have been recorded in the civic registry.
                </p>
              </div>

              {/* Direct Connect with Coordinators */}
              <div className="bg-gradient-to-br from-white to-emerald-50/60 rounded-2xl border-2 border-emerald-300 p-5 space-y-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">
                      Connect Directly with Coordinators
                    </h4>
                    <p className="text-xs text-gray-600">
                      Reach out now to get added to the volunteer group or coordinate field tasks:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* WhatsApp Helpline Card */}
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Direct WhatsApp
                      </span>
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="font-mono text-sm font-bold text-gray-900">
                      +91 98840 29319
                    </div>
                    <a
                      href="https://wa.me/919884029319?text=Hello%21%20I%20just%20registered%20as%20a%20volunteer%20on%20the%20Save%20Dhurwa%20Trees%20portal%20and%20would%20love%20to%20connect."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  {/* Primary Admin Phone Card */}
                  <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-800 bg-gray-100 px-2 py-0.5 rounded-full">
                        Primary Admin
                      </span>
                      <Phone className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="font-mono text-sm font-bold text-gray-900">
                      +91 76675 97383
                    </div>
                    <div className="flex gap-1.5">
                      <a
                        href="tel:+917667597383"
                        className="flex-1 py-2 px-2 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 text-center"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                      <a
                        href="https://wa.me/917667597383?text=Hello%21%20I%20just%20registered%20as%20a%20volunteer%20on%20Save%20Dhurwa%20Trees%20portal."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-800 text-xs font-bold transition-colors flex items-center justify-center gap-1"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                      </a>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      display_name: "",
                      email: "",
                      locality: "Dhurwa, Sector 2",
                      areas_of_interest: ["Tree Documentation & Photography", "GIS Mapping"],
                      skills: "",
                      availability: "Weekends / Flexible",
                      consent_contact: true,
                    });
                  }}
                  className="text-xs text-emerald-800 font-semibold hover:underline block text-center pt-1"
                >
                  ← Register another volunteer
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.display_name}
                  onChange={(e) =>
                    setFormData({ ...formData, display_name: e.target.value })
                  }
                  placeholder="e.g. Rahul Sen"
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#1b4332] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address * (Confidential)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#1b4332] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Locality / Neighborhood in Ranchi *
                </label>
                <input
                  type="text"
                  required
                  value={formData.locality}
                  onChange={(e) =>
                    setFormData({ ...formData, locality: e.target.value })
                  }
                  placeholder="e.g. HEC Sector 3 / Dhurwa / Doranda"
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#1b4332] focus:bg-white"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-gray-700 mb-2">
                  Areas of Contribution (Select all that apply) *
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {interestOptions.map((opt) => (
                    <label
                      key={opt}
                      onClick={() => toggleInterest(opt)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        formData.areas_of_interest.includes(opt)
                          ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.areas_of_interest.includes(opt)}
                        onChange={() => {}}
                        className="rounded text-emerald-700 focus:ring-emerald-500"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Relevant Background / Experience (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  placeholder="e.g. Botany student, GIS software user, legal researcher, resident arborist..."
                  className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#1b4332] focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.consent_contact}
                    onChange={(e) =>
                      setFormData({ ...formData, consent_contact: e.target.checked })
                    }
                    className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span className="leading-relaxed">
                    I consent to being contacted regarding lawful, peaceful civic
                    activities, census geotagging drives, and community representations.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-emerald-300" />
                <span>
                  {submitting ? "Registering..." : "Register as Volunteer"}
                </span>
              </button>

              {/* Instant Direct Connect Bar */}
              <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-600 bg-gray-50 p-3 rounded-xl">
                <span className="font-medium text-gray-700">
                  Prefer connecting immediately?
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/919884029319?text=Hello%21%20I%20would%20like%20to%20connect%20with%20Save%20Dhurwa%20Trees%20volunteer%20team."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp: 98840 29319</span>
                  </a>
                  <span className="text-gray-300 hidden sm:inline">•</span>
                  <a
                    href="tel:+917667597383"
                    className="inline-flex items-center gap-1 font-semibold text-gray-800 hover:text-black"
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-600" />
                    <span>Admin: 76675 97383</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Right: Social Campaign Kit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1b4332] text-white p-6 rounded-3xl shadow-md space-y-4">
            <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
              Share the Campaign
            </span>
            <h3 className="text-xl font-bold">Factual Message for WhatsApp & Socials</h3>
            <p className="text-xs text-gray-200 leading-relaxed">
              Copy this verified, nonpartisan message to inform friends, WhatsApp groups,
              and resident welfare associations across Ranchi.
            </p>

            <div className="p-3 bg-black/30 rounded-xl border border-[#40916c]/40 text-xs font-mono text-emerald-200 whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto">
              {campaignSummary}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleCopyShare}
                className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-white/20"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-300" />
                <span>{copiedShare ? "Copied to Clipboard!" : "Copy Text"}</span>
              </button>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  campaignSummary
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Social Media Campaign Poster Cards */}
          <div className="space-y-6">
            {/* Poster 1: Corridor Infographic */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                  Poster 1 • Corridor Factsheet
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                  1:1 Square
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/images/social_banner.jpg"
                  alt="Save Dhurwa Trees Official Campaign Poster"
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Project facts, corridor map summary, and constructive green design proposal for Dhurwa road.
              </p>
              <a
                href="/images/social_banner.jpg"
                download="Save_Dhurwa_Trees_Campaign_Banner.jpg"
                className="w-full py-2.5 px-4 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Factsheet Artwork (JPG)</span>
              </a>
            </div>

            {/* Poster 2: Birds & Wildlife Emotional Connect */}
            <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm space-y-4 bg-gradient-to-b from-white to-emerald-50/30">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-amber-800 tracking-wider">
                  Poster 2 • Wildlife &amp; Birds
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                  Emotional Appeal
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                <img
                  src="/images/birds_awareness.jpg"
                  alt="Save Dhurwa Trees Birds and Wildlife Poster"
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Emotional poster highlighting the 40+ native bird species nesting along the 7,000 Dhurwa trees.
              </p>
              <a
                href="/images/birds_awareness.jpg"
                download="Save_Dhurwa_Trees_Birds_Wildlife_Poster.jpg"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Birds Poster (JPG)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Grassroots Partners Spotlight */}
      <div className="pt-8 border-t border-gray-200">
        <GrassrootsSpotlight />
      </div>
    </div>
  );
}
