import Content from "./_components/Content";
import path from "path";
import { readJSON, readSimilarity } from "@/app/readFile";

export default async function Home({
  params: { videoId },
  searchParams: { id },
}) {
  const video = decodeURI(videoId);

  const jsonDir = path.join(process.cwd(), "public", "json");
  const musicDetailPath = path.join(jsonDir, "fingering");
  const fingering = await readJSON(`song${id}.json`, musicDetailPath);

  const score = await readJSON(
    `score-${id}.json`,
    path.join(jsonDir, "notes_score")
  );

  const musicListPath = path.join(jsonDir, "detail");
  const musicList = await readJSON("data.json", musicListPath);

  const csvDir = path.join(process.cwd(), "public", "csv");
  const musicSimilarityPath = path.join(csvDir, "sims");
  const similarities = await readSimilarity(
    `similarities_${id}.csv`,
    musicSimilarityPath
  );

  return (
    <>
      <Content
        videoId={video}
        fingering={fingering}
        similarities={similarities}
        musicList={musicList}
        score={score}
        id={id}
      />
    </>
  );
}
