import "./tailwind.css";
import MainPage from "./{feature}/MainPage";
import path from "path";
import { promises as fs } from "fs";

function Sort() {
  return (
    <form>
      <select className="w-full">
        <option>表示順の変更（現在何もできない）</option>
        <option>難易度順</option>
      </select>
    </form>
  );
}

export default async function Home() {
  const c = "min-h-screen flex-col items-center justify-between p-12";
  const publicDir = path.join(process.cwd(), "public");

  const musicJsonFile = path.join(publicDir, "musicdata.json");
  const musicsJsonContent = await fs.readFile(musicJsonFile, "utf8");
  const musics = JSON.parse(musicsJsonContent);

  const clusteringLabelJson = path.join(publicDir, "clustering_label_data.csv");
  const clusteringLabelContent = await fs.readFile(clusteringLabelJson, "utf8");
  const clusteringLabels = JSON.parse(clusteringLabelContent);

  const clusteringPointJson = path.join(publicDir, "clustering_point_data.csv");
  const clusteringPointContent = await fs.readFile(clusteringPointJson, "utf8");
  const clusteringPoints = JSON.parse(clusteringPointContent);

  return (
    <main className="p-12 bg-slate-200">
      <MainPage {...{ musics, clusteringLabels, clusteringPoints }} />
    </main>
  );
}
