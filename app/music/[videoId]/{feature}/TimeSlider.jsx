"use client";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";

function valueLabelFormat(value) {
  const minute_second = 60;
  const minute = Math.floor(value / minute_second);
  const second = value % minute_second;
  const label = minute == 0 ? `${second}秒` : `${minute}分${second}秒`;
  return label;
}

const minDistance = 10;

export default function TimeSlider({ max, setSeek }) {
  const [value, setValue] = useState(0);

  function handleTimeChange(e, newValue) {
    setValue(newValue);
    setSeek(newValue);
  }

  return (
    <>
      <Slider
        getAriaLabel={() => "seek bar"}
        max={max}
        onChange={handleTimeChange}
        valueLabelDisplay="auto"
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        disableSwap
      />
    </>
  );
}
