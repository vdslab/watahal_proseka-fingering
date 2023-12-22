"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import { CircularProgress, IconButton, Stack, Tooltip } from "@mui/material";
import LinkWrapper from "@/components/Link";

export default function Search({ setSelectedMusicId, selectedMusicId }) {
  const { data, isLoading } = useSWR("/api/music", (url) =>
    fetch(url).then((res) => res.json())
  );
  const names = data?.map(({ id, name, videoId }) => {
    return { key: id, label: name, ID: videoId };
  });
  const router = useRouter();
  const [selectID, setSelectID] = useState();
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    setSelectID(names?.find((d) => d.key === selectedMusicId) ?? 0);
  }, [selectedMusicId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Autocomplete
        disablePortal
        sx={{ width: 500 }}
        onChange={(event, value) => {
          setSelectID(value);
          setSelectedMusicId(value?.key);
        }}
        inputValue={inputName}
        onInputChange={(event, newInputValue) => {
          setInputName(newInputValue);
        }}
        options={names}
        renderInput={(params) => {
          return (
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <TextField
                {...params}
                label="楽曲を探す"
                placeholder="Tell Your World"
              />
              <Tooltip title={"曲の再生ページに行く"}>
                <IconButton>
                  <LinkWrapper href="/">
                    <Stack alignContent={"center"} justifyContent={"center"}>
                      <MusicNoteIcon />
                    </Stack>
                  </LinkWrapper>
                </IconButton>
              </Tooltip>
            </Stack>
          );
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
    </Box>
  );
}
