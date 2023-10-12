import ScrollableBox from "./ScrollableBox";
import ChartContent from "./ChartContent";

export default function Chart({
  width,
  YTPlayer,
  height,
  left,
  right,
  maxY,
  score,
}) {
  const svgHeight = 60000;

  return (
    <ScrollableBox height={height} YTPlayer={YTPlayer} svgHeight={svgHeight}>
      <ChartContent
        width={width}
        height={svgHeight}
        left={left}
        right={right}
        maxY={maxY}
        score={score}
      />
    </ScrollableBox>
  );
}
