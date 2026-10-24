"use client";

import React, { useState } from "react";
import { dhurwaAvianSpecies } from "@/lib/birds";
import { AvianSpecies, NestingType } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import {
  Bird,
  ShieldAlert,
  TreeDeciduous,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Sparkles,
} from "lucide-react";

export const AvianImpactSection: React.FC = () => {
  const { language } = useLanguage();
  const [selectedNesting, setSelectedNesting] = useState<string>("ALL");

  const categories = [
    { id: "ALL", labelEn: "All Avian & Canopy Species (8)", labelHi: "सभी पक्षी व वन्यजीव (8)" },
    {
      id: "TREE_HOLLOW_CAVITY",
      labelEn: "Tree-Hollow & Cavity Nesters",
      labelHi: "खोह व कोटर में घोंसला बनाने वाले (Cavity Nesters)",
    },
    {
      id: "HIGH_CANOPY_FORK",
      labelEn: "High-Canopy Cup & Fork Nesters",
      labelHi: "ऊंची शाखाओं में घोंसला बनाने वाले (Canopy Nesters)",
    },
    {
      id: "COLONIAL_ROOST",
      labelEn: "Colonial Roosts & Keystone Wildlife",
      labelHi: "सामूहिक बसेरा व प्रमुख वन्यजीव (Keystone Fauna)",
    },
  ];

  const filteredSpecies = dhurwaAvianSpecies.filter((s) => {
    if (selectedNesting !== "ALL" && s.nesting_type !== selectedNesting) {
      return false;
    }
    return true;
  });

  const getNestingBadge = (type: NestingType) => {
    switch (type) {
      case "TREE_HOLLOW_CAVITY":
        return (
          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            {language === "hi" ? "कोटर/खोह पर निर्भर" : "Tree-Hollow Obligate"}
          </span>
        );
      case "HIGH_CANOPY_FORK":
        return (
          <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            {language === "hi" ? "ऊंची शाखाओं में घोंसला" : "High Canopy Nester"}
          </span>
        );
      case "COLONIAL_ROOST":
        return (
          <span className="bg-purple-100 text-purple-900 border border-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
            {language === "hi" ? "हेरिटेज बसेरा (Roost)" : "Heritage Roost"}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner with Wildlife Photo */}
      <div className="bg-[#1b4332] text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#2d6a4f]/50 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d6a4f] text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Bird className="w-4 h-4 text-emerald-300" />
            <span>
              {language === "hi"
                ? "कैनोपी जैव विविधता एवं वन्यजीव"
                : "Canopy Fauna & Avian Ecology"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {language === "hi"
              ? "पेड़ केवल लकड़ी नहीं, पक्षियों के घर हैं"
              : "Trees Are Not Just Timber: They Are Living Bird Sanctuaries"}
          </h2>

          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            {language === "hi"
              ? "धुर्वा की सड़क चौड़ीकरण परियोजना केवल हरियाली को नहीं, बल्कि दशकों पुराने पेड़ों में रहने वाली दर्जनों स्थानीय पक्षी प्रजातियों और उनके घोंसलों को भी खतरे में डालती है। भारतीय धनेश (हॉर्नबिल), बसंता, उल्लू और तोते जैसे पक्षी पुराने पेड़ों के प्राकृतिक खोह (cavities) पर निर्भर हैं।"
              : "The proposed road corridor directly cuts through the nesting habitats, feeding territories, and multi-generational roosting sites of native bird and arboreal species that depend on mature Sal, Peepal, Banyan, and Mahua trees along Dhurwa and Jagannathpur."}
          </p>

          <div className="p-3.5 bg-black/30 rounded-2xl border border-emerald-400/30 text-xs text-amber-200 leading-relaxed">
            <strong>
              {language === "hi"
                ? "वैज्ञानिक तथ्य — खोह की कमी (Cavity Deficit):"
                : "The Critical Cavity Deficit:"}
            </strong>{" "}
            {language === "hi"
              ? "सड़क निर्माण के बदले रोपे जाने वाले छोटे पौधे (saplings) कम से कम 40 से 50 वर्षों तक खोह (hollows) नहीं बना सकते। पुराने पेड़ों की कटाई से कोटर में घोंसला बनाने वाले पक्षियों का स्थानीय प्रजनन पूरी तरह नष्ट हो जाता है।"
              : "Compensatory plantation saplings cannot form natural trunk hollows for at least 4 to 5 decades. Felling mature trees causes immediate, irreversible local displacement for cavity-nesting birds."}
          </div>
        </div>

        {/* Generated Authentic Bird Image */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-[#52b788]/40 shadow-2xl">
            <img
              src="/images/canopy_birds.jpg"
              alt="Indian Grey Hornbill and Coppersmith Barbet in Dhurwa Banyan Tree, Ranchi"
              className="w-full h-72 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
              <span className="text-[11px] font-bold text-amber-300">
                {language === "hi"
                  ? "धुर्वा के बरगद व पीपल पर धूसर धनेश व ताम्रकार बसंता"
                  : "Indian Grey Hornbill & Coppersmith Barbet"}
              </span>
              <p className="text-[10px] text-gray-300">
                {language === "hi"
                  ? "दशकों पुरानी कैनोपी पर निर्भर स्थानीय पक्षी, धुर्वा, रांची"
                  : "Native Ficus-dependent canopy avifauna in Dhurwa corridor"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nesting Category Tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedNesting(c.id)}
            className={`px-3.5 py-2 rounded-xl transition-all border ${
              selectedNesting === c.id
                ? "bg-[#1b4332] text-white border-[#1b4332] shadow-sm"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            {language === "hi" ? c.labelHi : c.labelEn}
          </button>
        ))}
      </div>

      {/* Species Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredSpecies.map((bird) => (
          <div
            key={bird.id}
            className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-mono text-gray-400 font-bold">
                  {bird.id}
                </span>
                {getNestingBadge(bird.nesting_type)}
              </div>

              <div>
                <h3 className="font-bold text-base text-gray-900 group-hover:text-emerald-800 transition-colors">
                  {language === "hi" ? bird.common_name_hi : bird.common_name_en}
                </h3>
                <span className="text-xs italic text-gray-500 font-serif block">
                  {bird.scientific_name}
                </span>
                {language !== "hi" && (
                  <span className="text-[11px] text-emerald-800 font-medium block mt-0.5">
                    {bird.common_name_hi}
                  </span>
                )}
              </div>

              {/* Host Trees Pills */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                  {language === "hi" ? "आश्रित वृक्ष प्रजातियां:" : "Dependent Host Trees:"}
                </span>
                <div className="flex flex-wrap gap-1">
                  {bird.primary_host_trees.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-emerald-50 text-emerald-900 text-[10px] font-medium rounded-md border border-emerald-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact text */}
              <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                {bird.impact_summary}
              </p>

              {/* Why saplings cannot replace */}
              <div className="p-2 bg-amber-50/70 rounded-xl border border-amber-200/80 text-[11px] text-amber-950 space-y-1">
                <strong className="block text-amber-900 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-700" />
                  <span>
                    {language === "hi"
                      ? "पौधे विकल्प क्यों नहीं?"
                      : "Why Saplings Cannot Replace:"}
                  </span>
                </strong>
                <p className="leading-snug text-amber-900/90 text-[10.5px]">
                  {bird.why_saplings_cannot_replace}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 text-[10.5px] text-gray-500 space-y-1">
              <div className="flex items-center gap-1 text-emerald-800 font-medium">
                <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
                <span className="line-clamp-1">{bird.corridor_hotspots}</span>
              </div>
              <div className="text-gray-400 font-mono text-[10px]">
                IUCN: {bird.iucn_status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
