"use client";
import React, { useState } from "react";
import MusicSearch from "@/components/Search";
import MusicTable from "@/components/MusicTable";
import searchFilter from "./searchFilter";
import { Toolbar } from "@mui/material";

export default function MusicList({ musics }) {
  const [showedData, setShowedData] = useState(musics);
  function handleChange(e) {
    const filtered = searchFilter(musics, e.target.value);
    setShowedData(e.target.value == "" ? musics : filtered);
  }

  return (
    <>
      <Toolbar>
        <MusicSearch data={musics} handleChange={handleChange} />
      </Toolbar>
      <MusicTable data={showedData} />
    </>
  );
}
