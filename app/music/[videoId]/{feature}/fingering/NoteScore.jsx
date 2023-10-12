import Note from "./Note";

export default function NoteScore({ score, scales, noteheight }) {
  const { xScale, yScale, widthScale } = scales;
  console.log(score);
  return (
    <g>
      {score.map(({ judge_type, type, x, y, width, hold_type, hole }) => {
        return (
          <Note
            type={type}
            judge_type={judge_type}
            height={noteheight}
            x={xScale(x)}
            y={yScale(y)}
            width={widthScale(width)}
          />
        );
      })}
    </g>
  );
}
