"use client";

import * as React from "react";

import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Imformation() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen} size="large">
        <InfoOutlinedIcon color="inherit" fontSize="large" />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ caretColor: "transparent" }}
          >
            使い方
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, caretColor: "transparent" }}
          >
            曲を選ぶドン！！
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
