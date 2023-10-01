import Chart from "./fingering/Chart";

export default function FingeringVis({
  fingering,
  width,
  minY,
  playTimeState,
  height,
}) {
  const left = fingering["left"]?.map(
    ({ x, y, width, type, judge_type, hold_type, hole }) => ({
      x,
      y,
      width,
      type,
      judge_type,
      hold_type,
      hole,
    })
  );
  // .filter(({ y }) => minY <= y && y <= minY + 4);
  const right = fingering["right"]?.map(
    ({ x, y, width, type, judge_type, hold_type, hole }) => ({
      x,
      y,
      width,
      type,
      judge_type,
      hold_type,
      hole,
    })
  );

  const maxY = Math.ceil(
    Math.max.apply(
      right.map(function (o) {
        return o.y;
      }),
      left.map(function (o) {
        return o.y;
      })
    )
  );

  return (
    <Chart
      height={height}
      left={left}
      right={right}
      width={width}
      maxY={maxY}
    />
  );
}
