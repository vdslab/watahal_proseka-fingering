"use client";
import * as d3 from "d3";
import Image from "next/image";

export default function ClusteringVis({ clusteringLabels, clusteringPoints }) {
  const width = 400;
  const height = 400;
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(clusteringPoints, ({ x }) => x))
    .range([0, width])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(clusteringPoints, ({ y }) => y))
    .range([height, 0])
    .nice();

  const colorScale = d3
    .scaleSequential(d3.interpolateRainbow)
    .domain(d3.extent(clusteringLabels, (l) => l));

  return (
    <div className="p-3">
      <svg width={400} height={400}>
        <g>
          {clusteringPoints.map(({ x, y }, i) => {
            return (
              <circle
                key={i}
                transform={`translate(${xScale(x)},${yScale(y)})`}
                fill={colorScale(clusteringLabels[i])}
                r={3}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
