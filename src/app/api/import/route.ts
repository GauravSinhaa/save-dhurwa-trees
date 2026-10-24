import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { TreeRecord } from "@/lib/types";

interface ImportRow {
  public_tree_id?: string;
  species_common_name?: string;
  species_scientific_name?: string;
  latitude?: number | string;
  longitude?: number | string;
  locality?: string;
  estimated_height_m?: number | string;
  trunk_circumference_cm?: number | string;
  canopy_spread_m?: number | string;
  health_status?: string;
  threat_status?: string;
  source_type?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { format, data, dry_run, actor_name } = body;

    const validatedTrees: Omit<TreeRecord, "id" | "created_at" | "updated_at">[] = [];
    const errors: { row: number; id: string; error: string }[] = [];

    let rows: ImportRow[] = [];

    if (format === "geojson") {
      // GeoJSON FeatureCollection parsing
      const geo = typeof data === "string" ? JSON.parse(data) : data;
      if (!geo.features || !Array.isArray(geo.features)) {
        return NextResponse.json(
          { success: false, error: "Invalid GeoJSON: FeatureCollection expected" },
          { status: 400 }
        );
      }

      rows = geo.features.map((f: any, idx: number) => {
        const coords = f.geometry?.coordinates;
        // Check WGS84 [lng, lat]
        const lng = coords ? coords[0] : undefined;
        const lat = coords ? coords[1] : undefined;
        const p = f.properties || {};

        return {
          public_tree_id: p.tree_id || p.id || `GIS-${idx + 1}`,
          species_common_name: p.species || p.common_name || "Unknown Species",
          species_scientific_name: p.scientific_name || "Unspecified",
          latitude: lat,
          longitude: lng,
          locality: p.locality || "Dhurwa Corridor",
          estimated_height_m: p.height || p.height_m || 10,
          trunk_circumference_cm: p.circumference || p.girth || p.gbh || 120,
          canopy_spread_m: p.canopy || p.spread || 8,
          health_status: p.health || "GOOD",
          threat_status: p.threat || "POTENTIALLY_AFFECTED",
          source_type: p.source_type || "DEMONSTRATION",
        };
      });
    } else if (format === "csv") {
      // Parse CSV formatted text
      const lines = String(data)
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      if (lines.length < 2) {
        return NextResponse.json(
          { success: false, error: "CSV must contain a header and at least one data row" },
          { status: 400 }
        );
      }

      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(",").map((p) => p.trim());
        const row: any = {};
        headers.forEach((h, hIdx) => {
          row[h] = parts[hIdx];
        });
        rows.push({
          public_tree_id: row.tree_id || row.id || `CSV-${i}`,
          species_common_name: row.species || row.common_name || "Sal / Sakhuwa",
          species_scientific_name: row.scientific_name || "Shorea robusta",
          latitude: parseFloat(row.latitude || row.lat),
          longitude: parseFloat(row.longitude || row.lng || row.lon),
          locality: row.locality || "Dhurwa Road Corridor",
          estimated_height_m: parseFloat(row.height || "12"),
          trunk_circumference_cm: parseFloat(row.girth || row.circumference || "140"),
          canopy_spread_m: parseFloat(row.canopy || "10"),
          health_status: (row.health || "GOOD").toUpperCase(),
          threat_status: (row.threat || "POTENTIALLY_AFFECTED").toUpperCase(),
          source_type: "DEMONSTRATION",
        });
      }
    } else {
      return NextResponse.json(
        { success: false, error: "Supported formats: 'geojson', 'csv'" },
        { status: 400 }
      );
    }

    // Validation rules
    const existingIds = new Set(db.getTrees().map((t) => t.public_tree_id));
    const processedIds = new Set<string>();

    rows.forEach((r, idx) => {
      const rowNum = idx + 1;
      const treeId = r.public_tree_id || `IMP-${rowNum}`;

      // Check ID uniqueness
      if (existingIds.has(treeId) || processedIds.has(treeId)) {
        errors.push({
          row: rowNum,
          id: treeId,
          error: `Duplicate tree identifier: ${treeId}`,
        });
        return;
      }
      processedIds.add(treeId);

      const lat = typeof r.latitude === "string" ? parseFloat(r.latitude) : r.latitude;
      const lng = typeof r.longitude === "string" ? parseFloat(r.longitude) : r.longitude;

      // Coordinate boundary check for Ranchi / Jharkhand region (Lat: 22.5 to 24.5, Lng: 84.5 to 86.5)
      if (!lat || isNaN(lat) || !lng || isNaN(lng)) {
        errors.push({
          row: rowNum,
          id: treeId,
          error: "Missing or unparseable coordinates",
        });
        return;
      }

      if (lat < 22.0 || lat > 24.5 || lng < 84.0 || lng > 86.5) {
        errors.push({
          row: rowNum,
          id: treeId,
          error: `Coordinates (${lat}, ${lng}) fall outside Ranchi / Jharkhand bounds or use non-WGS84 projection`,
        });
        return;
      }

      // Valid health
      const validHealth = ["EXCELLENT", "GOOD", "FAIR", "POOR", "CRITICAL"];
      const health = (r.health_status || "GOOD").toUpperCase();
      if (!validHealth.includes(health)) {
        errors.push({
          row: rowNum,
          id: treeId,
          error: `Invalid health status '${health}'`,
        });
        return;
      }

      validatedTrees.push({
        public_tree_id: treeId,
        species_common_name: r.species_common_name || "Unspecified Native",
        species_scientific_name: r.species_scientific_name || "Unspecified",
        latitude: lat,
        longitude: lng,
        locality: r.locality || "Dhurwa Corridor",
        estimated_height_m: Number(r.estimated_height_m) || 12,
        trunk_circumference_cm: Number(r.trunk_circumference_cm) || 150,
        canopy_spread_m: Number(r.canopy_spread_m) || 10,
        health_status: health as any,
        estimated_age: Math.round((Number(r.trunk_circumference_cm) || 150) / 3.5),
        threat_status: (r.threat_status || "POTENTIALLY_AFFECTED") as any,
        verification_status: "UNVERIFIED",
        source_type: (r.source_type || "DEMONSTRATION") as any,
        photo_url: "/images/field_survey.jpg",
        survey_date: new Date().toISOString().split("T")[0],
        observer_name: actor_name || "GIS Importer",
        observer_notes: "Imported via GIS batch pipeline.",
        official_doc_reference: null,
      });
    });

    if (dry_run) {
      return NextResponse.json({
        success: true,
        dry_run: true,
        total_rows: rows.length,
        valid_rows: validatedTrees.length,
        rejected_rows: errors.length,
        errors,
        preview: validatedTrees.slice(0, 5),
      });
    }

    // Ingest valid rows
    validatedTrees.forEach((tree) => {
      db.addTree(tree);
    });

    return NextResponse.json({
      success: true,
      imported_count: validatedTrees.length,
      rejected_count: errors.length,
      errors,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "GIS import failed";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
