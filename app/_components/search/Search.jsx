"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import { CircularProgress } from "@mui/material";

export default function Search({ setSelectedMusicId, selectedMusicId }) {
  const { data, isLoading } = useSWR("/api/music", (url) =>
    fetch(url).then((res) => res.json())
  );
  const names = data?.map(({ id, name, videoId }) => {
    return { key: id, label: name, ID: videoId };
  });
  const router = useRouter();
  const [selectID, setSelectID] = useState(0);
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    setSelectID(names?.find((d) => d.key === selectedMusicId) ?? 0);
  }, [selectedMusicId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Autocomplete
        disablePortal
        sx={{ width: 500 }}
        value={selectID}
        onChange={(event, value) => {
          if (value) {
            setSelectID(value);
            setSelectedMusicId(value?.key);
          }
        }}
        inputValue={inputName}
        onInputChange={(event, newInputValue) => {
          setInputName(newInputValue);
        }}
        options={names}
        renderInput={(params) => {
          return <TextField {...params} label="曲" />;
        }}
        renderOption={(props, option) => {
          return (
            <Box component="li" {...props} key={option.key}>
              {option.label}
            </Box>
          );
        }}
        isOptionEqualToValue={(option, v) => {
          return option?.key === v?.key;
        }}
        getOptionLabel={(option) => option.label ?? ""}
      />

      <Button
        color="primary"
        variant="contained"
        startIcon={<MusicNoteIcon />}
        onClick={() => {
          if (selectID != null) {
            const { ID: videoId, key: id } = selectID;
            router.push(`/music/${id}`);
          }
        }}
      >
        曲の再生ページ
      </Button>
    </Box>
  );
}
