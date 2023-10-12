"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import { useRouter } from "next/navigation";

export default function Search({ data, setId, nodeId }) {
  const names = data.map(({ id, name, videoid }) => {
    return { key: id, label: name, ID: videoid };
  });
  names.push({
    key: null,
    label: "曲を選択してください",
    ID: null,
  });

  const router = useRouter();
  const [selectID, setSelectID] = useState(names[names.length - 1]);

  useEffect(() => {
    setSelectID(names.find((d) => d.key === nodeId));
  }, [nodeId]);

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
        value={selectID}
        sx={{ width: 500 }}
        renderInput={(params) => {
          return <TextField {...params} label="曲" />;
        }}
        isOptionEqualToValue={(option, v) => option?.key === v?.key}
        onChange={(event, value) => {
          if (!value) {
            setSelectID(names[names.length - 1]);
            setId(null);
          } else {
            setSelectID(value);
            setId(value.key);
          }
        }}
      />

      <Button
        color="primary"
        variant="contained"
        startIcon={<MusicNoteIcon />}
        onClick={() => {
          if (selectID != null) {
            const { ID: videoId, key: id } = selectID;
            router.push(`/music/${videoId}?id=${id}`);
          }
        }}
      >
        曲の再生ページ
      </Button>
    </div>
  );
}
