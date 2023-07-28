import Image from "next/image";
import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";

function HoldNote({ x, y, width, height }) {
  const holdColor = "rgb(37 255 57)";
  return <rect x={x} y={y} width={width} height={height} fill={holdColor} />;
}

function NormalNote({ x, y, width, height }) {
  const color = "rgb(100 255 234)";
  return <rect x={x} y={y} width={width} height={height} fill={color} />;
}

function FlickNote({ x, y, width, height, direction }) {
  const color = "rgb(255, 119, 187)";
  return <rect x={x} y={y} width={width} height={height} fill={color} />;
}

function Note({ judge_type, type, ...res }) {
  // console.log(res);
  switch (judge_type) {
    case "flick_up":
    case "flick_down":
    case "flick_left":
    case "flick_right":
      return <FlickNote {...{ ...res }} />;
  }
  switch (type) {
    case "hold":
      return <HoldNote {...{ ...res }} />;
    case "normal":
      return <NormalNote {...{ ...res }} />;
    default:
      return <HoldNote {...{ ...res }} />;
  }
}

export default function FingeringVis({
  fingering,
  width,
  minY,
  playTimeState,
}) {
  console.log(playTimeState);
  const svgRef = useRef(null);
  useEffect(() => {
    svgRef?.current?.scrollIntoView(false);
  }, []);
  const left = fingering["left"]?.map(({ x, y, width, type, judge_type }) => ({
    x,
    y,
    width,
    type,
    judge_type,
  }));
  // .filter(({ y }) => minY <= y && y <= minY + 4);
  const right = fingering["right"]?.map(
    ({ x, y, width, type, judge_type }) => ({
      x,
      y,
      width,
      type,
      judge_type,
    })
  );
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
    .x(({ x, width }) => xScale(x + width / 2))
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
              {/* {left.map(({ x, y, width, type }, i) => {return <Note {...{x, y, width,height:10 type}}>;})} */}
              {left.map(({ judge_type, type, x, y, width }, i) => {
                return (
                  <Note
                    key={i}
                    {...{
                      type,
                      judge_type,
                      height: 10,
                      x: xScale(x),
                      y: yScale(y),
                      width: widthScale(width),
                    }}
                  />
                );
              })}
              <path d={line?.(left)} fill="none" stroke="red" />
            </g>
            <g>
              {right.map(({ judge_type, type, x, y, width }, i) => {
                return (
                  <Note
                    key={i}
                    {...{
                      type,
                      judge_type,
                      height: 10,
                      x: xScale(x),
                      y: yScale(y),
                      width: widthScale(width),
                    }}
                  />
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
