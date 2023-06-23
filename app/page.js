import "./tailwind.css";
import Image from "next/image";
import Link from "next/link";
import MusicSearch from "@/components/Search";
import MusicTable from "@/components/MusicTable";
import SideMenu from "@/components/SideMenu";

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
              <SideMenu />
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
