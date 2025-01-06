import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFeed } from "./utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get("http://localhost:3000/feed",{withCredentials:true});
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return <div>Feed</div>;
};

export default Feed;
