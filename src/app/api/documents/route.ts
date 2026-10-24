import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const documentSchema = z.object({
  title: z.string().min(5),
  document_type: z.enum([
    "DPR",
    "ALIGNMENT_DRAWING",
    "TREE_ENUMERATION",
    "FELLING_PERMISSION",
    "ENVIRONMENTAL_MANAGEMENT",
    "COMPENSATORY_AFFORESTATION",
    "RTI_REPLY",
    "COURT_ORDER",
    "MEDIA_REPORT",
  ]),
  issuing_authority: z.string().min(3),
  publication_date: z.string(),
  verification_status: z.enum([
    "OFFICIAL_VERIFIED",
    "MEDIA_REPORTED",
    "REQUESTED_AWAITING",
    "DISPUTED",
  ]),
  summary: z.string().min(10),
  source_url: z.string().min(1),
  page_count: z.number().optional().default(1),
  actor_name: z.string().min(2),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const docs = db.getDocuments(category);
  return NextResponse.json({ success: true, count: docs.length, data: docs });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = documentSchema.parse(body);

    const doc = db.addDocument(
      {
        title: validated.title,
        document_type: validated.document_type,
        issuing_authority: validated.issuing_authority,
        publication_date: validated.publication_date,
        verification_status: validated.verification_status,
        summary: validated.summary,
        source_url: validated.source_url,
        page_count: validated.page_count,
      },
      validated.actor_name
    );

    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Validation error";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
