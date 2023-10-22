import { Box, CircularProgress, Container } from "@mui/material";
import Chart from "./fingering/Chart";
import useSWR from "swr";
const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function FingeringVis({
  fingering,
  width,
  YTPlayer,
  height,
  score,
  id,
}) {
  const { data: music, error } = useSWR(`/api/music/${id}`, fetcher);

  if (error) return <div>Failed to load</div>;

  if (YTPlayer === undefined || !music) {
    return (
      <Container sx={{ height: "100%" }}>
        <Box
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const left = fingering["left"]?.map(
    ({ x, y, width, type, judge_type, hold_type, hole }) => ({
      x,
      y,
      width,
      type,
      judge_type,
      hold_type,
      hole,
    })
  );
  // .filter(({ y }) => minY <= y && y <= minY + 4);
  const right = fingering["right"]?.map(
    ({ x, y, width, type, judge_type, hold_type, hole }) => ({
      x,
      y,
      width,
      type,
      judge_type,
      hold_type,
      hole,
    })
  );

  const maxY = Math.ceil(
    Math.max.apply(
      right.map(function (o) {
        return o.y;
      }),
      left.map(function (o) {
        return o.y;
      })
    )
  );

  return (
    <Chart
      width={width}
      height={height}
      left={left}
      right={right}
      maxY={maxY}
      YTPlayer={YTPlayer}
      score={score}
      id={id}
      music={music}
    />
  );
}
