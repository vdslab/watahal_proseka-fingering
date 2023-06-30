"use client";
import MusicSearch from "@/components/Search";
import { Box } from "@mui/material";

export default function Search() {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 2, border: 1, borderRadius: 2 }}>
      <MusicSearch />
    </Box>
  );
}
