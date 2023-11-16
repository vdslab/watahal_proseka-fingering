"use client";
import React, { useState, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import FingeringVis from "./FingeringVis";
import { Box, Grid } from "@mui/material";
import SimilarityList from "./SimilarityList";
import MusicScore from "./musicScore/MusicScore";

export default function Content({
  videoId,
  fingering,
  similarities,
  musicList,
  score,
  id,
}) {
  const [playTimeState, setPlayTimeState] = useState({ current: 0, max: 0 });
  const [YTPlayer, setYTPlayer] = useState();
  const mainViewRef = useRef();

  return <MusicScore id={id} />;

  return (
    <Grid container direction={"row"} alignItems="stretch" spacing={2}>
      <Grid item xs={8} ref={mainViewRef}>
        <Box bgcolor={"white"} height={"75vh"}>
          <FingeringVis
            fingering={fingering}
            minY={0}
            YTPlayer={YTPlayer}
            height={mainViewRef.current?.clientHeight}
            width={mainViewRef.current?.clientWidth}
            score={score}
            id={id}
          />
        </Box>
      </Grid>
      <Grid item xs={4} container direction={"column"}>
        <Grid item xs height={"10vh"} overflow={"auto"}>
          <SimilarityList similarities={similarities} musicList={musicList} />
        </Grid>
        <Grid item xs height={"10vh"}>
          <VideoPlayer
            {...{
              videoId,
              YTPlayer,
              setYTPlayer,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
