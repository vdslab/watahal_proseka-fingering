export function separateScore(score, separateSectionNumber) {
  score.sort((a, b) => a.y - b.y);
  const ys = score.map(({ y }) => y);
  const scoreLength = Math.ceil(ys[ys.length - 1] / separateSectionNumber);

  const notHoldNotes = score.filter(({ type }) => type !== "hold");
  const holdnotes = score.filter(({ type }) => type === "hold");

  const notHoldNotesSeparated = separateNotHoldNotes(
    notHoldNotes,
    scoreLength,
    separateSectionNumber
  );

  const holdNoteGroupsObject = holdnotes.reduce(GoupingHoldNotesReducer, {});
  const holdnoteGroups = Object.values(holdNoteGroupsObject).flat();
  holdnoteGroups.sort((a, b) => a[0].y - b[0].y);
  const holdnotesSeparated = separeteHoldNotes(
    holdnoteGroups,
    scoreLength,
    separateSectionNumber
  );

  const scoreSeparated = notHoldNotesSeparated.map((notHoldNotes, i) => {
    const holdnotes = holdnotesSeparated[i] ?? [];
    const notes = [...notHoldNotes, ...holdnotes];
    notes.sort((a, b) => a.y - b.y);
    return notes;
  });
  return scoreSeparated;
}

function separateNotHoldNotes(
  notHoldNotes,
  scoreLength,
  separateSectionNumber
) {
  const separetedNotHoldNotes = Array(scoreLength)
    .fill()
    .map((_, i) =>
      notHoldNotes.filter(
        ({ y }) =>
          i * separateSectionNumber <= y && y < (i + 1) * separateSectionNumber
      )
    );

  return separetedNotHoldNotes;
}

function GoupingHoldNotesReducer(acc, cur) {
  const { hole, hold_type } = cur;
  acc[hole] = acc[hole] ?? [];
  if (hold_type === "start") {
    acc[hole].push([cur]);
  } else {
    acc[hole].length === 0
      ? acc[hole].push([cur])
      : acc[hole][acc[hole].length - 1].push(cur);
  }
  return acc;
}

function separeteHoldNotes(holdnoteGroups, scoreLength, separateSectionNumber) {
  const separetedStartHoldNotes = separateHoldNotesByType(
    "start",
    scoreLength,
    holdnoteGroups,
    separateSectionNumber
  );

  const separetedEndHoldNotes = separateHoldNotesByType(
    "end",
    scoreLength,
    holdnoteGroups,
    separateSectionNumber
  );

  const separetedMiddleHoldNotes = separateHoldNotesByType(
    "middle",
    scoreLength,
    holdnoteGroups,
    separateSectionNumber
  );

  const separetedHoldNotes = separetedStartHoldNotes.map(
    (startHoldNotes, i) => {
      const endHoldNotes = separetedEndHoldNotes[i] ?? [];
      const middleHoldNotes = separetedMiddleHoldNotes[i] ?? [];
      const holdNotes = [
        ...new Set([...startHoldNotes, ...endHoldNotes, ...middleHoldNotes]),
      ];
      holdNotes.sort((a, b) => a.y - b.y);
      return holdNotes;
    }
  );

  return separetedHoldNotes;
}

function separateHoldNotesByType(
  type,
  scoreLength,
  holdnoteGroups,
  separateSectionNumber
) {
  const separetedHoldNotes = Array(scoreLength)
    .fill()
    .map((_, i) =>
      holdnoteGroups
        .filter((holdnoteGroup) => {
          const start = i * separateSectionNumber;
          const end = (i + 1) * separateSectionNumber;

          if (type === "middle") {
            const checks = holdnoteGroup
              .filter((_, i) => 0 < i && i < holdnoteGroup.length - 1)
              .some(({ y }) => yInRange(y, start, end));
            return checks;
          }

          const targetIndex = type === "start" ? 0 : holdnoteGroup.length - 1;
          const endHoldY = holdnoteGroup[targetIndex].y;
          return yInRange(endHoldY, start, end);
        })
        .flat()
    );

  return separetedHoldNotes;
}

function yInRange(y, start, end) {
  return start <= y && y < end;
}
