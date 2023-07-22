"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import { useRouter } from "next/navigation";

export default function Search({ data }) {
  const names = data.map(({ id, name, videoid }) => {
    return { key: id, label: name, ID: videoid };
  });

  const router = useRouter();
  const [selectID, setSelectID] = useState(null);

  return (
    <div className="flex">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={names}
        renderOption={(props, option) => {
          return (
            <Box component="li" {...props} key={option.key}>
              {option.label}
            </Box>
          );
        }}
        sx={{ width: 500 }}
        renderInput={(params) => {
          return <TextField {...params} label="曲" />;
        }}
        onChange={(event, value) => {
          setSelectID(value.ID);
        }}
      />

      <Button
        color="primary"
        variant="contained"
        startIcon={<MusicNoteIcon />}
        onClick={() => {
          if (selectID != null) {
            router.push(`/music/${selectID}`);
          }
        }}
      >
        曲の再生ページ
      </Button>
    </div>
  );
}
