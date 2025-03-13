import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import RecentPost from "../../components/post/RecentPost";
import Subscribe from "../../components/Subscribe";
import ClipLoader from "react-spinners/ClipLoader";
// import Comments from "../components/comment/Comments";
import { BiDislike, BiLike, BiReply } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Error from "../Error";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FollowModal } from "../../components/Modal";
import { BiSolidLike } from "react-icons/bi";
import ScrollToTop from "../../components/ScrollToTop";
import CommentSection from "../../components/comment/CommentSection";
import moment from "moment"
import { FaShare } from "react-icons/fa6";
import { Helmet } from 'react-helmet'

function PostDetail() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [post, setPost] = useState({});
  const [react, setReact] = useState({
    comments: 0,
    likes: [],
    likesLength: 0,
  });
  const [checkFollowers, setCheckFollowers] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [isNotFound, isSetNotFound] = useState(false);
  const [openModal, setOpenModal] = useState(true);

  const { id } = useParams();

  // use effect for fetching recent posts
  useEffect(() => {
    const fetchData = () => {
    axios
      .get("/post/getAllPosts")
      .then((res) => {
        setLoading(false);
        setRecentPosts(res.data.data);
        // console.log(res.data.data)
      })
      .catch((error) => console.log(error));
    }

    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);

  }, []);

  // use effect for fetching post detail
  useEffect(() => {
    const fetchData = () => {
    axios
      .get(`/post/getpost/${id}`)
      .then((res) => {
        isSetNotFound(false);
        setPost(res.data);
        setReact({
          comments: res.data.comments?.length,
          likes: res.data.likes,
          likesLength: res.data.likes?.length,
        });

        postAuthor(res.data.author); // execute value
      })
      .catch((error) => {
        isSetNotFound(true);
        console.log(error);
      });
    }

    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
    
  }, [counter]);

  // display user detail info by getting username from author page
  const postAuthor = (author) => {
    axios
      .get(`/user/profile/${author}`, { withCredentials: true }) ///{ withCredentials: true }
      .then((res) => {
        setCheckFollowers(res.data.followers);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // follow, following and unfollow user
  const followUnfollowUser = () => {
    // console.log(post.user);
    // setLoading(true);
    axios
      .put(`/user/follow/${post.user}`, {}, { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        setCounter(res.data.updatedFollows.length);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error.message, "Something is happening abel");
        // setLoading(false);
      });
  };

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

  return (
    <div className="bg-[#eee] dark:bg-gray-800 ">
      <Helmet>
        <title>Post Description | ETBlog</title>
        <meta name="description" content="Detail description about post" />
     </Helmet>
      <ScrollToTop/>
      {/* unauthorize user can not see self or other posts */}
      {!isNotFound ? (
        loading ? (
          <div className="flex justify-center items-center mt-64 mb-52">
            <ClipLoader speedMultiplier="0.5" size="40px" />
          </div>
          ) : (
        <div className="mx-auto  max-w-7xl  pb-12 flex flex-col  md:flex-row md:px-2">
          <div className="flex-1 px-4 w-full lg:px-0 mt-12 mb-4 text-gray-700 dark:text-gray-200 max-w-screen-md mx-auto text-lg leading-relaxed">
            <h1 className="sm:text-5xl text-3xl font-bold pb-4 mb-6 border-b-2 border-gray-300 dark:border-gray-700">
              {post.title}
            </h1>
            {/* author name and following user */}
            <div className="flex justify-between items-center mb-10 -mt-3 px-1 gap-1 ">
              <div>
                <Link to={`/user/${post.author}`} >
                  Posted by{" "}
                  <span className="text-green-400 hover:underline text-base">
                  @{post.author}
                  </span>{" "}
                  <span className="text-sm inline-block">
                  {moment(post.createdAt).fromNow()}
                  </span>
                </Link>
              </div>

              {/* check the user is authenticate and permit to follow */}
              <div>
              {!currentUser ? (
                  <FollowModal />
              ) : (
                currentUser._id !== post.user && (
                  <Button
                    gradientDuoTone="greenToBlue"
                    outline
                    onClick={() => {
                      followUnfollowUser();
                    }}
                    disabled={loading}
                  >
                    {checkFollowers.includes(currentUser._id)
                      ? "Following"
                      : "Follow"}
                  </Button>
                )
              )}
              </div>
            </div>
            {/* <Post_Title_Comment author={post.author} postId={post._id} /> */}
            <img
              className="h-[40vh] lg:h-96 w-full  rounded-xl mb-6 object-fill"
              src={post.image}
              alt="post - image"
            />
            <p className="pb-6">
              <span dangerouslySetInnerHTML={{ __html: post.description.replace(/<[^>]*>/g, '').trimStart() }} />
            </p>
            {/* flex like and share */}
            <div className="flex items-center gap-12  mb-8 -mt-4">
            {/* like the post */}
            <div className="flex items-center">
              {/* when user logged in */}
              {currentUser ? (
                <button
                  onClick={() => likeUnlikePost(id)}
                  className="flex items-center py-1 px-4 bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-400 border-r-2 rounded-r-none rounded-full"
                >
                  {react.likes?.includes(currentUser?._id) ? (
                    <BiSolidLike className="text-xl text-gray-500 dark:text-gray-200" />
                  ) : (
                    <BiLike className="text-xl"/>
                  )}
                  <span className="">&nbsp;{react.likesLength}</span>
                </button>
              ) : (
                <button className="flex items-center py-1 px-4 bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-400 border-r-2 rounded-r-none rounded-full">
                  <BiLike className="text-xl "/> <span className="">&nbsp;{react.likesLength}</span>
                </button>
              )}
              <button className="flex items-center py-1 px-4 bg-gray-300  dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-400 rounded-l-none rounded-full">
                <BiDislike className="text-xl"/><span >&nbsp;</span>
              </button>
              
            </div>
            {/* share post link */}
            {/* <button className="py-2 px-4 bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-gray-400 rounded-full"><FaShare className="text-xl"/></button> */}
            </div>
            {/* <Comments postId={id} /> */}
            <CommentSection postId={id} />
            
          </div>

          <div className="pt-12 px-4 mb-4 mt-12  text-gray-700 dark:text-gray-200 w-full md:max-w-[350px] lg:w-[600px]  mx-auto text-lg md:ml-4 leading-relaxed">
            {/* <Search /> */}

            <div className="font-semibold mb-1">RECENT POSTS</div>
            {loading ? (
              <div className="flex justify-center items-center my-12">
                <ClipLoader speedMultiplier="0.5" size="40px" />
              </div>
            ) : (
              recentPosts.map(
                ({ _id, title, image, createdAt, author }, index) =>
                  _id === id ? (
                    ""
                  ) : index < 4 ? (
                    <RecentPost
                      key={_id}
                      id={_id}
                      title={title}
                      image={image}
                      date={createdAt}
                      author={author}
                    />
                  ) : (
                    ""
                  )
              )
            )}

            <Subscribe />
          </div>
        </div>)
      ) : (
        <Error />
      )}
    </div>
  );
}

export default PostDetail;
