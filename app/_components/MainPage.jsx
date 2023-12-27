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
    background: { default: "#fff", light: "#EEF5FF", dark: "#9EB8D9" },
  },
});

function TabPanel({ value, index, children, padding }) {
  return (
    <Box hidden={value !== index} padding={padding} boxSizing={"border-box"}>
      {children}
    </Box>
  );
}

export default function MainPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedMusicId, setSelectedMusicId] = useState(null);

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

        <Tabs value={currentTab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="似てる曲から探す" />
          <Tab label="曲一覧" />
        </Tabs>

        <TabPanel value={currentTab} index={0} padding={3}>
          <Stack
            direction="column"
            alignItems="center"
            spacing={2}
            boxSizing={"border-box"}
            height={"70vh"}
          >
            <Box width={"60%"}>
              <Search
                setSelectedMusicId={setSelectedMusicId}
                selectedMusicId={selectedMusicId}
              />
            </Box>
            <Box
              width={"100%"}
              height={"100%"}
              boxSizing={"border-box"}
              boxShadow={1}
            >
              <Relationvis
                setNodeId={setSelectedMusicId}
                nodeId={selectedMusicId}
              />
            </Box>
          </Stack>
        </TabPanel>

        <TabPanel value={currentTab} index={1} padding={3}>
          <MusicList />
        </TabPanel>
      </Container>
    </ThemeProvider>
  );
}
