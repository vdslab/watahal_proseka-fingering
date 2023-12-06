import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import LineSkeleton from "./LineSkeleton";
import Fingering from "./Fingering";
import NoteScore from "./NoteScore";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
export default function ChartContent({
  width,
  height,
  score,
  viewHeight,
  judgeLineHeight,
}) {
  const svgRef = useRef();
  const params = useParams();
  const { id } = params;
  const {
    data: fingering,
    error,
    isLoading,
  } = useSWR(`/api/music/fingering/${id}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  if (error) {
    return (
      <div>
        データの読み込みに失敗しました．ブラウザをリロードするか，サイトを一度閉じて再度開いてください
      </div>
    );
  }
  if (isLoading) {
    return <CircularProgress />;
  }

  const svgWidth = width ?? 600;

  const left = fingering.left;
  const right = fingering.right;

  const showable = left && right;
  const noteHeight = 10;
  const xScale = d3
    .scaleLinear()
    .domain([0, 12])
    .range([0, svgWidth ?? 100])
    .nice();
  const measure = d3.extent(score, ({ y }) => y);
  const yScale = d3
    .scaleLinear()
    .domain(measure)
    .range([height - judgeLineHeight, viewHeight])
    .nice(100);
  const widthScale = d3
    .scaleLinear()
    .domain([0, 12])
    .range([0, svgWidth ?? 100])
    .nice();
  const line = d3
    .line()
    .curve(d3.curveCatmullRom.alpha(0.5))
    .x(({ x, width }) => xScale(x + width / 2))
    .y(({ y }) => yScale(y));

  return (
    <svg viewBox={`0 0 ${svgWidth} ${height}`} ref={svgRef}>
      {!showable ? (
        <></>
      ) : (
        <g>
          <LineSkeleton
            maxY={Math.ceil(yScale.domain()[1])}
            xScale={xScale}
            height={height}
          />
          <NoteScore
            score={score}
            scales={{ xScale, yScale, widthScale }}
            noteheight={noteHeight}
          />
          <Fingering hand={left} line={line} fingeringColor={"red"} />
          <Fingering hand={right} line={line} fingeringColor={"blue"} />
        </g>
      )}
    </svg>
  );
}
