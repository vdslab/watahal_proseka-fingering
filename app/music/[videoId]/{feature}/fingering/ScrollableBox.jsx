import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

export default function ScrollableBox({ children, height, top, left }) {
  const wrapperRef = useRef();

  useEffect(() => {
    wrapperRef.current?.scroll({
      top,
      left,
      behavior: "smooth",
    });
  }, [top, left]);

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
