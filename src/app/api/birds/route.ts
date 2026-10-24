import { NextResponse } from "next/server";
import { dhurwaAvianSpecies } from "@/lib/birds";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: dhurwaAvianSpecies.length,
    data: dhurwaAvianSpecies,
  });
}
