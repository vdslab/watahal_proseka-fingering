"use client";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";
import useSWR from "swr";
import LaunchIcon from "@mui/icons-material/Launch";

import LinkWrapper from "@/components/Link";

const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function RelationList({ nodeId, setNodeId }) {
  const { data: musicListData, error } = useSWR("/api/music", fetcher);
  const { data: similarityData, error2 } = useSWR(
    nodeId ? `/api/music/similarity/${nodeId}` : null,
    fetcher
  );

  if (error || error2) return <div>Failed to load</div>;

  const music = musicListData?.find((music) => music.id === nodeId);
  similarityData?.sort((a, b) => b.similarity - a.similarity);
  const similarMusics = similarityData
    ?.slice(0, 10)
    ?.map(({ target }) => musicListData?.find((music) => music.id === target));

  return (
    <Stack
      height={"100%"}
      spacing={1}
      bgcolor={"background.light"}
      overflow={"auto"}
    >
      <List>
        <ListSubheader
          sx={{ backgroundColor: "background.light", userSelect: "none" }}
        >
          選択した曲
        </ListSubheader>
        <ListItem
          secondaryAction={
            music?.id != null && (
              <LinkWrapper href={`/music/${music?.id}`}>
                <LaunchIcon />
              </LinkWrapper>
            )
          }
        >
          <ListItemText>{music?.name}</ListItemText>
        </ListItem>
      </List>
      <Divider variant="middle" />
      <List>
        <ListSubheader
          sx={{ backgroundColor: "background.light", userSelect: "none" }}
        >
          似ている曲
        </ListSubheader>
        {similarMusics?.map(({ id, name }) => (
          <ListItem
            key={id}
            style={{ cursor: "auto" }}
            secondaryAction={
              <LinkWrapper href={`/music/${id}`} disabled={id == null}>
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
              <ListItemText>{name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
