import { Box, Slider, Typography } from "@mui/material";
import { useState } from "react";

export default function RangeSlider({ range, handleLevelRangeChange }) {
  const [value, setValue] = useState(range);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleLevelRangeChange(newValue);
  };

  return (
    <Box width={"100%"} height={"100%"}>
      <Typography
        alignSelf={"center"}
        sx={{ caretColor: "transparent", userSelect: "none" }}
      >
        表示する楽曲レベル
      </Typography>
      <Box paddingX={1}>
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
