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
    <Stack direction="row" flexWrap={"wrap"} justifyContent={"space-between"}>
      <Typography alignSelf={"center"}>楽曲レベル</Typography>
      <Box width={"60%"} height={"100%"} paddingX={3}>
        <Stack
          direction="row"
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          <Typography alignSelf={"center"}>低</Typography>
          <Box width={"70%"} height={"100%"} ref={wrapperRef}>
            <canvas width={size.width} height={size.height} ref={canvasRef} />
          </Box>
          <Typography alignSelf={"center"}>高</Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
