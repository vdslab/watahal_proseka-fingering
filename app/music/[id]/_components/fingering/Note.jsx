function HoldNote({ x, y, width, height, color }) {
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

function NormalNote({ x, y, width, height, color }) {
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

function FlickNote({ x, y, width, height, direction, color, laneWidth }) {
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
  judge_type,
  type,
  x,
  y,
  width,
  laneWidth,
  height,
  direction,
  holdColor,
  noteColor = "rgb(100 255 234)",
  flickColor = "rgb(255, 119, 187)",
}) {
  switch (judge_type) {
    case "flick_up":
    case "flick_down":
    case "flick_left":
    case "flick_right":
      return (
        <FlickNote
          x={x}
          y={y}
          width={width}
          laneWidth={laneWidth}
          height={height}
          direction={direction}
          color={flickColor}
        />
      );
  }
  switch (type) {
    case "hold":
      return (
        <HoldNote x={x} y={y} width={width} height={height} color={holdColor} />
      );
    case "normal":
      return (
        <NormalNote
          x={x}
          y={y}
          width={width}
          height={height}
          color={noteColor}
        />
      );
    default:
      return (
        <HoldNote
          x={x}
          y={y}
          width={width}
          height={height}
          direction={direction}
          color={holdColor}
        />
      );
  }
}
