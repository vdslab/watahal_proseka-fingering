"use client";
import React, { useState, Suspense } from "react";
import VideoPlayer from "./VideoPlayer";
import FingeringVis from "./FingeringVis";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Loading from "../loading";
import { Box } from "@mui/material";

export default function Content({ videoId, fingering }) {
  const [playerLength, setPlayerLength] = useState(0);

  const [playSeconds, setPlaySeconds] = useState(0);
  const [playerState, setPlayerState] = useState(-1);

  console.log(playerLength, playSeconds, playerState);

  return (
    <div>
      <Stack spacing={2} direction="row">
        <Box>
          <Suspense fallback={<Loading />}>
            <VideoPlayer
              {...{ videoId, setPlayerLength, setPlaySeconds, setPlayerState }}
            />
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
              playerLength,
              playSeconds,
              playerState,
            }}
          />
        </Box>
      </Stack>
    </div>
  );
}
