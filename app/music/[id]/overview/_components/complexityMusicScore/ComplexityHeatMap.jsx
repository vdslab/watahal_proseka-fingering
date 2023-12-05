"use client";
import { useState } from "react";
import useSWR from "swr";
const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function ComplexityHeatMap({ complexity, scales, ys }) {
  const { xScale, yScale, widthScale, colorScale } = scales;
  const [hoveredId, setHoveredId] = useState(null);
  if (complexity == null) {
    return null;
  }

  return (
    <g
      onMouseLeave={() => {
        setHoveredId(null);
      }}
    >
      {ys.map((y, i) => {
        if (complexity.length <= i) {
          return null;
        }
        return (
          <rect
            key={i}
            x={xScale(0)}
            y={yScale(y)}
            width={xScale(12)}
            height={yScale(y) - yScale(y + 1)}
            fill={colorScale(complexity[i]) ?? "none"}
            filter={hoveredId == i ? `brightness(5)` : "none"}
            opacity={0.5}
            onMouseOver={(e) => {
              setHoveredId(i);
            }}
          />
        );
      })}
    </g>
  );
}
