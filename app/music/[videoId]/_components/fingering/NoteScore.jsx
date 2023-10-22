import Note from "./Note";

function generateHoldAreaPathD(x1, y1, width1, x2, y2, width2) {
  const lowerLeftPos = `${x1},${y1}`;
  const lowerRightPos = `${x1 + width1},${y1}`;
  const upperRightPos = `${x2 + width2},${y2}`;
  const upperLeftPos = `${x2},${y2}`;
  return `M ${lowerLeftPos} ${lowerRightPos} ${upperRightPos} ${upperLeftPos}`;
}

export default function NoteScore({ score, scales, noteheight }) {
  const { xScale, yScale, widthScale } = scales;
  const notHoldNotes = score.filter(({ type }) => type !== "hold");
  const holdnotes = score.filter(({ type }) => type === "hold");

  const complexHoldNotes = holdnotes.reduce((acc, cur) => {
    const { hole, hold_type } = cur;

    acc[hole] = acc[hole] ?? [];
    if (hold_type === "start") {
      acc[hole].push([cur]);
    } else {
      acc[hole][acc[hole].length - 1].push(cur);
    }

    return acc;
  }, {});

  return (
    <g>
      {notHoldNotes.map(
        ({ judge_type, type, x, y, width, hold_type, hole }) => {
          return (
            <Note
              key={`${x}-${y}`}
              type={type}
              judge_type={judge_type}
              height={noteheight}
              x={xScale(x)}
              y={yScale(y)}
              width={widthScale(width)}
            />
          );
        }
      )}

      {Object.values(complexHoldNotes).map((holdNoteGroups) => {
        return holdNoteGroups.map((holdNoteGroup) => {
          return holdNoteGroup.map(
            ({ judge_type, hold_type, type, x, y, width }, i, holdNote) => {
              return (
                <g key={`${x}-${y}`}>
                  {hold_type === "end" ? (
                    <></>
                  ) : (
                    <path
                      fillOpacity="0.4"
                      fill="lime"
                      d={generateHoldAreaPathD(
                        xScale(x),
                        yScale(y),
                        widthScale(width),
                        xScale(holdNote[i + 1].x),
                        yScale(holdNote[i + 1].y),
                        widthScale(holdNote[i + 1].width)
                      )}
                    />
                  )}
                  <Note
                    type={type}
                    judge_type={judge_type}
                    height={noteheight}
                    x={xScale(x)}
                    y={yScale(y)}
                    width={widthScale(width)}
                  />
                </g>
              );
            }
          );
        });
      })}
    </g>
  );
}
