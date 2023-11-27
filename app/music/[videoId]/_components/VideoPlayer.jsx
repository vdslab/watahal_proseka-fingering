"use client";
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
      autoplay: 0,
    },
  };

  function handleReady(e) {
    setYTPlayer(e.target);
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
