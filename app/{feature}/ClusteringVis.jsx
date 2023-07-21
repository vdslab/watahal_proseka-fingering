"use client";
import * as d3 from "d3";
import Image from "next/image";

export default function ClusteringVis({
  clusteringData,
}) {
  const width = 400;
  const height = 400;
  var n = 500; //データ数
  var values = new Array(n);
  for (var i = 0; i < n; ++i) {
    values[i] = {
      x: d3.randomNormal(width / 2, width / 7)(),
      y: d3.randomNormal(height / 2, height / 7)(),
    };
  }

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
    .size([width, height]);
  const contourDensityValue = contourDensity(clusteringData);

  const colorScale = d3
    .scaleSequential(d3.interpolatePurples)
    .domain(d3.extent(contourDensityValue, (d) => d.value));

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
