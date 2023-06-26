import "./tailwind.css";
import Image from "next/image";
import Link from "next/link";
import MusicSearch from "@/components/Search";
import MusicTable from "@/components/MusicTable";
import SideMenu from "@/components/SideMenu";
import Search from "./{feature}/Search";
import ClusteringVis from "./{feature}/ClusteringVis";

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

export default function Home() {
  const c = "min-h-screen flex-col items-center justify-between p-12";
  return (
    <main className="p-12 bg-slate-200">
      <div>
        <ClusteringVis />
        <Search />
      </div>

      <div>
        <nav>
          <ul className="flex">
            <li className="w-1/12 mr-3">アイコンの場所</li>

            <li className="w-1/12 mr-3">
              <Sort />
            </li>
            <li className="w-3/4 mr-3">
              <MusicSearch />
            </li>
            <li className="w-1/12 mr-3">
              <SideMenu />
            </li>
          </ul>
        </nav>

        <MusicTable />
      </div>
    </main>
  );
}
