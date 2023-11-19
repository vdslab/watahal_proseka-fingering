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
import useSWR from "swr";
import LaunchIcon from "@mui/icons-material/Launch";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function RelationList({ nodeId }) {
  const { data: musicListData, error } = useSWR("/api/music", fetcher);
  const { data: similarityData, error2 } = useSWR(
    nodeId ? `/api/music/similarity/${nodeId}` : null,
    fetcher
  );
  const wrapperRef = useRef();
  const [height, setHeight] = useState();
  const router = useRouter();
  useEffect(() => {
    setHeight(wrapperRef.current?.clientHeight);
  }, [wrapperRef.current, nodeId]);

  if (error || error2) return <div>Failed to load</div>;

  const music = musicListData?.find((music) => music.id === nodeId);
  similarityData?.sort((a, b) => b.similarity - a.similarity);
  const similarMusics = similarityData
    ?.slice(0, 10)
    ?.map(({ target }) => musicListData?.find((music) => music.id === target));

  return (
    <Box bgcolor={"white"} height={"100%"} ref={wrapperRef} overflow={"auto"}>
      <List sx={{ maxHeight: height }}>
        <ListSubheader>選択した曲</ListSubheader>
        <ListItemButton
          onClick={() => {
            if (music?.videoId === undefined || music?.id === undefined) return;

            router.push(`/music/${music?.videoId}?id=${music?.id}`);
          }}
          disabled={music?.videoId === undefined || music?.id === undefined}
        >
          <ListItemIcon>
            <LaunchIcon />
          </ListItemIcon>
          <ListItemText>{music?.name}</ListItemText>
        </ListItemButton>

        <Divider />
        <ListSubheader>似ている曲</ListSubheader>
        {similarMusics?.map(({ id, name, videoId }) => (
          <ListItemButton
            key={id}
            onClick={() => router.push(`/music/${videoId}?id=${id}`)}
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
