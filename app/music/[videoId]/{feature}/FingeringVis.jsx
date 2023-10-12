import Chart from "./fingering/Chart";

export default function FingeringVis({
  fingering,
  width,
  YTPlayer,
  height,
  score,
}) {
  const left = fingering["left"];
  const right = fingering["right"];

  return (
    <Chart
      width={width}
      height={height}
      left={left}
      right={right}
      maxY={100}
      YTPlayer={YTPlayer}
      score={score}
    />
  );
}
