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

async function readCSV(filePath, rootDir = null, parseFunc, header = false) {
  const content = await readFileContent(filePath, rootDir);
  const rows = content.split("\r\n");
  const csvData = rows.map((row) => row.split(","));
  if (!header) {
    return csvData.map((row) => row.map((value) => parseFunc(value)));
  }
  const head = csvData[0];
  const data = csvData.slice(1);

  return data.map((row) =>
    row.reduce((obj, value, i) => ({ ...obj, [head[i]]: parseFunc(value) }), {})
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
    "clustering_data.csv",
    csvDir,
    parseFloat,
    true
  );

  return (
    <main className="p-12 bg-slate-200">
      <MainPage {...{ musics, clusteringData }} />
    </main>
  );
}
