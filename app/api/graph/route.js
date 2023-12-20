import path from "path";
import { readJSON } from "../../readFile";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const publicDir = path.join(process.cwd(), "public");
  const jsonDir = path.join(publicDir, "json");
  const similarityData = await readJSON("similarity_graph.json", jsonDir);
  return NextResponse.json(similarityData);
}
