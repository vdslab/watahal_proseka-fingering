"use client";
import React, { useEffect, useRef, useState } from "react";
import TimeSlider from "./TimeSlider";
import VideoManagerButtons from "./VideoManagerButtons";
import YouTube, { YouTubePlayer } from "react-youtube";
import {
  ConstructionOutlined,
  LocalConvenienceStoreOutlined,
} from "@mui/icons-material";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#ff55aa" },
    secondary: { main: "#464366" },
    headerbg: { main: "#acfef4" },
    background: { default: "#fff" },
  },
});

export default function VideoPlayer({ videoId, YTPlayer, setYTPlayer }) {
  const wrapperRef = useRef();
  const width = wrapperRef.current?.clientWidth;
  const height = wrapperRef.current?.clientHeight;

  const opts = {
    width: width,
    height: height,
    playerVars: {
      autoplay: 1,
    },
  };

  function handleReady(e) {
    setYTPlayer(e.target);
  }

  function setPlaybackRate(value) {
    YTPlayer.setPlaybackRate(value);
  }

  const [volume, setVolume] = useState(30);
  useEffect(() => {
    YTPlayer?.setVolume(volume);
  }, [volume]);

  return (
    <Box ref={wrapperRef} width={"100%"} height={"100%"}>
      <ThemeProvider theme={theme}>
        <YouTube videoId={videoId} opts={opts} onReady={handleReady} />
      </ThemeProvider>
    </Box>
  );
}
