"use client";
import * as d3 from "d3";

export default function ClusteringVis({ clusteringData }) {
  const width = 400;
  const height = 400;

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

  const path = d3.geoPath();

  const threds = d3.range(100);
  const contourDensity = d3
    .contourDensity()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .size([width, height])
    .thresholds(50);
  const contourDensityValue = contourDensity(clusteringData);

  const colorValueMinMax = d3.extent(contourDensityValue, (d) => d.value);
  const colorScale = d3
    .scaleSequential(d3.interpolatePurples)
    .domain(colorValueMinMax);

  return (
    <div className="p-3">
      <svg width={400} height={400}>
        <g>
          {contourDensityValue.map((v, i) => {
            return <path key={i} d={path(v)} fill={colorScale(v.value)}></path>;
          })}
        </g>
        {/* <g>
          {clusteringData.map(({ x, y }, i) => (
            <circle
              key={i}
              r={1}
              transform={`translate(${xScale(x)},${yScale(y)})`}
              opacity={0.5}
            />
          ))}
        </g> */}
      </svg>
    </div>
  );
}
