import Image from "next/image";
import * as d3 from "d3";
import { useMemo, useRef } from "react";

export default function FingeringVis({ fingering, width, minY }) {
  const svgRef = useRef(null);
  const left = fingering["left"]?.map(({ x, y, width, type }) => ({
    x,
    y,
    width,
    type,
  }));
  // .filter(({ y }) => minY <= y && y <= minY + 4);
  const right = fingering["right"]?.map(({ x, y, width, type }) => ({
    x,
    y,
    width,
    type,
  }));
  // .filter(({ y }) => minY <= y && y <= minY + 4);
  // console.log([...left, ...right]);
  const xScale = d3
    .scaleLinear()
    .domain([0, 12])
    .range([0, svgRef?.current?.clientWidth ?? 100])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent([...left, ...right], ({ y }) => y))
    .range([10000, 0])
    .nice();
  const widthScale = d3
    .scaleLinear()
    .domain([0, 12])
    .range([0, svgRef?.current?.clientWidth ?? 100])
    .nice();
  const showable = left && right && xScale && yScale && widthScale;
  const line = d3
    .line()
    .x(({ x }) => xScale(x))
    .y(({ y }) => yScale(y));
  // console.log(line);

  // const colorScale = d3
  //   .scaleSequential(d3.interpolatePurples)
  //   .domain(d3.extent(contourDensityValue, (d) => d.value));
  return (
    <div height="200px">
      <svg
        width={width}
        height="10000px"
        ref={svgRef} /*viewBox="0 0 100 100"*/
        style={{ overflow: "scroll" }}
      >
        {!showable ? (
          <></>
        ) : (
          <g>
            <g>
              {left.map(({ x, y, width, type }, i) => {
                const color =
                  type == "hold" ? "rgb(37 255 57)" : "rgb(100 255 234)";
                return (
                  <>
                    <rect
                      key={i}
                      x={xScale(x) - 5}
                      y={yScale(y) - 5}
                      width={widthScale(width)}
                      height={10}
                      fill={color}
                    />
                  </>
                );
              })}
              <path d={line?.(left)} fill="none" stroke="red" />
            </g>
            <g>
              {right.map(({ x, y, width, type }, i) => {
                const color =
                  type == "hold" ? "rgb(37 255 57)" : "rgb(100 255 234)";
                return (
                  <>
                    <rect
                      key={i}
                      x={xScale(x) - 5}
                      y={yScale(y) - 5}
                      width={widthScale(width)}
                      height={10}
                      fill={color}
                    />
                  </>
                );
              })}
              <path d={line?.(right)} fill="none" stroke="blue" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
