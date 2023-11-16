"use client";
import useSWR from "swr";
const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function ComplexityHeatMap({ id, complexity, scales, ys }) {
  const { xScale, yScale, widthScale, colorScale } = scales;
  if (complexity == null) {
    return null;
  }

  return (
    <g>
      {ys.map((y, i) => {
        if (complexity.length <= i) {
          return null;
        }
        return (
          <rect
            x={xScale(0)}
            y={yScale(y)}
            width={xScale(12)}
            height={yScale(y) - yScale(y + 1)}
            fill={colorScale(complexity[i]) ?? "none"}
            opacity={0.5}
          />
        );
      })}
    </g>
  );
}
