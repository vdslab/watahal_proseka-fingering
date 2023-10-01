"use client";
import React, { useState, Suspense, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import FingeringVis from "./FingeringVis";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Loading from "../loading";
import { Box } from "@mui/material";

export default function Content({ videoId, fingering }) {
  const [playTimeState, setPlayTimeState] = useState({ current: 0, max: 0 });
  const fingeringVisRef = useRef();
  const videoPlayerRef = useRef();

  return (
    <div>
      <Stack direction="row" flexWrap={"wrap"} margin={2.5}>
        <Box height={"75vh"} width={"45vw"} ref={videoPlayerRef} margin={1}>
          <Suspense fallback={<Loading />}>
            <VideoPlayer
              {...{
                videoId,
                setPlayTimeState,
                playTimeState,
                width: videoPlayerRef.current?.clientWidth,
                height: videoPlayerRef.current?.clientHeight,
              }}
            />
          </Suspense>
        </Box>
        <Box
          bgcolor={"white"}
          height={"75vh"}
          width={"45vw"}
          ref={fingeringVisRef}
          margin={1}
        >
          <FingeringVis
            {...{
              fingering,
              minY: 0,
              playTimeState,
              height: fingeringVisRef.current?.clientHeight,
            }}
          />
        </Box>
      </Stack>
    </div>
  );
}
