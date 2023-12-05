import { Box, Grid, Typography } from "@mui/material";
import FingeringVisContent from "./FingeringVisContent";
import SimilarityList from "../SimilarityList";
import VideoPlayer from "../VideoPlayer";
import { useState } from "react";

export default function FingeringVis() {
  const [YTPlayer, setYTPlayer] = useState();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        運指
      </Typography>
      <Grid container direction={"row"} alignItems="stretch" spacing={2}>
        <Grid item xs={8}>
          <Box bgcolor={"white"} height={"75vh"}>
            <FingeringVisContent minY={0} YTPlayer={YTPlayer} height={600} />
          </Box>
        </Grid>
        <Grid item xs={4} container direction={"column"}>
          <Grid item xs height={"10vh"} overflow={"auto"}>
            <SimilarityList />
          </Grid>
          <Grid item xs height={"10vh"}>
            <VideoPlayer YTPlayer={YTPlayer} setYTPlayer={setYTPlayer} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
