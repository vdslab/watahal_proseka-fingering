"use client";
import React, { useEffect, useState } from "react";
import TimeSlider from "./TimeSlider";
import VideoManagerButtons from "./VideoManagerButtons";
import YouTube, { YouTubePlayer } from "react-youtube";

export default function VideoPlayer({ videoid }) {
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
      {/* url: https://www.youtube.com/embed/lIfHd0bEDNQ */}
      <YouTube
        videoId={videoid}
        onReady={handleReady}
        onPlaybackRateChange={() => {
          console.log("change rate");
        }}
        onStateChange={() => {
          setPlayBtn(YTPlayer.getPlayerState());
        }}
      />
      {/* <iframe
        // width="100%"
        height="100%"
        src="https://www.youtube.com/embed/lIfHd0bEDNQ"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe> */}
    </>
  );
}
