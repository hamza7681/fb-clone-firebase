import { Avatar } from "@mui/material";
import React, { useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import "./feed.css";
import { useSelector } from "react-redux";
import ComingModal from "./ComingModal";
import PostModal from "./PostModal";

const MessageSender = ({ loadOpen, handleloadClose, handleloadOpen }) => {
  const { user, fullUser } = useSelector((state) => state.AuthReducer);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
  };
  return (
    <>
      <PostModal loadOpen={loadOpen} handleloadClose={handleloadClose} />
      <div className="messageSender">
        <div className="messageSender_top">
          <Avatar src={fullUser?.data.profilePhoto} className="feed_avatar" />
          <form onClick={handleloadOpen}>
            <input
              className="messageSender_input"
              type="text"
              placeholder={`What's is in your mind?`}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />

            <button onClick={handleSubmit} type="submit">
              Post
            </button>
          </form>
        </div>
        <ComingModal open={open} handleClose={handleClose} />
        <div className="messageSender_bottom">
          <div className="messageSender_option" onClick={handleOpen}>
            <VideocamIcon style={{ color: "red" }} />
            <h3>Live Video</h3>
          </div>
          <div className="messageSender_option" onClick={handleloadOpen}>
            <PhotoLibraryIcon style={{ color: "green" }} />
            <h3>Photo/Video</h3>
          </div>
          <div className="messageSender_option" onClick={handleloadOpen} >
            <InsertEmoticonIcon style={{ color: "orange" }} />
            <h3>Feeling/Activity</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageSender;
