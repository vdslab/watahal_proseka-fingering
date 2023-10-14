import path from "path";
import { NextResponse } from "next/server";
import { readSimilarity } from "@/app/readFile";

export async function GET(request, { params }) {
  const similaritiesPath = path.join(process.cwd(), "public", "csv", "sims");
  const similarities = await readSimilarity(
    `similarities_${params.id}.csv`,
    similaritiesPath
  );

  return NextResponse.json(
    similarities ?? {
      message: `Not Found Music. music id ${params.id}`,
      status: 204,
    }
  );
}
