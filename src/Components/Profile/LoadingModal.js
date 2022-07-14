import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";

const LoadingModal = ({loadOpen,handleLoadClose}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius:'7px',
    p: 4,
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={loadOpen}
        onClose={handleLoadClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loadOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Uploading...
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default LoadingModal;
