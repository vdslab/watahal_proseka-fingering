function HoldNote({ x, y, width, height, color }) {
  return (
    <rect x={x} y={y - height / 2} width={width} height={height} fill={color} />
  );
}

function NormalNote({ x, y, width, height, color }) {
  return (
    <rect x={x} y={y - height / 2} width={width} height={height} fill={color} />
  );
}

function FlickNote({ x, y, width, height, direction, color }) {
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
