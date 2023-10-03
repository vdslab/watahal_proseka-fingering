import ScrollableBox from "./ScrollableBox";
import ChartContent from "./ChartContent";

export default function Chart({ width, YTPlayer, height, left, right, maxY }) {
  const svgHeight = 25000;

  return (
    <ScrollableBox height={height} YTPlayer={YTPlayer} svgHeight={svgHeight}>
      <ChartContent
        width={width}
        height={svgHeight}
        left={left}
        right={right}
        maxY={maxY}
      />
    </ScrollableBox>
  );
}
