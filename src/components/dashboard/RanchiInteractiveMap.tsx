"use client";

import React from "react";
import dynamic from "next/dynamic";

const RanchiMapInner = dynamic(() => import("./RanchiMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-3xl bg-gray-100 flex flex-col items-center justify-center text-gray-500 border border-gray-200 animate-pulse">
      <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mb-3"></div>
      <p className="font-semibold text-sm text-gray-800">Loading Ranchi City Interactive GIS Map...</p>
      <p className="text-xs text-gray-500 mt-1">Plotting 15 Critical Hotspots & Satellite Layers</p>
    </div>
  ),
});

interface RanchiInteractiveMapProps {
  selectedHotspot: string;
  onSelectHotspot: (id: string) => void;
  height?: string;
}

export const RanchiInteractiveMap: React.FC<RanchiInteractiveMapProps> = (props) => {
  return <RanchiMapInner {...props} />;
};
