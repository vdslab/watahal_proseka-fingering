"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Search from "./Search";
import ClusteringVis from "./ClusteringVis";
import MusicList from "./MusicList";

function TabPanel({ value, index, children }) {
  return (
    <div hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

export default function MainPage({ musics, clusteringData }) {
  const [currentTab, setCurrentTab] = useState(0);
  function handleTabChange(e, tabIndex) {
    setCurrentTab(tabIndex);
  }

  return (
    <div>
      <Tabs value={currentTab} onChange={handleTabChange} variant="fullWidth">
        <Tab label="曲検索" />
        <Tab label="曲一覧" />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        <div>
          <ClusteringVis {...{ clusteringData }} />
          <Search data={musics} />
        </div>
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <MusicList musics={musics} />
      </TabPanel>
    </div>
  );
}
