import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const petitionSchema = z.object({
  display_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email required for verification"),
  locality: z.string().min(2, "Locality required (e.g., Dhurwa, Ranchi, etc.)"),
  consent_given: z.boolean().refine((val) => val === true, {
    message: "You must consent to add your support to the petition",
  }),
});

export async function GET() {
  const signatures = db.getPetitionSignatures();
  // Privacy safeguard: only export safe display name, locality, and timestamp
  const publicSupporters = signatures.map((s) => ({
    id: s.id,
    display_name: s.display_name,
    locality: s.locality,
    submitted_at: s.submitted_at,
  }));

  return NextResponse.json({
    success: true,
    total_signatures: signatures.length,
    supporters: publicSupporters,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = petitionSchema.parse(body);

    // Simple pseudonymized hash of email to prevent duplicate entry
    const emailHash = `hash-${Buffer.from(validated.email.toLowerCase()).toString(
      "base64"
    ).slice(0, 10)}`;

    const newSignature = db.addPetitionSignature({
      display_name: validated.display_name,
      locality: validated.locality,
      email_hash: emailHash,
      consent_given: validated.consent_given,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for supporting tree preservation in Ranchi!",
        data: {
          id: newSignature.id,
          display_name: newSignature.display_name,
          locality: newSignature.locality,
        },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Validation error";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
