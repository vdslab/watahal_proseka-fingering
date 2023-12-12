"use client";
import React, { useState } from "react";
import MusicTable from "./MusicTable";
import { Box, CircularProgress } from "@mui/material";
import useSWR from "swr";

export default function MusicList() {
  const { data, isLoading } = useSWR("/api/music", (url) =>
    fetch(url).then((res) => res.json())
  );

  return (
    <Box marginTop={3}>
      {isLoading ? <CircularProgress /> : <MusicTable data={data} />}
    </Box>
  );
}
