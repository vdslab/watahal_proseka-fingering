import Note from "./Note";

export default function FingeringNotes({ hand, scales, line }) {
  const { xScale, yScale, widthScale } = scales;
  const rectHeight = 10;

  return (
    <g>
      {hand.map(
        ({ judge_type, type, x, y, width, hold_type, hole }, i, hand) => {
          if (hold_type == "start") {
            if (i + 1 >= hand.length) {
              return <g />;
            }
            const ScaleHoldX = [
              xScale(x),
              xScale(x) + widthScale(width),

              xScale(hand[i + 1].x) + widthScale(hand[i + 1].width),
              xScale(hand[i + 1].x),
            ];
            const ScaleHoldY = [
              yScale(y),
              yScale(y),
              yScale(hand[i + 1].y),
              yScale(hand[i + 1].y),
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

      <path key="fingeringLineLeft" d={line?.(hand)} fill="none" stroke="red" />
    </g>
  );
}
