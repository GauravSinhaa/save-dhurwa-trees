"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Send,
  Camera,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Info,
  Compass,
  UploadCloud,
  FileCheck,
  HelpCircle,
  Eye,
} from "lucide-react";

export default function CitizenTreeReportPage() {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    reporter_name: "",
    reporter_email: "",
    locality: "Vivekananda School More, Dhurwa",
    latitude: 23.3218,
    longitude: 85.2965,
    species_common_name: "Sal / Sakhuwa",
    species_scientific_name: "Shorea robusta",
    estimated_height_m: 14,
    trunk_circumference_cm: 180,
    health_status: "GOOD",
    construction_nearby: false,
    description: "",
    consent_publish: false,
  });

  const [photoPreview, setPhotoPreview] = useState<string>("/images/field_survey.jpg");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [locating, setLocating] = useState(false);
  const [isUnknownSpecies, setIsUnknownSpecies] = useState(false);

  // Native species quick selection
  const commonSpecies = [
    { common: "Other / Don't Know (Needs ID)", scientific: "Unidentified - Pending Botanist Review" },
    { common: "Sal / Sakhuwa", scientific: "Shorea robusta" },
    { common: "Banyan / Bargad", scientific: "Ficus benghalensis" },
    { common: "Peepal", scientific: "Ficus religiosa" },
    { common: "Neem", scientific: "Azadirachta indica" },
    { common: "Karanj", scientific: "Millettia pinnata" },
    { common: "Mahua", scientific: "Madhuca longifolia" },
    { common: "Arjun", scientific: "Terminalia arjuna" },
    { common: "Semal (Silk Cotton)", scientific: "Bombax ceiba" },
    { common: "Gulmohar", scientific: "Delonix regia" },
  ];

  const handleSpeciesSelect = (common: string, scientific: string) => {
    const isOther = common.includes("Other") || common.includes("Don't Know");
    setIsUnknownSpecies(isOther);
    setFormData((prev) => ({
      ...prev,
      species_common_name: common,
      species_scientific_name: scientific,
    }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          latitude: Number(pos.coords.latitude.toFixed(6)),
          longitude: Number(pos.coords.longitude.toFixed(6)),
        }));
        setLocating(false);
      },
      (err) => {
        alert(`Location permission denied or error: ${err.message}`);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image file size exceeds 5MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!formData.consent_publish) {
      setStatusMessage({
        type: "error",
        text: "Please provide consent to publish the tree record for public verification.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          city: "Ranchi",
          date: new Date().toISOString().split("T")[0],
          photo_url: photoPreview,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStatusMessage({
          type: "success",
          text: "Your tree observation has been submitted successfully! It has entered the verification queue and will appear on the public map once reviewed by our arborist team.",
        });
        setFormData({
          reporter_name: "",
          reporter_email: "",
          locality: "Dhurwa Road Corridor",
          latitude: 23.315,
          longitude: 85.28,
          species_common_name: "Sal / Sakhuwa",
          species_scientific_name: "Shorea robusta",
          estimated_height_m: 12,
          trunk_circumference_cm: 150,
          health_status: "GOOD",
          construction_nearby: false,
          description: "",
          consent_publish: false,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: json.error || "Failed to submit observation.",
        });
      }
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: "Network error occurred while submitting.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Citizen Field Science
        </span>
        <h1 className="text-3xl font-extrabold text-[#1b4332] tracking-tight">
          Citizen Tree Reporting
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Help build an accurate, independent public record of Ranchi&apos;s trees. Submit
          photographs, GPS coordinates, and field measurements along the Dhurwa road
          corridor.
        </p>
      </div>

      {/* Guidelines Box */}
      <div className="bg-[#f6f4ee] p-4 sm:p-5 rounded-2xl border border-[#e2dfd4] text-xs text-gray-700 space-y-2">
        <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
          <Info className="w-4 h-4 text-emerald-700" />
          <span>Verification & Privacy Principles</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>
            <strong>Privacy Protected:</strong> Your email is strictly confidential and
            never displayed publicly.
          </li>
          <li>
            <strong>Review Workflow:</strong> Submitted observations are queued in &quot;Pending
            Review&quot; and verified by botanical volunteers prior to public map integration.
          </li>
          <li>
            <strong>Accurate Measurement:</strong> Measure trunk circumference at breast
            height (~1.3 meters above ground level).
          </li>
        </ul>
      </div>

      {/* Submission Feedback */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-start gap-3 border animate-in fade-in duration-200 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-950 border-emerald-300"
              : "bg-red-50 text-red-950 border-red-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{statusMessage.text}</span>
        </div>
      )}

      {/* Main Reporting Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8"
      >
        {/* Section 1: Photographs */}
        <div className="space-y-4 border-b pb-6">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-700" />
            <span>1. Tree Photograph</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="relative h-48 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Tree preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 space-y-1">
                  <UploadCloud className="w-8 h-8 mx-auto" />
                  <span className="text-xs">No photograph selected</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-700">
                Upload Field Photo (Max 5MB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
              />
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Take a clear wide shot showing the full canopy and trunk base, or close-ups
                of leaves and bark.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Geographic Location */}
        <div className="space-y-4 border-b pb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>2. Geographic Location (GPS)</span>
            </h2>
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={locating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors border border-emerald-200"
            >
              <Compass
                className={`w-3.5 h-3.5 ${locating ? "animate-spin" : ""}`}
              />
              <span>{locating ? "Reading GPS..." : "Auto-Detect My GPS"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Locality / Landmark *
              </label>
              <input
                type="text"
                required
                value={formData.locality}
                onChange={(e) =>
                  setFormData({ ...formData, locality: e.target.value })
                }
                placeholder="e.g. Near Dhurwa Dam Link, HEC Sector 2"
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Latitude (°N) *
              </label>
              <input
                type="number"
                step="0.000001"
                required
                value={formData.latitude}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    latitude: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-mono focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Longitude (°E) *
              </label>
              <input
                type="number"
                step="0.000001"
                required
                value={formData.longitude}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    longitude: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-mono focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Species & Tree Dimensions */}
        <div className="space-y-4 border-b pb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-700" />
              <span>3. Tree Species & Measurements</span>
            </h2>
            <span className="text-[11px] text-amber-800 font-medium flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Unsure of species? Select &quot;Other / Don&apos;t Know&quot;</span>
            </span>
          </div>

          {/* Citizen Helper Banner for Unknown Species */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isUnknownSpecies
                ? "bg-amber-50 border-amber-300 ring-2 ring-amber-400/40"
                : "bg-emerald-50/70 border-emerald-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">
                    Don&apos;t know which tree species it is? You can still report it!
                  </h3>
                  <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                    Just tap &ldquo;Other / Don&apos;t Know&rdquo;. As long as you upload a photo and your GPS location along the Dhurwa 10-lane road corridor, our arborist team will verify the species for you.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const next = !isUnknownSpecies;
                  setIsUnknownSpecies(next);
                  if (next) {
                    handleSpeciesSelect(
                      "Other / Don't Know (Needs ID)",
                      "Unidentified - Pending Botanist Review"
                    );
                  } else {
                    handleSpeciesSelect("Sal / Sakhuwa", "Shorea robusta");
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors shrink-0 text-center ${
                  isUnknownSpecies
                    ? "bg-amber-500 text-gray-950 border-amber-500 hover:bg-amber-400 shadow-sm"
                    : "bg-white text-emerald-900 border-emerald-300 hover:bg-emerald-100"
                }`}
              >
                {isUnknownSpecies ? "✓ 'Other / Don't Know' Active" : "I Don't Know The Species"}
              </button>
            </div>
          </div>

          {/* Quick Species Select Pills */}
          <div>
            <span className="block text-[11px] text-gray-500 mb-2">
              Common native species of Ranchi (click to fill, or choose &lsquo;Other&rsquo;):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {commonSpecies.map((s) => {
                const isOther = s.common.includes("Other");
                return (
                  <button
                    type="button"
                    key={s.common}
                    onClick={() => handleSpeciesSelect(s.common, s.scientific)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
                      formData.species_common_name === s.common
                        ? isOther
                          ? "bg-amber-500 text-gray-950 border-amber-500 font-bold shadow-sm"
                          : "bg-[#1b4332] text-white border-[#1b4332]"
                        : isOther
                        ? "bg-amber-100 text-amber-900 border-amber-300 font-semibold hover:bg-amber-200"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {s.common}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Common / Local Name *
              </label>
              <input
                type="text"
                required
                value={formData.species_common_name}
                onChange={(e) =>
                  setFormData({ ...formData, species_common_name: e.target.value })
                }
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Scientific Name (Optional)
              </label>
              <input
                type="text"
                value={formData.species_scientific_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    species_scientific_name: e.target.value,
                  })
                }
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs italic focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Trunk Girth (cm) *
              </label>
              <input
                type="number"
                required
                min="10"
                value={formData.trunk_circumference_cm}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    trunk_circumference_cm: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Approx Height (m) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.estimated_height_m}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimated_height_m: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Visible Health Condition
              </label>
              <select
                value={formData.health_status}
                onChange={(e) =>
                  setFormData({ ...formData, health_status: e.target.value })
                }
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              >
                <option value="EXCELLENT">Excellent (Vibrant foliage, robust trunk)</option>
                <option value="GOOD">Good (Healthy canopy, minor deadwood)</option>
                <option value="FAIR">Fair (Noticeable crown thinning or decay)</option>
                <option value="POOR">Poor (Severe trunk damage or root cutting)</option>
                <option value="CRITICAL">Critical / Dying</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-800">
                <input
                  type="checkbox"
                  checked={formData.construction_nearby}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      construction_nearby: e.target.checked,
                    })
                  }
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span className="font-semibold text-amber-950">
                  Visible road earthworks / construction pegs nearby
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Observation Notes & Reporter Info */}
        <div className="space-y-4 border-b pb-6">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <span>4. Observation Notes & Contributor Details</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Field Observation Details *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe roadside surroundings, bird nesting, nearby shops/schools, or markings on tree trunk..."
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Name / Display Name *
              </label>
              <input
                type="text"
                required
                value={formData.reporter_name}
                onChange={(e) =>
                  setFormData({ ...formData, reporter_name: e.target.value })
                }
                placeholder="e.g. Ramesh Kumar (Resident)"
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Contact Email (Confidential - never published)
              </label>
              <input
                type="email"
                value={formData.reporter_email}
                onChange={(e) =>
                  setFormData({ ...formData, reporter_email: e.target.value })
                }
                placeholder="For survey verification queries only"
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="space-y-3">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-700">
            <input
              type="checkbox"
              required
              checked={formData.consent_publish}
              onChange={(e) =>
                setFormData({ ...formData, consent_publish: e.target.checked })
              }
              className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="leading-relaxed">
              I certify that this observation was recorded in good faith along or near the
              Dhurwa road corridor in Ranchi, and I consent to publishing the tree
              photograph, coordinates, and measurements in the open public environmental
              inventory.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4 text-emerald-300" />
            <span>{submitting ? "Submitting Observation..." : "Submit Tree Record"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
