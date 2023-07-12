"use client";

import { IconButton, Button } from "@mui/material";

import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import PlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import YouTube, { YouTubePlayer } from "react-youtube";

export default function VideoManagerButtons({ YTPlayer }) {
  function videoPlayer(e) {
    const state = YTPlayer.getPlayerState();
    if (state == YouTube.PlayerState.PAUSED) {
      YTPlayer.playVideo();
    } else if (state == YouTube.PlayerState.PLAYING) {
      YTPlayer.pauseVideo();
    }
  }

  return (
    <div>
      {/* ミラー */}
      <IconButton>
        <SwapHorizRoundedIcon />
      </IconButton>
      {/* 再生停止 */}
      <IconButton onClick={videoPlayer}>
        <PlayCircleFilledWhiteRoundedIcon />
      </IconButton>
      {/*  */}
      <span>
        <Button variant="outlined">0.5</Button>
        <Button variant="outlined">0.75</Button>
        <Button variant="outlined">1</Button>
      </span>
    </div>
  );
}
