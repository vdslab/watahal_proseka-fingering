"use client";
import React, { useEffect, useState } from "react";
import TimeSlider from "./TimeSlider";
import VideoManagerButtons from "./VideoManagerButtons";
import YouTube, { YouTubePlayer } from "react-youtube";
import {
  ConstructionOutlined,
  LocalConvenienceStoreOutlined,
} from "@mui/icons-material";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#ff55aa" },
    secondary: { main: "#464366" },
    headerbg: { main: "#acfef4" },
    background: { default: "#fff" },
  },
});

export default function VideoPlayer({ videoId }) {
  const [YTPlayer, setYTPlayer] = useState(null);
  const [playBtn, setPlayBtn] = useState(YouTube.PlayerState.UNSTARTED);
  const [seek, setSeek] = useState({ value: 0 });
  const [currentTime, setCrrentTime] = useState(0);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      controls: 0,
      autoplay: 1,
    },
  };

  function handleReady(e) {
    setYTPlayer(e.target);
  }

  function setPlaybackRate(value) {
    YTPlayer.setPlaybackRate(value);
  }

  useEffect(() => {
    YTPlayer?.seekTo(seek.value, true);
  }, [seek]);

  const [volume, setVolume] = useState(30);
  useEffect(() => {
    YTPlayer?.setVolume(volume);
  }, [volume]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div>
          <TimeSlider
            playBtn={playBtn}
            currentTime={currentTime}
            setSeek={setSeek}
            max={YTPlayer != null ? YTPlayer.getDuration() : 300}
          />
        </div>
        <div>
          <VideoManagerButtons
            {...{ YTPlayer, setPlaybackRate, playBtn, volume, setVolume }}
          />
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
            //console.log(YTPlayer.getCurrentTime());
          }}
        />
      </ThemeProvider>
    </>
  );
}
