import {
  Fade,
  Modal,
  Box,
  Backdrop,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../Firebase/firebase";
import { useSelector } from "react-redux";
import "./profile.css";

const EditProfileModal = ({ open, handleClose }) => {
  const { fullUser } = useSelector((state) => state.AuthReducer);
  const [name, setName] = useState(fullUser?.data.name);
  const [location, setLocation] = useState(fullUser?.data.location);
  const [maritial, setMaritial] = useState(fullUser?.data.marital);
  const [work, setWork] = useState(fullUser?.data.work);
  const [school, setSchool] = useState(fullUser?.data.school);
  const [university, setUniversity] = useState(fullUser?.data.university);
  const [college, setCollege] = useState(fullUser?.data.college);
  const [loading, setLoading] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    borderRadius: "7px",
    boxShadow: 24,
    p: 4,
    height: 400,
    overflow: "scroll",
  };

  const update = async () => {
    setLoading(true)
    await updateDoc(doc(db, "users", fullUser.id), {
      name: name,
      location: location,
      marital: maritial,
      work: work,
      school: school,
      university: university,
      college: college,
    })
      .then(() => {
        toast.success("Profile updated");
        handleClose();
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
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
          <Box sx={style} className="edit_pro_res">
            <div className="update_pro_container">
              <h4 style={{ marginBottom: "15px" }}>Update Profile</h4>
              <label className="pro_label">Name:</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="pro_input"
                value={name}
                maxLength={50}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <label className="pro_label">University:</label>
              <input
                type="text"
                placeholder="Enter your university"
                className="pro_input"
                value={university}
                maxLength={50}
                onChange={(e) => {
                  setUniversity(e.target.value);
                }}
              />

              <label className="pro_label">College:</label>
              <input
                type="text"
                placeholder="Enter your college"
                className="pro_input"
                value={college}
                maxLength={50}
                onChange={(e) => {
                  setCollege(e.target.value);
                }}
              />

              <label className="pro_label">School:</label>
              <input
                type="text"
                placeholder="Enter your school"
                className="pro_input"
                value={school}
                maxLength={50}
                onChange={(e) => {
                  setSchool(e.target.value);
                }}
              />

              <label className="pro_label">Marital Status:</label>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={maritial}
                  onChange={(e) => setMaritial(e.target.value)}
                  label="Select"
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Engaged">Engaged</MenuItem>
                  <MenuItem value="It's Complicated">It's Complicated</MenuItem>
                </Select>
              </FormControl>
              <label className="pro_label">Work:</label>
              <input
                type="text"
                placeholder="Your current occupation"
                className="pro_input"
                value={work}
                maxLength={50}
                onChange={(e) => {
                  setWork(e.target.value);
                }}
              />

              <label className="pro_label">Location:</label>
              <input
                type="text"
                placeholder="Your current location"
                className="pro_input"
                value={location}
                maxLength={50}
                onChange={(e) => {
                  setLocation(e.target.value);
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

export default EditProfileModal;
