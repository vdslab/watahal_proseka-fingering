import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

export default function ScrollableBox({
  children,
  height,
  YTPlayer,
  svgHeight,
}) {
  const wrapperRef = useRef();
  // TODO: 動画時間でyScaleの作成

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     console.log("timer");
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <Box
      maxHeight={height}
      overflow={"auto"}
      ref={wrapperRef}
      onClick={() => {
        console.log("scroll test: move to top");
        wrapperRef.current?.scroll({
          top: 1000,
          left: 1000,
          behavior: "smooth",
        });
      }}
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {children}
    </Box>
  );
}
