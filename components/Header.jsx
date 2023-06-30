"use client";

import * as React from "react";
import Imformation from "./Imformation";

export default function Header() {
  return (
    <header className="flex">
      <div className="w-10/12">プロセカ運指可視化</div>
      <div className="w-2/12">
        <Imformation />
      </div>
    </header>
  );
}
