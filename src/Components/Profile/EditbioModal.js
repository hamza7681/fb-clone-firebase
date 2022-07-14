import { Fade, Modal, Box, Backdrop } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../Firebase/firebase";
import { useSelector } from "react-redux";
import "./profile.css";

const EditbioModal = ({ open, handleClose }) => {
  const { fullUser } = useSelector((state) => state.AuthReducer);
  const [bio, setBio] = useState(fullUser?.data.bio);
  const [loading, setLoading] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "7px",
    boxShadow: 24,
    p: 4,
  };

  const update = async () => {
    setLoading(true);
    if (bio === "") {
      toast.error("Field should not be empty");
      setLoading(false)
    } else {
      await updateDoc(doc(db, "users", fullUser.id), {
        bio: bio,
      })
        .then(() => {
          toast.success("Bio Updated");
          handleClose();
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
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
            <div className="bio_container">
              <h4 style={{ marginBottom: "15px" }}>Update Bio</h4>
              <input
                type="text"
                placeholder="your bio here..."
                className="bio_input"
                value={bio}
                maxLength={50}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />

              <button className="btn-primary updated_bio" onClick={update}>
                {loading ? "updating..." : "Update"}
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default EditbioModal;
