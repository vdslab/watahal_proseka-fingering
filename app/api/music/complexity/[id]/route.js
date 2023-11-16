import path from "path";
import { NextResponse } from "next/server";
import { readJSON } from "@/app/readFile";

export async function GET(request, { params }) {
  const paramId = parseInt(params.id);

  const complexityJsonPath = path.join(
    process.cwd(),
    "public",
    "json",
    "complexity",
    "complexity_status.json"
  );
  const complexityContent = await readJSON(complexityJsonPath);
  const complexity = complexityContent.find(({id}) => id === paramId);

  const response = NextResponse.json(complexity);

  return response;
}
