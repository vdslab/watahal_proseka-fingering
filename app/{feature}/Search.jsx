"use client";
import MusicSearch from "@/components/Search";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Search({ data }) {
  function handleChange(e) {
    console.log(e.target.value);
  }
  return (
    <Box sx={{ bgcolor: "background.paper", p: 2, border: 1, borderRadius: 2 }}>
      <MusicSearch handleChange={handleChange} />
    </Box>
  );
}
