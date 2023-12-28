"use client";
import useSWR from "swr";
import * as d3 from "d3";
import { Box, CircularProgress, Stack } from "@mui/material";

import { separateScore } from "./separeteScore";
import ComplexityHeatMap from "./ComplexityHeatMap";
import { useState } from "react";
import { useParams } from "next/navigation";
import NoteScore from "@/app/music/[id]/fingering/_components/NoteScore";
import LineSkeleton from "@/app/music/[id]/fingering/_components/LineSkeleton";
import Fingering from "@/app/music/[id]/fingering/_components/Fingering";

const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function MusicScore({ view, showFingering, grayScaled }) {
  const params = useParams();
  const { id } = params;

  const { data, error, isLoading } = useSWR(
    `/api/music/musicScore/${id}`,
    fetcher
  );

  const {
    data: complexityInfo,
    error: complexityError,
    isLoading: complexityIsLoading,
  } = useSWR(`/api/music/complexity/${id}`, fetcher);

  const {
    data: fingering,
    error: fingeringError,
    isLoading: fingeringIsLoading,
  } = useSWR(`/api/music/fingering/${id}`, fetcher);

  const grayScaleMax = 100;
  const [grayScaleValue, setGrayScaleValue] = useState(grayScaleMax);

  if (error || complexityError || fingeringError) {
    return (
      <div>
        データの読み込みに失敗しました．ブラウザをリロードするか，サイトを一度閉じて再度開いてください
      </div>
    );
  }
  if (isLoading || complexityIsLoading || fingeringIsLoading) {
    return <CircularProgress />;
  }

  const width = 100;
  const height = 600;

  const separateNumber = 4;
  const separetedScore = separateScore(data, separateNumber);
  const separatedFingering = {
    left: separateScore(fingering.left, separateNumber),
    right: separateScore(fingering.right, separateNumber),
  };

  const xScale = d3.scaleLinear().domain([0, 12]).range([0, width]).nice(10);
  const yScales = separetedScore.map((score, i) => {
    return d3
      .scaleLinear()
      .domain([i * separateNumber, (i + 1) * separateNumber])
      .range([height - 20, 20])
      .nice(10);
  });
  const widthScale = d3.scaleLinear().domain([0, 12]).range([0, width]).nice();

  const lines = separetedScore.map((_, i) => {
    return d3
      .line()
      .curve(d3.curveCatmullRom.alpha(0.5))
      .x(({ x, width }) => xScale(x + width / 2))
      .y(({ y }) => yScales[i](y));
  });

  const { status_by_measure } = complexityInfo;
  const length = Math.ceil(status_by_measure.length / separateNumber + 1);
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

  const separetedData = separetedScore.map((score, i) => ({
    score,
    fingering: {
      left: separatedFingering.left[i],
      right: separatedFingering.right[i],
    },
    complexity: separateComplexity[i],
    yScale: yScales[i],
    line: lines[i],
  }));

  return (
    <Stack
      direction={"row"}
      spacing={1}
      overflow={"auto"}
      boxSizing={"border-box"}
    >
      {separetedData.map(
        ({ score, fingering, complexity, yScale, line }, i) => {
          const ys = Array(separateNumber)
            .fill()
            .map((_, id) => i * separateNumber + id + 1);
          return (
            <Box
              key={i}
              bgcolor={"white"}
              height={"100%"}
              boxSizing={"border-box"}
              paddingY={1}
            >
              <Box
                boxSizing={"border-box"}
                minWidth={width}
                width={"100%"}
                height={"100%"}
                overflow={"hidden"}
              >
                <svg
                  width={"100%"}
                  height={"100%"}
                  viewBox={`0 0 ${width} ${height}`}
                >
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
                          yScale,
                          widthScale,
                          colorScale: complexityColorScale,
                        }}
                        ys={ys}
                      />
                    )}

                    <NoteScore
                      score={score}
                      scales={{ xScale, yScale, widthScale }}
                      noteheight={4}
                      opacity={1}
                      grayScale={grayScaled ? 1 : 0}
                    />

                    {showFingering && (
                      <>
                        <Fingering
                          hand={fingering.left}
                          line={line}
                          fingeringColor={"red"}
                        />
                        <Fingering
                          hand={fingering.right}
                          line={line}
                          fingeringColor={"blue"}
                        />
                      </>
                    )}
                  </g>
                </svg>
              </Box>
            </Box>
          );
        }
      )}
    </Stack>
  );
}
