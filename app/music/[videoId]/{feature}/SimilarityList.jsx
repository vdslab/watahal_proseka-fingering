"use client";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useRouter } from "next/navigation";

export default function SimilarityList({ similarities, musicList }) {
  const router = useRouter();
  const header = Object.keys(similarities[0]);
  similarities.sort((a, b) => {
    return b.similarity - a.similarity;
  });
  const orderedSimilarities = similarities.slice(0, 5);
  const sourceName = musicList.find(
    (music) => music.id === orderedSimilarities[0].source
  ).name;

  const similarMusic = orderedSimilarities.map((similarity) => {
    const targetMusic = musicList.find(
      (music) => music.id === similarity.target
    );
    const { name, videoid: videoId } = targetMusic;

    return { ...similarity, name, videoId };
  });

  return (
    <Box bgcolor={"white"} padding={1}>
      <List>
        <ListSubheader>現在の曲</ListSubheader>
        <ListItem>{sourceName}</ListItem>
        <Divider />
        <ListSubheader>似ている曲</ListSubheader>
        {similarMusic.map(({ target, name, videoId }) => (
          <ListItemButton
            key={target}
            onClick={() => router.push(`/music/${videoId}?id=${target}`)}
          >
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
