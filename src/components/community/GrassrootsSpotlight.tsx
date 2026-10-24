"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Heart,
  Video,
  ExternalLink,
  Users,
  Sparkles,
  Share2,
  CheckCircle2,
  Play,
  Trees,
  Camera,
} from "lucide-react";

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const GrassrootsSpotlight: React.FC = () => {
  const { language } = useLanguage();

  const socialReels = [
    {
      id: "reel-1",
      creator: "@highpurpos",
      creatorUrl: "https://www.instagram.com/highpurpos?mdxt=cXY5eGZmN21zMWNx",
      titleEn: "Raksha Sutra for Dhurwa's Ancient Trees",
      titleHi: "धुर्वा के पुराने पेड़ों पर रक्षा सूत्र और 'चिपको' जागृति",
      descEn:
        "Local youth, children, and elders gathering at Vivekanand Chowk to tie sacred threads around heritage Banyan and Sal trees marked for felling.",
      descHi:
        "विवेकानंद चौक और शहीद मैदान पर स्थानीय युवाओं और बच्चों ने पेड़ों से लिपटकर शांतिपूर्ण रक्षा सूत्र बांधा।",
      tags: ["#SaveTreesinHEC", "#SaveDhurwaTrees"],
      metric: "On-Ground Action",
      thumbnail: "/images/citizen_movement.jpg",
    },
    {
      id: "reel-2",
      creator: "@hamari.ranchi",
      creatorUrl: "https://www.instagram.com/hamari.ranchi?cplk=MWJqbGRsazc1a2RzbQ==",
      titleEn: "The Living Green Lung of Ranchi: Why HEC Trees Matter",
      titleHi: "रांची का फेफड़ा: एचईसी और धुर्वा के पेड़ क्यों जरूरी हैं?",
      descEn:
        "Cinematic documentary footage showing the towering Sal canopies, bird habitats, and the temperature difference between concrete roads and green avenues.",
      descHi:
        "धुर्वा की हरी-भरी सड़कों, साल और बरगद के घने छत्रों और पक्षियों के प्राकृतिक आवास का वृत्तचित्र कवरेज।",
      tags: ["#HamariRanchi", "#SaveHECGreens"],
      metric: "Digital Awareness",
      thumbnail: "/images/corridor_aerial.jpg",
    },
    {
      id: "reel-3",
      creator: "@highpurpos",
      creatorUrl: "https://www.instagram.com/highpurpos?mdxt=cXY5eGZmN21zMWNx",
      titleEn: "Citizen Memorandum to the Chief Secretary",
      titleHi: "मुख्य सचिव को नागरिकों का औपचारिक ज्ञापन",
      descEn:
        "Volunteers preparing technical representations urging the State Government to review road alignment and adopt median-preservation designs.",
      descHi:
        "सड़क के मध्य में पेड़ों को बचाते हुए वैकल्पिक डिज़ाइन अपनाने के लिए सरकार को सौंपा गया नागरिक ज्ञापन।",
      tags: ["#CivicDialogue", "#SmartRoads"],
      metric: "Policy Advocacy",
      thumbnail: "/images/field_survey.jpg",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#1b4332] text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#2d6a4f]/50 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d6a4f] text-amber-300 text-xs font-bold uppercase tracking-wider">
            <InstagramIcon className="w-4 h-4 text-amber-300" />
            <span>
              {language === "hi"
                ? "जन आंदोलन और अग्रणी आवाज़ें"
                : "Pioneering Grassroots Voices"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {language === "hi"
              ? "धुर्वा के पेड़ों को बचाने वाले ज़मीनी साथी"
              : "Driven by Ranchi's Citizens: @hamari.ranchi & @highpurpos"}
          </h2>

          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            {language === "hi"
              ? "शुरुआती दौर से ही इंस्टाग्राम पर @hamari.ranchi और @highpurpos ने धुर्वा के पेड़ों को बचाने के लिए ज़मीनी जागरूकता, शांतिपूर्ण जन-सभाओं, रक्षा सूत्र अभियानों और सोशल मीडिया पर हज़ारों नागरिकों को जोड़ने का काम किया है। यह डिजिटल मंच उनके प्रयासों का साक्ष्य-आधारित विस्तार है।"
              : "From the very inception of the 10-lane proposal, local citizen initiatives like @hamari.ranchi and @highpurpos have spearheaded on-ground tree-protection drives, youth rallies at Vivekanand Chowk, peaceful tree-hugs, and digital petitions across Jharkhand."}
          </p>

          {/* Social Profile Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/hamari.ranchi?cplk=MWJqbGRsazc1a2RzbQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white font-bold rounded-xl text-xs shadow-md transition-all hover:scale-105"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>@hamari.ranchi</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>

            <a
              href="https://www.instagram.com/highpurpos?mdxt=cXY5eGZmN21zMWNx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold rounded-xl text-xs shadow-md transition-all hover:scale-105 border border-emerald-400/30"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>@highpurpos</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>
          </div>
        </div>

        {/* Featured Citizen Action Photo */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-[#52b788]/40 shadow-2xl">
            <img
              src="/images/citizen_movement.jpg"
              alt="Citizens and youth of Ranchi tying protective threads around Dhurwa Banyan tree"
              className="w-full h-72 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
              <span className="text-[11px] font-bold text-amber-300">
                {language === "hi"
                  ? "विवेकानंद चौक व शहीद मैदान पर नागरिक रक्षा सूत्र अभियान"
                  : "Community Tree Protection at Vivekanand Chowk, Dhurwa"}
              </span>
              <p className="text-[10px] text-gray-300">
                {language === "hi"
                  ? "शांतिपूर्ण चिपको-शैली का जन आंदोलन, रांची, झारखंड"
                  : "Peaceful citizen gathering organized by local youth initiatives"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Reels & Movement Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {socialReels.map((reel) => (
          <div
            key={reel.id}
            className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Thumbnail Header with Play Overlay */}
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              <img
                src={reel.thumbnail}
                alt={reel.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <a
                  href={reel.creatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/90 text-emerald-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                  aria-label="Watch on Instagram"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </a>
              </div>

              {/* Creator Tag */}
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                <InstagramIcon className="w-3 h-3 text-pink-400" />
                <span>{reel.creator}</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-emerald-900/80 backdrop-blur-sm text-emerald-200 px-2 py-0.5 rounded text-[10px] font-semibold">
                {reel.metric}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-gray-900 leading-snug group-hover:text-emerald-800 transition-colors">
                  {language === "hi" ? reel.titleHi : reel.titleEn}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {language === "hi" ? reel.descHi : reel.descEn}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {reel.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={reel.creatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-pink-700 hover:text-pink-800 font-semibold pt-1"
                >
                  <span>Watch Videos & Updates on Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Community Action Quote */}
      <div className="p-4 bg-[#fbfaf5] rounded-2xl border border-[#e2dfd4] text-xs text-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-600 shrink-0" />
          <span>
            <strong>
              {language === "hi"
                ? "नागरिक भागीदारी का संदेश:"
                : "Civic Solidarity:"}
            </strong>{" "}
            {language === "hi"
              ? "हैशटैग #SaveDhurwaTrees और #HamariRanchi के साथ अपनी तस्वीरें और वीडियो शेयर करें।"
              : "Tag your on-ground tree photographs, videos, and reels with #SaveDhurwaTrees, #SaveTreesinHEC, and #HamariRanchi."}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://www.instagram.com/hamari.ranchi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-800 hover:underline font-semibold text-xs"
          >
            Follow @hamari.ranchi
          </a>
          <span>•</span>
          <a
            href="https://www.instagram.com/highpurpos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-800 hover:underline font-semibold text-xs"
          >
            Follow @highpurpos
          </a>
        </div>
      </div>
    </div>
  );
};
