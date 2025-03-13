import React, { useEffect, useState } from "react";
import { Button, Navbar, Tabs, Dropdown } from "flowbite-react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import {
  HiAdjustments,
  HiClipboardList,
  HiUserCircle,
  HiViewBoards,
} from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";
import { followId, postId } from "../redux/crudSlice"; // dispatch function
import { FaEllipsisH } from "react-icons/fa";

// post item imports
import ClipLoader from "react-spinners/ClipLoader";
import axios from "../axios";
// import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import Error from "./Error";
import { CommentModal, DeletePostModal, FollowModal, LikeModal, ReplyCommentOnUserPage } from "../components/Modal";
import avatar from "../images/avatar.png"
import SuggestedUser from "../components/userpage/SuggestedUser";
import ScrollToTop from "../components/ScrollToTop";
import { TotalComments } from "../components/comment/OldTotalCommentCounter";
import moment from "moment"
import { Helmet } from "react-helmet";
import MyPostsHeader from "../components/userpage/MyPostsHeader";
import PostsTab from "../components/userpage/PostsTab";
import LikedPostsTab from "../components/userpage/LikedPostsTab";
import VideosTab from "../components/userpage/VideosTab";
import RepliesTab from "../components/userpage/RepliesTab";
function UserPage() {
  // const path = useLocation().pathname; // change current clicked tabs
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { username } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  // const likePost = useSelector((state) => state.post.like);
  const followUser = useSelector((state) => state.post.follow);
  // const [user, setUser] = useState(""); // this user is the author page user
  // const [followers, setFollowers] = useState(0);
  // const [following, setFollowing] = useState(0);
  const [checkFollowers, setCheckFollowers] = useState([]);
  const [userInfo, setUserInfo] = useState({
    user: {},
    followers: 0,
    following: 0,
    likedPosts: 0,
  });
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [refreshChange, setRefreshChange] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const location = useLocation();

  let suggestedUserIndex = 2;

  // display user detail info by getting username from author page
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/user/profile/${username}`) ///{ withCredentials: true }
        .then((res) => {
          setUserInfo({
            user: res.data,
            followers: res.data.followers.length,
            following: res.data.following.length,
            likedPosts: res.data.likedPosts.length,
          });
          likesPost(res.data._id)
          setCheckFollowers(res.data.followers);
          // authorPage();
          setIsNotFound(false);
        })
        .catch((error) => {
          console.log(error.message);
          setIsNotFound(true);
        });
    }
    // Fetch data immediately
    fetchData();

    // Set up polling (e.g., every 3 seconds)
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);

  }, [counter, username]);

  // display author page
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/post/user/${username}`) // { withCredentials: true }
        .then((res) => {
          setPosts(res.data.data); // fetch user posts
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);

  }, [counter, username]);

  // like and unlike post
  const likeUnlikePost = (id) => {
    axios
      .put(`/post/like/${id}`, {}, { withCredentials: true })
      .then((res) => {
        setCounter(res.data.updatedLikes.length);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // get Likes posts ???
  const likesPost = (authorId) => {
    setRefreshChange(true);
    axios
      .get(`/post/likes/${authorId}`, {}, { withCredentials: true })
      .then((res) => {
        setLikedPosts(res.data)
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // follow, following and unfollow user
  const followUnfollowUser = (followUserId) => {
    axios
      .put(`/user/follow/${followUserId}`, {}, { withCredentials: true })
      .then((res) => {
        setCounter(res.data.updatedFollows.length);
      })
      .catch((error) => {
        console.log(error.message, "Something is happening abel");
      });
  };

  // suggested user follow unfollow
  const suggestedUserFollowUnFollow = (suggestedFollow) => {
    axios
      .put(`/user/follow/${suggestedFollow}`, {}, { withCredentials: true })
      .then((res) => {
        setCounter(res.data.updatedFollows.length);
      })
      .catch((error) => {
        console.log(error.message, "Something is happening abel");
      });
  };

  // get all users
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/user/users`, { withCredentials: true }) // { withCredentials: true }
        .then((res) => {
          setAllUsers(res.data); // fetch user posts
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);

  }, [username]);


  // count post viewers
  const countView = async (id) => {
    axios
      .get(`/post/count/${id}`)
      .then((res) => {
        navigate(`/posts/${id}`)
      })
      .catch((error) => console.log(error));
  }

  // count post viewers for like and unlike
  const countViewWhenLike = async (id) => {
    axios
      .get(`/post/count/${id}`)
      .catch((error) => console.log(error));
  }

  return (
    <div className="bg-[#eee] dark:bg-gray-800">
      <Helmet>
        <title>My Posts | ETBlog</title>
        <meta name="description" content="List all my post and user page" />
      </Helmet>
      <ScrollToTop />
      {!isNotFound ? ( // for catching not exist page throw not found error
        <div className="mx-auto  max-w-7xl  pb-12 flex flex-col  md:flex-row ">
          <div className="flex-1 px-4 w-full lg:px-0 mt-12 mb-4 text-gray-700 dark:text-gray-200 max-w-screen-md mx-auto text-lg leading-relaxed">

            {/* contain cover picture and user picture of the page */}
            <MyPostsHeader loading={loading} userInfoPP={userInfo.user.profilePicture} userInfoId={userInfo.user._id} following={userInfo.following}
              followers={userInfo.followers} userInfoUsername={userInfo.user.username} followUnfollowUser={followUnfollowUser} checkFollowers={checkFollowers}
            />

            {/* select tabs */}
            <div className="my-16">
              <Tabs
                aria-label="Tabs with underline"
                variant="underline"
                className="flex justify-around pb-1 z-0 "
              >
                <Tabs.Item active title="Posts">
                  {loading ?
                    <div className="flex justify-center items-center mt-20">
                      <ClipLoader speedMultiplier="0.5" size="30px" />
                    </div>
                    :
                    // post tab section 
                    <PostsTab posts={posts} userInfoPP={userInfo.user.profilePicture} currentUser={currentUser} countView={countView} likeUnlikePost={likeUnlikePost} countViewWhenLike={countViewWhenLike} />
                  }
                </Tabs.Item>
                <Tabs.Item title="Replies">
                  <RepliesTab />
                </Tabs.Item>
                <Tabs.Item title="Likes">
                  {loading ?
                    <div className="flex justify-center items-center mt-20">
                      <ClipLoader speedMultiplier="0.5" size="30px" />
                    </div>
                    :
                    // likes tab section
                    <LikedPostsTab likedPosts={likedPosts} userInfoPP={userInfo.user.profilePicture} countView={countView} likeUnlikePost={likeUnlikePost} countViewWhenLike={countViewWhenLike} />
                  }
                </Tabs.Item>
                <Tabs.Item title="Videos">
                  <VideosTab />
                </Tabs.Item>
              </Tabs>
            </div>
          </div>
          {/* side bar of the body */}
          {/* display suggested user only when user authenticate */}

        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default UserPage;
