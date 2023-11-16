import path from "path";
import { NextResponse } from "next/server";
import { readJSON } from "@/app/readFile";

export async function GET(request, { params }) {
  const { id } = params;
  const jsonDir = path.join(process.cwd(), "public", "json");
  const score = await readJSON(
    `score-${id}.json`,
    path.join(jsonDir, "notes_score")
  );

  return NextResponse.json(
    score ?? {
      message: `Not Found music score. music id: ${id}`,
      status: 204,
    }
  );
}
