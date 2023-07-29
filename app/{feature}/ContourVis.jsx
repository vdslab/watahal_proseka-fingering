"use client";
import * as d3 from "d3";

export default function ContourVis({ clusteringData }) {
  if (clusteringData == null) {
    return <p>loading</p>;
  }
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
    <div className="p-3 w-full">
      <svg width={width} height={height}>
        <g>
          {contourDensityValue.map((v, i) => {
            return <path key={i} d={path(v)} fill={colorScale(v.value)}></path>;
          })}
        </g>
      </svg>
    </div>
  );
}
