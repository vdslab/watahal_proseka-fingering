"use client";
import * as d3 from "d3";

export default function DetailPlot({ clusteringData }) {
  const width = 600;
  const height = 600;
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(clusteringData, ({ x }) => x))
    .range([0, width])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(clusteringData, ({ y }) => y))
    .range([height, 0])
    .nice();

  return (
    <div className="p-3 w-full">
      <svg width={width} height={height}>
        <g>
          {clusteringData.map(({ x, y }, i) => (
            <circle
              key={i}
              r={10}
              transform={`translate(${xScale(x)},${yScale(y)})`}
              opacity={0.5}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
