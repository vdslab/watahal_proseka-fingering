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

async function readFileContent(filePath, rootDir = null) {
  const file = path.join(rootDir ?? "", filePath);
  const content = await fs.readFile(file, "utf8");
  return content;
}

async function readJSON(filePath, rootDir = null) {
  const content = await readFileContent(filePath, rootDir);
  return JSON.parse(content);
}

async function readCSV(filePath, rootDir = null, parseFunc) {
  const content = await readFileContent(filePath, rootDir);
  const rows = content.split("\r\n");
  return rows.map((row) => row.split(",").map((value) => parseFunc(value)));
}

export default async function Home() {
  const c = "min-h-screen flex-col items-center justify-between p-12";
  const publicDir = path.join(process.cwd(), "public");

  const musics = await readJSON("musicdata.json", publicDir);

  const csvDir = path.join(publicDir, "csv");
  const clusteringLabelsNoFlat = await readCSV(
    "clustering_label_data.csv",
    csvDir,
    parseInt
  );
  const clusteringLabels = clusteringLabelsNoFlat.flat();

  const clusteringPositions = await readCSV(
    "clustering_point_data.csv",
    csvDir,
    parseFloat
  );
  const clusteringPoints = clusteringPositions.map((value) => ({
    x: value[0],
    y: value[1],
  }));
  // console.log(clusteringLabels);
  // console.log(clusteringPoints);

  return (
    <main className="p-12 bg-slate-200">
      <MainPage {...{ musics, clusteringLabels, clusteringPoints }} />
    </main>
  );
}
