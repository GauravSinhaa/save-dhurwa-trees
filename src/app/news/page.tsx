"use client";

import React, { useState } from "react";
import { initialUpdates } from "@/lib/db";
import { ProjectUpdate } from "@/lib/types";
import {
  FileText,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Megaphone,
  Radio,
  FileSearch,
} from "lucide-react";

export default function NewsUpdatesPage() {
  const [updates, setUpdates] = useState<ProjectUpdate[]>(initialUpdates);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "ALL", label: "All Updates" },
    { id: "OFFICIAL_ANNOUNCEMENT", label: "Official Announcements" },
    { id: "MEDIA_REPORT", label: "Media Reports" },
    { id: "CITIZEN_OBSERVATION", label: "Citizen Observations" },
    { id: "ADVOCACY_STATEMENT", label: "Advocacy Statements" },
  ];

  const getCategoryBadge = (cat: ProjectUpdate["category"]) => {
    switch (cat) {
      case "OFFICIAL_ANNOUNCEMENT":
        return (
          <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            Official Announcement
          </span>
        );
      case "MEDIA_REPORT":
        return (
          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Radio className="w-3 h-3 text-amber-700" />
            Media Report
          </span>
        );
      case "CITIZEN_OBSERVATION":
        return (
          <span className="bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Megaphone className="w-3 h-3 text-blue-700" />
            Citizen Observation
          </span>
        );
      case "ADVOCACY_STATEMENT":
        return (
          <span className="bg-purple-100 text-purple-900 border border-purple-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <FileSearch className="w-3 h-3 text-purple-700" />
            Advocacy Statement
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            {cat}
          </span>
        );
    }
  };

  const filteredUpdates = updates.filter((u) => {
    if (selectedCategory !== "ALL" && u.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        u.headline.toLowerCase().includes(q) ||
        u.summary.toLowerCase().includes(q) ||
        u.source_name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Chronological Record
        </span>
        <h1 className="text-3xl font-extrabold text-[#1b4332] tracking-tight">
          News & Project Milestones
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Verified timeline of government notices, judicial observations, media coverage,
          and citizen delegations concerning the Dhurwa road project in Ranchi.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search news & milestones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-xl border border-gray-300 text-xs focus:ring-1 focus:ring-[#1b4332] focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                selectedCategory === c.id
                  ? "bg-[#1b4332] text-white border-[#1b4332]"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chronological Timeline Feed */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-gray-200">
        {filteredUpdates.map((update, idx) => (
          <div
            key={update.id}
            className={`relative flex flex-col md:flex-row items-start ${
              idx % 2 === 0 ? "md:flex-row-reverse" : ""
            } gap-6 group`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#1b4332] border-4 border-white shadow-md z-10"></div>

            {/* Content Card */}
            <div className="ml-10 md:ml-0 md:w-1/2 pl-0 md:px-6 w-full">
              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div className="flex items-center justify-between gap-2 border-b pb-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{update.date}</span>
                  </div>
                  {getCategoryBadge(update.category)}
                </div>

                <h3 className="font-bold text-base text-gray-900 leading-snug">
                  {update.headline}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {update.summary}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
                  <span className="font-medium text-gray-700">
                    Source: {update.source_name}
                  </span>
                  {update.source_url && update.source_url !== "#" && (
                    <a
                      href={update.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Read Document</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
