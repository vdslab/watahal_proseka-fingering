"use client";
import useSWR from "swr";
import NoteScore from "../fingering/NoteScore";
import LineSkeleton from "../fingering/LineSkeleton";
import * as d3 from "d3";
import { Box, Stack } from "@mui/material";

import { separateScore } from "./separeteScore";

const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function ComplexityMusicScore({ id }) {
  const { data, error, isLoading } = useSWR(
    `/api/music/musicScore/${id}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const width = 100;
  const height = 600;

  const ys = data.map(({ y }) => y);
  const separateNumber = 4;
  const separetedScore = separateScore(data, separateNumber);
  const xScale = d3.scaleLinear().domain([0, 12]).range([0, width]).nice(10);
  const yScales = separetedScore.map((score, i) => {
    return d3
      .scaleLinear()
      .domain([i * separateNumber, (i + 1) * separateNumber])
      .range([height - 20, 20])
      .nice(10);
  });
  const widthScale = d3.scaleLinear().domain([0, 12]).range([0, width]).nice();

  return (
    <Box display={"flex"} overflow={"auto"}>
      {separetedScore.map((score, i) => {
        return (
          <Box margin={1} key={i} bgcolor={"white"} padding={1}>
            <svg width={width} height={height}>
              <g>
                <LineSkeleton
                  maxY={separateNumber}
                  xScale={xScale}
                  height={height}
                />
                <NoteScore
                  score={score}
                  scales={{ xScale, yScale: yScales[i], widthScale }}
                  noteheight={4}
                />
              </g>
            </svg>
          </Box>
        );
      })}
    </Box>
  );
}
