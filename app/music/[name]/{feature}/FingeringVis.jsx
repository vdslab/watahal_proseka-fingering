"use client";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import Image from "next/image";

export default function FingeringVis() {
  const [open, setOpen] = useState(false);
  function handleToggle(e) {
    setOpen(false);
  }
  return (
    <>
      <button
        onClick={(e) => {
          setOpen(!open);
        }}
      >
        Drawer
      </button>
      <Drawer
        PaperProps={{
          sx: {
            width: "40%",
          },
        }}
        anchor="right"
        variant="persistent"
        open={open}
        onClose={handleToggle}
      >
        <Image src={"/fingering.png"} alt="仮の運指表示" fill={true} />
      </Drawer>
    </>
  );
}
