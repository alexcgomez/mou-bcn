import { NextRequest, NextResponse } from "next/server";
import { getStationCorrespondences } from "@/lib/tmb-api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lineCode = searchParams.get("lineCode");
  const stationCode = searchParams.get("stationCode");

  if (!lineCode || !stationCode) {
    return NextResponse.json(
      { error: "lineCode i stationCode són requerits" },
      { status: 400 }
    );
  }

  try {
    const correspondences = await getStationCorrespondences(
      parseInt(lineCode, 10),
      parseInt(stationCode, 10)
    );
    return NextResponse.json(correspondences);
  } catch (error) {
    console.error("Error al obtenir correspondències:", error);
    return NextResponse.json(
      { error: "Error al obtenir les correspondències" },
      { status: 500 }
    );
  }
}
