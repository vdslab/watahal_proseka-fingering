function HoldNote({ noteRect, color }) {
  const { x, y, width, height } = noteRect;
  return (
    <rect
      x={x}
      y={y - height / 2}
      width={width}
      height={height}
      fill={color}
      stroke="gray"
    />
  );
}

function NormalNote({ noteRect, color }) {
  const { x, y, width, height } = noteRect;
  return (
    <rect
      x={x}
      y={y - height / 2}
      width={width}
      height={height}
      fill={color}
      stroke="gray"
    />
  );
}

function FlickNote({ noteRect, direction, color, laneWidth }) {
  const { x, y, width, height } = noteRect;
  const cx = width / 2;
  const flickWidth = laneWidth / 2;
  const rotate = direction
    ? {
        up: 0,
        down: 180,
        left: -30,
        right: 30,
      }[direction]
    : 0;
  if (x == null || y == null || height == null) {
    return null;
  }
  return (
    <g className={`flick`} transform={`translate(${x} ${y - height / 2})`}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={color}
        stroke="gray"
      />
      <polygon
        scale={3}
        transform={`translate(${cx} ${-height}) scale(1.5 1) rotate(${rotate})`}
        points={`0 0, ${flickWidth} ${flickWidth}, ${flickWidth} 0, 0 ${-flickWidth}, ${-flickWidth} 0, ${-flickWidth} ${flickWidth}`}
        fill={color}
        stroke="gray"
      />
    </g>
  );
}

export default function Note({
  note,
  scales,
  laneWidth,
  height,
  direction,
  color,
}) {
  const { judge_type, type, x, y, width } = note;
  const { xScale, yScale, widthScale } = scales;
  const noteRect = {
    x: xScale(x),
    y: yScale(y),
    width: widthScale(width),
    height,
  };
  switch (judge_type) {
    case "flick_up":
    case "flick_down":
    case "flick_left":
    case "flick_right":
      return (
        <FlickNote
          noteRect={noteRect}
          laneWidth={laneWidth}
          direction={direction}
          color={color.flick}
        />
      );
  }
  switch (type) {
    case "hold":
      return <HoldNote noteRect={noteRect} color={color.hold} />;
    case "normal":
      return <NormalNote noteRect={noteRect} color={color.normal} />;
    default:
      return <HoldNote noteRect={noteRect} color={color.hold} />;
  }
}
