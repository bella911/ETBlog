import React from 'react'

function FollowUnfollow() {
    // follow, following and unfollow user
  const followUnfollowUser = (followUserId) => {
    // console.log(followUser);
    setLoading(true);
    // .post(`/user/follow/${followUser}`,{data: "abel"}, {withCredentials: true}) // { withCredentials: true }
    // .post("/post/create", data, {withCredentials: true})
    axios
      .put(`/user/follow/${followUserId}`, {}, { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        setCounter(res.data.updatedFollows.length);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message, "Something is happening abel");
        setLoading(false);
      });
  };

  return (
    <div>FollowUnfollow</div>
  )
}

export default FollowUnfollow