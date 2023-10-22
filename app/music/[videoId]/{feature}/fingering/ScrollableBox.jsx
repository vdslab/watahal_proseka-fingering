import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import * as d3 from "d3";

export default function ScrollableBox({
  children,
  height,
  YTPlayer,
  svgHeight,
  startTime,
  sec,
  measure,
}) {
  const wrapperRef = useRef();
  const spaceHeight = height / 10;

  const timeScale = d3
    .scaleLinear()
    .domain([startTime, startTime + sec])
    .range(measure);

  const yScale = d3
    .scaleLinear()
    .domain(measure)
    .range([svgHeight, height])
    .nice(100);

  const FPS = 30;

  useEffect(() => {
    const timer = setInterval(() => {
      const playing = YTPlayer?.getPlayerState() === 1;
      if (!playing) {
        return;
      }

      const currentTime = YTPlayer?.getCurrentTime();
      const playBefore = currentTime < startTime;
      const playAfter = currentTime > startTime + sec;

      if (playAfter) {
        return;
      }

      if (playBefore) {
        wrapperRef.current?.scroll({
          top: svgHeight,
          left: 0,
          behavior: "auto",
        });
        return;
      }

      wrapperRef.current?.scroll({
        top: yScale(timeScale(currentTime)) - height,
        left: 0,
        behavior: "auto",
      });
    }, 1000 / FPS);

    return () => {
      clearInterval(timer);
    };
  }, [YTPlayer]);

  return (
    <Box
      maxHeight={height}
      overflow={"auto"}
      ref={wrapperRef}
      height={"100%"}
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {children}
    </Box>
  );
}
