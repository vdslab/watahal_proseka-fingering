"use client";

import React, { useState } from "react";
import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function MusicSearch({ handleChange }) {
  const [inputValue, setInputValue] = useState("");
  function handleChangeWrapper(e) {
    if (handleChange !== undefined && handleChange !== null) {
      handleChange(e);
    }

    setInputValue(e.target.value);
  }
  return (
    <FormControl variant="standard">
      <InputLabel htmlFor="input-with-icon-adornment">曲名の検索</InputLabel>
      <Input
        value={inputValue}
        onChange={handleChangeWrapper}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
