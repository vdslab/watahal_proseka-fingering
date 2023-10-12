import Header from "./{feature}/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main className="max-h-screen max-w-screen">{children}</main>
    </>
  );
}
