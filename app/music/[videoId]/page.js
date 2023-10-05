import Content from "./{feature}/Content";
import path from "path";
import { promises as fs } from "fs";
import { readJSON, readFileContent } from "@/app/readFile";

async function readSimilarity(filePath, rootDir = null) {
  const content = await readFileContent(filePath, rootDir);
  const rows = content.split("\r\n");
  const csvData = rows.map((row) => row.split(","));
  const head = csvData[0];
  const data = csvData.slice(1);

  return data.map((row) =>
    row.reduce((obj, value, i) => {
      if (i === head.length - 1) {
        return { ...obj, [head[i]]: parseFloat(value) };
      } else {
        return { ...obj, [head[i]]: parseInt(value) };
      }
    }, {})
  );
}

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
