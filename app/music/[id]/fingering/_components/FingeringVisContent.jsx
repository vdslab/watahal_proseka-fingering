import { Box, CircularProgress, Container } from "@mui/material";
import Chart from "./Chart";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { useRef } from "react";
const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function FingeringVisContent({ YTPlayer }) {
  const params = useParams();
  const { id } = params;
  const wrapperRef = useRef();

  const { data: music, error } = useSWR(`/api/music/${id}`, fetcher);
  const {
    data: score,
    isLoading: scoreLoading,
    error: scoreError,
  } = useSWR(`/api/music/musicScore/${id}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  if (error || scoreError) {
    return (
      <div>
        データの読み込みに失敗しました．ブラウザをリロードするか，サイトを一度閉じて再度開いてください
      </div>
    );
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

  const svgSize = {
    width: wrapperRef.current?.clientWidth,
    height: wrapperRef.current?.clientHeight,
  };

  return (
    <Box width={"100%"} height={"100%"} ref={wrapperRef}>
      <Chart
        svgSize={svgSize}
        YTPlayer={YTPlayer}
        score={score}
        id={id}
        music={music}
      />
    </Box>
  );
}
