"use client";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import useSWR from "swr";
import LaunchIcon from "@mui/icons-material/Launch";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LinkWrapper from "@/components/Link";

const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function RelationList({ nodeId, setNodeId }) {
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
    <Box
      bgcolor={"background.light"}
      height={"100%"}
      ref={wrapperRef}
      overflow={"auto"}
    >
      <List sx={{ maxHeight: height, backgroundColor: "background.light" }}>
        <ListSubheader sx={{ backgroundColor: "background.light" }}>
          選択した曲
        </ListSubheader>
        <ListItem
          secondaryAction={
            <LinkWrapper
              href={`/music/${music?.id}`}
              disabled={music?.videoId === undefined || music?.id === undefined}
            >
              <LaunchIcon />
            </LinkWrapper>
          }
        >
          <ListItemText>{music?.name}</ListItemText>
        </ListItem>

        <Divider />
        <ListSubheader sx={{ backgroundColor: "background.light" }}>
          似ている曲
        </ListSubheader>
        {similarMusics?.map(({ id, name, videoId }) => (
          <ListItem
            key={id}
            style={{ cursor: "auto" }}
            secondaryAction={
              <LinkWrapper href={`/music/${music?.id}`} disabled={id == null}>
                <LaunchIcon />
              </LinkWrapper>
            }
          >
            <ListItemButton
              onClick={() => {
                setNodeId(id);
              }}
              style={{
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              {name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
