import { Button, Dropdown } from "flowbite-react";
import React from "react";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  CommentModal,
  DeletePostModal,
  LikeModal,
  ReplyCommentOnUserPage,
} from "../Modal";
import { FaEllipsisH, FaHeart, FaRegHeart } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";
import moment from "moment";

function PostsTab({
  posts,
  userInfoPP,
  currentUser,
  countView,
  likeUnlikePost,
  countViewWhenLike,
}) {
  return (
    // <div>{"test post value"}</div>
    <div>
      {posts?.map(
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
          user,
        }) => (
          <article
            key={_id}
            className="flex font-medium text-gray-800 dark:text-gray-200 md:px-4 mb-3  bg-[#eee] dark:bg-gray-800"
          >
            <div className="flex">
              <img
                src={userInfoPP}
                alt="author image"
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
                  {currentUser?._id === user?._id && (
                    <Dropdown
                      label={<FaEllipsisH />}
                      dismissOnClick={false}
                      arrowIcon=""
                      className="text-red-900  "
                      color="transparent"
                      size="xs"
                    >
                      <Dropdown.Item>
                        <Button
                          size="xs"
                          color="transparent"
                          className="text-center"
                        >
                          {" "}
                          <Link to={`/posts/editpost/${_id}`}> Edit post </Link>
                        </Button>
                      </Dropdown.Item>
                      <Dropdown.Item as={"div"}>
                        <DeletePostModal postId={_id} />
                      </Dropdown.Item>
                    </Dropdown>
                  )}
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
                  <button
                    className="text-green-400 hover:underline block mb-3 text-sm"
                    onClick={() => countView(_id)}
                  >
                    See more
                  </button>

                  {/* <Link to={`/posts/${_id}`}  className="text-green-400 hover:underline block mb-3 text-sm" >
                                See more
                              </Link> */}
                  <img
                    className="h-56  w-full object-cover rounded"
                    src={image}
                    alt="description image"
                  />
                  {/* </Link> */}
                </div>
              </div>
              {/* reaction of posts like comment, re post, like, view */}
              <div className="flex justify-around py-2  font-medium text-gray-800 dark:text-gray-200  px-4 md:px-8">
                {!currentUser ? (
                  <>
                    <button className="flex items-center hover:text-blue-400">
                      <CommentModal postId={_id} />
                    </button>
                  </>
                ) : (
                  <button className="flex items-center hover:text-blue-400">
                    <ReplyCommentOnUserPage
                      key={_id}
                      postId={_id}
                      author={author}
                    />
                    {/* <span className="text-sm">&nbsp; {comments.length}</span> */}
                  </button>
                )}
                {!currentUser ? (
                  <LikeModal likesLength={likes?.length} />
                ) : (
                  <button
                    onClick={() => {
                      // dispatch(postId(_id));
                      likeUnlikePost(_id);
                      countViewWhenLike(_id);
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
                )}
                <button className="flex items-center hover:text-blue-400 mt-[1px]">
                  <FiBarChart2 className="text-xl" />
                  <span className="text-sm">&nbsp;{views}</span>
                </button>
              </div>
            </div>
          </article>
        )
      )}
    </div>
  );
}

export default PostsTab;
