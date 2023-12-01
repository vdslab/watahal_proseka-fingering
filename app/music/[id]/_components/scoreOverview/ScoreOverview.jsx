import { Box, Chip, ListItem, Stack, Tooltip, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import MusicScore from "./complexityMusicScore/MusicScore";

export default function ScoreOverview() {
  const [chipData, setChipData] = useState([
    {
      label: "complexity",
      selected: true,
      description: "譜面の複雑さを色の濃淡で表示",
    },
    {
      label: "fingering",
      selected: false,
      description: "運指の表示",
    },
  ]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        譜面の全体像
      </Typography>
      <Box marginBottom={2}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          {chipData.map(({ label, selected, description }, index) => (
            <Box key={index}>
              <Tooltip title={description} arrow>
                <span>
                  <Chip
                    label={label}
                    variant={selected ? "filled" : "outlined"}
                    color="primary"
                    icon={selected ? <DoneIcon /> : <span />}
                    onClick={() => {
                      const newChipData = [...chipData];
                      newChipData[index].selected =
                        !newChipData[index].selected;
                      setChipData(newChipData);
                    }}
                  />
                </span>
              </Tooltip>
            </Box>
          ))}
        </Stack>
      </Box>

      <MusicScore
        view={chipData.find(({ label }) => label === "complexity").selected}
        showFingering={
          chipData.find(({ label }) => label === "fingering").selected
        }
      />
    </>
  );
}
