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

export default function VideoPlayer({
  videoId,
  setPlayTimeState,
  playTimeState,
}) {
  const [YTPlayer, setYTPlayer] = useState(null);
  const [playBtn, setPlayBtn] = useState(YouTube.PlayerState.UNSTARTED);
  const [seek, setSeek] = useState({ value: 0 });
  const [currentTime, setCrrentTime] = useState(0);
  const wrapperRef = useRef();
  const width = wrapperRef.current?.clientWidth;
  const height = wrapperRef.current?.clientHeight;

  const opts = {
    width: width,
    height: height,
    playerVars: {
      //controls: 0,
      autoplay: 1,
    },
  };

  function handleReady(e) {
    setYTPlayer(e.target);
    setPlayTimeState({ ...playTimeState, max: e.target?.getDuration() ?? 0 });
  }

  function setPlaybackRate(value) {
    YTPlayer.setPlaybackRate(value);
  }

  useEffect(() => {
    YTPlayer?.seekTo(seek.value, true);
    setPlayTimeState({ ...playTimeState, current: seek.value });
  }, [seek]);

  const [volume, setVolume] = useState(30);
  useEffect(() => {
    YTPlayer?.setVolume(volume);
  }, [volume]);

  return (
    <Box ref={wrapperRef} width={"100%"} height={"100%"}>
      <ThemeProvider theme={theme}>
        <div>
          {/* <TimeSlider
            playBtn={playBtn}
            currentTime={currentTime}
            setSeek={setSeek}
            setPlayTimeState={setPlayTimeState}
            playTimeState={playTimeState}
            max={YTPlayer != null ? YTPlayer.getDuration() : 300}
            YTPlayer={YTPlayer}
          /> */}
        </div>
        <div>
          {/* <VideoManagerButtons
            {...{ YTPlayer, setPlaybackRate, playBtn, volume, setVolume }}
          /> */}
        </div>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={handleReady}
          onPlaybackRateChange={() => {
            console.log("change rate");
          }}
          onStateChange={() => {
            setPlayBtn(YTPlayer.getPlayerState());
            setCrrentTime(YTPlayer.getCurrentTime());
            setPlayTimeState({
              ...playTimeState,
              current: YTPlayer.getCurrentTime(),
            });
            //console.log(YTPlayer.getCurrentTime());
          }}
        />
      </ThemeProvider>
    </Box>
  );
}
