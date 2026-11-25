"use client";

import React, { useState } from "react";
import { RanchiHeroSection } from "@/components/dashboard/RanchiHeroSection";
import { RanchiInteractiveMap } from "@/components/dashboard/RanchiInteractiveMap";
import { RanchiAQISection } from "@/components/dashboard/RanchiAQISection";
import { RanchiTreesCutPlantChart } from "@/components/dashboard/RanchiTreesCutPlantChart";
import { RanchiWildlifeSection } from "@/components/dashboard/RanchiWildlifeSection";
import { RanchiEcosystemChain } from "@/components/dashboard/RanchiEcosystemChain";
import { RanchiCorrelationChart } from "@/components/dashboard/RanchiCorrelationChart";
import { RanchiHealthCalculator } from "@/components/dashboard/RanchiHealthCalculator";
import { RanchiHECCaseStudy } from "@/components/dashboard/RanchiHECCaseStudy";
import { RanchiActionSection } from "@/components/dashboard/RanchiActionSection";
import { RanchiTransparencySection } from "@/components/dashboard/RanchiTransparencySection";

export default function RanchiDashboardPage() {
  const [selectedHotspot, setSelectedHotspot] = useState<string>("ALL");

  return (
    <div className="min-h-screen bg-[#fbfaf5] text-[#1c2826] space-y-12 pb-24">
      {/* 1. Hero Section - Ranchi is Choking */}
      <RanchiHeroSection
        selectedHotspot={selectedHotspot}
        onSelectHotspot={setSelectedHotspot}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 2. Ranchi Map - Interactive Leaflet Map */}
        <section id="ranchi-map" className="scroll-mt-20">
          <RanchiInteractiveMap
            selectedHotspot={selectedHotspot}
            onSelectHotspot={setSelectedHotspot}
            height="620px"
          />
        </section>

        {/* 3. AQI Change Over Years - Ranchi City */}
        <section id="aqi-trends" className="scroll-mt-20">
          <RanchiAQISection />
        </section>

        {/* 4. Trees Cut vs Planted - Ranchi District */}
        <section id="trees-audit" className="scroll-mt-20">
          <RanchiTreesCutPlantChart />
        </section>

        {/* 5. Birds & Wildlife of Ranchi - Extinction Risk */}
        <section id="wildlife-risk" className="scroll-mt-20">
          <RanchiWildlifeSection />
        </section>

        {/* 6. One Tree = One Ecosystem Chain */}
        <section id="ecosystem-chain" className="scroll-mt-20">
          <RanchiEcosystemChain />
        </section>

        {/* 7. Decline Chart - Trees vs Birds vs AQI */}
        <section id="decline-correlation" className="scroll-mt-20">
          <RanchiCorrelationChart />
        </section>

        {/* 8. Health Cost for Ranchi People */}
        <section id="health-cost" className="scroll-mt-20">
          <RanchiHealthCalculator />
        </section>

        {/* Spotlight Case Study: HEC & Dhurwa Corridor */}
        <section id="hec-case-study" className="scroll-mt-20">
          <RanchiHECCaseStudy />
        </section>

        {/* 9. What Can Ranchi Do? - Action CTAs */}
        <section id="citizen-action" className="scroll-mt-20">
          <RanchiActionSection />
        </section>

        {/* 10. Transparency & Open Data */}
        <section id="transparency" className="scroll-mt-20">
          <RanchiTransparencySection />
        </section>
      </div>
    </div>
  );
}
