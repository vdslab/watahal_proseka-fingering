import { Box, CircularProgress, Container } from "@mui/material";
import Chart from "./Chart";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function FingeringVisContent({
  fingering,
  width,
  YTPlayer,
  height,
}) {
  // const params = useParams();
  // const { id } = params;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: music, error } = useSWR(`/api/music/${id}`, fetcher);
  const {
    data: score,
    isLoading: scoreLoading,
    error: scoreError,
  } = useSWR(`/api/music/musicScore/${id}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  if (error || scoreError) {
    return <div>Failed to load</div>;
  }

  if (YTPlayer === undefined || !music || scoreLoading) {
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
