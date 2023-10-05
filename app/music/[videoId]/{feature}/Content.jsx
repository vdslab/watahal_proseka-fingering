"use client";
import React, { useState, Suspense, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import FingeringVis from "./FingeringVis";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Loading from "../loading";
import { Box, Grid } from "@mui/material";

export default function Content({ videoId, fingering }) {
  const [playTimeState, setPlayTimeState] = useState({ current: 0, max: 0 });
  const [YTPlayer, setYTPlayer] = useState();
  const mainViewRef = useRef();

  return (
    <Grid container direction={"row"} alignItems="stretch" spacing={2}>
      <Grid item xs={8} ref={mainViewRef}>
        <Box
          bgcolor={"white"}
          height={"75vh"}
          // width={"45vw"}
        >
          <FingeringVis
            {...{
              fingering,
              minY: 0,
              YTPlayer,
              height: mainViewRef.current?.clientHeight,
              width: mainViewRef.current?.clientWidth,
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={4} container direction={"column"}>
        <Grid item xs height={"10vh"} overflow={"auto"}>
          <div>menu</div>
        </Grid>
        <Grid item xs height={"10vh"}>
          <VideoPlayer
            {...{
              videoId,
              setPlayTimeState,
              playTimeState,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
