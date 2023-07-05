"use client";
import React, { useState } from "react";
import MusicSearch from "@/components/Search";
import MusicTable from "@/components/MusicTable";
import searchFilter from "./searchFilter";

export default function MusicList({ musics }) {
  const [showedData, setShowedData] = useState(musics.data);
  function handleChange(e) {
    const filtered = searchFilter(musics.data, e.target.value);
    const isEmpty = JSON.stringify(filtered) == JSON.stringify([]);
    setShowedData(isEmpty ? musics.data : filtered);
  }
  return (
    <>
      <nav>
        <ul className="flex">
          <li className="w-3/4 mr-3">
            <MusicSearch data={musics.data} handleChange={handleChange} />
          </li>
          <li className="w-1/12 mr-3"></li>
        </ul>
      </nav>

      <MusicTable data={showedData} header={musics.header} />
    </>
  );
}
