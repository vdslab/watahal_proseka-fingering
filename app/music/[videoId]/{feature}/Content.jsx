"use client";
import React, { useState, Suspense } from "react";
import VideoPlayer from "./VideoPlayer";
import FingeringVis from "./FingeringVis";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Loading from "../loading";
import { Box } from "@mui/material";

export default function Content({ videoId, fingering }) {
  const [playTimeState, setPlayTimeState] = useState({ current: 0, max: 0 });

  return (
    <div>
      <Stack spacing={2} direction="row">
        <Box>
          <Suspense fallback={<Loading />}>
            <VideoPlayer {...{ videoId, setPlayTimeState, playTimeState }} />
          </Suspense>
        </Box>
        <Box
          sx={{
            maxHeight: "75vh",
            width: "50vw",
            overflowY: "auto",
            backgroundColor: "white",
          }}
        >
          <FingeringVis
            {...{
              fingering,
              minY: 0,
              playTimeState,
            }}
          />
        </Box>
      </Stack>
    </div>
  );
}
