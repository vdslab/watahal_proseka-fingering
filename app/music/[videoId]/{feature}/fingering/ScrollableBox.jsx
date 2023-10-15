import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { ConstructionOutlined } from "@mui/icons-material";

export default function ScrollableBox({
  children,
  height,
  YTPlayer,
  svgHeight,
}) {
  const wrapperRef = useRef();

  const fast = svgHeight / (YTPlayer?.getDuration() - 14); //1秒における動くピクセル数
  const FPS = 30;
  function calcPoint(time) {
    return fast * time;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (YTPlayer?.getPlayerState() === 1) {
        wrapperRef.current?.scroll({
          top: svgHeight - calcPoint(YTPlayer?.getCurrentTime() - 6),
          left: 0,
          behavior: "auto",
        });
      }
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
      onClick={() => {
        wrapperRef.current?.scroll({
          top: 1000,
          left: 0,
          behavior: "smooth",
        });
      }}
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {children}
    </Box>
  );
}
