import Image from "next/image";
import * as d3 from "d3";
import { useEffect, useState, useMemo, useRef } from "react";
import { ConnectedTvOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

function HoldNote({ x, y, width, height }) {
  const color = "rgb(37 255 57)";
  return (
    <rect x={x} y={y - height / 2} width={width} height={height} fill={color} />
  );
}

function NormalNote({ x, y, width, height }) {
  const color = "rgb(100 255 234)";
  return (
    <rect x={x} y={y - height / 2} width={width} height={height} fill={color} />
  );
}

function FlickNote({ x, y, width, height, direction }) {
  const color = "rgb(255, 119, 187)";
  return (
    <rect x={x} y={y - height / 2} width={width} height={height} fill={color} />
  );
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

function BarLine({ y, leftX, rightX }) {
  // console.log(y);
  return <line x1={leftX} y1={y} x2={rightX} y2={y} stroke="gray" />;
}

export default function Chart({
  width,
  minY,
  playTimeState,
  height,
  left,
  right,
  maxY,
}) {
  // console.log(playTimeState);
  const wrapperRef = useRef();
  const svgRef = useRef();
  const [svgWidth, setsvgWidth] = useState(10);
  useEffect(() => {
    svgRef.current?.scrollIntoView(false);
    setsvgWidth(wrapperRef.current?.clientWidth ?? 10);
  }, [height]);

  const rectHeight = 10;

  const rangeHeight = 25000;

  // .filter(({ y }) => minY <= y && y <= minY + 4);
  // console.log([...left, ...right]);
  // console.log(svgWidth);
  const xScale = d3
    .scaleLinear()
    .domain([0, 12])
    .range([0, svgWidth ?? 100])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent([...left, ...right], ({ y }) => y))
    .range([rangeHeight, 0])
    .nice();
  const widthScale = d3
    .scaleLinear()
    .domain([0, 12])
    .range([0, svgWidth ?? 100])
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
    <Box
      maxHeight={height}
      overflow={"auto"}
      ref={wrapperRef}
      onClick={() => {
        console.log("scroll test: move to top");
        wrapperRef?.current?.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }}
    >
      <svg width={svgWidth} height={rangeHeight} ref={svgRef}>
        {!showable ? (
          <></>
        ) : (
          <g>
            <g>
              {[...Array(maxY)].map((e, i) => {
                // console.log(i);
                return (
                  <BarLine
                    y={yScale(i)}
                    leftX={xScale(0)}
                    rightX={xScale(12)}
                  />
                );
              })}
            </g>
            <g>
              {/* {left.map(({ x, y, width, type }, i) => {return <Note {...{x, y, width,height:10 type}}>;})} */}
              {left.map(
                (
                  { judge_type, type, x, y, width, hold_type, hole },
                  i,
                  leftHold
                ) => {
                  if (hold_type == "start") {
                    if (i + 1 >= left.length) {
                      return <g />;
                    }
                    const ScaleHoldX = [
                      xScale(x),
                      xScale(x) + widthScale(width),

                      xScale(leftHold[i + 1].x) +
                        widthScale(leftHold[i + 1].width),
                      xScale(leftHold[i + 1].x),
                    ];
                    const ScaleHoldY = [
                      yScale(y),
                      yScale(y),
                      yScale(leftHold[i + 1].y),
                      yScale(leftHold[i + 1].y),
                    ];

                    return (
                      <g key={i}>
                        <path
                          fillOpacity="0.4"
                          fill="lime"
                          d={`M ${ScaleHoldX[0]},${ScaleHoldY[0]} ${ScaleHoldX[1]},${ScaleHoldY[1]} ${ScaleHoldX[2]} ${ScaleHoldY[2]} ${ScaleHoldX[3]} ${ScaleHoldY[3]}`}
                        />
                        <Note
                          {...{
                            type,
                            judge_type,
                            height: rectHeight,
                            x: xScale(x),
                            y: yScale(y),
                            width: widthScale(width),
                          }}
                        />
                      </g>
                    );
                  } else {
                    return (
                      <Note
                        key={i}
                        {...{
                          type,
                          judge_type,
                          height: rectHeight,
                          x: xScale(x),
                          y: yScale(y),
                          width: widthScale(width),
                        }}
                      />
                    );
                  }
                }
              )}
              <path
                key="fingeringLineLeft"
                d={line?.(left)}
                fill="none"
                stroke="red"
              />
            </g>
            <g>
              {right.map(
                (
                  { judge_type, type, x, y, width, hold_type, hole },
                  i,
                  rightHold
                ) => {
                  if (hold_type == "start") {
                    const ScaleHoldX = [
                      xScale(x),
                      xScale(x) + widthScale(width),

                      xScale(rightHold[i + 1].x) +
                        widthScale(rightHold[i + 1].width),
                      xScale(rightHold[i + 1].x),
                    ];
                    const ScaleHoldY = [
                      yScale(y),
                      yScale(y),
                      yScale(rightHold[i + 1].y),
                      yScale(rightHold[i + 1].y),
                    ];
                    return (
                      <g key={i}>
                        <path
                          fillOpacity="0.4"
                          fill="lime"
                          d={`M ${ScaleHoldX[0]},${ScaleHoldY[0]} ${ScaleHoldX[1]},${ScaleHoldY[1]} ${ScaleHoldX[2]} ${ScaleHoldY[2]} ${ScaleHoldX[3]} ${ScaleHoldY[3]}`}
                        />
                        <Note
                          {...{
                            type,
                            judge_type,
                            height: rectHeight,
                            x: xScale(x),
                            y: yScale(y),
                            width: widthScale(width),
                          }}
                        />
                      </g>
                    );
                  } else {
                    return (
                      <Note
                        key={i}
                        {...{
                          type,
                          judge_type,
                          height: rectHeight,
                          x: xScale(x),
                          y: yScale(y),
                          width: widthScale(width),
                        }}
                      />
                    );
                  }
                }
              )}
              <path
                key="fingeringLineRight"
                d={line?.(right)}
                fill="none"
                stroke="blue"
              />
            </g>
          </g>
        )}
      </svg>
    </Box>
  );
}
