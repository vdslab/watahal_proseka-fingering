import { Box, Grid, Slider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

export default function GrayScaleSlider({ setGrayScaleValue, max }) {
  const [value, setValue] = useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setGrayScaleValue(newValue);
  };

  return (
    <Box width={250}>
      <Typography id="input-slider" gutterBottom>
        ノーツの彩度
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            max={max}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
