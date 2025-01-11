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
import {FollowModal, LikeModal, ReplyCommentOnUserPage } from "../components/Modal";
import avatar from "../images/avatar.png"
import SuggestedUser from "../components/userpage/SuggestedUser";
import ScrollToTop from "../components/ScrollToTop";
import DeleteModal from "../components/DeleteModal"
import Demo from "../components/Demo"
import { TotalComments } from "../components/Utils";
import moment from "moment"
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
  const [user, setUser] = useState({
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
    axios
      .get(`/user/profile/${username}`) ///{ withCredentials: true }
      .then((res) => {
        setUser({
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
  }, [counter, username]);

  // display author page
  useEffect(() => {
    axios
      .get(`/post/user/${username}`) // { withCredentials: true }
      .then((res) => {
        setPosts(res.data.data); // fetch user posts
      })
      .catch((error) => {
        console.log(error.message);
      });
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
    axios
      .get(`/user/users`, { withCredentials: true }) // { withCredentials: true }
      .then((res) => {
        setAllUsers(res.data); // fetch user posts
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [username]);


   // count post viewers
   const countView = async (id) =>{
    axios
     .get(`/post/count/${id}`)
     .then((res) => {
       navigate(`/posts/${id}`)
     })
     .catch((error) => console.log(error));
   }

  return (
    <div className="bg-[#eee] dark:bg-gray-800">
      <ScrollToTop/>
      {!isNotFound ? ( // for catching not exist page throw not found error
         <div className="mx-auto  max-w-7xl  pb-12 flex flex-col  md:flex-row ">
          <div className="flex-1 px-4 w-full lg:px-0 mt-12 mb-4 text-gray-700 dark:text-gray-200 max-w-screen-md mx-auto text-lg leading-relaxed">
            {/* cover picture */}
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
                    src={`${loading? avatar : user.user.profilePicture}`}
                    // src={user.user.profilePicture}
                    alt="Woman looking front"
                  />
                </div>

                <div>
                  {/* check the user id and author page is same or current user logged in the apply dynamic following */}
                  {!currentUser ? (
                    <div className="mt-2">
                      <FollowModal />
                    </div>
                  ) : currentUser._id !== user.user._id ? (
                    <Button
                      gradientDuoTone="greenToBlue"
                      outline
                      className="mt-2 mr-1"
                      onClick={() => {
                        // dispatch(followId(user.user._id));
                        followUnfollowUser(user.user._id);
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
                <h2 className="font-semibold mb-3 ">{user.user.username?.toUpperCase()}</h2>
                <p>Freelance Web Designer</p>
              </div>

              {/* real time list followers and followings */}
              <div className="text-left mt-2 md:ml-8 ml-4 text-base">
                <span className="mr-1 ">
                  {user.following} <span>Following</span>{" "}
                </span>
                <span className="mr-1">
                  {user.followers} <span>Followers</span>{" "}
                </span>
              </div>
            </div>
            {/* select tabs */}
            <div className="my-16">
              <Tabs
                aria-label="Tabs with underline"
                variant="underline"
                className="flex justify-around pb-1 z-0 "
              >
                <Tabs.Item active title="Posts">
                { loading ? 
                  <div className="flex justify-center items-center mt-20">
                  <ClipLoader speedMultiplier="0.5" size="30px" />
                   </div>
                  : 
                  posts.map(
                    ({
                      _id,
                      title,
                      description,
                      createdAt,
                      image,
                      author,
                      likes,
                      comments,
                      views,
                      user
                    }) => (
                      <article
                        key={_id}
                        className="flex font-medium text-gray-800 dark:text-gray-200 md:px-4 mb-3  bg-[#eee] dark:bg-gray-800"
                       >
                        <div className="flex">
                          <img
                            src={image}
                            alt=""
                            className="h-10 w-10 rounded-full bg-gray-50"
                          />
                        </div>
                        <div className=" h-full w-full object-cover object-center lg:h-full lg:w-full   md:max-w-none sm:max-w-none  overflow-hidden">
                          <div className="p-2">
                            <div className="text-lg leading-6 -mt-1 flex justify-between items-center">
                              <p className=" flex font-semibold ">
                                <Link to={`/user/${author}`} className="flex items-center">
                                  {author}
                                  <span className="text-blue-500">
                                    <MdVerified />
                                  </span>
                                </Link>
                                <span className="font-normal text-sm flex items-center">
                                  &nbsp; {moment(createdAt).fromNow()}
                                </span>
                              </p>
                              {/* edit and delete post icon */}
                              {currentUser?._id === user?._id &&
                              <Dropdown label={<FaEllipsisH />} dismissOnClick={false} arrowIcon="" className='text-red-900  ' color='transparent' size="xs" >
                                <Dropdown.Item>
                                <Button size="xs" color="transparent" className="text-center"> <Link to={`/posts/editpost/${_id}`}> Edit post </Link>
                                </Button>
                                  </Dropdown.Item>
                                <Dropdown.Item as={"div"}>
                                  <Demo postId={_id} />
                                </Dropdown.Item>
                              </Dropdown>}
                            </div>
                            <h3 className="mt-3 text-lg font-semibold leading-6  group-hover:text-gray-600 ">
                              {title}
                            </h3>
                            <div className="group relative">
                              <p className="mt-2 line-clamp-3 text-sm leading-6 ">
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: description,
                                  }}
                                />
                                {/* {description} */}
                              </p>
                              <button className="text-green-400 hover:underline block mb-3 text-sm" onClick={()=> countView(_id)}>See more</button>

                              {/* <Link to={`/posts/${_id}`}  className="text-green-400 hover:underline block mb-3 text-sm" >
                                See more
                              </Link> */}
                              <img
                                className="h-56  w-full object-cover rounded"
                                src={image}
                                alt=""
                              />
                              {/* </Link> */}
                            </div>
                          </div>
                          {/* reaction of posts like comment, re post, like, view */}
                          <div className="flex justify-around py-2  font-medium text-gray-800 dark:text-gray-200  px-4 md:px-8">
                             {!currentUser? 
                               <TotalComments postId={_id}/>
                              :
                            <button className="flex items-center hover:text-blue-400">
                             <ReplyCommentOnUserPage key={_id} postId={_id}  author={author}/>
                              {/* <span className="text-sm">&nbsp; {comments.length}</span> */}
                            </button>
                            }
                            {!currentUser ?
                            <LikeModal likesLength={likes?.length}/>
                            :
                            <button
                              onClick={() => {
                                // dispatch(postId(_id));
                                likeUnlikePost(_id);
                              }}
                              className="flex items-center hover:text-red-400"
                            >
                              {likes?.includes(currentUser?._id) ? (
                                <FaHeart className="text-xl text-red-600" />
                              ) : (
                                <FaRegHeart className="text-xl" />
                              )}
                              <span className="text-sm">&nbsp; {likes?.length}</span>
                            </button>
                            }
                            <button className="flex items-center hover:text-blue-400 mt-[1px]">
                              <FiBarChart2 className="text-xl" />
                              <span className="text-sm">&nbsp;{views}</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    )
                  )
                }
                </Tabs.Item>

                <Tabs.Item title="Replies">
                  <div className="font-medium text-gray-800 dark:text-gray-200  px-4">
                    I will be back soon.
                  </div>
                </Tabs.Item>
                <Tabs.Item title="Likes">
                { loading ? 
                  <div className="flex justify-center items-center mt-20">
                  <ClipLoader speedMultiplier="0.5" size="30px" />
                   </div>
                  : 
                  likedPosts.map(
                    ({
                      _id,
                      title,
                      description,
                      createdAt,
                      image,
                      author,
                      likes,
                      comments,
                      views
                    }) => (
                      <article
                        key={_id}
                        className="flex font-medium text-gray-800 dark:text-gray-200 px-4 mb-3  bg-[#eee] dark:bg-gray-800"
                      >
                        <div className="flex">
                          <img
                            src={image}
                            alt=""
                            className="h-10 w-10 rounded-full bg-gray-50"
                          />
                        </div>
                        <div className=" h-full w-full object-cover object-center lg:h-full lg:w-full   md:max-w-none sm:max-w-none  overflow-hidden">
                          <div className="p-2">
                            <div className="text-lg leading-6 -mt-1 ">
                              <p className=" flex font-semibold ">
                                <Link to={`/user/${author}`} className="flex items-center">
                                  {author}
                                  <span className="text-blue-500">
                                    <MdVerified />
                                  </span>
                                </Link>
                                <span className="font-normal text-sm flex items-center">
                                  &nbsp; Oct 7
                                </span>
                              </p>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold leading-6  group-hover:text-gray-600 ">
                              {/* <Link
                              to={`/posts/${_id}`}
                              className="hover:underline"
                            > */}
                              {title}
                              {/* </Link> */}
                            </h3>
                            <div className="group relative">
                              <p className="mt-2 line-clamp-3 text-sm leading-6 ">
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: description,
                                  }}
                                />
                                {/* {description} */}
                              </p>
                              <button className="text-green-400 hover:underline block mb-3 text-sm" onClick={()=> countView(_id)}>See more</button>
                              <img
                                className="h-56  w-full object-cover rounded"
                                src={image}
                                alt=""
                              />
                              {/* </Link> */}
                            </div>
                          </div>
                          {/* reaction of posts like comment, re post, like, view */}
                          <div className="flex justify-around py-2  font-medium text-gray-800 dark:text-gray-200  px-4 md:px-8">
                            <button className="flex items-center hover:text-blue-400">
                              <ReplyCommentOnUserPage key={_id} postId={_id} commentsLength={comments.length}/>
                              {/* <span>&nbsp; {comments.length}</span> */}
                            </button>

                            {/* like button not worked if user not logged in */}
                            {currentUser && (
                              <button
                                onClick={() => {
                                  dispatch(postId(_id));
                                  likeUnlikePost();
                                }}
                                className="flex items-center hover:text-red-400"
                              >
                                {likes?.includes(currentUser?._id) ? (
                                  <FaHeart className="text-xl text-red-600" />
                                ) : (
                                  <FaRegHeart className="text-xl " />
                                )}
                                <span  className="text-sm">&nbsp; {likes?.length}</span>
                              </button>
                            )}

                            <button className="flex items-center hover:text-blue-400">
                              <FiBarChart2 className="text-xl" />
                              <span  className="text-sm">&nbsp;{views}</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    )
                  )}
                </Tabs.Item>
                <Tabs.Item title="Videos">
                  <div className="font-medium text-gray-800 dark:text-gray-200  px-4">
                    I will be back soon.
                  </div>
                </Tabs.Item>
              </Tabs>
            </div>
          </div>
          {/* side bar of the body */}
          {/* display suggested user only when user authenticate */}
          {currentUser && (
            <div className="sm:pt-12 px-4 mb-4 sm:mt-12  text-gray-700 dark:text-gray-200 w-full md:max-w-[350px] lg:w-[600px]  mx-auto text-lg md:ml-4 leading-relaxed">
              {/* <SuggestedUser suggestedUserIndex = {allUsers?.length} /> */}
              {/* <div className="w-full max-w-md mx-auto p-4 h-[50%] hidden lg:inline  bg-white border   rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"> */}
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-gray-200 ">
                  You Might LIke
                </h5>
                <Button
                  gradientDuoTone="greenToBlue"
                  size="xs"
                  onClick={() => {
                    suggestedUserIndex = allUsers?.length;
                    setViewAll(true);
                  }}
                >
                  View All
                </Button>
              </div>
              { loading ? 
                  <div className="flex justify-center items-center mt-20">
                    <ClipLoader speedMultiplier="0.5" size="30px" />
                   </div>
                  : 
              viewAll
                ? allUsers.map(
                    (user, index) =>
                      index < allUsers?.length && checkFollowers.includes(user._id) &&( // restrict index size
                        <div
                          key={index}
                          className={`flow-root ${
                            currentUser?._id === user._id && "hidden"
                          }`}
                        >
                          {/* jump authenticate user from suggestion friend */}
                          <ul
                            role="list"
                            className="divide-y divide-gray-200 dark:divide-gray-700"
                          >
                            <li className="py-3 sm:py-4">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <Link to={`/user/${user.username}`}>
                                    <img
                                      className="w-8 h-8 rounded-full"
                                      src={user.profilePicture}
                                      alt="Neil image"
                                    />
                                  </Link>
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                  <Link to={`/user/${user.username}`} className="text-sm font-medium text-gray-900 truncate dark:text-gray-200 ">
                                    {user.username}
                                  </Link>
                                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {user.email}
                                  </p>
                                </div>
                              <div>
                                {/* check the user id and author page is same or current user logged in the apply dynamic following */}
                                {
                                  <Button key={user._id} gradientDuoTone="greenToBlue" size="xs" outline className="mt-2 mr-1"
                                    onClick={() => {
                                      suggestedUserFollowUnFollow(user._id);
                                      setCounter(true)
                                      // console.log(user._id)
                                    }}
                                    disabled={loading}
                                  >
                                    Follow
                                    {/* {checkFollowers.includes(user._id) ? "Following" : "Follow"} */}
                                  </Button>
                                }
                              </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )
                  )
                : allUsers.map(
                    (user, index) =>
                      index < 2 && checkFollowers.includes(user._id) &&(
                        <div key={index} className="flow-root">
                          <ul
                            role="list"
                            className="divide-y divide-gray-200 dark:divide-gray-700"
                          >
                            <li className="py-3 sm:py-4">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                <Link to={`/user/${user.username}`}>
                                  <img
                                    className="w-8 h-8 rounded-full"
                                    src={user.profilePicture}
                                    alt="Neil image"
                                  />
                                  </Link>
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                <Link to={`/user/${user.username}`} className="text-sm font-medium text-gray-900 truncate dark:text-gray-200 ">
                                {user.username}
                                  </Link>
                                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {user.email}
                                  </p>
                                </div>
                                <Button
                                  gradientDuoTone="greenToBlue"
                                  outline
                                  size="xs"
                                >
                                  Follow
                                </Button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )
                  )}
            </div>
          )}
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default UserPage;
