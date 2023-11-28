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
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function SimilarityList() {
  const router = useRouter();
  // const params = useParams();
  // const { id } = params;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    data: musicList,
    isLoading: musicListLoading,
    error: musicListError,
  } = useSWR(`/api/music`, (url) => fetch(url).then((res) => res.json()));
  const {
    data: similarities,
    isLoading: similaritiesLoading,
    error: similaritiesError,
  } = useSWR(`/api/music/similarity/${id}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  if (musicListError || similaritiesError) {
    return <div>failed to load</div>;
  }
  if (musicListLoading || similaritiesLoading) {
    return <div>loading...</div>;
  }

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
