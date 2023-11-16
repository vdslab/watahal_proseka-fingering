export function separateScore(score, separateSectionNumber) {
  const notHoldNotes = score.filter(({ type }) => type !== "hold");
  const holdnotes = score.filter(({ type }) => type === "hold");

  const notHoldNotesSeparated = separateNotHoldNotes(
    notHoldNotes,
    separateSectionNumber
  );

  const holdNoteGroupsObject = holdnotes.reduce(GoupingHoldNotesReducer, {});
  const holdnoteGroups = Object.values(holdNoteGroupsObject).flat();
  holdnoteGroups.sort((a, b) => a[0].y - b[0].y);
  const holdnotesSeparated = separeteHoldNotes(
    holdnoteGroups,
    separateSectionNumber
  );

  const scoreSeparated = notHoldNotesSeparated.map((notHoldNotes, i) => {
    const holdnotes = holdnotesSeparated[i];
    return [...notHoldNotes, ...holdnotes];
  });

  return scoreSeparated;
}

function separateNotHoldNotes(notHoldNotes, separateSectionNumber) {
  const ys = notHoldNotes.map(({ y }) => y);
  const scoreLength = Math.ceil(ys[ys.length - 1] / separateSectionNumber);
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
    acc[hole][acc[hole].length - 1].push(cur);
  }
  return acc;
}

function separeteHoldNotes(holdnoteGroups, separateSectionNumber) {
  const lastHoldGroup = holdnoteGroups[holdnoteGroups.length - 1];
  const lastY = lastHoldGroup[lastHoldGroup.length - 1].y;
  const scoreLength = Math.ceil(lastY / separateSectionNumber);
  const separetedStartHoldNotes = Array(scoreLength)
    .fill()
    .map((_, i) =>
      holdnoteGroups
        .filter((holdnoteGroup) => {
          const start = i * separateSectionNumber;
          const end = (i + 1) * separateSectionNumber;
          const startHoldY = holdnoteGroup[0].y;
          const endHoldY = holdnoteGroup[holdnoteGroup.length - 1].y;
          return yInRange(startHoldY, start, end);
        })
        .flat()
    );

  const separetedEndHoldNotes = Array(scoreLength)
    .fill()
    .map((_, i) =>
      holdnoteGroups
        .filter((holdnoteGroup) => {
          const start = i * separateSectionNumber;
          const end = (i + 1) * separateSectionNumber;
          const endHoldY = holdnoteGroup[holdnoteGroup.length - 1].y;
          return yInRange(endHoldY, start, end);
        })
        .flat()
    );

  const separetedHoldNotes = separetedStartHoldNotes.map(
    (startHoldNotes, i) => {
      const endHoldNotes = separetedEndHoldNotes[i];
      const holdNotes = [...new Set([...startHoldNotes, ...endHoldNotes])];
      holdNotes.sort((a, b) => a.y - b.y);
      return holdNotes;
    }
  );

  return separetedHoldNotes;
}

function yInRange(y, start, end) {
  return start <= y && y < end;
}
