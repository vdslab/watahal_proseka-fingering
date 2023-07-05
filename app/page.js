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
  const jsonFile = path.join(process.cwd(), "public", "musicdata.json");
  const musicData = await fs.readFile(jsonFile, "utf8");

  return (
    <main className="p-12 bg-slate-200">
      <MainPage data={musicData} />
    </main>
  );
}
