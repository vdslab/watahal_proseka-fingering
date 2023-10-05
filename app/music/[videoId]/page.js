import Content from "./{feature}/Content";
import path from "path";
import { promises as fs } from "fs";
import { readJSON, readSimilarity } from "@/app/readFile";

export default async function Home({
  params: { videoId },
  searchParams: { id },
}) {
  const video = decodeURI(videoId);
  // console.log(typeof videoId);
  // console.log(id);

  const jsonDir = path.join(process.cwd(), "public", "json");
  const musicDetailPath = path.join(jsonDir, "fingering");
  const fingering = await readJSON(`song${id}.json`, musicDetailPath);

  const musicListPath = path.join(jsonDir, "detail");
  const musicList = await readJSON("data.json", musicListPath);

  const csvDir = path.join(process.cwd(), "public", "csv");
  const musicSimilarityPath = path.join(csvDir, "sims");
  const similarities = await readSimilarity(
    `similarities_${id}.csv`,
    musicSimilarityPath
  );
  // const fingering = readJSON();
  return (
    <>
      {/* <div className="flex flex-row items-center">
        <div className="w-11/12">
          <div className="flex items-end">
            <p>{music_name}</p>
          </div>
        </div>
        <div className="w-1/12"></div>
      </div> */}
      <Content
        videoId={video}
        fingering={fingering}
        similarities={similarities}
        musicList={musicList}
      />
    </>
  );
}
