import ScrollableBox from "./ScrollableBox";
import ChartContent from "./ChartContent";

export default function Chart({ width, YTPlayer, height, left, right, maxY }) {
  return (
    <ScrollableBox height={height} YTPlayer={YTPlayer}>
      <ChartContent
        width={width}
        height={height}
        left={left}
        right={right}
        maxY={maxY}
      />
    </ScrollableBox>
  );
}
