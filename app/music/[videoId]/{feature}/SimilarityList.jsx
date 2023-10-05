"use client";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

export default function SimilarityList({ similarities, musicList }) {
  const header = Object.keys(similarities[0]);
  similarities.sort((a, b) => {
    return b.similarity - a.similarity;
  });
  const orderedSimilarities = similarities.slice(0, 5);
  const sourceName = musicList.find(
    (music) => music.id === orderedSimilarities[0].source
  ).name;

  const similarMusic = orderedSimilarities.map((similarity) => {
    const name = musicList.find((music) => music.id === similarity.target).name;
    return { ...similarity, name };
  });

  return (
    <Box bgcolor={"white"} padding={1}>
      <List>
        <ListSubheader>現在の曲</ListSubheader>
        <ListItem>{sourceName}</ListItem>
        <ListSubheader>似ている曲</ListSubheader>
        {similarMusic.map(({ target, name }) => (
          <ListItemButton key={target}>
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText>{name}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
