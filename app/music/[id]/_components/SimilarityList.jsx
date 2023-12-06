"use client";

import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

export default function SimilarityList() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

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
    return (
      <div>
        データの読み込みに失敗しました．ブラウザをリロードするか，サイトを一度閉じて再度開いてください
      </div>
    );
  }

  if (musicListLoading || similaritiesLoading) {
    return <CircularProgress />;
  }

  similarities.sort((a, b) => {
    return b.similarity - a.similarity;
  });
  const orderedSimilarities = similarities.slice(0, 5);

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
        <ListSubheader>似ている曲</ListSubheader>
        {similarMusic.map(({ target, name }) => (
          <ListItemButton
            key={target}
            onClick={() => router.push(`/music/${target}`)}
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
