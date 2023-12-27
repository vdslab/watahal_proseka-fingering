"use client";
import { Box, Grid, Stack } from "@mui/material";
import RelationList from "./RelationList";
import RelationVisContent from "./RelationVisContent";
import useSWR from "swr";
import RangeSlider from "./RangeSlider";
import { useState } from "react";
import * as d3 from "d3";

export default function Relationvis({ setNodeId, nodeId }) {
  const { data, error, isLoading } = useSWR("/api/graph", (url) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data)
  );
  const nodes = data?.nodes;
  const levelRange = d3.extent(nodes ?? [], ({ level }) => level);
  const [selectLevelRange, setSelectLevelRange] = useState(levelRange);

  if (error) return <p>failed to load</p>;
  if (isLoading) return <p>loading data...</p>;

  function handleLevelRangeChange(newValue) {
    setSelectLevelRange(newValue);
  }
  console.log(data);

  return (
    <Stack boxSizing={"border-box"} height={"100%"} width={"100%"} spacing={1}>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={7}>
            <Box bgcolor={"background.light"} padding={2} boxShadow={1}>
              <RangeSlider
                range={levelRange}
                handleLevelRangeChange={handleLevelRangeChange}
              />
            </Box>
          </Grid>
          <Grid item />
        </Grid>
      </Box>
      <Box height={"100%"}>
        <Grid container spacing={1} boxSizing={"border-box"} height={"100%"}>
          <Grid item xs={7} height={"100%"} boxSizing={"border-box"}>
            <RelationVisContent
              similarityData={data}
              setNodeId={setNodeId}
              nodeId={nodeId}
              levelRange={levelRange}
              selectLevelRange={selectLevelRange}
              setSelectLevelRange={setSelectLevelRange}
            />
          </Grid>
          <Grid item xs>
            <Box
              width={"100%"}
              height={"100%"}
              boxSizing={"border-box"}
              boxShadow={1}
            >
              <RelationList nodeId={nodeId} setNodeId={setNodeId} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
