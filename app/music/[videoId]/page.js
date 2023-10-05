import Content from "./{feature}/Content";
import path from "path";
import { promises as fs } from "fs";
import { readJSON } from "@/app/readFile";

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
      <Content {...{ videoId: video, fingering }} />
    </>
  );
}
