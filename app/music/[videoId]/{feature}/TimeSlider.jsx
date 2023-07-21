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

export default function TimeSlider({ max }) {
  const [value, setValue] = useState([0, max]);

  function handleTimeChange(e, newValue, activeThumb) {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  }

  return (
    <>
      <Slider
        getAriaLabel={() => "seek bar"}
        value={value}
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
