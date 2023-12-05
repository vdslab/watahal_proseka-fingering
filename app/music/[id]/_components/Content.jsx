"use client";
import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

// import ScoreOverview from "../overview/scoreOverview/ScoreOverview";
import FingeringVis from "../fingering/_components/FingeringVis";
import { redirect, useParams, useRouter } from "next/navigation";

export default function Content() {
  const [currentTab, setCurrentTab] = useState(0);
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
          onChange={(_, newTab) => {
            setCurrentTab(newTab);
            router.push(`/music/${id}${index2url[newTab]}`);
          }}
        >
          <Tab label="譜面の全体像" />
          <Tab label="運指" />
        </Tabs>

        {redirect(`/music/${id}/overview`)}
      </Box>
    </Box>
  );
}
