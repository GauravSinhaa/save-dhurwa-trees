import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const updateSchema = z.object({
  threat_status: z
    .enum([
      "REPORTED_BY_CITIZEN",
      "AWAITING_VERIFICATION",
      "VERIFIED_EXISTING",
      "POTENTIALLY_AFFECTED",
      "OFFICIALLY_LISTED_FELLING",
      "CONFIRMED_FELLED",
      "TRANSPLANTATION_PROPOSED",
      "TRANSPLANTED_MONITORING",
      "PRESERVED_FOLLOWING_MODIFICATION",
    ])
    .optional(),
  verification_status: z
    .enum(["VERIFIED", "PENDING_REVIEW", "UNVERIFIED", "REJECTED"])
    .optional(),
  health_status: z.enum(["EXCELLENT", "GOOD", "FAIR", "POOR", "CRITICAL"]).optional(),
  actor_name: z.string().min(2),
  reason: z.string().min(3),
  official_doc_reference: z.string().nullable().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tree = db.getTreeById(id);
    if (!tree) {
      return NextResponse.json(
        { success: false, error: "Tree record not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: tree });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to retrieve tree" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validated = updateSchema.parse(body);

    const updated = db.updateTreeStatus(
      id,
      {
        ...(validated.threat_status && { threat_status: validated.threat_status }),
        ...(validated.verification_status && {
          verification_status: validated.verification_status,
        }),
        ...(validated.health_status && { health_status: validated.health_status }),
        ...(validated.official_doc_reference !== undefined && {
          official_doc_reference: validated.official_doc_reference,
        }),
      },
      validated.actor_name,
      validated.reason
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Tree record not found to update" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Invalid update parameters";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
