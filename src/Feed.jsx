import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store)=> store.feed)
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
  if(!feed) return ;
  if(feed.length == 0) return <h1 className="text-center text-bold text-2xl my-10">No Users Available </h1>;
  return feed && (<div className="flex justify-center my-4">
    <UserCard user={feed[0]}/>
  </div>);
};

export default Feed;
