import "./tailwind.css";
import Header from "@/components/Header";
import MainPage from "./{feature}/MainPage";
import path from "path";
import { readCSV, readJSON } from "./readFile";
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

  const jsonDir = path.join(publicDir, "json");
  const musicDetailPath = path.join(jsonDir, "detail");
  const musics = await readJSON("data.json", musicDetailPath);

  const csvDir = path.join(publicDir, "csv");
  const clusteringData = await readCSV(
    "clustering_data_tsne.csv",
    csvDir,
    parseFloat,
    true
  );

  return (
    <main className="bg-slate-200 max-h-screen">
      <Header />
      <div className="p-12">
        <MainPage {...{ musics, clusteringData }} />
      </div>
    </main>
  );
}
