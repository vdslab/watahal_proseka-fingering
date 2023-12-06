import Header from "./_components/Header";
import Title from "./_components/Title";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <Title />
      <main className="max-h-screen max-w-screen">{children}</main>
    </>
  );
}
