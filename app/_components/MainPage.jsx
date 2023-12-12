"use client";
import React, { useEffect, useRef, useState } from "react";
import { Tabs, Tab, Stack } from "@mui/material";
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
    <Box hidden={value !== index} padding={3}>
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

export default function MainPage({ similarityData }) {
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

        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          ref={tabHeaderRef}
        >
          <Tab label="検索して探す" />
          <Tab label="似てる曲を探す" />
          <Tab label="曲一覧" />
        </Tabs>

        <Box justifyContent="center">
          <TabPanel value={currentTab} index={0}>
            <Search
              setSelectedMusicId={setSelectedMusicId}
              selectedMusicId={selectedMusicId}
            />
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              spacing={2}
            >
              <Box>
                <Search
                  setSelectedMusicId={setSelectedMusicId}
                  selectedMusicId={selectedMusicId}
                />
              </Box>
              <Box>
                <Relationvis
                  similarityData={similarityData}
                  setNodeId={setSelectedMusicId}
                  nodeId={selectedMusicId}
                />
              </Box>
            </Stack>
          </TabPanel>

          <TabPanel value={currentTab} index={2}>
            <Box paddingBottom={5}>
              <MusicList />
            </Box>
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
