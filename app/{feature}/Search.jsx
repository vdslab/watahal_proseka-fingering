"use client";
import MusicSearch from "@/components/Search";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import searchFilter from "./searchFilter";

export default function Search({ data }) {
  const [musics, setMusics] = useState([]);
  function handleChange(e) {
    const filtered = searchFilter(data, e.target.value);
    setMusics(filtered);
  }
  return (
    <Box sx={{ bgcolor: "background.paper", p: 2, border: 1, borderRadius: 2 }}>
      <MusicSearch handleChange={handleChange} />
      {musics.map(({ name }) => {
        return <p key={name}>{name}</p>;
      })}
    </Box>
  );
}
