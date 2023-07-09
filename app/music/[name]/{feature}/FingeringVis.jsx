"use client";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";

export default function FingeringVis() {
  const [open, setOpen] = useState(false);
  function handleToggle(e) {
    setOpen(false);
  }
  return (
    <>
      <p>fingering vis</p>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        Drawer
      </button>
      <Drawer anchor="right" open={open} onClose={handleToggle}>
        <ul>
          <li>test</li>
          <li>test2</li>
          <li>test4</li>
        </ul>
      </Drawer>
    </>
  );
}
