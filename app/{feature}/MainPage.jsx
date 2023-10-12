"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Search from "./Search";
//import ClusteringVis from "./ClusteringVis";
import Relationvis from "./RelationVis";
import MusicList from "./MusicList";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

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

export default function MainPage({ musics, clusteringData, similarityData }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [id, setId] = useState(null);
  const [nodeId, setNodeId] = useState(null);
  function handleTabChange(e, tabIndex) {
    setCurrentTab(tabIndex);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="ls">
        <Box textAlign="center" marginTop={10}>
          <h1>運指可視化</h1>
        </Box>
        <Box textAlign="center" marginTop={-2}>
          <p>最適化された運指を参考にしよう</p>
        </Box>

        <Box
          position="sticky"
          top={20}
          marginTop={5}
          sx={{ zIndex: "tooltip" }}
        >
          <Search data={musics} setId={setId} />
        </Box>

        <Box marginTop={20} justifyContent="center">
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="fullWidth"
          >
            <Tab label="似てる曲を探す" />
            <Tab label="曲一覧" />
          </Tabs>

          <TabPanel value={currentTab} index={0}>
            <Box padding={5}>
              {/* <ClusteringVis {...{ clusteringData, id }} /> */}
              <Relationvis
                similarityData={similarityData}
                setNodeId={setNodeId}
              />
              {/* <Search data={musics} setId={setId} nodeId={nodeId} /> */}
            </Box>
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <Box paddingBottom={5}>
              <MusicList musics={musics} />
            </Box>
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
