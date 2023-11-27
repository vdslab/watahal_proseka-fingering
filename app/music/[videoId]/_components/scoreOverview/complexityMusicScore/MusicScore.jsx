"use client";
import useSWR from "swr";
import NoteScore from "../../fingering/NoteScore";
import LineSkeleton from "../../fingering/LineSkeleton";
import * as d3 from "d3";
import { Box, Stack } from "@mui/material";

import { separateScore } from "./separeteScore";
import ComplexityHeatMap from "./ComplexityHeatMap";
import GrayScaleSlider from "./GrayScaleSlider";
import { useState } from "react";

const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function ComplexityMusicScore({ id, view }) {
  const { data, error, isLoading } = useSWR(
    `/api/music/musicScore/${id}`,
    fetcher
  );

  const {
    data: complexityInfo,
    error: complexityError,
    isLoading: complexityIsLoading,
  } = useSWR(`/api/music/complexity/${id}`, fetcher);

  const grayScaleMax = 100;
  const [grayScaleValue, setGrayScaleValue] = useState(grayScaleMax);

  if (error || complexityError) return <div>failed to load</div>;
  if (isLoading || complexityIsLoading) return <div>loading...</div>;

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const width = 100;
  const height = 600;

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

  const { status_by_measure } = complexityInfo;
  const length = Math.ceil(status_by_measure.length / separateNumber);
  const separateComplexity = Array(length)
    .fill()
    .map((_, i) =>
      status_by_measure.filter(
        (_, j) => i * separateNumber <= j && j < (i + 1) * separateNumber
      )
    );
  const complexityColorScale = d3
    .scaleSequential(d3.interpolateYlOrRd)
    .domain(d3.extent(status_by_measure, (d) => d));

  return (
    <Box>
      <GrayScaleSlider
        setGrayScaleValue={setGrayScaleValue}
        max={grayScaleMax}
      />
      <Box display={"flex"} overflow={"auto"}>
        {separetedScore.map((score, i) => {
          const complexity = separateComplexity[i];
          const ys = Array(separateNumber)
            .fill()
            .map((_, i) => Math.floor(score[0].y / 4) * 4 + i + 1);
          return (
            <Box marginRight={1} key={i} bgcolor={"white"} padding={1}>
              <svg width={width} height={height}>
                <g>
                  <LineSkeleton
                    maxY={separateNumber}
                    xScale={xScale}
                    height={height}
                  />
                  {view && (
                    <ComplexityHeatMap
                      id={id}
                      complexity={complexity}
                      scales={{
                        xScale,
                        yScale: yScales[i],
                        widthScale,
                        colorScale: complexityColorScale,
                      }}
                      ys={ys}
                    />
                  )}

                  <NoteScore
                    score={score}
                    scales={{ xScale, yScale: yScales[i], widthScale }}
                    noteheight={4}
                    opacity={1}
                    grayScale={grayScaleValue / grayScaleMax}
                  />
                </g>
              </svg>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
