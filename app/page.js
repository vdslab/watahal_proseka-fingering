import "./tailwind.css";
import Header from "@/components/Header";
import MainPage from "./_components/MainPage";
import path from "path";
import { readCSV, readJSON } from "./readFile";

export default async function Home() {
  const publicDir = path.join(process.cwd(), "public");
  const csvDir = path.join(publicDir, "csv");
  const jsonDir = path.join(publicDir, "json");

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
        <MainPage {...{ clusteringData, similarityData }} />
      </main>
    </>
  );
}
