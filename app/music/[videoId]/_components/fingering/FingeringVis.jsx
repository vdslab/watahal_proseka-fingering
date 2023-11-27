import { Box, Grid } from "@mui/material";
import FingeringVisContent from "./FingeringVisContent";
import SimilarityList from "../SimilarityList";
import VideoPlayer from "../VideoPlayer";
import { useState } from "react";

export default function FingeringVis({
  videoId,
  fingering,
  similarities,
  musicList,
  score,
  id,
}) {
  const [YTPlayer, setYTPlayer] = useState();

  return (
    <Grid container direction={"row"} alignItems="stretch" spacing={2}>
      <Grid item xs={8}>
        <Box bgcolor={"white"} height={"75vh"}>
          <FingeringVisContent
            fingering={fingering}
            minY={0}
            YTPlayer={YTPlayer}
            height={600}
            width={600}
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
}
