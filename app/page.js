import "./tailwind.css";
import Header from "@/components/Header";
import MainPage from "./_components/MainPage";
import path from "path";
import { readCSV, readJSON } from "./readFile";
import getSimilarityData from "./_components/getSimilarityData";

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

export default async function Home({ searchParams: { id } }) {
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

  const similarityData = await readJSON("similarity_graph.json", jsonDir);

  return (
    <>
      <Header />
      <main className="p-12 bg-slate-200 max-h-screen">
        <MainPage {...{ musics, clusteringData, similarityData }} />
      </main>
    </>
  );
}
