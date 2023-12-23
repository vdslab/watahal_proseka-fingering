"use client";

import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function Title() {
  const params = useParams();
  const { id } = params;
  const { data, isLoading } = useSWR(`/api/music/${id}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  if (isLoading) {
    return null;
  }

  const name = data?.name;

  return (
    <Box paddingX={3}>
      <Typography
        variant="h4"
        component="div"
        sx={{ caretColor: "transparent" }}
      >
        {name}
      </Typography>
    </Box>
  );
}
