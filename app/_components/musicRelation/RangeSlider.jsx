import { Box, Slider } from "@mui/material";
import { useState } from "react";

export default function RangeSlider({ range, handleLevelRangeChange }) {
  const [value, setValue] = useState(range);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleLevelRangeChange(newValue);
  };

  return (
    <Box>
      <Box paddingX={2}>
        <Slider
          value={value ?? [0, 100]}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          step={1}
          min={range[0]}
          max={range[1]}
        />
      </Box>
    </Box>
  );
}
