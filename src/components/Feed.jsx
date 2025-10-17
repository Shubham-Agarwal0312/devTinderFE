/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { BASE_URL } from "../utility/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utility/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const feed = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feed.data));
      console.log("feed res = ", feed.data);
    } catch (err) {
      console.log("getFeed error: ", err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return (
      <h1 className="flex justify-center text-2xl font-bold">
        No New Users Found
      </h1>
    );

  return (
    feed && (
      <div className="flex justify-center my-5">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
