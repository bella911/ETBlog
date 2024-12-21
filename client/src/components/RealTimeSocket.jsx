import React, { useState, useEffect } from "react";
import axios from "../axios";
import { io } from "socket.io-client";

// const socket = io("http://localhost:5000"); // Connect to the backend

const RealTimeSocket = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend
  useEffect(() => {
    axios      
    .get(`/post/getpost/${id}`)
    .then((response) => {
      setPosts(response.data);
    });
  }, []);

  // Listen for real-time updates
//   useEffect(() => {
//     socket.on("like-updated", (updatedPost) => {
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === updatedPost._id ? updatedPost : post
//         )
//       );
//     });

//     return () => {
//       socket.off("like-updated");
//     };
//   }, []);

  // Handlers for like and unlike
  const handleLike = (id) => {
    // axios.post(`http://localhost:5000/like/${id}`);
    axios.put(`/post/socket/like/${id}`);

  };

//   const handleUnlike = (id) => {
//     axios.post(`http://localhost:5000/unlike/${id}`);
//   };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Real-Time Like & Unlike</h1>
      {posts.map((post) => (
        <div key={post._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <p>{post.content}</p>
          <p>Likes: {post.likes}</p>
          <button onClick={() => handleLike(post._id)}>Like</button>
          {/* <button onClick={() => handleUnlike(post._id)}>Unlike</button> */}
        </div>
      ))}
    </div>
  );
};

export default RealTimeSocket;
