import "./tailwind.css";
import MainPage from "./{feature}/MainPage";

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
      <MainPage />
    </main>
  );
}
