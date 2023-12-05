"use client";
import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import { redirect, useParams, useRouter } from "next/navigation";
import FingeringVis from "./_components/FingeringVis";

export default function Overview() {
  const [currentTab, setCurrentTab] = useState(1);
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const index2url = {
    0: "/overview",
    1: "/fingering",
  };

  return (
    <Box padding={3}>
      <Box borderBottom={1} marginBottom={3}>
        <Tabs
          value={currentTab}
          onChange={(_, newTab) => router.push(`/music/${id}/overview`)}
        >
          <Tab label="譜面の全体像" />
          <Tab label="運指" />
        </Tabs>
      </Box>

      <FingeringVis />
    </Box>
  );
}
