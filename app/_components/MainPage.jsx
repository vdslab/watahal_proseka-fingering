"use client";
import React, { useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Search from "./search/Search";
import Relationvis from "./musicRelation/RelationVis";
import MusicList from "./musicList/MusicList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

export default function MainPage({ musics, similarityData }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedMusicId, setSelectedMusicId] = useState(null);
  const [clacedHeight, setCalcedHeight] = useState();
  const tabHeaderRef = useRef();
  const searchRef = useRef();

  useEffect(() => {
    const tabSearchHeight =
      tabHeaderRef.current?.clientHeight + searchRef.current?.clientHeight;
    setCalcedHeight(`calc(90vh - ${tabSearchHeight}px - 10px)`);
  }, [tabHeaderRef.current, searchRef.current]);

  function handleTabChange(e, tabIndex) {
    setCurrentTab(tabIndex);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="ls">
        <Box textAlign="center" marginTop={10}>
          <h1>運指を参考に曲を予習しよう</h1>
        </Box>
        <Box textAlign="center" marginTop={-2}>
          <p>似てる曲から雰囲気もつかもう</p>
        </Box>

        <Box
          position="sticky"
          top={20}
          marginTop={5}
          sx={{ zIndex: "tooltip" }}
          ref={searchRef}
        >
          <Search
            setSelectedMusicId={setSelectedMusicId}
            selectedMusicId={selectedMusicId}
          />
        </Box>

        <Box marginTop={20} justifyContent="center">
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="fullWidth"
            ref={tabHeaderRef}
          >
            <Tab label="似てる曲を探す" />
            <Tab label="曲一覧" />
          </Tabs>

          <TabPanel value={currentTab} index={0}>
            <Box padding={3} sx={{ height: clacedHeight }}>
              <Relationvis
                similarityData={similarityData}
                setNodeId={setSelectedMusicId}
                nodeId={selectedMusicId}
              />
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
