"use client";
import React, { useState } from "react";
import MusicTable from "@/components/MusicTable";
import { Box } from "@mui/material";

export default function MusicList({ musics }) {
  const [showedData, setShowedData] = useState(musics);

  return (
    <Box marginTop={3}>
      <MusicTable data={showedData} />
    </Box>
  );
}
