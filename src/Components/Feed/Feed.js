import React from "react";
import MessageSender from "./MessageSender";
import Post from "./Post";
import pic from "../../assets/pic.jpg";
import { useSelector } from "react-redux";

const Feed = () => {
  const { posts } = useSelector((state) => state.PostReducer);
  const [loadOpen, setLoadOpen] = React.useState(false);
  const handleloadOpen = () => setLoadOpen(true);
  const handleloadClose = () => setLoadOpen(false);
  return (
    <>
      <div className="feed">
        <MessageSender
          loadOpen={loadOpen}
          handleloadOpen={handleloadOpen}
          handleloadClose={handleloadClose}
        />
        {posts?.map((val, index) => {
          return (
            <Post key={index}
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
    </>
  );
};

export default Feed;
