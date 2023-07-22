"use client";
import MusicSearch from "@/components/Search";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import searchFilter from "./searchFilter";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import { useRouter } from "next/navigation";

export default function Search({ data }) {
  const [musics, setMusics] = useState([]);
  function handleChange(e) {
    const filtered = searchFilter(data, e.target.value);
    setMusics(filtered);
  }

  const names = data.map(({ id, name }) => {
    return { key: id, label: name };
  });

  const router = useRouter();
  const [selectname, setSelectname] = useState(null);

  return (
    <div className="flex">
      {/* <Box
        sx={{ bgcolor: "background.paper", p: 2, border: 1, borderRadius: 2 }}
      >
        <MusicSearch handleChange={handleChange} />
        {musics.map(({ name }) => {
          return <p key={name}>{name}</p>;
        })}
      </Box> */}

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
          setSelectname(value.label);
        }}
      />

      <Button
        variant="outlined"
        startIcon={<MusicNoteIcon />}
        onClick={() => {
          if (selectname != null) {
            router.push(`/music/${selectname}`);
          }
        }}
      >
        曲の再生ページ
      </Button>
    </div>
  );
}
