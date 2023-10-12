function BarLine({ y, leftX, rightX }) {
  // console.log(y);
  return (
    <line
      x1={leftX}
      y1={y}
      x2={rightX}
      y2={y}
      strokeWidth={2.5}
      stroke="gray"
      opacity={0.35}
    />
  );
}

function LaneLine({ x, bottomY, topY }) {
  // console.log(x, bottomY, topY);
  return (
    <line
      x1={x}
      y1={bottomY}
      x2={x}
      y2={topY}
      strokeWidth={2.5}
      stroke="gray"
      opacity={0.35}
    />
  );
}

export default function LineSkeleton({ maxY, yScale, xScale }) {
  return (
    <g>
      <g>
        {[...Array(maxY)].map((e, i) => {
          // console.log(i);
          return (
            <BarLine
              key={i}
              y={yScale(i)}
              leftX={xScale(0)}
              rightX={xScale(12)}
            />
          );
        })}
      </g>
      <g>
        {[...Array(12)].map((_, i) => {
          if (i % 2 == 0) {
            return (
              <LaneLine
                key={i}
                x={xScale(i)}
                bottomY={yScale(0)}
                topY={yScale(maxY)}
              />
            );
          }
        })}
      </g>
    </g>
  );
}
