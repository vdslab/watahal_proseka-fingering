import "./tailwind.css";
import Image from "next/image";
import Link from "next/link";
import MusicSearch from "@/components/Search";

const music_names = ["one", "two", "three", "four", "five"];
const musics = [
  { name: "one", difficult: 1, time_sec: 300, bpm: 200 },
  { name: "two", difficult: 2, time_sec: 290, bpm: 210 },
  { name: "three", difficult: 3, time_sec: 280, bpm: 220 },
  { name: "four", difficult: 4, time_sec: 270, bpm: 230 },
  { name: "five", difficult: 5, time_sec: 260, bpm: 240 },
];

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

function MusicTable() {
  const cell = "px-4 py-2";
  const smallCell = `${cell} w-1/12`;
  const dataCell = `border ${cell}`;
  const smallDataCell = `border ${smallCell} text-center`;
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className={`${cell}`}>名前</th>
          <th className={`${smallCell}`}>難易度</th>
          <th className={`${smallCell}`}>再生時間</th>
          <th className={`${smallCell}`}>BPM</th>
        </tr>
      </thead>
      <tbody>
        {musics.map(({ name, difficult, time_sec, bpm }) => {
          return (
            <tr key={name} className="odd:bg-gray-200 even:bg-gray-400">
              <td className={`${dataCell}`}>
                <Link href={`/music/${name}`}>to music {`${name}`}</Link>
              </td>
              <td className={`${smallDataCell}`}>{`${difficult}`}</td>
              <td className={`${smallDataCell}`}>{`${time_sec}`}</td>
              <td className={`${smallDataCell}`}>{`${bpm}`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default function Home() {
  const c = "min-h-screen flex-col items-center justify-between p-12";
  return (
    <main className="p-12">
      <p>this is Home</p>
      <div>
        <div>
          <Link href={"/"}>music link</Link>
        </div>

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
              <Image
                src="/menu.svg"
                className="text-black"
                width={120}
                height={120}
                priority
              />
            </li>
          </ul>
        </nav>

        <div>
          <MusicTable />
        </div>
      </div>
      {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.js</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div> */}
    </main>
  );
}
