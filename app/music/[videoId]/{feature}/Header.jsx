"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Imformation from "./Imformation";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Image from "next/image";

const theme = createTheme({
  palette: {
    primary: { main: "#acfef4" },
    secondary: { main: "#464366" },
  },
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-center",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 60,
    maxHeight: 300,
  },
  display: "flex",
  justifyContent: "space-between",
}));

export default function Header() {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <Box marginBottom={3}>
        <AppBar
          position="static"
          color="primary"
          padding={3}
          sx={{ boxShadow: 1 }}
        >
          <StyledToolbar>
            <Box
              display="flex"
              onClick={() => router.push("/")}
              sx={{ cursor: "pointer" }}
            >
              <Box position="relative" sx={{ width: "50px", height: "50px" }}>
                <Image
                  src="/miku.png"
                  alt="mikusan"
                  fill
                  style={{ borderRadius: "50px" }}
                />
              </Box>
              <Typography
                color="secondary"
                variant="h5"
                component="div"
                alignSelf="center"
              >
                プロセカ 楽曲予習
              </Typography>
            </Box>
            {/* <Imformation /> */}
          </StyledToolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
