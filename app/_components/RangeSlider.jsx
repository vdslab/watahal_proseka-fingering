import { Box, Slider, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function RangeSlider({ range, handleLevelRangeChange }) {
  const [value, setValue] = useState(range);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleLevelRangeChange(newValue);
  };

  return (
    <Stack direction="row" flexWrap={"wrap"} justifyContent={"space-between"}>
      <Typography alignSelf={"center"}>表示する楽曲レベル</Typography>
      <Box width={"60%"} paddingX={3}>
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
    </Stack>
  );
}
