"use client";
import React, { useEffect, useState } from "react";
import TimeSlider from "./TimeSlider";
import VideoManagerButtons from "./VideoManagerButtons";
import YouTube, { YouTubePlayer } from "react-youtube";
import {
  ConstructionOutlined,
  LocalConvenienceStoreOutlined,
} from "@mui/icons-material";

export default function VideoPlayer({ videoId }) {
  const [YTPlayer, setYTPlayer] = useState(null);
  const [playBtn, setPlayBtn] = useState(YouTube.PlayerState.UNSTARTED);
  const [seek, setSeek] = useState(0);

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

  function loop(playTime, finTime) {
    if (playTime >= finTime) {
      YTPlayer.seelTo(seek, true);
    }
  }

  useEffect(() => {
    if (YTPlayer != null) {
      YTPlayer.seekTo(seek, true);
    }
  }, [seek]);

  return (
    <>
      <div>
        <TimeSlider
          setSeek={setSeek}
          max={YTPlayer != null ? YTPlayer.getDuration() : 300}
        />
      </div>
      <div>
        <VideoManagerButtons {...{ YTPlayer, setPlaybackRate, playBtn }} />
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
          console.log(YTPlayer.getCurrentTime());
        }}
      />
    </>
  );
}
