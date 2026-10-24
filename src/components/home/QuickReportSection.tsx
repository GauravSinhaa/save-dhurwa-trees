"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Camera,
  MapPin,
  Compass,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  Send,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Trees,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const QuickReportSection: React.FC = () => {
  const { language } = useLanguage();

  const [photoPreview, setPhotoPreview] = useState<string>("/images/field_survey.jpg");
  const [selectedSpecies, setSelectedSpecies] = useState<string>("OTHER_UNKNOWN");
  const [customSpeciesName, setCustomSpeciesName] = useState<string>("");
  const [locality, setLocality] = useState<string>(
    "Dhurwa 10-Lane Corridor (Near Vivekananda School More)"
  );
  const [latitude, setLatitude] = useState<number>(23.3218);
  const [longitude, setLongitude] = useState<number>(85.2965);
  const [reporterName, setReporterName] = useState<string>("");
  const [reporterEmail, setReporterEmail] = useState<string>("");
  const [quickNote, setQuickNote] = useState<string>("");
  const [locating, setLocating] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittedReport, setSubmittedReport] = useState<{
    id: string;
    message: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Corridor Landmark shortcuts along 6.089 km Dhurwa 10-lane road
  const dhurwaLandmarks = [
    {
      name: "Vivekananda School More (Corridor Start)",
      lat: 23.3284,
      lng: 85.3021,
    },
    {
      name: "HEC Sector 2 / Jagannathpur Area",
      lat: 23.3218,
      lng: 85.2965,
    },
    {
      name: "HEC Administrative Roundabout",
      lat: 23.3155,
      lng: 85.2891,
    },
    {
      name: "Dhurwa Dam Access Link Road",
      lat: 23.3082,
      lng: 85.2804,
    },
    {
      name: "Naya Sarai Road Section",
      lat: 23.2995,
      lng: 85.2685,
    },
    {
      name: "Ranchi Ring Road Junction (Corridor End)",
      lat: 23.2912,
      lng: 85.2574,
    },
  ];

  const speciesOptions = [
    {
      id: "OTHER_UNKNOWN",
      label: "🌿 Other / Don't Know (Botanists will identify)",
      scientific: "Unidentified - Pending Volunteer Botanist Review",
      isDefault: true,
    },
    { id: "SAL", label: "Sal / Sakhuwa", scientific: "Shorea robusta" },
    { id: "BANYAN", label: "Banyan / Bargad", scientific: "Ficus benghalensis" },
    { id: "PEEPAL", label: "Peepal", scientific: "Ficus religiosa" },
    { id: "NEEM", label: "Neem", scientific: "Azadirachta indica" },
    { id: "KARANJ", label: "Karanj", scientific: "Millettia pinnata" },
    { id: "MAHUA", label: "Mahua", scientific: "Madhuca longifolia" },
  ];

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(Number(pos.coords.latitude.toFixed(6)));
        setLongitude(Number(pos.coords.longitude.toFixed(6)));
        setLocating(false);
      },
      (err) => {
        alert(`Location permission denied: ${err.message}. Please select a Dhurwa landmark below.`);
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

    if (file.size > 6 * 1024 * 1024) {
      alert("Image file size exceeds 6MB limit.");
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
    setErrorMessage(null);
    setSubmitting(true);

    const activeOption = speciesOptions.find((s) => s.id === selectedSpecies);
    let commonName = "Other / Unknown Tree (Needs Botanist ID)";
    let scientificName = "Unidentified - Species to be verified from photo";

    if (selectedSpecies === "OTHER_UNKNOWN") {
      if (customSpeciesName.trim()) {
        commonName = `Other: ${customSpeciesName.trim()} (Community Report)`;
      } else {
        commonName = "Other / Unknown Tree (Dhurwa Corridor)";
      }
    } else if (activeOption) {
      commonName = activeOption.label;
      scientificName = activeOption.scientific;
    }

    const payload = {
      reporter_name: reporterName.trim() || "Concerned Dhurwa Resident",
      reporter_email: reporterEmail.trim() || undefined,
      city: "Ranchi",
      date: new Date().toISOString().split("T")[0],
      locality: locality,
      latitude: latitude,
      longitude: longitude,
      species_common_name: commonName,
      species_scientific_name: scientificName,
      estimated_height_m: 12,
      trunk_circumference_cm: 140,
      health_status: "GOOD",
      construction_nearby: true,
      description: quickNote.trim()
        ? `[Dhurwa 10-Lane Quick Report]: ${quickNote.trim()}`
        : "Field tree recorded on Dhurwa 10-lane road corridor. Photo and GPS coordinates provided for arborist species verification.",
      photo_url: photoPreview,
      consent_publish: true,
    };

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setSubmittedReport({
          id: json.data?.id || "REP-NEW",
          message:
            "Your tree photo and GPS location along Dhurwa 10-lane road have been successfully recorded! Our botanical team will identify the species and include it on the live map.",
        });
      } else {
        setErrorMessage(json.error || "Failed to submit observation. Please check inputs.");
      }
    } catch {
      setErrorMessage("Network error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#f4f1ea] via-white to-[#edf2ee] rounded-3xl p-6 sm:p-10 border border-[#d8d2c4] shadow-lg space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#e2dfd4] pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Dhurwa 10-Lane Road Corridor Survey</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] tracking-tight leading-tight">
            Spot a Tree on the Dhurwa Corridor? Upload Photo &amp; Location
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            <strong>Don&apos;t know the tree species? That is completely fine!</strong> You
            don&apos;t need botanical knowledge. Just select <em>&ldquo;Other / Don&apos;t
            Know&rdquo;</em>, snap a photograph with your phone, and tag your location. Our
            volunteer arborists will identify the tree and add it to Ranchi&apos;s public census.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
          <Link
            href="/map"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-emerald-900 border border-emerald-300 font-semibold text-xs shadow-sm transition-colors"
          >
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>Explore Tree Map</span>
          </Link>
          <Link
            href="/report"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-semibold text-xs shadow-sm transition-colors"
          >
            <span>Full Field Survey Form</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {submittedReport ? (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-emerald-950">
              Observation Submitted Successfully!
            </h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              {submittedReport.message}
            </p>
            <div className="pt-2">
              <span className="inline-block bg-white px-3 py-1.5 rounded-lg border border-emerald-300 text-xs font-mono font-bold text-emerald-800">
                Reference ID: {submittedReport.id}
              </span>
            </div>
          </div>
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSubmittedReport(null);
                setQuickNote("");
                setReporterName("");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#1b4332] text-white text-xs font-semibold hover:bg-[#2d6a4f] transition-colors"
            >
              Submit Another Tree
            </button>
            <Link
              href="/map"
              className="px-5 py-2.5 rounded-xl bg-white text-emerald-900 border border-emerald-300 text-xs font-semibold hover:bg-emerald-50 transition-colors"
            >
              View Public Map
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 text-red-950 border border-red-300 text-xs flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Photo Upload & Camera */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-700" />
                  <span>1. Tree Photo *</span>
                </label>
                <span className="text-[11px] text-gray-500">From phone camera or gallery</span>
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center p-3 group hover:border-emerald-500 transition-colors">
                {photoPreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={photoPreview}
                      alt="Tree preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg p-2 text-white text-[11px] flex items-center justify-between">
                      <span>Photo ready for arborist review</span>
                      <span className="text-emerald-300 font-semibold">Loaded</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-2 p-4">
                    <UploadCloud className="w-10 h-10 text-emerald-700 mx-auto" />
                    <p className="text-xs font-semibold text-gray-700">
                      Tap to upload or take a photo
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Clear shot of trunk, branches, or leaves
                    </p>
                  </div>
                )}
              </div>

              <div>
                <input
                  type="file"
                  id="homepage-tree-photo"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoUpload}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-800 hover:file:bg-emerald-100 cursor-pointer"
                />
              </div>
            </div>

            {/* Right: Species & Location along Dhurwa Road */}
            <div className="lg:col-span-7 space-y-5">
              {/* Species Selection */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <Trees className="w-4 h-4 text-emerald-700" />
                    <span>2. Tree Species (Choose or select &lsquo;Other&rsquo;) *</span>
                  </label>
                  <span className="text-[11px] text-amber-800 font-semibold flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>No botany expertise required</span>
                  </span>
                </div>

                {/* Primary Option: Other / Don't Know */}
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSpecies("OTHER_UNKNOWN")}
                    className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
                      selectedSpecies === "OTHER_UNKNOWN"
                        ? "bg-amber-50/90 border-amber-400 ring-2 ring-amber-400/40 text-amber-950 shadow-sm"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">
                          🌿 Other / I Don&apos;t Know the Tree Species
                        </span>
                        <span className="bg-amber-400 text-gray-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          RECOMMENDED FOR CITIZENS
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600">
                        Our botanical volunteers will identify the tree directly from your uploaded photograph.
                      </p>
                    </div>
                    <span className="w-4 h-4 rounded-full border border-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                      {selectedSpecies === "OTHER_UNKNOWN" && (
                        <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                      )}
                    </span>
                  </button>

                  {selectedSpecies === "OTHER_UNKNOWN" && (
                    <div className="px-1 pt-1">
                      <input
                        type="text"
                        value={customSpeciesName}
                        onChange={(e) => setCustomSpeciesName(e.target.value)}
                        placeholder="Optional: Any visible clues? (e.g. 'Has yellow flowers', 'Thorny trunk', 'Fruit on branches')..."
                        className="w-full p-2.5 bg-white rounded-xl border border-amber-300 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Quick Native Species Pills if they do know */}
                <div>
                  <span className="block text-[11px] text-gray-500 mb-1.5">
                    Or select if you recognize the tree:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {speciesOptions
                      .filter((s) => s.id !== "OTHER_UNKNOWN")
                      .map((opt) => (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setSelectedSpecies(opt.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                            selectedSpecies === opt.id
                              ? "bg-[#1b4332] text-white border-[#1b4332]"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Location on Dhurwa 10-Lane Corridor */}
              <div className="space-y-2.5 pt-1 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <span>3. Location on Dhurwa 10-Lane Road *</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={locating}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold hover:bg-emerald-200 transition-colors border border-emerald-300"
                  >
                    <Compass className={`w-3.5 h-3.5 ${locating ? "animate-spin" : ""}`} />
                    <span>{locating ? "Reading GPS..." : "Auto-Detect My GPS"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Corridor Landmark / Section *
                    </label>
                    <select
                      value={locality}
                      onChange={(e) => {
                        setLocality(e.target.value);
                        const lm = dhurwaLandmarks.find((l) => l.name === e.target.value);
                        if (lm) {
                          setLatitude(lm.lat);
                          setLongitude(lm.lng);
                        }
                      }}
                      className="w-full p-2.5 bg-white rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    >
                      {dhurwaLandmarks.map((lm) => (
                        <option key={lm.name} value={lm.name}>
                          {lm.name}
                        </option>
                      ))}
                      <option value="Other Location along Dhurwa 10-Lane Corridor">
                        Other Location along Dhurwa 10-Lane Corridor
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        Latitude (°N)
                      </label>
                      <input
                        type="number"
                        step="0.000001"
                        value={latitude}
                        onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
                        className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        Longitude (°E)
                      </label>
                      <input
                        type="number"
                        step="0.000001"
                        value={longitude}
                        onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
                        className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Reporter Info & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-gray-200">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Your Name / Display Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="e.g. Ramesh (Dhurwa Resident) or leave blank"
                    className="w-full p-2.5 bg-white rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Quick Observation Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={quickNote}
                    onChange={(e) => setQuickNote(e.target.value)}
                    placeholder="e.g. Tree has yellow painted mark; near tea stall..."
                    className="w-full p-2.5 bg-white rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Fast Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-emerald-300" />
                  <span>
                    {submitting
                      ? "Uploading Dhurwa Tree Observation..."
                      : "Submit Tree Observation for Verification"}
                  </span>
                </button>
                <p className="text-[11px] text-gray-500 text-center mt-2">
                  All submissions are verified by civic arborists prior to public map integration. Email is never published.
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};
