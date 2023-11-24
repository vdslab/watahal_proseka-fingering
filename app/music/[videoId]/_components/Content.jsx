"use client";
import React, { useState, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import FingeringVis from "./FingeringVis";
import {
  Box,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import SimilarityList from "./SimilarityList";
import ComplexityMusicScore from "./complexityMusicScore/MusicScore";

import DoneIcon from "@mui/icons-material/Done";
export default function Content({
  videoId,
  fingering,
  similarities,
  musicList,
  score,
  id,
}) {
  const [playTimeState, setPlayTimeState] = useState({ current: 0, max: 0 });
  const [YTPlayer, setYTPlayer] = useState();
  const mainViewRef = useRef();
  const [showComplexity, setShowComplexity] = useState(true);
  const [chipData, setChipData] = useState([
    { label: "complexity", selected: true },
    { label: "fingering", selected: false, disabled: true },
  ]);

  const fingeringVis = (
    <Grid container direction={"row"} alignItems="stretch" spacing={2}>
      <Grid item xs={8} ref={mainViewRef}>
        <Box bgcolor={"white"} height={"75vh"}>
          <FingeringVis
            fingering={fingering}
            minY={0}
            YTPlayer={YTPlayer}
            height={mainViewRef.current?.clientHeight}
            width={mainViewRef.current?.clientWidth}
            score={score}
            id={id}
          />
        </Box>
      </Grid>
      <Grid item xs={4} container direction={"column"}>
        <Grid item xs height={"10vh"} overflow={"auto"}>
          <SimilarityList similarities={similarities} musicList={musicList} />
        </Grid>
        <Grid item xs height={"10vh"}>
          <VideoPlayer
            {...{
              videoId,
              YTPlayer,
              setYTPlayer,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Box padding={3}>
      <Box marginBottom={2}>
        <Button
          variant="contained"
          onClick={() => {
            setShowComplexity(!showComplexity);
          }}
        >
          {showComplexity ? "動画と一緒に運指を見る" : "譜面の複雑さを見る"}
        </Button>
        <Box
          component={"ul"}
          display={"flex"}
          justifyContent={"start"}
          flexWrap={"nowrap"}
          width={"20%"}
        >
          {chipData.map(({ label, selected, disabled }, index) => (
            <ListItem key={index}>
              <Chip
                label={label}
                variant={selected ? "filled" : "outlined"}
                color="primary"
                icon={selected ? <DoneIcon /> : <span />}
                onClick={() => {
                  const newChipData = [...chipData];
                  newChipData[index].selected = !newChipData[index].selected;
                  setChipData(newChipData);
                }}
                disabled={disabled}
              />
            </ListItem>
          ))}
        </Box>
      </Box>
      {showComplexity ? (
        <>
          <Typography variant="h4" gutterBottom>
            譜面の複雑さ
          </Typography>
          <Typography variant="body1" gutterBottom>
            色が濃いほど複雑であることを表しています．
          </Typography>
          <ComplexityMusicScore
            id={id}
            view={chipData.find(({ label }) => label === "complexity").selected}
          />
        </>
      ) : (
        fingeringVis
      )}
    </Box>
  );

  return;
}
