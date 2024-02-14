import { Inter } from "next/font/google";
import "@/app/tailwind.css";

const inter = Inter({ subsets: ["latin"] });

const abstract =
  "音楽ゲームの1つに「プロジェクトセカイカラフルステージ！feat.初音ミク(以下 プロセカ)」がある．このプロセカはGoogle Playにおいて，音楽&リズムカテゴリの無料アプリランキングの上位に位置しており，人気である．プロセカではライフが存在しており，タイミング良くノーツをタップできないとライフが減っていく．ライフが0になるとクリアとはならない．クリアしたいとなったときには練習が必要になる．プロセカにおいて練習するには繰り返しプレイし，クリアするために必要なことを考えたり，自然に取り方がわかるまで慣れたりする．プロセカ以外でもアプリやサイトを利用し練習するができる．楽曲のプレイ動画を利用し一時停止してノーツの取り方を考えたり，クリアするときに注意する点やノーツの取り方の解説を見てクリアのために活かしたりする．しかし，プレイ動画を利用して練習するサイトやアプリはクリアするための情報はなく，クリアするための情報を解説しているものでは実際にプレイするときの感覚がわからない．そこで我々は，クリアするための情報，特に譜面の取り方の提示，およびプレイ動画とともに譜面の取り方を表示させることで，プロセカの上達を支援するようなシステムを開発した．本システムの機能は，譜面をどう取ればいいか，譜面のどこが難しいか，ある楽曲を練習するための楽曲はなにか，という要件から作成した．評価実験より，どの要件についても，我々が提示したいものについての表示と読み取りはできたと考える．特に譜面のどこが難しいかという要件については達成していると考えた．しかし，譜面をどう取ればいいか，ある楽曲を練習するための楽曲はなにかという要件の機能については改善の必要があった．";
const title = "Pro SEKA fingering VIS";

export const metadata = {
  title,
  description: abstract,
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={abstract} />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={abstract} />
        <meta property="og:url" content="%PUBLIC_URL%" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{title}</title>
      </head>
      <body className={`${inter.className} bg-slate-200 m-0`}>{children}</body>
    </html>
  );
}
