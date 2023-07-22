"use client";
import React, { useState } from "react";
import MusicSearch from "@/components/Search";
import MusicTable from "@/components/MusicTable";
import searchFilter from "./searchFilter";

export default function MusicList({ musics }) {
  const [showedData, setShowedData] = useState(musics);
  function handleChange(e) {
    const filtered = searchFilter(musics, e.target.value);
    setShowedData(e.target.value == "" ? musics : filtered);
  }

  return (
    <>
      <nav>
        <ul className="flex">
          <li className="w-3/4 mr-3">
            <MusicSearch data={musics} handleChange={handleChange} />
          </li>
          <li className="w-1/12 mr-3"></li>
        </ul>
      </nav>

      <MusicTable data={showedData} />
    </>
  );
}
