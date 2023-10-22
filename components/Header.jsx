"use client";

import * as React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Imformation from "./Imformation";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Image from "next/image";

const theme = createTheme({
  palette: {
    primary: { main: "#acfef4" },
    secondary: { main: "#464366" },
  },
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-center",
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),

  "@media all": {
    minHeight: 60,
    maxHeight: 300,
  },
}));

export default function Header() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static" color="primary" sx={{ boxShadow: 1 }}>
          <StyledToolbar>
            <Box position="relative" sx={{ width: "70px", height: "70px" }}>
              <Image
                src="/miku.png"
                alt="mikusan"
                fill
                style={{ borderRadius: "50px" }}
              />
            </Box>
            <Typography
              color="secondary"
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              プロセカ 楽曲予習
            </Typography>
          </StyledToolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
