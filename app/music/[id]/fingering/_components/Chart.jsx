import ScrollableBox from "./ScrollableBox";
import ChartContent from "./ChartContent";
import * as d3 from "d3";

export default function Chart({ YTPlayer, score, music, svgSize }) {
  const svgHeight = 60000;
  const measure = d3.extent(score, ({ y }) => y);
  const { width, height } = svgSize;

  return (
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
        score={score}
      />
    </ScrollableBox>
  );
}
