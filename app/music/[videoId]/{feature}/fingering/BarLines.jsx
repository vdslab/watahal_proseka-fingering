function BarLine({ y, leftX, rightX }) {
  // console.log(y);
  return <line x1={leftX} y1={y} x2={rightX} y2={y} stroke="gray" />;
}
export default function BarLines({ maxY, yScale, xScale }) {
  // console.log(y);
  return (
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
  );
}
