import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { FollowModal } from "../Modal";
import { useSelector } from "react-redux";

function MyPostsHeader({
  loading,
  userInfoPP,
  userInfoId,
  followers,
  following,
  userInfoUsername,
  followUnfollowUser,
  checkFollowers,
}) {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div>
      <div className="rounded-t-lg md:h-52 h-32 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          // src={user.coverImg}
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />
      </div>
      {/* main profile picture */}
      <div className="flex justify-between">
        <div className="md:ml-8 ml-4 lg:w-32 w-20 lg:h-32 h-20 relative lg:-mt-16 -mt-8 border-4 dark:border-gray-800 rounded-full overflow-hidden">
          <img
            className="object-cover object-center w-full"
            src={`${loading ? avatar : userInfoPP}`}
            alt="user image"
          />
        </div>

        <div>
          {/* check the user id and author page is same or current user logged in the apply dynamic following */}
          {!currentUser ? (
            <div className="mt-2">
              <FollowModal />
            </div>
          ) : currentUser._id !== userInfoId ? (
            <Button
              gradientDuoTone="greenToBlue"
              outline
              className="mt-2 mr-1"
              onClick={() => {
                // dispatch(followId(user.user._id));
                followUnfollowUser(userInfoId);
              }}
              disabled={loading}
            >
              {checkFollowers.includes(currentUser._id)
                ? "Following"
                : "Follow"}
            </Button>
          ) : (
            <Button
              gradientDuoTone="greenToBlue"
              outline
              className="mt-2 mr-1"
              size="sm"
            >
              <Link to={"/user/editprofile"}>Edit Profile</Link>
            </Button>
          )}
        </div>
      </div>
      {/* name and work */}
      <div className="text-left mt-2 md:ml-8 ml-4 text-base">
        <h2 className="font-semibold mb-3 ">
          {userInfoUsername?.toUpperCase()}
        </h2>
        {/* <p>Freelance Web Designer</p> */}
      </div>

      {/* real time list followers and followings */}
      <div className="text-left mt-2 md:ml-8 ml-4 text-base">
        <span className="mr-1 ">
          {following} <span>Following</span>{" "}
        </span>
        <span className="mr-1">
          {followers} <span>Followers</span>{" "}
        </span>
      </div>
    </div>
  );
}

export default MyPostsHeader;
