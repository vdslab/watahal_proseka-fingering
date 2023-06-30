"use client";

import { IconButton, Button } from "@mui/material";

import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import PlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";

export default function VideoManagerButtons() {
  return (
    <div>
      <IconButton>
        <SwapHorizRoundedIcon />
      </IconButton>
      <IconButton>
        <PlayCircleFilledWhiteRoundedIcon />
      </IconButton>
      <span>
        <Button variant="outlined">0.5</Button>
        <Button variant="outlined">0.75</Button>
        <Button variant="outlined">1</Button>
      </span>
    </div>
  );
}
