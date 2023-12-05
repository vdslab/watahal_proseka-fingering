"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function ComplexityHeatMap({ complexity, scales, ys }) {
  const { xScale, yScale, widthScale, colorScale } = scales;
  const [hoveredId, setHoveredId] = useState(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

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
            onClick={(e) => {
              const url = new URL(`/music/${id}/fingering`, window.location);
              url.searchParams.set("measure", Math.max(y - 2, 0));
              router.push(url.href);
            }}
          />
        );
      })}
    </g>
  );
}
