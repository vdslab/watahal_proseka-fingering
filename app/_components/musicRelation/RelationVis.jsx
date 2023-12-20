"use client";
import { Box, Grid } from "@mui/material";
import RelationList from "./RelationList";
import RelationVisContent from "./RelationVisContent";
import useSWR from "swr";

export default function Relationvis({ setNodeId, nodeId }) {
  const { data, error, isLoading } = useSWR("/api/graph", (url) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.nodes[0]);
        return data;
      })
  );
  if (error) return <p>failed to load</p>;
  if (isLoading) return <p>loading data...</p>;

  return (
    <Grid container justifyContent={"space-between"} spacing={3}>
      <Grid item xs={7}>
        <RelationVisContent
          similarityData={data}
          setNodeId={setNodeId}
          nodeId={nodeId}
        />
      </Grid>
      <Grid item xs={5}>
        <Box height={"100%"} width={"100%"}>
          <RelationList nodeId={nodeId} />
        </Box>
      </Grid>
    </Grid>
  );
}
