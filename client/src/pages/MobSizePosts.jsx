import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FollowModal, ReplyCommentOnUserPage } from "../components/Modal";
import { FiBarChart2 } from "react-icons/fi";

function MobSizePosts({ forYouPosts }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="py-3">
      {forYouPosts.map(
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
        }) => (
          <article
            key={_id}
            className="flex font-medium text-gray-800 dark:text-gray-200 sm:px-4  py-2   bg-[#eee] dark:bg-gray-800"
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
                      &nbsp;@Bella
                    </span>
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
                  {/* <button className="text-green-400 hover:underline block mb-3 text-sm" onClick={()=> countView(_id)}>See more</button> */}
                  <button className="text-green-400 hover:underline block mb-3 text-sm">
                    See more
                  </button>
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
                  <ReplyCommentOnUserPage
                    key={_id}
                    postId={_id}
                    commentsLength={comments.length}
                  />
                  {/* <span>&nbsp; {comments.length}</span> */}
                </button>

                {/* like button not worked if user not logged in */}
                {currentUser && (
                  <button
                    onClick={() => {
                      //   dispatch(postId(_id));
                      //   likeUnlikePost();
                    }}
                    className="flex items-center hover:text-red-400"
                  >
                    {/* <FaRegHeart className="text-xl " />e */}
                    {likes?.includes(currentUser?._id) ? (
                      <FaHeart className="text-xl text-red-600" />
                    ) : (
                      <FaRegHeart className="text-xl " />
                    )}
                    <span className="text-sm">&nbsp; {likes?.length}</span>
                  </button>
                )}

                <button className="flex items-center hover:text-blue-400">
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

export default MobSizePosts;
