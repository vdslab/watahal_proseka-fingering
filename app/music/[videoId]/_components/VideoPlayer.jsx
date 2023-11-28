"use client";
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import useSWR from "swr";
import { useParams, useSearchParams } from "next/navigation";

const theme = createTheme({
  palette: {
    primary: { main: "#ff55aa" },
    secondary: { main: "#464366" },
    headerbg: { main: "#acfef4" },
    background: { default: "#fff" },
  },
});

export default function VideoPlayer({ YTPlayer, setYTPlayer }) {
  const [volume, setVolume] = useState(30);
  const wrapperRef = useRef();
  // const params = useParams();
  // const { id } = params;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    data: musicInfo,
    isLoading: musicInfoLoading,
    error: musicInfoError,
  } = useSWR(`/api/music/${id}`, (url) => fetch(url).then((res) => res.json()));

  useEffect(() => {
    YTPlayer?.setVolume(volume);
  }, [volume]);

  function handleReady(e) {
    setYTPlayer(e.target);
  }

  if (musicInfoError || id == null) {
    return <div>failed to load</div>;
  }
  if (musicInfoLoading) {
    return <div>loading...</div>;
  }

  const { videoid: videoId } = musicInfo;

  const width = wrapperRef.current?.clientWidth;
  const height = wrapperRef.current?.clientHeight;

  const opts = {
    width: width,
    height: height,
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <Box ref={wrapperRef} width={"100%"} height={"100%"}>
      <ThemeProvider theme={theme}>
        <YouTube videoId={videoId} opts={opts} onReady={handleReady} />
      </ThemeProvider>
    </Box>
  );
}
