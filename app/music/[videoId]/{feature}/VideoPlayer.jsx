"use client";
import React, { useEffect, useState } from "react";
import TimeSlider from "./TimeSlider";
import VideoManagerButtons from "./VideoManagerButtons";
import YouTube, { YouTubePlayer } from "react-youtube";

export default function VideoPlayer({ videoId }) {
  const [YTPlayer, setYTPlayer] = useState(null);
  const [playBtn, setPlayBtn] = useState(YouTube.PlayerState.UNSTARTED);

  function handleReady(e) {
    setYTPlayer(e.target);
  }

  function setPlaybackRate(value) {
    YTPlayer.setPlaybackRate(value);
  }

  return (
    <>
      <div>
        <TimeSlider max={300} />
      </div>
      <div>
        <VideoManagerButtons {...{ YTPlayer, setPlaybackRate, playBtn }} />
      </div>
      <YouTube
        videoId={videoId}
        onReady={handleReady}
        onPlaybackRateChange={() => {
          console.log("change rate");
        }}
        onStateChange={() => {
          setPlayBtn(YTPlayer.getPlayerState());
        }}
      />
    </>
  );
}
