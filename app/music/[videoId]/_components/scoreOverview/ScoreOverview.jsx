import { Box, Chip, ListItem, Stack, Tooltip, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import ComplexityMusicScore from "./complexityMusicScore/MusicScore";

export default function ScoreOverview({ id }) {
  const [chipData, setChipData] = useState([
    {
      label: "complexity",
      selected: true,
      description: "譜面の複雑さを色の濃淡で表示",
    },
    {
      label: "fingering",
      selected: false,
      disabled: true,
      description: "運指の表示",
    },
  ]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        譜面の全体像
      </Typography>
      <Box marginBottom={2}>
        <Stack direction={"row"} width={"20%"}>
          {chipData.map(({ label, selected, disabled, description }, index) => (
            <ListItem key={index}>
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
                    disabled={disabled}
                  />
                </span>
              </Tooltip>
            </ListItem>
          ))}
        </Stack>
      </Box>

      <ComplexityMusicScore
        id={id}
        view={chipData.find(({ label }) => label === "complexity").selected}
      />
    </>
  );
}
