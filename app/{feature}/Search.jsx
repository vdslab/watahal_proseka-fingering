"use client";
import MusicSearch from "@/components/Search";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

function hiraToKana(str) {
  return str?.replace(/[\u3041-\u3096]/g, function (match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}

export default function Search({ data }) {
  const [musics, setMusics] = useState([]);
  function handleChange(e) {
    const searchStr = e.target.value;
    if (searchStr == "") {
      setMusics([]);
      return;
    }

    const filtered = data.filter(({ name, ruby }) => {
      const isInclude =
        name.indexOf(searchStr) !== -1 ||
        (ruby && hiraToKana(ruby).indexOf(hiraToKana(searchStr)));
      return isInclude;
    });
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
