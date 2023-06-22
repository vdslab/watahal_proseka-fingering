"use client";

import * as React from "react";
import {
  TextField,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function MusicSearch() {
  return (
    <FormControl variant="standard">
      <InputLabel htmlFor="input-with-icon-adornment">曲名の検索</InputLabel>
      <Input
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
