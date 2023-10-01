import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import BarLines from "./BarLines";
import FingeringNotes from "./FingeringNotes";

export default function ChartContent({ width, height, left, right, maxY }) {
  const svgRef = useRef();
  const [svgWidth, setsvgWidth] = useState(10);
  useEffect(() => {
    svgRef.current?.scrollIntoView(false);
    setsvgWidth(width ?? 200 - 20);
  }, [height, width]);

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

  return (
    <svg width={svgWidth} height={rangeHeight} ref={svgRef}>
      {!showable ? (
        <></>
      ) : (
        <g>
          <BarLines maxY={maxY} yScale={yScale} xScale={xScale} />
          <FingeringNotes
            hand={left}
            scales={{ xScale, yScale, widthScale }}
            line={line}
          />
          <FingeringNotes
            hand={right}
            scales={{ xScale, yScale, widthScale }}
            line={line}
          />
        </g>
      )}
    </svg>
  );
}
