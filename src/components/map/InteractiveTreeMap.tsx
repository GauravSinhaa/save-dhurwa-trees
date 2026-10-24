"use client";

import React from "react";
import dynamic from "next/dynamic";
import { TreeRecord } from "@/lib/types";

// Dynamic import with ssr: false
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[650px] rounded-2xl bg-gray-100 flex flex-col items-center justify-center text-gray-500 border border-gray-200 animate-pulse">
      <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mb-3"></div>
      <p className="font-semibold text-sm">Loading Dhurwa Tree Map & GIS Data...</p>
      <p className="text-xs text-gray-400 mt-1">OpenStreetMap & Satellite Layers Initializing</p>
    </div>
  ),
});

interface InteractiveTreeMapProps {
  initialTrees?: TreeRecord[];
  height?: string;
  showFilters?: boolean;
}

export const InteractiveTreeMap: React.FC<InteractiveTreeMapProps> = (props) => {
  return <LeafletMap {...props} />;
};
