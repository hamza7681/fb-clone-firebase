import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./profile.css";
import DeleteModal from "./DeleteModal";
import { useSelector } from "react-redux";

const ProfilePost = ({
  profilePic,
  image,
  username,
  timestamp,
  message,
  feeling,
  activity,
  activity_work,
  id
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { fullUser } = useSelector((state) => state.AuthReducer);

  const FeelingsSpan = () => {
    if (feeling) {
      return <span className="feelings"> is feeling {feeling}</span>;
    } else if (activity) {
      return (
        <span className="feelings">
          is {activity} {activity_work}
        </span>
      );
    }
  };

  const milliseconds = timestamp.toDate();
  const date = new Date(milliseconds);
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });
  return (
    <>
      <div className="post">
        <DeleteModal handleClose={handleClose} open={open} id={id} />
        <div className="delete_post">
          <MoreHorizIcon onClick={handleOpen} />
        </div>

        <div className="post_top">
          <Avatar src={profilePic} className="post_avatar" />
          <div className="post_topInfo">
            <h3>{username}</h3> <FeelingsSpan />
            <p>
              {day} {month} {year}
            </p>
          </div>
        </div>
        <div className="post_bottom">
          <p>{message}</p>
        </div>
        <div className="post_image">
          <img src={image} alt="" />
        </div>
        <div className="post_options">
          <div className="post_option">
            <ThumbUpIcon />
            <p>Like</p>
          </div>
          <div className="post_option">
            <ChatBubbleOutlinedIcon />
            <p>Comment</p>
          </div>
          <div className="post_option">
            <NearMeIcon />
            <p>Share</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePost;
