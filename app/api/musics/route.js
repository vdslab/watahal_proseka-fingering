import path from "path";
import { readJSON } from "../../readFile";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const musicListJsonPath = path.join(
    process.cwd(),
    "public",
    "json",
    "detail",
    "data.json"
  );
  console.log(musicListJsonPath);
  const musics = await readJSON(musicListJsonPath);

  return NextResponse.json(musics);
}
