"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Imformation from "./Imformation";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Box } from "@mui/material";

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
}));

export default function Header() {
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
            <Typography
              color="secondary"
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              プロセカ運指&曲特徴可視化
            </Typography>
            <Imformation />
          </StyledToolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
