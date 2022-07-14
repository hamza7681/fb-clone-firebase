import React, { useEffect, useState } from "react";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ProfileFeed from "./ProfileFeed";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { toast } from "react-toastify";
import { db, storage } from "../../Firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import EditProfileModal from "./EditProfileModal";
import LoadingModal from "./LoadingModal";

const Profile = () => {
  const { user, fullUser, token } = useSelector((state) => state.AuthReducer);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loadOpen, setLoadOpen] = React.useState(false);
  const handleLoadOpen = () => setLoadOpen(true);
  const handleLoadClose = () => setLoadOpen(false);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    handleLoadOpen();
    const file = e.target.files[0];
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("upload is paused");
            break;
          case "running":
            console.log("upload is running");
            break;
          default:
            break;
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          await updateDoc(doc(db, "users", fullUser.id), {
            coverPhoto: downloadUrl,
          });
          handleLoadClose();
          toast.success("Cover photo updated");
        });
      }
    );
  };

  const uploadDp = (e) => {
    handleLoadOpen();
    const file = e.target.files[0];
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("upload is paused");
            break;
          case "running":
            console.log("upload is running");
            break;
          default:
            break;
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          await updateDoc(doc(db, "users", fullUser.id), {
            profilePhoto: downloadUrl,
          });
          handleLoadClose();
          toast.success("Profile picture updated");
        });
      }
    );
  };

  useEffect(() => {
    if (fullUser) {
      const getUserPost = async () => {
        const querySnapshots = await getDocs(collection(db, "post"));
        const allPost = querySnapshots.docs
          .filter((doc) => doc.data().username === fullUser?.data.name)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        dispatch({
          type: "GET_USER_POSTS",
          payload: allPost,
        });
      };
      getUserPost();
    }
  }, [fullUser, dispatch]);

  return (
    <>
      <LoadingModal loadOpen={loadOpen} handleLoadClose={handleLoadClose} />
      <div className="container-fluid profile">
        <div className="container profile_top">
          <div className="cover_pic">
            <img src={fullUser?.data.coverPhoto} alt="" />
            <button className="cover_btn">
              <label for="cover">Edit Photo</label>
            </button>
            <input
              type="file"
              id="cover"
              onChange={(e) => uploadImage(e)}
              style={{ display: "none" }}
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6 profile_div">
                  <div className="profile_img">
                    <img src={fullUser?.data.profilePhoto} alt="dp" />
                    <div className="camera">
                      <label for="dp">
                        <CameraAltIcon />
                      </label>
                      <input
                        type="file"
                        id="dp"
                        onChange={(e) => uploadDp(e)}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 name">
                  <p>{fullUser?.data.name}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 edit_div">
              <EditProfileModal open={open} handleClose={handleClose} />
              <Button className="edit" onClick={handleOpen}>
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ProfileFeed />
    </>
  );
};

export default Profile;
