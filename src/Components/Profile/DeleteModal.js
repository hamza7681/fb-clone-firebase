import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../Firebase/firebase";
import { toast } from "react-toastify";

const DeleteModal = ({ handleClose, open, id }) => {
  const [loading, setLoading] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "6px",
    p: 4,
  };

  const deletePost = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "post", id));
      toast.success("Post has been deleted");
      handleClose();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <p>Are you sure to delete this post?</p>
            <button className="btn btn-danger" onClick={deletePost}>
              {loading ? "deleting..." : "Delete"}
            </button>
            <button
              className="btn btn-success"
              onClick={handleClose}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default DeleteModal;
