"use client";
import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import FingeringVis from "./_components/FingeringVis";

export default function Overview() {
  const [currentTab, setCurrentTab] = useState(1);
  const params = useParams();
  const searchParams = useSearchParams();
  const measureParam = searchParams.get("measure");
  const selectMeasure = measureParam ? parseFloat(measureParam) : 0;
  const { id } = params;
  const router = useRouter();

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

      <FingeringVis selectMeasure={selectMeasure} />
    </Box>
  );
}
