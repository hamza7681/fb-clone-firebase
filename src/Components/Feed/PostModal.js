import { Avatar, Backdrop, Box, Fade, Modal } from "@mui/material";
import React from "react";
import "./feed.css";
import { useSelector } from "react-redux";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import FeelingModal from "./FeelingModal";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../Firebase/firebase";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const PostModal = ({ handleloadClose, loadOpen }) => {
  const { fullUser, user } = useSelector((state) => state.AuthReducer);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [feeling, setFeeling] = React.useState("");
  const [activity, setActivity] = React.useState("");
  const [act, setAct] = React.useState("");
  const [img, setImg] = React.useState(null);
  const [imgUrl, setImgUrl] = React.useState();
  const [newLoad, setNewLoad] = React.useState(false);

  const handleChange = (e) => {
    setNewLoad(true);
    const file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImgUrl(downloadUrl);
          setNewLoad(false);
        });
      }
    );
  };

  const [loading, setLoading] = React.useState(false);
  const [postMsg, setPostMsg] = React.useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "7px",
  };

  const FeelingsSpan = () => {
    if (feeling) {
      return <span className="feelings"> is feeling {feeling}</span>;
    } else if (activity) {
      return (
        <span className="feelings">
          is {activity} {act}
        </span>
      );
    }
  };

  const post = async () => {
    setLoading(true);
    if (postMsg === "") {
      toast.error("Please write something..!!");
      setLoading(false);
    } else {
      try {
        await addDoc(collection(db, "post"), {
          post: postMsg,
          feeling: feeling,
          activity: activity,
          activity_work: act,
          user: user.id,
          image: imgUrl,
          username: fullUser.data.name,
          dp: fullUser.data.profilePhoto,
          timestamps: serverTimestamp(),
        });
        toast.success("Post shared successfully");
        setAct("");
        setActivity("");
        setPostMsg("");
        setFeeling("");
        setLoading(false);
        setImg(null);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={loadOpen}
        onClose={handleloadClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loadOpen}>
          <Box sx={style} className="post_sec">
            <div className="create">
              <h5>Create post</h5>
            </div>
            <hr />
            <div className="avatar_sec">
              <Avatar src={fullUser?.data.profilePhoto} alt="dp" />
              <p>
                {fullUser?.data.name}
                <FeelingsSpan />
              </p>
            </div>
            <div className="textarea_sec">
              <textarea
                rows={5}
                placeholder={`What's on your mind, ${fullUser?.data.name}?`}
                value={postMsg}
                onChange={(e) => setPostMsg(e.target.value)}
              ></textarea>
            </div>
            {img && (
              <div className="post_img">
                <img src={img} alt="" />
              </div>
            )}
            <div className="add_to_post">
              <p>Add to your post</p>
              <div>
                <input
                  type="file"
                  onChange={(e) => handleChange(e)}
                  id="pic"
                  style={{ display: "none" }}
                />
                <label for="pic" style={{ cursor: "pointer" }}>
                  <PhotoLibraryIcon style={{ color: "green" }} />
                </label>
                <FeelingModal
                  feeling={feeling}
                  setFeeling={setFeeling}
                  handleClose={handleClose}
                  open={open}
                  activity={activity}
                  setActivity={setActivity}
                  act={act}
                  setAct={setAct}
                />
                <InsertEmoticonIcon
                  style={{ color: "orange" }}
                  onClick={handleOpen}
                />
              </div>
            </div>
            <div className="post_btn">
              {newLoad ? (
                <button onClick={post} disabled>
                 Post
                </button>
              ) : (
                <button onClick={post}>
                  {loading ? "Posting..." : "Post"}
                </button>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default PostModal;
