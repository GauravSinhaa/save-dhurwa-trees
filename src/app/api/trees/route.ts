import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const treeSchema = z.object({
  species_common_name: z.string().min(2),
  species_scientific_name: z.string().optional().default("Unspecified"),
  latitude: z.number().min(20).max(26),
  longitude: z.number().min(80).max(90),
  locality: z.string().min(2),
  estimated_height_m: z.number().positive(),
  trunk_circumference_cm: z.number().positive(),
  canopy_spread_m: z.number().positive(),
  health_status: z.enum(["EXCELLENT", "GOOD", "FAIR", "POOR", "CRITICAL"]),
  threat_status: z.enum([
    "REPORTED_BY_CITIZEN",
    "AWAITING_VERIFICATION",
    "VERIFIED_EXISTING",
    "POTENTIALLY_AFFECTED",
    "OFFICIALLY_LISTED_FELLING",
    "CONFIRMED_FELLED",
    "TRANSPLANTATION_PROPOSED",
    "TRANSPLANTED_MONITORING",
    "PRESERVED_FOLLOWING_MODIFICATION",
  ]),
  verification_status: z.enum(["VERIFIED", "PENDING_REVIEW", "UNVERIFIED", "REJECTED"]),
  source_type: z.enum(["DEMONSTRATION", "OFFICIAL_SURVEY", "CITIZEN_SUBMISSION"]),
  photo_url: z.string().optional().default("/images/field_survey.jpg"),
  survey_date: z.string(),
  observer_name: z.string().optional(),
  observer_notes: z.string().optional(),
  official_doc_reference: z.string().nullable().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const species = searchParams.get("species") || undefined;
    const threat_status = searchParams.get("threat_status") || undefined;
    const verification_status = searchParams.get("verification_status") || undefined;
    const locality = searchParams.get("locality") || undefined;
    const source_type = searchParams.get("source_type") || undefined;
    const search = searchParams.get("search") || undefined;

    const trees = db.getTrees({
      species,
      threat_status,
      verification_status,
      locality,
      source_type,
      search,
    });

    return NextResponse.json({ success: true, count: trees.length, data: trees });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch trees" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = treeSchema.parse(body);

    const publicId = `DHT-${String(Date.now()).slice(-4)}`;
    const newTree = db.addTree({
      ...validated,
      public_tree_id: publicId,
      estimated_age: Math.round(validated.trunk_circumference_cm / 3.5),
    });

    return NextResponse.json({ success: true, data: newTree }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid tree data";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
