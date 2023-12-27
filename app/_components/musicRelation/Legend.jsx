import { Box, Stack, Typography } from "@mui/material";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function Legend({ range }) {
  const wrapperRef = useRef();
  const canvasRef = useRef();
  const colorScale = d3.scaleSequential(d3.interpolateBuPu).domain(range);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    setSize({ width, height });
    draw();
  }, []);

  useEffect(() => {
    draw();
  }, [range, size]);

  function draw() {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const context = canvas.getContext("2d");
    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);
    const color = colorScale.interpolator();

    for (let i = 0; i < width; i++) {
      context.fillStyle = color(i / width);
      context.fillRect(i, 0, 1, height);
    }
  }

  return (
    <Stack direction="row" justifyContent={"space-between"} flexWrap={"wrap"}>
      <Typography
        alignSelf={"center"}
        sx={{ caretColor: "transparent", userSelect: "none" }}
      >
        楽曲レベル
      </Typography>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        minWidth={"50%"}
        height={"100%"}
      >
        <Typography
          alignSelf={"center"}
          sx={{ caretColor: "transparent", userSelect: "none" }}
        >
          低
        </Typography>
        <Box width={"70%"} height={"100%"} ref={wrapperRef}>
          <canvas width={size.width} height={size.height} ref={canvasRef} />
        </Box>
        <Typography
          alignSelf={"center"}
          sx={{ caretColor: "transparent", userSelect: "none" }}
        >
          高
        </Typography>
      </Stack>
    </Stack>
  );
}
