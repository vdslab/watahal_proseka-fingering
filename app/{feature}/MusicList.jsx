"use client";
import React, { useState } from "react";
import MusicTable from "@/components/MusicTable";

export default function MusicList({ musics }) {
  const [showedData, setShowedData] = useState(musics);

  return <MusicTable data={showedData} />;
}
