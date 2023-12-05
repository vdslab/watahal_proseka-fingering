import path from "path";
import { NextResponse } from "next/server";
import { readJSON } from "@/app/readFile";

export async function GET(request, { params }) {
  const id = parseInt(params.id);

  const musicListJsonPath = path.join(
    process.cwd(),
    "public",
    "json",
    "detail",
    "data.json"
  );
  const musics = await readJSON(musicListJsonPath);
  const music = musics.find((music) => music.id === id);

  if (!music) {
    return NextResponse.json({
      message: `Not Found Music. music id ${params.id}`,
      status: 204,
    });
  }

  const startTimesJsonPath = path.join(
    process.cwd(),
    "public",
    "json",
    "detail",
    "start_times.json"
  );
  const startTimes = await readJSON(startTimesJsonPath);
  const startTimeData = startTimes.find((startTime) => startTime.id === id);

  const jsonDir = path.join(process.cwd(), "public", "json");
  const score = await readJSON(
    `score-${id}.json`,
    path.join(jsonDir, "notes_score")
  );
  const ys = score.map(({ y }) => y);
  ys.sort((a, b) => a - b);
  const measureRange = [ys[0], ys[ys.length - 1]];

  const response = NextResponse.json({
    ...music,
    startTime: startTimeData.startTime,
    measureRange: measureRange,
  });

  return response;
}
