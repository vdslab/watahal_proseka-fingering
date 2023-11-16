"use client";
import useSWR from "swr";
import NoteScore from "../fingering/NoteScore";
import LineSkeleton from "../fingering/LineSkeleton";
import * as d3 from "d3";
import { Box, Stack } from "@mui/material";

import { separateScore } from "./separeteScore";

const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function MusicScore({ id }) {
  const { data, error, isLoading } = useSWR(
    `/api/music/musicScore/${id}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const width = 100;
  const height = 600;

  const ys = data.map(({ y }) => y);
  // console.log(ys[ys.length - 1]);
  const separateNumber = 5;
  const separetedScore = separateScore(data, separateNumber);
  // console.log(separetedScore);
  const xScale = d3.scaleLinear().domain([0, 12]).range([0, width]).nice(10);
  const yScales = separetedScore.map((score) =>
    d3
      .scaleLinear()
      .domain(d3.extent(score.map(({ y }) => y)))
      .range([0, height])
      .nice(10)
  );
  const widthScale = d3.scaleLinear().domain([0, 12]).range([0, width]).nice();

  return (
    <Box display={"flex"} overflow={"auto"}>
      {separetedScore.map((score, i) => {
        // console.log(i, score);
        return (
          <Box margin={1}>
            <svg width={width} height={height}>
              <rect x1={0} y1={0} width={width} height={height} fill="white" />
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
