"use client";
import { Box, Grid } from "@mui/material";
import RelationList from "./RelationList";
import RelationVisContent from "./RelationVisContent";

export default function Relationvis({ similarityData, setNodeId, nodeId }) {
  return (
    <Grid container justifyContent={"space-between"} spacing={3}>
      <Grid item xs={8}>
        <RelationVisContent
          similarityData={similarityData}
          setNodeId={setNodeId}
          nodeId={nodeId}
        />
      </Grid>
      <Grid item xs={4}>
        <Box height={"100%"} width={"100%"}>
          <RelationList nodeId={nodeId} />
        </Box>
      </Grid>
    </Grid>
  );
}
