import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>this is music fingering Home</p>
      <p>
        <Link href={"/"}>root page</Link>
      </p>
    </main>
  );
}
