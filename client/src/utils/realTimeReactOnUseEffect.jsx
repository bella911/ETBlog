import React from 'react'

  // Optimistic update for like/unlike

export const handleLike = (id) => {

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );

    axios
      .post(`https://abeltech.et/like/${id}`)
      .then((response) => {
        // Optionally update with the backend's response
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === id ? { ...post, likes: response.data.likes } : post
          )
        );
      })
      .catch((err) => {
        setError("Failed to like post");
        console.error(err);

        // Rollback if request fails
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === id ? { ...post, likes: post.likes - 1 } : post
          )
        );
      });

      return(
        {}
      )
  };

//   const handleUnlike = (id) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post._id === id ? { ...post, likes: post.likes - 1 } : post
//       )
//     );

//     axios
//       .post(`http://localhost:5000/unlike/${id}`)
//       .then((response) => {
//         // Optionally update with the backend's response
//         setPosts((prevPosts) =>
//           prevPosts.map((post) =>
//             post._id === id ? { ...post, likes: response.data.likes } : post
//           )
//         );
//       })
//       .catch((err) => {
//         setError("Failed to unlike post");
//         console.error(err);

//         // Rollback if request fails
//         setPosts((prevPosts) =>
//           prevPosts.map((post) =>
//             post._id === id ? { ...post, likes: post.likes + 1 } : post
//           )
//         );
//       });
//   };
