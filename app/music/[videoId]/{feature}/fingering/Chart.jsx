import ScrollableBox from "./ScrollableBox";
import ChartContent from "./ChartContent";

export default function Chart({
  width,
  minY,
  playTimeState,
  height,
  left,
  right,
  maxY,
}) {
  return (
    <ScrollableBox height={height}>
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
