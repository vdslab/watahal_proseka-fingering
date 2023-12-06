import { Box, Grid, Typography } from "@mui/material";
import FingeringVisContent from "./FingeringVisContent";
import SimilarityList from "../../_components/SimilarityList";
import VideoPlayer from "../../_components/VideoPlayer";
import { useState } from "react";

export default function FingeringVis({ selectMeasure }) {
  const [YTPlayer, setYTPlayer] = useState();

  return (
    <>
      <Grid container direction={"row"} alignItems="stretch" spacing={2}>
        <Grid item xs={7}>
          <Box bgcolor={"white"} height={"75vh"}>
            <FingeringVisContent minY={0} YTPlayer={YTPlayer} height={600} />
          </Box>
        </Grid>
        <Grid item xs={5} container direction={"column"}>
          <Grid item xs height={"10vh"} overflow={"auto"}>
            <SimilarityList />
          </Grid>
          <Grid item xs height={"10vh"}>
            <VideoPlayer
              YTPlayer={YTPlayer}
              setYTPlayer={setYTPlayer}
              selectMeasure={selectMeasure}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
