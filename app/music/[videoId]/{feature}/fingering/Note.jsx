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

export default function Note({
  judge_type,
  type,
  x,
  y,
  width,
  height,
  direction,
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
          height={height}
          direction={direction}
        />
      );
  }
  switch (type) {
    case "hold":
      return <HoldNote x={x} y={y} width={width} height={height} />;
    case "normal":
      return <NormalNote x={x} y={y} width={width} height={height} />;
    default:
      return (
        <HoldNote
          x={x}
          y={y}
          width={width}
          height={height}
          direction={direction}
        />
      );
  }
}
