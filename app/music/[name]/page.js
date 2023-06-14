import Link from "next/link";

export default function Home({ params: { name } }) {
  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      <p>this is music fingering {`${name}`} Home</p>
      <ul>
        <li>
          <Link href={"/"}>root page</Link>
        </li>
      </ul>
    </main>
  );
}
