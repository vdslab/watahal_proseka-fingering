"use client";
import { useEffect, useState } from "react";

import { IconButton, Button } from "@mui/material";

import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import PlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

import YouTube, { YouTubePlayer } from "react-youtube";

export default function VideoManagerButtons({
  YTPlayer,
  setPlaybackRate,
  playBtn,
  volume,
  setVolume,
}) {
  function videoPlayer(e) {
    const state = YTPlayer.getPlayerState();
    if (state == YouTube.PlayerState.PAUSED) {
      YTPlayer.playVideo();
    } else if (state == YouTube.PlayerState.PLAYING) {
      YTPlayer.pauseVideo();
    }
  }

  function PlayStop({ playBtn }) {
    if (playBtn == YouTube.PlayerState.PLAYING) {
      return <PauseCircleIcon />;
    }
    return <PlayCircleFilledWhiteRoundedIcon />;
  }

  function handlePlaybackRate(e) {
    const speed = parseFloat(e.target.value);
    if (speed != NaN) {
      setPlaybackRate(speed);
    }
  }

  const handleChange = (event, newValue) => {
    setVolume(newValue);
  };

  return (
    <div className="flex">
      {/* ミラー */}
      <IconButton>
        <SwapHorizRoundedIcon />
      </IconButton>
      {/* 再生停止 */}
      <IconButton onClick={videoPlayer}>
        <PlayStop playBtn={playBtn} />
      </IconButton>
      {/*  */}
      <span>
        <Button variant="outlined" value={0.5} onClick={handlePlaybackRate}>
          0.5
        </Button>
        <Button variant="outlined" value={0.75} onClick={handlePlaybackRate}>
          0.75
        </Button>
        <Button variant="outlined" value={1} onClick={handlePlaybackRate}>
          1
        </Button>
      </span>

      <Box sx={{ width: 200 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
          <Slider
            color="headerbg"
            aria-label="Volume"
            value={volume}
            onChange={handleChange}
          />
          <VolumeUp />
        </Stack>
      </Box>
    </div>
  );
}
