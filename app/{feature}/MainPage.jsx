"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Search from "./Search";
import ClusteringVis from "./ClusteringVis";
import MusicList from "./MusicList";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#ff55aa" },
    secondary: { main: "#464366" },
    headerbg: { main: "#acfef4" },
    background: { default: "#fff" },
  },
});

function TabPanel({ value, index, children }) {
  return (
    <div hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

export default function MainPage({ musics, clusteringData }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [id, setId] = useState(null);
  function handleTabChange(e, tabIndex) {
    setCurrentTab(tabIndex);
  }

  return (
    <ThemeProvider theme={theme}>
      <Tabs value={currentTab} onChange={handleTabChange} variant="fullWidth">
        <Tab label="曲検索" />
        <Tab label="曲一覧" />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        <div>
          <ClusteringVis {...{ clusteringData, id }} />
          <Search data={musics} setId={setId} />
        </div>
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <MusicList musics={musics} />
      </TabPanel>
    </ThemeProvider>
  );
}
