import Content from "./_components/Content";
import path from "path";
import { readJSON } from "@/app/readFile";

export default async function Home({
  params: { videoId },
  searchParams: { id },
}) {
  const jsonDir = path.join(process.cwd(), "public", "json");
  const musicDetailPath = path.join(jsonDir, "fingering");
  const fingering = await readJSON(`song${id}.json`, musicDetailPath);

  return (
    <>
      <Content fingering={fingering} />
    </>
  );
}
