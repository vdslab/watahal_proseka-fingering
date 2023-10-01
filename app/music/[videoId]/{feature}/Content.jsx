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

  return (
    <div>
      <Stack spacing={2} direction="row">
        <Box>
          <Suspense fallback={<Loading />}>
            <VideoPlayer {...{ videoId, setPlayTimeState, playTimeState }} />
          </Suspense>
        </Box>
        <Box
          bgcolor={"white"}
          height={"75vh"}
          width={"45vw"}
          ref={fingeringVisRef}
        >
          <FingeringVis
            {...{
              fingering,
              minY: 0,
              playTimeState,
              height: fingeringVisRef.current?.clientHeight,
              width: fingeringVisRef.current?.clientWidth,
            }}
          />
        </Box>
      </Stack>
    </div>
  );
}
