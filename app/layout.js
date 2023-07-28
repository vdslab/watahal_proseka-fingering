import { Inter } from "next/font/google";
import Header from "../components/Header";
import "@/app/tailwind.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "pjsekai fingering and music feature vis",
  description: "pjsekai fingering and music feature vis",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200 m-0`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
