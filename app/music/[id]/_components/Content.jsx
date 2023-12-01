"use client";
import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import ScoreOverview from "./scoreOverview/ScoreOverview";
import FingeringVis from "./fingering/FingeringVis";

export default function Content() {
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
        <ScoreOverview />
      </Box>
      <Box hidden={currentTab !== 1}>
        <FingeringVis  />
      </Box>
    </Box>
  );

  return;
}
