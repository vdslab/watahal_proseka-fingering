import Note from "./Note";

export default function Fingering({
  score,
  hand,
  line,
  fingeringColor,
  scales,
}) {
  const { xScale, yScale, widthScale } = scales;
  const notes = hand
    ?.map(({ start, end }) => {
      return { start: score[start], end: score[end] };
    })
    .filter(({ start, end }) => start && end);

  return (
    <g>
      {notes?.map(({ start, end }, i) => {
        return (
          <line
            key={i}
            x1={xScale(start.x) + widthScale(start.width) / 2}
            y1={yScale(start.y)}
            x2={xScale(end.x) + widthScale(end.width) / 2}
            y2={yScale(end.y)}
            fill={fingeringColor}
            strokeWidth={2.5}
            stroke={fingeringColor}
          />
        );
      })}
    </g>
  );
}
