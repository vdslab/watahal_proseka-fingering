import "./tailwind.css";
import Header from "@/components/Header";
import MainPage from "./_components/MainPage";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-slate-200 max-h-screen">
        <MainPage />
      </main>
    </>
  );
}
