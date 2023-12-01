import path from "path";
import { NextResponse } from "next/server";
import { readJSON } from "@/app/readFile";

export async function GET(request, { params }) {
    const { id } = params;
    const jsonDir = path.join(process.cwd(), "public", "json");
    const musicDetailPath = path.join(jsonDir, "fingering");
    const fingering = await readJSON(`song${id}.json`, musicDetailPath);

    return NextResponse.json(fingering);
}