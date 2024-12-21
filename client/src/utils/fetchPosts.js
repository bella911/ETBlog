import axios from "../axios";
import React, { useEffect, useState } from "react";

// post items use effect and functions
export const getAllPosts = async () => {
  const [posts, setPosts] = useState([]);

  axios
    .get("/post/getAllPosts")
    .then((res) => {
      setPosts(res.data.data);
      // console.log(res.data.data);
    })
    .catch((error) => console.log(error));

    return posts;
};
