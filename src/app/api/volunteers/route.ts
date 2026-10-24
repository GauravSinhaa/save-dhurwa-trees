import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const volunteerSchema = z.object({
  display_name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  locality: z.string().min(2, "Locality required"),
  areas_of_interest: z.array(z.string()).min(1, "Select at least one area of interest"),
  skills: z.string().optional().default(""),
  availability: z.string().optional().default("Flexible"),
  consent_contact: z.boolean().refine((v) => v === true, {
    message: "Consent to be contacted is required",
  }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = volunteerSchema.parse(body);

    const vol = db.registerVolunteer({
      display_name: validated.display_name,
      email: validated.email,
      locality: validated.locality,
      areas_of_interest: validated.areas_of_interest,
      skills: validated.skills,
      availability: validated.availability,
      consent_contact: validated.consent_contact,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for volunteering with Save Dhurwa Trees!",
        data: { id: vol.id, display_name: vol.display_name },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Validation error";
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
