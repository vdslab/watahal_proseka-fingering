"use client";
import Drawer from "@mui/material/Drawer";
import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import FingeringVis from "./FingeringVis";
import { styled, useTheme } from "@mui/material/styles";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  })
);

export default function Content() {
  const [open, setOpen] = useState(false);
  function handleToggle(e) {
    setOpen(false);
  }

  return (
    <div className="flex">
      <Main open={open}>
        <button
          onClick={(e) => {
            setOpen(!open);
          }}
        >
          Drawer
        </button>
        <div>
          <VideoPlayer />
        </div>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          anchor="right"
          variant="persistent"
          open={open}
          onClose={handleToggle}
        >
          <FingeringVis />
        </Drawer>
      </Main>
    </div>
  );
}
