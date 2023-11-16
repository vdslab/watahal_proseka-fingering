import path from "path";

import { NextResponse } from "next/server";
import { readJSON } from "@/app/readFile";

export async function GET(request, { params }) {
  const complexityJsonPath = path.join(
    process.cwd(),
    "public",
    "json",
    "complexity",
    "complexity.json"
  );
  const complexity = await readJSON(complexityJsonPath);

  return NextResponse.json(complexity);
}
