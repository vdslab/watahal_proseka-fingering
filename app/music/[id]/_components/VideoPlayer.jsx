"use client";
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";
import useSWR from "swr";
import { useParams } from "next/navigation";

const theme = createTheme({
  palette: {
    primary: { main: "#ff55aa" },
    secondary: { main: "#464366" },
    headerbg: { main: "#acfef4" },
    background: { default: "#fff" },
  },
});

export default function VideoPlayer({ YTPlayer, setYTPlayer, selectMeasure }) {
  const [volume, setVolume] = useState(30);
  const wrapperRef = useRef();
  const params = useParams();
  const { id } = params;

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
    return (
      <div>
        データの読み込みに失敗しました．ブラウザをリロードするか，サイトを一度閉じて再度開いてください
      </div>
    );
  }
  if (musicInfoLoading) {
    return <CircularProgress />;
  }

  const { videoid: videoId, measureRange, sec } = musicInfo;

  const width = wrapperRef.current?.clientWidth;
  const height = wrapperRef.current?.clientHeight;

  const opts = {
    width: width,
    height: height,
    playerVars: {
      autoplay: 0,
    },
  };

  const selectTime =
    (selectMeasure * sec) / (measureRange[1] - measureRange[0]);

  return (
    <Box ref={wrapperRef} width={"100%"} height={"100%"}>
      <ThemeProvider theme={theme}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={(e) => {
            handleReady(e);
            e.target?.seekTo(selectTime, true);
          }}
        />
      </ThemeProvider>
    </Box>
  );
}
