import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const citizenReportSchema = z.object({
  reporter_name: z
    .string()
    .min(1)
    .optional()
    .default("Concerned Citizen (Dhurwa)"),
  reporter_email: z.string().email().optional().or(z.literal("")),
  locality: z.string().min(2, "Please specify landmark or locality").default("Dhurwa 10-Lane Corridor, Ranchi"),
  city: z.string().optional().default("Ranchi"),
  date: z.string().optional(),
  latitude: z.number().min(20).max(26),
  longitude: z.number().min(80).max(90),
  species_common_name: z
    .string()
    .min(1)
    .default("Other / Unknown Tree (Needs ID)"),
  species_scientific_name: z.string().optional().default("Pending Botanist Identification"),
  estimated_height_m: z.number().positive().optional().default(10),
  trunk_circumference_cm: z.number().positive().optional().default(120),
  health_status: z
    .enum(["EXCELLENT", "GOOD", "FAIR", "POOR", "CRITICAL"])
    .optional()
    .default("GOOD"),
  construction_nearby: z.boolean().default(false),
  description: z
    .string()
    .optional()
    .default(
      "Tree observation recorded along Dhurwa 10-lane road corridor. Photo and GPS coordinates submitted for volunteer arborist review."
    ),
  photo_url: z.string().optional().default("/images/field_survey.jpg"),
  consent_publish: z.boolean().default(true),
});

const reviewSchema = z.object({
  report_id: z.string(),
  action: z.enum(["APPROVE", "REJECT"]),
  reviewer_name: z.string().min(2),
});

export async function GET() {
  const reports = db.getCitizenReports();
  // Strip private reporter email addresses from public list
  const sanitized = reports.map((r) => ({
    ...r,
    reporter_email: undefined,
  }));
  return NextResponse.json({ success: true, data: sanitized });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = citizenReportSchema.parse(body);

    const newReport = db.addCitizenReport({
      reporter_name: validated.reporter_name,
      reporter_email: validated.reporter_email || undefined,
      city: validated.city || "Ranchi",
      date: validated.date,
      locality: validated.locality,
      latitude: validated.latitude,
      longitude: validated.longitude,
      species_common_name: validated.species_common_name,
      species_scientific_name: validated.species_scientific_name,
      estimated_height_m: validated.estimated_height_m,
      trunk_circumference_cm: validated.trunk_circumference_cm,
      health_status: validated.health_status,
      construction_nearby: validated.construction_nearby,
      description: validated.description,
      photo_url: validated.photo_url,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Observation submitted successfully. It has entered the verification queue.",
        data: { id: newReport.id, status: newReport.review_status },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Validation error";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = reviewSchema.parse(body);

    const ok = db.reviewCitizenReport(
      validated.report_id,
      validated.action,
      validated.reviewer_name
    );

    if (!ok) {
      return NextResponse.json(
        { success: false, error: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Report ${validated.report_id} ${validated.action.toLowerCase()}d successfully`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Validation error";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
