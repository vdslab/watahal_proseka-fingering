import ScrollableBox from "./ScrollableBox";
import ChartContent from "./ChartContent";
import * as d3 from "d3";
import { Box } from "@mui/material";

export default function Chart({ YTPlayer, score, music, svgSize }) {
  const svgHeight = 60000;
  const measure = d3.extent(score, ({ y }) => y);
  const { width, height } = svgSize;
  const judgeLineHeight = 50;

  return (
    <Box position={"relative"}>
      <ScrollableBox
        height={height}
        YTPlayer={YTPlayer}
        svgHeight={svgHeight}
        startTime={parseFloat(music?.startTime)}
        sec={parseInt(music?.sec)}
        measure={measure}
      >
        <ChartContent
          width={width}
          height={svgHeight}
          viewHeight={height}
          judgeLineHeight={judgeLineHeight}
          score={score}
        />
      </ScrollableBox>
      <Box position={"absolute"} top={height - judgeLineHeight}>
        <svg width={width} height={judgeLineHeight}>
          <rect
            x={0}
            y={0}
            width={width}
            height={judgeLineHeight / 2}
            fill={"rgb(216 173 234)"}
            stroke="black"
            opacity={0.4}
          />
        </svg>
      </Box>
    </Box>
  );
}
