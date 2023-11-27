"use client";
import React, { useState, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import FingeringVisContent from "./fingering/FingeringVisContent";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import SimilarityList from "./SimilarityList";

import ScoreOverview from "./scoreOverview/ScoreOverview";
import FingeringVis from "./fingering/FingeringVis";
export default function Content({
  videoId,
  fingering,
  similarities,
  musicList,
  score,
  id,
}) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Box padding={3}>
      <Box borderBottom={1} marginBottom={3}>
        <Tabs
          value={currentTab}
          onChange={(_, newTab) => setCurrentTab(newTab)}
        >
          <Tab label="譜面の全体像" />
          <Tab label="運指" />
        </Tabs>
      </Box>

      <Box hidden={currentTab !== 0}>
        <ScoreOverview id={id} />
      </Box>
      <Box hidden={currentTab !== 1}>
        <FingeringVis
          videoId={videoId}
          fingering={fingering}
          similarities={similarities}
          musicList={musicList}
          score={score}
          id={id}
        />
      </Box>
    </Box>
  );

  return;
}
