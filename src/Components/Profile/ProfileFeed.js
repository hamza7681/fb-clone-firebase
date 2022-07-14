import React from "react";
import "./profile.css";
import "../Feed/feed.css";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditbioModal from "./EditbioModal";
import { useSelector } from "react-redux";
import MessageSender from "../Feed/MessageSender";
import ProfilePost from "./ProfilePost";

const ProfileFeed = () => {
  const { fullUser } = useSelector((state) => state.AuthReducer);
  const { userPost } = useSelector((state) => state.PostReducer);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loadOpen, setLoadOpen] = React.useState(false);
  const handleloadOpen = () => setLoadOpen(true);
  const handleloadClose = () => setLoadOpen(false);

  return (
    <>
      <div className="container-fluid profile_feed">
        <div className="container profile_feed_container">
          <div className="row">
            <div className="col-md-5">
              <div className="intro">
                <h3>Intro</h3>
                <div className="bio">
                  {!fullUser?.data.bio ? (
                    <p>Please add your bio</p>
                  ) : (
                    <p>{fullUser?.data.bio}</p>
                  )}

                  <button onClick={handleOpen}>Edit Bio</button>
                  <EditbioModal open={open} handleClose={handleClose} />
                </div>
                <div className="information">
                  {fullUser?.data.work ? (
                    <div className="work">
                      <BusinessCenterIcon />
                      <span>{fullUser?.data.work}</span>
                    </div>
                  ) : (
                    ""
                  )}

                  {fullUser?.data.university ? (
                    <div className="education">
                      <SchoolIcon />
                      <span>{fullUser?.data.university}</span>
                    </div>
                  ) : (
                    ""
                  )}

                  {fullUser?.data.college ? (
                    <div className="education">
                      <SchoolIcon />
                      <span>{fullUser?.data.college}</span>
                    </div>
                  ) : (
                    ""
                  )}

                  {fullUser?.data.school ? (
                    <div className="education">
                      <SchoolIcon />
                      <span>{fullUser?.data.school}</span>
                    </div>
                  ) : (
                    ""
                  )}

                  {fullUser?.data.marital ? (
                    <div className="maritial">
                      <FavoriteIcon />
                      <span>{fullUser?.data.marital}</span>
                    </div>
                  ) : (
                    ""
                  )}

                  {fullUser?.data.location ? (
                    <div className="location">
                      <LocationOnIcon />
                      <span>from {fullUser?.data.location}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="feed">
                <MessageSender
                  loadOpen={loadOpen}
                  handleloadOpen={handleloadOpen}
                  handleloadClose={handleloadClose}
                />
                {userPost?.map((val, index) => {
                  return (
                    <ProfilePost
                      key={index}
                      image={val.image}
                      message={val.post}
                      username={val.username}
                      profilePic={val.dp}
                      timestamp={val.timestamps}
                      feeling={val.feeling}
                      activity={val.activity}
                      activity_work={val.activity_work}
                      id={val.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileFeed;
