import "./tailwind.css";
import Image from "next/image";
import Link from "next/link";

const music_names = ["one", "two", "three", "four", "five"];
const musics = [
  { name: "one", difficult: 1, time_sec: 300, bpm: 200 },
  { name: "two", difficult: 2, time_sec: 290, bpm: 210 },
  { name: "three", difficult: 3, time_sec: 280, bpm: 220 },
  { name: "four", difficult: 4, time_sec: 270, bpm: 230 },
  { name: "five", difficult: 5, time_sec: 260, bpm: 240 },
];

function Search() {
  return (
    <div>
      <form>
        <label>曲検索</label>
        <input type="text"></input>
      </form>
    </div>
  );
}

function Filter() {
  return (
    <div>
      <form>
        <label>絞り込み</label>
        <input type="text" placeholder="曲名"></input>
      </form>
    </div>
  );
}

function Sort() {
  return (
    <div>
      <form>
        <select>
          <option>表示順の変更（現在何もできない）</option>
          <option>難易度順</option>
        </select>
      </form>
    </div>
  );
}

function MusicTable() {
  return (
    <div>
      <table className="table-auto">
        <thead>
          <th className="px-4 py-2">名前</th>
          <th className="px-4 py-2">難易度</th>
          <th className="px-4 py-2">再生時間</th>
          <th className="px-4 py-2">BPM</th>
        </thead>
        <tbody>
          {musics.map(({ name, difficult, time_sec, bpm }) => {
            return (
              <tr key={name}>
                <td className="border px-4 py-2">
                  <Link href={`/music/${name}`}>to music {`${name}`}</Link>
                </td>
                <td className="border px-4 py-2">{`${difficult}`}</td>
                <td className="border px-4 py-2">{`${time_sec}`}</td>
                <td className="border px-4 py-2">{`${bpm}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      <p>this is Home</p>
      <div>
        <div>
          <Link href={"/"}>music link</Link>
        </div>

        <nav>
          <ul className="flex">
            <li>アイコンの場所</li>
            <li className="mr-6">
              <Search />
            </li>
            <li className="mr-6">
              <Filter />
            </li>
            <li className="mr-6">
              <Sort />
            </li>
            <li className="mr-6">メニューの場所</li>
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
