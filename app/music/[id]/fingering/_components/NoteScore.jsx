import Note from "./Note";

function generateHoldAreaPathD(x1, y1, width1, x2, y2, width2) {
  const lowerLeftPos = `${x1},${y1}`;
  const lowerRightPos = `${x1 + width1},${y1}`;
  const upperRightPos = `${x2 + width2},${y2}`;
  const upperLeftPos = `${x2},${y2}`;
  return `M ${lowerLeftPos} ${lowerRightPos} ${upperRightPos} ${upperLeftPos}`;
}

function NotHoldNotesView({ notHoldNotes, scales, color, height }) {
  return (
    <g>
      {notHoldNotes.map((note) => {
        const { widthScale } = scales;
        const { judge_type, x, y } = note;
        const direction = judge_type.includes("flick")
          ? judge_type.split("_")[1]
          : null;
        return (
          <Note
            key={`${x}-${y}`}
            note={note}
            scales={scales}
            height={height}
            laneWidth={widthScale(1)}
            color={color}
            direction={direction}
          />
        );
      })}
    </g>
  );
}

export default function NoteScore({
  score,
  scales,
  noteheight,
  opacity = 1,
  grayScale = 0,
}) {
  const noteColor = "rgb(100 255 234)";
  const flickColor = "rgb(255, 119, 187)";
  const holdColor = "lime";
  const color = { normal: noteColor, flick: flickColor, hold: holdColor };

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
    <g opacity={opacity} filter={`grayscale(${grayScale})`}>
      <NotHoldNotesView
        notHoldNotes={notHoldNotes}
        height={noteheight}
        scales={scales}
        color={color}
      />

      {Object.values(complexHoldNotes).map((holdNoteGroups) => {
        return holdNoteGroups.map((holdNoteGroup) => {
          return holdNoteGroup.map((note, i, holdNote) => {
            const { hold_type, x, y, width } = note;
            return (
              <g key={`${x}-${y}`}>
                {hold_type === "end" ? (
                  <></>
                ) : (
                  <path
                    fillOpacity={0.4}
                    fill={holdColor}
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
                  note={note}
                  scales={{ xScale, yScale, widthScale }}
                  height={noteheight}
                  laneWidth={widthScale(1)}
                  color={{
                    normal: noteColor,
                    flick: flickColor,
                    hold: holdColor,
                  }}
                />
              </g>
            );
          });
        });
      })}
    </g>
  );
}
