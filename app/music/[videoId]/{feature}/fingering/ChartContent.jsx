import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import Note from "./Note";
import BarLines from "./BarLines";

export default function ChartContent({ width, height, left, right, maxY }) {
  const svgRef = useRef();
  const [svgWidth, setsvgWidth] = useState(10);
  useEffect(() => {
    svgRef.current?.scrollIntoView(false);
    setsvgWidth(width ?? 200 - 20);
  }, [height, width]);

  const rectHeight = 10;
  const rangeHeight = 25000;

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

  console.log(width);
  return (
    <svg width={svgWidth} height={rangeHeight} ref={svgRef}>
      {!showable ? (
        <></>
      ) : (
        <g>
          <BarLines maxY={maxY} yScale={yScale} xScale={xScale} />
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
  );
}
