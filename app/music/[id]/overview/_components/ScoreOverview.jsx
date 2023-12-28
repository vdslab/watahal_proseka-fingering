import { Box, Chip, Stack, Tooltip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import MusicScore from "./complexityMusicScore/MusicScore";

function StackRowChips({ chips, chipsState }) {
  const [viewChips, setViewChips] = chipsState;
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      height={"100%"}
    >
      {chips.map(({ label, selected, description }, index) => (
        <Box key={index}>
          <Tooltip title={description} arrow>
            <span>
              <Chip
                label={label}
                variant={selected ? "filled" : "outlined"}
                color="primary"
                icon={selected ? <DoneIcon /> : <AddIcon />}
                onClick={() => {
                  const newChipData = [...viewChips];
                  newChipData[index].selected = !newChipData[index].selected;
                  setViewChips(newChipData);
                }}
              />
            </span>
          </Tooltip>
        </Box>
      ))}
    </Stack>
  );
}

export default function ScoreOverview() {
  const [viewChips, setViewChips] = useState([
    {
      label: "複雑さ",
      id: "complexity",
      selected: true,
      description: "譜面の複雑さを色の濃淡で表示",
    },
    {
      label: "運指",
      id: "fingering",
      selected: true,
      description: "左右の指でノーツをどうとるか表示",
    },
  ]);

  const [filteringChips, setFilteringChips] = useState([
    {
      label: "ノーツの色を無くす",
      id: "grayScale",
      selected: false,
      description: "ノーツの色をグレースケールする",
    },
  ]);

  return (
    <Stack height={"100%"} spacing={1}>
      <Stack spacing={1}>
        <Box>
          <StackRowChips
            chips={viewChips}
            chipsState={[viewChips, setViewChips]}
          />
        </Box>
        <StackRowChips
          chips={filteringChips}
          chipsState={[filteringChips, setFilteringChips]}
        />
      </Stack>

      <Box height={"90%"}>
        <MusicScore
          view={viewChips.find(({ id }) => id === "complexity")?.selected}
          showFingering={
            viewChips.find(({ id }) => id === "fingering")?.selected
          }
          grayScaled={
            filteringChips.find(({ id }) => id === "grayScale")?.selected
          }
        />
      </Box>
    </Stack>
  );
}
