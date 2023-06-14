import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>this is music Home</p>
      <p>
        <ul>
          <li>
            <Link href={"/"}>root page</Link>
          </li>
          {["one", "two", "three", "four", "five"].map((name) => {
            return (
              <li key={name}>
                <Link href={`/music/${name}`}>to music {`${name}`}</Link>
              </li>
            );
          })}
        </ul>
      </p>
    </main>
  );
}
