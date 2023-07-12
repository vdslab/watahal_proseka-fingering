"use client";
import React, { useState } from "react";
import TimeSlider from "./TimeSlider";
import VideoManagerButtons from "./VideoManagerButtons";
import YouTube, { YouTubePlayer } from "react-youtube";

export default function VideoPlayer() {
  const [YTPlayer, setYTPlayer] = useState(null);
  function handleReady(e) {
    setYTPlayer(e.target);
    console.log(e.target);
  }
  return (
    <>
      <div>
        <TimeSlider max={300} />
      </div>
      <div>
        <VideoManagerButtons YTPlayer={YTPlayer} />
      </div>
      {/* url: https://www.youtube.com/embed/lIfHd0bEDNQ */}
      <YouTube videoId="lIfHd0bEDNQ" onReady={handleReady} />
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
